import { Injectable } from '@angular/core';
import {Note} from "./note";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private baseUrl = 'http://localhost:8080/notes';

  constructor(private http: HttpClient) { }

  getNote(): Observable<Note[]> {
    return this.http.get<Note[]>(this.baseUrl);
  }

  createNote(note: Note): Observable<any> {
    console.log("Note Created")
    // @ts-ignore
    return this.http.post<any>(this.baseUrl, note,{responseType:'text'})

  }

  // // Function to update an existing note
  // updateNote(noteId: number, note: Note): Observable<Note> {
  //   const url = `${this.baseUrl}/${note.id}`;
  //   return this.http.put<Note>(url, note);
  // }

  getAllNotes() : Observable<Note[]> {
    console.log("Get all notes called");
    return this.http.get<Note[]>(this.baseUrl);

  }

  deleteNote(noteId: number): Observable<any> {
    const deleteUrl = `${this.baseUrl}/${noteId}`;
    console.log('Deleting note with ID', noteId);
    return this.http.delete(deleteUrl);
  }
}
