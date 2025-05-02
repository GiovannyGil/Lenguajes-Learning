package com.example.imageroom.room

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import com.example.imageroom.model.ImageModel
import kotlinx.coroutines.flow.Flow

@Dao
interface ImageDao {
    // conectar con el viewmodel

    @Query("Select * From Images")
    fun getImage(): Flow<List<ImageModel>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertImage(item: ImageModel)

    @Delete
    fun deleteImage(item:ImageModel)
}