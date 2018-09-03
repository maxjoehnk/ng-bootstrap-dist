/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { getValueInRange } from '../util/util';
import { NgbProgressbarConfig } from './progressbar-config';
/**
 * Directive that can be used to provide feedback on the progress of a workflow or an action.
 */
var NgbProgressbar = /** @class */ (function () {
    function NgbProgressbar(config) {
        /**
         * Current value to be displayed in the progressbar. Should be smaller or equal to "max" value.
         */
        this.value = 0;
        this.max = config.max;
        this.animated = config.animated;
        this.striped = config.striped;
        this.type = config.type;
        this.showValue = config.showValue;
        this.height = config.height;
    }
    /**
     * @return {?}
     */
    NgbProgressbar.prototype.getValue = /**
     * @return {?}
     */
    function () { return getValueInRange(this.value, this.max); };
    /**
     * @return {?}
     */
    NgbProgressbar.prototype.getPercentValue = /**
     * @return {?}
     */
    function () { return 100 * this.getValue() / this.max; };
    NgbProgressbar.decorators = [
        { type: Component, args: [{
                    selector: 'ngb-progressbar',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <div class=\"progress\" [style.height]=\"height\">\n      <div class=\"progress-bar{{type ? ' bg-' + type : ''}}{{animated ? ' progress-bar-animated' : ''}}{{striped ?\n    ' progress-bar-striped' : ''}}\" role=\"progressbar\" [style.width.%]=\"getPercentValue()\"\n    [attr.aria-valuenow]=\"getValue()\" aria-valuemin=\"0\" [attr.aria-valuemax]=\"max\">\n        <span *ngIf=\"showValue\" i18n=\"@@ngb.progressbar.value\">{{getPercentValue()}}%</span><ng-content></ng-content>\n      </div>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgbProgressbar.ctorParameters = function () { return [
        { type: NgbProgressbarConfig }
    ]; };
    NgbProgressbar.propDecorators = {
        max: [{ type: Input }],
        animated: [{ type: Input }],
        striped: [{ type: Input }],
        showValue: [{ type: Input }],
        type: [{ type: Input }],
        value: [{ type: Input }],
        height: [{ type: Input }]
    };
    return NgbProgressbar;
}());
export { NgbProgressbar };
if (false) {
    /**
     * Maximal value to be displayed in the progressbar.
     * @type {?}
     */
    NgbProgressbar.prototype.max;
    /**
     * A flag indicating if the stripes of the progress bar should be animated. Takes effect only for browsers
     * supporting CSS3 animations, and if striped is true.
     * @type {?}
     */
    NgbProgressbar.prototype.animated;
    /**
     * A flag indicating if a progress bar should be displayed as striped.
     * @type {?}
     */
    NgbProgressbar.prototype.striped;
    /**
     * A flag indicating if the current percentage value should be shown.
     * @type {?}
     */
    NgbProgressbar.prototype.showValue;
    /**
     * Type of progress bar, can be one of "success", "info", "warning" or "danger".
     * @type {?}
     */
    NgbProgressbar.prototype.type;
    /**
     * Current value to be displayed in the progressbar. Should be smaller or equal to "max" value.
     * @type {?}
     */
    NgbProgressbar.prototype.value;
    /**
     * Height of the progress bar. Accepts any valid CSS height values, ex. '2rem'
     * @type {?}
     */
    NgbProgressbar.prototype.height;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NiYXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbInByb2dyZXNzYmFyL3Byb2dyZXNzYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzdDLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDOzs7OztJQXVEeEQsd0JBQVksTUFBNEI7Ozs7cUJBUHZCLENBQUM7UUFRaEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDOUIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7S0FDN0I7Ozs7SUFFRCxpQ0FBUTs7O0lBQVIsY0FBYSxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Ozs7SUFFNUQsd0NBQWU7OztJQUFmLGNBQW9CLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTs7Z0JBN0QvRCxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFFBQVEsRUFBRSxvZ0JBUVQ7aUJBQ0Y7Ozs7Z0JBakJPLG9CQUFvQjs7O3NCQXNCekIsS0FBSzsyQkFNTCxLQUFLOzBCQUtMLEtBQUs7NEJBS0wsS0FBSzt1QkFLTCxLQUFLO3dCQUtMLEtBQUs7eUJBS0wsS0FBSzs7eUJBdkRSOztTQW9CYSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Z2V0VmFsdWVJblJhbmdlfSBmcm9tICcuLi91dGlsL3V0aWwnO1xyXG5pbXBvcnQge05nYlByb2dyZXNzYmFyQ29uZmlnfSBmcm9tICcuL3Byb2dyZXNzYmFyLWNvbmZpZyc7XHJcblxyXG4vKipcclxuICogRGlyZWN0aXZlIHRoYXQgY2FuIGJlIHVzZWQgdG8gcHJvdmlkZSBmZWVkYmFjayBvbiB0aGUgcHJvZ3Jlc3Mgb2YgYSB3b3JrZmxvdyBvciBhbiBhY3Rpb24uXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25nYi1wcm9ncmVzc2JhcicsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJwcm9ncmVzc1wiIFtzdHlsZS5oZWlnaHRdPVwiaGVpZ2h0XCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJwcm9ncmVzcy1iYXJ7e3R5cGUgPyAnIGJnLScgKyB0eXBlIDogJyd9fXt7YW5pbWF0ZWQgPyAnIHByb2dyZXNzLWJhci1hbmltYXRlZCcgOiAnJ319e3tzdHJpcGVkID9cclxuICAgICcgcHJvZ3Jlc3MtYmFyLXN0cmlwZWQnIDogJyd9fVwiIHJvbGU9XCJwcm9ncmVzc2JhclwiIFtzdHlsZS53aWR0aC4lXT1cImdldFBlcmNlbnRWYWx1ZSgpXCJcclxuICAgIFthdHRyLmFyaWEtdmFsdWVub3ddPVwiZ2V0VmFsdWUoKVwiIGFyaWEtdmFsdWVtaW49XCIwXCIgW2F0dHIuYXJpYS12YWx1ZW1heF09XCJtYXhcIj5cclxuICAgICAgICA8c3BhbiAqbmdJZj1cInNob3dWYWx1ZVwiIGkxOG49XCJAQG5nYi5wcm9ncmVzc2Jhci52YWx1ZVwiPnt7Z2V0UGVyY2VudFZhbHVlKCl9fSU8L3NwYW4+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYlByb2dyZXNzYmFyIHtcclxuICAvKipcclxuICAgKiBNYXhpbWFsIHZhbHVlIHRvIGJlIGRpc3BsYXllZCBpbiB0aGUgcHJvZ3Jlc3NiYXIuXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWF4OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBzdHJpcGVzIG9mIHRoZSBwcm9ncmVzcyBiYXIgc2hvdWxkIGJlIGFuaW1hdGVkLiBUYWtlcyBlZmZlY3Qgb25seSBmb3IgYnJvd3NlcnNcclxuICAgKiBzdXBwb3J0aW5nIENTUzMgYW5pbWF0aW9ucywgYW5kIGlmIHN0cmlwZWQgaXMgdHJ1ZS5cclxuICAgKi9cclxuICBASW5wdXQoKSBhbmltYXRlZDogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBmbGFnIGluZGljYXRpbmcgaWYgYSBwcm9ncmVzcyBiYXIgc2hvdWxkIGJlIGRpc3BsYXllZCBhcyBzdHJpcGVkLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0cmlwZWQ6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBjdXJyZW50IHBlcmNlbnRhZ2UgdmFsdWUgc2hvdWxkIGJlIHNob3duLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNob3dWYWx1ZTogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVHlwZSBvZiBwcm9ncmVzcyBiYXIsIGNhbiBiZSBvbmUgb2YgXCJzdWNjZXNzXCIsIFwiaW5mb1wiLCBcIndhcm5pbmdcIiBvciBcImRhbmdlclwiLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHR5cGU6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogQ3VycmVudCB2YWx1ZSB0byBiZSBkaXNwbGF5ZWQgaW4gdGhlIHByb2dyZXNzYmFyLiBTaG91bGQgYmUgc21hbGxlciBvciBlcXVhbCB0byBcIm1heFwiIHZhbHVlLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHZhbHVlID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogSGVpZ2h0IG9mIHRoZSBwcm9ncmVzcyBiYXIuIEFjY2VwdHMgYW55IHZhbGlkIENTUyBoZWlnaHQgdmFsdWVzLCBleC4gJzJyZW0nXHJcbiAgICovXHJcbiAgQElucHV0KCkgaGVpZ2h0OiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogTmdiUHJvZ3Jlc3NiYXJDb25maWcpIHtcclxuICAgIHRoaXMubWF4ID0gY29uZmlnLm1heDtcclxuICAgIHRoaXMuYW5pbWF0ZWQgPSBjb25maWcuYW5pbWF0ZWQ7XHJcbiAgICB0aGlzLnN0cmlwZWQgPSBjb25maWcuc3RyaXBlZDtcclxuICAgIHRoaXMudHlwZSA9IGNvbmZpZy50eXBlO1xyXG4gICAgdGhpcy5zaG93VmFsdWUgPSBjb25maWcuc2hvd1ZhbHVlO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBjb25maWcuaGVpZ2h0O1xyXG4gIH1cclxuXHJcbiAgZ2V0VmFsdWUoKSB7IHJldHVybiBnZXRWYWx1ZUluUmFuZ2UodGhpcy52YWx1ZSwgdGhpcy5tYXgpOyB9XHJcblxyXG4gIGdldFBlcmNlbnRWYWx1ZSgpIHsgcmV0dXJuIDEwMCAqIHRoaXMuZ2V0VmFsdWUoKSAvIHRoaXMubWF4OyB9XHJcbn1cclxuIl19