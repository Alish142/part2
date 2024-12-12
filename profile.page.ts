import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  clientDetails: any = null; // Use `any` to handle all backend-provided fields
  error: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadClientDetails();
  }

  loadClientDetails() {
    const clientData = localStorage.getItem('clientData');
    console.log('Stored Client Data:', clientData);

    if (clientData) {
      const parsedData = JSON.parse(clientData);
      const personalTrainerId = parsedData.personaltrainer_id;
      const clientId = parsedData.client_id; // Fetch client ID from localStorage

      console.log('Personal Trainer ID:', personalTrainerId);
      console.log('Client ID:', clientId);

      if (personalTrainerId && clientId) {
        this.apiService.getClientDetails(personalTrainerId, clientId).subscribe(
          (data: any) => {
            console.log('Client details received:', data);
            this.clientDetails = data; // Assign API response to clientDetails
          },
          (error) => {
            console.error('Error fetching client details:', error);
            this.error = 'Failed to load client details. Please try again.';
          }
        );
      } else {
        this.error = 'Missing Personal Trainer ID or Client ID. Please log in again.';
        console.error('Invalid Personal Trainer ID or Client ID in localStorage');
      }
    } else {
      this.error = 'No client data found. Please log in again.';
      console.error('No client data in localStorage');
    }
  }
}
