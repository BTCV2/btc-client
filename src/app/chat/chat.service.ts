import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {ApiAiClient} from '../../lib/api-ai-javascript/index';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { of } from 'rxjs/observable/of';
import {Constants} from '../constants';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export class Message {
  constructor(public content: string, public sentBy: string) {}
}
@Injectable()
export class ChatService {
  conversation = new BehaviorSubject<Message[]>([]);
  readonly token = environment.dialogflow["btc-bot"];
  readonly client = new ApiAiClient({accessToken:this.token})
  constructor() { }
  converse(msg: string) {
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);

    return this.client.textRequest(msg)
               .then(res => {
                  const speech = res.result.fulfillment.speech;
                  const botMessage = new Message(speech, 'bot');
                  this.update(botMessage);
               });
  }
  update(msg: Message) {
    this.conversation.next([msg]);
  }
}
