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
            ContextCompat.checkSelfPermission(ctx, Manifest.permission.READ_MEDIA_IMAGES) ==
                android.content.pm.PackageManager.PERMISSION_GRANTED
        } else {
            ContextCompat.checkSelfPermission(ctx, Manifest.permission.READ_EXTERNAL_STORAGE) ==
                android.content.pm.PackageManager.PERMISSION_GRANTED
        }
    }

    @ReactMethod
    fun getAllowedPhotos(promise: Promise) {
        if (!hasPermission()) {
            promise.reject("NO_PERMISSION", "Missing permission")
            return
        }

        val photos = Arguments.createArray()
        val uri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI
        val projection = arrayOf(
            MediaStore.Images.Media._ID,
            MediaStore.Images.Media.DISPLAY_NAME,
            MediaStore.Images.Media.DATE_ADDED,
            MediaStore.Images.Media.MIME_TYPE,
            MediaStore.Images.Media.SIZE  
        )
        val sortOrder = "${MediaStore.Images.Media.DATE_ADDED} DESC"

        reactApplicationContext.contentResolver.query(uri, projection, null, null, sortOrder)?.use { cursor ->
            val idCol = cursor.getColumnIndexOrThrow(MediaStore.Images.Media._ID)
            val nameCol = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DISPLAY_NAME)
            val dateCol = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATE_ADDED)
            val typeCol = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.MIME_TYPE)
            val sizeCol = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.SIZE)
            
            while (cursor.moveToNext()) {
                val id = cursor.getLong(idCol)
                val name = cursor.getString(nameCol)
                val date = cursor.getLong(dateCol)
                val contentUri = ContentUris.withAppendedId(uri, id)
                val mimeType = cursor.getString(typeCol) ?: ""
                val size = cursor.getLong(sizeCol)

                val map = Arguments.createMap()
                map.putString("uri", contentUri.toString())
                map.putString("name", name)
                map.putDouble("dateAdded", date.toDouble())
                photos.pushMap(map)
            }
        }

        promise.resolve(photos)
    }
}
