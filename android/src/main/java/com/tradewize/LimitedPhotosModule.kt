package com.tradewizecomponent

import android.Manifest
import android.content.ContentUris
import android.os.Build
import android.provider.MediaStore
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.*

class LimitedPhotosModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "LimitedPhotos"

    private fun hasPermission(): Boolean {
        val ctx = reactApplicationContext
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            val hasImages = ContextCompat.checkSelfPermission(
                ctx,
                Manifest.permission.READ_MEDIA_IMAGES
            ) == android.content.pm.PackageManager.PERMISSION_GRANTED

            val hasVideos = ContextCompat.checkSelfPermission(
                ctx,
                Manifest.permission.READ_MEDIA_VIDEO
            ) == android.content.pm.PackageManager.PERMISSION_GRANTED

            hasImages || hasVideos
        } else {
            ContextCompat.checkSelfPermission(
                ctx,
                Manifest.permission.READ_EXTERNAL_STORAGE
            ) == android.content.pm.PackageManager.PERMISSION_GRANTED
        }
    }

    @ReactMethod
    fun getAllowedMedia(promise: Promise) {
        if (!hasPermission()) {
            promise.reject("NO_PERMISSION", "Missing permission")
            return
        }

        try {
            val mediaList = mutableListOf<WritableMap>()

            // Query ảnh
            queryMedia(
                uri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
                projection = arrayOf(
                    MediaStore.Images.Media._ID,
                    MediaStore.Images.Media.DISPLAY_NAME,
                    MediaStore.Images.Media.DATE_ADDED,
                    MediaStore.Images.Media.MIME_TYPE,
                    MediaStore.Images.Media.SIZE
                ),
                mediaType = "image",
                result = mediaList
            )

            // Query video
            queryMedia(
                uri = MediaStore.Video.Media.EXTERNAL_CONTENT_URI,
                projection = arrayOf(
                    MediaStore.Video.Media._ID,
                    MediaStore.Video.Media.DISPLAY_NAME,
                    MediaStore.Video.Media.DATE_ADDED,
                    MediaStore.Video.Media.MIME_TYPE,
                    MediaStore.Video.Media.SIZE
                ),
                mediaType = "video",
                result = mediaList
            )

            // Sort theo dateAdded DESC
            val sortedList = mediaList.sortedByDescending { it.getDouble("dateAdded") }

            val resultArray = Arguments.createArray()
            sortedList.forEach { resultArray.pushMap(it) }

            promise.resolve(resultArray)
        } catch (e: Exception) {
            promise.reject("ERROR", e.message, e)
        }
    }

    private fun queryMedia(
        uri: android.net.Uri,
        projection: Array<String>,
        mediaType: String,
        result: MutableList<WritableMap>
    ) {
        val sortOrder = "${MediaStore.MediaColumns.DATE_ADDED} DESC"

        reactApplicationContext.contentResolver.query(
            uri, projection, null, null, sortOrder
        )?.use { cursor ->
            val idCol = cursor.getColumnIndexOrThrow(MediaStore.MediaColumns._ID)
            val nameCol = cursor.getColumnIndexOrThrow(MediaStore.MediaColumns.DISPLAY_NAME)
            val dateCol = cursor.getColumnIndexOrThrow(MediaStore.MediaColumns.DATE_ADDED)
            val typeCol = cursor.getColumnIndexOrThrow(MediaStore.MediaColumns.MIME_TYPE)
            val sizeCol = cursor.getColumnIndexOrThrow(MediaStore.MediaColumns.SIZE)

            while (cursor.moveToNext()) {
                val id = cursor.getLong(idCol)
                val name = cursor.getString(nameCol) ?: ""
                val dateAdded = cursor.getLong(dateCol)
                val mimeType = cursor.getString(typeCol) ?: ""
                val size = cursor.getLong(sizeCol)

                val contentUri = ContentUris.withAppendedId(uri, id)

                val map = Arguments.createMap()
                map.putString("uri", contentUri.toString())
                map.putString("name", name)
                map.putDouble("dateAdded", dateAdded.toDouble())
                map.putString("type", mimeType)
                map.putDouble("size", size.toDouble())
                map.putString("mediaType", mediaType)

                result.add(map)
            }
        }
    }
}
