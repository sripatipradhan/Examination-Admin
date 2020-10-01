import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OnlineExamService } from '../online-exam.service';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {
questionlist:any;
subCode:any = "S001";
searchStatus = "";
viewDetail:any;
message: any;
v1: boolean;
 p: number = 1;
  constructor(private toastr: ToastrService, private view: OnlineExamService,  private fb: FormBuilder) { }

  ngOnInit(): void {
     this.view.getQuestionPaper(this.subCode).subscribe((result) => {
        this.questionlist = JSON.parse(JSON.stringify(result))
    });
       this.viewDetail = { options:[]};
 }


getoptions(){
  return this.viewDetail.options;
}

 questionform = this.fb.group({
    mode:['', Validators.required],
    sequence: ['', Validators.required],
    qsequence:['', Validators.required],
    correctOptionId: ['', Validators.required],
    question: ['', Validators.required],
    options: this.fb.array([
    ])
  });
addoption(){

  return (<FormArray>this.questionform.get('options')).push(this.addoptionGroup());
}
 
getControls() {
  return (this.questionform.get('options') as FormArray).controls;
}

  addoptionGroup(): FormGroup{
    return this.fb.group({
      id:['', Validators.required],
      text: ['', Validators.required],
      AOA: ['', Validators.required]
    })
  }

removeoption(i:number):void{
  (<FormArray>this.questionform.get('options')).removeAt(i);
}
viewQuestionDetail(x){
    this.viewDetail = x;
    this.v1= true;
  }

  onEdit(){
    this.v1=false;
  }

  onCancel(){
    this.v1= true;
  }


onSubmit(){
    this.v1= true;
  let data:{} = this.questionform.value;
  console.log(this.viewDetail.questionID+ 'id');
  console.log(data+ 'data')
   this.view.updateQuestion(this.viewDetail.questionID,data).subscribe((result) => {
    this.toastr.success(result.message);
    },error => this.toastr.error(error.error.messaage, error.status)
    );
}


deleteQuestionDetail(subCode,questionID,){
  let data = {subCode: subCode, questionID: questionID};
  this.view.deleteQuestionPaper(data).subscribe(result =>{
     this.toastr.success(result.message)
        },
       error => this.toastr.error(error.error.messaage, error.status)
  )
  this.ngOnInit();
}

}
