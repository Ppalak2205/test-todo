import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import * as signalR from '@microsoft/signalr';
import { environment } from '../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection!: signalR.HubConnection;
    private baseUrl = environment.apiUrl;
  
  messageReceived = new Subject<{ sender: string, text: string }>();

  constructor(private http: HttpClient) {}

  connect(taskId: number) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.baseUrl}hub?taskId=${taskId}`)
      .build();

    this.hubConnection.on('ReceiveMessage', (message) => {
      this.messageReceived.next(message);
    });

    this.hubConnection.start().catch(err => console.error(err));
  }

  sendMessage(taskId: number, message: string) {
    this.hubConnection.invoke('SendMessage', taskId, message)
      .catch(err => console.error(err));
  }

  getChat(taskId: number) {
    return this.http.get<{ sender: string, text: string }[]>(`${this.baseUrl}Chat/${taskId}`);
  }
}
