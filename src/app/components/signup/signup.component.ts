import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { provideAnimations } from '@angular/platform-browser/animations';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule, ToastModule, MessagesModule,
   ],
    
  providers: [provideAnimations(), MessageService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm!: FormGroup;
  messages: Message[] = [];


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private cd: ChangeDetectorRef ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      telephone: [''],
      isAdmin: [false]
    });
   
  }
  addInitialMessage(): void {
    // Ajoutez votre message initial ici, si nécessaire
    // this.messages.push({ severity: 'info', summary: 'Bienvenue', detail: 'Veuillez remplir le formulaire pour vous inscrire.' });
  }
  show() {
    // this.messages = [{ severity: 'success', summary: 'Success', detail: 'Message Content' }];
    // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }
  
  signup(): void {
    console.log(this.signupForm.value);
    this.authService.signup(this.signupForm.value).subscribe(
      response => {
       this.addInitialMessage()
        this.messages = [{ severity: 'success', summary: 'Success', detail: 'Message Content' }];
        this.cd.markForCheck();
        console.log('Inscription réussie', response);
        // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
        // Gérer la réponse, par exemple en sauvegardant le token et en redirigeant l'utilisateur
        // this.router.navigate(['/login']);
      },
      error => {
        console.error('Erreur lors de l\'inscription', error);
        // Gérer l'erreur
      }
    );
  }
}
