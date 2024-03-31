import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { PrimeNgModule } from './primeng.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, RouterModule, MenubarModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'app-inscription';
  showNav = false;
  isLoggedIn = false;
  items: MenuItem[] | undefined;
  
  constructor(private authService: AuthService, 
    private router: Router){
      this.authService.isLoggedInObservable.subscribe((state) => {
        this.isLoggedIn = state;
        this.updateMenu();
      });
    }
    ngOnInit() {
      this.updateMenu();
    }

    updateMenu() {
      this.items = [
        // Commun à tous les utilisateurs
        { label: 'Accueil', icon: 'pi pi-fw pi-home', routerLink: '/' },
        // Conditionnel : si l'utilisateur est connecté
        ...this.isLoggedIn ? [
          { label: 'Tableau de Bord', icon: 'pi pi-fw pi-dashboard', routerLink: '/dashboard' },
          { label: 'Déconnexion', icon: 'pi pi-fw pi-power-off', command: () => this.logout() }
        ] : [
          { label: 'Inscription', icon: 'pi pi-fw pi-user-plus', routerLink: '/signup' },
          { label: 'Connexion', icon: 'pi pi-fw pi-sign-in', routerLink: '/login' }
        ]
      ];
    }

    toggleNav() {
      this.showNav = !this.showNav;
    }

    logout() {
      this.authService.logout();
      this.router.navigate(['/login']);
    }

    
}
