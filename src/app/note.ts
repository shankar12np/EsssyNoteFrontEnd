export class Note {
  id?: number;
  title?: string;
  content?: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
    this.createdAt = new Date().toISOString(); // Set createdAt timestamp to current date and time
    this.updatedAt = this.createdAt; // Set updatedAt timestamp to createdAt initially
  }
}
