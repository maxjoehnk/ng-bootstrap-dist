/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { NgbDatepickerI18n } from './datepicker-i18n';
var NgbDatepickerMonthView = /** @class */ (function () {
    function NgbDatepickerMonthView(i18n) {
        this.i18n = i18n;
        this.select = new EventEmitter();
    }
    /**
     * @param {?} day
     * @return {?}
     */
    NgbDatepickerMonthView.prototype.doSelect = /**
     * @param {?} day
     * @return {?}
     */
    function (day) {
        if (!day.context.disabled && !day.hidden) {
            this.select.emit(day.date);
        }
    };
    NgbDatepickerMonthView.decorators = [
        { type: Component, args: [{
                    selector: 'ngb-datepicker-month-view',
                    host: { 'role': 'grid' },
                    styles: ["\n    :host {\n      display: block;\n    }\n    .ngb-dp-weekday, .ngb-dp-week-number {\n      line-height: 2rem;\n      text-align: center;\n      font-style: italic;\n    }\n    .ngb-dp-weekday {\n      color: #5bc0de;\n      color: var(--info);\n    }\n    .ngb-dp-week {\n      border-radius: 0.25rem;\n      display: -ms-flexbox;\n      display: flex;\n    }\n    .ngb-dp-weekdays {\n      border-bottom: 1px solid rgba(0, 0, 0, 0.125);\n      border-radius: 0;\n    }\n    .ngb-dp-day, .ngb-dp-weekday, .ngb-dp-week-number {\n      width: 2rem;\n      height: 2rem;\n    }\n    .ngb-dp-day {\n      cursor: pointer;\n    }\n    .ngb-dp-day.disabled, .ngb-dp-day.hidden {\n      cursor: default;\n    }\n  "],
                    template: "\n    <div *ngIf=\"showWeekdays\" class=\"ngb-dp-week ngb-dp-weekdays bg-light\">\n      <div *ngIf=\"showWeekNumbers\" class=\"ngb-dp-weekday ngb-dp-showweek\"></div>\n      <div *ngFor=\"let w of month.weekdays\" class=\"ngb-dp-weekday small\">\n        {{ i18n.getWeekdayShortName(w) }}\n      </div>\n    </div>\n    <ng-template ngFor let-week [ngForOf]=\"month.weeks\">\n      <div *ngIf=\"!week.collapsed\" class=\"ngb-dp-week\" role=\"row\">\n        <div *ngIf=\"showWeekNumbers\" class=\"ngb-dp-week-number small text-muted\">{{ i18n.getWeekNumerals(week.number) }}</div>\n        <div *ngFor=\"let day of week.days\" (click)=\"doSelect(day)\" class=\"ngb-dp-day\" role=\"gridcell\"\n          [class.disabled]=\"day.context.disabled\"\n          [tabindex]=\"day.tabindex\"\n          [class.hidden]=\"day.hidden\"\n          [attr.aria-label]=\"day.ariaLabel\">\n          <ng-template [ngIf]=\"!day.hidden\">\n            <ng-template [ngTemplateOutlet]=\"dayTemplate\" [ngTemplateOutletContext]=\"day.context\"></ng-template>\n          </ng-template>\n        </div>\n      </div>\n    </ng-template>\n  "
                },] },
    ];
    /** @nocollapse */
    NgbDatepickerMonthView.ctorParameters = function () { return [
        { type: NgbDatepickerI18n }
    ]; };
    NgbDatepickerMonthView.propDecorators = {
        dayTemplate: [{ type: Input }],
        month: [{ type: Input }],
        showWeekdays: [{ type: Input }],
        showWeekNumbers: [{ type: Input }],
        select: [{ type: Output }]
    };
    return NgbDatepickerMonthView;
}());
export { NgbDatepickerMonthView };
if (false) {
    /** @type {?} */
    NgbDatepickerMonthView.prototype.dayTemplate;
    /** @type {?} */
    NgbDatepickerMonthView.prototype.month;
    /** @type {?} */
    NgbDatepickerMonthView.prototype.showWeekdays;
    /** @type {?} */
    NgbDatepickerMonthView.prototype.showWeekNumbers;
    /** @type {?} */
    NgbDatepickerMonthView.prototype.select;
    /** @type {?} */
    NgbDatepickerMonthView.prototype.i18n;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1tb250aC12aWV3LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJkYXRlcGlja2VyL2RhdGVwaWNrZXItbW9udGgtdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFHbEYsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7O0lBc0VsRCxnQ0FBbUIsSUFBdUI7UUFBdkIsU0FBSSxHQUFKLElBQUksQ0FBbUI7c0JBRnZCLElBQUksWUFBWSxFQUFXO0tBRUE7Ozs7O0lBRTlDLHlDQUFROzs7O0lBQVIsVUFBUyxHQUFpQjtRQUN4QixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzVCO0tBQ0Y7O2dCQXpFRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsSUFBSSxFQUFFLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBQztvQkFDdEIsTUFBTSxFQUFFLENBQUMseXNCQWdDUixDQUFDO29CQUNGLFFBQVEsRUFBRSxpbUNBcUJUO2lCQUNGOzs7O2dCQTdETyxpQkFBaUI7Ozs4QkErRHRCLEtBQUs7d0JBQ0wsS0FBSzsrQkFDTCxLQUFLO2tDQUNMLEtBQUs7eUJBRUwsTUFBTTs7aUNBdkVUOztTQWlFYSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIFRlbXBsYXRlUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TW9udGhWaWV3TW9kZWwsIERheVZpZXdNb2RlbH0gZnJvbSAnLi9kYXRlcGlja2VyLXZpZXctbW9kZWwnO1xyXG5pbXBvcnQge05nYkRhdGV9IGZyb20gJy4vbmdiLWRhdGUnO1xyXG5pbXBvcnQge05nYkRhdGVwaWNrZXJJMThufSBmcm9tICcuL2RhdGVwaWNrZXItaTE4bic7XHJcbmltcG9ydCB7RGF5VGVtcGxhdGVDb250ZXh0fSBmcm9tICcuL2RhdGVwaWNrZXItZGF5LXRlbXBsYXRlLWNvbnRleHQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ2ItZGF0ZXBpY2tlci1tb250aC12aWV3JyxcclxuICBob3N0OiB7J3JvbGUnOiAnZ3JpZCd9LFxyXG4gIHN0eWxlczogW2BcclxuICAgIDpob3N0IHtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB9XHJcbiAgICAubmdiLWRwLXdlZWtkYXksIC5uZ2ItZHAtd2Vlay1udW1iZXIge1xyXG4gICAgICBsaW5lLWhlaWdodDogMnJlbTtcclxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICBmb250LXN0eWxlOiBpdGFsaWM7XHJcbiAgICB9XHJcbiAgICAubmdiLWRwLXdlZWtkYXkge1xyXG4gICAgICBjb2xvcjogIzViYzBkZTtcclxuICAgICAgY29sb3I6IHZhcigtLWluZm8pO1xyXG4gICAgfVxyXG4gICAgLm5nYi1kcC13ZWVrIHtcclxuICAgICAgYm9yZGVyLXJhZGl1czogMC4yNXJlbTtcclxuICAgICAgZGlzcGxheTogLW1zLWZsZXhib3g7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICB9XHJcbiAgICAubmdiLWRwLXdlZWtkYXlzIHtcclxuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4xMjUpO1xyXG4gICAgICBib3JkZXItcmFkaXVzOiAwO1xyXG4gICAgfVxyXG4gICAgLm5nYi1kcC1kYXksIC5uZ2ItZHAtd2Vla2RheSwgLm5nYi1kcC13ZWVrLW51bWJlciB7XHJcbiAgICAgIHdpZHRoOiAycmVtO1xyXG4gICAgICBoZWlnaHQ6IDJyZW07XHJcbiAgICB9XHJcbiAgICAubmdiLWRwLWRheSB7XHJcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIH1cclxuICAgIC5uZ2ItZHAtZGF5LmRpc2FibGVkLCAubmdiLWRwLWRheS5oaWRkZW4ge1xyXG4gICAgICBjdXJzb3I6IGRlZmF1bHQ7XHJcbiAgICB9XHJcbiAgYF0sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgKm5nSWY9XCJzaG93V2Vla2RheXNcIiBjbGFzcz1cIm5nYi1kcC13ZWVrIG5nYi1kcC13ZWVrZGF5cyBiZy1saWdodFwiPlxyXG4gICAgICA8ZGl2ICpuZ0lmPVwic2hvd1dlZWtOdW1iZXJzXCIgY2xhc3M9XCJuZ2ItZHAtd2Vla2RheSBuZ2ItZHAtc2hvd3dlZWtcIj48L2Rpdj5cclxuICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgdyBvZiBtb250aC53ZWVrZGF5c1wiIGNsYXNzPVwibmdiLWRwLXdlZWtkYXkgc21hbGxcIj5cclxuICAgICAgICB7eyBpMThuLmdldFdlZWtkYXlTaG9ydE5hbWUodykgfX1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtd2VlayBbbmdGb3JPZl09XCJtb250aC53ZWVrc1wiPlxyXG4gICAgICA8ZGl2ICpuZ0lmPVwiIXdlZWsuY29sbGFwc2VkXCIgY2xhc3M9XCJuZ2ItZHAtd2Vla1wiIHJvbGU9XCJyb3dcIj5cclxuICAgICAgICA8ZGl2ICpuZ0lmPVwic2hvd1dlZWtOdW1iZXJzXCIgY2xhc3M9XCJuZ2ItZHAtd2Vlay1udW1iZXIgc21hbGwgdGV4dC1tdXRlZFwiPnt7IGkxOG4uZ2V0V2Vla051bWVyYWxzKHdlZWsubnVtYmVyKSB9fTwvZGl2PlxyXG4gICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGRheSBvZiB3ZWVrLmRheXNcIiAoY2xpY2spPVwiZG9TZWxlY3QoZGF5KVwiIGNsYXNzPVwibmdiLWRwLWRheVwiIHJvbGU9XCJncmlkY2VsbFwiXHJcbiAgICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiZGF5LmNvbnRleHQuZGlzYWJsZWRcIlxyXG4gICAgICAgICAgW3RhYmluZGV4XT1cImRheS50YWJpbmRleFwiXHJcbiAgICAgICAgICBbY2xhc3MuaGlkZGVuXT1cImRheS5oaWRkZW5cIlxyXG4gICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJkYXkuYXJpYUxhYmVsXCI+XHJcbiAgICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiIWRheS5oaWRkZW5cIj5cclxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImRheVRlbXBsYXRlXCIgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cImRheS5jb250ZXh0XCI+PC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VyTW9udGhWaWV3IHtcclxuICBASW5wdXQoKSBkYXlUZW1wbGF0ZTogVGVtcGxhdGVSZWY8RGF5VGVtcGxhdGVDb250ZXh0PjtcclxuICBASW5wdXQoKSBtb250aDogTW9udGhWaWV3TW9kZWw7XHJcbiAgQElucHV0KCkgc2hvd1dlZWtkYXlzO1xyXG4gIEBJbnB1dCgpIHNob3dXZWVrTnVtYmVycztcclxuXHJcbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiRGF0ZT4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGkxOG46IE5nYkRhdGVwaWNrZXJJMThuKSB7fVxyXG5cclxuICBkb1NlbGVjdChkYXk6IERheVZpZXdNb2RlbCkge1xyXG4gICAgaWYgKCFkYXkuY29udGV4dC5kaXNhYmxlZCAmJiAhZGF5LmhpZGRlbikge1xyXG4gICAgICB0aGlzLnNlbGVjdC5lbWl0KGRheS5kYXRlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19