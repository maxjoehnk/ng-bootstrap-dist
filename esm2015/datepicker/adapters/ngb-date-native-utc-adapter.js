/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { NgbDateAdapter } from './ngb-date-adapter';
/**
 * \@since 3.2.0
 */
export class NgbDateNativeUTCAdapter extends NgbDateAdapter {
    /**
     * @param {?} date
     * @return {?}
     */
    fromModel(date) {
        return (date instanceof Date) ?
            { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() } :
            null;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    toModel(date) {
        return date && date.year && date.month ? new Date(Date.UTC(date.year, date.month - 1, date.day)) : null;
    }
}
NgbDateNativeUTCAdapter.decorators = [
    { type: Injectable },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWRhdGUtbmF0aXZlLXV0Yy1hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJkYXRlcGlja2VyL2FkYXB0ZXJzL25nYi1kYXRlLW5hdGl2ZS11dGMtYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7Ozs7QUFPbEQsTUFBTSw4QkFBK0IsU0FBUSxjQUFvQjs7Ozs7SUFDL0QsU0FBUyxDQUFDLElBQVU7UUFDbEIsTUFBTSxDQUFDLENBQUMsSUFBSSxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDM0IsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUMsQ0FBQyxDQUFDO1lBQ3RGLElBQUksQ0FBQztLQUNWOzs7OztJQUVELE9BQU8sQ0FBQyxJQUFtQjtRQUN6QixNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7S0FDekc7OztZQVZGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge05nYkRhdGVBZGFwdGVyfSBmcm9tICcuL25nYi1kYXRlLWFkYXB0ZXInO1xyXG5pbXBvcnQge05nYkRhdGVTdHJ1Y3R9IGZyb20gJy4uL25nYi1kYXRlLXN0cnVjdCc7XHJcblxyXG4vKipcclxuICogQHNpbmNlIDMuMi4wXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlTmF0aXZlVVRDQWRhcHRlciBleHRlbmRzIE5nYkRhdGVBZGFwdGVyPERhdGU+IHtcclxuICBmcm9tTW9kZWwoZGF0ZTogRGF0ZSk6IE5nYkRhdGVTdHJ1Y3Qge1xyXG4gICAgcmV0dXJuIChkYXRlIGluc3RhbmNlb2YgRGF0ZSkgP1xyXG4gICAgICAgIHt5ZWFyOiBkYXRlLmdldFVUQ0Z1bGxZZWFyKCksIG1vbnRoOiBkYXRlLmdldFVUQ01vbnRoKCkgKyAxLCBkYXk6IGRhdGUuZ2V0VVRDRGF0ZSgpfSA6XHJcbiAgICAgICAgbnVsbDtcclxuICB9XHJcblxyXG4gIHRvTW9kZWwoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IERhdGUge1xyXG4gICAgcmV0dXJuIGRhdGUgJiYgZGF0ZS55ZWFyICYmIGRhdGUubW9udGggPyBuZXcgRGF0ZShEYXRlLlVUQyhkYXRlLnllYXIsIGRhdGUubW9udGggLSAxLCBkYXRlLmRheSkpIDogbnVsbDtcclxuICB9XHJcbn1cclxuIl19