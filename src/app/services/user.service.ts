import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      address: '123 Main St',
      createdAt: new Date()
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '987-654-3210',
      address: '456 Oak Ave',
      createdAt: new Date()
    }
  ];

  constructor() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    } else {
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  getUsers(): User[] {
    return this.users;
  }

  getUser(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }

  createUser(userData: Omit<User, 'id' | 'createdAt'>): void {
    const newUser: User = {
      ...userData,
      id: this.generateId(),
      createdAt: new Date()
    };
    this.users.push(newUser);
    this.updateStorage();
  }

  updateUser(user: User): void {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
      this.updateStorage();
    }
  }

  deleteUser(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
    this.updateStorage();
  }

  private updateStorage(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  private generateId(): number {
    return Math.max(0, ...this.users.map(u => u.id)) + 1;
  }
} 