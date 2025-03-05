import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();

  show() {
    this.isLoading.next(true);
    setTimeout(() => {
      this.hide();
    },500); // Hide after 1.5 seconds
  }

  hide() {
    this.isLoading.next(false);
  }
}
