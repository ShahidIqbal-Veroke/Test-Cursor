import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="min-h-screen bg-gray-50 py-4">
      <div class="container mx-auto px-3">
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <div class="p-3 bg-gray-50 border-b flex justify-between items-center">
            <h1 class="text-lg font-bold text-gray-800">Users</h1>
            <button 
              mat-raised-button 
              color="primary" 
              [routerLink]="['/users/new']"
            >
              <mat-icon class="mr-1">add</mat-icon>
              Add User
            </button>
          </div>

          <table class="min-w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase w-28">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr *ngFor="let user of users" class="hover:bg-gray-50">
                <td class="px-3 py-2 whitespace-nowrap text-sm">{{user.name}}</td>
                <td class="px-3 py-2 whitespace-nowrap text-sm">{{user.email}}</td>
                <td class="px-3 py-2 whitespace-nowrap text-sm">{{user.phone}}</td>
                <td class="px-3 py-2 whitespace-nowrap">
                  <div class="flex gap-0">
                    <button mat-icon-button [routerLink]="['/users', user.id]" 
                            color="primary" 
                            class="scale-75">
                      <mat-icon>visibility</mat-icon>
                    </button>
                    <button mat-icon-button [routerLink]="['/users', user.id, 'edit']" 
                            color="accent" 
                            class="scale-75">
                      <mat-icon>edit</mat-icon>
                    </button>
                    <button mat-icon-button (click)="deleteUser(user.id)" 
                            color="warn" 
                            class="scale-75">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div *ngIf="users.length === 0" class="p-8 text-center text-gray-500">
            No users found
          </div>
        </div>
      </div>
    </div>
  `
})
export class UserListComponent {
  users: User[] = [];

  constructor(private userService: UserService) {
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.userService.getUsers();
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id);
      this.loadUsers();
    }
  }
} 