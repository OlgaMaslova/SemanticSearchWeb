import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoadVocabularyComponent } from './components/load-vocabulary/load-vocabulary.component';
import { QueryComponent } from './components/query/query.component';

const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'load', component: LoadVocabularyComponent },
    { path: 'query', component: QueryComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
