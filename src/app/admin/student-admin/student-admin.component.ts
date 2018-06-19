import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-admin',
  templateUrl: './student-admin.component.html',
  styleUrls: ['./student-admin.component.css']
})
export class StudentAdminComponent implements OnInit {
  studentOperations = 'create';
  constructor() { }

  ngOnInit() {
  }
  addStudent = () => {
    this.studentOperations = 'create';
  }
  editStudent = () => {
    this.studentOperations = 'edit';
  }
  deleteStudent = () => {
    this.studentOperations = 'delete';
  }
  viewStudent = () => {
    this.studentOperations = 'show';
  }
}
