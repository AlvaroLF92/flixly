import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../core/shared/shared.module';

@Component({
  selector: 'app-private-menu',
  imports: [CommonModule,RouterModule,SharedModule],
  templateUrl: './private-menu.component.html',
  styleUrl: './private-menu.component.scss',
  standalone: true,
})
export class PrivateMenuComponent {

}
