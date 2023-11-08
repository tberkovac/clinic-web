import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PaginationService<T> {
  private pageSource = new BehaviorSubject<number>(0);
  private pageSizeSource = new BehaviorSubject<number>(10);
  private totalCount = new BehaviorSubject<number>(10)
  private data = new BehaviorSubject<T[]>([])
  private startDate = new BehaviorSubject<Date | null>(null)
  private endDate = new BehaviorSubject<Date | null>(null)

  currentPage$ = this.pageSource.asObservable();
  currentPageSize$ = this.pageSizeSource.asObservable();
  data$ = this.data.asObservable();
  totalCount$ = this.totalCount.asObservable()
  startDate$ = this.startDate.asObservable()
  endDate$ = this.endDate.asObservable()


  constructor() { }

  setPage(page: number) {
    this.pageSource.next(page);
  }

  setPageSize(pageSize: number) {
    if(pageSize != this.pageSizeSource.getValue()) {
      this.setPage(1)
    }
    this.pageSizeSource.next(pageSize);
  }

  setTotalCount(totalCount: number) {
    this.totalCount.next(totalCount)
  }

  setData(data: T[]) {
    this.data.next(data);
  }
  
}
