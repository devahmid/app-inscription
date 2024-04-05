import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { AjoutEnfantComponent } from './components/ajout-enfant/ajout-enfant.component';

export const routes: Routes = [
    { path: '', component: SignupComponent, canActivate: [authGuard] },
    { path: 'signup', component: SignupComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'dashboard', component: AjoutEnfantComponent, canActivate: [authGuard] }
];
