import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../core/shared/shared.module';

@Component({
  selector: 'app-public-menu',
  imports: [CommonModule,RouterModule,SharedModule],
  templateUrl: './public-menu.component.html',
  styleUrl: './public-menu.component.scss',
  standalone: true,
})
export class PublicMenuComponent {

}
