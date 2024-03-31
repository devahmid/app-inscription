// tuteur.model.ts
import { Enfant } from './enfant';

export interface Tuteur {
  _id?: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  password?: string; // Utiliser avec précaution, principalement pour la création ou la mise à jour
  isAdmin?: boolean;
  enfants: Enfant[];
}
