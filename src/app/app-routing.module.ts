import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TranslateComponent} from "./translate/translate.component";
import {ThesaurusComponent} from "./thesaurus/thesaurus.component";


const routes: Routes = [
  {path: '', component: TranslateComponent},
  {path: 'translate', component: TranslateComponent},
  {path: 'thesaurus', component: ThesaurusComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
