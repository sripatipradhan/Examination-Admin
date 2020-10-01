import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddquestionComponent } from './addquestion/addquestion.component';
import { ViewQuestionsComponent } from './view-questions/view-questions.component';


const routes: Routes = [{ path: "" , children:[
                {path: "addquestion", component: AddquestionComponent },
                {path: "viewQuestion", component: ViewQuestionsComponent }]
                }];
                

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const rootcamp = [
                AddquestionComponent,
                ViewQuestionsComponent
            ]