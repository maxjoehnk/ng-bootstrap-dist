/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgbCalendar } from './ngb-calendar';
import { NgbDate } from './ngb-date';
import { Injectable } from '@angular/core';
import { isInteger, toInteger } from '../util/util';
import { Subject } from 'rxjs';
import { buildMonths, checkDateInRange, checkMinBeforeMax, isChangedDate, isDateSelectable, generateSelectBoxYears, generateSelectBoxMonths, prevMonthDisabled, nextMonthDisabled } from './datepicker-tools';
import { filter } from 'rxjs/operators';
import { NgbDatepickerI18n } from './datepicker-i18n';
export class NgbDatepickerService {
    /**
     * @param {?} _calendar
     * @param {?} _i18n
     */
    constructor(_calendar, _i18n) {
        this._calendar = _calendar;
        this._i18n = _i18n;
        this._model$ = new Subject();
        this._select$ = new Subject();
        this._state = {
            disabled: false,
            displayMonths: 1,
            firstDayOfWeek: 1,
            focusVisible: false,
            months: [],
            navigation: 'select',
            outsideDays: 'visible',
            prevDisabled: false,
            nextDisabled: false,
            selectBoxes: { years: [], months: [] },
            selectedDate: null
        };
    }
    /**
     * @return {?}
     */
    get model$() { return this._model$.pipe(filter(model => model.months.length > 0)); }
    /**
     * @return {?}
     */
    get select$() { return this._select$.pipe(filter(date => date !== null)); }
    /**
     * @param {?} disabled
     * @return {?}
     */
    set disabled(disabled) {
        if (this._state.disabled !== disabled) {
            this._nextState({ disabled });
        }
    }
    /**
     * @param {?} displayMonths
     * @return {?}
     */
    set displayMonths(displayMonths) {
        displayMonths = toInteger(displayMonths);
        if (isInteger(displayMonths) && displayMonths > 0 && this._state.displayMonths !== displayMonths) {
            this._nextState({ displayMonths });
        }
    }
    /**
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    set firstDayOfWeek(firstDayOfWeek) {
        firstDayOfWeek = toInteger(firstDayOfWeek);
        if (isInteger(firstDayOfWeek) && firstDayOfWeek >= 0 && this._state.firstDayOfWeek !== firstDayOfWeek) {
            this._nextState({ firstDayOfWeek });
        }
    }
    /**
     * @param {?} focusVisible
     * @return {?}
     */
    set focusVisible(focusVisible) {
        if (this._state.focusVisible !== focusVisible && !this._state.disabled) {
            this._nextState({ focusVisible });
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    set maxDate(date) {
        /** @type {?} */
        const maxDate = this.toValidDate(date, null);
        if (isChangedDate(this._state.maxDate, maxDate)) {
            this._nextState({ maxDate });
        }
    }
    /**
     * @param {?} markDisabled
     * @return {?}
     */
    set markDisabled(markDisabled) {
        if (this._state.markDisabled !== markDisabled) {
            this._nextState({ markDisabled });
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    set minDate(date) {
        /** @type {?} */
        const minDate = this.toValidDate(date, null);
        if (isChangedDate(this._state.minDate, minDate)) {
            this._nextState({ minDate });
        }
    }
    /**
     * @param {?} navigation
     * @return {?}
     */
    set navigation(navigation) {
        if (this._state.navigation !== navigation) {
            this._nextState({ navigation });
        }
    }
    /**
     * @param {?} outsideDays
     * @return {?}
     */
    set outsideDays(outsideDays) {
        if (this._state.outsideDays !== outsideDays) {
            this._nextState({ outsideDays });
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    focus(date) {
        if (!this._state.disabled && this._calendar.isValid(date) && isChangedDate(this._state.focusDate, date)) {
            this._nextState({ focusDate: date });
        }
    }
    /**
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    focusMove(period, number) {
        this.focus(this._calendar.getNext(this._state.focusDate, period, number));
    }
    /**
     * @return {?}
     */
    focusSelect() {
        if (isDateSelectable(this._state.focusDate, this._state)) {
            this.select(this._state.focusDate, { emitEvent: true });
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    open(date) {
        /** @type {?} */
        const firstDate = this.toValidDate(date, this._calendar.getToday());
        if (!this._state.disabled) {
            this._nextState({ firstDate });
        }
    }
    /**
     * @param {?} date
     * @param {?=} options
     * @return {?}
     */
    select(date, options = {}) {
        /** @type {?} */
        const selectedDate = this.toValidDate(date, null);
        if (!this._state.disabled) {
            if (isChangedDate(this._state.selectedDate, selectedDate)) {
                this._nextState({ selectedDate });
            }
            if (options.emitEvent && isDateSelectable(selectedDate, this._state)) {
                this._select$.next(selectedDate);
            }
        }
    }
    /**
     * @param {?} date
     * @param {?=} defaultValue
     * @return {?}
     */
    toValidDate(date, defaultValue) {
        /** @type {?} */
        const ngbDate = NgbDate.from(date);
        if (defaultValue === undefined) {
            defaultValue = this._calendar.getToday();
        }
        return this._calendar.isValid(ngbDate) ? ngbDate : defaultValue;
    }
    /**
     * @param {?} patch
     * @return {?}
     */
    _nextState(patch) {
        /** @type {?} */
        const newState = this._updateState(patch);
        this._patchContexts(newState);
        this._state = newState;
        this._model$.next(this._state);
    }
    /**
     * @param {?} state
     * @return {?}
     */
    _patchContexts(state) {
        const { months, displayMonths, selectedDate, focusDate, focusVisible, disabled, outsideDays } = state;
        state.months.forEach(month => {
            month.weeks.forEach(week => {
                week.days.forEach(day => {
                    // patch focus flag
                    if (focusDate) {
                        day.context.focused = focusDate.equals(day.date) && focusVisible;
                    }
                    // calculating tabindex
                    day.tabindex = !disabled && day.date.equals(focusDate) && focusDate.month === month.number ? 0 : -1;
                    // override context disabled
                    if (disabled === true) {
                        day.context.disabled = true;
                    }
                    // patch selection flag
                    if (selectedDate !== undefined) {
                        day.context.selected = selectedDate !== null && selectedDate.equals(day.date);
                    }
                    // visibility
                    if (month.number !== day.date.month) {
                        day.hidden = outsideDays === 'hidden' || outsideDays === 'collapsed' ||
                            (displayMonths > 1 && day.date.after(months[0].firstDate) &&
                                day.date.before(months[displayMonths - 1].lastDate));
                    }
                });
            });
        });
    }
    /**
     * @param {?} patch
     * @return {?}
     */
    _updateState(patch) {
        /** @type {?} */
        const state = Object.assign({}, this._state, patch);
        /** @type {?} */
        let startDate = state.firstDate;
        // min/max dates changed
        if ('minDate' in patch || 'maxDate' in patch) {
            checkMinBeforeMax(state.minDate, state.maxDate);
            state.focusDate = checkDateInRange(state.focusDate, state.minDate, state.maxDate);
            state.firstDate = checkDateInRange(state.firstDate, state.minDate, state.maxDate);
            startDate = state.focusDate;
        }
        // disabled
        if ('disabled' in patch) {
            state.focusVisible = false;
        }
        // initial rebuild via 'select()'
        if ('selectedDate' in patch && this._state.months.length === 0) {
            startDate = state.selectedDate;
        }
        // focus date changed
        if ('focusDate' in patch) {
            state.focusDate = checkDateInRange(state.focusDate, state.minDate, state.maxDate);
            startDate = state.focusDate;
            // nothing to rebuild if only focus changed and it is still visible
            if (state.months.length !== 0 && !state.focusDate.before(state.firstDate) &&
                !state.focusDate.after(state.lastDate)) {
                return state;
            }
        }
        // first date changed
        if ('firstDate' in patch) {
            state.firstDate = checkDateInRange(state.firstDate, state.minDate, state.maxDate);
            startDate = state.firstDate;
        }
        // rebuilding months
        if (startDate) {
            /** @type {?} */
            const forceRebuild = 'firstDayOfWeek' in patch || 'markDisabled' in patch || 'minDate' in patch ||
                'maxDate' in patch || 'disabled' in patch || 'outsideDays' in patch;
            /** @type {?} */
            const months = buildMonths(this._calendar, startDate, state, this._i18n, forceRebuild);
            // updating months and boundary dates
            state.months = months;
            state.firstDate = months.length > 0 ? months[0].firstDate : undefined;
            state.lastDate = months.length > 0 ? months[months.length - 1].lastDate : undefined;
            // reset selected date if 'markDisabled' returns true
            if ('selectedDate' in patch && !isDateSelectable(state.selectedDate, state)) {
                state.selectedDate = null;
            }
            // adjusting focus after months were built
            if ('firstDate' in patch) {
                if (state.focusDate === undefined || state.focusDate.before(state.firstDate) ||
                    state.focusDate.after(state.lastDate)) {
                    state.focusDate = startDate;
                }
            }
            /** @type {?} */
            const yearChanged = !this._state.firstDate || this._state.firstDate.year !== state.firstDate.year;
            /** @type {?} */
            const monthChanged = !this._state.firstDate || this._state.firstDate.month !== state.firstDate.month;
            if (state.navigation === 'select') {
                // years ->  boundaries (min/max were changed)
                if ('minDate' in patch || 'maxDate' in patch || state.selectBoxes.years.length === 0 || yearChanged) {
                    state.selectBoxes.years = generateSelectBoxYears(state.firstDate, state.minDate, state.maxDate);
                }
                // months -> when current year or boundaries change
                if ('minDate' in patch || 'maxDate' in patch || state.selectBoxes.months.length === 0 || yearChanged) {
                    state.selectBoxes.months =
                        generateSelectBoxMonths(this._calendar, state.firstDate, state.minDate, state.maxDate);
                }
            }
            else {
                state.selectBoxes = { years: [], months: [] };
            }
            // updating navigation arrows -> boundaries change (min/max) or month/year changes
            if ((state.navigation === 'arrows' || state.navigation === 'select') &&
                (monthChanged || yearChanged || 'minDate' in patch || 'maxDate' in patch || 'disabled' in patch)) {
                state.prevDisabled = state.disabled || prevMonthDisabled(this._calendar, state.firstDate, state.minDate);
                state.nextDisabled = state.disabled || nextMonthDisabled(this._calendar, state.lastDate, state.maxDate);
            }
        }
        return state;
    }
}
NgbDatepickerService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NgbDatepickerService.ctorParameters = () => [
    { type: NgbCalendar },
    { type: NgbDatepickerI18n }
];
if (false) {
    /** @type {?} */
    NgbDatepickerService.prototype._model$;
    /** @type {?} */
    NgbDatepickerService.prototype._select$;
    /** @type {?} */
    NgbDatepickerService.prototype._state;
    /** @type {?} */
    NgbDatepickerService.prototype._calendar;
    /** @type {?} */
    NgbDatepickerService.prototype._i18n;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJkYXRlcGlja2VyL2RhdGVwaWNrZXItc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFdBQVcsRUFBWSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFHbkMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsU0FBUyxFQUFFLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUNsRCxPQUFPLEVBQWEsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFDTCxXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNqQixhQUFhLEVBQ2IsZ0JBQWdCLEVBQ2hCLHNCQUFzQixFQUN0Qix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLGlCQUFpQixFQUNsQixNQUFNLG9CQUFvQixDQUFDO0FBRTVCLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUdwRCxNQUFNOzs7OztJQWlGSixZQUFvQixTQUFzQixFQUFVLEtBQXdCO1FBQXhELGNBQVMsR0FBVCxTQUFTLENBQWE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFtQjt1QkFoRjFELElBQUksT0FBTyxFQUF1Qjt3QkFFakMsSUFBSSxPQUFPLEVBQVc7c0JBRUg7WUFDcEMsUUFBUSxFQUFFLEtBQUs7WUFDZixhQUFhLEVBQUUsQ0FBQztZQUNoQixjQUFjLEVBQUUsQ0FBQztZQUNqQixZQUFZLEVBQUUsS0FBSztZQUNuQixNQUFNLEVBQUUsRUFBRTtZQUNWLFVBQVUsRUFBRSxRQUFRO1lBQ3BCLFdBQVcsRUFB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QUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3pHLEtBQUssQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLFFBQVEsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3pHO1NBQ0Y7UUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDOzs7O1lBdlFoQixVQUFVOzs7O1lBdEJILFdBQVc7WUFvQlgsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ2JDYWxlbmRhciwgTmdiUGVyaW9kfSBmcm9tICcuL25nYi1jYWxlbmRhcic7XHJcbmltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi9uZ2ItZGF0ZSc7XHJcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xyXG5pbXBvcnQge0RhdGVwaWNrZXJWaWV3TW9kZWwsIE5nYk1hcmtEaXNhYmxlZH0gZnJvbSAnLi9kYXRlcGlja2VyLXZpZXctbW9kZWwnO1xyXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge2lzSW50ZWdlciwgdG9JbnRlZ2VyfSBmcm9tICcuLi91dGlsL3V0aWwnO1xyXG5pbXBvcnQge09ic2VydmFibGUsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge1xyXG4gIGJ1aWxkTW9udGhzLFxyXG4gIGNoZWNrRGF0ZUluUmFuZ2UsXHJcbiAgY2hlY2tNaW5CZWZvcmVNYXgsXHJcbiAgaXNDaGFuZ2VkRGF0ZSxcclxuICBpc0RhdGVTZWxlY3RhYmxlLFxyXG4gIGdlbmVyYXRlU2VsZWN0Qm94WWVhcnMsXHJcbiAgZ2VuZXJhdGVTZWxlY3RCb3hNb250aHMsXHJcbiAgcHJldk1vbnRoRGlzYWJsZWQsXHJcbiAgbmV4dE1vbnRoRGlzYWJsZWRcclxufSBmcm9tICcuL2RhdGVwaWNrZXItdG9vbHMnO1xyXG5cclxuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHtOZ2JEYXRlcGlja2VySTE4bn0gZnJvbSAnLi9kYXRlcGlja2VyLWkxOG4nO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlclNlcnZpY2Uge1xyXG4gIHByaXZhdGUgX21vZGVsJCA9IG5ldyBTdWJqZWN0PERhdGVwaWNrZXJWaWV3TW9kZWw+KCk7XHJcblxyXG4gIHByaXZhdGUgX3NlbGVjdCQgPSBuZXcgU3ViamVjdDxOZ2JEYXRlPigpO1xyXG5cclxuICBwcml2YXRlIF9zdGF0ZTogRGF0ZXBpY2tlclZpZXdNb2RlbCA9IHtcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIGRpc3BsYXlNb250aHM6IDEsXHJcbiAgICBmaXJzdERheU9mV2VlazogMSxcclxuICAgIGZvY3VzVmlzaWJsZTogZmFsc2UsXHJcbiAgICBtb250aHM6IFtdLFxyXG4gICAgbmF2aWdhdGlvbjogJ3NlbGVjdCcsXHJcbiAgICBvdXRzaWRlRGF5czogJ3Zpc2libGUnLFxyXG4gICAgcHJldkRpc2FibGVkOiBmYWxzZSxcclxuICAgIG5leHREaXNhYmxlZDogZmFsc2UsXHJcbiAgICBzZWxlY3RCb3hlczoge3llYXJzOiBbXSwgbW9udGhzOiBbXX0sXHJcbiAgICBzZWxlY3RlZERhdGU6IG51bGxcclxuICB9O1xyXG5cclxuICBnZXQgbW9kZWwkKCk6IE9ic2VydmFibGU8RGF0ZXBpY2tlclZpZXdNb2RlbD4geyByZXR1cm4gdGhpcy5fbW9kZWwkLnBpcGUoZmlsdGVyKG1vZGVsID0+IG1vZGVsLm1vbnRocy5sZW5ndGggPiAwKSk7IH1cclxuXHJcbiAgZ2V0IHNlbGVjdCQoKTogT2JzZXJ2YWJsZTxOZ2JEYXRlPiB7IHJldHVybiB0aGlzLl9zZWxlY3QkLnBpcGUoZmlsdGVyKGRhdGUgPT4gZGF0ZSAhPT0gbnVsbCkpOyB9XHJcblxyXG4gIHNldCBkaXNhYmxlZChkaXNhYmxlZDogYm9vbGVhbikge1xyXG4gICAgaWYgKHRoaXMuX3N0YXRlLmRpc2FibGVkICE9PSBkaXNhYmxlZCkge1xyXG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe2Rpc2FibGVkfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXQgZGlzcGxheU1vbnRocyhkaXNwbGF5TW9udGhzOiBudW1iZXIpIHtcclxuICAgIGRpc3BsYXlNb250aHMgPSB0b0ludGVnZXIoZGlzcGxheU1vbnRocyk7XHJcbiAgICBpZiAoaXNJbnRlZ2VyKGRpc3BsYXlNb250aHMpICYmIGRpc3BsYXlNb250aHMgPiAwICYmIHRoaXMuX3N0YXRlLmRpc3BsYXlNb250aHMgIT09IGRpc3BsYXlNb250aHMpIHtcclxuICAgICAgdGhpcy5fbmV4dFN0YXRlKHtkaXNwbGF5TW9udGhzfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXQgZmlyc3REYXlPZldlZWsoZmlyc3REYXlPZldlZWs6IG51bWJlcikge1xyXG4gICAgZmlyc3REYXlPZldlZWsgPSB0b0ludGVnZXIoZmlyc3REYXlPZldlZWspO1xyXG4gICAgaWYgKGlzSW50ZWdlcihmaXJzdERheU9mV2VlaykgJiYgZmlyc3REYXlPZldlZWsgPj0gMCAmJiB0aGlzLl9zdGF0ZS5maXJzdERheU9mV2VlayAhPT0gZmlyc3REYXlPZldlZWspIHtcclxuICAgICAgdGhpcy5fbmV4dFN0YXRlKHtmaXJzdERheU9mV2Vla30pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0IGZvY3VzVmlzaWJsZShmb2N1c1Zpc2libGU6IGJvb2xlYW4pIHtcclxuICAgIGlmICh0aGlzLl9zdGF0ZS5mb2N1c1Zpc2libGUgIT09IGZvY3VzVmlzaWJsZSAmJiAhdGhpcy5fc3RhdGUuZGlzYWJsZWQpIHtcclxuICAgICAgdGhpcy5fbmV4dFN0YXRlKHtmb2N1c1Zpc2libGV9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldCBtYXhEYXRlKGRhdGU6IE5nYkRhdGUpIHtcclxuICAgIGNvbnN0IG1heERhdGUgPSB0aGlzLnRvVmFsaWREYXRlKGRhdGUsIG51bGwpO1xyXG4gICAgaWYgKGlzQ2hhbmdlZERhdGUodGhpcy5fc3RhdGUubWF4RGF0ZSwgbWF4RGF0ZSkpIHtcclxuICAgICAgdGhpcy5fbmV4dFN0YXRlKHttYXhEYXRlfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXQgbWFya0Rpc2FibGVkKG1hcmtEaXNhYmxlZDogTmdiTWFya0Rpc2FibGVkKSB7XHJcbiAgICBpZiAodGhpcy5fc3RhdGUubWFya0Rpc2FibGVkICE9PSBtYXJrRGlzYWJsZWQpIHtcclxuICAgICAgdGhpcy5fbmV4dFN0YXRlKHttYXJrRGlzYWJsZWR9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldCBtaW5EYXRlKGRhdGU6IE5nYkRhdGUpIHtcclxuICAgIGNvbnN0IG1pbkRhdGUgPSB0aGlzLnRvVmFsaWREYXRlKGRhdGUsIG51bGwpO1xyXG4gICAgaWYgKGlzQ2hhbmdlZERhdGUodGhpcy5fc3RhdGUubWluRGF0ZSwgbWluRGF0ZSkpIHtcclxuICAgICAgdGhpcy5fbmV4dFN0YXRlKHttaW5EYXRlfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXQgbmF2aWdhdGlvbihuYXZpZ2F0aW9uOiAnc2VsZWN0JyB8ICdhcnJvd3MnIHwgJ25vbmUnKSB7XHJcbiAgICBpZiAodGhpcy5fc3RhdGUubmF2aWdhdGlvbiAhPT0gbmF2aWdhdGlvbikge1xyXG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe25hdmlnYXRpb259KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldCBvdXRzaWRlRGF5cyhvdXRzaWRlRGF5czogJ3Zpc2libGUnIHwgJ2NvbGxhcHNlZCcgfCAnaGlkZGVuJykge1xyXG4gICAgaWYgKHRoaXMuX3N0YXRlLm91dHNpZGVEYXlzICE9PSBvdXRzaWRlRGF5cykge1xyXG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe291dHNpZGVEYXlzfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jYWxlbmRhcjogTmdiQ2FsZW5kYXIsIHByaXZhdGUgX2kxOG46IE5nYkRhdGVwaWNrZXJJMThuKSB7fVxyXG5cclxuICBmb2N1cyhkYXRlOiBOZ2JEYXRlKSB7XHJcbiAgICBpZiAoIXRoaXMuX3N0YXRlLmRpc2FibGVkICYmIHRoaXMuX2NhbGVuZGFyLmlzVmFsaWQoZGF0ZSkgJiYgaXNDaGFuZ2VkRGF0ZSh0aGlzLl9zdGF0ZS5mb2N1c0RhdGUsIGRhdGUpKSB7XHJcbiAgICAgIHRoaXMuX25leHRTdGF0ZSh7Zm9jdXNEYXRlOiBkYXRlfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb2N1c01vdmUocGVyaW9kPzogTmdiUGVyaW9kLCBudW1iZXI/OiBudW1iZXIpIHtcclxuICAgIHRoaXMuZm9jdXModGhpcy5fY2FsZW5kYXIuZ2V0TmV4dCh0aGlzLl9zdGF0ZS5mb2N1c0RhdGUsIHBlcmlvZCwgbnVtYmVyKSk7XHJcbiAgfVxyXG5cclxuICBmb2N1c1NlbGVjdCgpIHtcclxuICAgIGlmIChpc0RhdGVTZWxlY3RhYmxlKHRoaXMuX3N0YXRlLmZvY3VzRGF0ZSwgdGhpcy5fc3RhdGUpKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuX3N0YXRlLmZvY3VzRGF0ZSwge2VtaXRFdmVudDogdHJ1ZX0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb3BlbihkYXRlOiBOZ2JEYXRlKSB7XHJcbiAgICBjb25zdCBmaXJzdERhdGUgPSB0aGlzLnRvVmFsaWREYXRlKGRhdGUsIHRoaXMuX2NhbGVuZGFyLmdldFRvZGF5KCkpO1xyXG4gICAgaWYgKCF0aGlzLl9zdGF0ZS5kaXNhYmxlZCkge1xyXG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe2ZpcnN0RGF0ZX0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2VsZWN0KGRhdGU6IE5nYkRhdGUsIG9wdGlvbnM6IHtlbWl0RXZlbnQ/OiBib29sZWFufSA9IHt9KSB7XHJcbiAgICBjb25zdCBzZWxlY3RlZERhdGUgPSB0aGlzLnRvVmFsaWREYXRlKGRhdGUsIG51bGwpO1xyXG4gICAgaWYgKCF0aGlzLl9zdGF0ZS5kaXNhYmxlZCkge1xyXG4gICAgICBpZiAoaXNDaGFuZ2VkRGF0ZSh0aGlzLl9zdGF0ZS5zZWxlY3RlZERhdGUsIHNlbGVjdGVkRGF0ZSkpIHtcclxuICAgICAgICB0aGlzLl9uZXh0U3RhdGUoe3NlbGVjdGVkRGF0ZX0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAob3B0aW9ucy5lbWl0RXZlbnQgJiYgaXNEYXRlU2VsZWN0YWJsZShzZWxlY3RlZERhdGUsIHRoaXMuX3N0YXRlKSkge1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdCQubmV4dChzZWxlY3RlZERhdGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0b1ZhbGlkRGF0ZShkYXRlOiBOZ2JEYXRlU3RydWN0LCBkZWZhdWx0VmFsdWU/OiBOZ2JEYXRlKTogTmdiRGF0ZSB7XHJcbiAgICBjb25zdCBuZ2JEYXRlID0gTmdiRGF0ZS5mcm9tKGRhdGUpO1xyXG4gICAgaWYgKGRlZmF1bHRWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGRlZmF1bHRWYWx1ZSA9IHRoaXMuX2NhbGVuZGFyLmdldFRvZGF5KCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fY2FsZW5kYXIuaXNWYWxpZChuZ2JEYXRlKSA/IG5nYkRhdGUgOiBkZWZhdWx0VmFsdWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9uZXh0U3RhdGUocGF0Y2g6IFBhcnRpYWw8RGF0ZXBpY2tlclZpZXdNb2RlbD4pIHtcclxuICAgIGNvbnN0IG5ld1N0YXRlID0gdGhpcy5fdXBkYXRlU3RhdGUocGF0Y2gpO1xyXG4gICAgdGhpcy5fcGF0Y2hDb250ZXh0cyhuZXdTdGF0ZSk7XHJcbiAgICB0aGlzLl9zdGF0ZSA9IG5ld1N0YXRlO1xyXG4gICAgdGhpcy5fbW9kZWwkLm5leHQodGhpcy5fc3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfcGF0Y2hDb250ZXh0cyhzdGF0ZTogRGF0ZXBpY2tlclZpZXdNb2RlbCkge1xyXG4gICAgY29uc3Qge21vbnRocywgZGlzcGxheU1vbnRocywgc2VsZWN0ZWREYXRlLCBmb2N1c0RhdGUsIGZvY3VzVmlzaWJsZSwgZGlzYWJsZWQsIG91dHNpZGVEYXlzfSA9IHN0YXRlO1xyXG4gICAgc3RhdGUubW9udGhzLmZvckVhY2gobW9udGggPT4ge1xyXG4gICAgICBtb250aC53ZWVrcy5mb3JFYWNoKHdlZWsgPT4ge1xyXG4gICAgICAgIHdlZWsuZGF5cy5mb3JFYWNoKGRheSA9PiB7XHJcblxyXG4gICAgICAgICAgLy8gcGF0Y2ggZm9jdXMgZmxhZ1xyXG4gICAgICAgICAgaWYgKGZvY3VzRGF0ZSkge1xyXG4gICAgICAgICAgICBkYXkuY29udGV4dC5mb2N1c2VkID0gZm9jdXNEYXRlLmVxdWFscyhkYXkuZGF0ZSkgJiYgZm9jdXNWaXNpYmxlO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIGNhbGN1bGF0aW5nIHRhYmluZGV4XHJcbiAgICAgICAgICBkYXkudGFiaW5kZXggPSAhZGlzYWJsZWQgJiYgZGF5LmRhdGUuZXF1YWxzKGZvY3VzRGF0ZSkgJiYgZm9jdXNEYXRlLm1vbnRoID09PSBtb250aC5udW1iZXIgPyAwIDogLTE7XHJcblxyXG4gICAgICAgICAgLy8gb3ZlcnJpZGUgY29udGV4dCBkaXNhYmxlZFxyXG4gICAgICAgICAgaWYgKGRpc2FibGVkID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGRheS5jb250ZXh0LmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBwYXRjaCBzZWxlY3Rpb24gZmxhZ1xyXG4gICAgICAgICAgaWYgKHNlbGVjdGVkRGF0ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGRheS5jb250ZXh0LnNlbGVjdGVkID0gc2VsZWN0ZWREYXRlICE9PSBudWxsICYmIHNlbGVjdGVkRGF0ZS5lcXVhbHMoZGF5LmRhdGUpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIHZpc2liaWxpdHlcclxuICAgICAgICAgIGlmIChtb250aC5udW1iZXIgIT09IGRheS5kYXRlLm1vbnRoKSB7XHJcbiAgICAgICAgICAgIGRheS5oaWRkZW4gPSBvdXRzaWRlRGF5cyA9PT0gJ2hpZGRlbicgfHwgb3V0c2lkZURheXMgPT09ICdjb2xsYXBzZWQnIHx8XHJcbiAgICAgICAgICAgICAgICAoZGlzcGxheU1vbnRocyA+IDEgJiYgZGF5LmRhdGUuYWZ0ZXIobW9udGhzWzBdLmZpcnN0RGF0ZSkgJiZcclxuICAgICAgICAgICAgICAgICBkYXkuZGF0ZS5iZWZvcmUobW9udGhzW2Rpc3BsYXlNb250aHMgLSAxXS5sYXN0RGF0ZSkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfdXBkYXRlU3RhdGUocGF0Y2g6IFBhcnRpYWw8RGF0ZXBpY2tlclZpZXdNb2RlbD4pOiBEYXRlcGlja2VyVmlld01vZGVsIHtcclxuICAgIC8vIHBhdGNoaW5nIGZpZWxkc1xyXG4gICAgY29uc3Qgc3RhdGUgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9zdGF0ZSwgcGF0Y2gpO1xyXG5cclxuICAgIGxldCBzdGFydERhdGUgPSBzdGF0ZS5maXJzdERhdGU7XHJcblxyXG4gICAgLy8gbWluL21heCBkYXRlcyBjaGFuZ2VkXHJcbiAgICBpZiAoJ21pbkRhdGUnIGluIHBhdGNoIHx8ICdtYXhEYXRlJyBpbiBwYXRjaCkge1xyXG4gICAgICBjaGVja01pbkJlZm9yZU1heChzdGF0ZS5taW5EYXRlLCBzdGF0ZS5tYXhEYXRlKTtcclxuICAgICAgc3RhdGUuZm9jdXNEYXRlID0gY2hlY2tEYXRlSW5SYW5nZShzdGF0ZS5mb2N1c0RhdGUsIHN0YXRlLm1pbkRhdGUsIHN0YXRlLm1heERhdGUpO1xyXG4gICAgICBzdGF0ZS5maXJzdERhdGUgPSBjaGVja0RhdGVJblJhbmdlKHN0YXRlLmZpcnN0RGF0ZSwgc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XHJcbiAgICAgIHN0YXJ0RGF0ZSA9IHN0YXRlLmZvY3VzRGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBkaXNhYmxlZFxyXG4gICAgaWYgKCdkaXNhYmxlZCcgaW4gcGF0Y2gpIHtcclxuICAgICAgc3RhdGUuZm9jdXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaW5pdGlhbCByZWJ1aWxkIHZpYSAnc2VsZWN0KCknXHJcbiAgICBpZiAoJ3NlbGVjdGVkRGF0ZScgaW4gcGF0Y2ggJiYgdGhpcy5fc3RhdGUubW9udGhzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBzdGFydERhdGUgPSBzdGF0ZS5zZWxlY3RlZERhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZm9jdXMgZGF0ZSBjaGFuZ2VkXHJcbiAgICBpZiAoJ2ZvY3VzRGF0ZScgaW4gcGF0Y2gpIHtcclxuICAgICAgc3RhdGUuZm9jdXNEYXRlID0gY2hlY2tEYXRlSW5SYW5nZShzdGF0ZS5mb2N1c0RhdGUsIHN0YXRlLm1pbkRhdGUsIHN0YXRlLm1heERhdGUpO1xyXG4gICAgICBzdGFydERhdGUgPSBzdGF0ZS5mb2N1c0RhdGU7XHJcblxyXG4gICAgICAvLyBub3RoaW5nIHRvIHJlYnVpbGQgaWYgb25seSBmb2N1cyBjaGFuZ2VkIGFuZCBpdCBpcyBzdGlsbCB2aXNpYmxlXHJcbiAgICAgIGlmIChzdGF0ZS5tb250aHMubGVuZ3RoICE9PSAwICYmICFzdGF0ZS5mb2N1c0RhdGUuYmVmb3JlKHN0YXRlLmZpcnN0RGF0ZSkgJiZcclxuICAgICAgICAgICFzdGF0ZS5mb2N1c0RhdGUuYWZ0ZXIoc3RhdGUubGFzdERhdGUpKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZmlyc3QgZGF0ZSBjaGFuZ2VkXHJcbiAgICBpZiAoJ2ZpcnN0RGF0ZScgaW4gcGF0Y2gpIHtcclxuICAgICAgc3RhdGUuZmlyc3REYXRlID0gY2hlY2tEYXRlSW5SYW5nZShzdGF0ZS5maXJzdERhdGUsIHN0YXRlLm1pbkRhdGUsIHN0YXRlLm1heERhdGUpO1xyXG4gICAgICBzdGFydERhdGUgPSBzdGF0ZS5maXJzdERhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmVidWlsZGluZyBtb250aHNcclxuICAgIGlmIChzdGFydERhdGUpIHtcclxuICAgICAgY29uc3QgZm9yY2VSZWJ1aWxkID0gJ2ZpcnN0RGF5T2ZXZWVrJyBpbiBwYXRjaCB8fCAnbWFya0Rpc2FibGVkJyBpbiBwYXRjaCB8fCAnbWluRGF0ZScgaW4gcGF0Y2ggfHxcclxuICAgICAgICAgICdtYXhEYXRlJyBpbiBwYXRjaCB8fCAnZGlzYWJsZWQnIGluIHBhdGNoIHx8ICdvdXRzaWRlRGF5cycgaW4gcGF0Y2g7XHJcblxyXG4gICAgICBjb25zdCBtb250aHMgPSBidWlsZE1vbnRocyh0aGlzLl9jYWxlbmRhciwgc3RhcnREYXRlLCBzdGF0ZSwgdGhpcy5faTE4biwgZm9yY2VSZWJ1aWxkKTtcclxuXHJcbiAgICAgIC8vIHVwZGF0aW5nIG1vbnRocyBhbmQgYm91bmRhcnkgZGF0ZXNcclxuICAgICAgc3RhdGUubW9udGhzID0gbW9udGhzO1xyXG4gICAgICBzdGF0ZS5maXJzdERhdGUgPSBtb250aHMubGVuZ3RoID4gMCA/IG1vbnRoc1swXS5maXJzdERhdGUgOiB1bmRlZmluZWQ7XHJcbiAgICAgIHN0YXRlLmxhc3REYXRlID0gbW9udGhzLmxlbmd0aCA+IDAgPyBtb250aHNbbW9udGhzLmxlbmd0aCAtIDFdLmxhc3REYXRlIDogdW5kZWZpbmVkO1xyXG5cclxuICAgICAgLy8gcmVzZXQgc2VsZWN0ZWQgZGF0ZSBpZiAnbWFya0Rpc2FibGVkJyByZXR1cm5zIHRydWVcclxuICAgICAgaWYgKCdzZWxlY3RlZERhdGUnIGluIHBhdGNoICYmICFpc0RhdGVTZWxlY3RhYmxlKHN0YXRlLnNlbGVjdGVkRGF0ZSwgc3RhdGUpKSB7XHJcbiAgICAgICAgc3RhdGUuc2VsZWN0ZWREYXRlID0gbnVsbDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gYWRqdXN0aW5nIGZvY3VzIGFmdGVyIG1vbnRocyB3ZXJlIGJ1aWx0XHJcbiAgICAgIGlmICgnZmlyc3REYXRlJyBpbiBwYXRjaCkge1xyXG4gICAgICAgIGlmIChzdGF0ZS5mb2N1c0RhdGUgPT09IHVuZGVmaW5lZCB8fCBzdGF0ZS5mb2N1c0RhdGUuYmVmb3JlKHN0YXRlLmZpcnN0RGF0ZSkgfHxcclxuICAgICAgICAgICAgc3RhdGUuZm9jdXNEYXRlLmFmdGVyKHN0YXRlLmxhc3REYXRlKSkge1xyXG4gICAgICAgICAgc3RhdGUuZm9jdXNEYXRlID0gc3RhcnREYXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gYWRqdXN0aW5nIG1vbnRocy95ZWFycyBmb3IgdGhlIHNlbGVjdCBib3ggbmF2aWdhdGlvblxyXG4gICAgICBjb25zdCB5ZWFyQ2hhbmdlZCA9ICF0aGlzLl9zdGF0ZS5maXJzdERhdGUgfHwgdGhpcy5fc3RhdGUuZmlyc3REYXRlLnllYXIgIT09IHN0YXRlLmZpcnN0RGF0ZS55ZWFyO1xyXG4gICAgICBjb25zdCBtb250aENoYW5nZWQgPSAhdGhpcy5fc3RhdGUuZmlyc3REYXRlIHx8IHRoaXMuX3N0YXRlLmZpcnN0RGF0ZS5tb250aCAhPT0gc3RhdGUuZmlyc3REYXRlLm1vbnRoO1xyXG4gICAgICBpZiAoc3RhdGUubmF2aWdhdGlvbiA9PT0gJ3NlbGVjdCcpIHtcclxuICAgICAgICAvLyB5ZWFycyAtPiAgYm91bmRhcmllcyAobWluL21heCB3ZXJlIGNoYW5nZWQpXHJcbiAgICAgICAgaWYgKCdtaW5EYXRlJyBpbiBwYXRjaCB8fCAnbWF4RGF0ZScgaW4gcGF0Y2ggfHwgc3RhdGUuc2VsZWN0Qm94ZXMueWVhcnMubGVuZ3RoID09PSAwIHx8IHllYXJDaGFuZ2VkKSB7XHJcbiAgICAgICAgICBzdGF0ZS5zZWxlY3RCb3hlcy55ZWFycyA9IGdlbmVyYXRlU2VsZWN0Qm94WWVhcnMoc3RhdGUuZmlyc3REYXRlLCBzdGF0ZS5taW5EYXRlLCBzdGF0ZS5tYXhEYXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG1vbnRocyAtPiB3aGVuIGN1cnJlbnQgeWVhciBvciBib3VuZGFyaWVzIGNoYW5nZVxyXG4gICAgICAgIGlmICgnbWluRGF0ZScgaW4gcGF0Y2ggfHwgJ21heERhdGUnIGluIHBhdGNoIHx8IHN0YXRlLnNlbGVjdEJveGVzLm1vbnRocy5sZW5ndGggPT09IDAgfHwgeWVhckNoYW5nZWQpIHtcclxuICAgICAgICAgIHN0YXRlLnNlbGVjdEJveGVzLm1vbnRocyA9XHJcbiAgICAgICAgICAgICAgZ2VuZXJhdGVTZWxlY3RCb3hNb250aHModGhpcy5fY2FsZW5kYXIsIHN0YXRlLmZpcnN0RGF0ZSwgc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN0YXRlLnNlbGVjdEJveGVzID0ge3llYXJzOiBbXSwgbW9udGhzOiBbXX07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHVwZGF0aW5nIG5hdmlnYXRpb24gYXJyb3dzIC0+IGJvdW5kYXJpZXMgY2hhbmdlIChtaW4vbWF4KSBvciBtb250aC95ZWFyIGNoYW5nZXNcclxuICAgICAgaWYgKChzdGF0ZS5uYXZpZ2F0aW9uID09PSAnYXJyb3dzJyB8fCBzdGF0ZS5uYXZpZ2F0aW9uID09PSAnc2VsZWN0JykgJiZcclxuICAgICAgICAgIChtb250aENoYW5nZWQgfHwgeWVhckNoYW5nZWQgfHwgJ21pbkRhdGUnIGluIHBhdGNoIHx8ICdtYXhEYXRlJyBpbiBwYXRjaCB8fCAnZGlzYWJsZWQnIGluIHBhdGNoKSkge1xyXG4gICAgICAgIHN0YXRlLnByZXZEaXNhYmxlZCA9IHN0YXRlLmRpc2FibGVkIHx8IHByZXZNb250aERpc2FibGVkKHRoaXMuX2NhbGVuZGFyLCBzdGF0ZS5maXJzdERhdGUsIHN0YXRlLm1pbkRhdGUpO1xyXG4gICAgICAgIHN0YXRlLm5leHREaXNhYmxlZCA9IHN0YXRlLmRpc2FibGVkIHx8IG5leHRNb250aERpc2FibGVkKHRoaXMuX2NhbGVuZGFyLCBzdGF0ZS5sYXN0RGF0ZSwgc3RhdGUubWF4RGF0ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3RhdGU7XHJcbiAgfVxyXG59XHJcbiJdfQ==