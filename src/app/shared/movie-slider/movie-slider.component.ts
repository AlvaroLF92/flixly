import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../core/services/movie.service';

@Component({
  selector: 'app-movie-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-slider.component.html',
  styleUrl: './movie-slider.component.scss'
})
export class MovieSliderComponent {
  @Input() title: string = '';
  @Input() movies: Movie[] = [];
}
