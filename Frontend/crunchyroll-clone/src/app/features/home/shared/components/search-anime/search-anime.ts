import {Component, signal, output, input} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-anime',
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './search-anime.html',
  styleUrl: './search-anime.css',
})
export class SearchAnime {
  searchTerm = signal<string>('');
  resultsCount = input<number>();

  search = output<string>();
  clearSearch = output<void>();
  resetSearch = output<void>();

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  onSearch(): void {
    if (this.searchTerm()) {
      this.search.emit(this.searchTerm());
    }
  }

  onClear(): void {
    this.searchTerm.set('');
    this.clearSearch.emit();
  }

  onReset(): void {
    this.searchTerm.set('');
    this.resetSearch.emit();
  }

  showResultsInfo(): boolean {
    return this.searchTerm().length > 0;
  }
}
