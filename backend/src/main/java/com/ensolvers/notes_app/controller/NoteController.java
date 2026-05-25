package com.ensolvers.notes_app.controller;

import com.ensolvers.notes_app.model.Note;
import com.ensolvers.notes_app.model.Tag;
import com.ensolvers.notes_app.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "*")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @PostMapping
    public ResponseEntity<Note> createNote(@RequestBody Note note) {
        return ResponseEntity.ok(noteService.saveNote(note));
    }

    @GetMapping("/active")
    public ResponseEntity<List<Note>> getActiveNotes() {
        return ResponseEntity.ok(noteService.getActiveNotes());
    }

    @GetMapping("/archived")
    public ResponseEntity<List<Note>> getArchivedNotes() {
        return ResponseEntity.ok(noteService.getArchivedNotes());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable Long id, @RequestBody Note note) {
        return ResponseEntity.ok(noteService.updateNote(id, note));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/toggle-archive")
    public ResponseEntity<Note> toggleArchive(@PathVariable Long id) {
        return ResponseEntity.ok(noteService.toggleArchive(id));
    }

    @GetMapping("/tags")
    public ResponseEntity<List<Tag>> getAllTags() {
        return ResponseEntity.ok(noteService.getAllTags());
    }

    @PostMapping("/tags")
    public ResponseEntity<Tag> createTag(@RequestBody Tag tag) {
        return ResponseEntity.ok(noteService.createTag(tag));
    }

    @GetMapping("/tags/{tagId}")
    public ResponseEntity<List<Note>> getNotesByTag(@PathVariable Long tagId) {
        return ResponseEntity.ok(noteService.getNotesByTag(tagId));
    }
    @DeleteMapping("/tags/{id}")
    public ResponseEntity<Void> deleteTag(@PathVariable Long id) {
        noteService.deleteTag(id);
        return ResponseEntity.noContent().build();
    }

}