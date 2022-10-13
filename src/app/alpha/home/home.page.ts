import { Component } from '@angular/core';
import { timer } from 'rxjs';
import { Gui } from '../../services/gui.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  constructor(private gui: Gui) {
  }

  onChange(): void {
    // Note: Long timers avoid the flicker. Short timers do not.
    this.gui.openLoadAlert(() => timer(50)).subscribe();
  }
}
