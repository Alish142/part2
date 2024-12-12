import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

interface WorkoutPlan {
  workout_id: number;
  fitness_program: string;
  day: string;
  exercise_name: string;
  description: string;
  sets: number[];
}

@Component({
  selector: 'app-workout-plan',
  templateUrl: './workout-plan.page.html',
  styleUrls: ['./workout-plan.page.scss'],
})
export class WorkoutPlanPage implements OnInit {
  workoutPlan: WorkoutPlan | null = null;
  error: string | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadWorkoutPlan();
  }
  loadWorkoutPlan() {
    const clientId = localStorage.getItem('clientId');
    console.log('Stored Client ID:', clientId);
  
    if (!clientId) {
      this.error = 'Client ID not found. Please login again.';
      console.error('Missing clientId in localStorage');
      return;
    }
  
    this.apiService.getWorkoutPlan(clientId).subscribe(
      (data: WorkoutPlan) => {
        console.log('Workout plan received:', data);
        this.workoutPlan = data;
        this.error = null;
      },
      (error) => {
        console.error('Error fetching workout plan:', error);
        this.error = 'Failed to load workout plan. Please try again.';
      }
    );
  }
  
}

