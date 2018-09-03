/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { getValueInRange, isNumber } from '../util/util';
import { NgbPaginationConfig } from './pagination-config';
/**
 * A directive that will take care of visualising a pagination bar and enable / disable buttons correctly!
 */
export class NgbPagination {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.pageCount = 0;
        this.pages = [];
        /**
         *  Current page. Page numbers start with 1
         */
        this.page = 1;
        /**
         *  An event fired when the page is changed.
         *  Event's payload equals to the newly selected page.
         *  Will fire only if collection size is set and all values are valid.
         *  Page numbers start with 1
         */
        this.pageChange = new EventEmitter(true);
        this.disabled = config.disabled;
        this.boundaryLinks = config.boundaryLinks;
        this.directionLinks = config.directionLinks;
        this.ellipses = config.ellipses;
        this.maxSize = config.maxSize;
        this.pageSize = config.pageSize;
        this.rotate = config.rotate;
        this.size = config.size;
    }
    /**
     * @return {?}
     */
    hasPrevious() { return this.page > 1; }
    /**
     * @return {?}
     */
    hasNext() { return this.page < this.pageCount; }
    /**
     * @param {?} pageNumber
     * @return {?}
     */
    selectPage(pageNumber) { this._updatePages(pageNumber); }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) { this._updatePages(this.page); }
    /**
     * @param {?} pageNumber
     * @return {?}
     */
    isEllipsis(pageNumber) { return pageNumber === -1; }
    /**
     * Appends ellipses and first/last page number to the displayed pages
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    _applyEllipses(start, end) {
        if (this.ellipses) {
            if (start > 0) {
                if (start > 1) {
                    this.pages.unshift(-1);
                }
                this.pages.unshift(1);
            }
            if (end < this.pageCount) {
                if (end < (this.pageCount - 1)) {
                    this.pages.push(-1);
                }
                this.pages.push(this.pageCount);
            }
        }
    }
    /**
     * Rotates page numbers based on maxSize items visible.
     * Currently selected page stays in the middle:
     *
     * Ex. for selected page = 6:
     * [5,*6*,7] for maxSize = 3
     * [4,5,*6*,7] for maxSize = 4
     * @return {?}
     */
    _applyRotation() {
        /** @type {?} */
        let start = 0;
        /** @type {?} */
        let end = this.pageCount;
        /** @type {?} */
        let leftOffset = Math.floor(this.maxSize / 2);
        /** @type {?} */
        let rightOffset = this.maxSize % 2 === 0 ? leftOffset - 1 : leftOffset;
        if (this.page <= leftOffset) {
            // very beginning, no rotation -> [0..maxSize]
            end = this.maxSize;
        }
        else if (this.pageCount - this.page < leftOffset) {
            // very end, no rotation -> [len-maxSize..len]
            start = this.pageCount - this.maxSize;
        }
        else {
            // rotate
            start = this.page - leftOffset - 1;
            end = this.page + rightOffset;
        }
        return [start, end];
    }
    /**
     * Paginates page numbers based on maxSize items per page
     * @return {?}
     */
    _applyPagination() {
        /** @type {?} */
        let page = Math.ceil(this.page / this.maxSize) - 1;
        /** @type {?} */
        let start = page * this.maxSize;
        /** @type {?} */
        let end = start + this.maxSize;
        return [start, end];
    }
    /**
     * @param {?} newPageNo
     * @return {?}
     */
    _setPageInRange(newPageNo) {
        /** @type {?} */
        const prevPageNo = this.page;
        this.page = getValueInRange(newPageNo, this.pageCount, 1);
        if (this.page !== prevPageNo && isNumber(this.collectionSize)) {
            this.pageChange.emit(this.page);
        }
    }
    /**
     * @param {?} newPage
     * @return {?}
     */
    _updatePages(newPage) {
        this.pageCount = Math.ceil(this.collectionSize / this.pageSize);
        if (!isNumber(this.pageCount)) {
            this.pageCount = 0;
        }
        // fill-in model needed to render pages
        this.pages.length = 0;
        for (let i = 1; i <= this.pageCount; i++) {
            this.pages.push(i);
        }
        // set page within 1..max range
        this._setPageInRange(newPage);
        // apply maxSize if necessary
        if (this.maxSize > 0 && this.pageCount > this.maxSize) {
            /** @type {?} */
            let start = 0;
            /** @type {?} */
            let end = this.pageCount;
            // either paginating or rotating page numbers
            if (this.rotate) {
                [start, end] = this._applyRotation();
            }
            else {
                [start, end] = this._applyPagination();
            }
            this.pages = this.pages.slice(start, end);
            // adding ellipses
            this._applyEllipses(start, end);
        }
    }
}
NgbPagination.decorators = [
    { type: Component, args: [{
                selector: 'ngb-pagination',
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: { 'role': 'navigation' },
                template: `
    <ul [class]="'pagination' + (size ? ' pagination-' + size : '')">
      <li *ngIf="boundaryLinks" class="page-item"
        [class.disabled]="!hasPrevious() || disabled">
        <a aria-label="First" i18n-aria-label="@@ngb.pagination.first-aria" class="page-link" href
          (click)="!!selectPage(1)" [attr.tabindex]="(hasPrevious() ? null : '-1')">
          <span aria-hidden="true" i18n="@@ngb.pagination.first">&laquo;&laquo;</span>
        </a>
      </li>

      <li *ngIf="directionLinks" class="page-item"
        [class.disabled]="!hasPrevious() || disabled">
        <a aria-label="Previous" i18n-aria-label="@@ngb.pagination.previous-aria" class="page-link" href
          (click)="!!selectPage(page-1)" [attr.tabindex]="(hasPrevious() ? null : '-1')">
          <span aria-hidden="true" i18n="@@ngb.pagination.previous">&laquo;</span>
        </a>
      </li>
      <li *ngFor="let pageNumber of pages" class="page-item" [class.active]="pageNumber === page"
        [class.disabled]="isEllipsis(pageNumber) || disabled">
        <a *ngIf="isEllipsis(pageNumber)" class="page-link">...</a>
        <a *ngIf="!isEllipsis(pageNumber)" class="page-link" href (click)="!!selectPage(pageNumber)">
          {{pageNumber}}
          <span *ngIf="pageNumber === page" class="sr-only">(current)</span>
        </a>
      </li>
      <li *ngIf="directionLinks" class="page-item" [class.disabled]="!hasNext() || disabled">
        <a aria-label="Next" i18n-aria-label="@@ngb.pagination.next-aria" class="page-link" href
          (click)="!!selectPage(page+1)" [attr.tabindex]="(hasNext() ? null : '-1')">
          <span aria-hidden="true" i18n="@@ngb.pagination.next">&raquo;</span>
        </a>
      </li>

      <li *ngIf="boundaryLinks" class="page-item" [class.disabled]="!hasNext() || disabled">
        <a aria-label="Last" i18n-aria-label="@@ngb.pagination.last-aria" class="page-link" href
          (click)="!!selectPage(pageCount)" [attr.tabindex]="(hasNext() ? null : '-1')">
          <span aria-hidden="true" i18n="@@ngb.pagination.last">&raquo;&raquo;</span>
        </a>
      </li>
    </ul>
  `
            },] },
];
/** @nocollapse */
NgbPagination.ctorParameters = () => [
    { type: NgbPaginationConfig }
];
NgbPagination.propDecorators = {
    disabled: [{ type: Input }],
    boundaryLinks: [{ type: Input }],
    directionLinks: [{ type: Input }],
    ellipses: [{ type: Input }],
    rotate: [{ type: Input }],
    collectionSize: [{ type: Input }],
    maxSize: [{ type: Input }],
    page: [{ type: Input }],
    pageSize: [{ type: Input }],
    pageChange: [{ type: Output }],
    size: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NgbPagination.prototype.pageCount;
    /** @type {?} */
    NgbPagination.prototype.pages;
    /**
     * Whether to disable buttons from user input
     * @type {?}
     */
    NgbPagination.prototype.disabled;
    /**
     *  Whether to show the "First" and "Last" page links
     * @type {?}
     */
    NgbPagination.prototype.boundaryLinks;
    /**
     *  Whether to show the "Next" and "Previous" page links
     * @type {?}
     */
    NgbPagination.prototype.directionLinks;
    /**
     *  Whether to show ellipsis symbols and first/last page numbers when maxSize > number of pages
     * @type {?}
     */
    NgbPagination.prototype.ellipses;
    /**
     *  Whether to rotate pages when maxSize > number of pages.
     *  Current page will be in the middle
     * @type {?}
     */
    NgbPagination.prototype.rotate;
    /**
     *  Number of items in collection.
     * @type {?}
     */
    NgbPagination.prototype.collectionSize;
    /**
     *  Maximum number of pages to display.
     * @type {?}
     */
    NgbPagination.prototype.maxSize;
    /**
     *  Current page. Page numbers start with 1
     * @type {?}
     */
    NgbPagination.prototype.page;
    /**
     *  Number of items per page.
     * @type {?}
     */
    NgbPagination.prototype.pageSize;
    /**
     *  An event fired when the page is changed.
     *  Event's payload equals to the newly selected page.
     *  Will fire only if collection size is set and all values are valid.
     *  Page numbers start with 1
     * @type {?}
     */
    NgbPagination.prototype.pageChange;
    /**
     * Pagination display size: small or large
     * @type {?}
     */
    NgbPagination.prototype.size;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsicGFnaW5hdGlvbi9wYWdpbmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFhLHVCQUF1QixFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUN4SCxPQUFPLEVBQUMsZUFBZSxFQUFFLFFBQVEsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUN2RCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQzs7OztBQWtEeEQsTUFBTTs7OztJQStESixZQUFZLE1BQTJCO3lCQTlEM0IsQ0FBQztxQkFDSyxFQUFFOzs7O29CQXlDSixDQUFDOzs7Ozs7OzBCQWFNLElBQUksWUFBWSxDQUFTLElBQUksQ0FBQztRQVFuRCxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDO1FBQzFDLElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQztRQUM1QyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ3pCOzs7O0lBRUQsV0FBVyxLQUFjLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxFQUFFOzs7O0lBRWhELE9BQU8sS0FBYyxNQUFN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QUFPLENBQUMsQ0FBQyxDQUFDOztZQUN0RCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7O1lBQ2QsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQzs7WUFHekIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN0QztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2FBQ3hDO1lBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7O1lBRzFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ2pDOzs7O1lBdE9KLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsSUFBSSxFQUFFLEVBQUMsTUFBTSxFQUFFLFlBQVksRUFBQztnQkFDNUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Q1Q7YUFDRjs7OztZQWpETyxtQkFBbUI7Ozt1QkF5RHhCLEtBQUs7NEJBS0wsS0FBSzs2QkFLTCxLQUFLO3VCQUtMLEtBQUs7cUJBTUwsS0FBSzs2QkFLTCxLQUFLO3NCQUtMLEtBQUs7bUJBS0wsS0FBSzt1QkFLTCxLQUFLO3lCQVFMLE1BQU07bUJBS04sS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIE9uQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFNpbXBsZUNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge2dldFZhbHVlSW5SYW5nZSwgaXNOdW1iZXJ9IGZyb20gJy4uL3V0aWwvdXRpbCc7XHJcbmltcG9ydCB7TmdiUGFnaW5hdGlvbkNvbmZpZ30gZnJvbSAnLi9wYWdpbmF0aW9uLWNvbmZpZyc7XHJcblxyXG4vKipcclxuICogQSBkaXJlY3RpdmUgdGhhdCB3aWxsIHRha2UgY2FyZSBvZiB2aXN1YWxpc2luZyBhIHBhZ2luYXRpb24gYmFyIGFuZCBlbmFibGUgLyBkaXNhYmxlIGJ1dHRvbnMgY29ycmVjdGx5IVxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ2ItcGFnaW5hdGlvbicsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgaG9zdDogeydyb2xlJzogJ25hdmlnYXRpb24nfSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPHVsIFtjbGFzc109XCIncGFnaW5hdGlvbicgKyAoc2l6ZSA/ICcgcGFnaW5hdGlvbi0nICsgc2l6ZSA6ICcnKVwiPlxyXG4gICAgICA8bGkgKm5nSWY9XCJib3VuZGFyeUxpbmtzXCIgY2xhc3M9XCJwYWdlLWl0ZW1cIlxyXG4gICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCIhaGFzUHJldmlvdXMoKSB8fCBkaXNhYmxlZFwiPlxyXG4gICAgICAgIDxhIGFyaWEtbGFiZWw9XCJGaXJzdFwiIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLnBhZ2luYXRpb24uZmlyc3QtYXJpYVwiIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZlxyXG4gICAgICAgICAgKGNsaWNrKT1cIiEhc2VsZWN0UGFnZSgxKVwiIFthdHRyLnRhYmluZGV4XT1cIihoYXNQcmV2aW91cygpID8gbnVsbCA6ICctMScpXCI+XHJcbiAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIiBpMThuPVwiQEBuZ2IucGFnaW5hdGlvbi5maXJzdFwiPiZsYXF1bzsmbGFxdW87PC9zcGFuPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgPC9saT5cclxuXHJcbiAgICAgIDxsaSAqbmdJZj1cImRpcmVjdGlvbkxpbmtzXCIgY2xhc3M9XCJwYWdlLWl0ZW1cIlxyXG4gICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCIhaGFzUHJldmlvdXMoKSB8fCBkaXNhYmxlZFwiPlxyXG4gICAgICAgIDxhIGFyaWEtbGFiZWw9XCJQcmV2aW91c1wiIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLnBhZ2luYXRpb24ucHJldmlvdXMtYXJpYVwiIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZlxyXG4gICAgICAgICAgKGNsaWNrKT1cIiEhc2VsZWN0UGFnZShwYWdlLTEpXCIgW2F0dHIudGFiaW5kZXhdPVwiKGhhc1ByZXZpb3VzKCkgPyBudWxsIDogJy0xJylcIj5cclxuICAgICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGkxOG49XCJAQG5nYi5wYWdpbmF0aW9uLnByZXZpb3VzXCI+JmxhcXVvOzwvc3Bhbj5cclxuICAgICAgICA8L2E+XHJcbiAgICAgIDwvbGk+XHJcbiAgICAgIDxsaSAqbmdGb3I9XCJsZXQgcGFnZU51bWJlciBvZiBwYWdlc1wiIGNsYXNzPVwicGFnZS1pdGVtXCIgW2NsYXNzLmFjdGl2ZV09XCJwYWdlTnVtYmVyID09PSBwYWdlXCJcclxuICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiaXNFbGxpcHNpcyhwYWdlTnVtYmVyKSB8fCBkaXNhYmxlZFwiPlxyXG4gICAgICAgIDxhICpuZ0lmPVwiaXNFbGxpcHNpcyhwYWdlTnVtYmVyKVwiIGNsYXNzPVwicGFnZS1saW5rXCI+Li4uPC9hPlxyXG4gICAgICAgIDxhICpuZ0lmPVwiIWlzRWxsaXBzaXMocGFnZU51bWJlcilcIiBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWYgKGNsaWNrKT1cIiEhc2VsZWN0UGFnZShwYWdlTnVtYmVyKVwiPlxyXG4gICAgICAgICAge3twYWdlTnVtYmVyfX1cclxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwicGFnZU51bWJlciA9PT0gcGFnZVwiIGNsYXNzPVwic3Itb25seVwiPihjdXJyZW50KTwvc3Bhbj5cclxuICAgICAgICA8L2E+XHJcbiAgICAgIDwvbGk+XHJcbiAgICAgIDxsaSAqbmdJZj1cImRpcmVjdGlvbkxpbmtzXCIgY2xhc3M9XCJwYWdlLWl0ZW1cIiBbY2xhc3MuZGlzYWJsZWRdPVwiIWhhc05leHQoKSB8fCBkaXNhYmxlZFwiPlxyXG4gICAgICAgIDxhIGFyaWEtbGFiZWw9XCJOZXh0XCIgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IucGFnaW5hdGlvbi5uZXh0LWFyaWFcIiBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWZcclxuICAgICAgICAgIChjbGljayk9XCIhIXNlbGVjdFBhZ2UocGFnZSsxKVwiIFthdHRyLnRhYmluZGV4XT1cIihoYXNOZXh0KCkgPyBudWxsIDogJy0xJylcIj5cclxuICAgICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGkxOG49XCJAQG5nYi5wYWdpbmF0aW9uLm5leHRcIj4mcmFxdW87PC9zcGFuPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgPC9saT5cclxuXHJcbiAgICAgIDxsaSAqbmdJZj1cImJvdW5kYXJ5TGlua3NcIiBjbGFzcz1cInBhZ2UtaXRlbVwiIFtjbGFzcy5kaXNhYmxlZF09XCIhaGFzTmV4dCgpIHx8IGRpc2FibGVkXCI+XHJcbiAgICAgICAgPGEgYXJpYS1sYWJlbD1cIkxhc3RcIiBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi5wYWdpbmF0aW9uLmxhc3QtYXJpYVwiIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZlxyXG4gICAgICAgICAgKGNsaWNrKT1cIiEhc2VsZWN0UGFnZShwYWdlQ291bnQpXCIgW2F0dHIudGFiaW5kZXhdPVwiKGhhc05leHQoKSA/IG51bGwgOiAnLTEnKVwiPlxyXG4gICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCIgaTE4bj1cIkBAbmdiLnBhZ2luYXRpb24ubGFzdFwiPiZyYXF1bzsmcmFxdW87PC9zcGFuPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgPC9saT5cclxuICAgIDwvdWw+XHJcbiAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiUGFnaW5hdGlvbiBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgcGFnZUNvdW50ID0gMDtcclxuICBwYWdlczogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0byBkaXNhYmxlIGJ1dHRvbnMgZnJvbSB1c2VyIGlucHV0XHJcbiAgICovXHJcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqICBXaGV0aGVyIHRvIHNob3cgdGhlIFwiRmlyc3RcIiBhbmQgXCJMYXN0XCIgcGFnZSBsaW5rc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGJvdW5kYXJ5TGlua3M6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqICBXaGV0aGVyIHRvIHNob3cgdGhlIFwiTmV4dFwiIGFuZCBcIlByZXZpb3VzXCIgcGFnZSBsaW5rc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRpcmVjdGlvbkxpbmtzOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiAgV2hldGhlciB0byBzaG93IGVsbGlwc2lzIHN5bWJvbHMgYW5kIGZpcnN0L2xhc3QgcGFnZSBudW1iZXJzIHdoZW4gbWF4U2l6ZSA+IG51bWJlciBvZiBwYWdlc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGVsbGlwc2VzOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiAgV2hldGhlciB0byByb3RhdGUgcGFnZXMgd2hlbiBtYXhTaXplID4gbnVtYmVyIG9mIHBhZ2VzLlxyXG4gICAqICBDdXJyZW50IHBhZ2Ugd2lsbCBiZSBpbiB0aGUgbWlkZGxlXHJcbiAgICovXHJcbiAgQElucHV0KCkgcm90YXRlOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiAgTnVtYmVyIG9mIGl0ZW1zIGluIGNvbGxlY3Rpb24uXHJcbiAgICovXHJcbiAgQElucHV0KCkgY29sbGVjdGlvblNpemU6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogIE1heGltdW0gbnVtYmVyIG9mIHBhZ2VzIHRvIGRpc3BsYXkuXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWF4U2l6ZTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiAgQ3VycmVudCBwYWdlLiBQYWdlIG51bWJlcnMgc3RhcnQgd2l0aCAxXHJcbiAgICovXHJcbiAgQElucHV0KCkgcGFnZSA9IDE7XHJcblxyXG4gIC8qKlxyXG4gICAqICBOdW1iZXIgb2YgaXRlbXMgcGVyIHBhZ2UuXHJcbiAgICovXHJcbiAgQElucHV0KCkgcGFnZVNpemU6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogIEFuIGV2ZW50IGZpcmVkIHdoZW4gdGhlIHBhZ2UgaXMgY2hhbmdlZC5cclxuICAgKiAgRXZlbnQncyBwYXlsb2FkIGVxdWFscyB0byB0aGUgbmV3bHkgc2VsZWN0ZWQgcGFnZS5cclxuICAgKiAgV2lsbCBmaXJlIG9ubHkgaWYgY29sbGVjdGlvbiBzaXplIGlzIHNldCBhbmQgYWxsIHZhbHVlcyBhcmUgdmFsaWQuXHJcbiAgICogIFBhZ2UgbnVtYmVycyBzdGFydCB3aXRoIDFcclxuICAgKi9cclxuICBAT3V0cHV0KCkgcGFnZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPih0cnVlKTtcclxuXHJcbiAgLyoqXHJcbiAgICogUGFnaW5hdGlvbiBkaXNwbGF5IHNpemU6IHNtYWxsIG9yIGxhcmdlXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2l6ZTogJ3NtJyB8ICdsZyc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogTmdiUGFnaW5hdGlvbkNvbmZpZykge1xyXG4gICAgdGhpcy5kaXNhYmxlZCA9IGNvbmZpZy5kaXNhYmxlZDtcclxuICAgIHRoaXMuYm91bmRhcnlMaW5rcyA9IGNvbmZpZy5ib3VuZGFyeUxpbmtzO1xyXG4gICAgdGhpcy5kaXJlY3Rpb25MaW5rcyA9IGNvbmZpZy5kaXJlY3Rpb25MaW5rcztcclxuICAgIHRoaXMuZWxsaXBzZXMgPSBjb25maWcuZWxsaXBzZXM7XHJcbiAgICB0aGlzLm1heFNpemUgPSBjb25maWcubWF4U2l6ZTtcclxuICAgIHRoaXMucGFnZVNpemUgPSBjb25maWcucGFnZVNpemU7XHJcbiAgICB0aGlzLnJvdGF0ZSA9IGNvbmZpZy5yb3RhdGU7XHJcbiAgICB0aGlzLnNpemUgPSBjb25maWcuc2l6ZTtcclxuICB9XHJcblxyXG4gIGhhc1ByZXZpb3VzKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5wYWdlID4gMTsgfVxyXG5cclxuICBoYXNOZXh0KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5wYWdlIDwgdGhpcy5wYWdlQ291bnQ7IH1cclxuXHJcbiAgc2VsZWN0UGFnZShwYWdlTnVtYmVyOiBudW1iZXIpOiB2b2lkIHsgdGhpcy5fdXBkYXRlUGFnZXMocGFnZU51bWJlcik7IH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQgeyB0aGlzLl91cGRhdGVQYWdlcyh0aGlzLnBhZ2UpOyB9XHJcblxyXG4gIGlzRWxsaXBzaXMocGFnZU51bWJlcik6IGJvb2xlYW4geyByZXR1cm4gcGFnZU51bWJlciA9PT0gLTE7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXBwZW5kcyBlbGxpcHNlcyBhbmQgZmlyc3QvbGFzdCBwYWdlIG51bWJlciB0byB0aGUgZGlzcGxheWVkIHBhZ2VzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfYXBwbHlFbGxpcHNlcyhzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcikge1xyXG4gICAgaWYgKHRoaXMuZWxsaXBzZXMpIHtcclxuICAgICAgaWYgKHN0YXJ0ID4gMCkge1xyXG4gICAgICAgIGlmIChzdGFydCA+IDEpIHtcclxuICAgICAgICAgIHRoaXMucGFnZXMudW5zaGlmdCgtMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGFnZXMudW5zaGlmdCgxKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZW5kIDwgdGhpcy5wYWdlQ291bnQpIHtcclxuICAgICAgICBpZiAoZW5kIDwgKHRoaXMucGFnZUNvdW50IC0gMSkpIHtcclxuICAgICAgICAgIHRoaXMucGFnZXMucHVzaCgtMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGFnZXMucHVzaCh0aGlzLnBhZ2VDb3VudCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJvdGF0ZXMgcGFnZSBudW1iZXJzIGJhc2VkIG9uIG1heFNpemUgaXRlbXMgdmlzaWJsZS5cclxuICAgKiBDdXJyZW50bHkgc2VsZWN0ZWQgcGFnZSBzdGF5cyBpbiB0aGUgbWlkZGxlOlxyXG4gICAqXHJcbiAgICogRXguIGZvciBzZWxlY3RlZCBwYWdlID0gNjpcclxuICAgKiBbNSwqNiosN10gZm9yIG1heFNpemUgPSAzXHJcbiAgICogWzQsNSwqNiosN10gZm9yIG1heFNpemUgPSA0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfYXBwbHlSb3RhdGlvbigpOiBbbnVtYmVyLCBudW1iZXJdIHtcclxuICAgIGxldCBzdGFydCA9IDA7XHJcbiAgICBsZXQgZW5kID0gdGhpcy5wYWdlQ291bnQ7XHJcbiAgICBsZXQgbGVmdE9mZnNldCA9IE1hdGguZmxvb3IodGhpcy5tYXhTaXplIC8gMik7XHJcbiAgICBsZXQgcmlnaHRPZmZzZXQgPSB0aGlzLm1heFNpemUgJSAyID09PSAwID8gbGVmdE9mZnNldCAtIDEgOiBsZWZ0T2Zmc2V0O1xyXG5cclxuICAgIGlmICh0aGlzLnBhZ2UgPD0gbGVmdE9mZnNldCkge1xyXG4gICAgICAvLyB2ZXJ5IGJlZ2lubmluZywgbm8gcm90YXRpb24gLT4gWzAuLm1heFNpemVdXHJcbiAgICAgIGVuZCA9IHRoaXMubWF4U2l6ZTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5wYWdlQ291bnQgLSB0aGlzLnBhZ2UgPCBsZWZ0T2Zmc2V0KSB7XHJcbiAgICAgIC8vIHZlcnkgZW5kLCBubyByb3RhdGlvbiAtPiBbbGVuLW1heFNpemUuLmxlbl1cclxuICAgICAgc3RhcnQgPSB0aGlzLnBhZ2VDb3VudCAtIHRoaXMubWF4U2l6ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIHJvdGF0ZVxyXG4gICAgICBzdGFydCA9IHRoaXMucGFnZSAtIGxlZnRPZmZzZXQgLSAxO1xyXG4gICAgICBlbmQgPSB0aGlzLnBhZ2UgKyByaWdodE9mZnNldDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gW3N0YXJ0LCBlbmRdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGFnaW5hdGVzIHBhZ2UgbnVtYmVycyBiYXNlZCBvbiBtYXhTaXplIGl0ZW1zIHBlciBwYWdlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfYXBwbHlQYWdpbmF0aW9uKCk6IFtudW1iZXIsIG51bWJlcl0ge1xyXG4gICAgbGV0IHBhZ2UgPSBNYXRoLmNlaWwodGhpcy5wYWdlIC8gdGhpcy5tYXhTaXplKSAtIDE7XHJcbiAgICBsZXQgc3RhcnQgPSBwYWdlICogdGhpcy5tYXhTaXplO1xyXG4gICAgbGV0IGVuZCA9IHN0YXJ0ICsgdGhpcy5tYXhTaXplO1xyXG5cclxuICAgIHJldHVybiBbc3RhcnQsIGVuZF07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zZXRQYWdlSW5SYW5nZShuZXdQYWdlTm8pIHtcclxuICAgIGNvbnN0IHByZXZQYWdlTm8gPSB0aGlzLnBhZ2U7XHJcbiAgICB0aGlzLnBhZ2UgPSBnZXRWYWx1ZUluUmFuZ2UobmV3UGFnZU5vLCB0aGlzLnBhZ2VDb3VudCwgMSk7XHJcblxyXG4gICAgaWYgKHRoaXMucGFnZSAhPT0gcHJldlBhZ2VObyAmJiBpc051bWJlcih0aGlzLmNvbGxlY3Rpb25TaXplKSkge1xyXG4gICAgICB0aGlzLnBhZ2VDaGFuZ2UuZW1pdCh0aGlzLnBhZ2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfdXBkYXRlUGFnZXMobmV3UGFnZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnBhZ2VDb3VudCA9IE1hdGguY2VpbCh0aGlzLmNvbGxlY3Rpb25TaXplIC8gdGhpcy5wYWdlU2l6ZSk7XHJcblxyXG4gICAgaWYgKCFpc051bWJlcih0aGlzLnBhZ2VDb3VudCkpIHtcclxuICAgICAgdGhpcy5wYWdlQ291bnQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGZpbGwtaW4gbW9kZWwgbmVlZGVkIHRvIHJlbmRlciBwYWdlc1xyXG4gICAgdGhpcy5wYWdlcy5sZW5ndGggPSAwO1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gdGhpcy5wYWdlQ291bnQ7IGkrKykge1xyXG4gICAgICB0aGlzLnBhZ2VzLnB1c2goaSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2V0IHBhZ2Ugd2l0aGluIDEuLm1heCByYW5nZVxyXG4gICAgdGhpcy5fc2V0UGFnZUluUmFuZ2UobmV3UGFnZSk7XHJcblxyXG4gICAgLy8gYXBwbHkgbWF4U2l6ZSBpZiBuZWNlc3NhcnlcclxuICAgIGlmICh0aGlzLm1heFNpemUgPiAwICYmIHRoaXMucGFnZUNvdW50ID4gdGhpcy5tYXhTaXplKSB7XHJcbiAgICAgIGxldCBzdGFydCA9IDA7XHJcbiAgICAgIGxldCBlbmQgPSB0aGlzLnBhZ2VDb3VudDtcclxuXHJcbiAgICAgIC8vIGVpdGhlciBwYWdpbmF0aW5nIG9yIHJvdGF0aW5nIHBhZ2UgbnVtYmVyc1xyXG4gICAgICBpZiAodGhpcy5yb3RhdGUpIHtcclxuICAgICAgICBbc3RhcnQsIGVuZF0gPSB0aGlzLl9hcHBseVJvdGF0aW9uKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgW3N0YXJ0LCBlbmRdID0gdGhpcy5fYXBwbHlQYWdpbmF0aW9uKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMucGFnZXMgPSB0aGlzLnBhZ2VzLnNsaWNlKHN0YXJ0LCBlbmQpO1xyXG5cclxuICAgICAgLy8gYWRkaW5nIGVsbGlwc2VzXHJcbiAgICAgIHRoaXMuX2FwcGx5RWxsaXBzZXMoc3RhcnQsIGVuZCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==