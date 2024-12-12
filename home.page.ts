import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor() {}

  getWelcomeMessage(): string {
    const clientName = localStorage.getItem('clientName') || 'Client';
    return `Welcome!`;
  }
}

