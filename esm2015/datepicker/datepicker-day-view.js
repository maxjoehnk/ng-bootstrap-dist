/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgbDate } from './ngb-date';
import { NgbDatepickerI18n } from './datepicker-i18n';
export class NgbDatepickerDayView {
    /**
     * @param {?} i18n
     */
    constructor(i18n) {
        this.i18n = i18n;
    }
    /**
     * @return {?}
     */
    isMuted() { return !this.selected && (this.date.month !== this.currentMonth || this.disabled); }
}
NgbDatepickerDayView.decorators = [
    { type: Component, args: [{
                selector: '[ngbDatepickerDayView]',
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
    :host {
      text-align: center;
      width: 2rem;
      height: 2rem;
      line-height: 2rem;
      border-radius: 0.25rem;
      background: transparent;
    }
    :host.outside {
      opacity: 0.5;
    }
  `],
                host: {
                    'class': 'btn-light',
                    '[class.bg-primary]': 'selected',
                    '[class.text-white]': 'selected',
                    '[class.text-muted]': 'isMuted()',
                    '[class.outside]': 'isMuted()',
                    '[class.active]': 'focused'
                },
                template: `{{ i18n.getDayNumerals(date) }}`
            },] },
];
/** @nocollapse */
NgbDatepickerDayView.ctorParameters = () => [
    { type: NgbDatepickerI18n }
];
NgbDatepickerDayView.propDecorators = {
    currentMonth: [{ type: Input }],
    date: [{ type: Input }],
    disabled: [{ type: Input }],
    focused: [{ type: Input }],
    selected: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1kYXktdmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9kYXRlcGlja2VyLWRheS12aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ25DLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBNEJwRCxNQUFNOzs7O0lBT0osWUFBbUIsSUFBdUI7UUFBdkIsU0FBSSxHQUFKLElBQUksQ0FBbUI7S0FBSTs7OztJQUU5QyxPQUFPLEtBQUssTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUU7OztZQW5DakcsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7O0dBWVIsQ0FBQztnQkFDRixJQUFJLEVBQUU7b0JBQ0osT0FBTyxFQUFFLFdBQVc7b0JBQ3BCLG9CQUFvQixFQUFFLFVBQVU7b0JBQ2hDLG9CQUFvQixFQUFFLFVBQVU7b0JBQ2hDLG9CQUFvQixFQUFFLFdBQVc7b0JBQ2pDLGlCQUFpQixFQUFFLFdBQVc7b0JBQzlCLGdCQUFnQixFQUFFLFNBQVM7aUJBQzVCO2dCQUNELFFBQVEsRUFBRSxpQ0FBaUM7YUFDNUM7Ozs7WUEzQk8saUJBQWlCOzs7MkJBNkJ0QixLQUFLO21CQUNMLEtBQUs7dUJBQ0wsS0FBSztzQkFDTCxLQUFLO3VCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcclxuaW1wb3J0IHtOZ2JEYXRlcGlja2VySTE4bn0gZnJvbSAnLi9kYXRlcGlja2VyLWkxOG4nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdbbmdiRGF0ZXBpY2tlckRheVZpZXddJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBzdHlsZXM6IFtgXHJcbiAgICA6aG9zdCB7XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgd2lkdGg6IDJyZW07XHJcbiAgICAgIGhlaWdodDogMnJlbTtcclxuICAgICAgbGluZS1oZWlnaHQ6IDJyZW07XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDAuMjVyZW07XHJcbiAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG4gICAgfVxyXG4gICAgOmhvc3Qub3V0c2lkZSB7XHJcbiAgICAgIG9wYWNpdHk6IDAuNTtcclxuICAgIH1cclxuICBgXSxcclxuICBob3N0OiB7XHJcbiAgICAnY2xhc3MnOiAnYnRuLWxpZ2h0JyxcclxuICAgICdbY2xhc3MuYmctcHJpbWFyeV0nOiAnc2VsZWN0ZWQnLFxyXG4gICAgJ1tjbGFzcy50ZXh0LXdoaXRlXSc6ICdzZWxlY3RlZCcsXHJcbiAgICAnW2NsYXNzLnRleHQtbXV0ZWRdJzogJ2lzTXV0ZWQoKScsXHJcbiAgICAnW2NsYXNzLm91dHNpZGVdJzogJ2lzTXV0ZWQoKScsXHJcbiAgICAnW2NsYXNzLmFjdGl2ZV0nOiAnZm9jdXNlZCdcclxuICB9LFxyXG4gIHRlbXBsYXRlOiBge3sgaTE4bi5nZXREYXlOdW1lcmFscyhkYXRlKSB9fWBcclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXJEYXlWaWV3IHtcclxuICBASW5wdXQoKSBjdXJyZW50TW9udGg6IG51bWJlcjtcclxuICBASW5wdXQoKSBkYXRlOiBOZ2JEYXRlO1xyXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGZvY3VzZWQ6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgc2VsZWN0ZWQ6IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpMThuOiBOZ2JEYXRlcGlja2VySTE4bikge31cclxuXHJcbiAgaXNNdXRlZCgpIHsgcmV0dXJuICF0aGlzLnNlbGVjdGVkICYmICh0aGlzLmRhdGUubW9udGggIT09IHRoaXMuY3VycmVudE1vbnRoIHx8IHRoaXMuZGlzYWJsZWQpOyB9XHJcbn1cclxuIl19