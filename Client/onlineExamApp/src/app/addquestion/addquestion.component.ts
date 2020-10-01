import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OnlineExamService } from '../online-exam.service';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})
export class AddquestionComponent implements OnInit {
question:any;
mode: any;
sequence:any;
qsequence:any;
correctoptionid:any;
counter:number= 0;

  constructor(private toastr: ToastrService,private add: OnlineExamService, private fb: FormBuilder, private router:Router) { }

  ngOnInit(): void {
  }

  questionform = this.fb.group({
    examCode:['A001'],
    subCode:['S002'],
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

onSubmit(){
 let data:{} = this.questionform.value;
   this.add.addQuestion(data).subscribe((result) => {
    this.toastr.success(result.message);
    },error => this.toastr.error(error.error.messaage, error.status)
    );
  this.questionform.reset();
}

}
