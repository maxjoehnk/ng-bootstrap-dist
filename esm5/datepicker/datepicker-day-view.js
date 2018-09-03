/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgbDate } from './ngb-date';
import { NgbDatepickerI18n } from './datepicker-i18n';
var NgbDatepickerDayView = /** @class */ (function () {
    function NgbDatepickerDayView(i18n) {
        this.i18n = i18n;
    }
    /**
     * @return {?}
     */
    NgbDatepickerDayView.prototype.isMuted = /**
     * @return {?}
     */
    function () { return !this.selected && (this.date.month !== this.currentMonth || this.disabled); };
    NgbDatepickerDayView.decorators = [
        { type: Component, args: [{
                    selector: '[ngbDatepickerDayView]',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["\n    :host {\n      text-align: center;\n      width: 2rem;\n      height: 2rem;\n      line-height: 2rem;\n      border-radius: 0.25rem;\n      background: transparent;\n    }\n    :host.outside {\n      opacity: 0.5;\n    }\n  "],
                    host: {
                        'class': 'btn-light',
                        '[class.bg-primary]': 'selected',
                        '[class.text-white]': 'selected',
                        '[class.text-muted]': 'isMuted()',
                        '[class.outside]': 'isMuted()',
                        '[class.active]': 'focused'
                    },
                    template: "{{ i18n.getDayNumerals(date) }}"
                },] },
    ];
    /** @nocollapse */
    NgbDatepickerDayView.ctorParameters = function () { return [
        { type: NgbDatepickerI18n }
    ]; };
    NgbDatepickerDayView.propDecorators = {
        currentMonth: [{ type: Input }],
        date: [{ type: Input }],
        disabled: [{ type: Input }],
        focused: [{ type: Input }],
        selected: [{ type: Input }]
    };
    return NgbDatepickerDayView;
}());
export { NgbDatepickerDayView };
if (false) {
    /** @type {?} */
    NgbDatepickerDayView.prototype.currentMonth;
    /** @type {?} */
    NgbDatepickerDayView.prototype.date;
    /** @type {?} */
    NgbDatepickerDayView.prototype.disabled;
    /** @type {?} */
    NgbDatepickerDayView.prototype.focused;
    /** @type {?} */
    NgbDatepickerDayView.prototype.selected;
    /** @type {?} */
    NgbDatepickerDayView.prototype.i18n;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1kYXktdmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9kYXRlcGlja2VyLWRheS12aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ25DLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDOztJQW1DbEQsOEJBQW1CLElBQXVCO1FBQXZCLFNBQUksR0FBSixJQUFJLENBQW1CO0tBQUk7Ozs7SUFFOUMsc0NBQU87OztJQUFQLGNBQVksTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUU7O2dCQW5DakcsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx3QkFBd0I7b0JBQ2xDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxNQUFNLEVBQUUsQ0FBQyx3T0FZUixDQUFDO29CQUNGLElBQUksRUFBRTt3QkFDSixPQUFPLEVBQUUsV0FBVzt3QkFDcEIsb0JBQW9CLEVBQUUsVUFBVTt3QkFDaEMsb0JBQW9CLEVBQUUsVUFBVTt3QkFDaEMsb0JBQW9CLEVBQUUsV0FBVzt3QkFDakMsaUJBQWlCLEVBQUUsV0FBVzt3QkFDOUIsZ0JBQWdCLEVBQUUsU0FBUztxQkFDNUI7b0JBQ0QsUUFBUSxFQUFFLGlDQUFpQztpQkFDNUM7Ozs7Z0JBM0JPLGlCQUFpQjs7OytCQTZCdEIsS0FBSzt1QkFDTCxLQUFLOzJCQUNMLEtBQUs7MEJBQ0wsS0FBSzsyQkFDTCxLQUFLOzsrQkFuQ1I7O1NBOEJhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge05nYkRhdGV9IGZyb20gJy4vbmdiLWRhdGUnO1xyXG5pbXBvcnQge05nYkRhdGVwaWNrZXJJMThufSBmcm9tICcuL2RhdGVwaWNrZXItaTE4bic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ1tuZ2JEYXRlcGlja2VyRGF5Vmlld10nLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIHN0eWxlczogW2BcclxuICAgIDpob3N0IHtcclxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICB3aWR0aDogMnJlbTtcclxuICAgICAgaGVpZ2h0OiAycmVtO1xyXG4gICAgICBsaW5lLWhlaWdodDogMnJlbTtcclxuICAgICAgYm9yZGVyLXJhZGl1czogMC4yNXJlbTtcclxuICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XHJcbiAgICB9XHJcbiAgICA6aG9zdC5vdXRzaWRlIHtcclxuICAgICAgb3BhY2l0eTogMC41O1xyXG4gICAgfVxyXG4gIGBdLFxyXG4gIGhvc3Q6IHtcclxuICAgICdjbGFzcyc6ICdidG4tbGlnaHQnLFxyXG4gICAgJ1tjbGFzcy5iZy1wcmltYXJ5XSc6ICdzZWxlY3RlZCcsXHJcbiAgICAnW2NsYXNzLnRleHQtd2hpdGVdJzogJ3NlbGVjdGVkJyxcclxuICAgICdbY2xhc3MudGV4dC1tdXRlZF0nOiAnaXNNdXRlZCgpJyxcclxuICAgICdbY2xhc3Mub3V0c2lkZV0nOiAnaXNNdXRlZCgpJyxcclxuICAgICdbY2xhc3MuYWN0aXZlXSc6ICdmb2N1c2VkJ1xyXG4gIH0sXHJcbiAgdGVtcGxhdGU6IGB7eyBpMThuLmdldERheU51bWVyYWxzKGRhdGUpIH19YFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlckRheVZpZXcge1xyXG4gIEBJbnB1dCgpIGN1cnJlbnRNb250aDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIGRhdGU6IE5nYkRhdGU7XHJcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgZm9jdXNlZDogYm9vbGVhbjtcclxuICBASW5wdXQoKSBzZWxlY3RlZDogYm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGkxOG46IE5nYkRhdGVwaWNrZXJJMThuKSB7fVxyXG5cclxuICBpc011dGVkKCkgeyByZXR1cm4gIXRoaXMuc2VsZWN0ZWQgJiYgKHRoaXMuZGF0ZS5tb250aCAhPT0gdGhpcy5jdXJyZW50TW9udGggfHwgdGhpcy5kaXNhYmxlZCk7IH1cclxufVxyXG4iXX0=