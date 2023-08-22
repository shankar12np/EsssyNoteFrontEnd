import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Note } from '../note';
import { NoteService } from '../note.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  noteForm!: FormGroup;
  notes: Note[] = []; // List of existing notes
  allNotes: Note[] = []; // List of all notes including the newly created ones

  constructor(
    private formBuilder: FormBuilder,
    private noteService: NoteService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.noteForm = this.formBuilder.group({
      title: [''],
      content: [''],
      // No need to have createdAt and updatedAt form controls here
    });

    this.getNotes();
  }

  getNotes() {
    this.noteService.getAllNotes().subscribe(
      (notes: Note[]) => {
        this.notes = notes;
        this.allNotes = [...this.notes].reverse(); // Clone the array, then reverse it.
      },
      (error) => {
        console.log('Error fetching notes', error);
      }
    );
  }

  createNote() {
    const note: Note = this.noteForm.value;
    const currentDate = new Date(); // Get the current date and time
    note.createdAt = currentDate.toISOString(); // Set the createdAt timestamp

    this.noteService.createNote(note).subscribe(
      (response: any) => {
        // Assuming the NoteService returns the created note in the response.
        // You can handle the response accordingly.
        console.log('Note created successfully: ', response);
        this.getNotes(); // Refresh the list of all notes after creating a new one.
        this.noteForm.reset(); // Reset the form after successful submission.
        window.location.reload(); // Reload the page after creating a note
      },
      (error: any) => {
        console.error('Error creating note: ', error);
      }
    );
  }

  deleteNote(noteId: number | undefined) {
    if (noteId === undefined) {
      console.error('Invalid noteId: ', noteId);
      return;
    }

    this.noteService.deleteNote(noteId).subscribe(
      () => {
        console.log(`Note with ID ${noteId} deleted successfully.`);
        this.getNotes(); // Refresh the list of all notes after deleting a note.
        window.location.reload(); // Reload the page after deleting a note
      },
      (error) => {
        console.error(`Error deleting note with ID ${noteId}: `, error);
      }
    );
  }
  //
  // updateNote(noteId: number | undefined): void {
  //   const note: Note = this.noteForm.value;
  //   const currentDate = new Date();
  //   note.createdAt = currentDate.toISOString();
  //
  //   if (typeof note.id === 'number') {
  //     this.noteService.updateNote(note.id, note).subscribe(
  //       (updatedNote: Note) => {
  //         console.log('Note updated successfully: ', updatedNote);
  //         this.getNotes(); // Refresh the list of all notes after updating.
  //         this.noteForm.reset(); // Reset the form after successful update.
  //       },
  //       (error: any) => {
  //         console.error('Error updating note: ', error);
  //       }
  //     );
  //   } else {
  //     console.error('Error: Note ID is not a number.');
  //   }
  // }
  //
  // // Function to handle navigation to the update page
  // goToUpdatePage(noteId: number): void {
  //   this.router.navigate(['/notes', noteId, 'update']); // Navigate to the update page with the note ID
  // }
  //

}
