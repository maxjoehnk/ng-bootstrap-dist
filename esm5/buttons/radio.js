/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ElementRef, forwardRef, Input, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbButtonLabel } from './label';
/** @type {?} */
var NGB_RADIO_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return NgbRadioGroup; }),
    multi: true
};
/** @type {?} */
var nextId = 0;
/**
 * Easily create Bootstrap-style radio buttons. A value of a selected button is bound to a variable
 * specified via ngModel.
 */
var NgbRadioGroup = /** @class */ (function () {
    function NgbRadioGroup() {
        this._radios = new Set();
        this._value = null;
        /**
         * The name of the group. Unless enclosed inputs specify a name, this name is used as the name of the
         * enclosed inputs. If not specified, a name is generated automatically.
         */
        this.name = "ngb-radio-" + nextId++;
        this.onChange = function (_) { };
        this.onTouched = function () { };
    }
    Object.defineProperty(NgbRadioGroup.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () { return this._disabled; },
        set: /**
         * @param {?} isDisabled
         * @return {?}
         */
        function (isDisabled) { this.setDisabledState(isDisabled); },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} radio
     * @return {?}
     */
    NgbRadioGroup.prototype.onRadioChange = /**
     * @param {?} radio
     * @return {?}
     */
    function (radio) {
        this.writeValue(radio.value);
        this.onChange(radio.value);
    };
    /**
     * @return {?}
     */
    NgbRadioGroup.prototype.onRadioValueUpdate = /**
     * @return {?}
     */
    function () { this._updateRadiosValue(); };
    /**
     * @param {?} radio
     * @return {?}
     */
    NgbRadioGroup.prototype.register = /**
     * @param {?} radio
     * @return {?}
     */
    function (radio) { this._radios.add(radio); };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgbRadioGroup.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onChange = fn; };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgbRadioGroup.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onTouched = fn; };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NgbRadioGroup.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this._disabled = isDisabled;
        this._updateRadiosDisabled();
    };
    /**
     * @param {?} radio
     * @return {?}
     */
    NgbRadioGroup.prototype.unregister = /**
     * @param {?} radio
     * @return {?}
     */
    function (radio) { this._radios.delete(radio); };
    /**
     * @param {?} value
     * @return {?}
     */
    NgbRadioGroup.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._value = value;
        this._updateRadiosValue();
    };
    /**
     * @return {?}
     */
    NgbRadioGroup.prototype._updateRadiosValue = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._radios.forEach(function (radio) { return radio.updateValue(_this._value); });
    };
    /**
     * @return {?}
     */
    NgbRadioGroup.prototype._updateRadiosDisabled = /**
     * @return {?}
     */
    function () { this._radios.forEach(function (radio) { return radio.updateDisabled(); }); };
    NgbRadioGroup.decorators = [
        { type: Directive, args: [{ selector: '[ngbRadioGroup]', host: { 'role': 'group' }, providers: [NGB_RADIO_VALUE_ACCESSOR] },] },
    ];
    NgbRadioGroup.propDecorators = {
        name: [{ type: Input }]
    };
    return NgbRadioGroup;
}());
export { NgbRadioGroup };
if (false) {
    /** @type {?} */
    NgbRadioGroup.prototype._radios;
    /** @type {?} */
    NgbRadioGroup.prototype._value;
    /** @type {?} */
    NgbRadioGroup.prototype._disabled;
    /**
     * The name of the group. Unless enclosed inputs specify a name, this name is used as the name of the
     * enclosed inputs. If not specified, a name is generated automatically.
     * @type {?}
     */
    NgbRadioGroup.prototype.name;
    /** @type {?} */
    NgbRadioGroup.prototype.onChange;
    /** @type {?} */
    NgbRadioGroup.prototype.onTouched;
}
/**
 * Marks an input of type "radio" as part of the NgbRadioGroup.
 */
var NgbRadio = /** @class */ (function () {
    function NgbRadio(_group, _label, _renderer, _element) {
        this._group = _group;
        this._label = _label;
        this._renderer = _renderer;
        this._element = _element;
        this._value = null;
        this._group.register(this);
        this.updateDisabled();
    }
    Object.defineProperty(NgbRadio.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () { return this._value; },
        /**
         * You can specify model value of a given radio by binding to the value property.
         */
        set: /**
         * You can specify model value of a given radio by binding to the value property.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._value = value;
            /** @type {?} */
            var stringValue = value ? value.toString() : '';
            this._renderer.setProperty(this._element.nativeElement, 'value', stringValue);
            this._group.onRadioValueUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbRadio.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () { return this._group.disabled || this._disabled; },
        /**
         * A flag indicating if a given radio button is disabled.
         */
        set: /**
         * A flag indicating if a given radio button is disabled.
         * @param {?} isDisabled
         * @return {?}
         */
        function (isDisabled) {
            this._disabled = isDisabled !== false;
            this.updateDisabled();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbRadio.prototype, "focused", {
        set: /**
         * @param {?} isFocused
         * @return {?}
         */
        function (isFocused) {
            if (this._label) {
                this._label.focused = isFocused;
            }
            if (!isFocused) {
                this._group.onTouched();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbRadio.prototype, "checked", {
        get: /**
         * @return {?}
         */
        function () { return this._checked; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbRadio.prototype, "nameAttr", {
        get: /**
         * @return {?}
         */
        function () { return this.name || this._group.name; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgbRadio.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () { this._group.unregister(this); };
    /**
     * @return {?}
     */
    NgbRadio.prototype.onChange = /**
     * @return {?}
     */
    function () { this._group.onRadioChange(this); };
    /**
     * @param {?} value
     * @return {?}
     */
    NgbRadio.prototype.updateValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._checked = this.value === value;
        this._label.active = this._checked;
    };
    /**
     * @return {?}
     */
    NgbRadio.prototype.updateDisabled = /**
     * @return {?}
     */
    function () { this._label.disabled = this.disabled; };
    NgbRadio.decorators = [
        { type: Directive, args: [{
                    selector: '[ngbButton][type=radio]',
                    host: {
                        '[checked]': 'checked',
                        '[disabled]': 'disabled',
                        '[name]': 'nameAttr',
                        '(change)': 'onChange()',
                        '(focus)': 'focused = true',
                        '(blur)': 'focused = false'
                    }
                },] },
    ];
    /** @nocollapse */
    NgbRadio.ctorParameters = function () { return [
        { type: NgbRadioGroup },
        { type: NgbButtonLabel },
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    NgbRadio.propDecorators = {
        name: [{ type: Input }],
        value: [{ type: Input, args: ['value',] }],
        disabled: [{ type: Input, args: ['disabled',] }]
    };
    return NgbRadio;
}());
export { NgbRadio };
if (false) {
    /** @type {?} */
    NgbRadio.prototype._checked;
    /** @type {?} */
    NgbRadio.prototype._disabled;
    /** @type {?} */
    NgbRadio.prototype._value;
    /**
     * The name of the input. All inputs of a group should have the same name. If not specified,
     * the name of the enclosing group is used.
     * @type {?}
     */
    NgbRadio.prototype.name;
    /** @type {?} */
    NgbRadio.prototype._group;
    /** @type {?} */
    NgbRadio.prototype._label;
    /** @type {?} */
    NgbRadio.prototype._renderer;
    /** @type {?} */
    NgbRadio.prototype._element;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImJ1dHRvbnMvcmFkaW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQWEsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdGLE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2RSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sU0FBUyxDQUFDOztBQUV2QyxJQUFNLHdCQUF3QixHQUFHO0lBQy9CLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsYUFBYSxFQUFiLENBQWEsQ0FBQztJQUM1QyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7O0FBRUYsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7O3VCQVFvQixJQUFJLEdBQUcsRUFBWTtzQkFDbkMsSUFBSTs7Ozs7b0JBVUwsZUFBYSxNQUFNLEVBQUk7d0JBRTVCLFVBQUMsQ0FBTSxLQUFPO3lCQUNiLGVBQVE7O0lBVnBCLHNCQUFJLG1DQUFROzs7O1FBQVosY0FBaUIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTs7Ozs7UUFDekMsVUFBYSxVQUFtQixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFOzs7T0FEL0I7Ozs7O0lBWXpDLHFDQUFhOzs7O0lBQWIsVUFBYyxLQUFlO1FBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzVCOzs7O0lBRUQsMENBQWtCOzs7SUFBbEIsY0FBdUIsSUFBSSxDQUFDLGtCQUFrQixF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LEVBQUUsU0FBUzt3QkFDdEIsWUFBWSxFQUFFLFVBQVU7d0JBQ3hCLFFBQVEsRUFBRSxVQUFVO3dCQUNwQixVQUFVLEVBQUUsWUFBWTt3QkFDeEIsU0FBUyxFQUFFLGdCQUFnQjt3QkFDM0IsUUFBUSxFQUFFLGlCQUFpQjtxQkFDNUI7aUJBQ0Y7Ozs7Z0JBa0RxQixhQUFhO2dCQTdIM0IsY0FBYztnQkFIdUMsU0FBUztnQkFBbkQsVUFBVTs7O3VCQXdGMUIsS0FBSzt3QkFLTCxLQUFLLFNBQUMsT0FBTzsyQkFXYixLQUFLLFNBQUMsVUFBVTs7bUJBeEduQjs7U0ErRWEsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBmb3J3YXJkUmVmLCBJbnB1dCwgT25EZXN0cm95LCBSZW5kZXJlcjJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHtOZ2JCdXR0b25MYWJlbH0gZnJvbSAnLi9sYWJlbCc7XHJcblxyXG5jb25zdCBOR0JfUkFESU9fVkFMVUVfQUNDRVNTT1IgPSB7XHJcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdiUmFkaW9Hcm91cCksXHJcbiAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbmxldCBuZXh0SWQgPSAwO1xyXG5cclxuLyoqXHJcbiAqIEVhc2lseSBjcmVhdGUgQm9vdHN0cmFwLXN0eWxlIHJhZGlvIGJ1dHRvbnMuIEEgdmFsdWUgb2YgYSBzZWxlY3RlZCBidXR0b24gaXMgYm91bmQgdG8gYSB2YXJpYWJsZVxyXG4gKiBzcGVjaWZpZWQgdmlhIG5nTW9kZWwuXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1tuZ2JSYWRpb0dyb3VwXScsIGhvc3Q6IHsncm9sZSc6ICdncm91cCd9LCBwcm92aWRlcnM6IFtOR0JfUkFESU9fVkFMVUVfQUNDRVNTT1JdfSlcclxuZXhwb3J0IGNsYXNzIE5nYlJhZGlvR3JvdXAgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcbiAgcHJpdmF0ZSBfcmFkaW9zOiBTZXQ8TmdiUmFkaW8+ID0gbmV3IFNldDxOZ2JSYWRpbz4oKTtcclxuICBwcml2YXRlIF92YWx1ZSA9IG51bGw7XHJcbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gIGdldCBkaXNhYmxlZCgpIHsgcmV0dXJuIHRoaXMuX2Rpc2FibGVkOyB9XHJcbiAgc2V0IGRpc2FibGVkKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHsgdGhpcy5zZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQpOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBncm91cC4gVW5sZXNzIGVuY2xvc2VkIGlucHV0cyBzcGVjaWZ5IGEgbmFtZSwgdGhpcyBuYW1lIGlzIHVzZWQgYXMgdGhlIG5hbWUgb2YgdGhlXHJcbiAgICogZW5jbG9zZWQgaW5wdXRzLiBJZiBub3Qgc3BlY2lmaWVkLCBhIG5hbWUgaXMgZ2VuZXJhdGVkIGF1dG9tYXRpY2FsbHkuXHJcbiAgICovXHJcbiAgQElucHV0KCkgbmFtZSA9IGBuZ2ItcmFkaW8tJHtuZXh0SWQrK31gO1xyXG5cclxuICBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xyXG4gIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xyXG5cclxuICBvblJhZGlvQ2hhbmdlKHJhZGlvOiBOZ2JSYWRpbykge1xyXG4gICAgdGhpcy53cml0ZVZhbHVlKHJhZGlvLnZhbHVlKTtcclxuICAgIHRoaXMub25DaGFuZ2UocmFkaW8udmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgb25SYWRpb1ZhbHVlVXBkYXRlKCkgeyB0aGlzLl91cGRhdGVSYWRpb3NWYWx1ZSgpOyB9XHJcblxyXG4gIHJlZ2lzdGVyKHJhZGlvOiBOZ2JSYWRpbykgeyB0aGlzLl9yYWRpb3MuYWRkKHJhZGlvKTsgfVxyXG5cclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gYW55KTogdm9pZCB7IHRoaXMub25DaGFuZ2UgPSBmbjsgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gYW55KTogdm9pZCB7IHRoaXMub25Ub3VjaGVkID0gZm47IH1cclxuXHJcbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XHJcbiAgICB0aGlzLl91cGRhdGVSYWRpb3NEaXNhYmxlZCgpO1xyXG4gIH1cclxuXHJcbiAgdW5yZWdpc3RlcihyYWRpbzogTmdiUmFkaW8pIHsgdGhpcy5fcmFkaW9zLmRlbGV0ZShyYWRpbyk7IH1cclxuXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZSkge1xyXG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgIHRoaXMuX3VwZGF0ZVJhZGlvc1ZhbHVlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF91cGRhdGVSYWRpb3NWYWx1ZSgpIHsgdGhpcy5fcmFkaW9zLmZvckVhY2goKHJhZGlvKSA9PiByYWRpby51cGRhdGVWYWx1ZSh0aGlzLl92YWx1ZSkpOyB9XHJcbiAgcHJpdmF0ZSBfdXBkYXRlUmFkaW9zRGlzYWJsZWQoKSB7IHRoaXMuX3JhZGlvcy5mb3JFYWNoKChyYWRpbykgPT4gcmFkaW8udXBkYXRlRGlzYWJsZWQoKSk7IH1cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBNYXJrcyBhbiBpbnB1dCBvZiB0eXBlIFwicmFkaW9cIiBhcyBwYXJ0IG9mIHRoZSBOZ2JSYWRpb0dyb3VwLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbmdiQnV0dG9uXVt0eXBlPXJhZGlvXScsXHJcbiAgaG9zdDoge1xyXG4gICAgJ1tjaGVja2VkXSc6ICdjaGVja2VkJyxcclxuICAgICdbZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcclxuICAgICdbbmFtZV0nOiAnbmFtZUF0dHInLFxyXG4gICAgJyhjaGFuZ2UpJzogJ29uQ2hhbmdlKCknLFxyXG4gICAgJyhmb2N1cyknOiAnZm9jdXNlZCA9IHRydWUnLFxyXG4gICAgJyhibHVyKSc6ICdmb2N1c2VkID0gZmFsc2UnXHJcbiAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiUmFkaW8gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gIHByaXZhdGUgX2NoZWNrZWQ6IGJvb2xlYW47XHJcbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgcHJpdmF0ZSBfdmFsdWU6IGFueSA9IG51bGw7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBpbnB1dC4gQWxsIGlucHV0cyBvZiBhIGdyb3VwIHNob3VsZCBoYXZlIHRoZSBzYW1lIG5hbWUuIElmIG5vdCBzcGVjaWZpZWQsXHJcbiAgICogdGhlIG5hbWUgb2YgdGhlIGVuY2xvc2luZyBncm91cCBpcyB1c2VkLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogWW91IGNhbiBzcGVjaWZ5IG1vZGVsIHZhbHVlIG9mIGEgZ2l2ZW4gcmFkaW8gYnkgYmluZGluZyB0byB0aGUgdmFsdWUgcHJvcGVydHkuXHJcbiAgICovXHJcbiAgQElucHV0KCd2YWx1ZScpXHJcbiAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgICBjb25zdCBzdHJpbmdWYWx1ZSA9IHZhbHVlID8gdmFsdWUudG9TdHJpbmcoKSA6ICcnO1xyXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCBzdHJpbmdWYWx1ZSk7XHJcbiAgICB0aGlzLl9ncm91cC5vblJhZGlvVmFsdWVVcGRhdGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGlmIGEgZ2l2ZW4gcmFkaW8gYnV0dG9uIGlzIGRpc2FibGVkLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgnZGlzYWJsZWQnKVxyXG4gIHNldCBkaXNhYmxlZChpc0Rpc2FibGVkOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGlzRGlzYWJsZWQgIT09IGZhbHNlO1xyXG4gICAgdGhpcy51cGRhdGVEaXNhYmxlZCgpO1xyXG4gIH1cclxuXHJcbiAgc2V0IGZvY3VzZWQoaXNGb2N1c2VkOiBib29sZWFuKSB7XHJcbiAgICBpZiAodGhpcy5fbGFiZWwpIHtcclxuICAgICAgdGhpcy5fbGFiZWwuZm9jdXNlZCA9IGlzRm9jdXNlZDtcclxuICAgIH1cclxuICAgIGlmICghaXNGb2N1c2VkKSB7XHJcbiAgICAgIHRoaXMuX2dyb3VwLm9uVG91Y2hlZCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IGNoZWNrZWQoKSB7IHJldHVybiB0aGlzLl9jaGVja2VkOyB9XHJcblxyXG4gIGdldCBkaXNhYmxlZCgpIHsgcmV0dXJuIHRoaXMuX2dyb3VwLmRpc2FibGVkIHx8IHRoaXMuX2Rpc2FibGVkOyB9XHJcblxyXG4gIGdldCB2YWx1ZSgpIHsgcmV0dXJuIHRoaXMuX3ZhbHVlOyB9XHJcblxyXG4gIGdldCBuYW1lQXR0cigpIHsgcmV0dXJuIHRoaXMubmFtZSB8fCB0aGlzLl9ncm91cC5uYW1lOyB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcml2YXRlIF9ncm91cDogTmdiUmFkaW9Hcm91cCwgcHJpdmF0ZSBfbGFiZWw6IE5nYkJ1dHRvbkxhYmVsLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgICBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+KSB7XHJcbiAgICB0aGlzLl9ncm91cC5yZWdpc3Rlcih0aGlzKTtcclxuICAgIHRoaXMudXBkYXRlRGlzYWJsZWQoKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkgeyB0aGlzLl9ncm91cC51bnJlZ2lzdGVyKHRoaXMpOyB9XHJcblxyXG4gIG9uQ2hhbmdlKCkgeyB0aGlzLl9ncm91cC5vblJhZGlvQ2hhbmdlKHRoaXMpOyB9XHJcblxyXG4gIHVwZGF0ZVZhbHVlKHZhbHVlKSB7XHJcbiAgICB0aGlzLl9jaGVja2VkID0gdGhpcy52YWx1ZSA9PT0gdmFsdWU7XHJcbiAgICB0aGlzLl9sYWJlbC5hY3RpdmUgPSB0aGlzLl9jaGVja2VkO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlRGlzYWJsZWQoKSB7IHRoaXMuX2xhYmVsLmRpc2FibGVkID0gdGhpcy5kaXNhYmxlZDsgfVxyXG59XHJcbiJdfQ==