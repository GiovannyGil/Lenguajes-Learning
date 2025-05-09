package com.example.firebasenotes.viewModel

import android.net.Uri
import android.util.Log
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.core.net.toUri
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.firebasenotes.model.NotesState
import com.google.firebase.Firebase
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.auth
import com.google.firebase.firestore.firestore
import com.google.firebase.storage.FirebaseStorage
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.tasks.await
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Locale
import java.util.Date
import java.util.UUID

class NotesViewModel: ViewModel() {


    private val auth: FirebaseAuth = Firebase.auth
    private val firestore = Firebase.firestore
    private val storageRef = FirebaseStorage.getInstance().reference

    private val _notesData = MutableStateFlow<List<NotesState>>(emptyList())
    val notesData: StateFlow<List<NotesState>> = _notesData

    var state by mutableStateOf(NotesState())
    private set

    fun onValue(value:String, text:String){
        when(text){
            "title" -> state = state.copy(title = value)
            "note" -> state = state.copy(note = value)
        }
    }

    // mostrar todos los registros
    fun fetchNotes(){
        val email = auth.currentUser?.email
        firestore.collection("Notes")
            .whereEqualTo("emailUser", email.toString())
            .addSnapshotListener {querySnapshot, error ->
                if(error != null){
                    return@addSnapshotListener
                }
                val documents = mutableListOf<NotesState>()
                if(querySnapshot != null){
                    for (document in querySnapshot) {
                        val myDocument = document.toObject(NotesState::class.java).copy(idDoc =  document.id)
                        documents.add(myDocument)
                    }
                }
                _notesData.value = documents
            }
    }

    fun getNoteById(documentId: String) {
        firestore.collection("Notes")
            .document(documentId)
            .addSnapshotListener{ snapshot, _ ->
                if(snapshot != null){
                    val note = snapshot.toObject(NotesState::class.java)
                    state = state.copy(
                        // elemento que se van a editar
                        title = note?.title ?: "",
                        note = note?.note ?: "",
                        imagePath = note?.imagePath ?: "",
                    )
                }
            }
    }

    // guardar
    fun saveNewNote(
        title: String,
        note: String,
        image: Uri,
        onSuccess: () -> Unit
    ) {
        val email = auth.currentUser?.email

        viewModelScope.launch(Dispatchers.IO) {
            val imagePath = UploadImage(image)
            try {
                val newNote = hashMapOf(
                    "title" to title,
                    "note" to note,
                    "date" to formatDate(),
                    "emailUser" to email.toString(),
                    "imagePath" to imagePath
                )

                firestore.collection("Notes").add(newNote)
                    .addOnSuccessListener {
                        onSuccess()
                    }

            } catch (e: Exception){
                Log.d("ERROR SAVE", "Error al guardar ${e.localizedMessage}")
            }
        }
    }

    // funcion para subir imagen
    private suspend fun UploadImage(image: Uri): String {
        return try {
            val imageRef = storageRef.child("images/${UUID.randomUUID()}")
            val taskSnapshot = imageRef.putFile(image).await()
            val downloadUri = taskSnapshot.metadata?.reference?.downloadUrl?.await()
            downloadUri.toString()
        } catch (e: Exception) {
            ""
        }
    }

    // pasar la fecha a formato texto
    private fun formatDate(): String {
        val currentDate : Date = Calendar.getInstance().time
        val res = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault())
        return res.format(currentDate)
    }



    fun updateNote(idDoc: String, onSuccess:() -> Unit){
        viewModelScope.launch(Dispatchers.IO) {
            try {
                val editNote = hashMapOf(
                    "title" to state.title,
                    "note" to state.note,
                )
                firestore.collection("Notes").document(idDoc)
                    .update(editNote as Map<String, Any>)
                    .addOnSuccessListener {
                        onSuccess()
                    }
            }catch (e:Exception){
                Log.d("ERROR EDIT","Error al editar ${e.localizedMessage} ")
            }
        }
    }

    fun deleteNote(idDoc: String, image: String, onSuccess:() -> Unit){
        viewModelScope.launch(Dispatchers.IO) {
            deleteImage(image)
            try {
                firestore.collection("Notes").document(idDoc)
                    .delete()
                    .addOnSuccessListener {
                        onSuccess()
                    }
            }catch (e:Exception){
                Log.d("ERROR DELETE","Error al eliminar ${e.localizedMessage} ")
            }
        }
    }

    suspend fun deleteImage(imageUrl:String){
        val imageRef = storageRef.child(imageUrl.toUri().lastPathSegment ?: "")
        try {
            imageRef.delete()
        } catch (e: Exception) {
            Log.d("Fallo", "Fallo al eliminar la imagen")
        }
    }

    // cerrar la sessión
    fun signOut() {
        auth.signOut()
    }
}