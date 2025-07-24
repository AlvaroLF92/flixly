import { Component } from '@angular/core';
import { SharedModule } from '../../core/shared/shared.module';

@Component({
  selector: 'app-footer',
  imports: [SharedModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  standalone: true,
})
export class FooterComponent {

}
