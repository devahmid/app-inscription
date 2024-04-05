// tuteur.service.ts
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Tuteur } from '../models/tuteur';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TuteurService {

    private apiUrl = 'https://service-api.fr/api/tuteurs'; // Ajustez selon votre configuration API
    // private apiUrl = 'http://service-api.fr:3000/api/tuteurs'; // Ajustez selon votre configuration API
    // private apiUrl = 'http://localhost:3000/api/tuteurs'; // Ajustez selon votre configuration API

    constructor(private http: HttpClient,@Inject(PLATFORM_ID) private platformId: Object ) { }
  
    getTuteurDetails(): Observable<any> { // Remplacez `any` par un type plus précis si possible
      return this.http.get(`${this.apiUrl}/me`, {
        headers: { Authorization: `Bearer ${this.getToken()}` }
      });
    }
  
    // private getToken(): string | null {
    //   return localStorage.getItem('authToken');
    // }
    getToken() {
      if (isPlatformBrowser(this.platformId)) {
        // Accès à localStorage seulement si exécuté côté client
        return localStorage.getItem('authToken');
      }
      return null;
    }
    
    getUserId(): string | null {
      return localStorage.getItem('userId');
    }
    
    ajouterEnfant(enfant: any): Observable<any> {
      // Assurez-vous que l'appel est exécuté côté client, où localStorage est accessible
      if (isPlatformBrowser(this.platformId)) {
          const headers = { Authorization: `Bearer ${this.getToken()}` };
          return this.http.post(`${this.apiUrl}/enfants`, enfant, { headers });
      }
      // Retournez une erreur ou un Observable vide si non exécuté côté client
      return throwError(() => new Error('Cette opération est uniquement disponible côté client.'));
  }

  // Dans tuteur.service.ts

updateEnfant(enfantId: string, enfantData: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/enfants/${enfantId}`, enfantData, {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`)
  });
}

deleteEnfant(enfantId: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/enfants/${enfantId}`, {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`)
  });
}

  

  // updateEnfant(id: string, enfant: any): Observable<any> {
  //   if (isPlatformBrowser(this.platformId)) {
  //     const headers = { Authorization: `Bearer ${this.getToken()}` };
  //     return this.http.put(`${this.apiUrl}/enfants/${id}`, enfant, { headers });
  //   }
  //   return throwError(() => new Error('Cette opération est uniquement disponible côté client.'));
  // }

  // deleteEnfant(id: string): Observable<any> {
  //   if (isPlatformBrowser(this.platformId)) {
  //     const headers = { Authorization: `Bearer ${this.getToken()}` };
  //     return this.http.delete(`${this.apiUrl}/enfants/${id}`, { headers });
  //   }
  //   return throwError(() => new Error('Cette opération est uniquement disponible côté client.'));
  // }
//   private apiUrl = 'http://localhost:3000/api/tuteurs';

//   constructor(private http: HttpClient) { }

//   getTuteurs(): Observable<Tuteur[]> {
//     return this.http.get<Tuteur[]>(this.apiUrl);
//   }

//   getTuteurById(id: string): Observable<Tuteur> {
//     return this.http.get<Tuteur>(`${this.apiUrl}/${id}`);
//   }

//   createTuteur(tuteur: Tuteur): Observable<Tuteur> {
//     return this.http.post<Tuteur>(this.apiUrl, tuteur);
//   }

//   updateTuteur(id: string, tuteur: Tuteur): Observable<Tuteur> {
//     return this.http.put<Tuteur>(`${this.apiUrl}/${id}`, tuteur);
//   }

//   deleteTuteur(id: string): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${id}`);
//   }
}
