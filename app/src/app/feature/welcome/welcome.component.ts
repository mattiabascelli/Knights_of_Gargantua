import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { StoreService } from '@/core/store';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {

  private router = inject(Router);
  private store = inject(StoreService);

  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }

    const username = this.userForm.value.username!;
    this.store.player.name.set(username);
    this.store.ui.notifications.success(`Welcome, ${username}`);
    this.router.navigate(['/fight']);
  }
}
