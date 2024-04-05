import { Component, OnInit } from '@angular/core';
import { TuteurService } from '../../services/tuteur.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { BrowserModule } from '@angular/platform-browser';
import { AjoutEnfantComponent } from '../ajout-enfant/ajout-enfant.component';
import { log } from 'console';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TableModule,AjoutEnfantComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  tuteur: any; 
  afficherFormulaire: boolean = false;
  enfantToEdit: any = null;
  isEditing: boolean = false;

  constructor(private tuteurService: TuteurService) {}

  ngOnInit() {
    this.getTuteurDetails();
  }


  getTuteurDetails(){
    this.tuteurService.getTuteurDetails().subscribe({
      next: (data) => {
        this.tuteur = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des informations du tuteur', error);
      }
    });
  }

  modifierEnfant(enfant: any) {
    // Implémentez la logique de modification ici
    console.log('modifier ', enfant)
  }
  
  supprimerEnfant(enfant: any) {
    // Implémentez la logique de suppression ici
    console.log('supprimer ', enfant)
  }
  afficherFormulaireAjout() {
    this.isEditing = false; // Indiquer que l'opération est un ajout
    this.enfantToEdit = null; // Réinitialiser l'enfant à éditer
    this.afficherFormulaire = true; // Afficher le formulaire
  }
  fermerFormulaire(): void {
    this.afficherFormulaire = false; // Cacher le formulaire
    this.enfantToEdit = null; // Optionnel, réinitialiser l'enfant à éditer
    this.isEditing = false; // Optionnel, réinitialiser le mode d'édition
  }
  
  updateEnfant(enfant: any) {
    console.log('modif ', enfant)
    this.enfantToEdit = enfant; // Définir les données de l'enfant à modifier
    this.afficherFormulaire = true; // Afficher le formulaire
    // this.tuteurService.updateEnfant(id, enfant).subscribe({
    //   next: (response) => {
    //     console.log('Enfant mis à jour', response);
    //     // Mettez à jour votre UI ici si nécessaire
    //   },
    //   error: (error) => console.error('Erreur lors de la mise à jour de l\'enfant', error)
    // });
  }

  deleteEnfant(id: string) {
    this.tuteurService.deleteEnfant(id).subscribe({
      next: (response) => {
        console.log('Enfant supprimé', response);
        // Mettez à jour votre UI ici si nécessaire
        this.getTuteurDetails()
      },
      error: (error) => console.error('Erreur lors de la suppression de l\'enfant', error)
    });
  }
  
}
