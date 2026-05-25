import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteService } from './services/note';
import { Note, Tag } from './note.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  allNotes: Note[] = [];
  tags: Tag[] = [];
  displayedNotes: Note[] = [];

  showArchived: boolean = false;
  selectedTagId: number | null = null;
  searchText: string = '';

  toast = { message: '', show: false, type: 'success' };

  currentNote: Note = { title: '', content: '', archived: false, tags: [] };
  isEditing: boolean = false;
  inputTags: string = '';

  // Variable clave para controlar el formulario y el botón flotante
  isCreatingOrEditing: boolean = false;

  constructor(
    private noteService: NoteService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAllDataFromServer();
  }

  // --- LÓGICA DE CONTROL DE VISTA ---

  showCreateForm() {
    this.resetForm();
    this.isCreatingOrEditing = true;
  }

  resetForm(): void {
    this.currentNote = { title: '', content: '', archived: false, tags: [] };
    this.inputTags = '';
    this.isEditing = false;
    this.isCreatingOrEditing = false; // Vuelve a mostrar las notas y oculta el form
    this.cdr.detectChanges();
  }

  editNote(note: Note): void {
      this.currentNote = { ...note, tags: note.tags ? [...note.tags] : [] };
      this.inputTags = note.tags ? note.tags.map(t => t.name).join(', ') : '';
      this.isEditing = true;
      this.isCreatingOrEditing = true; // Abre el form
      this.cdr.detectChanges(); // IMPORTANTE: Esto asegura que el form aparezca al primer clic
    }

  // --- LÓGICA DE DATOS Y SERVICIOS ---

  saveNote(): void {
    if (!this.currentNote.title.trim()) return;

    if (this.inputTags.trim()) {
      this.currentNote.tags = this.inputTags.split(',').map(t => ({ name: t.trim() }));
    } else {
      this.currentNote.tags = [];
    }

    const request = this.isEditing && this.currentNote.id
      ? this.noteService.updateNote(this.currentNote.id, this.currentNote)
      : this.noteService.createNote(this.currentNote);

    request.subscribe(() => {
      this.showNotification(this.isEditing ? 'Nota actualizada' : 'Nota creada');
      this.resetForm();
      this.loadAllDataFromServer();
    });
  }

  loadAllDataFromServer(): void {
    this.noteService.getAllTags().subscribe(data => { this.tags = data; this.cdr.detectChanges(); });
    this.noteService.getActiveNotes().subscribe(actives => {
      this.noteService.getArchivedNotes().subscribe(archiveds => {
        this.allNotes = [...actives, ...archiveds];
        this.applyFiltersLocally();
      });
    });
  }

  applyFiltersLocally(): void {
    this.displayedNotes = this.allNotes.filter(note => {
      const matchesFolder = note.archived === this.showArchived;
      const matchesTag = this.selectedTagId === null ? true : (note.tags?.some(t => t.id === this.selectedTagId));
      const search = this.searchText.toLowerCase();
      const matchesSearch = note.title?.toLowerCase().includes(search) || note.content?.toLowerCase().includes(search);
      return matchesFolder && matchesTag && matchesSearch;
    });
    this.cdr.detectChanges();
  }

  toggleArchive(id: number | undefined): void {
      if (!id) return;
      this.noteService.toggleArchive(id).subscribe(() => {
        this.showNotification('Estado cambiado');
        this.loadAllDataFromServer();
        // Forzamos el renderizado tras el cambio
        this.cdr.detectChanges();
      });
    }

  deleteNote(id: number | undefined): void {
      if (id && confirm('¿Eliminar nota?')) {
        this.noteService.deleteNote(id).subscribe(() => {
          this.allNotes = this.allNotes.filter(n => n.id !== id);
          this.applyFiltersLocally(); //
          this.cdr.detectChanges();
          this.showNotification('Nota eliminada', 'error');
        });
      }
    }

  removeTag(event: Event, tagId: number) {
    event.stopPropagation();
    this.noteService.deleteTag(tagId).subscribe(() => {
      this.showNotification('Etiqueta eliminada');
      if (this.selectedTagId === tagId) this.selectedTagId = null;
      this.loadAllDataFromServer();
    });
  }

  filterByTag(tagId: number | null): void { this.selectedTagId = tagId; this.applyFiltersLocally(); }

  switchView(archived: boolean): void { this.showArchived = archived; this.selectedTagId = null; this.applyFiltersLocally(); }

  showNotification(msg: string, type: string = 'success') {
    this.toast = { message: msg, show: true, type };
    setTimeout(() => { this.toast.show = false; this.cdr.detectChanges(); }, 1000);
    this.cdr.detectChanges();
  }

  getTagCount(tagId: number): number {
    return this.allNotes.filter(n => !n.archived && n.tags?.some(t => t.id === tagId)).length;
  }
}
