import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-check-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.css']
})
export class CheckListComponent {
  actions = [
    { label: 'Registrarse', completed: false },
    { label: 'Iniciar Sesión', completed: false },
    { label: 'Registrar tu primer producto', completed: false },
    { label: 'Visualiza el crecimiento de tu emprendimiento', completed: false },
  ];

  toggleAction(index: number): void {
    this.actions[index].completed = !this.actions[index].completed;
  }
}
