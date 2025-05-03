import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // Iniciarlizacion de variables
  characters: any[] = []; // Variable para almacenar la lista de personajes
  isModalOpen = false; // Variable para controlar si el modal está abierto o cerrado
  currentCharacter: any = {}; // Variable para almacenar la información del personaje seleccionado actualmente
  nextPage: string | null = null; // Variable para almacenar la URL de la próxima página de resultados
  
  // Inyección de dependencias
  constructor(private http: HttpClient) {
    this.getCharacters();
  }

  // Funcion para obtener los personajes de la API
  getCharacters() {
    this.http.get('https://rickandmortyapi.com/api/character/')
      .subscribe((data: any) => {
        this.characters = data.results;
        this.nextPage = data.info.next; // Guarda la URL de la próxima página de resultados
      });
  }

  // funcion para abrir y cerrar el modal (Màs informacion de los personajes)
  setOpen(isOpen: boolean, characterId?: number) {
    this.isModalOpen = isOpen;
    if (characterId) {
      this.getCharacterInfo(characterId);
    }
  }

  // Funcion para obtener la informacion de un personaje en especifico (ID)
  getCharacterInfo(characterId: number) {
    this.http.get(`https://rickandmortyapi.com/api/character/${characterId}`)
      .subscribe((data: any) => {
        this.currentCharacter = data; // Almacena la información del personaje seleccionado actualmente
      });
  }

  // Funcion para cargar más personajes
  loadMoreCharacters() {
    if (this.nextPage) {
      this.http.get(this.nextPage)
        .subscribe((data: any) => {
          this.characters.push(...data.results); // Agrega los nuevos resultados a la lista existente
          this.nextPage = data.info.next; // Actualiza la URL de la próxima página de resultados
        });
    }
  }


  // Funcion para buscar personajes en la barra de busqueda
  searchCharacters(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm.trim() !== '') {
      this.http.get(`https://rickandmortyapi.com/api/character/?name=${searchTerm}`)
        .subscribe((data: any) => {
          this.characters = data.results;
          this.nextPage = null; // Reinicia la URL de la próxima página de resultados
        });
    } else {
      this.getCharacters(); // Si el campo de búsqueda está vacío, vuelve a cargar todos los personajes
    }
  }
}
