/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { NgbDatepickerI18n } from './datepicker-i18n';
export class NgbDatepickerMonthView {
    /**
     * @param {?} i18n
     */
    constructor(i18n) {
        this.i18n = i18n;
        this.select = new EventEmitter();
    }
    /**
     * @param {?} day
     * @return {?}
     */
    doSelect(day) {
        if (!day.context.disabled && !day.hidden) {
            this.select.emit(day.date);
        }
    }
}
NgbDatepickerMonthView.decorators = [
    { type: Component, args: [{
                selector: 'ngb-datepicker-month-view',
                host: { 'role': 'grid' },
                styles: [`
    :host {
      display: block;
    }
    .ngb-dp-weekday, .ngb-dp-week-number {
      line-height: 2rem;
      text-align: center;
      font-style: italic;
    }
    .ngb-dp-weekday {
      color: #5bc0de;
      color: var(--info);
    }
    .ngb-dp-week {
      border-radius: 0.25rem;
      display: -ms-flexbox;
      display: flex;
    }
    .ngb-dp-weekdays {
      border-bottom: 1px solid rgba(0, 0, 0, 0.125);
      border-radius: 0;
    }
    .ngb-dp-day, .ngb-dp-weekday, .ngb-dp-week-number {
      width: 2rem;
      height: 2rem;
    }
    .ngb-dp-day {
      cursor: pointer;
    }
    .ngb-dp-day.disabled, .ngb-dp-day.hidden {
      cursor: default;
    }
  `],
                template: `
    <div *ngIf="showWeekdays" class="ngb-dp-week ngb-dp-weekdays bg-light">
      <div *ngIf="showWeekNumbers" class="ngb-dp-weekday ngb-dp-showweek"></div>
      <div *ngFor="let w of month.weekdays" class="ngb-dp-weekday small">
        {{ i18n.getWeekdayShortName(w) }}
      </div>
    </div>
    <ng-template ngFor let-week [ngForOf]="month.weeks">
      <div *ngIf="!week.collapsed" class="ngb-dp-week" role="row">
        <div *ngIf="showWeekNumbers" class="ngb-dp-week-number small text-muted">{{ i18n.getWeekNumerals(week.number) }}</div>
        <div *ngFor="let day of week.days" (click)="doSelect(day)" class="ngb-dp-day" role="gridcell"
          [class.disabled]="day.context.disabled"
          [tabindex]="day.tabindex"
          [class.hidden]="day.hidden"
          [attr.aria-label]="day.ariaLabel">
          <ng-template [ngIf]="!day.hidden">
            <ng-template [ngTemplateOutlet]="dayTemplate" [ngTemplateOutletContext]="day.context"></ng-template>
          </ng-template>
        </div>
      </div>
    </ng-template>
  `
            },] },
];
/** @nocollapse */
NgbDatepickerMonthView.ctorParameters = () => [
    { type: NgbDatepickerI18n }
];
NgbDatepickerMonthView.propDecorators = {
    dayTemplate: [{ type: Input }],
    month: [{ type: Input }],
    showWeekdays: [{ type: Input }],
    showWeekNumbers: [{ type: Input }],
    select: [{ type: Output }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1tb250aC12aWV3LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJkYXRlcGlja2VyL2RhdGVwaWNrZXItbW9udGgtdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFHbEYsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUE4RHBELE1BQU07Ozs7SUFRSixZQUFtQixJQUF1QjtRQUF2QixTQUFJLEdBQUosSUFBSSxDQUFtQjtzQkFGdkIsSUFBSSxZQUFZLEVBQVc7S0FFQTs7Ozs7SUFFOUMsUUFBUSxDQUFDLEdBQWlCO1FBQ3hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUI7S0FDRjs7O1lBekVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMkJBQTJCO2dCQUNyQyxJQUFJLEVBQUUsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFDO2dCQUN0QixNQUFNLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQ1IsQ0FBQztnQkFDRixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCVDthQUNGOzs7O1lBN0RPLGlCQUFpQjs7OzBCQStEdEIsS0FBSztvQkFDTCxLQUFLOzJCQUNMLEtBQUs7OEJBQ0wsS0FBSztxQkFFTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBUZW1wbGF0ZVJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge01vbnRoVmlld01vZGVsLCBEYXlWaWV3TW9kZWx9IGZyb20gJy4vZGF0ZXBpY2tlci12aWV3LW1vZGVsJztcclxuaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcclxuaW1wb3J0IHtOZ2JEYXRlcGlja2VySTE4bn0gZnJvbSAnLi9kYXRlcGlja2VyLWkxOG4nO1xyXG5pbXBvcnQge0RheVRlbXBsYXRlQ29udGV4dH0gZnJvbSAnLi9kYXRlcGlja2VyLWRheS10ZW1wbGF0ZS1jb250ZXh0JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmdiLWRhdGVwaWNrZXItbW9udGgtdmlldycsXHJcbiAgaG9zdDogeydyb2xlJzogJ2dyaWQnfSxcclxuICBzdHlsZXM6IFtgXHJcbiAgICA6aG9zdCB7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgfVxyXG4gICAgLm5nYi1kcC13ZWVrZGF5LCAubmdiLWRwLXdlZWstbnVtYmVyIHtcclxuICAgICAgbGluZS1oZWlnaHQ6IDJyZW07XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xyXG4gICAgfVxyXG4gICAgLm5nYi1kcC13ZWVrZGF5IHtcclxuICAgICAgY29sb3I6ICM1YmMwZGU7XHJcbiAgICAgIGNvbG9yOiB2YXIoLS1pbmZvKTtcclxuICAgIH1cclxuICAgIC5uZ2ItZHAtd2VlayB7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDAuMjVyZW07XHJcbiAgICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgfVxyXG4gICAgLm5nYi1kcC13ZWVrZGF5cyB7XHJcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMTI1KTtcclxuICAgICAgYm9yZGVyLXJhZGl1czogMDtcclxuICAgIH1cclxuICAgIC5uZ2ItZHAtZGF5LCAubmdiLWRwLXdlZWtkYXksIC5uZ2ItZHAtd2Vlay1udW1iZXIge1xyXG4gICAgICB3aWR0aDogMnJlbTtcclxuICAgICAgaGVpZ2h0OiAycmVtO1xyXG4gICAgfVxyXG4gICAgLm5nYi1kcC1kYXkge1xyXG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICB9XHJcbiAgICAubmdiLWRwLWRheS5kaXNhYmxlZCwgLm5nYi1kcC1kYXkuaGlkZGVuIHtcclxuICAgICAgY3Vyc29yOiBkZWZhdWx0O1xyXG4gICAgfVxyXG4gIGBdLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2ICpuZ0lmPVwic2hvd1dlZWtkYXlzXCIgY2xhc3M9XCJuZ2ItZHAtd2VlayBuZ2ItZHAtd2Vla2RheXMgYmctbGlnaHRcIj5cclxuICAgICAgPGRpdiAqbmdJZj1cInNob3dXZWVrTnVtYmVyc1wiIGNsYXNzPVwibmdiLWRwLXdlZWtkYXkgbmdiLWRwLXNob3d3ZWVrXCI+PC9kaXY+XHJcbiAgICAgIDxkaXYgKm5nRm9yPVwibGV0IHcgb2YgbW9udGgud2Vla2RheXNcIiBjbGFzcz1cIm5nYi1kcC13ZWVrZGF5IHNtYWxsXCI+XHJcbiAgICAgICAge3sgaTE4bi5nZXRXZWVrZGF5U2hvcnROYW1lKHcpIH19XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LXdlZWsgW25nRm9yT2ZdPVwibW9udGgud2Vla3NcIj5cclxuICAgICAgPGRpdiAqbmdJZj1cIiF3ZWVrLmNvbGxhcHNlZFwiIGNsYXNzPVwibmdiLWRwLXdlZWtcIiByb2xlPVwicm93XCI+XHJcbiAgICAgICAgPGRpdiAqbmdJZj1cInNob3dXZWVrTnVtYmVyc1wiIGNsYXNzPVwibmdiLWRwLXdlZWstbnVtYmVyIHNtYWxsIHRleHQtbXV0ZWRcIj57eyBpMThuLmdldFdlZWtOdW1lcmFscyh3ZWVrLm51bWJlcikgfX08L2Rpdj5cclxuICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBkYXkgb2Ygd2Vlay5kYXlzXCIgKGNsaWNrKT1cImRvU2VsZWN0KGRheSlcIiBjbGFzcz1cIm5nYi1kcC1kYXlcIiByb2xlPVwiZ3JpZGNlbGxcIlxyXG4gICAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImRheS5jb250ZXh0LmRpc2FibGVkXCJcclxuICAgICAgICAgIFt0YWJpbmRleF09XCJkYXkudGFiaW5kZXhcIlxyXG4gICAgICAgICAgW2NsYXNzLmhpZGRlbl09XCJkYXkuaGlkZGVuXCJcclxuICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiZGF5LmFyaWFMYWJlbFwiPlxyXG4gICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIiFkYXkuaGlkZGVuXCI+XHJcbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJkYXlUZW1wbGF0ZVwiIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJkYXkuY29udGV4dFwiPjwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlck1vbnRoVmlldyB7XHJcbiAgQElucHV0KCkgZGF5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPERheVRlbXBsYXRlQ29udGV4dD47XHJcbiAgQElucHV0KCkgbW9udGg6IE1vbnRoVmlld01vZGVsO1xyXG4gIEBJbnB1dCgpIHNob3dXZWVrZGF5cztcclxuICBASW5wdXQoKSBzaG93V2Vla051bWJlcnM7XHJcblxyXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYkRhdGU+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpMThuOiBOZ2JEYXRlcGlja2VySTE4bikge31cclxuXHJcbiAgZG9TZWxlY3QoZGF5OiBEYXlWaWV3TW9kZWwpIHtcclxuICAgIGlmICghZGF5LmNvbnRleHQuZGlzYWJsZWQgJiYgIWRheS5oaWRkZW4pIHtcclxuICAgICAgdGhpcy5zZWxlY3QuZW1pdChkYXkuZGF0ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==