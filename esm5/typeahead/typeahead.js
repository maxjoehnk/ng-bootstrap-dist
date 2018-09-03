/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ComponentFactoryResolver, Directive, ElementRef, EventEmitter, forwardRef, Injector, Input, NgZone, Output, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { positionElements } from '../util/positioning';
import { NgbTypeaheadWindow } from './typeahead-window';
import { PopupService } from '../util/popup';
import { toString, isDefined } from '../util/util';
import { Key } from '../util/key';
import { Live } from '../util/accessibility/live';
import { NgbTypeaheadConfig } from './typeahead-config';
import { map, switchMap, tap } from 'rxjs/operators';
/** @type {?} */
var NGB_TYPEAHEAD_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return NgbTypeahead; }),
    multi: true
};
/**
 * Payload of the selectItem event.
 * @record
 */
export function NgbTypeaheadSelectItemEvent() { }
/**
 * An item about to be selected
 * @type {?}
 */
NgbTypeaheadSelectItemEvent.prototype.item;
/**
 * Function that will prevent item selection if called
 * @type {?}
 */
NgbTypeaheadSelectItemEvent.prototype.preventDefault;
/** @type {?} */
var nextWindowId = 0;
/**
 * NgbTypeahead directive provides a simple way of creating powerful typeaheads from any text input
 */
var NgbTypeahead = /** @class */ (function () {
    function NgbTypeahead(_elementRef, _viewContainerRef, _renderer, _injector, componentFactoryResolver, config, ngZone, _live) {
        var _this = this;
        this._elementRef = _elementRef;
        this._viewContainerRef = _viewContainerRef;
        this._renderer = _renderer;
        this._injector = _injector;
        this._live = _live;
        /**
         * Value for the configurable autocomplete attribute.
         * Defaults to 'off' to disable the native browser autocomplete, but this standard value does not seem
         * to be always correctly taken into account.
         *
         * \@since 2.1.0
         */
        this.autocomplete = 'off';
        /**
         * Placement of a typeahead accepts:
         *    "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right",
         *    "left", "left-top", "left-bottom", "right", "right-top", "right-bottom"
         * and array of above values.
         */
        this.placement = 'bottom-left';
        /**
         * An event emitted when a match is selected. Event payload is of type NgbTypeaheadSelectItemEvent.
         */
        this.selectItem = new EventEmitter();
        this.popupId = "ngb-typeahead-" + nextWindowId++;
        this._onTouched = function () { };
        this._onChange = function (_) { };
        this.container = config.container;
        this.editable = config.editable;
        this.focusFirst = config.focusFirst;
        this.showHint = config.showHint;
        this.placement = config.placement;
        this._valueChanges = fromEvent(_elementRef.nativeElement, 'input')
            .pipe(map(function ($event) { return (/** @type {?} */ ($event.target)).value; }));
        this._resubscribeTypeahead = new BehaviorSubject(null);
        this._popupService = new PopupService(NgbTypeaheadWindow, _injector, _viewContainerRef, _renderer, componentFactoryResolver);
        this._zoneSubscription = ngZone.onStable.subscribe(function () {
            if (_this.isPopupOpen()) {
                positionElements(_this._elementRef.nativeElement, _this._windowRef.location.nativeElement, _this.placement, _this.container === 'body');
            }
        });
    }
    /**
     * @return {?}
     */
    NgbTypeahead.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var inputValues$ = this._valueChanges.pipe(tap(function (value) {
            _this._inputValueBackup = value;
            if (_this.editable) {
                _this._onChange(value);
            }
        }));
        /** @type {?} */
        var results$ = inputValues$.pipe(this.ngbTypeahead);
        /** @type {?} */
        var processedResults$ = results$.pipe(tap(function () {
            if (!_this.editable) {
                _this._onChange(undefined);
            }
        }));
        /** @type {?} */
        var userInput$ = this._resubscribeTypeahead.pipe(switchMap(function () { return processedResults$; }));
        this._subscription = this._subscribeToUserInput(userInput$);
    };
    /**
     * @return {?}
     */
    NgbTypeahead.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._closePopup();
        this._unsubscribeFromUserInput();
        this._zoneSubscription.unsubscribe();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgbTypeahead.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onChange = fn; };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgbTypeahead.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onTouched = fn; };
    /**
     * @param {?} value
     * @return {?}
     */
    NgbTypeahead.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) { this._writeInputValue(this._formatItemForInput(value)); };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NgbTypeahead.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgbTypeahead.prototype.onDocumentClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.target !== this._elementRef.nativeElement) {
            this.dismissPopup();
        }
    };
    /**
     * Dismisses typeahead popup window
     */
    /**
     * Dismisses typeahead popup window
     * @return {?}
     */
    NgbTypeahead.prototype.dismissPopup = /**
     * Dismisses typeahead popup window
     * @return {?}
     */
    function () {
        if (this.isPopupOpen()) {
            this._closePopup();
            this._writeInputValue(this._inputValueBackup);
        }
    };
    /**
     * Returns true if the typeahead popup window is displayed
     */
    /**
     * Returns true if the typeahead popup window is displayed
     * @return {?}
     */
    NgbTypeahead.prototype.isPopupOpen = /**
     * Returns true if the typeahead popup window is displayed
     * @return {?}
     */
    function () { return this._windowRef != null; };
    /**
     * @return {?}
     */
    NgbTypeahead.prototype.handleBlur = /**
     * @return {?}
     */
    function () {
        this._resubscribeTypeahead.next(null);
        this._onTouched();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgbTypeahead.prototype.handleKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.isPopupOpen()) {
            return;
        }
        if (Key[toString(event.which)]) {
            switch (event.which) {
                case Key.ArrowDown:
                    event.preventDefault();
                    this._windowRef.instance.next();
                    this._showHint();
                    break;
                case Key.ArrowUp:
                    event.preventDefault();
                    this._windowRef.instance.prev();
                    this._showHint();
                    break;
                case Key.Enter:
                case Key.Tab:
                    /** @type {?} */
                    var result = this._windowRef.instance.getActive();
                    if (isDefined(result)) {
                        event.preventDefault();
                        event.stopPropagation();
                        this._selectResult(result);
                    }
                    this._closePopup();
                    break;
                case Key.Escape:
                    event.preventDefault();
                    this._resubscribeTypeahead.next(null);
                    this.dismissPopup();
                    break;
            }
        }
    };
    /**
     * @return {?}
     */
    NgbTypeahead.prototype._openPopup = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.isPopupOpen()) {
            this._inputValueBackup = this._elementRef.nativeElement.value;
            this._windowRef = this._popupService.open();
            this._windowRef.instance.id = this.popupId;
            this._windowRef.instance.selectEvent.subscribe(function (result) { return _this._selectResultClosePopup(result); });
            this._windowRef.instance.activeChangeEvent.subscribe(function (activeId) { return _this.activeDescendant = activeId; });
            if (this.container === 'body') {
                window.document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
            }
        }
    };
    /**
     * @return {?}
     */
    NgbTypeahead.prototype._closePopup = /**
     * @return {?}
     */
    function () {
        this._popupService.close();
        this._windowRef = null;
        this.activeDescendant = undefined;
    };
    /**
     * @param {?} result
     * @return {?}
     */
    NgbTypeahead.prototype._selectResult = /**
     * @param {?} result
     * @return {?}
     */
    function (result) {
        /** @type {?} */
        var defaultPrevented = false;
        this.selectItem.emit({ item: result, preventDefault: function () { defaultPrevented = true; } });
        this._resubscribeTypeahead.next(null);
        if (!defaultPrevented) {
            this.writeValue(result);
            this._onChange(result);
        }
    };
    /**
     * @param {?} result
     * @return {?}
     */
    NgbTypeahead.prototype._selectResultClosePopup = /**
     * @param {?} result
     * @return {?}
     */
    function (result) {
        this._selectResult(result);
        this._closePopup();
    };
    /**
     * @return {?}
     */
    NgbTypeahead.prototype._showHint = /**
     * @return {?}
     */
    function () {
        if (this.showHint && this._windowRef.instance.hasActive() && this._inputValueBackup != null) {
            /** @type {?} */
            var userInputLowerCase = this._inputValueBackup.toLowerCase();
            /** @type {?} */
            var formattedVal = this._formatItemForInput(this._windowRef.instance.getActive());
            if (userInputLowerCase === formattedVal.substr(0, this._inputValueBackup.length).toLowerCase()) {
                this._writeInputValue(this._inputValueBackup + formattedVal.substr(this._inputValueBackup.length));
                this._elementRef.nativeElement['setSelectionRange'].apply(this._elementRef.nativeElement, [this._inputValueBackup.length, formattedVal.length]);
            }
            else {
                this.writeValue(this._windowRef.instance.getActive());
            }
        }
    };
    /**
     * @param {?} item
     * @return {?}
     */
    NgbTypeahead.prototype._formatItemForInput = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return item != null && this.inputFormatter ? this.inputFormatter(item) : toString(item);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NgbTypeahead.prototype._writeInputValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'value', toString(value));
    };
    /**
     * @param {?} userInput$
     * @return {?}
     */
    NgbTypeahead.prototype._subscribeToUserInput = /**
     * @param {?} userInput$
     * @return {?}
     */
    function (userInput$) {
        var _this = this;
        return userInput$.subscribe(function (results) {
            if (!results || results.length === 0) {
                _this._closePopup();
            }
            else {
                _this._openPopup();
                _this._windowRef.instance.focusFirst = _this.focusFirst;
                _this._windowRef.instance.results = results;
                _this._windowRef.instance.term = _this._elementRef.nativeElement.value;
                if (_this.resultFormatter) {
                    _this._windowRef.instance.formatter = _this.resultFormatter;
                }
                if (_this.resultTemplate) {
                    _this._windowRef.instance.resultTemplate = _this.resultTemplate;
                }
                _this._windowRef.instance.resetActive();
                // The observable stream we are subscribing to might have async steps
                // and if a component containing typeahead is using the OnPush strategy
                // the change detection turn wouldn't be invoked automatically.
                // The observable stream we are subscribing to might have async steps
                // and if a component containing typeahead is using the OnPush strategy
                // the change detection turn wouldn't be invoked automatically.
                _this._windowRef.changeDetectorRef.detectChanges();
                _this._showHint();
            }
            /** @type {?} */
            var count = results ? results.length : 0;
            _this._live.say(count === 0 ? 'No results available' : count + " result" + (count === 1 ? '' : 's') + " available");
        });
    };
    /**
     * @return {?}
     */
    NgbTypeahead.prototype._unsubscribeFromUserInput = /**
     * @return {?}
     */
    function () {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        this._subscription = null;
    };
    NgbTypeahead.decorators = [
        { type: Directive, args: [{
                    selector: 'input[ngbTypeahead]',
                    exportAs: 'ngbTypeahead',
                    host: {
                        '(blur)': 'handleBlur()',
                        '[class.open]': 'isPopupOpen()',
                        '(document:click)': 'onDocumentClick($event)',
                        '(keydown)': 'handleKeyDown($event)',
                        '[autocomplete]': 'autocomplete',
                        'autocapitalize': 'off',
                        'autocorrect': 'off',
                        'role': 'combobox',
                        'aria-multiline': 'false',
                        '[attr.aria-autocomplete]': 'showHint ? "both" : "list"',
                        '[attr.aria-activedescendant]': 'activeDescendant',
                        '[attr.aria-owns]': 'isPopupOpen() ? popupId : null',
                        '[attr.aria-expanded]': 'isPopupOpen()'
                    },
                    providers: [NGB_TYPEAHEAD_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    NgbTypeahead.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ViewContainerRef },
        { type: Renderer2 },
        { type: Injector },
        { type: ComponentFactoryResolver },
        { type: NgbTypeaheadConfig },
        { type: NgZone },
        { type: Live }
    ]; };
    NgbTypeahead.propDecorators = {
        autocomplete: [{ type: Input }],
        container: [{ type: Input }],
        editable: [{ type: Input }],
        focusFirst: [{ type: Input }],
        inputFormatter: [{ type: Input }],
        ngbTypeahead: [{ type: Input }],
        resultFormatter: [{ type: Input }],
        resultTemplate: [{ type: Input }],
        showHint: [{ type: Input }],
        placement: [{ type: Input }],
        selectItem: [{ type: Output }]
    };
    return NgbTypeahead;
}());
export { NgbTypeahead };
if (false) {
    /** @type {?} */
    NgbTypeahead.prototype._popupService;
    /** @type {?} */
    NgbTypeahead.prototype._subscription;
    /** @type {?} */
    NgbTypeahead.prototype._inputValueBackup;
    /** @type {?} */
    NgbTypeahead.prototype._valueChanges;
    /** @type {?} */
    NgbTypeahead.prototype._resubscribeTypeahead;
    /** @type {?} */
    NgbTypeahead.prototype._windowRef;
    /** @type {?} */
    NgbTypeahead.prototype._zoneSubscription;
    /**
     * Value for the configurable autocomplete attribute.
     * Defaults to 'off' to disable the native browser autocomplete, but this standard value does not seem
     * to be always correctly taken into account.
     *
     * \@since 2.1.0
     * @type {?}
     */
    NgbTypeahead.prototype.autocomplete;
    /**
     * A selector specifying the element the tooltip should be appended to.
     * Currently only supports "body".
     * @type {?}
     */
    NgbTypeahead.prototype.container;
    /**
     * A flag indicating if model values should be restricted to the ones selected from the popup only.
     * @type {?}
     */
    NgbTypeahead.prototype.editable;
    /**
     * A flag indicating if the first match should automatically be focused as you type.
     * @type {?}
     */
    NgbTypeahead.prototype.focusFirst;
    /**
     * A function to convert a given value into string to display in the input field
     * @type {?}
     */
    NgbTypeahead.prototype.inputFormatter;
    /**
     * A function to transform the provided observable text into the array of results.  Note that the "this" argument
     * is undefined so you need to explicitly bind it to a desired "this" target.
     * @type {?}
     */
    NgbTypeahead.prototype.ngbTypeahead;
    /**
     * A function to format a given result before display. This function should return a formatted string without any
     * HTML markup
     * @type {?}
     */
    NgbTypeahead.prototype.resultFormatter;
    /**
     * A template to override a matching result default display
     * @type {?}
     */
    NgbTypeahead.prototype.resultTemplate;
    /**
     * Show hint when an option in the result list matches.
     * @type {?}
     */
    NgbTypeahead.prototype.showHint;
    /**
     * Placement of a typeahead accepts:
     *    "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right",
     *    "left", "left-top", "left-bottom", "right", "right-top", "right-bottom"
     * and array of above values.
     * @type {?}
     */
    NgbTypeahead.prototype.placement;
    /**
     * An event emitted when a match is selected. Event payload is of type NgbTypeaheadSelectItemEvent.
     * @type {?}
     */
    NgbTypeahead.prototype.selectItem;
    /** @type {?} */
    NgbTypeahead.prototype.activeDescendant;
    /** @type {?} */
    NgbTypeahead.prototype.popupId;
    /** @type {?} */
    NgbTypeahead.prototype._onTouched;
    /** @type {?} */
    NgbTypeahead.prototype._onChange;
    /** @type {?} */
    NgbTypeahead.prototype._elementRef;
    /** @type {?} */
    NgbTypeahead.prototype._viewContainerRef;
    /** @type {?} */
    NgbTypeahead.prototype._renderer;
    /** @type {?} */
    NgbTypeahead.prototype._injector;
    /** @type {?} */
    NgbTypeahead.prototype._live;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJ0eXBlYWhlYWQvdHlwZWFoZWFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsd0JBQXdCLEVBRXhCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixRQUFRLEVBQ1IsS0FBSyxFQUNMLE1BQU0sRUFHTixNQUFNLEVBQ04sU0FBUyxFQUNULFdBQVcsRUFDWCxnQkFBZ0IsRUFDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF1QixpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZFLE9BQU8sRUFBYSxlQUFlLEVBQWdCLFNBQVMsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUMxRSxPQUFPLEVBQUMsZ0JBQWdCLEVBQWlCLE1BQU0scUJBQXFCLENBQUM7QUFDckUsT0FBTyxFQUFDLGtCQUFrQixFQUF3QixNQUFNLG9CQUFvQixDQUFDO0FBQzdFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDakQsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUNoQyxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDaEQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7O0FBRW5ELElBQU0sNEJBQTRCLEdBQUc7SUFDbkMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxZQUFZLEVBQVosQ0FBWSxDQUFDO0lBQzNDLEtBQUssRUFBRSxJQUFJ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QkFDcEIsTUFBTSxFQUFFLFVBQVU7d0JBQ2xCLGdCQUFnQixFQUFFLE9BQU87d0JBQ3pCLDBCQUEwQixFQUFFLDRCQUE0Qjt3QkFDeEQsOEJBQThCLEVBQUUsa0JBQWtCO3dCQUNsRCxrQkFBa0IsRUFBRSxnQ0FBZ0M7d0JBQ3BELHNCQUFzQixFQUFFLGVBQWU7cUJBQ3hDO29CQUNELFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO2lCQUMxQzs7OztnQkFyRUMsVUFBVTtnQkFXVixnQkFBZ0I7Z0JBRmhCLFNBQVM7Z0JBTlQsUUFBUTtnQkFOUix3QkFBd0I7Z0JBd0JsQixrQkFBa0I7Z0JBaEJ4QixNQUFNO2dCQWVBLElBQUk7OzsrQkFtRVQsS0FBSzs0QkFNTCxLQUFLOzJCQUtMLEtBQUs7NkJBS0wsS0FBSztpQ0FLTCxLQUFLOytCQU1MLEtBQUs7a0NBTUwsS0FBSztpQ0FLTCxLQUFLOzJCQUtMLEtBQUs7NEJBT0wsS0FBSzs2QkFLTCxNQUFNOzt1QkFsSlQ7O1NBMEVhLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICBDb21wb25lbnRSZWYsXHJcbiAgRGlyZWN0aXZlLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIGZvcndhcmRSZWYsXHJcbiAgSW5qZWN0b3IsXHJcbiAgSW5wdXQsXHJcbiAgTmdab25lLFxyXG4gIE9uRGVzdHJveSxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIFJlbmRlcmVyMixcclxuICBUZW1wbGF0ZVJlZixcclxuICBWaWV3Q29udGFpbmVyUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7T2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24sIGZyb21FdmVudH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7cG9zaXRpb25FbGVtZW50cywgUGxhY2VtZW50QXJyYXl9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmcnO1xyXG5pbXBvcnQge05nYlR5cGVhaGVhZFdpbmRvdywgUmVzdWx0VGVtcGxhdGVDb250ZXh0fSBmcm9tICcuL3R5cGVhaGVhZC13aW5kb3cnO1xyXG5pbXBvcnQge1BvcHVwU2VydmljZX0gZnJvbSAnLi4vdXRpbC9wb3B1cCc7XHJcbmltcG9ydCB7dG9TdHJpbmcsIGlzRGVmaW5lZH0gZnJvbSAnLi4vdXRpbC91dGlsJztcclxuaW1wb3J0IHtLZXl9IGZyb20gJy4uL3V0aWwva2V5JztcclxuaW1wb3J0IHtMaXZlfSBmcm9tICcuLi91dGlsL2FjY2Vzc2liaWxpdHkvbGl2ZSc7XHJcbmltcG9ydCB7TmdiVHlwZWFoZWFkQ29uZmlnfSBmcm9tICcuL3R5cGVhaGVhZC1jb25maWcnO1xyXG5pbXBvcnQge21hcCwgc3dpdGNoTWFwLCB0YXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmNvbnN0IE5HQl9UWVBFQUhFQURfVkFMVUVfQUNDRVNTT1IgPSB7XHJcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdiVHlwZWFoZWFkKSxcclxuICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFBheWxvYWQgb2YgdGhlIHNlbGVjdEl0ZW0gZXZlbnQuXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIE5nYlR5cGVhaGVhZFNlbGVjdEl0ZW1FdmVudCB7XHJcbiAgLyoqXHJcbiAgICogQW4gaXRlbSBhYm91dCB0byBiZSBzZWxlY3RlZFxyXG4gICAqL1xyXG4gIGl0ZW06IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogRnVuY3Rpb24gdGhhdCB3aWxsIHByZXZlbnQgaXRlbSBzZWxlY3Rpb24gaWYgY2FsbGVkXHJcbiAgICovXHJcbiAgcHJldmVudERlZmF1bHQ6ICgpID0+IHZvaWQ7XHJcbn1cclxuXHJcbmxldCBuZXh0V2luZG93SWQgPSAwO1xyXG5cclxuLyoqXHJcbiAqIE5nYlR5cGVhaGVhZCBkaXJlY3RpdmUgcHJvdmlkZXMgYSBzaW1wbGUgd2F5IG9mIGNyZWF0aW5nIHBvd2VyZnVsIHR5cGVhaGVhZHMgZnJvbSBhbnkgdGV4dCBpbnB1dFxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdpbnB1dFtuZ2JUeXBlYWhlYWRdJyxcclxuICBleHBvcnRBczogJ25nYlR5cGVhaGVhZCcsXHJcbiAgaG9zdDoge1xyXG4gICAgJyhibHVyKSc6ICdoYW5kbGVCbHVyKCknLFxyXG4gICAgJ1tjbGFzcy5vcGVuXSc6ICdpc1BvcHVwT3BlbigpJyxcclxuICAgICcoZG9jdW1lbnQ6Y2xpY2spJzogJ29uRG9jdW1lbnRDbGljaygkZXZlbnQpJyxcclxuICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5RG93bigkZXZlbnQpJyxcclxuICAgICdbYXV0b2NvbXBsZXRlXSc6ICdhdXRvY29tcGxldGUnLFxyXG4gICAgJ2F1dG9jYXBpdGFsaXplJzogJ29mZicsXHJcbiAgICAnYXV0b2NvcnJlY3QnOiAnb2ZmJyxcclxuICAgICdyb2xlJzogJ2NvbWJvYm94JyxcclxuICAgICdhcmlhLW11bHRpbGluZSc6ICdmYWxzZScsXHJcbiAgICAnW2F0dHIuYXJpYS1hdXRvY29tcGxldGVdJzogJ3Nob3dIaW50ID8gXCJib3RoXCIgOiBcImxpc3RcIicsXHJcbiAgICAnW2F0dHIuYXJpYS1hY3RpdmVkZXNjZW5kYW50XSc6ICdhY3RpdmVEZXNjZW5kYW50JyxcclxuICAgICdbYXR0ci5hcmlhLW93bnNdJzogJ2lzUG9wdXBPcGVuKCkgPyBwb3B1cElkIDogbnVsbCcsXHJcbiAgICAnW2F0dHIuYXJpYS1leHBhbmRlZF0nOiAnaXNQb3B1cE9wZW4oKSdcclxuICB9LFxyXG4gIHByb3ZpZGVyczogW05HQl9UWVBFQUhFQURfVkFMVUVfQUNDRVNTT1JdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JUeXBlYWhlYWQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvcixcclxuICAgIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBwcml2YXRlIF9wb3B1cFNlcnZpY2U6IFBvcHVwU2VydmljZTxOZ2JUeXBlYWhlYWRXaW5kb3c+O1xyXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgX2lucHV0VmFsdWVCYWNrdXA6IHN0cmluZztcclxuICBwcml2YXRlIF92YWx1ZUNoYW5nZXM6IE9ic2VydmFibGU8c3RyaW5nPjtcclxuICBwcml2YXRlIF9yZXN1YnNjcmliZVR5cGVhaGVhZDogQmVoYXZpb3JTdWJqZWN0PGFueT47XHJcbiAgcHJpdmF0ZSBfd2luZG93UmVmOiBDb21wb25lbnRSZWY8TmdiVHlwZWFoZWFkV2luZG93PjtcclxuICBwcml2YXRlIF96b25lU3Vic2NyaXB0aW9uOiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFZhbHVlIGZvciB0aGUgY29uZmlndXJhYmxlIGF1dG9jb21wbGV0ZSBhdHRyaWJ1dGUuXHJcbiAgICogRGVmYXVsdHMgdG8gJ29mZicgdG8gZGlzYWJsZSB0aGUgbmF0aXZlIGJyb3dzZXIgYXV0b2NvbXBsZXRlLCBidXQgdGhpcyBzdGFuZGFyZCB2YWx1ZSBkb2VzIG5vdCBzZWVtXHJcbiAgICogdG8gYmUgYWx3YXlzIGNvcnJlY3RseSB0YWtlbiBpbnRvIGFjY291bnQuXHJcbiAgICpcclxuICAgKiBAc2luY2UgMi4xLjBcclxuICAgKi9cclxuICBASW5wdXQoKSBhdXRvY29tcGxldGUgPSAnb2ZmJztcclxuXHJcbiAgLyoqXHJcbiAgICogQSBzZWxlY3RvciBzcGVjaWZ5aW5nIHRoZSBlbGVtZW50IHRoZSB0b29sdGlwIHNob3VsZCBiZSBhcHBlbmRlZCB0by5cclxuICAgKiBDdXJyZW50bHkgb25seSBzdXBwb3J0cyBcImJvZHlcIi5cclxuICAgKi9cclxuICBASW5wdXQoKSBjb250YWluZXI6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogQSBmbGFnIGluZGljYXRpbmcgaWYgbW9kZWwgdmFsdWVzIHNob3VsZCBiZSByZXN0cmljdGVkIHRvIHRoZSBvbmVzIHNlbGVjdGVkIGZyb20gdGhlIHBvcHVwIG9ubHkuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZWRpdGFibGU6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBmaXJzdCBtYXRjaCBzaG91bGQgYXV0b21hdGljYWxseSBiZSBmb2N1c2VkIGFzIHlvdSB0eXBlLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGZvY3VzRmlyc3Q6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZnVuY3Rpb24gdG8gY29udmVydCBhIGdpdmVuIHZhbHVlIGludG8gc3RyaW5nIHRvIGRpc3BsYXkgaW4gdGhlIGlucHV0IGZpZWxkXHJcbiAgICovXHJcbiAgQElucHV0KCkgaW5wdXRGb3JtYXR0ZXI6ICh2YWx1ZTogYW55KSA9PiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZnVuY3Rpb24gdG8gdHJhbnNmb3JtIHRoZSBwcm92aWRlZCBvYnNlcnZhYmxlIHRleHQgaW50byB0aGUgYXJyYXkgb2YgcmVzdWx0cy4gIE5vdGUgdGhhdCB0aGUgXCJ0aGlzXCIgYXJndW1lbnRcclxuICAgKiBpcyB1bmRlZmluZWQgc28geW91IG5lZWQgdG8gZXhwbGljaXRseSBiaW5kIGl0IHRvIGEgZGVzaXJlZCBcInRoaXNcIiB0YXJnZXQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgbmdiVHlwZWFoZWFkOiAodGV4dDogT2JzZXJ2YWJsZTxzdHJpbmc+KSA9PiBPYnNlcnZhYmxlPGFueVtdPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBmdW5jdGlvbiB0byBmb3JtYXQgYSBnaXZlbiByZXN1bHQgYmVmb3JlIGRpc3BsYXkuIFRoaXMgZnVuY3Rpb24gc2hvdWxkIHJldHVybiBhIGZvcm1hdHRlZCBzdHJpbmcgd2l0aG91dCBhbnlcclxuICAgKiBIVE1MIG1hcmt1cFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHJlc3VsdEZvcm1hdHRlcjogKHZhbHVlOiBhbnkpID0+IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogQSB0ZW1wbGF0ZSB0byBvdmVycmlkZSBhIG1hdGNoaW5nIHJlc3VsdCBkZWZhdWx0IGRpc3BsYXlcclxuICAgKi9cclxuICBASW5wdXQoKSByZXN1bHRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8UmVzdWx0VGVtcGxhdGVDb250ZXh0PjtcclxuXHJcbiAgLyoqXHJcbiAgICogU2hvdyBoaW50IHdoZW4gYW4gb3B0aW9uIGluIHRoZSByZXN1bHQgbGlzdCBtYXRjaGVzLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNob3dIaW50OiBib29sZWFuO1xyXG5cclxuICAvKiogUGxhY2VtZW50IG9mIGEgdHlwZWFoZWFkIGFjY2VwdHM6XHJcbiAgICogICAgXCJ0b3BcIiwgXCJ0b3AtbGVmdFwiLCBcInRvcC1yaWdodFwiLCBcImJvdHRvbVwiLCBcImJvdHRvbS1sZWZ0XCIsIFwiYm90dG9tLXJpZ2h0XCIsXHJcbiAgICogICAgXCJsZWZ0XCIsIFwibGVmdC10b3BcIiwgXCJsZWZ0LWJvdHRvbVwiLCBcInJpZ2h0XCIsIFwicmlnaHQtdG9wXCIsIFwicmlnaHQtYm90dG9tXCJcclxuICAgKiBhbmQgYXJyYXkgb2YgYWJvdmUgdmFsdWVzLlxyXG4gICovXHJcbiAgQElucHV0KCkgcGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheSA9ICdib3R0b20tbGVmdCc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiBhIG1hdGNoIGlzIHNlbGVjdGVkLiBFdmVudCBwYXlsb2FkIGlzIG9mIHR5cGUgTmdiVHlwZWFoZWFkU2VsZWN0SXRlbUV2ZW50LlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RJdGVtID0gbmV3IEV2ZW50RW1pdHRlcjxOZ2JUeXBlYWhlYWRTZWxlY3RJdGVtRXZlbnQ+KCk7XHJcblxyXG4gIGFjdGl2ZURlc2NlbmRhbnQ6IHN0cmluZztcclxuICBwb3B1cElkID0gYG5nYi10eXBlYWhlYWQtJHtuZXh0V2luZG93SWQrK31gO1xyXG5cclxuICBwcml2YXRlIF9vblRvdWNoZWQgPSAoKSA9PiB7fTtcclxuICBwcml2YXRlIF9vbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PiwgcHJpdmF0ZSBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcclxuICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yLCBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgICAgY29uZmlnOiBOZ2JUeXBlYWhlYWRDb25maWcsIG5nWm9uZTogTmdab25lLCBwcml2YXRlIF9saXZlOiBMaXZlKSB7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbmZpZy5jb250YWluZXI7XHJcbiAgICB0aGlzLmVkaXRhYmxlID0gY29uZmlnLmVkaXRhYmxlO1xyXG4gICAgdGhpcy5mb2N1c0ZpcnN0ID0gY29uZmlnLmZvY3VzRmlyc3Q7XHJcbiAgICB0aGlzLnNob3dIaW50ID0gY29uZmlnLnNob3dIaW50O1xyXG4gICAgdGhpcy5wbGFjZW1lbnQgPSBjb25maWcucGxhY2VtZW50O1xyXG5cclxuICAgIHRoaXMuX3ZhbHVlQ2hhbmdlcyA9IGZyb21FdmVudDxFdmVudD4oX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2lucHV0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShtYXAoJGV2ZW50ID0+ICgkZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlKSk7XHJcblxyXG4gICAgdGhpcy5fcmVzdWJzY3JpYmVUeXBlYWhlYWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xyXG5cclxuICAgIHRoaXMuX3BvcHVwU2VydmljZSA9IG5ldyBQb3B1cFNlcnZpY2U8TmdiVHlwZWFoZWFkV2luZG93PihcclxuICAgICAgICBOZ2JUeXBlYWhlYWRXaW5kb3csIF9pbmplY3RvciwgX3ZpZXdDb250YWluZXJSZWYsIF9yZW5kZXJlciwgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyKTtcclxuXHJcbiAgICB0aGlzLl96b25lU3Vic2NyaXB0aW9uID0gbmdab25lLm9uU3RhYmxlLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmlzUG9wdXBPcGVuKCkpIHtcclxuICAgICAgICBwb3NpdGlvbkVsZW1lbnRzKFxyXG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX3dpbmRvd1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LCB0aGlzLnBsYWNlbWVudCxcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPT09ICdib2R5Jyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICBjb25zdCBpbnB1dFZhbHVlcyQgPSB0aGlzLl92YWx1ZUNoYW5nZXMucGlwZSh0YXAodmFsdWUgPT4ge1xyXG4gICAgICB0aGlzLl9pbnB1dFZhbHVlQmFja3VwID0gdmFsdWU7XHJcbiAgICAgIGlmICh0aGlzLmVkaXRhYmxlKSB7XHJcbiAgICAgICAgdGhpcy5fb25DaGFuZ2UodmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICB9KSk7XHJcbiAgICBjb25zdCByZXN1bHRzJCA9IGlucHV0VmFsdWVzJC5waXBlKHRoaXMubmdiVHlwZWFoZWFkKTtcclxuICAgIGNvbnN0IHByb2Nlc3NlZFJlc3VsdHMkID0gcmVzdWx0cyQucGlwZSh0YXAoKCkgPT4ge1xyXG4gICAgICBpZiAoIXRoaXMuZWRpdGFibGUpIHtcclxuICAgICAgICB0aGlzLl9vbkNoYW5nZSh1bmRlZmluZWQpO1xyXG4gICAgICB9XHJcbiAgICB9KSk7XHJcbiAgICBjb25zdCB1c2VySW5wdXQkID0gdGhpcy5fcmVzdWJzY3JpYmVUeXBlYWhlYWQucGlwZShzd2l0Y2hNYXAoKCkgPT4gcHJvY2Vzc2VkUmVzdWx0cyQpKTtcclxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IHRoaXMuX3N1YnNjcmliZVRvVXNlcklucHV0KHVzZXJJbnB1dCQpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLl9jbG9zZVBvcHVwKCk7XHJcbiAgICB0aGlzLl91bnN1YnNjcmliZUZyb21Vc2VySW5wdXQoKTtcclxuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5fb25DaGFuZ2UgPSBmbjsgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gYW55KTogdm9pZCB7IHRoaXMuX29uVG91Y2hlZCA9IGZuOyB9XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWUpIHsgdGhpcy5fd3JpdGVJbnB1dFZhbHVlKHRoaXMuX2Zvcm1hdEl0ZW1Gb3JJbnB1dCh2YWx1ZSkpOyB9XHJcblxyXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZGlzYWJsZWQnLCBpc0Rpc2FibGVkKTtcclxuICB9XHJcblxyXG4gIG9uRG9jdW1lbnRDbGljayhldmVudCkge1xyXG4gICAgaWYgKGV2ZW50LnRhcmdldCAhPT0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSB7XHJcbiAgICAgIHRoaXMuZGlzbWlzc1BvcHVwKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEaXNtaXNzZXMgdHlwZWFoZWFkIHBvcHVwIHdpbmRvd1xyXG4gICAqL1xyXG4gIGRpc21pc3NQb3B1cCgpIHtcclxuICAgIGlmICh0aGlzLmlzUG9wdXBPcGVuKCkpIHtcclxuICAgICAgdGhpcy5fY2xvc2VQb3B1cCgpO1xyXG4gICAgICB0aGlzLl93cml0ZUlucHV0VmFsdWUodGhpcy5faW5wdXRWYWx1ZUJhY2t1cCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHR5cGVhaGVhZCBwb3B1cCB3aW5kb3cgaXMgZGlzcGxheWVkXHJcbiAgICovXHJcbiAgaXNQb3B1cE9wZW4oKSB7IHJldHVybiB0aGlzLl93aW5kb3dSZWYgIT0gbnVsbDsgfVxyXG5cclxuICBoYW5kbGVCbHVyKCkge1xyXG4gICAgdGhpcy5fcmVzdWJzY3JpYmVUeXBlYWhlYWQubmV4dChudWxsKTtcclxuICAgIHRoaXMuX29uVG91Y2hlZCgpO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgaWYgKCF0aGlzLmlzUG9wdXBPcGVuKCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChLZXlbdG9TdHJpbmcoZXZlbnQud2hpY2gpXSkge1xyXG4gICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XHJcbiAgICAgICAgY2FzZSBLZXkuQXJyb3dEb3duOlxyXG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5uZXh0KCk7XHJcbiAgICAgICAgICB0aGlzLl9zaG93SGludCgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBLZXkuQXJyb3dVcDpcclxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UucHJldigpO1xyXG4gICAgICAgICAgdGhpcy5fc2hvd0hpbnQoKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgS2V5LkVudGVyOlxyXG4gICAgICAgIGNhc2UgS2V5LlRhYjpcclxuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5nZXRBY3RpdmUoKTtcclxuICAgICAgICAgIGlmIChpc0RlZmluZWQocmVzdWx0KSkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0UmVzdWx0KHJlc3VsdCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLl9jbG9zZVBvcHVwKCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEtleS5Fc2NhcGU6XHJcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgdGhpcy5fcmVzdWJzY3JpYmVUeXBlYWhlYWQubmV4dChudWxsKTtcclxuICAgICAgICAgIHRoaXMuZGlzbWlzc1BvcHVwKCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfb3BlblBvcHVwKCkge1xyXG4gICAgaWYgKCF0aGlzLmlzUG9wdXBPcGVuKCkpIHtcclxuICAgICAgdGhpcy5faW5wdXRWYWx1ZUJhY2t1cCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZTtcclxuICAgICAgdGhpcy5fd2luZG93UmVmID0gdGhpcy5fcG9wdXBTZXJ2aWNlLm9wZW4oKTtcclxuICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmlkID0gdGhpcy5wb3B1cElkO1xyXG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2Uuc2VsZWN0RXZlbnQuc3Vic2NyaWJlKChyZXN1bHQ6IGFueSkgPT4gdGhpcy5fc2VsZWN0UmVzdWx0Q2xvc2VQb3B1cChyZXN1bHQpKTtcclxuICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmFjdGl2ZUNoYW5nZUV2ZW50LnN1YnNjcmliZSgoYWN0aXZlSWQ6IHN0cmluZykgPT4gdGhpcy5hY3RpdmVEZXNjZW5kYW50ID0gYWN0aXZlSWQpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuY29udGFpbmVyID09PSAnYm9keScpIHtcclxuICAgICAgICB3aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmNvbnRhaW5lcikuYXBwZW5kQ2hpbGQodGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9jbG9zZVBvcHVwKCkge1xyXG4gICAgdGhpcy5fcG9wdXBTZXJ2aWNlLmNsb3NlKCk7XHJcbiAgICB0aGlzLl93aW5kb3dSZWYgPSBudWxsO1xyXG4gICAgdGhpcy5hY3RpdmVEZXNjZW5kYW50ID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc2VsZWN0UmVzdWx0KHJlc3VsdDogYW55KSB7XHJcbiAgICBsZXQgZGVmYXVsdFByZXZlbnRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zZWxlY3RJdGVtLmVtaXQoe2l0ZW06IHJlc3VsdCwgcHJldmVudERlZmF1bHQ6ICgpID0+IHsgZGVmYXVsdFByZXZlbnRlZCA9IHRydWU7IH19KTtcclxuICAgIHRoaXMuX3Jlc3Vic2NyaWJlVHlwZWFoZWFkLm5leHQobnVsbCk7XHJcblxyXG4gICAgaWYgKCFkZWZhdWx0UHJldmVudGVkKSB7XHJcbiAgICAgIHRoaXMud3JpdGVWYWx1ZShyZXN1bHQpO1xyXG4gICAgICB0aGlzLl9vbkNoYW5nZShyZXN1bHQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc2VsZWN0UmVzdWx0Q2xvc2VQb3B1cChyZXN1bHQ6IGFueSkge1xyXG4gICAgdGhpcy5fc2VsZWN0UmVzdWx0KHJlc3VsdCk7XHJcbiAgICB0aGlzLl9jbG9zZVBvcHVwKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zaG93SGludCgpIHtcclxuICAgIGlmICh0aGlzLnNob3dIaW50ICYmIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5oYXNBY3RpdmUoKSAmJiB0aGlzLl9pbnB1dFZhbHVlQmFja3VwICE9IG51bGwpIHtcclxuICAgICAgY29uc3QgdXNlcklucHV0TG93ZXJDYXNlID0gdGhpcy5faW5wdXRWYWx1ZUJhY2t1cC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICBjb25zdCBmb3JtYXR0ZWRWYWwgPSB0aGlzLl9mb3JtYXRJdGVtRm9ySW5wdXQodGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmdldEFjdGl2ZSgpKTtcclxuXHJcbiAgICAgIGlmICh1c2VySW5wdXRMb3dlckNhc2UgPT09IGZvcm1hdHRlZFZhbC5zdWJzdHIoMCwgdGhpcy5faW5wdXRWYWx1ZUJhY2t1cC5sZW5ndGgpLnRvTG93ZXJDYXNlKCkpIHtcclxuICAgICAgICB0aGlzLl93cml0ZUlucHV0VmFsdWUodGhpcy5faW5wdXRWYWx1ZUJhY2t1cCArIGZvcm1hdHRlZFZhbC5zdWJzdHIodGhpcy5faW5wdXRWYWx1ZUJhY2t1cC5sZW5ndGgpKTtcclxuICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnRbJ3NldFNlbGVjdGlvblJhbmdlJ10uYXBwbHkoXHJcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgW3RoaXMuX2lucHV0VmFsdWVCYWNrdXAubGVuZ3RoLCBmb3JtYXR0ZWRWYWwubGVuZ3RoXSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy53cml0ZVZhbHVlKHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5nZXRBY3RpdmUoKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2Zvcm1hdEl0ZW1Gb3JJbnB1dChpdGVtOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGl0ZW0gIT0gbnVsbCAmJiB0aGlzLmlucHV0Rm9ybWF0dGVyID8gdGhpcy5pbnB1dEZvcm1hdHRlcihpdGVtKSA6IHRvU3RyaW5nKGl0ZW0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfd3JpdGVJbnB1dFZhbHVlKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMuX3JlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgdG9TdHJpbmcodmFsdWUpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3N1YnNjcmliZVRvVXNlcklucHV0KHVzZXJJbnB1dCQ6IE9ic2VydmFibGU8YW55W10+KTogU3Vic2NyaXB0aW9uIHtcclxuICAgIHJldHVybiB1c2VySW5wdXQkLnN1YnNjcmliZSgocmVzdWx0cykgPT4ge1xyXG4gICAgICBpZiAoIXJlc3VsdHMgfHwgcmVzdWx0cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICB0aGlzLl9jbG9zZVBvcHVwKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fb3BlblBvcHVwKCk7XHJcbiAgICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmZvY3VzRmlyc3QgPSB0aGlzLmZvY3VzRmlyc3Q7XHJcbiAgICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLnJlc3VsdHMgPSByZXN1bHRzO1xyXG4gICAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS50ZXJtID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlO1xyXG4gICAgICAgIGlmICh0aGlzLnJlc3VsdEZvcm1hdHRlcikge1xyXG4gICAgICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmZvcm1hdHRlciA9IHRoaXMucmVzdWx0Rm9ybWF0dGVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5yZXN1bHRUZW1wbGF0ZSkge1xyXG4gICAgICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLnJlc3VsdFRlbXBsYXRlID0gdGhpcy5yZXN1bHRUZW1wbGF0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLnJlc2V0QWN0aXZlKCk7XHJcblxyXG4gICAgICAgIC8vIFRoZSBvYnNlcnZhYmxlIHN0cmVhbSB3ZSBhcmUgc3Vic2NyaWJpbmcgdG8gbWlnaHQgaGF2ZSBhc3luYyBzdGVwc1xyXG4gICAgICAgIC8vIGFuZCBpZiBhIGNvbXBvbmVudCBjb250YWluaW5nIHR5cGVhaGVhZCBpcyB1c2luZyB0aGUgT25QdXNoIHN0cmF0ZWd5XHJcbiAgICAgICAgLy8gdGhlIGNoYW5nZSBkZXRlY3Rpb24gdHVybiB3b3VsZG4ndCBiZSBpbnZva2VkIGF1dG9tYXRpY2FsbHkuXHJcbiAgICAgICAgdGhpcy5fd2luZG93UmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fc2hvd0hpbnQoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gbGl2ZSBhbm5vdW5jZXJcclxuICAgICAgY29uc3QgY291bnQgPSByZXN1bHRzID8gcmVzdWx0cy5sZW5ndGggOiAwO1xyXG4gICAgICB0aGlzLl9saXZlLnNheShjb3VudCA9PT0gMCA/ICdObyByZXN1bHRzIGF2YWlsYWJsZScgOiBgJHtjb3VudH0gcmVzdWx0JHtjb3VudCA9PT0gMSA/ICcnIDogJ3MnfSBhdmFpbGFibGVgKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfdW5zdWJzY3JpYmVGcm9tVXNlcklucHV0KCkge1xyXG4gICAgaWYgKHRoaXMuX3N1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IG51bGw7XHJcbiAgfVxyXG59XHJcbiJdfQ==