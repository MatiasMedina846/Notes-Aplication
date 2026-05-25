package com.ensolvers.notes_app.service;

import com.ensolvers.notes_app.model.Note;
import com.ensolvers.notes_app.model.Tag;
import com.ensolvers.notes_app.repository.NoteRepository;
import com.ensolvers.notes_app.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private TagRepository tagRepository;

    // Guardar o crear nota (fijate que primero guarda las etiquetas si son nuevas)
    public Note saveNote(Note note) {
        if (note.getTags() != null) {
            List<Tag> persistedTags = note.getTags().stream()
                    .map(tag -> tagRepository.findByName(tag.getName())
                            .orElseGet(() -> tagRepository.save(tag)))
                    .collect(Collectors.toList());
            note.setTags(persistedTags);
        }
        return noteRepository.save(note);
    }

    public List<Note> getActiveNotes() {
        return noteRepository.findByArchivedFalse();
    }

    public List<Note> getArchivedNotes() {
        return noteRepository.findByArchivedTrue();
    }

    public Note updateNote(Long id, Note updatedNote) {
        return noteRepository.findById(id).map(note -> {
            note.setTitle(updatedNote.getTitle());
            note.setContent(updatedNote.getContent());
            if (updatedNote.getTags() != null) {
                List<Tag> persistedTags = updatedNote.getTags().stream()
                        .map(tag -> tagRepository.findByName(tag.getName())
                                .orElseGet(() -> tagRepository.save(tag)))
                        .collect(Collectors.toList());
                note.setTags(persistedTags);
            }
            return noteRepository.save(note);
        }).orElseThrow(() -> new RuntimeException("Nota no encontrada"));
    }

    public void deleteNote(Long id) {
        noteRepository.deleteById(id);
    }

    public Note toggleArchive(Long id) {
        return noteRepository.findById(id).map(note -> {
            note.setArchived(!note.isArchived());
            return noteRepository.save(note);
        }).orElseThrow(() -> new RuntimeException("Nota no encontrada"));
    }

    // --- NUEVOS MÉTODOS PARA LA FASE 2 ---

    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    public Tag createTag(Tag tag) {
        return tagRepository.findByName(tag.getName())
                .orElseGet(() -> tagRepository.save(tag));
    }

    public List<Note> getNotesByTag(Long tagId) {
        return noteRepository.findAll().stream()
                .filter(note -> note.getTags().stream().anyMatch(tag -> tag.getId().equals(tagId)))
                .collect(Collectors.toList());
    }
    public void deleteTag(Long id) {
        // 1. Buscamos la etiqueta por ID
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Etiqueta no encontrada"));

        // 2. Rompemos la relación ManyToMany: la removemos de todas las notas que la usen
        // Nota: Asegúrate de que en tu modelo 'Note' el campo de la lista sea 'tags'
        List<Note> notesWithTag = noteRepository.findAll();
        for (Note note : notesWithTag) {
            if (note.getTags() != null && note.getTags().contains(tag)) {
                note.getTags().remove(tag);
                noteRepository.save(note); // Actualizamos la nota sin esa etiqueta
            }
        }

        // 3. Ahora que la clave foránea está libre, la borramos sin restricciones
        tagRepository.deleteById(id);
    }

}