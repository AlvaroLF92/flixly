import { Component, OnInit, ElementRef } from '@angular/core';
import { MovieService, Movie } from '../../../core/services/movie.service';
import { MovieSliderComponent } from '../../../shared/movie-slider/movie-slider.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  popularMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getPopularMovies().subscribe((res) => {
      this.popularMovies = res.results;
    });

    this.movieService.getTopRatedMovies().subscribe((res) => {
      this.topRatedMovies = res.results;
    });

    this.movieService.getUpcomingMovies().subscribe((res) => {
      this.upcomingMovies = res.results;
    });
  }

  scrollLeft(container: ElementRef | HTMLElement) {
    const el = this.getElement(container);
    el.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight(container: ElementRef | HTMLElement) {
    const el = this.getElement(container);
    el.scrollBy({ left: 300, behavior: 'smooth' });
  }

  private getElement(container: ElementRef | HTMLElement): HTMLElement {
    return container instanceof ElementRef
      ? container.nativeElement
      : container;
  }
}
