// tuteur.service.ts
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tuteur } from '../models/tuteur';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TuteurService {

    private apiUrl = 'http://service-api.fr:3000/api/tuteurs'; // Ajustez selon votre configuration API
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
        return localStorage.getItem('monToken');
      }
      return null;
    }
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
