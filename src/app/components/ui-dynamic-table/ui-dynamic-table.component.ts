import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, of, Subscription, switchMap } from 'rxjs';
import { DynamicTableColumnModel } from 'src/core/classes/dynamic-table.model';

@Component({
  selector: 'app-ui-dynamic-table',
  templateUrl: './ui-dynamic-table.component.html',
  styleUrls: ['./ui-dynamic-table.component.scss']
})
export class UiDynamicTableComponent implements OnInit, OnDestroy {

  @ViewChild('inputSearch') search!: HTMLInputElement;
  @ViewChild("dt") tabla!: Table

  @Input() values!: any[];
  @Input() cols!: DynamicTableColumnModel[];
  @Input() loading!: boolean;
  @Input() rows = 5;
  @Input() totalRecords!: number;
  @Input() defaultSortField!: string;
  @Input() defaultSortOrder!: number;
  @Input() tableTitle!: string;

  @Output() lazyLoadAction = new EventEmitter<LazyLoadEvent>()

  @Output() newClick = new EventEmitter();

  @Input() editEnabled = true;
  @Output() editClick = new EventEmitter<any>();

  @Input() detailEnabled = false;
  @Output() detailClick = new EventEmitter<any>();

  ngOnInit(): void {

    let lastSearch = "";

    this.searchSubscription = this.searchSubject
    .pipe(
      debounceTime(600),
      distinctUntilChanged(),
      filter(value => value !== "" || value !== lastSearch),
      switchMap((searchQuery) => {
        lastSearch = searchQuery;
        this.lazyLoadEvent({...this.lastRefresh, first: 0, rows: this.rows}, searchQuery);
        return of(searchQuery);
      }),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }

  @Input() searchEnabled = true;

  private readonly searchSubject = new BehaviorSubject<string>("");
  private searchSubscription?: Subscription;

  public onSearchQueryInput(event: Event): void {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchQuery?.trim());
  }

  lastRefresh!: LazyLoadEvent;

  lazyLoadEvent(event?: LazyLoadEvent, globalFilter?: string){
    if(event === undefined){
      event = {...this.lastRefresh, globalFilter: globalFilter}
    }else{
      event = {...event, globalFilter: this.searchSubject.getValue()}
      this.lastRefresh = event;
    }
    this.lazyLoadAction.emit(event);
  }

  @Input() deleteEnabled = true;
  @Input() confirmationMessage!: string;
  @Input() confirmationHeader!: string;
  @Input() confirmationValue!: string;
  @Input() confirmationAcceptLabel!: string;
  @Input() confirmationRejectLabel!: string;

  @Output() deleteConfirmed = new EventEmitter<any>();
  @Output() deleteRejected = new EventEmitter();

  constructor(
    private confirmationService: ConfirmationService
  ) { }

  deleteRow(row: any){
    this.confirmationService.confirm({
      header: `${this.confirmationHeader} "${row[this.confirmationValue ? this.confirmationValue : this.defaultSortField]}"` ,
      accept: () => {this.deleteConfirmed.emit(row)},
      reject: () => {this.deleteRejected.emit()}
    });
  }

}
