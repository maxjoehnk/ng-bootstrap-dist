/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { NgbDateAdapter } from './ngb-date-adapter';
/**
 * \@since 3.2.0
 */
var NgbDateNativeUTCAdapter = /** @class */ (function (_super) {
    tslib_1.__extends(NgbDateNativeUTCAdapter, _super);
    function NgbDateNativeUTCAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    NgbDateNativeUTCAdapter.prototype.fromModel = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return (date instanceof Date) ?
            { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() } :
            null;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NgbDateNativeUTCAdapter.prototype.toModel = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date && date.year && date.month ? new Date(Date.UTC(date.year, date.month - 1, date.day)) : null;
    };
    NgbDateNativeUTCAdapter.decorators = [
        { type: Injectable },
    ];
    return NgbDateNativeUTCAdapter;
}(NgbDateAdapter));
export { NgbDateNativeUTCAdapter };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWRhdGUtbmF0aXZlLXV0Yy1hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJkYXRlcGlja2VyL2FkYXB0ZXJzL25nYi1kYXRlLW5hdGl2ZS11dGMtYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG9CQUFvQixDQUFDOzs7OztJQU9MLG1EQUFvQjs7Ozs7Ozs7SUFDL0QsMkNBQVM7Ozs7SUFBVCxVQUFVLElBQVU7UUFDbEIsTUFBTSxDQUFDLENBQUMsSUFBSSxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDM0IsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUMsQ0FBQyxDQUFDO1lBQ3RGLElBQUksQ0FBQztLQUNWOzs7OztJQUVELHlDQUFPOzs7O0lBQVAsVUFBUSxJQUFtQjtRQUN6QixNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7S0FDekc7O2dCQVZGLFVBQVU7O2tDQVBYO0VBUTZDLGNBQWM7U0FBOUMsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOZ2JEYXRlQWRhcHRlcn0gZnJvbSAnLi9uZ2ItZGF0ZS1hZGFwdGVyJztcclxuaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xyXG5cclxuLyoqXHJcbiAqIEBzaW5jZSAzLjIuMFxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTmdiRGF0ZU5hdGl2ZVVUQ0FkYXB0ZXIgZXh0ZW5kcyBOZ2JEYXRlQWRhcHRlcjxEYXRlPiB7XHJcbiAgZnJvbU1vZGVsKGRhdGU6IERhdGUpOiBOZ2JEYXRlU3RydWN0IHtcclxuICAgIHJldHVybiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpID9cclxuICAgICAgICB7eWVhcjogZGF0ZS5nZXRVVENGdWxsWWVhcigpLCBtb250aDogZGF0ZS5nZXRVVENNb250aCgpICsgMSwgZGF5OiBkYXRlLmdldFVUQ0RhdGUoKX0gOlxyXG4gICAgICAgIG51bGw7XHJcbiAgfVxyXG5cclxuICB0b01vZGVsKGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBEYXRlIHtcclxuICAgIHJldHVybiBkYXRlICYmIGRhdGUueWVhciAmJiBkYXRlLm1vbnRoID8gbmV3IERhdGUoRGF0ZS5VVEMoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoIC0gMSwgZGF0ZS5kYXkpKSA6IG51bGw7XHJcbiAgfVxyXG59XHJcbiJdfQ==