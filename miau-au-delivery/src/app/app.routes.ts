import { Routes } from '@angular/router';
import { PetCreateComponent } from './features/pets/pages/pet-create/pet-create';
import { PetProfileComponent } from './features/pets/pages/pet-profile/pet-profile';

export const routes: Routes = [
  { path: '', redirectTo: 'pets/novo', pathMatch: 'full' },
  { path: 'pets/novo', component: PetCreateComponent },
  { path: 'pets/:id', component: PetProfileComponent },

];
