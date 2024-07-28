import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { StoreService } from '@/core/store';
import { GameFlowService } from '@/core/game';

@Component({
  selector: 'app-feature-welcome',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeFeatureComponent {

  private gameFlow = inject(GameFlowService);
  private store = inject(StoreService);

  // TODO: Remove
  ngOnInit() {
    setTimeout(() => {
      const username = 'Player Name';
      this.store.player.name.set(username);
      this.store.player.initialized.set(true);
      this.gameFlow.nextEvent(42); // Enemy: easy
    }, 100);
  }

  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
  });

  get fUsername(): FormControl {
    return this.userForm.get('username')! as FormControl;
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }

    const username = this.userForm.value.username!;
    this.store.player.name.set(username);
    this.store.player.initialized.set(true);
    this.gameFlow.nextEvent();
  }
}
