import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ])
    ])
  ],
  template: `
    <div class="min-h-screen bg-gray-50 py-8" [@fadeIn]>
      <div class="container mx-auto px-4">
        <div class="max-w-2xl mx-auto">
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="p-6 bg-gray-50 border-b flex justify-between items-center">
              <h1 class="text-2xl font-bold text-gray-800">User Details</h1>
              <button 
                mat-raised-button 
                color="primary" 
                (click)="goBack()"
                class="hover:shadow-md"
              >
                <mat-icon class="mr-2">arrow_back</mat-icon>
                Go Back
              </button>
            </div>

            <div class="p-6" *ngIf="user">
              <div class="space-y-4">
                <div>
                  <h3 class="text-sm font-medium text-gray-500">Name</h3>
                  <p class="mt-1 text-lg text-gray-900">{{user.name}}</p>
                </div>
                <div>
                  <h3 class="text-sm font-medium text-gray-500">Email</h3>
                  <p class="mt-1 text-lg text-gray-900">{{user.email}}</p>
                </div>
                <div>
                  <h3 class="text-sm font-medium text-gray-500">Phone</h3>
                  <p class="mt-1 text-lg text-gray-900">{{user.phone}}</p>
                </div>
                <div>
                  <h3 class="text-sm font-medium text-gray-500">Address</h3>
                  <p class="mt-1 text-lg text-gray-900">{{user.address}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class UserDetailComponent implements OnInit {
  user: User | undefined;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.user = this.userService.getUser(+id);
    }
  }

  goBack(): void {
    this.location.back();
  }
} 