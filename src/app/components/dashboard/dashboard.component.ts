import { Component, OnInit } from '@angular/core';
import { TuteurService } from '../../services/tuteur.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  tuteur: any; 

  constructor(private tuteurService: TuteurService) {}

  ngOnInit() {
    this.tuteurService.getTuteurDetails().subscribe({
      next: (data) => {
        this.tuteur = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des informations du tuteur', error);
      }
    });
  }
}
