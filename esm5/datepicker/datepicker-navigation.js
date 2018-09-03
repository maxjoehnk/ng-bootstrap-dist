/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NavigationEvent } from './datepicker-view-model';
import { NgbDate } from './ngb-date';
import { NgbDatepickerI18n } from './datepicker-i18n';
var NgbDatepickerNavigation = /** @class */ (function () {
    function NgbDatepickerNavigation(i18n) {
        this.i18n = i18n;
        this.navigation = NavigationEvent;
        this.months = [];
        this.navigate = new EventEmitter();
        this.select = new EventEmitter();
    }
    NgbDatepickerNavigation.decorators = [
        { type: Component, args: [{
                    selector: 'ngb-datepicker-navigation',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["\n    :host {\n      display: -ms-flexbox;\n      display: flex;\n      align-items: center;\n    }\n    .ngb-dp-navigation-chevron {\n      border-style: solid;\n      border-width: 0.2em 0.2em 0 0;\n      display: inline-block;\n      width: 0.75em;\n      height: 0.75em;\n      margin-left: 0.25em;\n      margin-right: 0.15em;\n      transform: rotate(-135deg);\n      -ms-transform: rotate(-135deg);\n    }\n    .right .ngb-dp-navigation-chevron {\n      -ms-transform: rotate(45deg);\n      transform: rotate(45deg);\n      margin-left: 0.15em;\n      margin-right: 0.25em;\n    }\n    .ngb-dp-arrow {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex: 1 1 auto;\n      flex-grow: 1;\n      padding-right: 0;\n      padding-left: 0;\n      margin: 0;\n      width: 2rem;\n      height: 2rem;\n    }\n    .ngb-dp-arrow.right {\n      -ms-flex-pack: end;\n      justify-content: flex-end;\n    }\n    .ngb-dp-arrow-btn {\n      padding: 0 0.25rem;\n      margin: 0 0.5rem;\n      border: none;\n      background-color: transparent;\n      z-index: 1;\n    }\n    .ngb-dp-arrow-btn:focus {\n      outline: auto 1px;\n    }\n    .ngb-dp-month-name {\n      font-size: larger;\n      height: 2rem;\n      line-height: 2rem;\n      text-align: center;\n    }\n    .ngb-dp-navigation-select {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex: 1 1 9rem;\n      flex-grow: 1;\n      flex-basis: 9rem;\n    }\n  "],
                    template: "\n    <div class=\"ngb-dp-arrow\">\n      <button type=\"button\" class=\"btn btn-link ngb-dp-arrow-btn\" (click)=\"!!navigate.emit(navigation.PREV)\" [disabled]=\"prevDisabled\"\n              i18n-aria-label=\"@@ngb.datepicker.previous-month\" aria-label=\"Previous month\"\n              i18n-title=\"@@ngb.datepicker.previous-month\" title=\"Previous month\">\n        <span class=\"ngb-dp-navigation-chevron\"></span>\n      </button>\n    </div>\n    <ngb-datepicker-navigation-select *ngIf=\"showSelect\" class=\"ngb-dp-navigation-select\"\n      [date]=\"date\"\n      [disabled] = \"disabled\"\n      [months]=\"selectBoxes.months\"\n      [years]=\"selectBoxes.years\"\n      (select)=\"select.emit($event)\">\n    </ngb-datepicker-navigation-select>\n\n    <ng-template *ngIf=\"!showSelect\" ngFor let-month [ngForOf]=\"months\" let-i=\"index\">\n      <div class=\"ngb-dp-arrow\" *ngIf=\"i > 0\"></div>\n      <div class=\"ngb-dp-month-name\">\n        {{ i18n.getMonthFullName(month.number, month.year) }} {{ i18n.getYearNumerals(month.year) }}\n      </div>\n      <div class=\"ngb-dp-arrow\" *ngIf=\"i !== months.length - 1\"></div>\n    </ng-template>\n    <div class=\"ngb-dp-arrow right\">\n      <button type=\"button\" class=\"btn btn-link ngb-dp-arrow-btn\" (click)=\"!!navigate.emit(navigation.NEXT)\" [disabled]=\"nextDisabled\"\n              i18n-aria-label=\"@@ngb.datepicker.next-month\" aria-label=\"Next month\"\n              i18n-title=\"@@ngb.datepicker.next-month\" title=\"Next month\">\n        <span class=\"ngb-dp-navigation-chevron\"></span>\n      </button>\n    </div>\n    "
                },] },
    ];
    /** @nocollapse */
    NgbDatepickerNavigation.ctorParameters = function () { return [
        { type: NgbDatepickerI18n }
    ]; };
    NgbDatepickerNavigation.propDecorators = {
        date: [{ type: Input }],
        disabled: [{ type: Input }],
        months: [{ type: Input }],
        showSelect: [{ type: Input }],
        prevDisabled: [{ type: Input }],
        nextDisabled: [{ type: Input }],
        selectBoxes: [{ type: Input }],
        navigate: [{ type: Output }],
        select: [{ type: Output }]
    };
    return NgbDatepickerNavigation;
}());
export { NgbDatepickerNavigation };
if (false) {
    /** @type {?} */
    NgbDatepickerNavigation.prototype.navigation;
    /** @type {?} */
    NgbDatepickerNavigation.prototype.date;
    /** @type {?} */
    NgbDatepickerNavigation.prototype.disabled;
    /** @type {?} */
    NgbDatepickerNavigation.prototype.months;
    /** @type {?} */
    NgbDatepickerNavigation.prototype.showSelect;
    /** @type {?} */
    NgbDatepickerNavigation.prototype.prevDisabled;
    /** @type {?} */
    NgbDatepickerNavigation.prototype.nextDisabled;
    /** @type {?} */
    NgbDatepickerNavigation.prototype.selectBoxes;
    /** @type {?} */
    NgbDatepickerNavigation.prototype.navigate;
    /** @type {?} */
    NgbDatepickerNavigation.prototype.select;
    /** @type {?} */
    NgbDatepickerNavigation.prototype.i18n;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJkYXRlcGlja2VyL2RhdGVwaWNrZXItbmF2aWdhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5RixPQUFPLEVBQUMsZUFBZSxFQUFpQixNQUFNLHlCQUF5QixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDbkMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7O0lBa0hsRCxpQ0FBbUIsSUFBdUI7UUFBdkIsU0FBSSxHQUFKLElBQUksQ0FBbUI7MEJBYjdCLGVBQWU7c0JBSVEsRUFBRTt3QkFNakIsSUFBSSxZQUFZLEVBQW1CO3NCQUNyQyxJQUFJLFlBQVksRUFBVztLQUVBOztnQkEvRy9DLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsTUFBTSxFQUFFLENBQUMsczZDQTZEUixDQUFDO29CQUNGLFFBQVEsRUFBRSxnbERBOEJQO2lCQUNKOzs7O2dCQW5HTyxpQkFBaUI7Ozt1QkF1R3RCLEtBQUs7MkJBQ0wsS0FBSzt5QkFDTCxLQUFLOzZCQUNMLEtBQUs7K0JBQ0wsS0FBSzsrQkFDTCxLQUFLOzhCQUNMLEtBQUs7MkJBRUwsTUFBTTt5QkFDTixNQUFNOztrQ0FuSFQ7O1NBdUdhLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOYXZpZ2F0aW9uRXZlbnQsIE1vbnRoVmlld01vZGVsfSBmcm9tICcuL2RhdGVwaWNrZXItdmlldy1tb2RlbCc7XHJcbmltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi9uZ2ItZGF0ZSc7XHJcbmltcG9ydCB7TmdiRGF0ZXBpY2tlckkxOG59IGZyb20gJy4vZGF0ZXBpY2tlci1pMThuJztcclxuXHJcbi8vIFRoZSAtbXMtIGFuZCAtd2Via2l0LSBlbGVtZW50IGZvciB0aGUgQ1NTIGNhbiBiZSByZW1vdmVkIGlmIHdlIGFyZSBnZW5lcmF0aW5nIHRoZSBDU1MgdXNpbmcgU0FTUy5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ2ItZGF0ZXBpY2tlci1uYXZpZ2F0aW9uJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBzdHlsZXM6IFtgXHJcbiAgICA6aG9zdCB7XHJcbiAgICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgfVxyXG4gICAgLm5nYi1kcC1uYXZpZ2F0aW9uLWNoZXZyb24ge1xyXG4gICAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xyXG4gICAgICBib3JkZXItd2lkdGg6IDAuMmVtIDAuMmVtIDAgMDtcclxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICB3aWR0aDogMC43NWVtO1xyXG4gICAgICBoZWlnaHQ6IDAuNzVlbTtcclxuICAgICAgbWFyZ2luLWxlZnQ6IDAuMjVlbTtcclxuICAgICAgbWFyZ2luLXJpZ2h0OiAwLjE1ZW07XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKC0xMzVkZWcpO1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoLTEzNWRlZyk7XHJcbiAgICB9XHJcbiAgICAucmlnaHQgLm5nYi1kcC1uYXZpZ2F0aW9uLWNoZXZyb24ge1xyXG4gICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xyXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XHJcbiAgICAgIG1hcmdpbi1sZWZ0OiAwLjE1ZW07XHJcbiAgICAgIG1hcmdpbi1yaWdodDogMC4yNWVtO1xyXG4gICAgfVxyXG4gICAgLm5nYi1kcC1hcnJvdyB7XHJcbiAgICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAtbXMtZmxleDogMSAxIGF1dG87XHJcbiAgICAgIGZsZXgtZ3JvdzogMTtcclxuICAgICAgcGFkZGluZy1yaWdodDogMDtcclxuICAgICAgcGFkZGluZy1sZWZ0OiAwO1xyXG4gICAgICBtYXJnaW46IDA7XHJcbiAgICAgIHdpZHRoOiAycmVtO1xyXG4gICAgICBoZWlnaHQ6IDJyZW07XHJcbiAgICB9XHJcbiAgICAubmdiLWRwLWFycm93LnJpZ2h0IHtcclxuICAgICAgLW1zLWZsZXgtcGFjazogZW5kO1xyXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xyXG4gICAgfVxyXG4gICAgLm5nYi1kcC1hcnJvdy1idG4ge1xyXG4gICAgICBwYWRkaW5nOiAwIDAuMjVyZW07XHJcbiAgICAgIG1hcmdpbjogMCAwLjVyZW07XHJcbiAgICAgIGJvcmRlcjogbm9uZTtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbiAgICAgIHotaW5kZXg6IDE7XHJcbiAgICB9XHJcbiAgICAubmdiLWRwLWFycm93LWJ0bjpmb2N1cyB7XHJcbiAgICAgIG91dGxpbmU6IGF1dG8gMXB4O1xyXG4gICAgfVxyXG4gICAgLm5nYi1kcC1tb250aC1uYW1lIHtcclxuICAgICAgZm9udC1zaXplOiBsYXJnZXI7XHJcbiAgICAgIGhlaWdodDogMnJlbTtcclxuICAgICAgbGluZS1oZWlnaHQ6IDJyZW07XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIH1cclxuICAgIC5uZ2ItZHAtbmF2aWdhdGlvbi1zZWxlY3Qge1xyXG4gICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgLW1zLWZsZXg6IDEgMSA5cmVtO1xyXG4gICAgICBmbGV4LWdyb3c6IDE7XHJcbiAgICAgIGZsZXgtYmFzaXM6IDlyZW07XHJcbiAgICB9XHJcbiAgYF0sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJuZ2ItZHAtYXJyb3dcIj5cclxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWxpbmsgbmdiLWRwLWFycm93LWJ0blwiIChjbGljayk9XCIhIW5hdmlnYXRlLmVtaXQobmF2aWdhdGlvbi5QUkVWKVwiIFtkaXNhYmxlZF09XCJwcmV2RGlzYWJsZWRcIlxyXG4gICAgICAgICAgICAgIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLmRhdGVwaWNrZXIucHJldmlvdXMtbW9udGhcIiBhcmlhLWxhYmVsPVwiUHJldmlvdXMgbW9udGhcIlxyXG4gICAgICAgICAgICAgIGkxOG4tdGl0bGU9XCJAQG5nYi5kYXRlcGlja2VyLnByZXZpb3VzLW1vbnRoXCIgdGl0bGU9XCJQcmV2aW91cyBtb250aFwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwibmdiLWRwLW5hdmlnYXRpb24tY2hldnJvblwiPjwvc3Bhbj5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxuZ2ItZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLXNlbGVjdCAqbmdJZj1cInNob3dTZWxlY3RcIiBjbGFzcz1cIm5nYi1kcC1uYXZpZ2F0aW9uLXNlbGVjdFwiXHJcbiAgICAgIFtkYXRlXT1cImRhdGVcIlxyXG4gICAgICBbZGlzYWJsZWRdID0gXCJkaXNhYmxlZFwiXHJcbiAgICAgIFttb250aHNdPVwic2VsZWN0Qm94ZXMubW9udGhzXCJcclxuICAgICAgW3llYXJzXT1cInNlbGVjdEJveGVzLnllYXJzXCJcclxuICAgICAgKHNlbGVjdCk9XCJzZWxlY3QuZW1pdCgkZXZlbnQpXCI+XHJcbiAgICA8L25nYi1kYXRlcGlja2VyLW5hdmlnYXRpb24tc2VsZWN0PlxyXG5cclxuICAgIDxuZy10ZW1wbGF0ZSAqbmdJZj1cIiFzaG93U2VsZWN0XCIgbmdGb3IgbGV0LW1vbnRoIFtuZ0Zvck9mXT1cIm1vbnRoc1wiIGxldC1pPVwiaW5kZXhcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm5nYi1kcC1hcnJvd1wiICpuZ0lmPVwiaSA+IDBcIj48L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm5nYi1kcC1tb250aC1uYW1lXCI+XHJcbiAgICAgICAge3sgaTE4bi5nZXRNb250aEZ1bGxOYW1lKG1vbnRoLm51bWJlciwgbW9udGgueWVhcikgfX0ge3sgaTE4bi5nZXRZZWFyTnVtZXJhbHMobW9udGgueWVhcikgfX1cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJuZ2ItZHAtYXJyb3dcIiAqbmdJZj1cImkgIT09IG1vbnRocy5sZW5ndGggLSAxXCI+PC9kaXY+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgPGRpdiBjbGFzcz1cIm5nYi1kcC1hcnJvdyByaWdodFwiPlxyXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tbGluayBuZ2ItZHAtYXJyb3ctYnRuXCIgKGNsaWNrKT1cIiEhbmF2aWdhdGUuZW1pdChuYXZpZ2F0aW9uLk5FWFQpXCIgW2Rpc2FibGVkXT1cIm5leHREaXNhYmxlZFwiXHJcbiAgICAgICAgICAgICAgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IuZGF0ZXBpY2tlci5uZXh0LW1vbnRoXCIgYXJpYS1sYWJlbD1cIk5leHQgbW9udGhcIlxyXG4gICAgICAgICAgICAgIGkxOG4tdGl0bGU9XCJAQG5nYi5kYXRlcGlja2VyLm5leHQtbW9udGhcIiB0aXRsZT1cIk5leHQgbW9udGhcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cIm5nYi1kcC1uYXZpZ2F0aW9uLWNoZXZyb25cIj48L3NwYW4+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VyTmF2aWdhdGlvbiB7XHJcbiAgbmF2aWdhdGlvbiA9IE5hdmlnYXRpb25FdmVudDtcclxuXHJcbiAgQElucHV0KCkgZGF0ZTogTmdiRGF0ZTtcclxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcclxuICBASW5wdXQoKSBtb250aHM6IE1vbnRoVmlld01vZGVsW10gPSBbXTtcclxuICBASW5wdXQoKSBzaG93U2VsZWN0OiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHByZXZEaXNhYmxlZDogYm9vbGVhbjtcclxuICBASW5wdXQoKSBuZXh0RGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgc2VsZWN0Qm94ZXM6IHt5ZWFyczogbnVtYmVyW10sIG1vbnRoczogbnVtYmVyW119O1xyXG5cclxuICBAT3V0cHV0KCkgbmF2aWdhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPE5hdmlnYXRpb25FdmVudD4oKTtcclxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ2JEYXRlPigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgaTE4bjogTmdiRGF0ZXBpY2tlckkxOG4pIHt9XHJcbn1cclxuIl19