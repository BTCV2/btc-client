import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-show-student',
  templateUrl: './show-student.component.html',
  styleUrls: ['./show-student.component.scss']
})
export class ShowStudentComponent implements OnInit {
  showStudentForm: FormGroup;
  constructor(private fb:FormBuilder, private route: Router) { }

  ngOnInit() {
    this.showStudentForm = this.fb.group({
      rollNumber:['', Validators.required],
      standard:['', Validators.required]
    })
  }

  navigateToStudentProfile = () => {
    this.route.navigate(['/student/'+this.showStudentForm.value.standard+'/'+this.showStudentForm.value.rollNumber]);
  }

}
