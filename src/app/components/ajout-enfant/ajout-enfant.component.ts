import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuteurService } from '../../services/tuteur.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, formatDate } from '@angular/common';
import { Enfant } from '../../models/enfant';

@Component({
  selector: 'app-ajout-enfant',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './ajout-enfant.component.html',
  styleUrls: ['./ajout-enfant.component.css']
})
export class AjoutEnfantComponent implements OnInit, OnChanges  {
  enfantForm!: FormGroup;
  @Input() isEditing: boolean = false;
  @Input() enfantToEdit: any;
  @Output() annulation = new EventEmitter<void>();
  @Output() miseAJourRequise = new EventEmitter<void>();
  constructor(private fb: FormBuilder, private tuteurService: TuteurService, private changeDetectorRef: ChangeDetectorRef) {
   console.log(this.enfantToEdit)
  }

  ngOnInit(): void {
    this.initForm();
    if (this.enfantToEdit) {
      this.isEditing = true;
      this.preFillForm(this.enfantToEdit);
    }
    console.log(this.enfantToEdit)
  }

  
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['enfantToEdit']) {
  //     this.initForm(); // Initialise ou réinitialise le formulaire ici
  //     if (this.enfantToEdit) {
  //       this.isEditing = true;
  //       this.preFillForm(this.enfantToEdit); // Pré-remplit le formulaire avec les données existantes
  //     } else {
  //       this.isEditing = false;
  //       // Optionnel : Réinitialiser le formulaire à son état vide initial ici, si nécessaire
  //     }
  //   }
  // }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['enfantToEdit']) {
      // Réinitialiser le formulaire indépendamment de la condition
      this.initForm();
      if (this.enfantToEdit) {
        this.isEditing = true;
        this.preFillForm(this.enfantToEdit); // Pré-remplir le formulaire avec les données existantes
      } else {
        this.isEditing = false;
        // Le formulaire est déjà réinitialisé par initForm()
      }
    }
  }
  annuler(){
    this.annulation.emit();
  }  
  
  // initForm() {
  //   if (!this.isEditing) {
  //     this.enfantForm = this.fb.group({
  //       nom: ['', Validators.required],
  //       prenom: ['', Validators.required],
  //       dateNaissance: ['', Validators.required],
  //     });
  //   }
  // }
  initForm() {
    // Toujours réinitialiser le formulaire ici
    this.enfantForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
    });
  }
  
  // initForm() {
  //   // this.enfantForm.reset();
  //   this.enfantForm = this.fb.group({
  //     nom: ['', Validators.required],
  //     prenom: ['', Validators.required],
  //     dateNaissance: ['', Validators.required]
  //   });
  // }
  
  preFillForm(enfant: any) {
    const formattedDateNaissance = formatDate(enfant.dateNaissance, 'yyyy-MM-dd', 'en-US');
    this.enfantForm.patchValue({
      nom: enfant.nom,
      prenom: enfant.prenom,
      dateNaissance: formattedDateNaissance
    });
  }
  onSubmit() {
    if (this.enfantForm.valid) {
      if (this.enfantToEdit) {
        // Appel du service pour mettre à jour l'enfant
        this.tuteurService.updateEnfant(this.enfantToEdit._id, this.enfantForm.value).subscribe({
          next: (data) => {
            console.log('Enfant mis à jour avec succès', data);
            // Traitez la mise à jour de l'UI ici
            this.annuler();
            this.miseAJourRequise.emit();
          },
          error: (error) => console.error('Erreur lors de la mise à jour de l\'enfant', error)
        });
      } else {
        // Appel du service pour ajouter un nouvel enfant
        this.tuteurService.ajouterEnfant(this.enfantForm.value).subscribe({
          next: (data) => {
            console.log('Enfant ajouté avec succès');
            // Traitez l'ajout dans l'UI ici
            this.annuler();
            this.miseAJourRequise.emit();
          },
          error: (error) => console.error('Erreur lors de l\'ajout de l\'enfant', error)
        });
      }
    }
  }
  ajouterEnfant(): void {
    if (this.enfantForm.valid) {
      this.tuteurService.ajouterEnfant(this.enfantForm.value).subscribe({
        next: () => {
          console.log('Enfant ajouté avec succès');
          // Vous pouvez ici fermer le formulaire ou afficher un message de succès
          this.annuler();
        },
        error: (error: any) => console.error('Erreur lors de l\'ajout de l\'enfant', error)
      });
    }
  }
}
