import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})

export class NavbarComponent {
  menuOpen = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('document:click', ['$event'])
  closeMenu(event: Event) {
    const clickedInside = (event.target as HTMLElement).closest('.relative');
    if (!clickedInside) {
      this.menuOpen = false;
    }
  }

  navigateToRegisterProduct() {
    this.router.navigate(['/register-product']);
    this.menuOpen = false;
  }

  logout() {
    // Lógica para cerrar sesión
    this.menuOpen = false;
  }
}
