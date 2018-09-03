/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgbDate } from './ngb-date';
import { toInteger } from '../util/util';
import { NgbDatepickerI18n } from './datepicker-i18n';
export class NgbDatepickerNavigationSelect {
    /**
     * @param {?} i18n
     */
    constructor(i18n) {
        this.i18n = i18n;
        this.select = new EventEmitter();
    }
    /**
     * @param {?} month
     * @return {?}
     */
    changeMonth(month) { this.select.emit(new NgbDate(this.date.year, toInteger(month), 1)); }
    /**
     * @param {?} year
     * @return {?}
     */
    changeYear(year) { this.select.emit(new NgbDate(toInteger(year), this.date.month, 1)); }
}
NgbDatepickerNavigationSelect.decorators = [
    { type: Component, args: [{
                selector: 'ngb-datepicker-navigation-select',
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
    :host>select {
      display: flex;
      display: -ms-flexbox;
      -ms-flex: 1 1 auto;
      width: 100%;
      padding: 0 0.5rem;
      font-size: 0.875rem;
      height: 1.85rem;
    }
  `],
                template: `
    <select
      [disabled]="disabled"
      class="custom-select"
      [value]="date?.month"
      i18n-aria-label="@@ngb.datepicker.select-month" aria-label="Select month"
      i18n-title="@@ngb.datepicker.select-month" title="Select month"
      (change)="changeMonth($event.target.value)">
        <option *ngFor="let m of months" [attr.aria-label]="i18n.getMonthFullName(m, date?.year)"
                [value]="m">{{ i18n.getMonthShortName(m, date?.year) }}</option>
    </select><select
      [disabled]="disabled"
      class="custom-select"
      [value]="date?.year"
      i18n-aria-label="@@ngb.datepicker.select-year" aria-label="Select year"
      i18n-title="@@ngb.datepicker.select-year" title="Select year"
      (change)="changeYear($event.target.value)">
        <option *ngFor="let y of years" [value]="y">{{ i18n.getYearNumerals(y) }}</option>
    </select>
  `
            },] },
];
/** @nocollapse */
NgbDatepickerNavigationSelect.ctorParameters = () => [
    { type: NgbDatepickerI18n }
];
NgbDatepickerNavigationSelect.propDecorators = {
    date: [{ type: Input }],
    disabled: [{ type: Input }],
    months: [{ type: Input }],
    years: [{ type: Input }],
    select: [{ type: Output }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLXNlbGVjdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9kYXRlcGlja2VyLW5hdmlnYXRpb24tc2VsZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlGLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDbkMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQXFDcEQsTUFBTTs7OztJQVFKLFlBQW1CLElBQXVCO1FBQXZCLFNBQUksR0FBSixJQUFJLENBQW1CO3NCQUZ2QixJQUFJLFlBQVksRUFBVztLQUVBOzs7OztJQUU5QyxXQUFXLENBQUMsS0FBYSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Ozs7O0lBRWxHLFVBQVUsQ0FBQyxJQUFZLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTs7O1lBL0NqRyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtDQUFrQztnQkFDNUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLE1BQU0sRUFBRSxDQUFDOzs7Ozs7Ozs7O0dBVVIsQ0FBQztnQkFDRixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQlQ7YUFDRjs7OztZQXBDTyxpQkFBaUI7OzttQkFzQ3RCLEtBQUs7dUJBQ0wsS0FBSztxQkFDTCxLQUFLO29CQUNMLEtBQUs7cUJBRUwsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcclxuaW1wb3J0IHt0b0ludGVnZXJ9IGZyb20gJy4uL3V0aWwvdXRpbCc7XHJcbmltcG9ydCB7TmdiRGF0ZXBpY2tlckkxOG59IGZyb20gJy4vZGF0ZXBpY2tlci1pMThuJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmdiLWRhdGVwaWNrZXItbmF2aWdhdGlvbi1zZWxlY3QnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIHN0eWxlczogW2BcclxuICAgIDpob3N0PnNlbGVjdCB7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xyXG4gICAgICAtbXMtZmxleDogMSAxIGF1dG87XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICBwYWRkaW5nOiAwIDAuNXJlbTtcclxuICAgICAgZm9udC1zaXplOiAwLjg3NXJlbTtcclxuICAgICAgaGVpZ2h0OiAxLjg1cmVtO1xyXG4gICAgfVxyXG4gIGBdLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8c2VsZWN0XHJcbiAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXHJcbiAgICAgIGNsYXNzPVwiY3VzdG9tLXNlbGVjdFwiXHJcbiAgICAgIFt2YWx1ZV09XCJkYXRlPy5tb250aFwiXHJcbiAgICAgIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLmRhdGVwaWNrZXIuc2VsZWN0LW1vbnRoXCIgYXJpYS1sYWJlbD1cIlNlbGVjdCBtb250aFwiXHJcbiAgICAgIGkxOG4tdGl0bGU9XCJAQG5nYi5kYXRlcGlja2VyLnNlbGVjdC1tb250aFwiIHRpdGxlPVwiU2VsZWN0IG1vbnRoXCJcclxuICAgICAgKGNoYW5nZSk9XCJjaGFuZ2VNb250aCgkZXZlbnQudGFyZ2V0LnZhbHVlKVwiPlxyXG4gICAgICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IG0gb2YgbW9udGhzXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJpMThuLmdldE1vbnRoRnVsbE5hbWUobSwgZGF0ZT8ueWVhcilcIlxyXG4gICAgICAgICAgICAgICAgW3ZhbHVlXT1cIm1cIj57eyBpMThuLmdldE1vbnRoU2hvcnROYW1lKG0sIGRhdGU/LnllYXIpIH19PC9vcHRpb24+XHJcbiAgICA8L3NlbGVjdD48c2VsZWN0XHJcbiAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXHJcbiAgICAgIGNsYXNzPVwiY3VzdG9tLXNlbGVjdFwiXHJcbiAgICAgIFt2YWx1ZV09XCJkYXRlPy55ZWFyXCJcclxuICAgICAgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IuZGF0ZXBpY2tlci5zZWxlY3QteWVhclwiIGFyaWEtbGFiZWw9XCJTZWxlY3QgeWVhclwiXHJcbiAgICAgIGkxOG4tdGl0bGU9XCJAQG5nYi5kYXRlcGlja2VyLnNlbGVjdC15ZWFyXCIgdGl0bGU9XCJTZWxlY3QgeWVhclwiXHJcbiAgICAgIChjaGFuZ2UpPVwiY2hhbmdlWWVhcigkZXZlbnQudGFyZ2V0LnZhbHVlKVwiPlxyXG4gICAgICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IHkgb2YgeWVhcnNcIiBbdmFsdWVdPVwieVwiPnt7IGkxOG4uZ2V0WWVhck51bWVyYWxzKHkpIH19PC9vcHRpb24+XHJcbiAgICA8L3NlbGVjdD5cclxuICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VyTmF2aWdhdGlvblNlbGVjdCB7XHJcbiAgQElucHV0KCkgZGF0ZTogTmdiRGF0ZTtcclxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcclxuICBASW5wdXQoKSBtb250aHM6IG51bWJlcltdO1xyXG4gIEBJbnB1dCgpIHllYXJzOiBudW1iZXJbXTtcclxuXHJcbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiRGF0ZT4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGkxOG46IE5nYkRhdGVwaWNrZXJJMThuKSB7fVxyXG5cclxuICBjaGFuZ2VNb250aChtb250aDogc3RyaW5nKSB7IHRoaXMuc2VsZWN0LmVtaXQobmV3IE5nYkRhdGUodGhpcy5kYXRlLnllYXIsIHRvSW50ZWdlcihtb250aCksIDEpKTsgfVxyXG5cclxuICBjaGFuZ2VZZWFyKHllYXI6IHN0cmluZykgeyB0aGlzLnNlbGVjdC5lbWl0KG5ldyBOZ2JEYXRlKHRvSW50ZWdlcih5ZWFyKSwgdGhpcy5kYXRlLm1vbnRoLCAxKSk7IH1cclxufVxyXG4iXX0=