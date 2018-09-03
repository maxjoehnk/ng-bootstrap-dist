/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { NgbDateAdapter } from './ngb-date-adapter';
var NgbDateNativeAdapter = /** @class */ (function (_super) {
    tslib_1.__extends(NgbDateNativeAdapter, _super);
    function NgbDateNativeAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    NgbDateNativeAdapter.prototype.fromModel = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return (date instanceof Date) ? { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() } : null;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NgbDateNativeAdapter.prototype.toModel = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date && date.year && date.month ? new Date(date.year, date.month - 1, date.day, 12) : null;
    };
    NgbDateNativeAdapter.decorators = [
        { type: Injectable },
    ];
    return NgbDateNativeAdapter;
}(NgbDateAdapter));
export { NgbDateNativeAdapter };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWRhdGUtbmF0aXZlLWFkYXB0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImRhdGVwaWNrZXIvYWRhcHRlcnMvbmdiLWRhdGUtbmF0aXZlLWFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7SUFJUixnREFBb0I7Ozs7Ozs7O0lBQzVELHdDQUFTOzs7O0lBQVQsVUFBVSxJQUFVO1FBQ2xCLE1BQU0sQ0FBQyxDQUFDLElBQUksWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0tBQ3BIOzs7OztJQUVELHNDQUFPOzs7O0lBQVAsVUFBUSxJQUFtQjtRQUN6QixNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7S0FDbkc7O2dCQVJGLFVBQVU7OytCQUpYO0VBSzBDLGNBQWM7U0FBM0Msb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOZ2JEYXRlQWRhcHRlcn0gZnJvbSAnLi9uZ2ItZGF0ZS1hZGFwdGVyJztcclxuaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTmdiRGF0ZU5hdGl2ZUFkYXB0ZXIgZXh0ZW5kcyBOZ2JEYXRlQWRhcHRlcjxEYXRlPiB7XHJcbiAgZnJvbU1vZGVsKGRhdGU6IERhdGUpOiBOZ2JEYXRlU3RydWN0IHtcclxuICAgIHJldHVybiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpID8ge3llYXI6IGRhdGUuZ2V0RnVsbFllYXIoKSwgbW9udGg6IGRhdGUuZ2V0TW9udGgoKSArIDEsIGRheTogZGF0ZS5nZXREYXRlKCl9IDogbnVsbDtcclxuICB9XHJcblxyXG4gIHRvTW9kZWwoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IERhdGUge1xyXG4gICAgcmV0dXJuIGRhdGUgJiYgZGF0ZS55ZWFyICYmIGRhdGUubW9udGggPyBuZXcgRGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGggLSAxLCBkYXRlLmRheSwgMTIpIDogbnVsbDtcclxuICB9XHJcbn1cclxuIl19