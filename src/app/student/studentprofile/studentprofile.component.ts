import { Component, OnInit } from '@angular/core';
import{StudentService} from '../../service/student.service'
@Component({
  selector: 'app-studentprofile',
  templateUrl: './studentprofile.component.html',
  styleUrls: ['./studentprofile.component.scss']
})
export class StudentprofileComponent implements OnInit {
  profile : any;
  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getSutdent(localStorage.getItem('userName')).subscribe(
      (res) => {
        this.profile = res;
        console.log('this.profile', this.profile);
      },
      (err) => {
      },
      () =>{
      }
    );
    
  }

}
