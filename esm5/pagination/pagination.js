/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { getValueInRange, isNumber } from '../util/util';
import { NgbPaginationConfig } from './pagination-config';
/**
 * A directive that will take care of visualising a pagination bar and enable / disable buttons correctly!
 */
var NgbPagination = /** @class */ (function () {
    function NgbPagination(config) {
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
    NgbPagination.prototype.hasPrevious = /**
     * @return {?}
     */
    function () { return this.page > 1; };
    /**
     * @return {?}
     */
    NgbPagination.prototype.hasNext = /**
     * @return {?}
     */
    function () { return this.page < this.pageCount; };
    /**
     * @param {?} pageNumber
     * @return {?}
     */
    NgbPagination.prototype.selectPage = /**
     * @param {?} pageNumber
     * @return {?}
     */
    function (pageNumber) { this._updatePages(pageNumber); };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgbPagination.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) { this._updatePages(this.page); };
    /**
     * @param {?} pageNumber
     * @return {?}
     */
    NgbPagination.prototype.isEllipsis = /**
     * @param {?} pageNumber
     * @return {?}
     */
    function (pageNumber) { return pageNumber === -1; };
    /**
     * Appends ellipses and first/last page number to the displayed pages
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    NgbPagination.prototype._applyEllipses = /**
     * Appends ellipses and first/last page number to the displayed pages
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    function (start, end) {
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
    };
    /**
     * Rotates page numbers based on maxSize items visible.
     * Currently selected page stays in the middle:
     *
     * Ex. for selected page = 6:
     * [5,*6*,7] for maxSize = 3
     * [4,5,*6*,7] for maxSize = 4
     * @return {?}
     */
    NgbPagination.prototype._applyRotation = /**
     * Rotates page numbers based on maxSize items visible.
     * Currently selected page stays in the middle:
     *
     * Ex. for selected page = 6:
     * [5,*6*,7] for maxSize = 3
     * [4,5,*6*,7] for maxSize = 4
     * @return {?}
     */
    function () {
        /** @type {?} */
        var start = 0;
        /** @type {?} */
        var end = this.pageCount;
        /** @type {?} */
        var leftOffset = Math.floor(this.maxSize / 2);
        /** @type {?} */
        var rightOffset = this.maxSize % 2 === 0 ? leftOffset - 1 : leftOffset;
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
    };
    /**
     * Paginates page numbers based on maxSize items per page
     * @return {?}
     */
    NgbPagination.prototype._applyPagination = /**
     * Paginates page numbers based on maxSize items per page
     * @return {?}
     */
    function () {
        /** @type {?} */
        var page = Math.ceil(this.page / this.maxSize) - 1;
        /** @type {?} */
        var start = page * this.maxSize;
        /** @type {?} */
        var end = start + this.maxSize;
        return [start, end];
    };
    /**
     * @param {?} newPageNo
     * @return {?}
     */
    NgbPagination.prototype._setPageInRange = /**
     * @param {?} newPageNo
     * @return {?}
     */
    function (newPageNo) {
        /** @type {?} */
        var prevPageNo = this.page;
        this.page = getValueInRange(newPageNo, this.pageCount, 1);
        if (this.page !== prevPageNo && isNumber(this.collectionSize)) {
            this.pageChange.emit(this.page);
        }
    };
    /**
     * @param {?} newPage
     * @return {?}
     */
    NgbPagination.prototype._updatePages = /**
     * @param {?} newPage
     * @return {?}
     */
    function (newPage) {
        this.pageCount = Math.ceil(this.collectionSize / this.pageSize);
        if (!isNumber(this.pageCount)) {
            this.pageCount = 0;
        }
        // fill-in model needed to render pages
        this.pages.length = 0;
        for (var i = 1; i <= this.pageCount; i++) {
            this.pages.push(i);
        }
        // set page within 1..max range
        this._setPageInRange(newPage);
        // apply maxSize if necessary
        if (this.maxSize > 0 && this.pageCount > this.maxSize) {
            /** @type {?} */
            var start = 0;
            /** @type {?} */
            var end = this.pageCount;
            // either paginating or rotating page numbers
            if (this.rotate) {
                _a = tslib_1.__read(this._applyRotation(), 2), start = _a[0], end = _a[1];
            }
            else {
                _b = tslib_1.__read(this._applyPagination(), 2), start = _b[0], end = _b[1];
            }
            this.pages = this.pages.slice(start, end);
            // adding ellipses
            this._applyEllipses(start, end);
        }
        var _a, _b;
    };
    NgbPagination.decorators = [
        { type: Component, args: [{
                    selector: 'ngb-pagination',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: { 'role': 'navigation' },
                    template: "\n    <ul [class]=\"'pagination' + (size ? ' pagination-' + size : '')\">\n      <li *ngIf=\"boundaryLinks\" class=\"page-item\"\n        [class.disabled]=\"!hasPrevious() || disabled\">\n        <a aria-label=\"First\" i18n-aria-label=\"@@ngb.pagination.first-aria\" class=\"page-link\" href\n          (click)=\"!!selectPage(1)\" [attr.tabindex]=\"(hasPrevious() ? null : '-1')\">\n          <span aria-hidden=\"true\" i18n=\"@@ngb.pagination.first\">&laquo;&laquo;</span>\n        </a>\n      </li>\n\n      <li *ngIf=\"directionLinks\" class=\"page-item\"\n        [class.disabled]=\"!hasPrevious() || disabled\">\n        <a aria-label=\"Previous\" i18n-aria-label=\"@@ngb.pagination.previous-aria\" class=\"page-link\" href\n          (click)=\"!!selectPage(page-1)\" [attr.tabindex]=\"(hasPrevious() ? null : '-1')\">\n          <span aria-hidden=\"true\" i18n=\"@@ngb.pagination.previous\">&laquo;</span>\n        </a>\n      </li>\n      <li *ngFor=\"let pageNumber of pages\" class=\"page-item\" [class.active]=\"pageNumber === page\"\n        [class.disabled]=\"isEllipsis(pageNumber) || disabled\">\n        <a *ngIf=\"isEllipsis(pageNumber)\" class=\"page-link\">...</a>\n        <a *ngIf=\"!isEllipsis(pageNumber)\" class=\"page-link\" href (click)=\"!!selectPage(pageNumber)\">\n          {{pageNumber}}\n          <span *ngIf=\"pageNumber === page\" class=\"sr-only\">(current)</span>\n        </a>\n      </li>\n      <li *ngIf=\"directionLinks\" class=\"page-item\" [class.disabled]=\"!hasNext() || disabled\">\n        <a aria-label=\"Next\" i18n-aria-label=\"@@ngb.pagination.next-aria\" class=\"page-link\" href\n          (click)=\"!!selectPage(page+1)\" [attr.tabindex]=\"(hasNext() ? null : '-1')\">\n          <span aria-hidden=\"true\" i18n=\"@@ngb.pagination.next\">&raquo;</span>\n        </a>\n      </li>\n\n      <li *ngIf=\"boundaryLinks\" class=\"page-item\" [class.disabled]=\"!hasNext() || disabled\">\n        <a aria-label=\"Last\" i18n-aria-label=\"@@ngb.pagination.last-aria\" class=\"page-link\" href\n          (click)=\"!!selectPage(pageCount)\" [attr.tabindex]=\"(hasNext() ? null : '-1')\">\n          <span aria-hidden=\"true\" i18n=\"@@ngb.pagination.last\">&raquo;&raquo;</span>\n        </a>\n      </li>\n    </ul>\n  "
                },] },
    ];
    /** @nocollapse */
    NgbPagination.ctorParameters = function () { return [
        { type: NgbPaginationConfig }
    ]; };
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
    return NgbPagination;
}());
export { NgbPagination };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsicGFnaW5hdGlvbi9wYWdpbmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBYSx1QkFBdUIsRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDeEgsT0FBTyxFQUFDLGVBQWUsRUFBRSxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDdkQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0scUJBQXFCLENBQUM7Ozs7O0lBaUh0RCx1QkFBWSxNQUEyQjt5QkE5RDNCLENBQUM7cUJBQ0ssRUFBRTs7OztvQkF5Q0osQ0FBQzs7Ozs7OzswQkFhTSxJQUFJLFlBQVksQ0FBUyxJQUFJLENBQUM7UUFRbkQsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztRQUMxQyxJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUM7UUFDNUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUM5QixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztLQUN6Qjs7OztJQUVELG1DQUFXOzs7SUFBWCxjQUF5QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsRUFBRTs7OztJQUVoRCwrQkFBTzs7O0lBQVAsY0FB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LElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7O1lBQ3RELElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQzs7WUFDZCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDOztZQUd6QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsNkNBQW9DLEVBQW5DLGFBQUssRUFBRSxXQUFHLENBQTBCO2FBQ3RDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sK0NBQXNDLEVBQXJDLGFBQUssRUFBRSxXQUFHLENBQTRCO2FBQ3hDO1lBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7O1lBRzFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ2pDOzs7O2dCQXRPSixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLElBQUksRUFBRSxFQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUM7b0JBQzVCLFFBQVEsRUFBRSw2dEVBdUNUO2lCQUNGOzs7O2dCQWpETyxtQkFBbUI7OzsyQkF5RHhCLEtBQUs7Z0NBS0wsS0FBSztpQ0FLTCxLQUFLOzJCQUtMLEtBQUs7eUJBTUwsS0FBSztpQ0FLTCxLQUFLOzBCQUtMLEtBQUs7dUJBS0wsS0FBSzsyQkFLTCxLQUFLOzZCQVFMLE1BQU07dUJBS04sS0FBSzs7d0JBakhSOztTQW9EYSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgT25DaGFuZ2VzLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgU2ltcGxlQ2hhbmdlc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Z2V0VmFsdWVJblJhbmdlLCBpc051bWJlcn0gZnJvbSAnLi4vdXRpbC91dGlsJztcclxuaW1wb3J0IHtOZ2JQYWdpbmF0aW9uQ29uZmlnfSBmcm9tICcuL3BhZ2luYXRpb24tY29uZmlnJztcclxuXHJcbi8qKlxyXG4gKiBBIGRpcmVjdGl2ZSB0aGF0IHdpbGwgdGFrZSBjYXJlIG9mIHZpc3VhbGlzaW5nIGEgcGFnaW5hdGlvbiBiYXIgYW5kIGVuYWJsZSAvIGRpc2FibGUgYnV0dG9ucyBjb3JyZWN0bHkhXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25nYi1wYWdpbmF0aW9uJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBob3N0OiB7J3JvbGUnOiAnbmF2aWdhdGlvbid9LFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8dWwgW2NsYXNzXT1cIidwYWdpbmF0aW9uJyArIChzaXplID8gJyBwYWdpbmF0aW9uLScgKyBzaXplIDogJycpXCI+XHJcbiAgICAgIDxsaSAqbmdJZj1cImJvdW5kYXJ5TGlua3NcIiBjbGFzcz1cInBhZ2UtaXRlbVwiXHJcbiAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cIiFoYXNQcmV2aW91cygpIHx8IGRpc2FibGVkXCI+XHJcbiAgICAgICAgPGEgYXJpYS1sYWJlbD1cIkZpcnN0XCIgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IucGFnaW5hdGlvbi5maXJzdC1hcmlhXCIgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmXHJcbiAgICAgICAgICAoY2xpY2spPVwiISFzZWxlY3RQYWdlKDEpXCIgW2F0dHIudGFiaW5kZXhdPVwiKGhhc1ByZXZpb3VzKCkgPyBudWxsIDogJy0xJylcIj5cclxuICAgICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGkxOG49XCJAQG5nYi5wYWdpbmF0aW9uLmZpcnN0XCI+JmxhcXVvOyZsYXF1bzs8L3NwYW4+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICA8L2xpPlxyXG5cclxuICAgICAgPGxpICpuZ0lmPVwiZGlyZWN0aW9uTGlua3NcIiBjbGFzcz1cInBhZ2UtaXRlbVwiXHJcbiAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cIiFoYXNQcmV2aW91cygpIHx8IGRpc2FibGVkXCI+XHJcbiAgICAgICAgPGEgYXJpYS1sYWJlbD1cIlByZXZpb3VzXCIgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IucGFnaW5hdGlvbi5wcmV2aW91cy1hcmlhXCIgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmXHJcbiAgICAgICAgICAoY2xpY2spPVwiISFzZWxlY3RQYWdlKHBhZ2UtMSlcIiBbYXR0ci50YWJpbmRleF09XCIoaGFzUHJldmlvdXMoKSA/IG51bGwgOiAnLTEnKVwiPlxyXG4gICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCIgaTE4bj1cIkBAbmdiLnBhZ2luYXRpb24ucHJldmlvdXNcIj4mbGFxdW87PC9zcGFuPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgPC9saT5cclxuICAgICAgPGxpICpuZ0Zvcj1cImxldCBwYWdlTnVtYmVyIG9mIHBhZ2VzXCIgY2xhc3M9XCJwYWdlLWl0ZW1cIiBbY2xhc3MuYWN0aXZlXT1cInBhZ2VOdW1iZXIgPT09IHBhZ2VcIlxyXG4gICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJpc0VsbGlwc2lzKHBhZ2VOdW1iZXIpIHx8IGRpc2FibGVkXCI+XHJcbiAgICAgICAgPGEgKm5nSWY9XCJpc0VsbGlwc2lzKHBhZ2VOdW1iZXIpXCIgY2xhc3M9XCJwYWdlLWxpbmtcIj4uLi48L2E+XHJcbiAgICAgICAgPGEgKm5nSWY9XCIhaXNFbGxpcHNpcyhwYWdlTnVtYmVyKVwiIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZiAoY2xpY2spPVwiISFzZWxlY3RQYWdlKHBhZ2VOdW1iZXIpXCI+XHJcbiAgICAgICAgICB7e3BhZ2VOdW1iZXJ9fVxyXG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCJwYWdlTnVtYmVyID09PSBwYWdlXCIgY2xhc3M9XCJzci1vbmx5XCI+KGN1cnJlbnQpPC9zcGFuPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgPC9saT5cclxuICAgICAgPGxpICpuZ0lmPVwiZGlyZWN0aW9uTGlua3NcIiBjbGFzcz1cInBhZ2UtaXRlbVwiIFtjbGFzcy5kaXNhYmxlZF09XCIhaGFzTmV4dCgpIHx8IGRpc2FibGVkXCI+XHJcbiAgICAgICAgPGEgYXJpYS1sYWJlbD1cIk5leHRcIiBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi5wYWdpbmF0aW9uLm5leHQtYXJpYVwiIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZlxyXG4gICAgICAgICAgKGNsaWNrKT1cIiEhc2VsZWN0UGFnZShwYWdlKzEpXCIgW2F0dHIudGFiaW5kZXhdPVwiKGhhc05leHQoKSA/IG51bGwgOiAnLTEnKVwiPlxyXG4gICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCIgaTE4bj1cIkBAbmdiLnBhZ2luYXRpb24ubmV4dFwiPiZyYXF1bzs8L3NwYW4+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICA8L2xpPlxyXG5cclxuICAgICAgPGxpICpuZ0lmPVwiYm91bmRhcnlMaW5rc1wiIGNsYXNzPVwicGFnZS1pdGVtXCIgW2NsYXNzLmRpc2FibGVkXT1cIiFoYXNOZXh0KCkgfHwgZGlzYWJsZWRcIj5cclxuICAgICAgICA8YSBhcmlhLWxhYmVsPVwiTGFzdFwiIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLnBhZ2luYXRpb24ubGFzdC1hcmlhXCIgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmXHJcbiAgICAgICAgICAoY2xpY2spPVwiISFzZWxlY3RQYWdlKHBhZ2VDb3VudClcIiBbYXR0ci50YWJpbmRleF09XCIoaGFzTmV4dCgpID8gbnVsbCA6ICctMScpXCI+XHJcbiAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIiBpMThuPVwiQEBuZ2IucGFnaW5hdGlvbi5sYXN0XCI+JnJhcXVvOyZyYXF1bzs8L3NwYW4+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICA8L2xpPlxyXG4gICAgPC91bD5cclxuICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JQYWdpbmF0aW9uIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBwYWdlQ291bnQgPSAwO1xyXG4gIHBhZ2VzOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRvIGRpc2FibGUgYnV0dG9ucyBmcm9tIHVzZXIgaW5wdXRcclxuICAgKi9cclxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogIFdoZXRoZXIgdG8gc2hvdyB0aGUgXCJGaXJzdFwiIGFuZCBcIkxhc3RcIiBwYWdlIGxpbmtzXHJcbiAgICovXHJcbiAgQElucHV0KCkgYm91bmRhcnlMaW5rczogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogIFdoZXRoZXIgdG8gc2hvdyB0aGUgXCJOZXh0XCIgYW5kIFwiUHJldmlvdXNcIiBwYWdlIGxpbmtzXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGlyZWN0aW9uTGlua3M6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqICBXaGV0aGVyIHRvIHNob3cgZWxsaXBzaXMgc3ltYm9scyBhbmQgZmlyc3QvbGFzdCBwYWdlIG51bWJlcnMgd2hlbiBtYXhTaXplID4gbnVtYmVyIG9mIHBhZ2VzXHJcbiAgICovXHJcbiAgQElucHV0KCkgZWxsaXBzZXM6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqICBXaGV0aGVyIHRvIHJvdGF0ZSBwYWdlcyB3aGVuIG1heFNpemUgPiBudW1iZXIgb2YgcGFnZXMuXHJcbiAgICogIEN1cnJlbnQgcGFnZSB3aWxsIGJlIGluIHRoZSBtaWRkbGVcclxuICAgKi9cclxuICBASW5wdXQoKSByb3RhdGU6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqICBOdW1iZXIgb2YgaXRlbXMgaW4gY29sbGVjdGlvbi5cclxuICAgKi9cclxuICBASW5wdXQoKSBjb2xsZWN0aW9uU2l6ZTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiAgTWF4aW11bSBudW1iZXIgb2YgcGFnZXMgdG8gZGlzcGxheS5cclxuICAgKi9cclxuICBASW5wdXQoKSBtYXhTaXplOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqICBDdXJyZW50IHBhZ2UuIFBhZ2UgbnVtYmVycyBzdGFydCB3aXRoIDFcclxuICAgKi9cclxuICBASW5wdXQoKSBwYWdlID0gMTtcclxuXHJcbiAgLyoqXHJcbiAgICogIE51bWJlciBvZiBpdGVtcyBwZXIgcGFnZS5cclxuICAgKi9cclxuICBASW5wdXQoKSBwYWdlU2l6ZTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiAgQW4gZXZlbnQgZmlyZWQgd2hlbiB0aGUgcGFnZSBpcyBjaGFuZ2VkLlxyXG4gICAqICBFdmVudCdzIHBheWxvYWQgZXF1YWxzIHRvIHRoZSBuZXdseSBzZWxlY3RlZCBwYWdlLlxyXG4gICAqICBXaWxsIGZpcmUgb25seSBpZiBjb2xsZWN0aW9uIHNpemUgaXMgc2V0IGFuZCBhbGwgdmFsdWVzIGFyZSB2YWxpZC5cclxuICAgKiAgUGFnZSBudW1iZXJzIHN0YXJ0IHdpdGggMVxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBwYWdlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KHRydWUpO1xyXG5cclxuICAvKipcclxuICAgKiBQYWdpbmF0aW9uIGRpc3BsYXkgc2l6ZTogc21hbGwgb3IgbGFyZ2VcclxuICAgKi9cclxuICBASW5wdXQoKSBzaXplOiAnc20nIHwgJ2xnJztcclxuXHJcbiAgY29uc3RydWN0b3IoY29uZmlnOiBOZ2JQYWdpbmF0aW9uQ29uZmlnKSB7XHJcbiAgICB0aGlzLmRpc2FibGVkID0gY29uZmlnLmRpc2FibGVkO1xyXG4gICAgdGhpcy5ib3VuZGFyeUxpbmtzID0gY29uZmlnLmJvdW5kYXJ5TGlua3M7XHJcbiAgICB0aGlzLmRpcmVjdGlvbkxpbmtzID0gY29uZmlnLmRpcmVjdGlvbkxpbmtzO1xyXG4gICAgdGhpcy5lbGxpcHNlcyA9IGNvbmZpZy5lbGxpcHNlcztcclxuICAgIHRoaXMubWF4U2l6ZSA9IGNvbmZpZy5tYXhTaXplO1xyXG4gICAgdGhpcy5wYWdlU2l6ZSA9IGNvbmZpZy5wYWdlU2l6ZTtcclxuICAgIHRoaXMucm90YXRlID0gY29uZmlnLnJvdGF0ZTtcclxuICAgIHRoaXMuc2l6ZSA9IGNvbmZpZy5zaXplO1xyXG4gIH1cclxuXHJcbiAgaGFzUHJldmlvdXMoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnBhZ2UgPiAxOyB9XHJcblxyXG4gIGhhc05leHQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnBhZ2UgPCB0aGlzLnBhZ2VDb3VudDsgfVxyXG5cclxuICBzZWxlY3RQYWdlKHBhZ2VOdW1iZXI6IG51bWJlcik6IHZvaWQgeyB0aGlzLl91cGRhdGVQYWdlcyhwYWdlTnVtYmVyKTsgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7IHRoaXMuX3VwZGF0ZVBhZ2VzKHRoaXMucGFnZSk7IH1cclxuXHJcbiAgaXNFbGxpcHNpcyhwYWdlTnVtYmVyKTogYm9vbGVhbiB7IHJldHVybiBwYWdlTnVtYmVyID09PSAtMTsgfVxyXG5cclxuICAvKipcclxuICAgKiBBcHBlbmRzIGVsbGlwc2VzIGFuZCBmaXJzdC9sYXN0IHBhZ2UgbnVtYmVyIHRvIHRoZSBkaXNwbGF5ZWQgcGFnZXNcclxuICAgKi9cclxuICBwcml2YXRlIF9hcHBseUVsbGlwc2VzKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyKSB7XHJcbiAgICBpZiAodGhpcy5lbGxpcHNlcykge1xyXG4gICAgICBpZiAoc3RhcnQgPiAwKSB7XHJcbiAgICAgICAgaWYgKHN0YXJ0ID4gMSkge1xyXG4gICAgICAgICAgdGhpcy5wYWdlcy51bnNoaWZ0KC0xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYWdlcy51bnNoaWZ0KDEpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChlbmQgPCB0aGlzLnBhZ2VDb3VudCkge1xyXG4gICAgICAgIGlmIChlbmQgPCAodGhpcy5wYWdlQ291bnQgLSAxKSkge1xyXG4gICAgICAgICAgdGhpcy5wYWdlcy5wdXNoKC0xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYWdlcy5wdXNoKHRoaXMucGFnZUNvdW50KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUm90YXRlcyBwYWdlIG51bWJlcnMgYmFzZWQgb24gbWF4U2l6ZSBpdGVtcyB2aXNpYmxlLlxyXG4gICAqIEN1cnJlbnRseSBzZWxlY3RlZCBwYWdlIHN0YXlzIGluIHRoZSBtaWRkbGU6XHJcbiAgICpcclxuICAgKiBFeC4gZm9yIHNlbGVjdGVkIHBhZ2UgPSA2OlxyXG4gICAqIFs1LCo2Kiw3XSBmb3IgbWF4U2l6ZSA9IDNcclxuICAgKiBbNCw1LCo2Kiw3XSBmb3IgbWF4U2l6ZSA9IDRcclxuICAgKi9cclxuICBwcml2YXRlIF9hcHBseVJvdGF0aW9uKCk6IFtudW1iZXIsIG51bWJlcl0ge1xyXG4gICAgbGV0IHN0YXJ0ID0gMDtcclxuICAgIGxldCBlbmQgPSB0aGlzLnBhZ2VDb3VudDtcclxuICAgIGxldCBsZWZ0T2Zmc2V0ID0gTWF0aC5mbG9vcih0aGlzLm1heFNpemUgLyAyKTtcclxuICAgIGxldCByaWdodE9mZnNldCA9IHRoaXMubWF4U2l6ZSAlIDIgPT09IDAgPyBsZWZ0T2Zmc2V0IC0gMSA6IGxlZnRPZmZzZXQ7XHJcblxyXG4gICAgaWYgKHRoaXMucGFnZSA8PSBsZWZ0T2Zmc2V0KSB7XHJcbiAgICAgIC8vIHZlcnkgYmVnaW5uaW5nLCBubyByb3RhdGlvbiAtPiBbMC4ubWF4U2l6ZV1cclxuICAgICAgZW5kID0gdGhpcy5tYXhTaXplO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnBhZ2VDb3VudCAtIHRoaXMucGFnZSA8IGxlZnRPZmZzZXQpIHtcclxuICAgICAgLy8gdmVyeSBlbmQsIG5vIHJvdGF0aW9uIC0+IFtsZW4tbWF4U2l6ZS4ubGVuXVxyXG4gICAgICBzdGFydCA9IHRoaXMucGFnZUNvdW50IC0gdGhpcy5tYXhTaXplO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gcm90YXRlXHJcbiAgICAgIHN0YXJ0ID0gdGhpcy5wYWdlIC0gbGVmdE9mZnNldCAtIDE7XHJcbiAgICAgIGVuZCA9IHRoaXMucGFnZSArIHJpZ2h0T2Zmc2V0O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBbc3RhcnQsIGVuZF07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQYWdpbmF0ZXMgcGFnZSBudW1iZXJzIGJhc2VkIG9uIG1heFNpemUgaXRlbXMgcGVyIHBhZ2VcclxuICAgKi9cclxuICBwcml2YXRlIF9hcHBseVBhZ2luYXRpb24oKTogW251bWJlciwgbnVtYmVyXSB7XHJcbiAgICBsZXQgcGFnZSA9IE1hdGguY2VpbCh0aGlzLnBhZ2UgLyB0aGlzLm1heFNpemUpIC0gMTtcclxuICAgIGxldCBzdGFydCA9IHBhZ2UgKiB0aGlzLm1heFNpemU7XHJcbiAgICBsZXQgZW5kID0gc3RhcnQgKyB0aGlzLm1heFNpemU7XHJcblxyXG4gICAgcmV0dXJuIFtzdGFydCwgZW5kXTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3NldFBhZ2VJblJhbmdlKG5ld1BhZ2VObykge1xyXG4gICAgY29uc3QgcHJldlBhZ2VObyA9IHRoaXMucGFnZTtcclxuICAgIHRoaXMucGFnZSA9IGdldFZhbHVlSW5SYW5nZShuZXdQYWdlTm8sIHRoaXMucGFnZUNvdW50LCAxKTtcclxuXHJcbiAgICBpZiAodGhpcy5wYWdlICE9PSBwcmV2UGFnZU5vICYmIGlzTnVtYmVyKHRoaXMuY29sbGVjdGlvblNpemUpKSB7XHJcbiAgICAgIHRoaXMucGFnZUNoYW5nZS5lbWl0KHRoaXMucGFnZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF91cGRhdGVQYWdlcyhuZXdQYWdlOiBudW1iZXIpIHtcclxuICAgIHRoaXMucGFnZUNvdW50ID0gTWF0aC5jZWlsKHRoaXMuY29sbGVjdGlvblNpemUgLyB0aGlzLnBhZ2VTaXplKTtcclxuXHJcbiAgICBpZiAoIWlzTnVtYmVyKHRoaXMucGFnZUNvdW50KSkge1xyXG4gICAgICB0aGlzLnBhZ2VDb3VudCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZmlsbC1pbiBtb2RlbCBuZWVkZWQgdG8gcmVuZGVyIHBhZ2VzXHJcbiAgICB0aGlzLnBhZ2VzLmxlbmd0aCA9IDA7XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSB0aGlzLnBhZ2VDb3VudDsgaSsrKSB7XHJcbiAgICAgIHRoaXMucGFnZXMucHVzaChpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzZXQgcGFnZSB3aXRoaW4gMS4ubWF4IHJhbmdlXHJcbiAgICB0aGlzLl9zZXRQYWdlSW5SYW5nZShuZXdQYWdlKTtcclxuXHJcbiAgICAvLyBhcHBseSBtYXhTaXplIGlmIG5lY2Vzc2FyeVxyXG4gICAgaWYgKHRoaXMubWF4U2l6ZSA+IDAgJiYgdGhpcy5wYWdlQ291bnQgPiB0aGlzLm1heFNpemUpIHtcclxuICAgICAgbGV0IHN0YXJ0ID0gMDtcclxuICAgICAgbGV0IGVuZCA9IHRoaXMucGFnZUNvdW50O1xyXG5cclxuICAgICAgLy8gZWl0aGVyIHBhZ2luYXRpbmcgb3Igcm90YXRpbmcgcGFnZSBudW1iZXJzXHJcbiAgICAgIGlmICh0aGlzLnJvdGF0ZSkge1xyXG4gICAgICAgIFtzdGFydCwgZW5kXSA9IHRoaXMuX2FwcGx5Um90YXRpb24oKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBbc3RhcnQsIGVuZF0gPSB0aGlzLl9hcHBseVBhZ2luYXRpb24oKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5wYWdlcyA9IHRoaXMucGFnZXMuc2xpY2Uoc3RhcnQsIGVuZCk7XHJcblxyXG4gICAgICAvLyBhZGRpbmcgZWxsaXBzZXNcclxuICAgICAgdGhpcy5fYXBwbHlFbGxpcHNlcyhzdGFydCwgZW5kKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19