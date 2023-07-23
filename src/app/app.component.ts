import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode = 'list';
  public todos: Todo[] = [];
  public tituto: String = 'Lista de Tarefas';
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required,
      ])]
    });

    this.load();
}


//não recebe informação porque a informação já está no form, tudo o que acontece no TS acontece na tela.
add() {
const title = this.form.controls['title'].value;
const id = this.todos.length + 1;
this.todos.push(new Todo(id, title, false));
this.save();
this.clear();
}

save () {
  const data = JSON.stringify(this.todos);
//localstorage sempre pede (CHAVE, VALOR)
  localStorage.setItem('todos', data);
  this.mode = 'list';
}

load() {

  this.todos = JSON.parse(localStorage.getItem('todos')!);
}

clear ()
{
  this.form.reset();
}
remove(todo: Todo) {
const index = this.todos.indexOf(todo);

if(index !== -1 ) {
  this.todos.splice(index, 1);
}
this.save();
}

markAsDone(todo: Todo) {
  todo.done = true;
  this.save();

}

markAsUndone(todo: Todo) {
  todo.done = false;
  this.save();
}

changeMode(mode: string) {
  this.mode = mode;
}


}
