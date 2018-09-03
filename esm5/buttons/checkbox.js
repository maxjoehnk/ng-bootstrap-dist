/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbButtonLabel } from './label';
/** @type {?} */
var NGB_CHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return NgbCheckBox; }),
    multi: true
};
/**
 * Easily create Bootstrap-style checkbox buttons. A value of a checked button is bound to a variable
 * specified via ngModel.
 */
var NgbCheckBox = /** @class */ (function () {
    function NgbCheckBox(_label) {
        this._label = _label;
        /**
         * A flag indicating if a given checkbox button is disabled.
         */
        this.disabled = false;
        /**
         * Value to be propagated as model when the checkbox is checked.
         */
        this.valueChecked = true;
        /**
         * Value to be propagated as model when the checkbox is unchecked.
         */
        this.valueUnChecked = false;
        this.onChange = function (_) { };
        this.onTouched = function () { };
    }
    Object.defineProperty(NgbCheckBox.prototype, "focused", {
        set: /**
         * @param {?} isFocused
         * @return {?}
         */
        function (isFocused) {
            this._label.focused = isFocused;
            if (!isFocused) {
                this.onTouched();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} $event
     * @return {?}
     */
    NgbCheckBox.prototype.onInputChange = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        /** @type {?} */
        var modelToPropagate = $event.target.checked ? this.valueChecked : this.valueUnChecked;
        this.onChange(modelToPropagate);
        this.onTouched();
        this.writeValue(modelToPropagate);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgbCheckBox.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onChange = fn; };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgbCheckBox.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onTouched = fn; };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NgbCheckBox.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
        this._label.disabled = isDisabled;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NgbCheckBox.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.checked = value === this.valueChecked;
        this._label.active = this.checked;
    };
    NgbCheckBox.decorators = [
        { type: Directive, args: [{
                    selector: '[ngbButton][type=checkbox]',
                    host: {
                        'autocomplete': 'off',
                        '[checked]': 'checked',
                        '[disabled]': 'disabled',
                        '(change)': 'onInputChange($event)',
                        '(focus)': 'focused = true',
                        '(blur)': 'focused = false'
                    },
                    providers: [NGB_CHECKBOX_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    NgbCheckBox.ctorParameters = function () { return [
        { type: NgbButtonLabel }
    ]; };
    NgbCheckBox.propDecorators = {
        disabled: [{ type: Input }],
        valueChecked: [{ type: Input }],
        valueUnChecked: [{ type: Input }]
    };
    return NgbCheckBox;
}());
export { NgbCheckBox };
if (false) {
    /** @type {?} */
    NgbCheckBox.prototype.checked;
    /**
     * A flag indicating if a given checkbox button is disabled.
     * @type {?}
     */
    NgbCheckBox.prototype.disabled;
    /**
     * Value to be propagated as model when the checkbox is checked.
     * @type {?}
     */
    NgbCheckBox.prototype.valueChecked;
    /**
     * Value to be propagated as model when the checkbox is unchecked.
     * @type {?}
     */
    NgbCheckBox.prototype.valueUnChecked;
    /** @type {?} */
    NgbCheckBox.prototype.onChange;
    /** @type {?} */
    NgbCheckBox.prototype.onTouched;
    /** @type {?} */
    NgbCheckBox.prototype._label;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImJ1dHRvbnMvY2hlY2tib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFdkUsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLFNBQVMsQ0FBQzs7QUFFdkMsSUFBTSwyQkFBMkIsR0FBRztJQUNsQyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLFdBQVcsRUFBWCxDQUFXLENBQUM7SUFDMUMsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDOzs7Ozs7SUErQ0EscUJBQW9CLE1BQXNCO1FBQXRCLFdBQU0sR0FBTixNQUFNLENBQWdCOzs7O3dCQXRCdEIsS0FBSzs7Ozs0QkFLRCxJQUFJOzs7OzhCQUtGLEtBQUs7d0JBRXBCLFVBQUMsQ0FBTSxLQUFPO3lCQUNiLGVBQVE7S0FTMEI7SUFQOUMsc0JBQUksZ0NBQU87Ozs7O1FBQVgsVUFBWSxTQUFrQjtZQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7WUFDaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNmLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNsQjtTQUNGOzs7T0FBQTs7Ozs7SUFJRCxtQ0FBYTs7OztJQUFiLFVBQWMsTUFBTTs7UUFDbEIsSUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUN6RixJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUNuQzs7Ozs7SUFFRCxzQ0FBZ0I7Ozs7SUFBaEIsVUFBaUIsRUFBdUIsSUFBVSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxFQUFFOzs7OztJQUV2RSx1Q0FBaUI7Ozs7SUFBakIsVUFBa0IsRUFBYSxJQUFVLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLEVBQUU7Ozs7O0lBRS9ELHNDQUFnQjs7OztJQUFoQixVQUFpQixVQUFtQjtRQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7S0FDbkM7Ozs7O0lBRUQsZ0NBQVU7Ozs7SUFBVixVQUFXLEtBQUs7UUFDZCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzNDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7S0FDbkM7O2dCQTdERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDRCQUE0QjtvQkFDdEMsSUFBSSxFQUFFO3dCQUNKLGNBQWMsRUFBRSxLQUFLO3dCQUNyQixXQUFXLEVBQUUsU0FBUzt3QkFDdEIsWUFBWSxFQUFFLFVBQVU7d0JBQ3hCLFVBQVUsRUFBRSx1QkFBdUI7d0JBQ25DLFNBQVMsRUFBRSxnQkFBZ0I7d0JBQzNCLFFBQVEsRUFBRSxpQkFBaUI7cUJBQzVCO29CQUNELFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO2lCQUN6Qzs7OztnQkF4Qk8sY0FBYzs7OzJCQStCbkIsS0FBSzsrQkFLTCxLQUFLO2lDQUtMLEtBQUs7O3NCQTVDUjs7U0E0QmEsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBmb3J3YXJkUmVmLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQge05nYkJ1dHRvbkxhYmVsfSBmcm9tICcuL2xhYmVsJztcclxuXHJcbmNvbnN0IE5HQl9DSEVDS0JPWF9WQUxVRV9BQ0NFU1NPUiA9IHtcclxuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JDaGVja0JveCksXHJcbiAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcblxyXG4vKipcclxuICogRWFzaWx5IGNyZWF0ZSBCb290c3RyYXAtc3R5bGUgY2hlY2tib3ggYnV0dG9ucy4gQSB2YWx1ZSBvZiBhIGNoZWNrZWQgYnV0dG9uIGlzIGJvdW5kIHRvIGEgdmFyaWFibGVcclxuICogc3BlY2lmaWVkIHZpYSBuZ01vZGVsLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbmdiQnV0dG9uXVt0eXBlPWNoZWNrYm94XScsXHJcbiAgaG9zdDoge1xyXG4gICAgJ2F1dG9jb21wbGV0ZSc6ICdvZmYnLFxyXG4gICAgJ1tjaGVja2VkXSc6ICdjaGVja2VkJyxcclxuICAgICdbZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcclxuICAgICcoY2hhbmdlKSc6ICdvbklucHV0Q2hhbmdlKCRldmVudCknLFxyXG4gICAgJyhmb2N1cyknOiAnZm9jdXNlZCA9IHRydWUnLFxyXG4gICAgJyhibHVyKSc6ICdmb2N1c2VkID0gZmFsc2UnXHJcbiAgfSxcclxuICBwcm92aWRlcnM6IFtOR0JfQ0hFQ0tCT1hfVkFMVUVfQUNDRVNTT1JdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JDaGVja0JveCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuICBjaGVja2VkO1xyXG5cclxuICAvKipcclxuICAgKiBBIGZsYWcgaW5kaWNhdGluZyBpZiBhIGdpdmVuIGNoZWNrYm94IGJ1dHRvbiBpcyBkaXNhYmxlZC5cclxuICAgKi9cclxuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBWYWx1ZSB0byBiZSBwcm9wYWdhdGVkIGFzIG1vZGVsIHdoZW4gdGhlIGNoZWNrYm94IGlzIGNoZWNrZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgdmFsdWVDaGVja2VkID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVmFsdWUgdG8gYmUgcHJvcGFnYXRlZCBhcyBtb2RlbCB3aGVuIHRoZSBjaGVja2JveCBpcyB1bmNoZWNrZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgdmFsdWVVbkNoZWNrZWQgPSBmYWxzZTtcclxuXHJcbiAgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcclxuICBvblRvdWNoZWQgPSAoKSA9PiB7fTtcclxuXHJcbiAgc2V0IGZvY3VzZWQoaXNGb2N1c2VkOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9sYWJlbC5mb2N1c2VkID0gaXNGb2N1c2VkO1xyXG4gICAgaWYgKCFpc0ZvY3VzZWQpIHtcclxuICAgICAgdGhpcy5vblRvdWNoZWQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2xhYmVsOiBOZ2JCdXR0b25MYWJlbCkge31cclxuXHJcbiAgb25JbnB1dENoYW5nZSgkZXZlbnQpIHtcclxuICAgIGNvbnN0IG1vZGVsVG9Qcm9wYWdhdGUgPSAkZXZlbnQudGFyZ2V0LmNoZWNrZWQgPyB0aGlzLnZhbHVlQ2hlY2tlZCA6IHRoaXMudmFsdWVVbkNoZWNrZWQ7XHJcbiAgICB0aGlzLm9uQ2hhbmdlKG1vZGVsVG9Qcm9wYWdhdGUpO1xyXG4gICAgdGhpcy5vblRvdWNoZWQoKTtcclxuICAgIHRoaXMud3JpdGVWYWx1ZShtb2RlbFRvUHJvcGFnYXRlKTtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5vbkNoYW5nZSA9IGZuOyB9XHJcblxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5vblRvdWNoZWQgPSBmbjsgfVxyXG5cclxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG4gICAgdGhpcy5fbGFiZWwuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG4gIH1cclxuXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZSkge1xyXG4gICAgdGhpcy5jaGVja2VkID0gdmFsdWUgPT09IHRoaXMudmFsdWVDaGVja2VkO1xyXG4gICAgdGhpcy5fbGFiZWwuYWN0aXZlID0gdGhpcy5jaGVja2VkO1xyXG4gIH1cclxufVxyXG4iXX0=