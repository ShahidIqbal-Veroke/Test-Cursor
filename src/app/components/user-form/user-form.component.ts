import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../services/user.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
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
    <div class="min-h-screen bg-gray-50 py-4" [@fadeIn]>
      <div class="container mx-auto px-3">
        <div class="max-w-2xl mx-auto">
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="p-3 bg-gray-50 border-b flex justify-between items-center">
              <h1 class="text-lg font-bold text-gray-800">
                {{ isEditMode ? 'Edit' : 'Create' }} User
              </h1>
              <button 
                mat-raised-button 
                color="primary" 
                (click)="goBack()"
                class="hover:shadow-md"
              >
                <mat-icon class="mr-1 scale-90">arrow_back</mat-icon>
                Back
              </button>
            </div>

            <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
              <div class="p-4 space-y-4">
                <div class="space-y-1">
                  <label class="text-sm font-medium text-gray-500">Name</label>
                  <mat-form-field appearance="outline" class="w-full h-[45px]">
                    <input matInput formControlName="name" placeholder="Enter name">
                    <mat-error *ngIf="userForm.get('name')?.errors?.['required']">
                      Required
                    </mat-error>
                  </mat-form-field>
                </div>

                <div class="space-y-1">
                  <label class="text-sm font-medium text-gray-500">Email</label>
                  <mat-form-field appearance="outline" class="w-full h-[45px]">
                    <input matInput formControlName="email" type="email" placeholder="Enter email">
                    <mat-error *ngIf="userForm.get('email')?.errors?.['required']">
                      Required
                    </mat-error>
                  </mat-form-field>
                </div>

                <div class="space-y-1">
                  <label class="text-sm font-medium text-gray-500">Phone</label>
                  <mat-form-field appearance="outline" class="w-full h-[45px]">
                    <input matInput formControlName="phone" placeholder="Enter phone">
                    <mat-error *ngIf="userForm.get('phone')?.errors?.['required']">
                      Required
                    </mat-error>
                  </mat-form-field>
                </div>

                <div class="space-y-1">
                  <label class="text-sm font-medium text-gray-500">Address</label>
                  <mat-form-field appearance="outline" class="w-full h-[70px]">
                    <textarea 
                      matInput 
                      formControlName="address" 
                      placeholder="Enter address" 
                      rows="2"
                    ></textarea>
                    <mat-error *ngIf="userForm.get('address')?.errors?.['required']">
                      Required
                    </mat-error>
                  </mat-form-field>
                </div>

                <div class="flex gap-2 pt-2">
                  <button 
                    mat-raised-button 
                    color="primary" 
                    type="submit"
                    [disabled]="userForm.invalid"
                    class="hover:shadow-md"
                  >
                    <mat-icon class="mr-1 scale-90">save</mat-icon>
                    {{ isEditMode ? 'Update' : 'Create' }}
                  </button>
                  <button 
                    mat-button 
                    type="button" 
                    (click)="goBack()"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    ::ng-deep {
      .mat-mdc-form-field {
        .mat-mdc-form-field-wrapper {
          padding: 0 !important;
        }
        .mat-mdc-form-field-subscript-wrapper {
          display: none;
        }
        .mat-mdc-text-field-wrapper {
          height: 45px;
        }
        .mat-mdc-form-field-flex {
          height: 45px;
        }
        .mdc-text-field--outlined {
          --mdc-typography-body1-line-height: 45px;
        }
        &.mat-mdc-form-field-type-mat-input .mat-mdc-text-field-wrapper.mdc-text-field--outlined .mat-mdc-form-field-infix {
          padding-top: 8px;
          padding-bottom: 8px;
        }
        .mat-mdc-form-field-infix {
          min-height: unset;
        }
        .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
          display: none;
        }
      }
      .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
        padding-right: 0;
      }
      .mat-mdc-form-field-error-wrapper {
        padding: 0;
        position: absolute;
        top: 0;
        right: 0;
      }
      .mat-mdc-form-field-error {
        font-size: 12px;
      }
      textarea.mat-mdc-input-element {
        margin: 8px 0 !important;
        padding: 0 !important;
        resize: none;
      }
      .mdc-text-field--outlined {
        --mdc-outlined-text-field-container-height: 45px;
      }
      .mdc-text-field {
        padding: 0 12px !important;
      }
    }
  `]
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
  userId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.userId = +id;
      const user = this.userService.getUser(this.userId);
      if (user) {
        this.userForm.patchValue(user);
      }
    }
  }

  onSubmit() {
    if (this.userForm.invalid) return;

    if (this.isEditMode && this.userId) {
      this.userService.updateUser({
        ...this.userForm.value,
        id: this.userId,
        createdAt: new Date()
      });
    } else {
      this.userService.createUser(this.userForm.value);
    }

    this.router.navigate(['/users']);
  }

  goBack(): void {
    this.location.back();
  }
} 