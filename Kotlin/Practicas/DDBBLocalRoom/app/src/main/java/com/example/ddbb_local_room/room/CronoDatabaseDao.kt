package com.example.ddbb_local_room.room

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Update
import com.example.ddbb_local_room.model.Cronos
import kotlinx.coroutines.flow.Flow

@Dao // Data Access Observer
interface CronoDatabaseDao {

    //queris para el CRUD

    // Select -> leer todo
    @Query("SELECT * FROM cronos")
    fun getCronos(): Flow<List<Cronos>>

    // Select -> solo un datos "ID"
    @Query("Select * From cronos where id = :id")
    fun getCronosById(id: Long): Flow<Cronos>

    // Insert -> crear/agregar un registro
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(crono: Cronos)

    // Update
    @Update(onConflict = OnConflictStrategy.REPLACE)
    suspend fun update(crono: Cronos)

    // Delete
    suspend fun delete(crono: Cronos)
}