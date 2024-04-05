import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Tuteur } from '../models/tuteur';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://service-api.fr/api/tuteurs'; // Mettez à jour avec votre URL d'API
  // private apiUrl = 'http://service-api.fr:3000/api/tuteurs'; // Mettez à jour avec votre URL d'API
  // private apiUrl = 'http://localhost:3000/api/tuteurs'; // Mettez à jour avec votre URL d'API
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  get isLoggedInObservable(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  signup(tuteur: Tuteur): Observable<Tuteur> {
    // Notez que nous n'incluons pas _id dans l'objet envoyé au serveur
    const { _id, ...data } = tuteur;
    return this.http.post<Tuteur>(`${this.apiUrl}/signup`, data);
  }


  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          this.saveToken(response.token);
          this.saveUserId(response.tuteur._id);
          this.loggedIn.next(true);
        }),
        catchError(error => {
          console.error('Erreur de connexion', error);
          // Relancez l'erreur pour qu'elle soit traitée dans le gestionnaire `error` de la souscription
          return throwError(() => error);
        })
      );
  }
  logout(): void {
    localStorage.removeItem('authToken');
    this.loggedIn.next(false);
    // Rediriger l'utilisateur vers la page de connexion ou page d'accueil ici si nécessaire
  }

  private saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }
  private saveUserId(token: string): void {
    localStorage.setItem('userId', token);
  }

  // getToken(): string | null {
  //   return localStorage.getItem('authToken');
  // }
  getToken() {
    if (isPlatformBrowser(this.platformId)) {
      // Accès à localStorage seulement si exécuté côté client
      return localStorage.getItem('authToken');
    }
    return null;
  }
  isLoggedIn(): boolean {
    const token = this.getToken();
    console.log(token)
    // Ici, vous pouvez ajouter une logique supplémentaire pour vérifier la validité du token
    return !!token;
  }
}
