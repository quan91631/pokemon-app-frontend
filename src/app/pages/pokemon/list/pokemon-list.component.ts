import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  takeUntil,
} from 'rxjs';
import {
  selectPokemons,
  selectPokemonLoading,
  selectPokemonError,
  selectPokemonPagination,
} from '../../../store/pokemon/pokemon.selectors';
import {
  loadPokemons,
  selectPokemon,
  toggleFavorite,
  importCsv,
} from '../../../store/pokemon/pokemon.actions';
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';
import { PokemonCardComponent } from 'src/app/components/pokemon-card/pokemon-card.component';
import { LoadingSpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { Pokemon, PokemonListParams } from 'src/app/types/pokemon';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PokemonCardComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    // PokemonDetailModalComponent
  ],
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent implements OnInit, OnDestroy {
  pokemons$: Observable<Pokemon[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  pagination$: Observable<any>;
  searchForm: FormGroup;
  currentLimit = 20;
  currentPage = 1;

  private destroy$ = new Subject<void>();

  pokemonTypes = [
    'Normal',
    'Fire',
    'Water',
    'Electric',
    'Grass',
    'Ice',
    'Fighting',
    'Poison',
    'Ground',
    'Flying',
    'Psychic',
    'Bug',
    'Rock',
    'Ghost',
    'Dragon',
    'Dark',
    'Steel',
    'Fairy',
  ];

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.pokemons$ = this.store.select(selectPokemons);
    this.loading$ = this.store.select(selectPokemonLoading);
    this.error$ = this.store.select(selectPokemonError);
    this.pagination$ = this.store.select(selectPokemonPagination);

    this.searchForm = this.fb.group({
      search: [''],
      type: [''],
      legendary: [''],
      speedMin: [''],
      speedMax: [''],
    });
  }

  ngOnInit(): void {
    this.loadFromQueryParams();
    this.setupSearchDebounce();
    this.loadPokemons();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadFromQueryParams(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.currentPage = Number(params['page']) || 1;
        this.currentLimit = Number(params['limit']) || 20;

        this.searchForm.patchValue({
          search: params['search'] || '',
          type: params['type'] || '',
          legendary: params['legendary'] || '',
          speedMin: params['speedMin'] || '',
          speedMax: params['speedMax'] || '',
        });
      });
  }

  private setupSearchDebounce(): void {
    this.searchForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.onSearch();
      });
  }

  private loadPokemons(): void {
    const params = this.buildSearchParams();
    this.store.dispatch(loadPokemons({ params }));
  }

  private buildSearchParams(): PokemonListParams {
    const formValue = this.searchForm.value;
    return {
      page: this.currentPage,
      limit: this.currentLimit,
      search: formValue.search || undefined,
      type: formValue.type || undefined,
      legendary: formValue.legendary
        ? formValue.legendary === 'true'
        : undefined,
      speedMin: formValue.speedMin || undefined,
      speedMax: formValue.speedMax || undefined,
    };
  }

  private updateUrl(): void {
    const params = this.buildSearchParams();
    const queryParams: any = { page: params.page, limit: params.limit };

    if (params.search) queryParams.search = params.search;
    if (params.type) queryParams.type = params.type;
    if (params.legendary !== undefined)
      queryParams.legendary = params.legendary;
    if (params.speedMin) queryParams.speedMin = params.speedMin;
    if (params.speedMax) queryParams.speedMax = params.speedMax;

    this.router.navigate([], { queryParams, queryParamsHandling: 'merge' });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.updateUrl();
    this.loadPokemons();
  }

  onClearFilters(): void {
    this.searchForm.reset();
    this.currentPage = 1;
    this.updateUrl();
    this.loadPokemons();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateUrl();
    this.loadPokemons();
  }

  onLimitChange(event: any): void {
    this.currentLimit = Number(event.target.value);
    this.currentPage = 1;
    this.updateUrl();
    this.loadPokemons();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.store.dispatch(importCsv({ file }));
    }
  }

  onPokemonClick(pokemon: Pokemon): void {
    this.store.dispatch(selectPokemon({ pokemon }));
  }

  onFavoriteClick(pokemonId: number): void {
    this.store.dispatch(toggleFavorite({ pokemonId }));
  }

  getPageNumbers(pagination: any): number[] {
    const totalPages = Math.ceil(pagination.total / pagination.limit);
    const pages = [];
    const maxPages = 5;

    let startPage = Math.max(1, pagination.page - Math.floor(maxPages / 2));
    let endPage = Math.min(totalPages, startPage + maxPages - 1);

    if (endPage - startPage + 1 < maxPages) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  Math = Math;
}
