/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, TemplateRef, ContentChild, forwardRef, ChangeDetectorRef } from '@angular/core';
import { NgbRatingConfig } from './rating-config';
import { toString, getValueInRange } from '../util/util';
import { Key } from '../util/key';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
/**
 * Context for the custom star display template
 * @record
 */
export function StarTemplateContext() { }
/**
 * Star fill percentage. An integer value between 0 and 100
 * @type {?}
 */
StarTemplateContext.prototype.fill;
/**
 * Index of the star.
 * @type {?}
 */
StarTemplateContext.prototype.index;
/** @type {?} */
var NGB_RATING_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return NgbRating; }),
    multi: true
};
/**
 * Rating directive that will take care of visualising a star rating bar.
 */
var NgbRating = /** @class */ (function () {
    function NgbRating(config, _changeDetectorRef) {
        this._changeDetectorRef = _changeDetectorRef;
        this.contexts = [];
        this.disabled = false;
        /**
         * An event fired when a user is hovering over a given rating.
         * Event's payload equals to the rating being hovered over.
         */
        this.hover = new EventEmitter();
        /**
         * An event fired when a user stops hovering over a given rating.
         * Event's payload equals to the rating of the last item being hovered over.
         */
        this.leave = new EventEmitter();
        /**
         * An event fired when a user selects a new rating.
         * Event's payload equals to the newly selected rating.
         */
        this.rateChange = new EventEmitter(true);
        this.onChange = function (_) { };
        this.onTouched = function () { };
        this.max = config.max;
        this.readonly = config.readonly;
    }
    /**
     * @return {?}
     */
    NgbRating.prototype.ariaValueText = /**
     * @return {?}
     */
    function () { return this.nextRate + " out of " + this.max; };
    /**
     * @param {?} value
     * @return {?}
     */
    NgbRating.prototype.enter = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this.readonly && !this.disabled) {
            this._updateState(value);
        }
        this.hover.emit(value);
    };
    /**
     * @return {?}
     */
    NgbRating.prototype.handleBlur = /**
     * @return {?}
     */
    function () { this.onTouched(); };
    /**
     * @param {?} value
     * @return {?}
     */
    NgbRating.prototype.handleClick = /**
     * @param {?} value
     * @return {?}
     */
    function (value) { this.update(this.resettable && this.rate === value ? 0 : value); };
    /**
     * @param {?} event
     * @return {?}
     */
    NgbRating.prototype.handleKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (Key[toString(event.which)]) {
            event.preventDefault();
            switch (event.which) {
                case Key.ArrowDown:
                case Key.ArrowLeft:
                    this.update(this.rate - 1);
                    break;
                case Key.ArrowUp:
                case Key.ArrowRight:
                    this.update(this.rate + 1);
                    break;
                case Key.Home:
                    this.update(0);
                    break;
                case Key.End:
                    this.update(this.max);
                    break;
            }
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgbRating.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes['rate']) {
            this.update(this.rate);
        }
    };
    /**
     * @return {?}
     */
    NgbRating.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.contexts = Array.from({ length: this.max }, function (v, k) { return ({ fill: 0, index: k }); });
        this._updateState(this.rate);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgbRating.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onChange = fn; };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgbRating.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onTouched = fn; };
    /**
     * @return {?}
     */
    NgbRating.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.leave.emit(this.nextRate);
        this._updateState(this.rate);
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NgbRating.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) { this.disabled = isDisabled; };
    /**
     * @param {?} value
     * @param {?=} internalChange
     * @return {?}
     */
    NgbRating.prototype.update = /**
     * @param {?} value
     * @param {?=} internalChange
     * @return {?}
     */
    function (value, internalChange) {
        if (internalChange === void 0) { internalChange = true; }
        /** @type {?} */
        var newRate = getValueInRange(value, this.max, 0);
        if (!this.readonly && !this.disabled && this.rate !== newRate) {
            this.rate = newRate;
            this.rateChange.emit(this.rate);
        }
        if (internalChange) {
            this.onChange(this.rate);
            this.onTouched();
        }
        this._updateState(this.rate);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NgbRating.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.update(value, false);
        this._changeDetectorRef.markForCheck();
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NgbRating.prototype._getFillValue = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var diff = this.nextRate - index;
        if (diff >= 1) {
            return 100;
        }
        if (diff < 1 && diff > 0) {
            return Number.parseInt((diff * 100).toFixed(2));
        }
        return 0;
    };
    /**
     * @param {?} nextValue
     * @return {?}
     */
    NgbRating.prototype._updateState = /**
     * @param {?} nextValue
     * @return {?}
     */
    function (nextValue) {
        var _this = this;
        this.nextRate = nextValue;
        this.contexts.forEach(function (context, index) { return context.fill = _this._getFillValue(index); });
    };
    NgbRating.decorators = [
        { type: Component, args: [{
                    selector: 'ngb-rating',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        'class': 'd-inline-flex',
                        'tabindex': '0',
                        'role': 'slider',
                        'aria-valuemin': '0',
                        '[attr.aria-valuemax]': 'max',
                        '[attr.aria-valuenow]': 'nextRate',
                        '[attr.aria-valuetext]': 'ariaValueText()',
                        '[attr.aria-disabled]': 'readonly ? true : null',
                        '(blur)': 'handleBlur()',
                        '(keydown)': 'handleKeyDown($event)',
                        '(mouseleave)': 'reset()'
                    },
                    template: "\n    <ng-template #t let-fill=\"fill\">{{ fill === 100 ? '&#9733;' : '&#9734;' }}</ng-template>\n    <ng-template ngFor [ngForOf]=\"contexts\" let-index=\"index\">\n      <span class=\"sr-only\">({{ index < nextRate ? '*' : ' ' }})</span>\n      <span (mouseenter)=\"enter(index + 1)\" (click)=\"handleClick(index + 1)\" [style.cursor]=\"readonly || disabled ? 'default' : 'pointer'\">\n        <ng-template [ngTemplateOutlet]=\"starTemplate || t\" [ngTemplateOutletContext]=\"contexts[index]\"></ng-template>\n      </span>\n    </ng-template>\n  ",
                    providers: [NGB_RATING_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    NgbRating.ctorParameters = function () { return [
        { type: NgbRatingConfig },
        { type: ChangeDetectorRef }
    ]; };
    NgbRating.propDecorators = {
        max: [{ type: Input }],
        rate: [{ type: Input }],
        readonly: [{ type: Input }],
        resettable: [{ type: Input }],
        starTemplate: [{ type: Input }, { type: ContentChild, args: [TemplateRef,] }],
        hover: [{ type: Output }],
        leave: [{ type: Output }],
        rateChange: [{ type: Output }]
    };
    return NgbRating;
}());
export { NgbRating };
if (false) {
    /** @type {?} */
    NgbRating.prototype.contexts;
    /** @type {?} */
    NgbRating.prototype.disabled;
    /** @type {?} */
    NgbRating.prototype.nextRate;
    /**
     * Maximal rating that can be given using this widget.
     * @type {?}
     */
    NgbRating.prototype.max;
    /**
     * Current rating. Can be a decimal value like 3.75
     * @type {?}
     */
    NgbRating.prototype.rate;
    /**
     * A flag indicating if rating can be updated.
     * @type {?}
     */
    NgbRating.prototype.readonly;
    /**
     * A flag indicating if rating can be reset to 0 on mouse click
     * @type {?}
     */
    NgbRating.prototype.resettable;
    /**
     * A template to override star display.
     * Alternatively put a <ng-template> as the only child of <ngb-rating> element
     * @type {?}
     */
    NgbRating.prototype.starTemplate;
    /**
     * An event fired when a user is hovering over a given rating.
     * Event's payload equals to the rating being hovered over.
     * @type {?}
     */
    NgbRating.prototype.hover;
    /**
     * An event fired when a user stops hovering over a given rating.
     * Event's payload equals to the rating of the last item being hovered over.
     * @type {?}
     */
    NgbRating.prototype.leave;
    /**
     * An event fired when a user selects a new rating.
     * Event's payload equals to the newly selected rating.
     * @type {?}
     */
    NgbRating.prototype.rateChange;
    /** @type {?} */
    NgbRating.prototype.onChange;
    /** @type {?} */
    NgbRating.prototype.onTouched;
    /** @type {?} */
    NgbRating.prototype._changeDetectorRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJyYXRpbmcvcmF0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULHVCQUF1QixFQUN2QixLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFFWixXQUFXLEVBR1gsWUFBWSxFQUNaLFVBQVUsRUFDVixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxRQUFRLEVBQUUsZUFBZSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDaEMsT0FBTyxFQUF1QixpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCdkUsSUFBTSx5QkFBeUIsR0FBRztJQUNoQyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLFNBQVMsRUFBVCxDQUFTLENBQUM7SUFDeEMsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDOzs7OztJQXNGQSxtQkFBWSxNQUF1QixFQUFVLGtCQUFxQztRQUFyQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO3dCQXBEaEQsRUFBRTt3QkFDekIsS0FBSzs7Ozs7cUJBa0NFLElBQUksWUFBWSxFQUFVOzs7OztxQkFNMUIsSUFBSSxZQUFZLEVBQVU7Ozs7OzBCQU1yQixJQUFJLFlBQVksQ0FBUyxJQUFJLENBQUM7d0JBRTFDLFVBQUMsQ0FBTSxLQUFPO3lCQUNiLGVBQVE7UUFHbEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztL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LFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO2lCQUN2Qzs7OztnQkF2RE8sZUFBZTtnQkFGckIsaUJBQWlCOzs7c0JBb0VoQixLQUFLO3VCQUtMLEtBQUs7MkJBS0wsS0FBSzs2QkFLTCxLQUFLOytCQU1MLEtBQUssWUFBSSxZQUFZLFNBQUMsV0FBVzt3QkFNakMsTUFBTTt3QkFNTixNQUFNOzZCQU1OLE1BQU07O29CQXZIVDs7U0FzRWEsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT25Jbml0LFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIE9uQ2hhbmdlcyxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIENvbnRlbnRDaGlsZCxcclxuICBmb3J3YXJkUmVmLFxyXG4gIENoYW5nZURldGVjdG9yUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TmdiUmF0aW5nQ29uZmlnfSBmcm9tICcuL3JhdGluZy1jb25maWcnO1xyXG5pbXBvcnQge3RvU3RyaW5nLCBnZXRWYWx1ZUluUmFuZ2V9IGZyb20gJy4uL3V0aWwvdXRpbCc7XHJcbmltcG9ydCB7S2V5fSBmcm9tICcuLi91dGlsL2tleSc7XHJcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG4vKipcclxuICogQ29udGV4dCBmb3IgdGhlIGN1c3RvbSBzdGFyIGRpc3BsYXkgdGVtcGxhdGVcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgU3RhclRlbXBsYXRlQ29udGV4dCB7XHJcbiAgLyoqXHJcbiAgICogU3RhciBmaWxsIHBlcmNlbnRhZ2UuIEFuIGludGVnZXIgdmFsdWUgYmV0d2VlbiAwIGFuZCAxMDBcclxuICAgKi9cclxuICBmaWxsOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEluZGV4IG9mIHRoZSBzdGFyLlxyXG4gICAqL1xyXG4gIGluZGV4OiBudW1iZXI7XHJcbn1cclxuXHJcbmNvbnN0IE5HQl9SQVRJTkdfVkFMVUVfQUNDRVNTT1IgPSB7XHJcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdiUmF0aW5nKSxcclxuICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJhdGluZyBkaXJlY3RpdmUgdGhhdCB3aWxsIHRha2UgY2FyZSBvZiB2aXN1YWxpc2luZyBhIHN0YXIgcmF0aW5nIGJhci5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmdiLXJhdGluZycsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgaG9zdDoge1xyXG4gICAgJ2NsYXNzJzogJ2QtaW5saW5lLWZsZXgnLFxyXG4gICAgJ3RhYmluZGV4JzogJzAnLFxyXG4gICAgJ3JvbGUnOiAnc2xpZGVyJyxcclxuICAgICdhcmlhLXZhbHVlbWluJzogJzAnLFxyXG4gICAgJ1thdHRyLmFyaWEtdmFsdWVtYXhdJzogJ21heCcsXHJcbiAgICAnW2F0dHIuYXJpYS12YWx1ZW5vd10nOiAnbmV4dFJhdGUnLFxyXG4gICAgJ1thdHRyLmFyaWEtdmFsdWV0ZXh0XSc6ICdhcmlhVmFsdWVUZXh0KCknLFxyXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ3JlYWRvbmx5ID8gdHJ1ZSA6IG51bGwnLFxyXG4gICAgJyhibHVyKSc6ICdoYW5kbGVCbHVyKCknLFxyXG4gICAgJyhrZXlkb3duKSc6ICdoYW5kbGVLZXlEb3duKCRldmVudCknLFxyXG4gICAgJyhtb3VzZWxlYXZlKSc6ICdyZXNldCgpJ1xyXG4gIH0sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxuZy10ZW1wbGF0ZSAjdCBsZXQtZmlsbD1cImZpbGxcIj57eyBmaWxsID09PSAxMDAgPyAnJiM5NzMzOycgOiAnJiM5NzM0OycgfX08L25nLXRlbXBsYXRlPlxyXG4gICAgPG5nLXRlbXBsYXRlIG5nRm9yIFtuZ0Zvck9mXT1cImNvbnRleHRzXCIgbGV0LWluZGV4PVwiaW5kZXhcIj5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCI+KHt7IGluZGV4IDwgbmV4dFJhdGUgPyAnKicgOiAnICcgfX0pPC9zcGFuPlxyXG4gICAgICA8c3BhbiAobW91c2VlbnRlcik9XCJlbnRlcihpbmRleCArIDEpXCIgKGNsaWNrKT1cImhhbmRsZUNsaWNrKGluZGV4ICsgMSlcIiBbc3R5bGUuY3Vyc29yXT1cInJlYWRvbmx5IHx8IGRpc2FibGVkID8gJ2RlZmF1bHQnIDogJ3BvaW50ZXInXCI+XHJcbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInN0YXJUZW1wbGF0ZSB8fCB0XCIgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cImNvbnRleHRzW2luZGV4XVwiPjwvbmctdGVtcGxhdGU+XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgYCxcclxuICBwcm92aWRlcnM6IFtOR0JfUkFUSU5HX1ZBTFVFX0FDQ0VTU09SXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiUmF0aW5nIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsXHJcbiAgICBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcbiAgY29udGV4dHM6IFN0YXJUZW1wbGF0ZUNvbnRleHRbXSA9IFtdO1xyXG4gIGRpc2FibGVkID0gZmFsc2U7XHJcbiAgbmV4dFJhdGU6IG51bWJlcjtcclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIE1heGltYWwgcmF0aW5nIHRoYXQgY2FuIGJlIGdpdmVuIHVzaW5nIHRoaXMgd2lkZ2V0LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1heDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBDdXJyZW50IHJhdGluZy4gQ2FuIGJlIGEgZGVjaW1hbCB2YWx1ZSBsaWtlIDMuNzVcclxuICAgKi9cclxuICBASW5wdXQoKSByYXRlOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGlmIHJhdGluZyBjYW4gYmUgdXBkYXRlZC5cclxuICAgKi9cclxuICBASW5wdXQoKSByZWFkb25seTogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBmbGFnIGluZGljYXRpbmcgaWYgcmF0aW5nIGNhbiBiZSByZXNldCB0byAwIG9uIG1vdXNlIGNsaWNrXHJcbiAgICovXHJcbiAgQElucHV0KCkgcmVzZXR0YWJsZTogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQSB0ZW1wbGF0ZSB0byBvdmVycmlkZSBzdGFyIGRpc3BsYXkuXHJcbiAgICogQWx0ZXJuYXRpdmVseSBwdXQgYSA8bmctdGVtcGxhdGU+IGFzIHRoZSBvbmx5IGNoaWxkIG9mIDxuZ2ItcmF0aW5nPiBlbGVtZW50XHJcbiAgICovXHJcbiAgQElucHV0KCkgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgc3RhclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxTdGFyVGVtcGxhdGVDb250ZXh0PjtcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gZXZlbnQgZmlyZWQgd2hlbiBhIHVzZXIgaXMgaG92ZXJpbmcgb3ZlciBhIGdpdmVuIHJhdGluZy5cclxuICAgKiBFdmVudCdzIHBheWxvYWQgZXF1YWxzIHRvIHRoZSByYXRpbmcgYmVpbmcgaG92ZXJlZCBvdmVyLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBob3ZlciA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xyXG5cclxuICAvKipcclxuICAgKiBBbiBldmVudCBmaXJlZCB3aGVuIGEgdXNlciBzdG9wcyBob3ZlcmluZyBvdmVyIGEgZ2l2ZW4gcmF0aW5nLlxyXG4gICAqIEV2ZW50J3MgcGF5bG9hZCBlcXVhbHMgdG8gdGhlIHJhdGluZyBvZiB0aGUgbGFzdCBpdGVtIGJlaW5nIGhvdmVyZWQgb3Zlci5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgbGVhdmUgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gZXZlbnQgZmlyZWQgd2hlbiBhIHVzZXIgc2VsZWN0cyBhIG5ldyByYXRpbmcuXHJcbiAgICogRXZlbnQncyBwYXlsb2FkIGVxdWFscyB0byB0aGUgbmV3bHkgc2VsZWN0ZWQgcmF0aW5nLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSByYXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KHRydWUpO1xyXG5cclxuICBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xyXG4gIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihjb25maWc6IE5nYlJhdGluZ0NvbmZpZywgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XHJcbiAgICB0aGlzLm1heCA9IGNvbmZpZy5tYXg7XHJcbiAgICB0aGlzLnJlYWRvbmx5ID0gY29uZmlnLnJlYWRvbmx5O1xyXG4gIH1cclxuXHJcbiAgYXJpYVZhbHVlVGV4dCgpIHsgcmV0dXJuIGAke3RoaXMubmV4dFJhdGV9IG91dCBvZiAke3RoaXMubWF4fWA7IH1cclxuXHJcbiAgZW50ZXIodmFsdWU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLnJlYWRvbmx5ICYmICF0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgIHRoaXMuX3VwZGF0ZVN0YXRlKHZhbHVlKTtcclxuICAgIH1cclxuICAgIHRoaXMuaG92ZXIuZW1pdCh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVCbHVyKCkgeyB0aGlzLm9uVG91Y2hlZCgpOyB9XHJcblxyXG4gIGhhbmRsZUNsaWNrKHZhbHVlOiBudW1iZXIpIHsgdGhpcy51cGRhdGUodGhpcy5yZXNldHRhYmxlICYmIHRoaXMucmF0ZSA9PT0gdmFsdWUgPyAwIDogdmFsdWUpOyB9XHJcblxyXG4gIGhhbmRsZUtleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgIGlmIChLZXlbdG9TdHJpbmcoZXZlbnQud2hpY2gpXSkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xyXG4gICAgICAgIGNhc2UgS2V5LkFycm93RG93bjpcclxuICAgICAgICBjYXNlIEtleS5BcnJvd0xlZnQ6XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZSh0aGlzLnJhdGUgLSAxKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgS2V5LkFycm93VXA6XHJcbiAgICAgICAgY2FzZSBLZXkuQXJyb3dSaWdodDpcclxuICAgICAgICAgIHRoaXMudXBkYXRlKHRoaXMucmF0ZSArIDEpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBLZXkuSG9tZTpcclxuICAgICAgICAgIHRoaXMudXBkYXRlKDApO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBLZXkuRW5kOlxyXG4gICAgICAgICAgdGhpcy51cGRhdGUodGhpcy5tYXgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmIChjaGFuZ2VzWydyYXRlJ10pIHtcclxuICAgICAgdGhpcy51cGRhdGUodGhpcy5yYXRlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5jb250ZXh0cyA9IEFycmF5LmZyb20oe2xlbmd0aDogdGhpcy5tYXh9LCAodiwgaykgPT4gKHtmaWxsOiAwLCBpbmRleDoga30pKTtcclxuICAgIHRoaXMuX3VwZGF0ZVN0YXRlKHRoaXMucmF0ZSk7XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gYW55KTogdm9pZCB7IHRoaXMub25DaGFuZ2UgPSBmbjsgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gYW55KTogdm9pZCB7IHRoaXMub25Ub3VjaGVkID0gZm47IH1cclxuXHJcbiAgcmVzZXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmxlYXZlLmVtaXQodGhpcy5uZXh0UmF0ZSk7XHJcbiAgICB0aGlzLl91cGRhdGVTdGF0ZSh0aGlzLnJhdGUpO1xyXG4gIH1cclxuXHJcbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7IHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkOyB9XHJcblxyXG4gIHVwZGF0ZSh2YWx1ZTogbnVtYmVyLCBpbnRlcm5hbENoYW5nZSA9IHRydWUpOiB2b2lkIHtcclxuICAgIGNvbnN0IG5ld1JhdGUgPSBnZXRWYWx1ZUluUmFuZ2UodmFsdWUsIHRoaXMubWF4LCAwKTtcclxuICAgIGlmICghdGhpcy5yZWFkb25seSAmJiAhdGhpcy5kaXNhYmxlZCAmJiB0aGlzLnJhdGUgIT09IG5ld1JhdGUpIHtcclxuICAgICAgdGhpcy5yYXRlID0gbmV3UmF0ZTtcclxuICAgICAgdGhpcy5yYXRlQ2hhbmdlLmVtaXQodGhpcy5yYXRlKTtcclxuICAgIH1cclxuICAgIGlmIChpbnRlcm5hbENoYW5nZSkge1xyXG4gICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMucmF0ZSk7XHJcbiAgICAgIHRoaXMub25Ub3VjaGVkKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl91cGRhdGVTdGF0ZSh0aGlzLnJhdGUpO1xyXG4gIH1cclxuXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZSkge1xyXG4gICAgdGhpcy51cGRhdGUodmFsdWUsIGZhbHNlKTtcclxuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZ2V0RmlsbFZhbHVlKGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgY29uc3QgZGlmZiA9IHRoaXMubmV4dFJhdGUgLSBpbmRleDtcclxuXHJcbiAgICBpZiAoZGlmZiA+PSAxKSB7XHJcbiAgICAgIHJldHVybiAxMDA7XHJcbiAgICB9XHJcbiAgICBpZiAoZGlmZiA8IDEgJiYgZGlmZiA+IDApIHtcclxuICAgICAgcmV0dXJuIE51bWJlci5wYXJzZUludCgoZGlmZiAqIDEwMCkudG9GaXhlZCgyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIDA7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF91cGRhdGVTdGF0ZShuZXh0VmFsdWU6IG51bWJlcikge1xyXG4gICAgdGhpcy5uZXh0UmF0ZSA9IG5leHRWYWx1ZTtcclxuICAgIHRoaXMuY29udGV4dHMuZm9yRWFjaCgoY29udGV4dCwgaW5kZXgpID0+IGNvbnRleHQuZmlsbCA9IHRoaXMuX2dldEZpbGxWYWx1ZShpbmRleCkpO1xyXG4gIH1cclxufVxyXG4iXX0=