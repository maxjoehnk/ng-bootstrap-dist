/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Input, ElementRef, ViewContainerRef, Renderer2, ComponentFactoryResolver, NgZone, TemplateRef, forwardRef, EventEmitter, Output, Inject } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { NgbDate } from './ngb-date';
import { NgbDatepicker } from './datepicker';
import { NgbDateParserFormatter } from './ngb-date-parser-formatter';
import { positionElements } from '../util/positioning';
import { ngbFocusTrap } from '../util/focus-trap';
import { Key } from '../util/key';
import { NgbDateAdapter } from './adapters/ngb-date-adapter';
import { NgbCalendar } from './ngb-calendar';
import { NgbDatepickerService } from './datepicker-service';
import { Subject, fromEvent, race, NEVER } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
/** @type {?} */
var NGB_DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return NgbInputDatepicker; }),
    multi: true
};
/** @type {?} */
var NGB_DATEPICKER_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return NgbInputDatepicker; }),
    multi: true
};
/**
 * A directive that makes it possible to have datepickers on input fields.
 * Manages integration with the input field itself (data entry) and ngModel (validation etc.).
 */
var NgbInputDatepicker = /** @class */ (function () {
    function NgbInputDatepicker(_parserFormatter, _elRef, _vcRef, _renderer, _cfr, _ngZone, _service, _calendar, _dateAdapter, _document) {
        var _this = this;
        this._parserFormatter = _parserFormatter;
        this._elRef = _elRef;
        this._vcRef = _vcRef;
        this._renderer = _renderer;
        this._cfr = _cfr;
        this._ngZone = _ngZone;
        this._service = _service;
        this._calendar = _calendar;
        this._dateAdapter = _dateAdapter;
        this._document = _document;
        this._closed$ = new Subject();
        this._cRef = null;
        this._disabled = false;
        /**
         * Indicates whether the datepicker popup should be closed automatically after date selection / outside click or not.
         *
         * By default the popup will close on both date selection and outside click. If the value is 'false' the popup has to
         * be closed manually via '.close()' or '.toggle()' methods. If the value is set to 'inside' the popup will close on
         * date selection only. For the 'outside' the popup will close only on the outside click.
         *
         * \@since 3.0.0
         */
        this.autoClose = true;
        /**
         * Placement of a datepicker popup accepts:
         *    "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right",
         *    "left", "left-top", "left-bottom", "right", "right-top", "right-bottom"
         * and array of above values.
         */
        this.placement = 'bottom-left';
        /**
         * An event fired when user selects a date using keyboard or mouse.
         * The payload of the event is currently selected NgbDate.
         *
         * \@since 1.1.1
         */
        this.dateSelect = new EventEmitter();
        /**
         * An event fired when navigation happens and currently displayed month changes.
         * See NgbDatepickerNavigateEvent for the payload info.
         */
        this.navigate = new EventEmitter();
        this._onChange = function (_) { };
        this._onTouched = function () { };
        this._validatorChange = function () { };
        this._zoneSubscription = _ngZone.onStable.subscribe(function () {
            if (_this._cRef) {
                positionElements(_this._elRef.nativeElement, _this._cRef.location.nativeElement, _this.placement, _this.container === 'body');
            }
        });
    }
    Object.defineProperty(NgbInputDatepicker.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = value === '' || (value && value !== 'false');
            if (this.isOpen()) {
                this._cRef.instance.setDisabledState(this._disabled);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} fn
     * @return {?}
     */
    NgbInputDatepicker.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onChange = fn; };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgbInputDatepicker.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onTouched = fn; };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgbInputDatepicker.prototype.registerOnValidatorChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._validatorChange = fn; };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NgbInputDatepicker.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) { this.disabled = isDisabled; };
    /**
     * @param {?} c
     * @return {?}
     */
    NgbInputDatepicker.prototype.validate = /**
     * @param {?} c
     * @return {?}
     */
    function (c) {
        /** @type {?} */
        var value = c.value;
        if (value === null || value === undefined) {
            return null;
        }
        /** @type {?} */
        var ngbDate = this._fromDateStruct(this._dateAdapter.fromModel(value));
        if (!this._calendar.isValid(ngbDate)) {
            return { 'ngbDate': { invalid: c.value } };
        }
        if (this.minDate && ngbDate.before(NgbDate.from(this.minDate))) {
            return { 'ngbDate': { requiredBefore: this.minDate } };
        }
        if (this.maxDate && ngbDate.after(NgbDate.from(this.maxDate))) {
            return { 'ngbDate': { requiredAfter: this.maxDate } };
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NgbInputDatepicker.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._model = this._fromDateStruct(this._dateAdapter.fromModel(value));
        this._writeModelValue(this._model);
    };
    /**
     * @param {?} value
     * @param {?=} updateView
     * @return {?}
     */
    NgbInputDatepicker.prototype.manualDateChange = /**
     * @param {?} value
     * @param {?=} updateView
     * @return {?}
     */
    function (value, updateView) {
        if (updateView === void 0) { updateView = false; }
        this._model = this._fromDateStruct(this._parserFormatter.parse(value));
        this._onChange(this._model ? this._dateAdapter.toModel(this._model) : (value === '' ? null : value));
        if (updateView && this._model) {
            this._writeModelValue(this._model);
        }
    };
    /**
     * @return {?}
     */
    NgbInputDatepicker.prototype.isOpen = /**
     * @return {?}
     */
    function () { return !!this._cRef; };
    /**
     * Opens the datepicker with the selected date indicated by the ngModel value.
     */
    /**
     * Opens the datepicker with the selected date indicated by the ngModel value.
     * @return {?}
     */
    NgbInputDatepicker.prototype.open = /**
     * Opens the datepicker with the selected date indicated by the ngModel value.
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.isOpen()) {
            /** @type {?} */
            var cf = this._cfr.resolveComponentFactory(NgbDatepicker);
            this._cRef = this._vcRef.createComponent(cf);
            this._applyPopupStyling(this._cRef.location.nativeElement);
            this._applyDatepickerInputs(this._cRef.instance);
            this._subscribeForDatepickerOutputs(this._cRef.instance);
            this._cRef.instance.ngOnInit();
            this._cRef.instance.writeValue(this._dateAdapter.toModel(this._model));
            // date selection event handling
            this._cRef.instance.registerOnChange(function (selectedDate) {
                _this.writeValue(selectedDate);
                _this._onChange(selectedDate);
            });
            this._cRef.changeDetectorRef.detectChanges();
            this._cRef.instance.setDisabledState(this.disabled);
            if (this.container === 'body') {
                window.document.querySelector(this.container).appendChild(this._cRef.location.nativeElement);
            }
            // focus handling
            ngbFocusTrap(this._cRef.location.nativeElement, this._closed$);
            this._cRef.instance.focus();
            // closing on ESC and outside clicks
            this._ngZone.runOutsideAngular(function () {
                /** @type {?} */
                var escapes$ = fromEvent(_this._document, 'keyup')
                    .pipe(takeUntil(_this._closed$), filter(function (e) { return e.which === Key.Escape; }));
                /** @type {?} */
                var outsideClicks$;
                if (_this.autoClose === true || _this.autoClose === 'outside') {
                    /** @type {?} */
                    var isOpening_1 = true;
                    requestAnimationFrame(function () { return isOpening_1 = false; });
                    outsideClicks$ =
                        fromEvent(_this._document, 'click')
                            .pipe(takeUntil(_this._closed$), filter(function (event) { return !isOpening_1 && _this._shouldCloseOnOutsideClick(event); }));
                }
                else {
                    outsideClicks$ = NEVER;
                }
                race([escapes$, outsideClicks$]).subscribe(function () { return _this._ngZone.run(function () { return _this.close(); }); });
            });
        }
    };
    /**
     * Closes the datepicker popup.
     */
    /**
     * Closes the datepicker popup.
     * @return {?}
     */
    NgbInputDatepicker.prototype.close = /**
     * Closes the datepicker popup.
     * @return {?}
     */
    function () {
        if (this.isOpen()) {
            this._vcRef.remove(this._vcRef.indexOf(this._cRef.hostView));
            this._cRef = null;
            this._closed$.next();
        }
    };
    /**
     * Toggles the datepicker popup (opens when closed and closes when opened).
     */
    /**
     * Toggles the datepicker popup (opens when closed and closes when opened).
     * @return {?}
     */
    NgbInputDatepicker.prototype.toggle = /**
     * Toggles the datepicker popup (opens when closed and closes when opened).
     * @return {?}
     */
    function () {
        if (this.isOpen()) {
            this.close();
        }
        else {
            this.open();
        }
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
    NgbInputDatepicker.prototype.navigateTo = /**
     * Navigates current view to provided date.
     * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     * Use 'startDate' input as an alternative
     * @param {?=} date
     * @return {?}
     */
    function (date) {
        if (this.isOpen()) {
            this._cRef.instance.navigateTo(date);
        }
    };
    /**
     * @return {?}
     */
    NgbInputDatepicker.prototype.onBlur = /**
     * @return {?}
     */
    function () { this._onTouched(); };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgbInputDatepicker.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes['minDate'] || changes['maxDate']) {
            this._validatorChange();
        }
    };
    /**
     * @return {?}
     */
    NgbInputDatepicker.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.close();
        this._zoneSubscription.unsubscribe();
    };
    /**
     * @param {?} datepickerInstance
     * @return {?}
     */
    NgbInputDatepicker.prototype._applyDatepickerInputs = /**
     * @param {?} datepickerInstance
     * @return {?}
     */
    function (datepickerInstance) {
        var _this = this;
        ['dayTemplate', 'displayMonths', 'firstDayOfWeek', 'markDisabled', 'minDate', 'maxDate', 'navigation',
            'outsideDays', 'showNavigation', 'showWeekdays', 'showWeekNumbers']
            .forEach(function (optionName) {
            if (_this[optionName] !== undefined) {
                datepickerInstance[optionName] = _this[optionName];
            }
        });
        datepickerInstance.startDate = this.startDate || this._model;
    };
    /**
     * @param {?} nativeElement
     * @return {?}
     */
    NgbInputDatepicker.prototype._applyPopupStyling = /**
     * @param {?} nativeElement
     * @return {?}
     */
    function (nativeElement) {
        this._renderer.addClass(nativeElement, 'dropdown-menu');
        this._renderer.setStyle(nativeElement, 'padding', '0');
        this._renderer.addClass(nativeElement, 'show');
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgbInputDatepicker.prototype._shouldCloseOnOutsideClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return ![this._elRef.nativeElement, this._cRef.location.nativeElement].some(function (el) { return el.contains(event.target); });
    };
    /**
     * @param {?} datepickerInstance
     * @return {?}
     */
    NgbInputDatepicker.prototype._subscribeForDatepickerOutputs = /**
     * @param {?} datepickerInstance
     * @return {?}
     */
    function (datepickerInstance) {
        var _this = this;
        datepickerInstance.navigate.subscribe(function (date) { return _this.navigate.emit(date); });
        datepickerInstance.select.subscribe(function (date) {
            _this.dateSelect.emit(date);
            if (_this.autoClose === true || _this.autoClose === 'inside') {
                _this.close();
            }
        });
    };
    /**
     * @param {?} model
     * @return {?}
     */
    NgbInputDatepicker.prototype._writeModelValue = /**
     * @param {?} model
     * @return {?}
     */
    function (model) {
        this._renderer.setProperty(this._elRef.nativeElement, 'value', this._parserFormatter.format(model));
        if (this.isOpen()) {
            this._cRef.instance.writeValue(this._dateAdapter.toModel(model));
            this._onTouched();
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NgbInputDatepicker.prototype._fromDateStruct = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var ngbDate = date ? new NgbDate(date.year, date.month, date.day) : null;
        return this._calendar.isValid(ngbDate) ? ngbDate : null;
    };
    NgbInputDatepicker.decorators = [
        { type: Directive, args: [{
                    selector: 'input[ngbDatepicker]',
                    exportAs: 'ngbDatepicker',
                    host: {
                        '(input)': 'manualDateChange($event.target.value)',
                        '(change)': 'manualDateChange($event.target.value, true)',
                        '(blur)': 'onBlur()',
                        '[disabled]': 'disabled'
                    },
                    providers: [NGB_DATEPICKER_VALUE_ACCESSOR, NGB_DATEPICKER_VALIDATOR, NgbDatepickerService]
                },] },
    ];
    /** @nocollapse */
    NgbInputDatepicker.ctorParameters = function () { return [
        { type: NgbDateParserFormatter },
        { type: ElementRef },
        { type: ViewContainerRef },
        { type: Renderer2 },
        { type: ComponentFactoryResolver },
        { type: NgZone },
        { type: NgbDatepickerService },
        { type: NgbCalendar },
        { type: NgbDateAdapter },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    NgbInputDatepicker.propDecorators = {
        autoClose: [{ type: Input }],
        dayTemplate: [{ type: Input }],
        displayMonths: [{ type: Input }],
        firstDayOfWeek: [{ type: Input }],
        markDisabled: [{ type: Input }],
        minDate: [{ type: Input }],
        maxDate: [{ type: Input }],
        navigation: [{ type: Input }],
        outsideDays: [{ type: Input }],
        placement: [{ type: Input }],
        showWeekdays: [{ type: Input }],
        showWeekNumbers: [{ type: Input }],
        startDate: [{ type: Input }],
        container: [{ type: Input }],
        dateSelect: [{ type: Output }],
        navigate: [{ type: Output }],
        disabled: [{ type: Input }]
    };
    return NgbInputDatepicker;
}());
export { NgbInputDatepicker };
if (false) {
    /** @type {?} */
    NgbInputDatepicker.prototype._closed$;
    /** @type {?} */
    NgbInputDatepicker.prototype._cRef;
    /** @type {?} */
    NgbInputDatepicker.prototype._disabled;
    /** @type {?} */
    NgbInputDatepicker.prototype._model;
    /** @type {?} */
    NgbInputDatepicker.prototype._zoneSubscription;
    /**
     * Indicates whether the datepicker popup should be closed automatically after date selection / outside click or not.
     *
     * By default the popup will close on both date selection and outside click. If the value is 'false' the popup has to
     * be closed manually via '.close()' or '.toggle()' methods. If the value is set to 'inside' the popup will close on
     * date selection only. For the 'outside' the popup will close only on the outside click.
     *
     * \@since 3.0.0
     * @type {?}
     */
    NgbInputDatepicker.prototype.autoClose;
    /**
     * Reference for the custom template for the day display
     * @type {?}
     */
    NgbInputDatepicker.prototype.dayTemplate;
    /**
     * Number of months to display
     * @type {?}
     */
    NgbInputDatepicker.prototype.displayMonths;
    /**
     * First day of the week. With default calendar we use ISO 8601: 1=Mon ... 7=Sun
     * @type {?}
     */
    NgbInputDatepicker.prototype.firstDayOfWeek;
    /**
     * Callback to mark a given date as disabled.
     * 'Current' contains the month that will be displayed in the view
     * @type {?}
     */
    NgbInputDatepicker.prototype.markDisabled;
    /**
     * Min date for the navigation. If not provided will be 10 years before today or `startDate`
     * @type {?}
     */
    NgbInputDatepicker.prototype.minDate;
    /**
     * Max date for the navigation. If not provided will be 10 years from today or `startDate`
     * @type {?}
     */
    NgbInputDatepicker.prototype.maxDate;
    /**
     * Navigation type: `select` (default with select boxes for month and year), `arrows`
     * (without select boxes, only navigation arrows) or `none` (no navigation at all)
     * @type {?}
     */
    NgbInputDatepicker.prototype.navigation;
    /**
     * The way to display days that don't belong to current month: `visible` (default),
     * `hidden` (not displayed) or `collapsed` (not displayed with empty space collapsed)
     * @type {?}
     */
    NgbInputDatepicker.prototype.outsideDays;
    /**
     * Placement of a datepicker popup accepts:
     *    "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right",
     *    "left", "left-top", "left-bottom", "right", "right-top", "right-bottom"
     * and array of above values.
     * @type {?}
     */
    NgbInputDatepicker.prototype.placement;
    /**
     * Whether to display days of the week
     * @type {?}
     */
    NgbInputDatepicker.prototype.showWeekdays;
    /**
     * Whether to display week numbers
     * @type {?}
     */
    NgbInputDatepicker.prototype.showWeekNumbers;
    /**
     * Date to open calendar with.
     * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided, calendar will open with current month.
     * Use 'navigateTo(date)' as an alternative
     * @type {?}
     */
    NgbInputDatepicker.prototype.startDate;
    /**
     * A selector specifying the element the datepicker popup should be appended to.
     * Currently only supports "body".
     * @type {?}
     */
    NgbInputDatepicker.prototype.container;
    /**
     * An event fired when user selects a date using keyboard or mouse.
     * The payload of the event is currently selected NgbDate.
     *
     * \@since 1.1.1
     * @type {?}
     */
    NgbInputDatepicker.prototype.dateSelect;
    /**
     * An event fired when navigation happens and currently displayed month changes.
     * See NgbDatepickerNavigateEvent for the payload info.
     * @type {?}
     */
    NgbInputDatepicker.prototype.navigate;
    /** @type {?} */
    NgbInputDatepicker.prototype._onChange;
    /** @type {?} */
    NgbInputDatepicker.prototype._onTouched;
    /** @type {?} */
    NgbInputDatepicker.prototype._validatorChange;
    /** @type {?} */
    NgbInputDatepicker.prototype._parserFormatter;
    /** @type {?} */
    NgbInputDatepicker.prototype._elRef;
    /** @type {?} */
    NgbInputDatepicker.prototype._vcRef;
    /** @type {?} */
    NgbInputDatepicker.prototype._renderer;
    /** @type {?} */
    NgbInputDatepicker.prototype._cfr;
    /** @type {?} */
    NgbInputDatepicker.prototype._ngZone;
    /** @type {?} */
    NgbInputDatepicker.prototype._service;
    /** @type {?} */
    NgbInputDatepicker.prototype._calendar;
    /** @type {?} */
    NgbInputDatepicker.prototype._dateAdapter;
    /** @type {?} */
    NgbInputDatepicker.prototype._document;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9kYXRlcGlja2VyLWlucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCxVQUFVLEVBQ1YsZ0JBQWdCLEVBQ2hCLFNBQVMsRUFDVCx3QkFBd0IsRUFDeEIsTUFBTSxFQUNOLFdBQVcsRUFDWCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFJTixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFtRCxpQkFBaUIsRUFBRSxhQUFhLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFekMsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFlBQVksQ0FBQztBQUNuQyxPQUFPLEVBQUMsYUFBYSxFQUE2QixNQUFNLGNBQWMsQ0FBQztBQUV2RSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUVuRSxPQUFPLEVBQUMsZ0JBQWdCLEVBQWlCLE1BQU0scUJBQXFCLENBQUM7QUFDckUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFFaEMsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzNELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUUxRCxPQUFPLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3JELE9BQU8sRUFBQyxNQUFNLEVB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SUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDM0UsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzs7O2dCQXJWM0QsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLFFBQVEsRUFBRSxlQUFlO29CQUN6QixJQUFJLEVBQUU7d0JBQ0osU0FBUyxFQUFFLHVDQUF1Qzt3QkFDbEQsVUFBVSxFQUFFLDZDQUE2Qzt3QkFDekQsUUFBUSxFQUFFLFVBQVU7d0JBQ3BCLFlBQVksRUFBRSxVQUFVO3FCQUN6QjtvQkFDRCxTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsRUFBRSx3QkFBd0IsRUFBRSxvQkFBb0IsQ0FBQztpQkFDM0Y7Ozs7Z0JBdkNPLHNCQUFzQjtnQkFwQjVCLFVBQVU7Z0JBQ1YsZ0JBQWdCO2dCQUNoQixTQUFTO2dCQUNULHdCQUF3QjtnQkFDeEIsTUFBTTtnQkF3QkEsb0JBQW9CO2dCQURwQixXQUFXO2dCQURYLGNBQWM7Z0RBbUs0QixNQUFNLFNBQUMsUUFBUTs7OzRCQWhIOUQsS0FBSzs4QkFLTCxLQUFLO2dDQUtMLEtBQUs7aUNBS0wsS0FBSzsrQkFNTCxLQUFLOzBCQUtMLEtBQUs7MEJBS0wsS0FBSzs2QkFNTCxLQUFLOzhCQU1MLEtBQUs7NEJBUUwsS0FBSzsrQkFLTCxLQUFLO2tDQUtMLEtBQUs7NEJBUUwsS0FBSzs0QkFNTCxLQUFLOzZCQVFMLE1BQU07MkJBTU4sTUFBTTsyQkFFTixLQUFLOzs2QkE1S1I7O1NBZ0VhLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLFxyXG4gIElucHV0LFxyXG4gIENvbXBvbmVudFJlZixcclxuICBFbGVtZW50UmVmLFxyXG4gIFZpZXdDb250YWluZXJSZWYsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICBOZ1pvbmUsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgZm9yd2FyZFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT3V0cHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkRlc3Ryb3ksXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBJbmplY3RcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2wsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBWYWxpZGF0b3IsIE5HX1ZBTFVFX0FDQ0VTU09SLCBOR19WQUxJREFUT1JTfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQge05nYkRhdGV9IGZyb20gJy4vbmdiLWRhdGUnO1xyXG5pbXBvcnQge05nYkRhdGVwaWNrZXIsIE5nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50fSBmcm9tICcuL2RhdGVwaWNrZXInO1xyXG5pbXBvcnQge0RheVRlbXBsYXRlQ29udGV4dH0gZnJvbSAnLi9kYXRlcGlja2VyLWRheS10ZW1wbGF0ZS1jb250ZXh0JztcclxuaW1wb3J0IHtOZ2JEYXRlUGFyc2VyRm9ybWF0dGVyfSBmcm9tICcuL25nYi1kYXRlLXBhcnNlci1mb3JtYXR0ZXInO1xyXG5cclxuaW1wb3J0IHtwb3NpdGlvbkVsZW1lbnRzLCBQbGFjZW1lbnRBcnJheX0gZnJvbSAnLi4vdXRpbC9wb3NpdGlvbmluZyc7XHJcbmltcG9ydCB7bmdiRm9jdXNUcmFwfSBmcm9tICcuLi91dGlsL2ZvY3VzLXRyYXAnO1xyXG5pbXBvcnQge0tleX0gZnJvbSAnLi4vdXRpbC9rZXknO1xyXG5pbXBvcnQge05nYkRhdGVTdHJ1Y3R9IGZyb20gJy4vbmdiLWRhdGUtc3RydWN0JztcclxuaW1wb3J0IHtOZ2JEYXRlQWRhcHRlcn0gZnJvbSAnLi9hZGFwdGVycy9uZ2ItZGF0ZS1hZGFwdGVyJztcclxuaW1wb3J0IHtOZ2JDYWxlbmRhcn0gZnJvbSAnLi9uZ2ItY2FsZW5kYXInO1xyXG5pbXBvcnQge05nYkRhdGVwaWNrZXJTZXJ2aWNlfSBmcm9tICcuL2RhdGVwaWNrZXItc2VydmljZSc7XHJcblxyXG5pbXBvcnQge1N1YmplY3QsIGZyb21FdmVudCwgcmFjZSwgTkVWRVJ9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge2ZpbHRlciwgdGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5jb25zdCBOR0JfREFURVBJQ0tFUl9WQUxVRV9BQ0NFU1NPUiA9IHtcclxuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JJbnB1dERhdGVwaWNrZXIpLFxyXG4gIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5jb25zdCBOR0JfREFURVBJQ0tFUl9WQUxJREFUT1IgPSB7XHJcbiAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JJbnB1dERhdGVwaWNrZXIpLFxyXG4gIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG4vKipcclxuICogQSBkaXJlY3RpdmUgdGhhdCBtYWtlcyBpdCBwb3NzaWJsZSB0byBoYXZlIGRhdGVwaWNrZXJzIG9uIGlucHV0IGZpZWxkcy5cclxuICogTWFuYWdlcyBpbnRlZ3JhdGlvbiB3aXRoIHRoZSBpbnB1dCBmaWVsZCBpdHNlbGYgKGRhdGEgZW50cnkpIGFuZCBuZ01vZGVsICh2YWxpZGF0aW9uIGV0Yy4pLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdpbnB1dFtuZ2JEYXRlcGlja2VyXScsXHJcbiAgZXhwb3J0QXM6ICduZ2JEYXRlcGlja2VyJyxcclxuICBob3N0OiB7XHJcbiAgICAnKGlucHV0KSc6ICdtYW51YWxEYXRlQ2hhbmdlKCRldmVudC50YXJnZXQudmFsdWUpJyxcclxuICAgICcoY2hhbmdlKSc6ICdtYW51YWxEYXRlQ2hhbmdlKCRldmVudC50YXJnZXQudmFsdWUsIHRydWUpJyxcclxuICAgICcoYmx1ciknOiAnb25CbHVyKCknLFxyXG4gICAgJ1tkaXNhYmxlZF0nOiAnZGlzYWJsZWQnXHJcbiAgfSxcclxuICBwcm92aWRlcnM6IFtOR0JfREFURVBJQ0tFUl9WQUxVRV9BQ0NFU1NPUiwgTkdCX0RBVEVQSUNLRVJfVkFMSURBVE9SLCBOZ2JEYXRlcGlja2VyU2VydmljZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYklucHV0RGF0ZXBpY2tlciBpbXBsZW1lbnRzIE9uQ2hhbmdlcyxcclxuICAgIE9uRGVzdHJveSwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIFZhbGlkYXRvciB7XHJcbiAgcHJpdmF0ZSBfY2xvc2VkJCA9IG5ldyBTdWJqZWN0KCk7XHJcbiAgcHJpdmF0ZSBfY1JlZjogQ29tcG9uZW50UmVmPE5nYkRhdGVwaWNrZXI+ID0gbnVsbDtcclxuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xyXG4gIHByaXZhdGUgX21vZGVsOiBOZ2JEYXRlO1xyXG4gIHByaXZhdGUgX3pvbmVTdWJzY3JpcHRpb246IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGRhdGVwaWNrZXIgcG9wdXAgc2hvdWxkIGJlIGNsb3NlZCBhdXRvbWF0aWNhbGx5IGFmdGVyIGRhdGUgc2VsZWN0aW9uIC8gb3V0c2lkZSBjbGljayBvciBub3QuXHJcbiAgICpcclxuICAgKiBCeSBkZWZhdWx0IHRoZSBwb3B1cCB3aWxsIGNsb3NlIG9uIGJvdGggZGF0ZSBzZWxlY3Rpb24gYW5kIG91dHNpZGUgY2xpY2suIElmIHRoZSB2YWx1ZSBpcyAnZmFsc2UnIHRoZSBwb3B1cCBoYXMgdG9cclxuICAgKiBiZSBjbG9zZWQgbWFudWFsbHkgdmlhICcuY2xvc2UoKScgb3IgJy50b2dnbGUoKScgbWV0aG9kcy4gSWYgdGhlIHZhbHVlIGlzIHNldCB0byAnaW5zaWRlJyB0aGUgcG9wdXAgd2lsbCBjbG9zZSBvblxyXG4gICAqIGRhdGUgc2VsZWN0aW9uIG9ubHkuIEZvciB0aGUgJ291dHNpZGUnIHRoZSBwb3B1cCB3aWxsIGNsb3NlIG9ubHkgb24gdGhlIG91dHNpZGUgY2xpY2suXHJcbiAgICpcclxuICAgKiBAc2luY2UgMy4wLjBcclxuICAgKi9cclxuICBASW5wdXQoKSBhdXRvQ2xvc2U6IGJvb2xlYW4gfCAnaW5zaWRlJyB8ICdvdXRzaWRlJyA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZmVyZW5jZSBmb3IgdGhlIGN1c3RvbSB0ZW1wbGF0ZSBmb3IgdGhlIGRheSBkaXNwbGF5XHJcbiAgICovXHJcbiAgQElucHV0KCkgZGF5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPERheVRlbXBsYXRlQ29udGV4dD47XHJcblxyXG4gIC8qKlxyXG4gICAqIE51bWJlciBvZiBtb250aHMgdG8gZGlzcGxheVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRpc3BsYXlNb250aHM6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogRmlyc3QgZGF5IG9mIHRoZSB3ZWVrLiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAxPU1vbiAuLi4gNz1TdW5cclxuICAgKi9cclxuICBASW5wdXQoKSBmaXJzdERheU9mV2VlazogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBDYWxsYmFjayB0byBtYXJrIGEgZ2l2ZW4gZGF0ZSBhcyBkaXNhYmxlZC5cclxuICAgKiAnQ3VycmVudCcgY29udGFpbnMgdGhlIG1vbnRoIHRoYXQgd2lsbCBiZSBkaXNwbGF5ZWQgaW4gdGhlIHZpZXdcclxuICAgKi9cclxuICBASW5wdXQoKSBtYXJrRGlzYWJsZWQ6IChkYXRlOiBOZ2JEYXRlLCBjdXJyZW50OiB7eWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyfSkgPT4gYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogTWluIGRhdGUgZm9yIHRoZSBuYXZpZ2F0aW9uLiBJZiBub3QgcHJvdmlkZWQgd2lsbCBiZSAxMCB5ZWFycyBiZWZvcmUgdG9kYXkgb3IgYHN0YXJ0RGF0ZWBcclxuICAgKi9cclxuICBASW5wdXQoKSBtaW5EYXRlOiBOZ2JEYXRlU3RydWN0O1xyXG5cclxuICAvKipcclxuICAgKiBNYXggZGF0ZSBmb3IgdGhlIG5hdmlnYXRpb24uIElmIG5vdCBwcm92aWRlZCB3aWxsIGJlIDEwIHllYXJzIGZyb20gdG9kYXkgb3IgYHN0YXJ0RGF0ZWBcclxuICAgKi9cclxuICBASW5wdXQoKSBtYXhEYXRlOiBOZ2JEYXRlU3RydWN0O1xyXG5cclxuICAvKipcclxuICAgKiBOYXZpZ2F0aW9uIHR5cGU6IGBzZWxlY3RgIChkZWZhdWx0IHdpdGggc2VsZWN0IGJveGVzIGZvciBtb250aCBhbmQgeWVhciksIGBhcnJvd3NgXHJcbiAgICogKHdpdGhvdXQgc2VsZWN0IGJveGVzLCBvbmx5IG5hdmlnYXRpb24gYXJyb3dzKSBvciBgbm9uZWAgKG5vIG5hdmlnYXRpb24gYXQgYWxsKVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG5hdmlnYXRpb246ICdzZWxlY3QnIHwgJ2Fycm93cycgfCAnbm9uZSc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB3YXkgdG8gZGlzcGxheSBkYXlzIHRoYXQgZG9uJ3QgYmVsb25nIHRvIGN1cnJlbnQgbW9udGg6IGB2aXNpYmxlYCAoZGVmYXVsdCksXHJcbiAgICogYGhpZGRlbmAgKG5vdCBkaXNwbGF5ZWQpIG9yIGBjb2xsYXBzZWRgIChub3QgZGlzcGxheWVkIHdpdGggZW1wdHkgc3BhY2UgY29sbGFwc2VkKVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG91dHNpZGVEYXlzOiAndmlzaWJsZScgfCAnY29sbGFwc2VkJyB8ICdoaWRkZW4nO1xyXG5cclxuICAvKipcclxuICAgKiBQbGFjZW1lbnQgb2YgYSBkYXRlcGlja2VyIHBvcHVwIGFjY2VwdHM6XHJcbiAgICogICAgXCJ0b3BcIiwgXCJ0b3AtbGVmdFwiLCBcInRvcC1yaWdodFwiLCBcImJvdHRvbVwiLCBcImJvdHRvbS1sZWZ0XCIsIFwiYm90dG9tLXJpZ2h0XCIsXHJcbiAgICogICAgXCJsZWZ0XCIsIFwibGVmdC10b3BcIiwgXCJsZWZ0LWJvdHRvbVwiLCBcInJpZ2h0XCIsIFwicmlnaHQtdG9wXCIsIFwicmlnaHQtYm90dG9tXCJcclxuICAgKiBhbmQgYXJyYXkgb2YgYWJvdmUgdmFsdWVzLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXkgPSAnYm90dG9tLWxlZnQnO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRvIGRpc3BsYXkgZGF5cyBvZiB0aGUgd2Vla1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNob3dXZWVrZGF5czogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0byBkaXNwbGF5IHdlZWsgbnVtYmVyc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNob3dXZWVrTnVtYmVyczogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogRGF0ZSB0byBvcGVuIGNhbGVuZGFyIHdpdGguXHJcbiAgICogV2l0aCBkZWZhdWx0IGNhbGVuZGFyIHdlIHVzZSBJU08gODYwMTogJ21vbnRoJyBpcyAxPUphbiAuLi4gMTI9RGVjLlxyXG4gICAqIElmIG5vdGhpbmcgb3IgaW52YWxpZCBkYXRlIHByb3ZpZGVkLCBjYWxlbmRhciB3aWxsIG9wZW4gd2l0aCBjdXJyZW50IG1vbnRoLlxyXG4gICAqIFVzZSAnbmF2aWdhdGVUbyhkYXRlKScgYXMgYW4gYWx0ZXJuYXRpdmVcclxuICAgKi9cclxuICBASW5wdXQoKSBzdGFydERhdGU6IHt5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXJ9O1xyXG5cclxuICAvKipcclxuICAgKiBBIHNlbGVjdG9yIHNwZWNpZnlpbmcgdGhlIGVsZW1lbnQgdGhlIGRhdGVwaWNrZXIgcG9wdXAgc2hvdWxkIGJlIGFwcGVuZGVkIHRvLlxyXG4gICAqIEN1cnJlbnRseSBvbmx5IHN1cHBvcnRzIFwiYm9keVwiLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNvbnRhaW5lcjogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBBbiBldmVudCBmaXJlZCB3aGVuIHVzZXIgc2VsZWN0cyBhIGRhdGUgdXNpbmcga2V5Ym9hcmQgb3IgbW91c2UuXHJcbiAgICogVGhlIHBheWxvYWQgb2YgdGhlIGV2ZW50IGlzIGN1cnJlbnRseSBzZWxlY3RlZCBOZ2JEYXRlLlxyXG4gICAqXHJcbiAgICogQHNpbmNlIDEuMS4xXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGRhdGVTZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYkRhdGU+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIGV2ZW50IGZpcmVkIHdoZW4gbmF2aWdhdGlvbiBoYXBwZW5zIGFuZCBjdXJyZW50bHkgZGlzcGxheWVkIG1vbnRoIGNoYW5nZXMuXHJcbiAgICogU2VlIE5nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50IGZvciB0aGUgcGF5bG9hZCBpbmZvLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBuYXZpZ2F0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiRGF0ZXBpY2tlck5hdmlnYXRlRXZlbnQ+KCk7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGRpc2FibGVkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xyXG4gIH1cclxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGFueSkge1xyXG4gICAgdGhpcy5fZGlzYWJsZWQgPSB2YWx1ZSA9PT0gJycgfHwgKHZhbHVlICYmIHZhbHVlICE9PSAnZmFsc2UnKTtcclxuXHJcbiAgICBpZiAodGhpcy5pc09wZW4oKSkge1xyXG4gICAgICB0aGlzLl9jUmVmLmluc3RhbmNlLnNldERpc2FibGVkU3RhdGUodGhpcy5fZGlzYWJsZWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcclxuICBwcml2YXRlIF9vblRvdWNoZWQgPSAoKSA9PiB7fTtcclxuICBwcml2YXRlIF92YWxpZGF0b3JDaGFuZ2UgPSAoKSA9PiB7fTtcclxuXHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcml2YXRlIF9wYXJzZXJGb3JtYXR0ZXI6IE5nYkRhdGVQYXJzZXJGb3JtYXR0ZXIsIHByaXZhdGUgX2VsUmVmOiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+LFxyXG4gICAgICBwcml2YXRlIF92Y1JlZjogVmlld0NvbnRhaW5lclJlZiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBfY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLCBwcml2YXRlIF9zZXJ2aWNlOiBOZ2JEYXRlcGlja2VyU2VydmljZSwgcHJpdmF0ZSBfY2FsZW5kYXI6IE5nYkNhbGVuZGFyLFxyXG4gICAgICBwcml2YXRlIF9kYXRlQWRhcHRlcjogTmdiRGF0ZUFkYXB0ZXI8YW55PiwgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSkge1xyXG4gICAgdGhpcy5fem9uZVN1YnNjcmlwdGlvbiA9IF9uZ1pvbmUub25TdGFibGUuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuX2NSZWYpIHtcclxuICAgICAgICBwb3NpdGlvbkVsZW1lbnRzKFxyXG4gICAgICAgICAgICB0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLl9jUmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsIHRoaXMucGxhY2VtZW50LCB0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gYW55KTogdm9pZCB7IHRoaXMuX29uQ2hhbmdlID0gZm47IH1cclxuXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IGFueSk6IHZvaWQgeyB0aGlzLl9vblRvdWNoZWQgPSBmbjsgfVxyXG5cclxuICByZWdpc3Rlck9uVmFsaWRhdG9yQ2hhbmdlKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7IHRoaXMuX3ZhbGlkYXRvckNoYW5nZSA9IGZuOyB9XHJcblxyXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQgeyB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDsgfVxyXG5cclxuICB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IGMudmFsdWU7XHJcblxyXG4gICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbmdiRGF0ZSA9IHRoaXMuX2Zyb21EYXRlU3RydWN0KHRoaXMuX2RhdGVBZGFwdGVyLmZyb21Nb2RlbCh2YWx1ZSkpO1xyXG5cclxuICAgIGlmICghdGhpcy5fY2FsZW5kYXIuaXNWYWxpZChuZ2JEYXRlKSkge1xyXG4gICAgICByZXR1cm4geyduZ2JEYXRlJzoge2ludmFsaWQ6IGMudmFsdWV9fTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5taW5EYXRlICYmIG5nYkRhdGUuYmVmb3JlKE5nYkRhdGUuZnJvbSh0aGlzLm1pbkRhdGUpKSkge1xyXG4gICAgICByZXR1cm4geyduZ2JEYXRlJzoge3JlcXVpcmVkQmVmb3JlOiB0aGlzLm1pbkRhdGV9fTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5tYXhEYXRlICYmIG5nYkRhdGUuYWZ0ZXIoTmdiRGF0ZS5mcm9tKHRoaXMubWF4RGF0ZSkpKSB7XHJcbiAgICAgIHJldHVybiB7J25nYkRhdGUnOiB7cmVxdWlyZWRBZnRlcjogdGhpcy5tYXhEYXRlfX07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB3cml0ZVZhbHVlKHZhbHVlKSB7XHJcbiAgICB0aGlzLl9tb2RlbCA9IHRoaXMuX2Zyb21EYXRlU3RydWN0KHRoaXMuX2RhdGVBZGFwdGVyLmZyb21Nb2RlbCh2YWx1ZSkpO1xyXG4gICAgdGhpcy5fd3JpdGVNb2RlbFZhbHVlKHRoaXMuX21vZGVsKTtcclxuICB9XHJcblxyXG4gIG1hbnVhbERhdGVDaGFuZ2UodmFsdWU6IHN0cmluZywgdXBkYXRlVmlldyA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLl9tb2RlbCA9IHRoaXMuX2Zyb21EYXRlU3RydWN0KHRoaXMuX3BhcnNlckZvcm1hdHRlci5wYXJzZSh2YWx1ZSkpO1xyXG4gICAgdGhpcy5fb25DaGFuZ2UodGhpcy5fbW9kZWwgPyB0aGlzLl9kYXRlQWRhcHRlci50b01vZGVsKHRoaXMuX21vZGVsKSA6ICh2YWx1ZSA9PT0gJycgPyBudWxsIDogdmFsdWUpKTtcclxuICAgIGlmICh1cGRhdGVWaWV3ICYmIHRoaXMuX21vZGVsKSB7XHJcbiAgICAgIHRoaXMuX3dyaXRlTW9kZWxWYWx1ZSh0aGlzLl9tb2RlbCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc09wZW4oKSB7IHJldHVybiAhIXRoaXMuX2NSZWY7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogT3BlbnMgdGhlIGRhdGVwaWNrZXIgd2l0aCB0aGUgc2VsZWN0ZWQgZGF0ZSBpbmRpY2F0ZWQgYnkgdGhlIG5nTW9kZWwgdmFsdWUuXHJcbiAgICovXHJcbiAgb3BlbigpIHtcclxuICAgIGlmICghdGhpcy5pc09wZW4oKSkge1xyXG4gICAgICBjb25zdCBjZiA9IHRoaXMuX2Nmci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShOZ2JEYXRlcGlja2VyKTtcclxuICAgICAgdGhpcy5fY1JlZiA9IHRoaXMuX3ZjUmVmLmNyZWF0ZUNvbXBvbmVudChjZik7XHJcblxyXG4gICAgICB0aGlzLl9hcHBseVBvcHVwU3R5bGluZyh0aGlzLl9jUmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICB0aGlzLl9hcHBseURhdGVwaWNrZXJJbnB1dHModGhpcy5fY1JlZi5pbnN0YW5jZSk7XHJcbiAgICAgIHRoaXMuX3N1YnNjcmliZUZvckRhdGVwaWNrZXJPdXRwdXRzKHRoaXMuX2NSZWYuaW5zdGFuY2UpO1xyXG4gICAgICB0aGlzLl9jUmVmLmluc3RhbmNlLm5nT25Jbml0KCk7XHJcbiAgICAgIHRoaXMuX2NSZWYuaW5zdGFuY2Uud3JpdGVWYWx1ZSh0aGlzLl9kYXRlQWRhcHRlci50b01vZGVsKHRoaXMuX21vZGVsKSk7XHJcblxyXG4gICAgICAvLyBkYXRlIHNlbGVjdGlvbiBldmVudCBoYW5kbGluZ1xyXG4gICAgICB0aGlzLl9jUmVmLmluc3RhbmNlLnJlZ2lzdGVyT25DaGFuZ2UoKHNlbGVjdGVkRGF0ZSkgPT4ge1xyXG4gICAgICAgIHRoaXMud3JpdGVWYWx1ZShzZWxlY3RlZERhdGUpO1xyXG4gICAgICAgIHRoaXMuX29uQ2hhbmdlKHNlbGVjdGVkRGF0ZSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5fY1JlZi5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcblxyXG4gICAgICB0aGlzLl9jUmVmLmluc3RhbmNlLnNldERpc2FibGVkU3RhdGUodGhpcy5kaXNhYmxlZCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5jb250YWluZXIgPT09ICdib2R5Jykge1xyXG4gICAgICAgIHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuY29udGFpbmVyKS5hcHBlbmRDaGlsZCh0aGlzLl9jUmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBmb2N1cyBoYW5kbGluZ1xyXG4gICAgICBuZ2JGb2N1c1RyYXAodGhpcy5fY1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LCB0aGlzLl9jbG9zZWQkKTtcclxuXHJcbiAgICAgIHRoaXMuX2NSZWYuaW5zdGFuY2UuZm9jdXMoKTtcclxuXHJcbiAgICAgIC8vIGNsb3Npbmcgb24gRVNDIGFuZCBvdXRzaWRlIGNsaWNrc1xyXG4gICAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG5cclxuICAgICAgICBjb25zdCBlc2NhcGVzJCA9IGZyb21FdmVudDxLZXlib2FyZEV2ZW50Pih0aGlzLl9kb2N1bWVudCwgJ2tleXVwJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fY2xvc2VkJCksIGZpbHRlcihlID0+IGUud2hpY2ggPT09IEtleS5Fc2NhcGUpKTtcclxuXHJcbiAgICAgICAgbGV0IG91dHNpZGVDbGlja3MkO1xyXG4gICAgICAgIGlmICh0aGlzLmF1dG9DbG9zZSA9PT0gdHJ1ZSB8fCB0aGlzLmF1dG9DbG9zZSA9PT0gJ291dHNpZGUnKSB7XHJcbiAgICAgICAgICAvLyB3ZSBkb24ndCBrbm93IGhvdyB0aGUgcG9wdXAgd2FzIG9wZW5lZCwgc28gaWYgaXQgd2FzIG9wZW5lZCB3aXRoIGEgY2xpY2ssXHJcbiAgICAgICAgICAvLyB3ZSBoYXZlIHRvIHNraXAgdGhlIGZpcnN0IG9uZSB0byBhdm9pZCBjbG9zaW5nIGl0IGltbWVkaWF0ZWx5XHJcbiAgICAgICAgICBsZXQgaXNPcGVuaW5nID0gdHJ1ZTtcclxuICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBpc09wZW5pbmcgPSBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgb3V0c2lkZUNsaWNrcyQgPVxyXG4gICAgICAgICAgICAgIGZyb21FdmVudDxNb3VzZUV2ZW50Pih0aGlzLl9kb2N1bWVudCwgJ2NsaWNrJylcclxuICAgICAgICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICB0YWtlVW50aWwodGhpcy5fY2xvc2VkJCksIGZpbHRlcihldmVudCA9PiAhaXNPcGVuaW5nICYmIHRoaXMuX3Nob3VsZENsb3NlT25PdXRzaWRlQ2xpY2soZXZlbnQpKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG91dHNpZGVDbGlja3MkID0gTkVWRVI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByYWNlPEV2ZW50PihbZXNjYXBlcyQsIG91dHNpZGVDbGlja3MkXSkuc3Vic2NyaWJlKCgpID0+IHRoaXMuX25nWm9uZS5ydW4oKCkgPT4gdGhpcy5jbG9zZSgpKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xvc2VzIHRoZSBkYXRlcGlja2VyIHBvcHVwLlxyXG4gICAqL1xyXG4gIGNsb3NlKCkge1xyXG4gICAgaWYgKHRoaXMuaXNPcGVuKCkpIHtcclxuICAgICAgdGhpcy5fdmNSZWYucmVtb3ZlKHRoaXMuX3ZjUmVmLmluZGV4T2YodGhpcy5fY1JlZi5ob3N0VmlldykpO1xyXG4gICAgICB0aGlzLl9jUmVmID0gbnVsbDtcclxuICAgICAgdGhpcy5fY2xvc2VkJC5uZXh0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUb2dnbGVzIHRoZSBkYXRlcGlja2VyIHBvcHVwIChvcGVucyB3aGVuIGNsb3NlZCBhbmQgY2xvc2VzIHdoZW4gb3BlbmVkKS5cclxuICAgKi9cclxuICB0b2dnbGUoKSB7XHJcbiAgICBpZiAodGhpcy5pc09wZW4oKSkge1xyXG4gICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm9wZW4oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE5hdmlnYXRlcyBjdXJyZW50IHZpZXcgdG8gcHJvdmlkZWQgZGF0ZS5cclxuICAgKiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnbW9udGgnIGlzIDE9SmFuIC4uLiAxMj1EZWMuXHJcbiAgICogSWYgbm90aGluZyBvciBpbnZhbGlkIGRhdGUgcHJvdmlkZWQgY2FsZW5kYXIgd2lsbCBvcGVuIGN1cnJlbnQgbW9udGguXHJcbiAgICogVXNlICdzdGFydERhdGUnIGlucHV0IGFzIGFuIGFsdGVybmF0aXZlXHJcbiAgICovXHJcbiAgbmF2aWdhdGVUbyhkYXRlPzoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn0pIHtcclxuICAgIGlmICh0aGlzLmlzT3BlbigpKSB7XHJcbiAgICAgIHRoaXMuX2NSZWYuaW5zdGFuY2UubmF2aWdhdGVUbyhkYXRlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uQmx1cigpIHsgdGhpcy5fb25Ub3VjaGVkKCk7IH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKGNoYW5nZXNbJ21pbkRhdGUnXSB8fCBjaGFuZ2VzWydtYXhEYXRlJ10pIHtcclxuICAgICAgdGhpcy5fdmFsaWRhdG9yQ2hhbmdlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2FwcGx5RGF0ZXBpY2tlcklucHV0cyhkYXRlcGlja2VySW5zdGFuY2U6IE5nYkRhdGVwaWNrZXIpOiB2b2lkIHtcclxuICAgIFsnZGF5VGVtcGxhdGUnLCAnZGlzcGxheU1vbnRocycsICdmaXJzdERheU9mV2VlaycsICdtYXJrRGlzYWJsZWQnLCAnbWluRGF0ZScsICdtYXhEYXRlJywgJ25hdmlnYXRpb24nLFxyXG4gICAgICdvdXRzaWRlRGF5cycsICdzaG93TmF2aWdhdGlvbicsICdzaG93V2Vla2RheXMnLCAnc2hvd1dlZWtOdW1iZXJzJ11cclxuICAgICAgICAuZm9yRWFjaCgob3B0aW9uTmFtZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICBpZiAodGhpc1tvcHRpb25OYW1lXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGRhdGVwaWNrZXJJbnN0YW5jZVtvcHRpb25OYW1lXSA9IHRoaXNbb3B0aW9uTmFtZV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICBkYXRlcGlja2VySW5zdGFuY2Uuc3RhcnREYXRlID0gdGhpcy5zdGFydERhdGUgfHwgdGhpcy5fbW9kZWw7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9hcHBseVBvcHVwU3R5bGluZyhuYXRpdmVFbGVtZW50OiBhbnkpIHtcclxuICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKG5hdGl2ZUVsZW1lbnQsICdkcm9wZG93bi1tZW51Jyk7XHJcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShuYXRpdmVFbGVtZW50LCAncGFkZGluZycsICcwJyk7XHJcbiAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhuYXRpdmVFbGVtZW50LCAnc2hvdycpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc2hvdWxkQ2xvc2VPbk91dHNpZGVDbGljayhldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgcmV0dXJuICFbdGhpcy5fZWxSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5fY1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50XS5zb21lKGVsID0+IGVsLmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc3Vic2NyaWJlRm9yRGF0ZXBpY2tlck91dHB1dHMoZGF0ZXBpY2tlckluc3RhbmNlOiBOZ2JEYXRlcGlja2VyKSB7XHJcbiAgICBkYXRlcGlja2VySW5zdGFuY2UubmF2aWdhdGUuc3Vic2NyaWJlKGRhdGUgPT4gdGhpcy5uYXZpZ2F0ZS5lbWl0KGRhdGUpKTtcclxuICAgIGRhdGVwaWNrZXJJbnN0YW5jZS5zZWxlY3Quc3Vic2NyaWJlKGRhdGUgPT4ge1xyXG4gICAgICB0aGlzLmRhdGVTZWxlY3QuZW1pdChkYXRlKTtcclxuICAgICAgaWYgKHRoaXMuYXV0b0Nsb3NlID09PSB0cnVlIHx8IHRoaXMuYXV0b0Nsb3NlID09PSAnaW5zaWRlJykge1xyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF93cml0ZU1vZGVsVmFsdWUobW9kZWw6IE5nYkRhdGUpIHtcclxuICAgIHRoaXMuX3JlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuX2VsUmVmLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIHRoaXMuX3BhcnNlckZvcm1hdHRlci5mb3JtYXQobW9kZWwpKTtcclxuICAgIGlmICh0aGlzLmlzT3BlbigpKSB7XHJcbiAgICAgIHRoaXMuX2NSZWYuaW5zdGFuY2Uud3JpdGVWYWx1ZSh0aGlzLl9kYXRlQWRhcHRlci50b01vZGVsKG1vZGVsKSk7XHJcbiAgICAgIHRoaXMuX29uVG91Y2hlZCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZnJvbURhdGVTdHJ1Y3QoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IE5nYkRhdGUge1xyXG4gICAgY29uc3QgbmdiRGF0ZSA9IGRhdGUgPyBuZXcgTmdiRGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGgsIGRhdGUuZGF5KSA6IG51bGw7XHJcbiAgICByZXR1cm4gdGhpcy5fY2FsZW5kYXIuaXNWYWxpZChuZ2JEYXRlKSA/IG5nYkRhdGUgOiBudWxsO1xyXG4gIH1cclxufVxyXG4iXX0=