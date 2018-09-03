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
const NGB_TYPEAHEAD_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgbTypeahead),
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
let nextWindowId = 0;
/**
 * NgbTypeahead directive provides a simple way of creating powerful typeaheads from any text input
 */
export class NgbTypeahead {
    /**
     * @param {?} _elementRef
     * @param {?} _viewContainerRef
     * @param {?} _renderer
     * @param {?} _injector
     * @param {?} componentFactoryResolver
     * @param {?} config
     * @param {?} ngZone
     * @param {?} _live
     */
    constructor(_elementRef, _viewContainerRef, _renderer, _injector, componentFactoryResolver, config, ngZone, _live) {
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
        this.popupId = `ngb-typeahead-${nextWindowId++}`;
        this._onTouched = () => { };
        this._onChange = (_) => { };
        this.container = config.container;
        this.editable = config.editable;
        this.focusFirst = config.focusFirst;
        this.showHint = config.showHint;
        this.placement = config.placement;
        this._valueChanges = fromEvent(_elementRef.nativeElement, 'input')
            .pipe(map($event => (/** @type {?} */ ($event.target)).value));
        this._resubscribeTypeahead = new BehaviorSubject(null);
        this._popupService = new PopupService(NgbTypeaheadWindow, _injector, _viewContainerRef, _renderer, componentFactoryResolver);
        this._zoneSubscription = ngZone.onStable.subscribe(() => {
            if (this.isPopupOpen()) {
                positionElements(this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement, this.container === 'body');
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const inputValues$ = this._valueChanges.pipe(tap(value => {
            this._inputValueBackup = value;
            if (this.editable) {
                this._onChange(value);
            }
        }));
        /** @type {?} */
        const results$ = inputValues$.pipe(this.ngbTypeahead);
        /** @type {?} */
        const processedResults$ = results$.pipe(tap(() => {
            if (!this.editable) {
                this._onChange(undefined);
            }
        }));
        /** @type {?} */
        const userInput$ = this._resubscribeTypeahead.pipe(switchMap(() => processedResults$));
        this._subscription = this._subscribeToUserInput(userInput$);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._closePopup();
        this._unsubscribeFromUserInput();
        this._zoneSubscription.unsubscribe();
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this._onChange = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this._onTouched = fn; }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) { this._writeInputValue(this._formatItemForInput(value)); }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDocumentClick(event) {
        if (event.target !== this._elementRef.nativeElement) {
            this.dismissPopup();
        }
    }
    /**
     * Dismisses typeahead popup window
     * @return {?}
     */
    dismissPopup() {
        if (this.isPopupOpen()) {
            this._closePopup();
            this._writeInputValue(this._inputValueBackup);
        }
    }
    /**
     * Returns true if the typeahead popup window is displayed
     * @return {?}
     */
    isPopupOpen() { return this._windowRef != null; }
    /**
     * @return {?}
     */
    handleBlur() {
        this._resubscribeTypeahead.next(null);
        this._onTouched();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleKeyDown(event) {
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
                    const result = this._windowRef.instance.getActive();
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
    }
    /**
     * @return {?}
     */
    _openPopup() {
        if (!this.isPopupOpen()) {
            this._inputValueBackup = this._elementRef.nativeElement.value;
            this._windowRef = this._popupService.open();
            this._windowRef.instance.id = this.popupId;
            this._windowRef.instance.selectEvent.subscribe((result) => this._selectResultClosePopup(result));
            this._windowRef.instance.activeChangeEvent.subscribe((activeId) => this.activeDescendant = activeId);
            if (this.container === 'body') {
                window.document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
            }
        }
    }
    /**
     * @return {?}
     */
    _closePopup() {
        this._popupService.close();
        this._windowRef = null;
        this.activeDescendant = undefined;
    }
    /**
     * @param {?} result
     * @return {?}
     */
    _selectResult(result) {
        /** @type {?} */
        let defaultPrevented = false;
        this.selectItem.emit({ item: result, preventDefault: () => { defaultPrevented = true; } });
        this._resubscribeTypeahead.next(null);
        if (!defaultPrevented) {
            this.writeValue(result);
            this._onChange(result);
        }
    }
    /**
     * @param {?} result
     * @return {?}
     */
    _selectResultClosePopup(result) {
        this._selectResult(result);
        this._closePopup();
    }
    /**
     * @return {?}
     */
    _showHint() {
        if (this.showHint && this._windowRef.instance.hasActive() && this._inputValueBackup != null) {
            /** @type {?} */
            const userInputLowerCase = this._inputValueBackup.toLowerCase();
            /** @type {?} */
            const formattedVal = this._formatItemForInput(this._windowRef.instance.getActive());
            if (userInputLowerCase === formattedVal.substr(0, this._inputValueBackup.length).toLowerCase()) {
                this._writeInputValue(this._inputValueBackup + formattedVal.substr(this._inputValueBackup.length));
                this._elementRef.nativeElement['setSelectionRange'].apply(this._elementRef.nativeElement, [this._inputValueBackup.length, formattedVal.length]);
            }
            else {
                this.writeValue(this._windowRef.instance.getActive());
            }
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    _formatItemForInput(item) {
        return item != null && this.inputFormatter ? this.inputFormatter(item) : toString(item);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _writeInputValue(value) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'value', toString(value));
    }
    /**
     * @param {?} userInput$
     * @return {?}
     */
    _subscribeToUserInput(userInput$) {
        return userInput$.subscribe((results) => {
            if (!results || results.length === 0) {
                this._closePopup();
            }
            else {
                this._openPopup();
                this._windowRef.instance.focusFirst = this.focusFirst;
                this._windowRef.instance.results = results;
                this._windowRef.instance.term = this._elementRef.nativeElement.value;
                if (this.resultFormatter) {
                    this._windowRef.instance.formatter = this.resultFormatter;
                }
                if (this.resultTemplate) {
                    this._windowRef.instance.resultTemplate = this.resultTemplate;
                }
                this._windowRef.instance.resetActive();
                // The observable stream we are subscribing to might have async steps
                // and if a component containing typeahead is using the OnPush strategy
                // the change detection turn wouldn't be invoked automatically.
                this._windowRef.changeDetectorRef.detectChanges();
                this._showHint();
            }
            /** @type {?} */
            const count = results ? results.length : 0;
            this._live.say(count === 0 ? 'No results available' : `${count} result${count === 1 ? '' : 's'} available`);
        });
    }
    /**
     * @return {?}
     */
    _unsubscribeFromUserInput() {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        this._subscription = null;
    }
}
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
NgbTypeahead.ctorParameters = () => [
    { type: ElementRef },
    { type: ViewContainerRef },
    { type: Renderer2 },
    { type: Injector },
    { type: ComponentFactoryResolver },
    { type: NgbTypeaheadConfig },
    { type: NgZone },
    { type: Live }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJ0eXBlYWhlYWQvdHlwZWFoZWFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsd0JBQXdCLEVBRXhCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixRQUFRLEVBQ1IsS0FBSyxFQUNMLE1BQU0sRUFHTixNQUFNLEVBQ04sU0FBUyxFQUNULFdBQVcsRUFDWCxnQkFBZ0IsRUFDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF1QixpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZFLE9BQU8sRUFBYSxlQUFlLEVBQWdCLFNBQVMsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUMxRSxPQUFPLEVBQUMsZ0JBQWdCLEVBQWlCLE1BQU0scUJBQXFCLENBQUM7QUFDckUsT0FBTyxFQUFDLGtCQUFrQixFQUF3QixNQUFNLG9CQUFvQixDQUFDO0FBQzdFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDakQsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUNoQyxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDaEQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7O0FBRW5ELE1BQU0sNEJBQTRCLEdBQUc7SUFDbkMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQztJQUMzQyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJGLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQzs7OztBQXlCckIsTUFBTTs7Ozs7Ozs7Ozs7SUFnRkosWUFDWSxhQUFtRCxpQkFBbUMsRUFDdEYsV0FBOEIsU0FBbUIsRUFBRSx3QkFBa0QsRUFDN0csTUFBMEIsRUFBRSxNQUFjLEVBQVUsS0FBVztRQUZ2RCxnQkFBVyxHQUFYLFdBQVc7UUFBd0Msc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUN0RixjQUFTLEdBQVQsU0FBUztRQUFxQixjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQ0wsVUFBSyxHQUFMLEtBQUssQ0FBTTs7Ozs7Ozs7NEJBbEUzQyxLQUFLOzs7Ozs7O3lCQWtEUSxhQUFhOzs7OzBCQUszQixJQUFJLFlBQVksRUFBK0I7dUJBRzVELGlCQUFpQixZQUFZLEVBQUUsRUFBRTswQkFFdEIsR0FBRyxFQUFFLElBQUc7eUJBQ1QsQ0FBQyxDQUFNLEVBQUUsRUFBRSxJQUFHO1FBTWhDLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFFbEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQVEsV0FBVyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUM7YUFDL0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLG1CQUFDLE1BQU0sQ0FBQyxNQUEwQixFQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUV6RixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFlBQVksQ0FDakMsa0JBQWtCLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO1FBRTNGLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDdEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDdkIsZ0JBQWdCLENBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQ3RGLElBQUksQ0FBQyxTQUFTLEtBQUssTUFBTSxDQUFDLENBQUM7YUFDaEM7U0FDRixDQUFDLENBQUM7S0FDSjs7OztJQUVELFFBQVE7O1FBQ04sTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3ZELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7WUFDL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdkI7U0FDRixDQUFDLENBQUMsQ0FBQzs7UUFDSixNQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzs7UUFDdEQsTUFBTSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7WUFDL0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUMzQjtTQUNGLENBQUMsQ0FBQyxDQUFDOztRQUNKLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztRQUN2RixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUM3RDs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3RDOzs7OztJQUVELGdCQUFnQixDQUFDLEVBQXVCLElBQVUsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsRUFBRTs7Ozs7SUFFeEUsaUJBQWlCLENBQUMsRUFBYSxJQUFVLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLEVBQUU7Ozs7O0lBRWhFLFVBQVUsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7Ozs7O0lBRTdFLGdCQUFnQixDQUFDLFVBQW1CO1FBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUNwRjs7Ozs7SUFFRCxlQUFlLENBQUMsS0FBSztRQUNuQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDckI7S0FDRjs7Ozs7SUFLRCxZQUFZO1FBQ1YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQy9DO0tBQ0Y7Ozs7O0lBS0QsV0FBVyxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxFQUFFOzs7O0lBRWpELFVBQVU7UUFDUixJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUNuQjs7Ozs7SUFFRCxhQUFhLENBQUMsS0FBb0I7UUFDaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQztTQUNSO1FBRUQsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLEtBQUssR0FBRyxDQUFDLFNBQVM7b0JBQ2hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ2hDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDakIsS0FBSyxDQUFDO2dCQUNSLEtBQUssR0FBRyxDQUFDLE9BQU87b0JBQ2QsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDaEMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUNqQixLQUFLLENBQUM7Z0JBQ1IsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDO2dCQUNmLEtBQUssR0FBRyxDQUFDLEdBQUc7O29CQUNWLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUNwRCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN0QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7d0JBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQzt3QkFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztxQkFDNUI7b0JBQ0QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUNuQixLQUFLLENBQUM7Z0JBQ1IsS0FBSyxHQUFHLENBQUMsTUFBTTtvQkFDYixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3RDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDcEIsS0FBSyxDQUFDO2FBQ1Q7U0FDRjtLQUNGOzs7O0lBRU8sVUFBVTtRQUNoQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztZQUM5RCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQVcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDdEcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBZ0IsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxDQUFDO1lBRTdHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDOUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUNuRztTQUNGOzs7OztJQUdLLFdBQVc7UUFDakIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDOzs7Ozs7SUFHNUIsYUFBYSxDQUFDLE1BQVc7O1FBQy9CLElBQUksZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsR0FBRyxFQUFFLEdBQUcsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUM7UUFDekYsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV0QyxFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDeEI7Ozs7OztJQUdLLHVCQUF1QixDQUFDLE1BQVc7UUFDekMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Ozs7O0lBR2IsU0FBUztRQUNmLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLElBQUksSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7O1lBQzVGLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDOztZQUNoRSxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztZQUVwRixFQUFFLENBQUMsQ0FBQyxrQkFBa0IsS0FBSyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMvRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ25HLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUMsS0FBSyxDQUNyRCxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7YUFDM0Y7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7YUFDdkQ7U0FDRjs7Ozs7O0lBR0ssbUJBQW1CLENBQUMsSUFBUztRQUNuQyxNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7OztJQUdsRixnQkFBZ0IsQ0FBQyxLQUFhO1FBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7Ozs7O0lBRy9FLHFCQUFxQixDQUFDLFVBQTZCO1FBQ3pELE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDdEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDcEI7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUN0RCxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2dCQUMzQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO2dCQUNyRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztvQkFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7aUJBQzNEO2dCQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO29CQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztpQkFDL0Q7Z0JBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7Ozs7Z0JBS3ZDLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBRWxELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNsQjs7WUFHRCxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLFVBQVUsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDO1NBQzdHLENBQUMsQ0FBQzs7Ozs7SUFHRyx5QkFBeUI7UUFDL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNsQztRQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDOzs7O1lBNVQ3QixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLElBQUksRUFBRTtvQkFDSixRQUFRLEVBQUUsY0FBYztvQkFDeEIsY0FBYyxFQUFFLGVBQWU7b0JBQy9CLGtCQUFrQixFQUFFLHlCQUF5QjtvQkFDN0MsV0FBVyxFQUFFLHVCQUF1QjtvQkFDcEMsZ0JBQWdCLEVBQUUsY0FBYztvQkFDaEMsZ0JBQWdCLEVBQUUsS0FBSztvQkFDdkIsYUFBYSxFQUFFLEtBQUs7b0JBQ3BCLE1BQU0sRUFBRSxVQUFVO29CQUNsQixnQkFBZ0IsRUFBRSxPQUFPO29CQUN6QiwwQkFBMEIsRUFBRSw0QkFBNEI7b0JBQ3hELDhCQUE4QixFQUFFLGtCQUFrQjtvQkFDbEQsa0JBQWtCLEVBQUUsZ0NBQWdDO29CQUNwRCxzQkFBc0IsRUFBRSxlQUFlO2lCQUN4QztnQkFDRCxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQzthQUMxQzs7OztZQXJFQyxVQUFVO1lBV1YsZ0JBQWdCO1lBRmhCLFNBQVM7WUFOVCxRQUFRO1lBTlIsd0JBQXdCO1lBd0JsQixrQkFBa0I7WUFoQnhCLE1BQU07WUFlQSxJQUFJOzs7MkJBbUVULEtBQUs7d0JBTUwsS0FBSzt1QkFLTCxLQUFLO3lCQUtMLEtBQUs7NkJBS0wsS0FBSzsyQkFNTCxLQUFLOzhCQU1MLEtBQUs7NkJBS0wsS0FBSzt1QkFLTCxLQUFLO3dCQU9MLEtBQUs7eUJBS0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gIENvbXBvbmVudFJlZixcclxuICBEaXJlY3RpdmUsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgZm9yd2FyZFJlZixcclxuICBJbmplY3RvcixcclxuICBJbnB1dCxcclxuICBOZ1pvbmUsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXQsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIFZpZXdDb250YWluZXJSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHtPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiwgZnJvbUV2ZW50fSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtwb3NpdGlvbkVsZW1lbnRzLCBQbGFjZW1lbnRBcnJheX0gZnJvbSAnLi4vdXRpbC9wb3NpdGlvbmluZyc7XHJcbmltcG9ydCB7TmdiVHlwZWFoZWFkV2luZG93LCBSZXN1bHRUZW1wbGF0ZUNvbnRleHR9IGZyb20gJy4vdHlwZWFoZWFkLXdpbmRvdyc7XHJcbmltcG9ydCB7UG9wdXBTZXJ2aWNlfSBmcm9tICcuLi91dGlsL3BvcHVwJztcclxuaW1wb3J0IHt0b1N0cmluZywgaXNEZWZpbmVkfSBmcm9tICcuLi91dGlsL3V0aWwnO1xyXG5pbXBvcnQge0tleX0gZnJvbSAnLi4vdXRpbC9rZXknO1xyXG5pbXBvcnQge0xpdmV9IGZyb20gJy4uL3V0aWwvYWNjZXNzaWJpbGl0eS9saXZlJztcclxuaW1wb3J0IHtOZ2JUeXBlYWhlYWRDb25maWd9IGZyb20gJy4vdHlwZWFoZWFkLWNvbmZpZyc7XHJcbmltcG9ydCB7bWFwLCBzd2l0Y2hNYXAsIHRhcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuY29uc3QgTkdCX1RZUEVBSEVBRF9WQUxVRV9BQ0NFU1NPUiA9IHtcclxuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JUeXBlYWhlYWQpLFxyXG4gIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG4vKipcclxuICogUGF5bG9hZCBvZiB0aGUgc2VsZWN0SXRlbSBldmVudC5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgTmdiVHlwZWFoZWFkU2VsZWN0SXRlbUV2ZW50IHtcclxuICAvKipcclxuICAgKiBBbiBpdGVtIGFib3V0IHRvIGJlIHNlbGVjdGVkXHJcbiAgICovXHJcbiAgaXRlbTogYW55O1xyXG5cclxuICAvKipcclxuICAgKiBGdW5jdGlvbiB0aGF0IHdpbGwgcHJldmVudCBpdGVtIHNlbGVjdGlvbiBpZiBjYWxsZWRcclxuICAgKi9cclxuICBwcmV2ZW50RGVmYXVsdDogKCkgPT4gdm9pZDtcclxufVxyXG5cclxubGV0IG5leHRXaW5kb3dJZCA9IDA7XHJcblxyXG4vKipcclxuICogTmdiVHlwZWFoZWFkIGRpcmVjdGl2ZSBwcm92aWRlcyBhIHNpbXBsZSB3YXkgb2YgY3JlYXRpbmcgcG93ZXJmdWwgdHlwZWFoZWFkcyBmcm9tIGFueSB0ZXh0IGlucHV0XHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ2lucHV0W25nYlR5cGVhaGVhZF0nLFxyXG4gIGV4cG9ydEFzOiAnbmdiVHlwZWFoZWFkJyxcclxuICBob3N0OiB7XHJcbiAgICAnKGJsdXIpJzogJ2hhbmRsZUJsdXIoKScsXHJcbiAgICAnW2NsYXNzLm9wZW5dJzogJ2lzUG9wdXBPcGVuKCknLFxyXG4gICAgJyhkb2N1bWVudDpjbGljayknOiAnb25Eb2N1bWVudENsaWNrKCRldmVudCknLFxyXG4gICAgJyhrZXlkb3duKSc6ICdoYW5kbGVLZXlEb3duKCRldmVudCknLFxyXG4gICAgJ1thdXRvY29tcGxldGVdJzogJ2F1dG9jb21wbGV0ZScsXHJcbiAgICAnYXV0b2NhcGl0YWxpemUnOiAnb2ZmJyxcclxuICAgICdhdXRvY29ycmVjdCc6ICdvZmYnLFxyXG4gICAgJ3JvbGUnOiAnY29tYm9ib3gnLFxyXG4gICAgJ2FyaWEtbXVsdGlsaW5lJzogJ2ZhbHNlJyxcclxuICAgICdbYXR0ci5hcmlhLWF1dG9jb21wbGV0ZV0nOiAnc2hvd0hpbnQgPyBcImJvdGhcIiA6IFwibGlzdFwiJyxcclxuICAgICdbYXR0ci5hcmlhLWFjdGl2ZWRlc2NlbmRhbnRdJzogJ2FjdGl2ZURlc2NlbmRhbnQnLFxyXG4gICAgJ1thdHRyLmFyaWEtb3duc10nOiAnaXNQb3B1cE9wZW4oKSA/IHBvcHVwSWQgOiBudWxsJyxcclxuICAgICdbYXR0ci5hcmlhLWV4cGFuZGVkXSc6ICdpc1BvcHVwT3BlbigpJ1xyXG4gIH0sXHJcbiAgcHJvdmlkZXJzOiBbTkdCX1RZUEVBSEVBRF9WQUxVRV9BQ0NFU1NPUl1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYlR5cGVhaGVhZCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxyXG4gICAgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIHByaXZhdGUgX3BvcHVwU2VydmljZTogUG9wdXBTZXJ2aWNlPE5nYlR5cGVhaGVhZFdpbmRvdz47XHJcbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBfaW5wdXRWYWx1ZUJhY2t1cDogc3RyaW5nO1xyXG4gIHByaXZhdGUgX3ZhbHVlQ2hhbmdlczogT2JzZXJ2YWJsZTxzdHJpbmc+O1xyXG4gIHByaXZhdGUgX3Jlc3Vic2NyaWJlVHlwZWFoZWFkOiBCZWhhdmlvclN1YmplY3Q8YW55PjtcclxuICBwcml2YXRlIF93aW5kb3dSZWY6IENvbXBvbmVudFJlZjxOZ2JUeXBlYWhlYWRXaW5kb3c+O1xyXG4gIHByaXZhdGUgX3pvbmVTdWJzY3JpcHRpb246IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogVmFsdWUgZm9yIHRoZSBjb25maWd1cmFibGUgYXV0b2NvbXBsZXRlIGF0dHJpYnV0ZS5cclxuICAgKiBEZWZhdWx0cyB0byAnb2ZmJyB0byBkaXNhYmxlIHRoZSBuYXRpdmUgYnJvd3NlciBhdXRvY29tcGxldGUsIGJ1dCB0aGlzIHN0YW5kYXJkIHZhbHVlIGRvZXMgbm90IHNlZW1cclxuICAgKiB0byBiZSBhbHdheXMgY29ycmVjdGx5IHRha2VuIGludG8gYWNjb3VudC5cclxuICAgKlxyXG4gICAqIEBzaW5jZSAyLjEuMFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGF1dG9jb21wbGV0ZSA9ICdvZmYnO1xyXG5cclxuICAvKipcclxuICAgKiBBIHNlbGVjdG9yIHNwZWNpZnlpbmcgdGhlIGVsZW1lbnQgdGhlIHRvb2x0aXAgc2hvdWxkIGJlIGFwcGVuZGVkIHRvLlxyXG4gICAqIEN1cnJlbnRseSBvbmx5IHN1cHBvcnRzIFwiYm9keVwiLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNvbnRhaW5lcjogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBBIGZsYWcgaW5kaWNhdGluZyBpZiBtb2RlbCB2YWx1ZXMgc2hvdWxkIGJlIHJlc3RyaWN0ZWQgdG8gdGhlIG9uZXMgc2VsZWN0ZWQgZnJvbSB0aGUgcG9wdXAgb25seS5cclxuICAgKi9cclxuICBASW5wdXQoKSBlZGl0YWJsZTogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBmbGFnIGluZGljYXRpbmcgaWYgdGhlIGZpcnN0IG1hdGNoIHNob3VsZCBhdXRvbWF0aWNhbGx5IGJlIGZvY3VzZWQgYXMgeW91IHR5cGUuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZm9jdXNGaXJzdDogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBmdW5jdGlvbiB0byBjb252ZXJ0IGEgZ2l2ZW4gdmFsdWUgaW50byBzdHJpbmcgdG8gZGlzcGxheSBpbiB0aGUgaW5wdXQgZmllbGRcclxuICAgKi9cclxuICBASW5wdXQoKSBpbnB1dEZvcm1hdHRlcjogKHZhbHVlOiBhbnkpID0+IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogQSBmdW5jdGlvbiB0byB0cmFuc2Zvcm0gdGhlIHByb3ZpZGVkIG9ic2VydmFibGUgdGV4dCBpbnRvIHRoZSBhcnJheSBvZiByZXN1bHRzLiAgTm90ZSB0aGF0IHRoZSBcInRoaXNcIiBhcmd1bWVudFxyXG4gICAqIGlzIHVuZGVmaW5lZCBzbyB5b3UgbmVlZCB0byBleHBsaWNpdGx5IGJpbmQgaXQgdG8gYSBkZXNpcmVkIFwidGhpc1wiIHRhcmdldC5cclxuICAgKi9cclxuICBASW5wdXQoKSBuZ2JUeXBlYWhlYWQ6ICh0ZXh0OiBPYnNlcnZhYmxlPHN0cmluZz4pID0+IE9ic2VydmFibGU8YW55W10+O1xyXG5cclxuICAvKipcclxuICAgKiBBIGZ1bmN0aW9uIHRvIGZvcm1hdCBhIGdpdmVuIHJlc3VsdCBiZWZvcmUgZGlzcGxheS4gVGhpcyBmdW5jdGlvbiBzaG91bGQgcmV0dXJuIGEgZm9ybWF0dGVkIHN0cmluZyB3aXRob3V0IGFueVxyXG4gICAqIEhUTUwgbWFya3VwXHJcbiAgICovXHJcbiAgQElucHV0KCkgcmVzdWx0Rm9ybWF0dGVyOiAodmFsdWU6IGFueSkgPT4gc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBBIHRlbXBsYXRlIHRvIG92ZXJyaWRlIGEgbWF0Y2hpbmcgcmVzdWx0IGRlZmF1bHQgZGlzcGxheVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHJlc3VsdFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxSZXN1bHRUZW1wbGF0ZUNvbnRleHQ+O1xyXG5cclxuICAvKipcclxuICAgKiBTaG93IGhpbnQgd2hlbiBhbiBvcHRpb24gaW4gdGhlIHJlc3VsdCBsaXN0IG1hdGNoZXMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2hvd0hpbnQ6IGJvb2xlYW47XHJcblxyXG4gIC8qKiBQbGFjZW1lbnQgb2YgYSB0eXBlYWhlYWQgYWNjZXB0czpcclxuICAgKiAgICBcInRvcFwiLCBcInRvcC1sZWZ0XCIsIFwidG9wLXJpZ2h0XCIsIFwiYm90dG9tXCIsIFwiYm90dG9tLWxlZnRcIiwgXCJib3R0b20tcmlnaHRcIixcclxuICAgKiAgICBcImxlZnRcIiwgXCJsZWZ0LXRvcFwiLCBcImxlZnQtYm90dG9tXCIsIFwicmlnaHRcIiwgXCJyaWdodC10b3BcIiwgXCJyaWdodC1ib3R0b21cIlxyXG4gICAqIGFuZCBhcnJheSBvZiBhYm92ZSB2YWx1ZXMuXHJcbiAgKi9cclxuICBASW5wdXQoKSBwbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5ID0gJ2JvdHRvbS1sZWZ0JztcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gZXZlbnQgZW1pdHRlZCB3aGVuIGEgbWF0Y2ggaXMgc2VsZWN0ZWQuIEV2ZW50IHBheWxvYWQgaXMgb2YgdHlwZSBOZ2JUeXBlYWhlYWRTZWxlY3RJdGVtRXZlbnQuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHNlbGVjdEl0ZW0gPSBuZXcgRXZlbnRFbWl0dGVyPE5nYlR5cGVhaGVhZFNlbGVjdEl0ZW1FdmVudD4oKTtcclxuXHJcbiAgYWN0aXZlRGVzY2VuZGFudDogc3RyaW5nO1xyXG4gIHBvcHVwSWQgPSBgbmdiLXR5cGVhaGVhZC0ke25leHRXaW5kb3dJZCsrfWA7XHJcblxyXG4gIHByaXZhdGUgX29uVG91Y2hlZCA9ICgpID0+IHt9O1xyXG4gIHByaXZhdGUgX29uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+LCBwcml2YXRlIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIF9pbmplY3RvcjogSW5qZWN0b3IsIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgICBjb25maWc6IE5nYlR5cGVhaGVhZENvbmZpZywgbmdab25lOiBOZ1pvbmUsIHByaXZhdGUgX2xpdmU6IExpdmUpIHtcclxuICAgIHRoaXMuY29udGFpbmVyID0gY29uZmlnLmNvbnRhaW5lcjtcclxuICAgIHRoaXMuZWRpdGFibGUgPSBjb25maWcuZWRpdGFibGU7XHJcbiAgICB0aGlzLmZvY3VzRmlyc3QgPSBjb25maWcuZm9jdXNGaXJzdDtcclxuICAgIHRoaXMuc2hvd0hpbnQgPSBjb25maWcuc2hvd0hpbnQ7XHJcbiAgICB0aGlzLnBsYWNlbWVudCA9IGNvbmZpZy5wbGFjZW1lbnQ7XHJcblxyXG4gICAgdGhpcy5fdmFsdWVDaGFuZ2VzID0gZnJvbUV2ZW50PEV2ZW50PihfZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnaW5wdXQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKG1hcCgkZXZlbnQgPT4gKCRldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUpKTtcclxuXHJcbiAgICB0aGlzLl9yZXN1YnNjcmliZVR5cGVhaGVhZCA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XHJcblxyXG4gICAgdGhpcy5fcG9wdXBTZXJ2aWNlID0gbmV3IFBvcHVwU2VydmljZTxOZ2JUeXBlYWhlYWRXaW5kb3c+KFxyXG4gICAgICAgIE5nYlR5cGVhaGVhZFdpbmRvdywgX2luamVjdG9yLCBfdmlld0NvbnRhaW5lclJlZiwgX3JlbmRlcmVyLCBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpO1xyXG5cclxuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24gPSBuZ1pvbmUub25TdGFibGUuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuaXNQb3B1cE9wZW4oKSkge1xyXG4gICAgICAgIHBvc2l0aW9uRWxlbWVudHMoXHJcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsIHRoaXMucGxhY2VtZW50LFxyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGlucHV0VmFsdWVzJCA9IHRoaXMuX3ZhbHVlQ2hhbmdlcy5waXBlKHRhcCh2YWx1ZSA9PiB7XHJcbiAgICAgIHRoaXMuX2lucHV0VmFsdWVCYWNrdXAgPSB2YWx1ZTtcclxuICAgICAgaWYgKHRoaXMuZWRpdGFibGUpIHtcclxuICAgICAgICB0aGlzLl9vbkNoYW5nZSh2YWx1ZSk7XHJcbiAgICAgIH1cclxuICAgIH0pKTtcclxuICAgIGNvbnN0IHJlc3VsdHMkID0gaW5wdXRWYWx1ZXMkLnBpcGUodGhpcy5uZ2JUeXBlYWhlYWQpO1xyXG4gICAgY29uc3QgcHJvY2Vzc2VkUmVzdWx0cyQgPSByZXN1bHRzJC5waXBlKHRhcCgoKSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5lZGl0YWJsZSkge1xyXG4gICAgICAgIHRoaXMuX29uQ2hhbmdlKHVuZGVmaW5lZCk7XHJcbiAgICAgIH1cclxuICAgIH0pKTtcclxuICAgIGNvbnN0IHVzZXJJbnB1dCQgPSB0aGlzLl9yZXN1YnNjcmliZVR5cGVhaGVhZC5waXBlKHN3aXRjaE1hcCgoKSA9PiBwcm9jZXNzZWRSZXN1bHRzJCkpO1xyXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gdGhpcy5fc3Vic2NyaWJlVG9Vc2VySW5wdXQodXNlcklucHV0JCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuX2Nsb3NlUG9wdXAoKTtcclxuICAgIHRoaXMuX3Vuc3Vic2NyaWJlRnJvbVVzZXJJbnB1dCgpO1xyXG4gICAgdGhpcy5fem9uZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IGFueSk6IHZvaWQgeyB0aGlzLl9vbkNoYW5nZSA9IGZuOyB9XHJcblxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5fb25Ub3VjaGVkID0gZm47IH1cclxuXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZSkgeyB0aGlzLl93cml0ZUlucHV0VmFsdWUodGhpcy5fZm9ybWF0SXRlbUZvcklucHV0KHZhbHVlKSk7IH1cclxuXHJcbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdkaXNhYmxlZCcsIGlzRGlzYWJsZWQpO1xyXG4gIH1cclxuXHJcbiAgb25Eb2N1bWVudENsaWNrKGV2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQudGFyZ2V0ICE9PSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgdGhpcy5kaXNtaXNzUG9wdXAoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERpc21pc3NlcyB0eXBlYWhlYWQgcG9wdXAgd2luZG93XHJcbiAgICovXHJcbiAgZGlzbWlzc1BvcHVwKCkge1xyXG4gICAgaWYgKHRoaXMuaXNQb3B1cE9wZW4oKSkge1xyXG4gICAgICB0aGlzLl9jbG9zZVBvcHVwKCk7XHJcbiAgICAgIHRoaXMuX3dyaXRlSW5wdXRWYWx1ZSh0aGlzLl9pbnB1dFZhbHVlQmFja3VwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdHlwZWFoZWFkIHBvcHVwIHdpbmRvdyBpcyBkaXNwbGF5ZWRcclxuICAgKi9cclxuICBpc1BvcHVwT3BlbigpIHsgcmV0dXJuIHRoaXMuX3dpbmRvd1JlZiAhPSBudWxsOyB9XHJcblxyXG4gIGhhbmRsZUJsdXIoKSB7XHJcbiAgICB0aGlzLl9yZXN1YnNjcmliZVR5cGVhaGVhZC5uZXh0KG51bGwpO1xyXG4gICAgdGhpcy5fb25Ub3VjaGVkKCk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVLZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICBpZiAoIXRoaXMuaXNQb3B1cE9wZW4oKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKEtleVt0b1N0cmluZyhldmVudC53aGljaCldKSB7XHJcbiAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcclxuICAgICAgICBjYXNlIEtleS5BcnJvd0Rvd246XHJcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLm5leHQoKTtcclxuICAgICAgICAgIHRoaXMuX3Nob3dIaW50KCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEtleS5BcnJvd1VwOlxyXG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5wcmV2KCk7XHJcbiAgICAgICAgICB0aGlzLl9zaG93SGludCgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBLZXkuRW50ZXI6XHJcbiAgICAgICAgY2FzZSBLZXkuVGFiOlxyXG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmdldEFjdGl2ZSgpO1xyXG4gICAgICAgICAgaWYgKGlzRGVmaW5lZChyZXN1bHQpKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RSZXN1bHQocmVzdWx0KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuX2Nsb3NlUG9wdXAoKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgS2V5LkVzY2FwZTpcclxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICB0aGlzLl9yZXN1YnNjcmliZVR5cGVhaGVhZC5uZXh0KG51bGwpO1xyXG4gICAgICAgICAgdGhpcy5kaXNtaXNzUG9wdXAoKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9vcGVuUG9wdXAoKSB7XHJcbiAgICBpZiAoIXRoaXMuaXNQb3B1cE9wZW4oKSkge1xyXG4gICAgICB0aGlzLl9pbnB1dFZhbHVlQmFja3VwID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlO1xyXG4gICAgICB0aGlzLl93aW5kb3dSZWYgPSB0aGlzLl9wb3B1cFNlcnZpY2Uub3BlbigpO1xyXG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuaWQgPSB0aGlzLnBvcHVwSWQ7XHJcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5zZWxlY3RFdmVudC5zdWJzY3JpYmUoKHJlc3VsdDogYW55KSA9PiB0aGlzLl9zZWxlY3RSZXN1bHRDbG9zZVBvcHVwKHJlc3VsdCkpO1xyXG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuYWN0aXZlQ2hhbmdlRXZlbnQuc3Vic2NyaWJlKChhY3RpdmVJZDogc3RyaW5nKSA9PiB0aGlzLmFjdGl2ZURlc2NlbmRhbnQgPSBhY3RpdmVJZCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5jb250YWluZXIgPT09ICdib2R5Jykge1xyXG4gICAgICAgIHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuY29udGFpbmVyKS5hcHBlbmRDaGlsZCh0aGlzLl93aW5kb3dSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2Nsb3NlUG9wdXAoKSB7XHJcbiAgICB0aGlzLl9wb3B1cFNlcnZpY2UuY2xvc2UoKTtcclxuICAgIHRoaXMuX3dpbmRvd1JlZiA9IG51bGw7XHJcbiAgICB0aGlzLmFjdGl2ZURlc2NlbmRhbnQgPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zZWxlY3RSZXN1bHQocmVzdWx0OiBhbnkpIHtcclxuICAgIGxldCBkZWZhdWx0UHJldmVudGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLnNlbGVjdEl0ZW0uZW1pdCh7aXRlbTogcmVzdWx0LCBwcmV2ZW50RGVmYXVsdDogKCkgPT4geyBkZWZhdWx0UHJldmVudGVkID0gdHJ1ZTsgfX0pO1xyXG4gICAgdGhpcy5fcmVzdWJzY3JpYmVUeXBlYWhlYWQubmV4dChudWxsKTtcclxuXHJcbiAgICBpZiAoIWRlZmF1bHRQcmV2ZW50ZWQpIHtcclxuICAgICAgdGhpcy53cml0ZVZhbHVlKHJlc3VsdCk7XHJcbiAgICAgIHRoaXMuX29uQ2hhbmdlKHJlc3VsdCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zZWxlY3RSZXN1bHRDbG9zZVBvcHVwKHJlc3VsdDogYW55KSB7XHJcbiAgICB0aGlzLl9zZWxlY3RSZXN1bHQocmVzdWx0KTtcclxuICAgIHRoaXMuX2Nsb3NlUG9wdXAoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3Nob3dIaW50KCkge1xyXG4gICAgaWYgKHRoaXMuc2hvd0hpbnQgJiYgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmhhc0FjdGl2ZSgpICYmIHRoaXMuX2lucHV0VmFsdWVCYWNrdXAgIT0gbnVsbCkge1xyXG4gICAgICBjb25zdCB1c2VySW5wdXRMb3dlckNhc2UgPSB0aGlzLl9pbnB1dFZhbHVlQmFja3VwLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgIGNvbnN0IGZvcm1hdHRlZFZhbCA9IHRoaXMuX2Zvcm1hdEl0ZW1Gb3JJbnB1dCh0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuZ2V0QWN0aXZlKCkpO1xyXG5cclxuICAgICAgaWYgKHVzZXJJbnB1dExvd2VyQ2FzZSA9PT0gZm9ybWF0dGVkVmFsLnN1YnN0cigwLCB0aGlzLl9pbnB1dFZhbHVlQmFja3VwLmxlbmd0aCkudG9Mb3dlckNhc2UoKSkge1xyXG4gICAgICAgIHRoaXMuX3dyaXRlSW5wdXRWYWx1ZSh0aGlzLl9pbnB1dFZhbHVlQmFja3VwICsgZm9ybWF0dGVkVmFsLnN1YnN0cih0aGlzLl9pbnB1dFZhbHVlQmFja3VwLmxlbmd0aCkpO1xyXG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudFsnc2V0U2VsZWN0aW9uUmFuZ2UnXS5hcHBseShcclxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBbdGhpcy5faW5wdXRWYWx1ZUJhY2t1cC5sZW5ndGgsIGZvcm1hdHRlZFZhbC5sZW5ndGhdKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLndyaXRlVmFsdWUodGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmdldEFjdGl2ZSgpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZm9ybWF0SXRlbUZvcklucHV0KGl0ZW06IGFueSk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gaXRlbSAhPSBudWxsICYmIHRoaXMuaW5wdXRGb3JtYXR0ZXIgPyB0aGlzLmlucHV0Rm9ybWF0dGVyKGl0ZW0pIDogdG9TdHJpbmcoaXRlbSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF93cml0ZUlucHV0VmFsdWUodmFsdWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCB0b1N0cmluZyh2YWx1ZSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc3Vic2NyaWJlVG9Vc2VySW5wdXQodXNlcklucHV0JDogT2JzZXJ2YWJsZTxhbnlbXT4pOiBTdWJzY3JpcHRpb24ge1xyXG4gICAgcmV0dXJuIHVzZXJJbnB1dCQuc3Vic2NyaWJlKChyZXN1bHRzKSA9PiB7XHJcbiAgICAgIGlmICghcmVzdWx0cyB8fCByZXN1bHRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHRoaXMuX2Nsb3NlUG9wdXAoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9vcGVuUG9wdXAoKTtcclxuICAgICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuZm9jdXNGaXJzdCA9IHRoaXMuZm9jdXNGaXJzdDtcclxuICAgICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UucmVzdWx0cyA9IHJlc3VsdHM7XHJcbiAgICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLnRlcm0gPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWU7XHJcbiAgICAgICAgaWYgKHRoaXMucmVzdWx0Rm9ybWF0dGVyKSB7XHJcbiAgICAgICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuZm9ybWF0dGVyID0gdGhpcy5yZXN1bHRGb3JtYXR0ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnJlc3VsdFRlbXBsYXRlKSB7XHJcbiAgICAgICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UucmVzdWx0VGVtcGxhdGUgPSB0aGlzLnJlc3VsdFRlbXBsYXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UucmVzZXRBY3RpdmUoKTtcclxuXHJcbiAgICAgICAgLy8gVGhlIG9ic2VydmFibGUgc3RyZWFtIHdlIGFyZSBzdWJzY3JpYmluZyB0byBtaWdodCBoYXZlIGFzeW5jIHN0ZXBzXHJcbiAgICAgICAgLy8gYW5kIGlmIGEgY29tcG9uZW50IGNvbnRhaW5pbmcgdHlwZWFoZWFkIGlzIHVzaW5nIHRoZSBPblB1c2ggc3RyYXRlZ3lcclxuICAgICAgICAvLyB0aGUgY2hhbmdlIGRldGVjdGlvbiB0dXJuIHdvdWxkbid0IGJlIGludm9rZWQgYXV0b21hdGljYWxseS5cclxuICAgICAgICB0aGlzLl93aW5kb3dSZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG5cclxuICAgICAgICB0aGlzLl9zaG93SGludCgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBsaXZlIGFubm91bmNlclxyXG4gICAgICBjb25zdCBjb3VudCA9IHJlc3VsdHMgPyByZXN1bHRzLmxlbmd0aCA6IDA7XHJcbiAgICAgIHRoaXMuX2xpdmUuc2F5KGNvdW50ID09PSAwID8gJ05vIHJlc3VsdHMgYXZhaWxhYmxlJyA6IGAke2NvdW50fSByZXN1bHQke2NvdW50ID09PSAxID8gJycgOiAncyd9IGF2YWlsYWJsZWApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF91bnN1YnNjcmliZUZyb21Vc2VySW5wdXQoKSB7XHJcbiAgICBpZiAodGhpcy5fc3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gbnVsbDtcclxuICB9XHJcbn1cclxuIl19