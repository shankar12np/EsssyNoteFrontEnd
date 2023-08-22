import {Component, OnInit} from '@angular/core';
import {Note} from "./note";
import {NoteService} from "./note.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  notes: Note[] = [];
  title = 'eassyNote-frontend';

  constructor(private noteService: NoteService) {
  }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(){
    this.noteService.getNote().subscribe(
      (data: Note[]) =>{
        this.notes= data;
      },
      (error) => {
        console.log('Error creating note', error);
      }
    )
  }

}
