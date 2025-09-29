package com.tradewizecomponent

import android.Manifest
import android.content.ContentUris
import android.graphics.Bitmap
import android.media.ThumbnailUtils
import android.os.Build
import android.provider.MediaStore
import android.util.Size
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.*
import java.io.ByteArrayOutputStream
import android.util.Base64

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
                idColumn = MediaStore.Images.Media._ID,
                nameColumn = MediaStore.Images.Media.DISPLAY_NAME,
                dateColumn = MediaStore.Images.Media.DATE_ADDED,
                typeColumn = MediaStore.Images.Media.MIME_TYPE,
                sizeColumn = MediaStore.Images.Media.SIZE,
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
                idColumn = MediaStore.Video.Media._ID,
                nameColumn = MediaStore.Video.Media.DISPLAY_NAME,
                dateColumn = MediaStore.Video.Media.DATE_ADDED,
                typeColumn = MediaStore.Video.Media.MIME_TYPE,
                sizeColumn = MediaStore.Video.Media.SIZE,
                mediaType = "video",
                result = mediaList
            )

            // Sort theo dateAdded DESC
            val sortedList = mediaList.sortedByDescending { it.getDouble("dateAdded") }

            val resultArray = Arguments.createArray()
            for (item in sortedList) {
                resultArray.pushMap(item)
            }

            promise.resolve(resultArray)
        } catch (e: Exception) {
            promise.reject("ERROR", e.message, e)
        }
    }

    private fun queryMedia(
        uri: android.net.Uri,
        projection: Array<String>,
        idColumn: String,
        nameColumn: String,
        dateColumn: String,
        typeColumn: String,
        sizeColumn: String,
        mediaType: String,
        result: MutableList<WritableMap>
    ) {
        val sortOrder = "$dateColumn DESC"

        reactApplicationContext.contentResolver.query(
            uri, projection, null, null, sortOrder
        )?.use { cursor ->
            val idCol = cursor.getColumnIndexOrThrow(idColumn)
            val nameCol = cursor.getColumnIndexOrThrow(nameColumn)
            val dateCol = cursor.getColumnIndexOrThrow(dateColumn)
            val typeCol = cursor.getColumnIndexOrThrow(typeColumn)
            val sizeCol = cursor.getColumnIndexOrThrow(sizeColumn)

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

                // Nếu là video thì generate thumbnail
                if (mediaType == "video") {
                    try {
                        val thumbnail: Bitmap? = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                            reactApplicationContext.contentResolver.loadThumbnail(
                                contentUri,
                                Size(300, 300),
                                null
                            )
                        } else {
                            ThumbnailUtils.createVideoThumbnail(
                                contentUri.path ?: "",
                                MediaStore.Images.Thumbnails.MINI_KIND
                            )
                        }

                        if (thumbnail != null) {
                            val outputStream = ByteArrayOutputStream()
                            thumbnail.compress(Bitmap.CompressFormat.JPEG, 80, outputStream)
                            val byteArray = outputStream.toByteArray()
                            val base64 = Base64.encodeToString(byteArray, Base64.DEFAULT)
                            map.putString("thumbnail", "data:image/jpeg;base64,$base64")
                        }
                    } catch (_: Exception) {
                    }
                }

                result.add(map)
            }
        }
    }
}
