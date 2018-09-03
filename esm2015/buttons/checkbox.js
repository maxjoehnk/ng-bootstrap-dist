/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbButtonLabel } from './label';
/** @type {?} */
const NGB_CHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgbCheckBox),
    multi: true
};
/**
 * Easily create Bootstrap-style checkbox buttons. A value of a checked button is bound to a variable
 * specified via ngModel.
 */
export class NgbCheckBox {
    /**
     * @param {?} _label
     */
    constructor(_label) {
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
        this.onChange = (_) => { };
        this.onTouched = () => { };
    }
    /**
     * @param {?} isFocused
     * @return {?}
     */
    set focused(isFocused) {
        this._label.focused = isFocused;
        if (!isFocused) {
            this.onTouched();
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onInputChange($event) {
        /** @type {?} */
        const modelToPropagate = $event.target.checked ? this.valueChecked : this.valueUnChecked;
        this.onChange(modelToPropagate);
        this.onTouched();
        this.writeValue(modelToPropagate);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this.onChange = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this.onTouched = fn; }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this._label.disabled = isDisabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.checked = value === this.valueChecked;
        this._label.active = this.checked;
    }
}
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
NgbCheckBox.ctorParameters = () => [
    { type: NgbButtonLabel }
];
NgbCheckBox.propDecorators = {
    disabled: [{ type: Input }],
    valueChecked: [{ type: Input }],
    valueUnChecked: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImJ1dHRvbnMvY2hlY2tib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFdkUsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLFNBQVMsQ0FBQzs7QUFFdkMsTUFBTSwyQkFBMkIsR0FBRztJQUNsQyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDO0lBQzFDLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQzs7Ozs7QUFtQkYsTUFBTTs7OztJQTRCSixZQUFvQixNQUFzQjtRQUF0QixXQUFNLEdBQU4sTUFBTSxDQUFnQjs7Ozt3QkF0QnRCLEtBQUs7Ozs7NEJBS0QsSUFBSTs7Ozs4QkFLRixLQUFLO3dCQUVwQixDQUFDLENBQU0sRUFBRSxFQUFFLElBQUc7eUJBQ2IsR0FBRyxFQUFFLElBQUc7S0FTMEI7Ozs7O0lBUDlDLElBQUksT0FBTyxDQUFDLFNBQWtCO1FBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUNoQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDbEI7S0FDRjs7Ozs7SUFJRCxhQUFhLENBQUMsTUFBTTs7UUFDbEIsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUN6RixJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUNuQzs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxFQUF1QixJQUFVLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLEVBQUU7Ozs7O0lBRXZFLGlCQUFpQixDQUFDLEVBQWEsSUFBVSxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxFQUFFOzs7OztJQUUvRCxnQkFBZ0IsQ0FBQyxVQUFtQjtRQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7S0FDbkM7Ozs7O0lBRUQsVUFBVSxDQUFDLEtBQUs7UUFDZCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzNDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7S0FDbkM7OztZQTdERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDRCQUE0QjtnQkFDdEMsSUFBSSxFQUFFO29CQUNKLGNBQWMsRUFBRSxLQUFLO29CQUNyQixXQUFXLEVBQUUsU0FBUztvQkFDdEIsWUFBWSxFQUFFLFVBQVU7b0JBQ3hCLFVBQVUsRUFBRSx1QkFBdUI7b0JBQ25DLFNBQVMsRUFBRSxnQkFBZ0I7b0JBQzNCLFFBQVEsRUFBRSxpQkFBaUI7aUJBQzVCO2dCQUNELFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO2FBQ3pDOzs7O1lBeEJPLGNBQWM7Ozt1QkErQm5CLEtBQUs7MkJBS0wsS0FBSzs2QkFLTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIGZvcndhcmRSZWYsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7TmdiQnV0dG9uTGFiZWx9IGZyb20gJy4vbGFiZWwnO1xyXG5cclxuY29uc3QgTkdCX0NIRUNLQk9YX1ZBTFVFX0FDQ0VTU09SID0ge1xyXG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nYkNoZWNrQm94KSxcclxuICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBFYXNpbHkgY3JlYXRlIEJvb3RzdHJhcC1zdHlsZSBjaGVja2JveCBidXR0b25zLiBBIHZhbHVlIG9mIGEgY2hlY2tlZCBidXR0b24gaXMgYm91bmQgdG8gYSB2YXJpYWJsZVxyXG4gKiBzcGVjaWZpZWQgdmlhIG5nTW9kZWwuXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tuZ2JCdXR0b25dW3R5cGU9Y2hlY2tib3hdJyxcclxuICBob3N0OiB7XHJcbiAgICAnYXV0b2NvbXBsZXRlJzogJ29mZicsXHJcbiAgICAnW2NoZWNrZWRdJzogJ2NoZWNrZWQnLFxyXG4gICAgJ1tkaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxyXG4gICAgJyhjaGFuZ2UpJzogJ29uSW5wdXRDaGFuZ2UoJGV2ZW50KScsXHJcbiAgICAnKGZvY3VzKSc6ICdmb2N1c2VkID0gdHJ1ZScsXHJcbiAgICAnKGJsdXIpJzogJ2ZvY3VzZWQgPSBmYWxzZSdcclxuICB9LFxyXG4gIHByb3ZpZGVyczogW05HQl9DSEVDS0JPWF9WQUxVRV9BQ0NFU1NPUl1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYkNoZWNrQm94IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG4gIGNoZWNrZWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGlmIGEgZ2l2ZW4gY2hlY2tib3ggYnV0dG9uIGlzIGRpc2FibGVkLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFZhbHVlIHRvIGJlIHByb3BhZ2F0ZWQgYXMgbW9kZWwgd2hlbiB0aGUgY2hlY2tib3ggaXMgY2hlY2tlZC5cclxuICAgKi9cclxuICBASW5wdXQoKSB2YWx1ZUNoZWNrZWQgPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBWYWx1ZSB0byBiZSBwcm9wYWdhdGVkIGFzIG1vZGVsIHdoZW4gdGhlIGNoZWNrYm94IGlzIHVuY2hlY2tlZC5cclxuICAgKi9cclxuICBASW5wdXQoKSB2YWx1ZVVuQ2hlY2tlZCA9IGZhbHNlO1xyXG5cclxuICBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xyXG4gIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xyXG5cclxuICBzZXQgZm9jdXNlZChpc0ZvY3VzZWQ6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2xhYmVsLmZvY3VzZWQgPSBpc0ZvY3VzZWQ7XHJcbiAgICBpZiAoIWlzRm9jdXNlZCkge1xyXG4gICAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbGFiZWw6IE5nYkJ1dHRvbkxhYmVsKSB7fVxyXG5cclxuICBvbklucHV0Q2hhbmdlKCRldmVudCkge1xyXG4gICAgY29uc3QgbW9kZWxUb1Byb3BhZ2F0ZSA9ICRldmVudC50YXJnZXQuY2hlY2tlZCA/IHRoaXMudmFsdWVDaGVja2VkIDogdGhpcy52YWx1ZVVuQ2hlY2tlZDtcclxuICAgIHRoaXMub25DaGFuZ2UobW9kZWxUb1Byb3BhZ2F0ZSk7XHJcbiAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gICAgdGhpcy53cml0ZVZhbHVlKG1vZGVsVG9Qcm9wYWdhdGUpO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IGFueSk6IHZvaWQgeyB0aGlzLm9uQ2hhbmdlID0gZm47IH1cclxuXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IGFueSk6IHZvaWQgeyB0aGlzLm9uVG91Y2hlZCA9IGZuOyB9XHJcblxyXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XHJcbiAgICB0aGlzLl9sYWJlbC5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XHJcbiAgfVxyXG5cclxuICB3cml0ZVZhbHVlKHZhbHVlKSB7XHJcbiAgICB0aGlzLmNoZWNrZWQgPSB2YWx1ZSA9PT0gdGhpcy52YWx1ZUNoZWNrZWQ7XHJcbiAgICB0aGlzLl9sYWJlbC5hY3RpdmUgPSB0aGlzLmNoZWNrZWQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==