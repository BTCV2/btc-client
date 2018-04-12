import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from './chat.service';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,ReactiveFormsModule,FormsModule
  ],
  declarations: [],
  providers: [ChatService]
})
export class ChatModule { }
