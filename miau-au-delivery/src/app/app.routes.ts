import { Routes } from '@angular/router';

import { PetCreateComponent } from './features/pets/pages/pet-create/pet-create';
import { PetProfileComponent } from './features/pets/pages/pet-profile/pet-profile';

export const routes: Routes = [
  { path: '', redirectTo: 'pets/novo', pathMatch: 'full' },

  { path: 'pets/novo', component: PetCreateComponent },
  {
  path: 'pets/:id/editar',
  loadComponent: () =>
    import('./features/pets/pages/pet-edit/pet-edit').then(m => m.PetEditComponent),
},
  { path: 'pets/:id', component: PetProfileComponent },
  { path: 'pets/:id/carteirinha',
  loadComponent: () =>
    import('./features/pets/pages/pet-vaccines/pet-vaccines').then(
      (m) => m.PetVaccinesComponent
    ),
},

  {
    path: 'pets/:id/editar',
    loadComponent: () =>
      import('./features/pets/pages/pet-edit/pet-edit').then(
        (m) => m.PetEditComponent
      ),
  },
  {
  path: 'pets/:id/historico-medico',
  loadComponent: () =>
    import('./features/pets/pages/pet-medical-history/pet-medical-history')
      .then(m => m.PetMedicalHistoryComponent),
},
{
  path: 'pets/:id/historico-servicos',
  loadComponent: () =>
    import('./features/pets/pages/pet-service-history/pet-service-history')
      .then(m => m.PetServiceHistoryComponent),
},

  // opcional: fallback pra rotas inválidas
  { path: '**', redirectTo: 'pets/novo' },
];
