import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note, Tag } from '../note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  // Ajustá el puerto si tu backend de Spring Boot corre en otro (ej: 8080)
  private apiUrl = 'http://localhost:8080/api/notes';

  constructor(private http: HttpClient) { }

  // Crear una nota
  createNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note);
  }

  // Obtener notas activas
  getActiveNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/active`);
  }

  // Obtener notas archivadas
  getArchivedNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/archived`);
  }

  // Actualizar una nota completa
  updateNote(id: number, note: Note): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}/${id}`, note);
  }

  // Eliminar una nota
  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Archivar / Desarchivar (Toggle)
  toggleArchive(id: number): Observable<Note> {
    return this.http.patch<Note>(`${this.apiUrl}/${id}/toggle-archive`, {});
  }

  // Obtener todas las etiquetas (tags)
  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.apiUrl}/tags`);
  }

  // Obtener notas filtradas por etiqueta
  getNotesByTag(tagId: number): Observable<Note[]> {
      return this.http.get<Note[]>(`${this.apiUrl}/tags/${tagId}`);
    }
  // Borrar una etiqueta por ID
    deleteTag(tagId: number): Observable<void> {
      // Asegurate que en tu backend tengas @DeleteMapping("/tags/{id}")
      return this.http.delete<void>(`${this.apiUrl}/tags/${tagId}`);
    }
}
