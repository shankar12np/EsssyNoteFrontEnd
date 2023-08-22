import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NoteComponent} from "./note/note.component";

const routes: Routes = [
 {path: '', redirectTo: '/notes', pathMatch: 'full'},
  {path: 'notes', component: NoteComponent},
 {path: '**', redirectTo: '/notes'} // Redirect to '/notes' for any unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
