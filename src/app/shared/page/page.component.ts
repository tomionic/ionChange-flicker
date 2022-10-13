import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent {
  @Input()
  showBack = false;

  @Input()
  title = '';

  @Output()
  close = new EventEmitter<void>();

  @Output()
  save = new EventEmitter<void>();

  @Output()
  submit = new EventEmitter<void>();

  get showClose(): boolean {
    return this.close.observed;
  }

  get showSave(): boolean {
    return this.save.observed;
  }

  get showSubmit(): boolean {
    return this.submit.observed;
  }
}
