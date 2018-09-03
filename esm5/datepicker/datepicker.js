/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { take } from 'rxjs/operators';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, TemplateRef, forwardRef, EventEmitter, Output, ElementRef, NgZone } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbCalendar } from './ngb-calendar';
import { NgbDate } from './ngb-date';
import { NgbDatepickerService } from './datepicker-service';
import { NgbDatepickerKeyMapService } from './datepicker-keymap-service';
import { NavigationEvent } from './datepicker-view-model';
import { NgbDatepickerConfig } from './datepicker-config';
import { NgbDateAdapter } from './adapters/ngb-date-adapter';
import { NgbDatepickerI18n } from './datepicker-i18n';
import { isChangedDate } from './datepicker-tools';
/** @type {?} */
var NGB_DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return NgbDatepicker; }),
    multi: true
};
/**
 * The payload of the datepicker navigation event
 * @record
 */
export function NgbDatepickerNavigateEvent() { }
/**
 * Currently displayed month
 * @type {?}
 */
NgbDatepickerNavigateEvent.prototype.current;
/**
 * Month we're navigating to
 * @type {?}
 */
NgbDatepickerNavigateEvent.prototype.next;
/**
 * A lightweight and highly configurable datepicker directive
 */
var NgbDatepicker = /** @class */ (function () {
    function NgbDatepicker(_keyMapService, _service, _calendar, i18n, config, _cd, _elementRef, _ngbDateAdapter, _ngZone) {
        var _this = this;
        this._keyMapService = _keyMapService;
        this._service = _service;
        this._calendar = _calendar;
        this.i18n = i18n;
        this._cd = _cd;
        this._elementRef = _elementRef;
        this._ngbDateAdapter = _ngbDateAdapter;
        this._ngZone = _ngZone;
        /**
         * An event fired when navigation happens and currently displayed month changes.
         * See NgbDatepickerNavigateEvent for the payload info.
         */
        this.navigate = new EventEmitter();
        /**
         * An event fired when user selects a date using keyboard or mouse.
         * The payload of the event is currently selected NgbDate.
         */
        this.select = new EventEmitter();
        this.onChange = function (_) { };
        this.onTouched = function () { };
        ['dayTemplate', 'displayMonths', 'firstDayOfWeek', 'markDisabled', 'minDate', 'maxDate', 'navigation',
            'outsideDays', 'showWeekdays', 'showWeekNumbers', 'startDate']
            .forEach(function (input) { return _this[input] = config[input]; });
        this._selectSubscription = _service.select$.subscribe(function (date) { _this.select.emit(date); });
        this._subscription = _service.model$.subscribe(function (model) {
            /** @type {?} */
            var newDate = model.firstDate;
            /** @type {?} */
            var oldDate = _this.model ? _this.model.firstDate : null;
            /** @type {?} */
            var newSelectedDate = model.selectedDate;
            /** @type {?} */
            var oldSelectedDate = _this.model ? _this.model.selectedDate : null;
            /** @type {?} */
            var newFocusedDate = model.focusDate;
            /** @type {?} */
            var oldFocusedDate = _this.model ? _this.model.focusDate : null;
            _this.model = model;
            // handling selection change
            if (isChangedDate(newSelectedDate, oldSelectedDate)) {
                _this.onTouched();
                _this.onChange(_this._ngbDateAdapter.toModel(newSelectedDate));
            }
            // handling focus change
            if (isChangedDate(newFocusedDate, oldFocusedDate) && oldFocusedDate && model.focusVisible) {
                _this.focus();
            }
            // emitting navigation event if the first month changes
            if (!newDate.equals(oldDate)) {
                _this.navigate.emit({
                    current: oldDate ? { year: oldDate.year, month: oldDate.month } : null,
                    next: { year: newDate.year, month: newDate.month }
                });
            }
            _cd.markForCheck();
        });
    }
    /**
     * Manually focus the focusable day in the datepicker
     */
    /**
     * Manually focus the focusable day in the datepicker
     * @return {?}
     */
    NgbDatepicker.prototype.focus = /**
     * Manually focus the focusable day in the datepicker
     * @return {?}
     */
    function () {
        var _this = this;
        this._ngZone.onStable.asObservable().pipe(take(1)).subscribe(function () {
            /** @type {?} */
            var elementToFocus = _this._elementRef.nativeElement.querySelector('div.ngb-dp-day[tabindex="0"]');
            if (elementToFocus) {
                elementToFocus.focus();
            }
        });
    };
    /**
     * Navigates current view to provided date.
     * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     * Use 'startDate' input as an alternative
     */
    /**
     * Navigates current view to provided date.
     * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     * Use 'startDate' input as an alternative
     * @param {?=} date
     * @return {?}
     */
    NgbDatepicker.prototype.navigateTo = /**
     * Navigates current view to provided date.
     * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     * Use 'startDate' input as an alternative
     * @param {?=} date
     * @return {?}
     */
    function (date) {
        this._service.open(NgbDate.from(date ? tslib_1.__assign({}, date, { day: 1 }) : null));
    };
    /**
     * @return {?}
     */
    NgbDatepicker.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
        this._selectSubscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    NgbDatepicker.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.model === undefined) {
            ['displayMonths', 'markDisabled', 'firstDayOfWeek', 'navigation', 'minDate', 'maxDate', 'outsideDays'].forEach(function (input) { return _this._service[input] = _this[input]; });
            this.navigateTo(this.startDate);
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgbDatepicker.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        ['displayMonths', 'markDisabled', 'firstDayOfWeek', 'navigation', 'minDate', 'maxDate', 'outsideDays']
            .filter(function (input) { return input in changes; })
            .forEach(function (input) { return _this._service[input] = _this[input]; });
        if ('startDate' in changes) {
            this.navigateTo(this.startDate);
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NgbDatepicker.prototype.onDateSelect = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        this._service.focus(date);
        this._service.select(date, { emitEvent: true });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgbDatepicker.prototype.onKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) { this._keyMapService.processKey(event); };
    /**
     * @param {?} date
     * @return {?}
     */
    NgbDatepicker.prototype.onNavigateDateSelect = /**
     * @param {?} date
     * @return {?}
     */
    function (date) { this._service.open(date); };
    /**
     * @param {?} event
     * @return {?}
     */
    NgbDatepicker.prototype.onNavigateEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        switch (event) {
            case NavigationEvent.PREV:
                this._service.open(this._calendar.getPrev(this.model.firstDate, 'm', 1));
                break;
            case NavigationEvent.NEXT:
                this._service.open(this._calendar.getNext(this.model.firstDate, 'm', 1));
                break;
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgbDatepicker.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onChange = fn; };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgbDatepicker.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onTouched = fn; };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NgbDatepicker.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) { this._service.disabled = isDisabled; };
    /**
     * @param {?} focusVisible
     * @return {?}
     */
    NgbDatepicker.prototype.showFocus = /**
     * @param {?} focusVisible
     * @return {?}
     */
    function (focusVisible) { this._service.focusVisible = focusVisible; };
    /**
     * @param {?} value
     * @return {?}
     */
    NgbDatepicker.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) { this._service.select(NgbDate.from(this._ngbDateAdapter.fromModel(value))); };
    NgbDatepicker.decorators = [
        { type: Component, args: [{
                    exportAs: 'ngbDatepicker',
                    selector: 'ngb-datepicker',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["\n    :host {\n      border: 1px solid #dfdfdf;\n      border-radius: 0.25rem;\n      display: inline-block;\n    }\n    .ngb-dp-month {\n      pointer-events: none;\n    }\n    .ngb-dp-header {\n      border-bottom: 0;\n      border-radius: 0.25rem 0.25rem 0 0;\n      padding-top: 0.25rem;\n    }\n    ngb-datepicker-month-view {\n      pointer-events: auto;\n    }\n    .ngb-dp-month-name {\n      font-size: larger;\n      height: 2rem;\n      line-height: 2rem;\n      text-align: center;\n    }\n    /deep/ .ngb-dp-month + .ngb-dp-month > ngb-datepicker-month-view > .ngb-dp-week {\n      padding-left: 1rem;\n    }\n    /deep/ .ngb-dp-month + .ngb-dp-month > .ngb-dp-month-name {\n      padding-left: 1rem;\n    }\n    /deep/ .ngb-dp-month:last-child .ngb-dp-week {\n      padding-right: .25rem;\n    }\n    /deep/ .ngb-dp-month:first-child .ngb-dp-week {\n      padding-left: .25rem;\n    }\n    /deep/ .ngb-dp-month > ngb-datepicker-month-view > .ngb-dp-week:last-child {\n      padding-bottom: .25rem;\n    }\n    .ngb-dp-months {\n      display: -ms-flexbox;\n      display: flex;\n    }\n  "],
                    template: "\n    <ng-template #dt let-date=\"date\" let-currentMonth=\"currentMonth\" let-selected=\"selected\" let-disabled=\"disabled\" let-focused=\"focused\">\n      <div ngbDatepickerDayView\n        [date]=\"date\"\n        [currentMonth]=\"currentMonth\"\n        [selected]=\"selected\"\n        [disabled]=\"disabled\"\n        [focused]=\"focused\">\n      </div>\n    </ng-template>\n\n    <div class=\"ngb-dp-header bg-light\">\n      <ngb-datepicker-navigation *ngIf=\"navigation !== 'none'\"\n        [date]=\"model.firstDate\"\n        [months]=\"model.months\"\n        [disabled]=\"model.disabled\"\n        [showSelect]=\"model.navigation === 'select'\"\n        [prevDisabled]=\"model.prevDisabled\"\n        [nextDisabled]=\"model.nextDisabled\"\n        [selectBoxes]=\"model.selectBoxes\"\n        (navigate)=\"onNavigateEvent($event)\"\n        (select)=\"onNavigateDateSelect($event)\">\n      </ngb-datepicker-navigation>\n    </div>\n\n    <div class=\"ngb-dp-months\" (keydown)=\"onKeyDown($event)\" (focusin)=\"showFocus(true)\" (focusout)=\"showFocus(false)\">\n      <ng-template ngFor let-month [ngForOf]=\"model.months\" let-i=\"index\">\n        <div class=\"ngb-dp-month\">\n          <div *ngIf=\"navigation === 'none' || (displayMonths > 1 && navigation === 'select')\"\n                class=\"ngb-dp-month-name bg-light\">\n            {{ i18n.getMonthFullName(month.number, month.year) }} {{ i18n.getYearNumerals(month.year) }}\n          </div>\n          <ngb-datepicker-month-view\n            [month]=\"month\"\n            [dayTemplate]=\"dayTemplate || dt\"\n            [showWeekdays]=\"showWeekdays\"\n            [showWeekNumbers]=\"showWeekNumbers\"\n            (select)=\"onDateSelect($event)\">\n          </ngb-datepicker-month-view>\n        </div>\n      </ng-template>\n    </div>\n  ",
                    providers: [NGB_DATEPICKER_VALUE_ACCESSOR, NgbDatepickerService, NgbDatepickerKeyMapService]
                },] },
    ];
    /** @nocollapse */
    NgbDatepicker.ctorParameters = function () { return [
        { type: NgbDatepickerKeyMapService },
        { type: NgbDatepickerService },
        { type: NgbCalendar },
        { type: NgbDatepickerI18n },
        { type: NgbDatepickerConfig },
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgbDateAdapter },
        { type: NgZone }
    ]; };
    NgbDatepicker.propDecorators = {
        dayTemplate: [{ type: Input }],
        displayMonths: [{ type: Input }],
        firstDayOfWeek: [{ type: Input }],
        markDisabled: [{ type: Input }],
        maxDate: [{ type: Input }],
        minDate: [{ type: Input }],
        navigation: [{ type: Input }],
        outsideDays: [{ type: Input }],
        showWeekdays: [{ type: Input }],
        showWeekNumbers: [{ type: Input }],
        startDate: [{ type: Input }],
        navigate: [{ type: Output }],
        select: [{ type: Output }]
    };
    return NgbDatepicker;
}());
export { NgbDatepicker };
if (false) {
    /** @type {?} */
    NgbDatepicker.prototype.model;
    /** @type {?} */
    NgbDatepicker.prototype._subscription;
    /** @type {?} */
    NgbDatepicker.prototype._selectSubscription;
    /**
     * Reference for the custom template for the day display
     * @type {?}
     */
    NgbDatepicker.prototype.dayTemplate;
    /**
     * Number of months to display
     * @type {?}
     */
    NgbDatepicker.prototype.displayMonths;
    /**
     * First day of the week. With default calendar we use ISO 8601: 'weekday' is 1=Mon ... 7=Sun
     * @type {?}
     */
    NgbDatepicker.prototype.firstDayOfWeek;
    /**
     * Callback to mark a given date as disabled.
     * 'Current' contains the month that will be displayed in the view
     * @type {?}
     */
    NgbDatepicker.prototype.markDisabled;
    /**
     * Max date for the navigation. If not provided, 'year' select box will display 10 years after current month
     * @type {?}
     */
    NgbDatepicker.prototype.maxDate;
    /**
     * Min date for the navigation. If not provided, 'year' select box will display 10 years before current month
     * @type {?}
     */
    NgbDatepicker.prototype.minDate;
    /**
     * Navigation type: `select` (default with select boxes for month and year), `arrows`
     * (without select boxes, only navigation arrows) or `none` (no navigation at all)
     * @type {?}
     */
    NgbDatepicker.prototype.navigation;
    /**
     * The way to display days that don't belong to current month: `visible` (default),
     * `hidden` (not displayed) or `collapsed` (not displayed with empty space collapsed)
     * @type {?}
     */
    NgbDatepicker.prototype.outsideDays;
    /**
     * Whether to display days of the week
     * @type {?}
     */
    NgbDatepicker.prototype.showWeekdays;
    /**
     * Whether to display week numbers
     * @type {?}
     */
    NgbDatepicker.prototype.showWeekNumbers;
    /**
     * Date to open calendar with.
     * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided, calendar will open with current month.
     * Use 'navigateTo(date)' as an alternative
     * @type {?}
     */
    NgbDatepicker.prototype.startDate;
    /**
     * An event fired when navigation happens and currently displayed month changes.
     * See NgbDatepickerNavigateEvent for the payload info.
     * @type {?}
     */
    NgbDatepicker.prototype.navigate;
    /**
     * An event fired when user selects a date using keyboard or mouse.
     * The payload of the event is currently selected NgbDate.
     * @type {?}
     */
    NgbDatepicker.prototype.select;
    /** @type {?} */
    NgbDatepicker.prototype.onChange;
    /** @type {?} */
    NgbDatepicker.prototype.onTouched;
    /** @type {?} */
    NgbDatepicker.prototype._keyMapService;
    /** @type {?} */
    NgbDatepicker.prototype._service;
    /** @type {?} */
    NgbDatepicker.prototype._calendar;
    /** @type {?} */
    NgbDatepicker.prototype.i18n;
    /** @type {?} */
    NgbDatepicker.prototype._cd;
    /** @type {?} */
    NgbDatepicker.prototype._elementRef;
    /** @type {?} */
    NgbDatepicker.prototype._ngbDateAdapter;
    /** @type {?} */
    NgbDatepicker.prototype._ngZone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9kYXRlcGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3BDLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxLQUFLLEVBRUwsV0FBVyxFQUNYLFVBQVUsRUFHVixZQUFZLEVBQ1osTUFBTSxFQUVOLFVBQVUsRUFDVixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGlCQUFpQixFQUF1QixNQUFNLGdCQUFnQixDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ25DLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzFELE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ3ZFLE9BQU8sRUFBc0IsZUFBZSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFFN0UsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDeEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBRTNELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7QUFFakQsSUFBTSw2QkFBNkIsR0FBRztJQUNwQyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLGFBQWEsRUFBYixDQUFhLENBQUM7SUFDNUMsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWtNQSx1QkFDWSxnQkFBbUQsUUFBOEIsRUFDakYsV0FBK0IsSUFBdUIsRUFBRSxNQUEyQixFQUNuRixLQUFnQyxXQUFvQyxFQUNwRSxpQkFBOEMsT0FBZTtRQUp6RSxpQkF5Q0M7UUF4Q1csbUJBQWMsR0FBZCxjQUFjO1FBQXFDLGFBQVEsR0FBUixRQUFRLENBQXNCO1FBQ2pGLGNBQVMsR0FBVCxTQUFTO1FBQXNCLFNBQUksR0FBSixJQUFJLENBQW1CO1FBQ3RELFFBQUcsR0FBSCxHQUFHO1FBQTZCLGdCQUFXLEdBQVgsV0FBVyxDQUF5QjtRQUNwRSxvQkFBZSxHQUFmLGVBQWU7UUFBK0IsWUFBTyxHQUFQLE9BQU8sQ0FBUTs7Ozs7d0JBZnBELElBQUksWUFBWSxFQUE4Qjs7Ozs7c0JBTWhELElBQUksWUFBWSxFQUFXO3dCQUVuQyxVQUFDLENBQU0sS0FBTzt5QkFDYixlQUFRO1FBT2xCLENBQUMsYUFBYSxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxZQUFZO1lBQ3BHLGFBQWEsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxDQUFDO2FBQzFELE9BQU8sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQTNCLENBQTJCLENBQUMsQ0FBQztRQUVuRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJLElBQU0sS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFM0YsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7O1lBQ2xELElBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7O1lBQ2hDLElBQU0sT0FBTyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7O1lBQ3pELElBQU0sZUFBZSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUM7O1lBQzNDLElBQU0sZUFBZSxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7O1lBQ3BFLElBQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7O1lBQ3ZDLElBQU0sY0FBYyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFFaEUsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7O1lBR25CLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxlQUFlLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2pCLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQzthQUM5RDs7WUFHRCxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLGNBQWMsQ0FBQyxJQUFJLGNBQWMsSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDMUYsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2Q7O1lBR0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7b0JBQ2pCLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtvQkFDcEUsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUM7aUJBQ2pELENBQUMsQ0FBQzthQUNKO1lBQ0QsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3BCLENBQUMsQ0FBQztLQUNKO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsNkJBQUs7Ozs7SUFBTDtRQUFBLGlCQVFDO1FBUEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQzs7WUFDM0QsSUFBTSxjQUFjLEdBQ2hCLEtBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBaUIsOEJBQThCLENBQUMsQ0FBQztZQUNqRyxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDeEI7U0FDRixDQUFDLENBQUM7S0FDSjtJQUVEOzs7OztPQUtHOzs7Ozs7Ozs7SUFDSCxrQ0FBVTs7Ozs7Ozs7SUFBVixVQUFXLElBQW9DO1FBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsc0JBQUssSUFBSSxJQUFFLEdBQUcsRUFBRSxDQUFDLElBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDbkU7Ozs7SUFFRCxtQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN4Qzs7OztJQUVELGdDQUFROzs7SUFBUjtRQUFBLGlCQU1DO1FBTEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzdCLENBQUMsZUFBZSxFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQzFHLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQWxDLENBQWtDLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNqQztLQUNGOzs7OztJQUVELG1DQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUFsQyxpQkFRQztRQVBDLENBQUMsZUFBZSxFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxhQUFhLENBQUM7YUFDakcsTUFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxJQUFJLE9BQU8sRUFBaEIsQ0FBZ0IsQ0FBQzthQUNqQyxPQUFPLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBbEMsQ0FBa0MsQ0FBQyxDQUFDO1FBRTFELEVBQUUsQ0FBQyxDQUFDLFdBQVcsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ2pDO0tBQ0Y7Ozs7O0lBRUQsb0NBQVk7Ozs7SUFBWixVQUFhLElBQWE7UUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7S0FDL0M7Ozs7O0lBRUQsaUNBQVM7Ozs7SUFBVCxVQUFVLEtBQW9CLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTs7Ozs7SUFFMUUsNENBQW9COzs7O0lBQXBCLFVBQXFCLElBQWEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFOzs7OztJQUVqRSx1Q0FBZTs7OztJQUFmLFVBQWdCLEtBQXNCO1FBQ3BDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDZCxLQUFLLGVBQWUsQ0FBQyxJQUFJO2dCQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekUsS0FBSyxDQUFDO1lBQ1IsS0FBSyxlQUFlLENBQUMsSUFBSTtnQkFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pFLEtBQUssQ0FBQztTQUNUO0tBQ0Y7Ozs7O0lBRUQsd0NBQWdCOzs7O0lBQWhCLFVBQWlCLEVBQXVCLElBQVUsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsRUFBRTs7Ozs7SUFFdkUseUNBQWlCOzs7O0lBQWpCLFVBQWtCLEVBQWEsSUFBVSxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxFQUFFOzs7OztJQUUvRCx3Q0FBZ0I7Ozs7SUFBaEIsVUFBaUIsVUFBbUIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsRUFBRTs7Ozs7SUFFOUUsaUNBQVM7Ozs7SUFBVCxVQUFVLFlBQXFCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDLEVBQUU7Ozs7O0lBRS9FLGtDQUFVOzs7O0lBQVYsVUFBVyxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTs7Z0JBblNqRyxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxNQUFNLEVBQUUsQ0FBQyxnbENBMENSLENBQUM7b0JBQ0YsUUFBUSxFQUFFLHV5REEwQ1Q7b0JBQ0QsU0FBUyxFQUFFLENBQUMsNkJBQTZCLEVBQUUsb0JBQW9CLEVBQUUsMEJBQTBCLENBQUM7aUJBQzdGOzs7O2dCQTVITywwQkFBMEI7Z0JBRDFCLG9CQUFvQjtnQkFGcEIsV0FBVztnQkFTWCxpQkFBaUI7Z0JBSGpCLG1CQUFtQjtnQkFyQnpCLGlCQUFpQjtnQkFXakIsVUFBVTtnQkFXSixjQUFjO2dCQVZwQixNQUFNOzs7OEJBNElMLEtBQUs7Z0NBS0wsS0FBSztpQ0FLTCxLQUFLOytCQU1MLEtBQUs7MEJBS0wsS0FBSzswQkFLTCxLQUFLOzZCQU1MLEtBQUs7OEJBTUwsS0FBSzsrQkFLTCxLQUFLO2tDQUtMLEtBQUs7NEJBUUwsS0FBSzsyQkFNTCxNQUFNO3lCQU1OLE1BQU07O3dCQWhPVDs7U0FtSmEsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHt0YWtlfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7XHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBUZW1wbGF0ZVJlZixcclxuICBmb3J3YXJkUmVmLFxyXG4gIE9uSW5pdCxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPdXRwdXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgTmdab25lXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7TmdiQ2FsZW5kYXJ9IGZyb20gJy4vbmdiLWNhbGVuZGFyJztcclxuaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcclxuaW1wb3J0IHtOZ2JEYXRlcGlja2VyU2VydmljZX0gZnJvbSAnLi9kYXRlcGlja2VyLXNlcnZpY2UnO1xyXG5pbXBvcnQge05nYkRhdGVwaWNrZXJLZXlNYXBTZXJ2aWNlfSBmcm9tICcuL2RhdGVwaWNrZXIta2V5bWFwLXNlcnZpY2UnO1xyXG5pbXBvcnQge0RhdGVwaWNrZXJWaWV3TW9kZWwsIE5hdmlnYXRpb25FdmVudH0gZnJvbSAnLi9kYXRlcGlja2VyLXZpZXctbW9kZWwnO1xyXG5pbXBvcnQge0RheVRlbXBsYXRlQ29udGV4dH0gZnJvbSAnLi9kYXRlcGlja2VyLWRheS10ZW1wbGF0ZS1jb250ZXh0JztcclxuaW1wb3J0IHtOZ2JEYXRlcGlja2VyQ29uZmlnfSBmcm9tICcuL2RhdGVwaWNrZXItY29uZmlnJztcclxuaW1wb3J0IHtOZ2JEYXRlQWRhcHRlcn0gZnJvbSAnLi9hZGFwdGVycy9uZ2ItZGF0ZS1hZGFwdGVyJztcclxuaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuL25nYi1kYXRlLXN0cnVjdCc7XHJcbmltcG9ydCB7TmdiRGF0ZXBpY2tlckkxOG59IGZyb20gJy4vZGF0ZXBpY2tlci1pMThuJztcclxuaW1wb3J0IHtpc0NoYW5nZWREYXRlfSBmcm9tICcuL2RhdGVwaWNrZXItdG9vbHMnO1xyXG5cclxuY29uc3QgTkdCX0RBVEVQSUNLRVJfVkFMVUVfQUNDRVNTT1IgPSB7XHJcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdiRGF0ZXBpY2tlciksXHJcbiAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgcGF5bG9hZCBvZiB0aGUgZGF0ZXBpY2tlciBuYXZpZ2F0aW9uIGV2ZW50XHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIE5nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50IHtcclxuICAvKipcclxuICAgKiBDdXJyZW50bHkgZGlzcGxheWVkIG1vbnRoXHJcbiAgICovXHJcbiAgY3VycmVudDoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn07XHJcblxyXG4gIC8qKlxyXG4gICAqIE1vbnRoIHdlJ3JlIG5hdmlnYXRpbmcgdG9cclxuICAgKi9cclxuICBuZXh0OiB7eWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEEgbGlnaHR3ZWlnaHQgYW5kIGhpZ2hseSBjb25maWd1cmFibGUgZGF0ZXBpY2tlciBkaXJlY3RpdmVcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIGV4cG9ydEFzOiAnbmdiRGF0ZXBpY2tlcicsXHJcbiAgc2VsZWN0b3I6ICduZ2ItZGF0ZXBpY2tlcicsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgOmhvc3Qge1xyXG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjZGZkZmRmO1xyXG4gICAgICBib3JkZXItcmFkaXVzOiAwLjI1cmVtO1xyXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICB9XHJcbiAgICAubmdiLWRwLW1vbnRoIHtcclxuICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgICB9XHJcbiAgICAubmdiLWRwLWhlYWRlciB7XHJcbiAgICAgIGJvcmRlci1ib3R0b206IDA7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDAuMjVyZW0gMC4yNXJlbSAwIDA7XHJcbiAgICAgIHBhZGRpbmctdG9wOiAwLjI1cmVtO1xyXG4gICAgfVxyXG4gICAgbmdiLWRhdGVwaWNrZXItbW9udGgtdmlldyB7XHJcbiAgICAgIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xyXG4gICAgfVxyXG4gICAgLm5nYi1kcC1tb250aC1uYW1lIHtcclxuICAgICAgZm9udC1zaXplOiBsYXJnZXI7XHJcbiAgICAgIGhlaWdodDogMnJlbTtcclxuICAgICAgbGluZS1oZWlnaHQ6IDJyZW07XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIH1cclxuICAgIC9kZWVwLyAubmdiLWRwLW1vbnRoICsgLm5nYi1kcC1tb250aCA+IG5nYi1kYXRlcGlja2VyLW1vbnRoLXZpZXcgPiAubmdiLWRwLXdlZWsge1xyXG4gICAgICBwYWRkaW5nLWxlZnQ6IDFyZW07XHJcbiAgICB9XHJcbiAgICAvZGVlcC8gLm5nYi1kcC1tb250aCArIC5uZ2ItZHAtbW9udGggPiAubmdiLWRwLW1vbnRoLW5hbWUge1xyXG4gICAgICBwYWRkaW5nLWxlZnQ6IDFyZW07XHJcbiAgICB9XHJcbiAgICAvZGVlcC8gLm5nYi1kcC1tb250aDpsYXN0LWNoaWxkIC5uZ2ItZHAtd2VlayB7XHJcbiAgICAgIHBhZGRpbmctcmlnaHQ6IC4yNXJlbTtcclxuICAgIH1cclxuICAgIC9kZWVwLyAubmdiLWRwLW1vbnRoOmZpcnN0LWNoaWxkIC5uZ2ItZHAtd2VlayB7XHJcbiAgICAgIHBhZGRpbmctbGVmdDogLjI1cmVtO1xyXG4gICAgfVxyXG4gICAgL2RlZXAvIC5uZ2ItZHAtbW9udGggPiBuZ2ItZGF0ZXBpY2tlci1tb250aC12aWV3ID4gLm5nYi1kcC13ZWVrOmxhc3QtY2hpbGQge1xyXG4gICAgICBwYWRkaW5nLWJvdHRvbTogLjI1cmVtO1xyXG4gICAgfVxyXG4gICAgLm5nYi1kcC1tb250aHMge1xyXG4gICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgIH1cclxuICBgXSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5nLXRlbXBsYXRlICNkdCBsZXQtZGF0ZT1cImRhdGVcIiBsZXQtY3VycmVudE1vbnRoPVwiY3VycmVudE1vbnRoXCIgbGV0LXNlbGVjdGVkPVwic2VsZWN0ZWRcIiBsZXQtZGlzYWJsZWQ9XCJkaXNhYmxlZFwiIGxldC1mb2N1c2VkPVwiZm9jdXNlZFwiPlxyXG4gICAgICA8ZGl2IG5nYkRhdGVwaWNrZXJEYXlWaWV3XHJcbiAgICAgICAgW2RhdGVdPVwiZGF0ZVwiXHJcbiAgICAgICAgW2N1cnJlbnRNb250aF09XCJjdXJyZW50TW9udGhcIlxyXG4gICAgICAgIFtzZWxlY3RlZF09XCJzZWxlY3RlZFwiXHJcbiAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcclxuICAgICAgICBbZm9jdXNlZF09XCJmb2N1c2VkXCI+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwibmdiLWRwLWhlYWRlciBiZy1saWdodFwiPlxyXG4gICAgICA8bmdiLWRhdGVwaWNrZXItbmF2aWdhdGlvbiAqbmdJZj1cIm5hdmlnYXRpb24gIT09ICdub25lJ1wiXHJcbiAgICAgICAgW2RhdGVdPVwibW9kZWwuZmlyc3REYXRlXCJcclxuICAgICAgICBbbW9udGhzXT1cIm1vZGVsLm1vbnRoc1wiXHJcbiAgICAgICAgW2Rpc2FibGVkXT1cIm1vZGVsLmRpc2FibGVkXCJcclxuICAgICAgICBbc2hvd1NlbGVjdF09XCJtb2RlbC5uYXZpZ2F0aW9uID09PSAnc2VsZWN0J1wiXHJcbiAgICAgICAgW3ByZXZEaXNhYmxlZF09XCJtb2RlbC5wcmV2RGlzYWJsZWRcIlxyXG4gICAgICAgIFtuZXh0RGlzYWJsZWRdPVwibW9kZWwubmV4dERpc2FibGVkXCJcclxuICAgICAgICBbc2VsZWN0Qm94ZXNdPVwibW9kZWwuc2VsZWN0Qm94ZXNcIlxyXG4gICAgICAgIChuYXZpZ2F0ZSk9XCJvbk5hdmlnYXRlRXZlbnQoJGV2ZW50KVwiXHJcbiAgICAgICAgKHNlbGVjdCk9XCJvbk5hdmlnYXRlRGF0ZVNlbGVjdCgkZXZlbnQpXCI+XHJcbiAgICAgIDwvbmdiLWRhdGVwaWNrZXItbmF2aWdhdGlvbj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJuZ2ItZHAtbW9udGhzXCIgKGtleWRvd24pPVwib25LZXlEb3duKCRldmVudClcIiAoZm9jdXNpbik9XCJzaG93Rm9jdXModHJ1ZSlcIiAoZm9jdXNvdXQpPVwic2hvd0ZvY3VzKGZhbHNlKVwiPlxyXG4gICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LW1vbnRoIFtuZ0Zvck9mXT1cIm1vZGVsLm1vbnRoc1wiIGxldC1pPVwiaW5kZXhcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibmdiLWRwLW1vbnRoXCI+XHJcbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwibmF2aWdhdGlvbiA9PT0gJ25vbmUnIHx8IChkaXNwbGF5TW9udGhzID4gMSAmJiBuYXZpZ2F0aW9uID09PSAnc2VsZWN0JylcIlxyXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJuZ2ItZHAtbW9udGgtbmFtZSBiZy1saWdodFwiPlxyXG4gICAgICAgICAgICB7eyBpMThuLmdldE1vbnRoRnVsbE5hbWUobW9udGgubnVtYmVyLCBtb250aC55ZWFyKSB9fSB7eyBpMThuLmdldFllYXJOdW1lcmFscyhtb250aC55ZWFyKSB9fVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8bmdiLWRhdGVwaWNrZXItbW9udGgtdmlld1xyXG4gICAgICAgICAgICBbbW9udGhdPVwibW9udGhcIlxyXG4gICAgICAgICAgICBbZGF5VGVtcGxhdGVdPVwiZGF5VGVtcGxhdGUgfHwgZHRcIlxyXG4gICAgICAgICAgICBbc2hvd1dlZWtkYXlzXT1cInNob3dXZWVrZGF5c1wiXHJcbiAgICAgICAgICAgIFtzaG93V2Vla051bWJlcnNdPVwic2hvd1dlZWtOdW1iZXJzXCJcclxuICAgICAgICAgICAgKHNlbGVjdCk9XCJvbkRhdGVTZWxlY3QoJGV2ZW50KVwiPlxyXG4gICAgICAgICAgPC9uZ2ItZGF0ZXBpY2tlci1tb250aC12aWV3PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgPC9kaXY+XHJcbiAgYCxcclxuICBwcm92aWRlcnM6IFtOR0JfREFURVBJQ0tFUl9WQUxVRV9BQ0NFU1NPUiwgTmdiRGF0ZXBpY2tlclNlcnZpY2UsIE5nYkRhdGVwaWNrZXJLZXlNYXBTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlciBpbXBsZW1lbnRzIE9uRGVzdHJveSxcclxuICAgIE9uQ2hhbmdlcywgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcbiAgbW9kZWw6IERhdGVwaWNrZXJWaWV3TW9kZWw7XHJcblxyXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgX3NlbGVjdFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIC8qKlxyXG4gICAqIFJlZmVyZW5jZSBmb3IgdGhlIGN1c3RvbSB0ZW1wbGF0ZSBmb3IgdGhlIGRheSBkaXNwbGF5XHJcbiAgICovXHJcbiAgQElucHV0KCkgZGF5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPERheVRlbXBsYXRlQ29udGV4dD47XHJcblxyXG4gIC8qKlxyXG4gICAqIE51bWJlciBvZiBtb250aHMgdG8gZGlzcGxheVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRpc3BsYXlNb250aHM6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogRmlyc3QgZGF5IG9mIHRoZSB3ZWVrLiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnd2Vla2RheScgaXMgMT1Nb24gLi4uIDc9U3VuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZmlyc3REYXlPZldlZWs6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsbGJhY2sgdG8gbWFyayBhIGdpdmVuIGRhdGUgYXMgZGlzYWJsZWQuXHJcbiAgICogJ0N1cnJlbnQnIGNvbnRhaW5zIHRoZSBtb250aCB0aGF0IHdpbGwgYmUgZGlzcGxheWVkIGluIHRoZSB2aWV3XHJcbiAgICovXHJcbiAgQElucHV0KCkgbWFya0Rpc2FibGVkOiAoZGF0ZTogTmdiRGF0ZSwgY3VycmVudDoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn0pID0+IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIE1heCBkYXRlIGZvciB0aGUgbmF2aWdhdGlvbi4gSWYgbm90IHByb3ZpZGVkLCAneWVhcicgc2VsZWN0IGJveCB3aWxsIGRpc3BsYXkgMTAgeWVhcnMgYWZ0ZXIgY3VycmVudCBtb250aFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1heERhdGU6IE5nYkRhdGVTdHJ1Y3Q7XHJcblxyXG4gIC8qKlxyXG4gICAqIE1pbiBkYXRlIGZvciB0aGUgbmF2aWdhdGlvbi4gSWYgbm90IHByb3ZpZGVkLCAneWVhcicgc2VsZWN0IGJveCB3aWxsIGRpc3BsYXkgMTAgeWVhcnMgYmVmb3JlIGN1cnJlbnQgbW9udGhcclxuICAgKi9cclxuICBASW5wdXQoKSBtaW5EYXRlOiBOZ2JEYXRlU3RydWN0O1xyXG5cclxuICAvKipcclxuICAgKiBOYXZpZ2F0aW9uIHR5cGU6IGBzZWxlY3RgIChkZWZhdWx0IHdpdGggc2VsZWN0IGJveGVzIGZvciBtb250aCBhbmQgeWVhciksIGBhcnJvd3NgXHJcbiAgICogKHdpdGhvdXQgc2VsZWN0IGJveGVzLCBvbmx5IG5hdmlnYXRpb24gYXJyb3dzKSBvciBgbm9uZWAgKG5vIG5hdmlnYXRpb24gYXQgYWxsKVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG5hdmlnYXRpb246ICdzZWxlY3QnIHwgJ2Fycm93cycgfCAnbm9uZSc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB3YXkgdG8gZGlzcGxheSBkYXlzIHRoYXQgZG9uJ3QgYmVsb25nIHRvIGN1cnJlbnQgbW9udGg6IGB2aXNpYmxlYCAoZGVmYXVsdCksXHJcbiAgICogYGhpZGRlbmAgKG5vdCBkaXNwbGF5ZWQpIG9yIGBjb2xsYXBzZWRgIChub3QgZGlzcGxheWVkIHdpdGggZW1wdHkgc3BhY2UgY29sbGFwc2VkKVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG91dHNpZGVEYXlzOiAndmlzaWJsZScgfCAnY29sbGFwc2VkJyB8ICdoaWRkZW4nO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRvIGRpc3BsYXkgZGF5cyBvZiB0aGUgd2Vla1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNob3dXZWVrZGF5czogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0byBkaXNwbGF5IHdlZWsgbnVtYmVyc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNob3dXZWVrTnVtYmVyczogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogRGF0ZSB0byBvcGVuIGNhbGVuZGFyIHdpdGguXHJcbiAgICogV2l0aCBkZWZhdWx0IGNhbGVuZGFyIHdlIHVzZSBJU08gODYwMTogJ21vbnRoJyBpcyAxPUphbiAuLi4gMTI9RGVjLlxyXG4gICAqIElmIG5vdGhpbmcgb3IgaW52YWxpZCBkYXRlIHByb3ZpZGVkLCBjYWxlbmRhciB3aWxsIG9wZW4gd2l0aCBjdXJyZW50IG1vbnRoLlxyXG4gICAqIFVzZSAnbmF2aWdhdGVUbyhkYXRlKScgYXMgYW4gYWx0ZXJuYXRpdmVcclxuICAgKi9cclxuICBASW5wdXQoKSBzdGFydERhdGU6IHt5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXJ9O1xyXG5cclxuICAvKipcclxuICAgKiBBbiBldmVudCBmaXJlZCB3aGVuIG5hdmlnYXRpb24gaGFwcGVucyBhbmQgY3VycmVudGx5IGRpc3BsYXllZCBtb250aCBjaGFuZ2VzLlxyXG4gICAqIFNlZSBOZ2JEYXRlcGlja2VyTmF2aWdhdGVFdmVudCBmb3IgdGhlIHBheWxvYWQgaW5mby5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgbmF2aWdhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBBbiBldmVudCBmaXJlZCB3aGVuIHVzZXIgc2VsZWN0cyBhIGRhdGUgdXNpbmcga2V5Ym9hcmQgb3IgbW91c2UuXHJcbiAgICogVGhlIHBheWxvYWQgb2YgdGhlIGV2ZW50IGlzIGN1cnJlbnRseSBzZWxlY3RlZCBOZ2JEYXRlLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYkRhdGU+KCk7XHJcblxyXG4gIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XHJcbiAgb25Ub3VjaGVkID0gKCkgPT4ge307XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcml2YXRlIF9rZXlNYXBTZXJ2aWNlOiBOZ2JEYXRlcGlja2VyS2V5TWFwU2VydmljZSwgcHVibGljIF9zZXJ2aWNlOiBOZ2JEYXRlcGlja2VyU2VydmljZSxcclxuICAgICAgcHJpdmF0ZSBfY2FsZW5kYXI6IE5nYkNhbGVuZGFyLCBwdWJsaWMgaTE4bjogTmdiRGF0ZXBpY2tlckkxOG4sIGNvbmZpZzogTmdiRGF0ZXBpY2tlckNvbmZpZyxcclxuICAgICAgcHJpdmF0ZSBfY2Q6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcclxuICAgICAgcHJpdmF0ZSBfbmdiRGF0ZUFkYXB0ZXI6IE5nYkRhdGVBZGFwdGVyPGFueT4sIHByaXZhdGUgX25nWm9uZTogTmdab25lKSB7XHJcbiAgICBbJ2RheVRlbXBsYXRlJywgJ2Rpc3BsYXlNb250aHMnLCAnZmlyc3REYXlPZldlZWsnLCAnbWFya0Rpc2FibGVkJywgJ21pbkRhdGUnLCAnbWF4RGF0ZScsICduYXZpZ2F0aW9uJyxcclxuICAgICAnb3V0c2lkZURheXMnLCAnc2hvd1dlZWtkYXlzJywgJ3Nob3dXZWVrTnVtYmVycycsICdzdGFydERhdGUnXVxyXG4gICAgICAgIC5mb3JFYWNoKGlucHV0ID0+IHRoaXNbaW5wdXRdID0gY29uZmlnW2lucHV0XSk7XHJcblxyXG4gICAgdGhpcy5fc2VsZWN0U3Vic2NyaXB0aW9uID0gX3NlcnZpY2Uuc2VsZWN0JC5zdWJzY3JpYmUoZGF0ZSA9PiB7IHRoaXMuc2VsZWN0LmVtaXQoZGF0ZSk7IH0pO1xyXG5cclxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IF9zZXJ2aWNlLm1vZGVsJC5zdWJzY3JpYmUobW9kZWwgPT4ge1xyXG4gICAgICBjb25zdCBuZXdEYXRlID0gbW9kZWwuZmlyc3REYXRlO1xyXG4gICAgICBjb25zdCBvbGREYXRlID0gdGhpcy5tb2RlbCA/IHRoaXMubW9kZWwuZmlyc3REYXRlIDogbnVsbDtcclxuICAgICAgY29uc3QgbmV3U2VsZWN0ZWREYXRlID0gbW9kZWwuc2VsZWN0ZWREYXRlO1xyXG4gICAgICBjb25zdCBvbGRTZWxlY3RlZERhdGUgPSB0aGlzLm1vZGVsID8gdGhpcy5tb2RlbC5zZWxlY3RlZERhdGUgOiBudWxsO1xyXG4gICAgICBjb25zdCBuZXdGb2N1c2VkRGF0ZSA9IG1vZGVsLmZvY3VzRGF0ZTtcclxuICAgICAgY29uc3Qgb2xkRm9jdXNlZERhdGUgPSB0aGlzLm1vZGVsID8gdGhpcy5tb2RlbC5mb2N1c0RhdGUgOiBudWxsO1xyXG5cclxuICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xyXG5cclxuICAgICAgLy8gaGFuZGxpbmcgc2VsZWN0aW9uIGNoYW5nZVxyXG4gICAgICBpZiAoaXNDaGFuZ2VkRGF0ZShuZXdTZWxlY3RlZERhdGUsIG9sZFNlbGVjdGVkRGF0ZSkpIHtcclxuICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5fbmdiRGF0ZUFkYXB0ZXIudG9Nb2RlbChuZXdTZWxlY3RlZERhdGUpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gaGFuZGxpbmcgZm9jdXMgY2hhbmdlXHJcbiAgICAgIGlmIChpc0NoYW5nZWREYXRlKG5ld0ZvY3VzZWREYXRlLCBvbGRGb2N1c2VkRGF0ZSkgJiYgb2xkRm9jdXNlZERhdGUgJiYgbW9kZWwuZm9jdXNWaXNpYmxlKSB7XHJcbiAgICAgICAgdGhpcy5mb2N1cygpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBlbWl0dGluZyBuYXZpZ2F0aW9uIGV2ZW50IGlmIHRoZSBmaXJzdCBtb250aCBjaGFuZ2VzXHJcbiAgICAgIGlmICghbmV3RGF0ZS5lcXVhbHMob2xkRGF0ZSkpIHtcclxuICAgICAgICB0aGlzLm5hdmlnYXRlLmVtaXQoe1xyXG4gICAgICAgICAgY3VycmVudDogb2xkRGF0ZSA/IHt5ZWFyOiBvbGREYXRlLnllYXIsIG1vbnRoOiBvbGREYXRlLm1vbnRofSA6IG51bGwsXHJcbiAgICAgICAgICBuZXh0OiB7eWVhcjogbmV3RGF0ZS55ZWFyLCBtb250aDogbmV3RGF0ZS5tb250aH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBfY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hbnVhbGx5IGZvY3VzIHRoZSBmb2N1c2FibGUgZGF5IGluIHRoZSBkYXRlcGlja2VyXHJcbiAgICovXHJcbiAgZm9jdXMoKSB7XHJcbiAgICB0aGlzLl9uZ1pvbmUub25TdGFibGUuYXNPYnNlcnZhYmxlKCkucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICBjb25zdCBlbGVtZW50VG9Gb2N1cyA9XHJcbiAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRGl2RWxlbWVudD4oJ2Rpdi5uZ2ItZHAtZGF5W3RhYmluZGV4PVwiMFwiXScpO1xyXG4gICAgICBpZiAoZWxlbWVudFRvRm9jdXMpIHtcclxuICAgICAgICBlbGVtZW50VG9Gb2N1cy5mb2N1cygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE5hdmlnYXRlcyBjdXJyZW50IHZpZXcgdG8gcHJvdmlkZWQgZGF0ZS5cclxuICAgKiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnbW9udGgnIGlzIDE9SmFuIC4uLiAxMj1EZWMuXHJcbiAgICogSWYgbm90aGluZyBvciBpbnZhbGlkIGRhdGUgcHJvdmlkZWQgY2FsZW5kYXIgd2lsbCBvcGVuIGN1cnJlbnQgbW9udGguXHJcbiAgICogVXNlICdzdGFydERhdGUnIGlucHV0IGFzIGFuIGFsdGVybmF0aXZlXHJcbiAgICovXHJcbiAgbmF2aWdhdGVUbyhkYXRlPzoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn0pIHtcclxuICAgIHRoaXMuX3NlcnZpY2Uub3BlbihOZ2JEYXRlLmZyb20oZGF0ZSA/IHsuLi5kYXRlLCBkYXk6IDF9IDogbnVsbCkpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuX3NlbGVjdFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5tb2RlbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIFsnZGlzcGxheU1vbnRocycsICdtYXJrRGlzYWJsZWQnLCAnZmlyc3REYXlPZldlZWsnLCAnbmF2aWdhdGlvbicsICdtaW5EYXRlJywgJ21heERhdGUnLCAnb3V0c2lkZURheXMnXS5mb3JFYWNoKFxyXG4gICAgICAgICAgaW5wdXQgPT4gdGhpcy5fc2VydmljZVtpbnB1dF0gPSB0aGlzW2lucHV0XSk7XHJcbiAgICAgIHRoaXMubmF2aWdhdGVUbyh0aGlzLnN0YXJ0RGF0ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBbJ2Rpc3BsYXlNb250aHMnLCAnbWFya0Rpc2FibGVkJywgJ2ZpcnN0RGF5T2ZXZWVrJywgJ25hdmlnYXRpb24nLCAnbWluRGF0ZScsICdtYXhEYXRlJywgJ291dHNpZGVEYXlzJ11cclxuICAgICAgICAuZmlsdGVyKGlucHV0ID0+IGlucHV0IGluIGNoYW5nZXMpXHJcbiAgICAgICAgLmZvckVhY2goaW5wdXQgPT4gdGhpcy5fc2VydmljZVtpbnB1dF0gPSB0aGlzW2lucHV0XSk7XHJcblxyXG4gICAgaWYgKCdzdGFydERhdGUnIGluIGNoYW5nZXMpIHtcclxuICAgICAgdGhpcy5uYXZpZ2F0ZVRvKHRoaXMuc3RhcnREYXRlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uRGF0ZVNlbGVjdChkYXRlOiBOZ2JEYXRlKSB7XHJcbiAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzKGRhdGUpO1xyXG4gICAgdGhpcy5fc2VydmljZS5zZWxlY3QoZGF0ZSwge2VtaXRFdmVudDogdHJ1ZX0pO1xyXG4gIH1cclxuXHJcbiAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7IHRoaXMuX2tleU1hcFNlcnZpY2UucHJvY2Vzc0tleShldmVudCk7IH1cclxuXHJcbiAgb25OYXZpZ2F0ZURhdGVTZWxlY3QoZGF0ZTogTmdiRGF0ZSkgeyB0aGlzLl9zZXJ2aWNlLm9wZW4oZGF0ZSk7IH1cclxuXHJcbiAgb25OYXZpZ2F0ZUV2ZW50KGV2ZW50OiBOYXZpZ2F0aW9uRXZlbnQpIHtcclxuICAgIHN3aXRjaCAoZXZlbnQpIHtcclxuICAgICAgY2FzZSBOYXZpZ2F0aW9uRXZlbnQuUFJFVjpcclxuICAgICAgICB0aGlzLl9zZXJ2aWNlLm9wZW4odGhpcy5fY2FsZW5kYXIuZ2V0UHJldih0aGlzLm1vZGVsLmZpcnN0RGF0ZSwgJ20nLCAxKSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgTmF2aWdhdGlvbkV2ZW50Lk5FWFQ6XHJcbiAgICAgICAgdGhpcy5fc2VydmljZS5vcGVuKHRoaXMuX2NhbGVuZGFyLmdldE5leHQodGhpcy5tb2RlbC5maXJzdERhdGUsICdtJywgMSkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IGFueSk6IHZvaWQgeyB0aGlzLm9uQ2hhbmdlID0gZm47IH1cclxuXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IGFueSk6IHZvaWQgeyB0aGlzLm9uVG91Y2hlZCA9IGZuOyB9XHJcblxyXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikgeyB0aGlzLl9zZXJ2aWNlLmRpc2FibGVkID0gaXNEaXNhYmxlZDsgfVxyXG5cclxuICBzaG93Rm9jdXMoZm9jdXNWaXNpYmxlOiBib29sZWFuKSB7IHRoaXMuX3NlcnZpY2UuZm9jdXNWaXNpYmxlID0gZm9jdXNWaXNpYmxlOyB9XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWUpIHsgdGhpcy5fc2VydmljZS5zZWxlY3QoTmdiRGF0ZS5mcm9tKHRoaXMuX25nYkRhdGVBZGFwdGVyLmZyb21Nb2RlbCh2YWx1ZSkpKTsgfVxyXG59XHJcbiJdfQ==