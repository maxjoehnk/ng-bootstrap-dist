/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgbDate } from './ngb-date';
import { toInteger } from '../util/util';
import { NgbDatepickerI18n } from './datepicker-i18n';
var NgbDatepickerNavigationSelect = /** @class */ (function () {
    function NgbDatepickerNavigationSelect(i18n) {
        this.i18n = i18n;
        this.select = new EventEmitter();
    }
    /**
     * @param {?} month
     * @return {?}
     */
    NgbDatepickerNavigationSelect.prototype.changeMonth = /**
     * @param {?} month
     * @return {?}
     */
    function (month) { this.select.emit(new NgbDate(this.date.year, toInteger(month), 1)); };
    /**
     * @param {?} year
     * @return {?}
     */
    NgbDatepickerNavigationSelect.prototype.changeYear = /**
     * @param {?} year
     * @return {?}
     */
    function (year) { this.select.emit(new NgbDate(toInteger(year), this.date.month, 1)); };
    NgbDatepickerNavigationSelect.decorators = [
        { type: Component, args: [{
                    selector: 'ngb-datepicker-navigation-select',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["\n    :host>select {\n      display: flex;\n      display: -ms-flexbox;\n      -ms-flex: 1 1 auto;\n      width: 100%;\n      padding: 0 0.5rem;\n      font-size: 0.875rem;\n      height: 1.85rem;\n    }\n  "],
                    template: "\n    <select\n      [disabled]=\"disabled\"\n      class=\"custom-select\"\n      [value]=\"date?.month\"\n      i18n-aria-label=\"@@ngb.datepicker.select-month\" aria-label=\"Select month\"\n      i18n-title=\"@@ngb.datepicker.select-month\" title=\"Select month\"\n      (change)=\"changeMonth($event.target.value)\">\n        <option *ngFor=\"let m of months\" [attr.aria-label]=\"i18n.getMonthFullName(m, date?.year)\"\n                [value]=\"m\">{{ i18n.getMonthShortName(m, date?.year) }}</option>\n    </select><select\n      [disabled]=\"disabled\"\n      class=\"custom-select\"\n      [value]=\"date?.year\"\n      i18n-aria-label=\"@@ngb.datepicker.select-year\" aria-label=\"Select year\"\n      i18n-title=\"@@ngb.datepicker.select-year\" title=\"Select year\"\n      (change)=\"changeYear($event.target.value)\">\n        <option *ngFor=\"let y of years\" [value]=\"y\">{{ i18n.getYearNumerals(y) }}</option>\n    </select>\n  "
                },] },
    ];
    /** @nocollapse */
    NgbDatepickerNavigationSelect.ctorParameters = function () { return [
        { type: NgbDatepickerI18n }
    ]; };
    NgbDatepickerNavigationSelect.propDecorators = {
        date: [{ type: Input }],
        disabled: [{ type: Input }],
        months: [{ type: Input }],
        years: [{ type: Input }],
        select: [{ type: Output }]
    };
    return NgbDatepickerNavigationSelect;
}());
export { NgbDatepickerNavigationSelect };
if (false) {
    /** @type {?} */
    NgbDatepickerNavigationSelect.prototype.date;
    /** @type {?} */
    NgbDatepickerNavigationSelect.prototype.disabled;
    /** @type {?} */
    NgbDatepickerNavigationSelect.prototype.months;
    /** @type {?} */
    NgbDatepickerNavigationSelect.prototype.years;
    /** @type {?} */
    NgbDatepickerNavigationSelect.prototype.select;
    /** @type {?} */
    NgbDatepickerNavigationSelect.prototype.i18n;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLXNlbGVjdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9kYXRlcGlja2VyLW5hdmlnYXRpb24tc2VsZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlGLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDbkMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQzs7SUE2Q2xELHVDQUFtQixJQUF1QjtRQUF2QixTQUFJLEdBQUosSUFBSSxDQUFtQjtzQkFGdkIsSUFBSSxZQUFZLEVBQVc7S0FFQTs7Ozs7SUFFOUMsbURBQVc7Ozs7SUFBWCxVQUFZLEtBQWEsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFOzs7OztJQUVsRyxrREFBVTs7OztJQUFWLFVBQVcsSUFBWSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7O2dCQS9DakcsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQ0FBa0M7b0JBQzVDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxNQUFNLEVBQUUsQ0FBQyxpTkFVUixDQUFDO29CQUNGLFFBQVEsRUFBRSxtN0JBbUJUO2lCQUNGOzs7O2dCQXBDTyxpQkFBaUI7Ozt1QkFzQ3RCLEtBQUs7MkJBQ0wsS0FBSzt5QkFDTCxLQUFLO3dCQUNMLEtBQUs7eUJBRUwsTUFBTTs7d0NBOUNUOztTQXdDYSw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi9uZ2ItZGF0ZSc7XHJcbmltcG9ydCB7dG9JbnRlZ2VyfSBmcm9tICcuLi91dGlsL3V0aWwnO1xyXG5pbXBvcnQge05nYkRhdGVwaWNrZXJJMThufSBmcm9tICcuL2RhdGVwaWNrZXItaTE4bic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25nYi1kYXRlcGlja2VyLW5hdmlnYXRpb24tc2VsZWN0JyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBzdHlsZXM6IFtgXHJcbiAgICA6aG9zdD5zZWxlY3Qge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcclxuICAgICAgLW1zLWZsZXg6IDEgMSBhdXRvO1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgcGFkZGluZzogMCAwLjVyZW07XHJcbiAgICAgIGZvbnQtc2l6ZTogMC44NzVyZW07XHJcbiAgICAgIGhlaWdodDogMS44NXJlbTtcclxuICAgIH1cclxuICBgXSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPHNlbGVjdFxyXG4gICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxyXG4gICAgICBjbGFzcz1cImN1c3RvbS1zZWxlY3RcIlxyXG4gICAgICBbdmFsdWVdPVwiZGF0ZT8ubW9udGhcIlxyXG4gICAgICBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi5kYXRlcGlja2VyLnNlbGVjdC1tb250aFwiIGFyaWEtbGFiZWw9XCJTZWxlY3QgbW9udGhcIlxyXG4gICAgICBpMThuLXRpdGxlPVwiQEBuZ2IuZGF0ZXBpY2tlci5zZWxlY3QtbW9udGhcIiB0aXRsZT1cIlNlbGVjdCBtb250aFwiXHJcbiAgICAgIChjaGFuZ2UpPVwiY2hhbmdlTW9udGgoJGV2ZW50LnRhcmdldC52YWx1ZSlcIj5cclxuICAgICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBtIG9mIG1vbnRoc1wiIFthdHRyLmFyaWEtbGFiZWxdPVwiaTE4bi5nZXRNb250aEZ1bGxOYW1lKG0sIGRhdGU/LnllYXIpXCJcclxuICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJtXCI+e3sgaTE4bi5nZXRNb250aFNob3J0TmFtZShtLCBkYXRlPy55ZWFyKSB9fTwvb3B0aW9uPlxyXG4gICAgPC9zZWxlY3Q+PHNlbGVjdFxyXG4gICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxyXG4gICAgICBjbGFzcz1cImN1c3RvbS1zZWxlY3RcIlxyXG4gICAgICBbdmFsdWVdPVwiZGF0ZT8ueWVhclwiXHJcbiAgICAgIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLmRhdGVwaWNrZXIuc2VsZWN0LXllYXJcIiBhcmlhLWxhYmVsPVwiU2VsZWN0IHllYXJcIlxyXG4gICAgICBpMThuLXRpdGxlPVwiQEBuZ2IuZGF0ZXBpY2tlci5zZWxlY3QteWVhclwiIHRpdGxlPVwiU2VsZWN0IHllYXJcIlxyXG4gICAgICAoY2hhbmdlKT1cImNoYW5nZVllYXIoJGV2ZW50LnRhcmdldC52YWx1ZSlcIj5cclxuICAgICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCB5IG9mIHllYXJzXCIgW3ZhbHVlXT1cInlcIj57eyBpMThuLmdldFllYXJOdW1lcmFscyh5KSB9fTwvb3B0aW9uPlxyXG4gICAgPC9zZWxlY3Q+XHJcbiAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlck5hdmlnYXRpb25TZWxlY3Qge1xyXG4gIEBJbnB1dCgpIGRhdGU6IE5nYkRhdGU7XHJcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgbW9udGhzOiBudW1iZXJbXTtcclxuICBASW5wdXQoKSB5ZWFyczogbnVtYmVyW107XHJcblxyXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYkRhdGU+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpMThuOiBOZ2JEYXRlcGlja2VySTE4bikge31cclxuXHJcbiAgY2hhbmdlTW9udGgobW9udGg6IHN0cmluZykgeyB0aGlzLnNlbGVjdC5lbWl0KG5ldyBOZ2JEYXRlKHRoaXMuZGF0ZS55ZWFyLCB0b0ludGVnZXIobW9udGgpLCAxKSk7IH1cclxuXHJcbiAgY2hhbmdlWWVhcih5ZWFyOiBzdHJpbmcpIHsgdGhpcy5zZWxlY3QuZW1pdChuZXcgTmdiRGF0ZSh0b0ludGVnZXIoeWVhciksIHRoaXMuZGF0ZS5tb250aCwgMSkpOyB9XHJcbn1cclxuIl19