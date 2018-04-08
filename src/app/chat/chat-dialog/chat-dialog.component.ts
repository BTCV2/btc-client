import { Component, OnInit } from '@angular/core';
import {ChatService, Message } from '../chat.service'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';
@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss']
})
export class ChatDialogComponent implements OnInit {
  isClosed: boolean;
  messages: Observable<Message[]>;
  formValue: string;
  constructor(private chat:ChatService) { }

  ngOnInit() {
    this.messages = this.chat.conversation.asObservable()
        .scan((acc, val) => acc.concat(val) );
    this.isClosed = true;
  }
  toggleChat = () => {
    this.isClosed = (this.isClosed === true) ? false : true;
  }
  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = '';
  }

}
