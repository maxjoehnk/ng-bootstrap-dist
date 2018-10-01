/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { forwardRef, Inject, Directive, Input, Output, EventEmitter, ElementRef, ContentChild, NgZone, Renderer2, ChangeDetectorRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, race, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { NgbDropdownConfig } from './dropdown-config';
import { positionElements } from '../util/positioning';
import { Key } from '../util/key';
/**
 *
 */
var NgbDropdownMenu = /** @class */ (function () {
    function NgbDropdownMenu(dropdown, _elementRef, _renderer) {
        this.dropdown = dropdown;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.placement = 'bottom';
        this.isOpen = false;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    NgbDropdownMenu.prototype.isEventFrom = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) { return this._elementRef.nativeElement.contains($event.target); };
    /**
     * @param {?} triggerEl
     * @param {?} placement
     * @return {?}
     */
    NgbDropdownMenu.prototype.position = /**
     * @param {?} triggerEl
     * @param {?} placement
     * @return {?}
     */
    function (triggerEl, placement) {
        this.applyPlacement(positionElements(triggerEl, this._elementRef.nativeElement, placement));
    };
    /**
     * @param {?} _placement
     * @return {?}
     */
    NgbDropdownMenu.prototype.applyPlacement = /**
     * @param {?} _placement
     * @return {?}
     */
    function (_placement) {
        // remove the current placement classes
        this._renderer.removeClass(this._elementRef.nativeElement.parentNode, 'dropup');
        this._renderer.removeClass(this._elementRef.nativeElement.parentNode, 'dropdown');
        this.placement = _placement;
        /**
             * apply the new placement
             * in case of top use up-arrow or down-arrow otherwise
             */
        if (_placement.search('^top') !== -1) {
            this._renderer.addClass(this._elementRef.nativeElement.parentNode, 'dropup');
        }
        else {
            this._renderer.addClass(this._elementRef.nativeElement.parentNode, 'dropdown');
        }
    };
    NgbDropdownMenu.decorators = [
        { type: Directive, args: [{
                    selector: '[ngbDropdownMenu]',
                    host: { '[class.dropdown-menu]': 'true', '[class.show]': 'dropdown.isOpen()', '[attr.x-placement]': 'placement' }
                },] },
    ];
    /** @nocollapse */
    NgbDropdownMenu.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgbDropdown; }),] }] },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    return NgbDropdownMenu;
}());
export { NgbDropdownMenu };
if (false) {
    /** @type {?} */
    NgbDropdownMenu.prototype.placement;
    /** @type {?} */
    NgbDropdownMenu.prototype.isOpen;
    /** @type {?} */
    NgbDropdownMenu.prototype.dropdown;
    /** @type {?} */
    NgbDropdownMenu.prototype._elementRef;
    /** @type {?} */
    NgbDropdownMenu.prototype._renderer;
}
/**
 * Marks an element to which dropdown menu will be anchored. This is a simple version
 * of the NgbDropdownToggle directive. It plays the same role as NgbDropdownToggle but
 * doesn't listen to click events to toggle dropdown menu thus enabling support for
 * events other than click.
 *
 * \@since 1.1.0
 */
var NgbDropdownAnchor = /** @class */ (function () {
    function NgbDropdownAnchor(dropdown, _elementRef) {
        this.dropdown = dropdown;
        this._elementRef = _elementRef;
        this.anchorEl = _elementRef.nativeElement;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    NgbDropdownAnchor.prototype.isEventFrom = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) { return this._elementRef.nativeElement.contains($event.target); };
    NgbDropdownAnchor.decorators = [
        { type: Directive, args: [{
                    selector: '[ngbDropdownAnchor]',
                    host: { 'class': 'dropdown-toggle', 'aria-haspopup': 'true', '[attr.aria-expanded]': 'dropdown.isOpen()' }
                },] },
    ];
    /** @nocollapse */
    NgbDropdownAnchor.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgbDropdown; }),] }] },
        { type: ElementRef }
    ]; };
    return NgbDropdownAnchor;
}());
export { NgbDropdownAnchor };
if (false) {
    /** @type {?} */
    NgbDropdownAnchor.prototype.anchorEl;
    /** @type {?} */
    NgbDropdownAnchor.prototype.dropdown;
    /** @type {?} */
    NgbDropdownAnchor.prototype._elementRef;
}
/**
 * Allows the dropdown to be toggled via click. This directive is optional: you can use NgbDropdownAnchor as an
 * alternative.
 */
var NgbDropdownToggle = /** @class */ (function (_super) {
    tslib_1.__extends(NgbDropdownToggle, _super);
    function NgbDropdownToggle(dropdown, elementRef) {
        return _super.call(this, dropdown, elementRef) || this;
    }
    /**
     * @return {?}
     */
    NgbDropdownToggle.prototype.toggleOpen = /**
     * @return {?}
     */
    function () { this.dropdown.toggle(); };
    NgbDropdownToggle.decorators = [
        { type: Directive, args: [{
                    selector: '[ngbDropdownToggle]',
                    host: {
                        'class': 'dropdown-toggle',
                        'aria-haspopup': 'true',
                        '[attr.aria-expanded]': 'dropdown.isOpen()',
                        '(click)': 'toggleOpen()'
                    },
                    providers: [{ provide: NgbDropdownAnchor, useExisting: forwardRef(function () { return NgbDropdownToggle; }) }]
                },] },
    ];
    /** @nocollapse */
    NgbDropdownToggle.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgbDropdown; }),] }] },
        { type: ElementRef }
    ]; };
    return NgbDropdownToggle;
}(NgbDropdownAnchor));
export { NgbDropdownToggle };
/**
 * Transforms a node into a dropdown.
 */
var NgbDropdown = /** @class */ (function () {
    function NgbDropdown(_changeDetector, config, _document, _ngZone) {
        var _this = this;
        this._changeDetector = _changeDetector;
        this._document = _document;
        this._ngZone = _ngZone;
        this._closed$ = new Subject();
        /**
         *  Defines whether or not the dropdown-menu is open initially.
         */
        this._open = false;
        /**
         *  An event fired when the dropdown is opened or closed.
         *  Event's payload equals whether dropdown is open.
         */
        this.openChange = new EventEmitter();
        this.placement = config.placement;
        this.autoClose = config.autoClose;
        this._zoneSubscription = _ngZone.onStable.subscribe(function () { _this._positionMenu(); });
    }
    /**
     * @return {?}
     */
    NgbDropdown.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this._menu) {
            this._menu.applyPlacement(Array.isArray(this.placement) ? (this.placement[0]) : /** @type {?} */ (this.placement));
        }
        if (this._open) {
            this._setCloseHandlers();
        }
    };
    /**
     * Checks if the dropdown menu is open or not.
     */
    /**
     * Checks if the dropdown menu is open or not.
     * @return {?}
     */
    NgbDropdown.prototype.isOpen = /**
     * Checks if the dropdown menu is open or not.
     * @return {?}
     */
    function () { return this._open; };
    /**
     * Opens the dropdown menu of a given navbar or tabbed navigation.
     */
    /**
     * Opens the dropdown menu of a given navbar or tabbed navigation.
     * @return {?}
     */
    NgbDropdown.prototype.open = /**
     * Opens the dropdown menu of a given navbar or tabbed navigation.
     * @return {?}
     */
    function () {
        if (!this._open) {
            this._open = true;
            this._positionMenu();
            this.openChange.emit(true);
            this._setCloseHandlers();
        }
    };
    /**
     * @return {?}
     */
    NgbDropdown.prototype._setCloseHandlers = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.autoClose) {
            this._ngZone.runOutsideAngular(function () {
                /** @type {?} */
                var escapes$ = fromEvent(_this._document, 'keyup')
                    .pipe(takeUntil(_this._closed$), filter(function (event) { return event.which === Key.Escape; }));
                /** @type {?} */
                var clicks$ = fromEvent(_this._document, 'click')
                    .pipe(takeUntil(_this._closed$), filter(function (event) { return _this._shouldCloseFromClick(event); }));
                race([escapes$, clicks$]).pipe(takeUntil(_this._closed$)).subscribe(function () { return _this._ngZone.run(function () {
                    _this.close();
                    _this._changeDetector.markForCheck();
                }); });
            });
        }
    };
    /**
     * Closes the dropdown menu of a given navbar or tabbed navigation.
     */
    /**
     * Closes the dropdown menu of a given navbar or tabbed navigation.
     * @return {?}
     */
    NgbDropdown.prototype.close = /**
     * Closes the dropdown menu of a given navbar or tabbed navigation.
     * @return {?}
     */
    function () {
        if (this._open) {
            this._open = false;
            this._closed$.next();
            this.openChange.emit(false);
        }
    };
    /**
     * Toggles the dropdown menu of a given navbar or tabbed navigation.
     */
    /**
     * Toggles the dropdown menu of a given navbar or tabbed navigation.
     * @return {?}
     */
    NgbDropdown.prototype.toggle = /**
     * Toggles the dropdown menu of a given navbar or tabbed navigation.
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
     * @param {?} event
     * @return {?}
     */
    NgbDropdown.prototype._shouldCloseFromClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.button !== 2 && !this._isEventFromToggle(event)) {
            if (this.autoClose === true) {
                return true;
            }
            else if (this.autoClose === 'inside' && this._isEventFromMenu(event)) {
                return true;
            }
            else if (this.autoClose === 'outside' && !this._isEventFromMenu(event)) {
                return true;
            }
        }
        return false;
    };
    /**
     * @return {?}
     */
    NgbDropdown.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._closed$.next();
        this._zoneSubscription.unsubscribe();
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    NgbDropdown.prototype._isEventFromToggle = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) { return this._anchor.isEventFrom($event); };
    /**
     * @param {?} $event
     * @return {?}
     */
    NgbDropdown.prototype._isEventFromMenu = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) { return this._menu ? this._menu.isEventFrom($event) : false; };
    /**
     * @return {?}
     */
    NgbDropdown.prototype._positionMenu = /**
     * @return {?}
     */
    function () {
        if (this.isOpen() && this._menu) {
            this._menu.position(this._anchor.anchorEl, this.placement);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgbDropdown.prototype.onKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (!this.isOpen()) {
            this.open();
        }
        /** @type {?} */
        var list = this.getMenuElements();
        /** @type {?} */
        var position = list.findIndex(function (element) { return element === _this._document.activeElement; });
        switch (event.which) {
            case Key.ArrowDown:
                position = Math.min(position + 1, list.length - 1);
                break;
            case Key.ArrowUp:
                position = Math.max(position - 1, 0);
                break;
            case Key.Home:
                position = 0;
                break;
            case Key.End:
                position = list.length - 1;
                break;
        }
        /** @type {?} */
        var elm = list[position];
        elm.focus();
        return false;
    };
    /**
     * @return {?}
     */
    NgbDropdown.prototype.getMenuElements = /**
     * @return {?}
     */
    function () {
        return Array.from(this._menuElementRef.nativeElement.querySelectorAll('.dropdown-item:not(.disabled):not(:disabled)'));
    };
    NgbDropdown.decorators = [
        { type: Directive, args: [{
                    selector: '[ngbDropdown]',
                    exportAs: 'ngbDropdown',
                    host: {
                        '[class.show]': 'isOpen()',
                        '(keydown.ArrowUp)': 'onKeyDown($event)',
                        '(keydown.ArrowDown)': 'onKeyDown($event)',
                        '(keydown.Home)': 'onKeyDown($event)',
                        '(keydown.End)': 'onKeyDown($event)'
                    }
                },] },
    ];
    /** @nocollapse */
    NgbDropdown.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: NgbDropdownConfig },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: NgZone }
    ]; };
    NgbDropdown.propDecorators = {
        _menu: [{ type: ContentChild, args: [NgbDropdownMenu,] }],
        _menuElementRef: [{ type: ContentChild, args: [NgbDropdownMenu, { read: ElementRef },] }],
        _anchor: [{ type: ContentChild, args: [NgbDropdownAnchor,] }],
        autoClose: [{ type: Input }],
        _open: [{ type: Input, args: ['open',] }],
        placement: [{ type: Input }],
        openChange: [{ type: Output }]
    };
    return NgbDropdown;
}());
export { NgbDropdown };
if (false) {
    /** @type {?} */
    NgbDropdown.prototype._closed$;
    /** @type {?} */
    NgbDropdown.prototype._zoneSubscription;
    /** @type {?} */
    NgbDropdown.prototype._menu;
    /** @type {?} */
    NgbDropdown.prototype._menuElementRef;
    /** @type {?} */
    NgbDropdown.prototype._anchor;
    /**
     * Indicates that dropdown should be closed when selecting one of dropdown items (click) or pressing ESC.
     * When it is true (default) dropdowns are automatically closed on both outside and inside (menu) clicks.
     * When it is false dropdowns are never automatically closed.
     * When it is 'outside' dropdowns are automatically closed on outside clicks but not on menu clicks.
     * When it is 'inside' dropdowns are automatically on menu clicks but not on outside clicks.
     * @type {?}
     */
    NgbDropdown.prototype.autoClose;
    /**
     *  Defines whether or not the dropdown-menu is open initially.
     * @type {?}
     */
    NgbDropdown.prototype._open;
    /**
     * Placement of a popover accepts:
     *    "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right",
     *    "left", "left-top", "left-bottom", "right", "right-top", "right-bottom"
     * and array of above values.
     * @type {?}
     */
    NgbDropdown.prototype.placement;
    /**
     *  An event fired when the dropdown is opened or closed.
     *  Event's payload equals whether dropdown is open.
     * @type {?}
     */
    NgbDropdown.prototype.openChange;
    /** @type {?} */
    NgbDropdown.prototype._changeDetector;
    /** @type {?} */
    NgbDropdown.prototype._document;
    /** @type {?} */
    NgbDropdown.prototype._ngZone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImRyb3Bkb3duL2Ryb3Bkb3duLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFVBQVUsRUFDVixNQUFNLEVBQ04sU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLFNBQVMsRUFHVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBZSxNQUFNLE1BQU0sQ0FBQztBQUM1RCxPQUFPLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxnQkFBZ0IsRUFBNEIsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRixPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sYUFBYSxDQUFDOzs7OztJQVk5Qix5QkFDa0QsUUFBUSxFQUFVLFdBQW9DLEVBQzVGO1FBRHNDLGFBQVEsR0FBUixRQUFRLENBQUE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBeUI7UUFDNUYsY0FBUyxHQUFULFNBQVM7eUJBTEUsUUFBUTtzQkFDdEIsS0FBSztLQUlzQjs7Ozs7SUFFcEMscUNBQVc7Ozs7SUFBWCxVQUFZLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFOzs7Ozs7SUFFdEYsa0NBQVE7Ozs7O0lBQVIsVUFBUyxTQUFTLEVBQUUsU0FBUztRQUMzQixJQUFJLENBQUMs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ZTtvQkFDekIsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLElBQUksRUFBRTt3QkFDSixjQUFjLEVBQUUsVUFBVTt3QkFDMUIsbUJBQW1CLEVBQUUsbUJBQW1CO3dCQUN4QyxxQkFBcUIsRUFBRSxtQkFBbUI7d0JBQzFDLGdCQUFnQixFQUFFLG1CQUFtQjt3QkFDckMsZUFBZSxFQUFFLG1CQUFtQjtxQkFDckM7aUJBQ0Y7Ozs7Z0JBdkdDLGlCQUFpQjtnQkFLWCxpQkFBaUI7Z0RBMklxRCxNQUFNLFNBQUMsUUFBUTtnQkFwSjNGLE1BQU07Ozt3QkFpSEwsWUFBWSxTQUFDLGVBQWU7a0NBRTVCLFlBQVksU0FBQyxlQUFlLEVBQUUsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFDOzBCQUVoRCxZQUFZLFNBQUMsaUJBQWlCOzRCQVM5QixLQUFLO3dCQUtMLEtBQUssU0FBQyxNQUFNOzRCQVFaLEtBQUs7NkJBTUwsTUFBTTs7c0JBMUpUOztTQXFIYSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBmb3J3YXJkUmVmLFxyXG4gIEluamVjdCxcclxuICBEaXJlY3RpdmUsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBFbGVtZW50UmVmLFxyXG4gIENvbnRlbnRDaGlsZCxcclxuICBOZ1pvbmUsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtmcm9tRXZlbnQsIHJhY2UsIFN1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7ZmlsdGVyLCB0YWtlVW50aWx9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHtOZ2JEcm9wZG93bkNvbmZpZ30gZnJvbSAnLi9kcm9wZG93bi1jb25maWcnO1xyXG5pbXBvcnQge3Bvc2l0aW9uRWxlbWVudHMsIFBsYWNlbWVudEFycmF5LCBQbGFjZW1lbnR9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmcnO1xyXG5pbXBvcnQge0tleX0gZnJvbSAnLi4vdXRpbC9rZXknO1xyXG5cclxuLyoqXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tuZ2JEcm9wZG93bk1lbnVdJyxcclxuICBob3N0OiB7J1tjbGFzcy5kcm9wZG93bi1tZW51XSc6ICd0cnVlJywgJ1tjbGFzcy5zaG93XSc6ICdkcm9wZG93bi5pc09wZW4oKScsICdbYXR0ci54LXBsYWNlbWVudF0nOiAncGxhY2VtZW50J31cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYkRyb3Bkb3duTWVudSB7XHJcbiAgcGxhY2VtZW50OiBQbGFjZW1lbnQgPSAnYm90dG9tJztcclxuICBpc09wZW4gPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ2JEcm9wZG93bikpIHB1YmxpYyBkcm9wZG93biwgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXHJcbiAgICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XHJcblxyXG4gIGlzRXZlbnRGcm9tKCRldmVudCkgeyByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKCRldmVudC50YXJnZXQpOyB9XHJcblxyXG4gIHBvc2l0aW9uKHRyaWdnZXJFbCwgcGxhY2VtZW50KSB7XHJcbiAgICB0aGlzLmFwcGx5UGxhY2VtZW50KHBvc2l0aW9uRWxlbWVudHModHJpZ2dlckVsLCB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHBsYWNlbWVudCkpO1xyXG4gIH1cclxuXHJcbiAgYXBwbHlQbGFjZW1lbnQoX3BsYWNlbWVudDogUGxhY2VtZW50KSB7XHJcbiAgICAvLyByZW1vdmUgdGhlIGN1cnJlbnQgcGxhY2VtZW50IGNsYXNzZXNcclxuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLCAnZHJvcHVwJyk7XHJcbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZSwgJ2Ryb3Bkb3duJyk7XHJcbiAgICB0aGlzLnBsYWNlbWVudCA9IF9wbGFjZW1lbnQ7XHJcbiAgICAvKipcclxuICAgICAqIGFwcGx5IHRoZSBuZXcgcGxhY2VtZW50XHJcbiAgICAgKiBpbiBjYXNlIG9mIHRvcCB1c2UgdXAtYXJyb3cgb3IgZG93bi1hcnJvdyBvdGhlcndpc2VcclxuICAgICAqL1xyXG4gICAgaWYgKF9wbGFjZW1lbnQuc2VhcmNoKCdedG9wJykgIT09IC0xKSB7XHJcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLCAnZHJvcHVwJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZSwgJ2Ryb3Bkb3duJyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogTWFya3MgYW4gZWxlbWVudCB0byB3aGljaCBkcm9wZG93biBtZW51IHdpbGwgYmUgYW5jaG9yZWQuIFRoaXMgaXMgYSBzaW1wbGUgdmVyc2lvblxyXG4gKiBvZiB0aGUgTmdiRHJvcGRvd25Ub2dnbGUgZGlyZWN0aXZlLiBJdCBwbGF5cyB0aGUgc2FtZSByb2xlIGFzIE5nYkRyb3Bkb3duVG9nZ2xlIGJ1dFxyXG4gKiBkb2Vzbid0IGxpc3RlbiB0byBjbGljayBldmVudHMgdG8gdG9nZ2xlIGRyb3Bkb3duIG1lbnUgdGh1cyBlbmFibGluZyBzdXBwb3J0IGZvclxyXG4gKiBldmVudHMgb3RoZXIgdGhhbiBjbGljay5cclxuICpcclxuICogQHNpbmNlIDEuMS4wXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tuZ2JEcm9wZG93bkFuY2hvcl0nLFxyXG4gIGhvc3Q6IHsnY2xhc3MnOiAnZHJvcGRvd24tdG9nZ2xlJywgJ2FyaWEtaGFzcG9wdXAnOiAndHJ1ZScsICdbYXR0ci5hcmlhLWV4cGFuZGVkXSc6ICdkcm9wZG93bi5pc09wZW4oKSd9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JEcm9wZG93bkFuY2hvciB7XHJcbiAgYW5jaG9yRWw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ2JEcm9wZG93bikpIHB1YmxpYyBkcm9wZG93biwgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcclxuICAgIHRoaXMuYW5jaG9yRWwgPSBfZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgaXNFdmVudEZyb20oJGV2ZW50KSB7IHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoJGV2ZW50LnRhcmdldCk7IH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEFsbG93cyB0aGUgZHJvcGRvd24gdG8gYmUgdG9nZ2xlZCB2aWEgY2xpY2suIFRoaXMgZGlyZWN0aXZlIGlzIG9wdGlvbmFsOiB5b3UgY2FuIHVzZSBOZ2JEcm9wZG93bkFuY2hvciBhcyBhblxyXG4gKiBhbHRlcm5hdGl2ZS5cclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW25nYkRyb3Bkb3duVG9nZ2xlXScsXHJcbiAgaG9zdDoge1xyXG4gICAgJ2NsYXNzJzogJ2Ryb3Bkb3duLXRvZ2dsZScsXHJcbiAgICAnYXJpYS1oYXNwb3B1cCc6ICd0cnVlJyxcclxuICAgICdbYXR0ci5hcmlhLWV4cGFuZGVkXSc6ICdkcm9wZG93bi5pc09wZW4oKScsXHJcbiAgICAnKGNsaWNrKSc6ICd0b2dnbGVPcGVuKCknXHJcbiAgfSxcclxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogTmdiRHJvcGRvd25BbmNob3IsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nYkRyb3Bkb3duVG9nZ2xlKX1dXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JEcm9wZG93blRvZ2dsZSBleHRlbmRzIE5nYkRyb3Bkb3duQW5jaG9yIHtcclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdiRHJvcGRvd24pKSBkcm9wZG93biwgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcclxuICAgIHN1cGVyKGRyb3Bkb3duLCBlbGVtZW50UmVmKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZU9wZW4oKSB7IHRoaXMuZHJvcGRvd24udG9nZ2xlKCk7IH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFRyYW5zZm9ybXMgYSBub2RlIGludG8gYSBkcm9wZG93bi5cclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW25nYkRyb3Bkb3duXScsXHJcbiAgZXhwb3J0QXM6ICduZ2JEcm9wZG93bicsXHJcbiAgaG9zdDoge1xyXG4gICAgJ1tjbGFzcy5zaG93XSc6ICdpc09wZW4oKScsXHJcbiAgICAnKGtleWRvd24uQXJyb3dVcCknOiAnb25LZXlEb3duKCRldmVudCknLFxyXG4gICAgJyhrZXlkb3duLkFycm93RG93biknOiAnb25LZXlEb3duKCRldmVudCknLFxyXG4gICAgJyhrZXlkb3duLkhvbWUpJzogJ29uS2V5RG93bigkZXZlbnQpJyxcclxuICAgICcoa2V5ZG93bi5FbmQpJzogJ29uS2V5RG93bigkZXZlbnQpJ1xyXG4gIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYkRyb3Bkb3duIGltcGxlbWVudHMgT25Jbml0LFxyXG4gICAgT25EZXN0cm95IHtcclxuICBwcml2YXRlIF9jbG9zZWQkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuICBwcml2YXRlIF96b25lU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIEBDb250ZW50Q2hpbGQoTmdiRHJvcGRvd25NZW51KSBwcml2YXRlIF9tZW51OiBOZ2JEcm9wZG93bk1lbnU7XHJcblxyXG4gIEBDb250ZW50Q2hpbGQoTmdiRHJvcGRvd25NZW51LCB7cmVhZDogRWxlbWVudFJlZn0pIHByaXZhdGUgX21lbnVFbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcclxuXHJcbiAgQENvbnRlbnRDaGlsZChOZ2JEcm9wZG93bkFuY2hvcikgcHJpdmF0ZSBfYW5jaG9yOiBOZ2JEcm9wZG93bkFuY2hvcjtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIHRoYXQgZHJvcGRvd24gc2hvdWxkIGJlIGNsb3NlZCB3aGVuIHNlbGVjdGluZyBvbmUgb2YgZHJvcGRvd24gaXRlbXMgKGNsaWNrKSBvciBwcmVzc2luZyBFU0MuXHJcbiAgICogV2hlbiBpdCBpcyB0cnVlIChkZWZhdWx0KSBkcm9wZG93bnMgYXJlIGF1dG9tYXRpY2FsbHkgY2xvc2VkIG9uIGJvdGggb3V0c2lkZSBhbmQgaW5zaWRlIChtZW51KSBjbGlja3MuXHJcbiAgICogV2hlbiBpdCBpcyBmYWxzZSBkcm9wZG93bnMgYXJlIG5ldmVyIGF1dG9tYXRpY2FsbHkgY2xvc2VkLlxyXG4gICAqIFdoZW4gaXQgaXMgJ291dHNpZGUnIGRyb3Bkb3ducyBhcmUgYXV0b21hdGljYWxseSBjbG9zZWQgb24gb3V0c2lkZSBjbGlja3MgYnV0IG5vdCBvbiBtZW51IGNsaWNrcy5cclxuICAgKiBXaGVuIGl0IGlzICdpbnNpZGUnIGRyb3Bkb3ducyBhcmUgYXV0b21hdGljYWxseSBvbiBtZW51IGNsaWNrcyBidXQgbm90IG9uIG91dHNpZGUgY2xpY2tzLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGF1dG9DbG9zZTogYm9vbGVhbiB8ICdvdXRzaWRlJyB8ICdpbnNpZGUnO1xyXG5cclxuICAvKipcclxuICAgKiAgRGVmaW5lcyB3aGV0aGVyIG9yIG5vdCB0aGUgZHJvcGRvd24tbWVudSBpcyBvcGVuIGluaXRpYWxseS5cclxuICAgKi9cclxuICBASW5wdXQoJ29wZW4nKSBfb3BlbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBQbGFjZW1lbnQgb2YgYSBwb3BvdmVyIGFjY2VwdHM6XHJcbiAgICogICAgXCJ0b3BcIiwgXCJ0b3AtbGVmdFwiLCBcInRvcC1yaWdodFwiLCBcImJvdHRvbVwiLCBcImJvdHRvbS1sZWZ0XCIsIFwiYm90dG9tLXJpZ2h0XCIsXHJcbiAgICogICAgXCJsZWZ0XCIsIFwibGVmdC10b3BcIiwgXCJsZWZ0LWJvdHRvbVwiLCBcInJpZ2h0XCIsIFwicmlnaHQtdG9wXCIsIFwicmlnaHQtYm90dG9tXCJcclxuICAgKiBhbmQgYXJyYXkgb2YgYWJvdmUgdmFsdWVzLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXk7XHJcblxyXG4gIC8qKlxyXG4gICAqICBBbiBldmVudCBmaXJlZCB3aGVuIHRoZSBkcm9wZG93biBpcyBvcGVuZWQgb3IgY2xvc2VkLlxyXG4gICAqICBFdmVudCdzIHBheWxvYWQgZXF1YWxzIHdoZXRoZXIgZHJvcGRvd24gaXMgb3Blbi5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgb3BlbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZiwgY29uZmlnOiBOZ2JEcm9wZG93bkNvbmZpZywgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSxcclxuICAgICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUpIHtcclxuICAgIHRoaXMucGxhY2VtZW50ID0gY29uZmlnLnBsYWNlbWVudDtcclxuICAgIHRoaXMuYXV0b0Nsb3NlID0gY29uZmlnLmF1dG9DbG9zZTtcclxuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24gPSBfbmdab25lLm9uU3RhYmxlLnN1YnNjcmliZSgoKSA9PiB7IHRoaXMuX3Bvc2l0aW9uTWVudSgpOyB9KTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKHRoaXMuX21lbnUpIHtcclxuICAgICAgdGhpcy5fbWVudS5hcHBseVBsYWNlbWVudChBcnJheS5pc0FycmF5KHRoaXMucGxhY2VtZW50KSA/ICh0aGlzLnBsYWNlbWVudFswXSkgOiB0aGlzLnBsYWNlbWVudCBhcyBQbGFjZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9vcGVuKSB7XHJcbiAgICAgIHRoaXMuX3NldENsb3NlSGFuZGxlcnMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyBpZiB0aGUgZHJvcGRvd24gbWVudSBpcyBvcGVuIG9yIG5vdC5cclxuICAgKi9cclxuICBpc09wZW4oKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9vcGVuOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9wZW5zIHRoZSBkcm9wZG93biBtZW51IG9mIGEgZ2l2ZW4gbmF2YmFyIG9yIHRhYmJlZCBuYXZpZ2F0aW9uLlxyXG4gICAqL1xyXG4gIG9wZW4oKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuX29wZW4pIHtcclxuICAgICAgdGhpcy5fb3BlbiA9IHRydWU7XHJcbiAgICAgIHRoaXMuX3Bvc2l0aW9uTWVudSgpO1xyXG4gICAgICB0aGlzLm9wZW5DaGFuZ2UuZW1pdCh0cnVlKTtcclxuICAgICAgdGhpcy5fc2V0Q2xvc2VIYW5kbGVycygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc2V0Q2xvc2VIYW5kbGVycygpIHtcclxuICAgIGlmICh0aGlzLmF1dG9DbG9zZSkge1xyXG4gICAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVzY2FwZXMkID0gZnJvbUV2ZW50PEtleWJvYXJkRXZlbnQ+KHRoaXMuX2RvY3VtZW50LCAna2V5dXAnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9jbG9zZWQkKSwgZmlsdGVyKGV2ZW50ID0+IGV2ZW50LndoaWNoID09PSBLZXkuRXNjYXBlKSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNsaWNrcyQgPSBmcm9tRXZlbnQ8TW91c2VFdmVudD4odGhpcy5fZG9jdW1lbnQsICdjbGljaycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fY2xvc2VkJCksIGZpbHRlcihldmVudCA9PiB0aGlzLl9zaG91bGRDbG9zZUZyb21DbGljayhldmVudCkpKTtcclxuXHJcbiAgICAgICAgcmFjZTxFdmVudD4oW2VzY2FwZXMkLCBjbGlja3MkXSkucGlwZSh0YWtlVW50aWwodGhpcy5fY2xvc2VkJCkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbG9zZXMgdGhlIGRyb3Bkb3duIG1lbnUgb2YgYSBnaXZlbiBuYXZiYXIgb3IgdGFiYmVkIG5hdmlnYXRpb24uXHJcbiAgICovXHJcbiAgY2xvc2UoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fb3Blbikge1xyXG4gICAgICB0aGlzLl9vcGVuID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuX2Nsb3NlZCQubmV4dCgpO1xyXG4gICAgICB0aGlzLm9wZW5DaGFuZ2UuZW1pdChmYWxzZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUb2dnbGVzIHRoZSBkcm9wZG93biBtZW51IG9mIGEgZ2l2ZW4gbmF2YmFyIG9yIHRhYmJlZCBuYXZpZ2F0aW9uLlxyXG4gICAqL1xyXG4gIHRvZ2dsZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmlzT3BlbigpKSB7XHJcbiAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub3BlbigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc2hvdWxkQ2xvc2VGcm9tQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIGlmIChldmVudC5idXR0b24gIT09IDIgJiYgIXRoaXMuX2lzRXZlbnRGcm9tVG9nZ2xlKGV2ZW50KSkge1xyXG4gICAgICBpZiAodGhpcy5hdXRvQ2xvc2UgPT09IHRydWUpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmF1dG9DbG9zZSA9PT0gJ2luc2lkZScgJiYgdGhpcy5faXNFdmVudEZyb21NZW51KGV2ZW50KSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuYXV0b0Nsb3NlID09PSAnb3V0c2lkZScgJiYgIXRoaXMuX2lzRXZlbnRGcm9tTWVudShldmVudCkpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLl9jbG9zZWQkLm5leHQoKTtcclxuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2lzRXZlbnRGcm9tVG9nZ2xlKCRldmVudCkgeyByZXR1cm4gdGhpcy5fYW5jaG9yLmlzRXZlbnRGcm9tKCRldmVudCk7IH1cclxuXHJcbiAgcHJpdmF0ZSBfaXNFdmVudEZyb21NZW51KCRldmVudCkgeyByZXR1cm4gdGhpcy5fbWVudSA/IHRoaXMuX21lbnUuaXNFdmVudEZyb20oJGV2ZW50KSA6IGZhbHNlOyB9XHJcblxyXG4gIHByaXZhdGUgX3Bvc2l0aW9uTWVudSgpIHtcclxuICAgIGlmICh0aGlzLmlzT3BlbigpICYmIHRoaXMuX21lbnUpIHtcclxuICAgICAgdGhpcy5fbWVudS5wb3NpdGlvbih0aGlzLl9hbmNob3IuYW5jaG9yRWwsIHRoaXMucGxhY2VtZW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKCF0aGlzLmlzT3BlbigpKSB7XHJcbiAgICAgIHRoaXMub3BlbigpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbGlzdCA9IHRoaXMuZ2V0TWVudUVsZW1lbnRzKCk7XHJcbiAgICBsZXQgcG9zaXRpb24gPSBsaXN0LmZpbmRJbmRleChlbGVtZW50ID0+IGVsZW1lbnQgPT09IHRoaXMuX2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xyXG4gICAgc3dpdGNoIChldmVudC53aGljaCkge1xyXG4gICAgICBjYXNlIEtleS5BcnJvd0Rvd246XHJcbiAgICAgICAgcG9zaXRpb24gPSBNYXRoLm1pbihwb3NpdGlvbiArIDEsIGxpc3QubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgS2V5LkFycm93VXA6XHJcbiAgICAgICAgcG9zaXRpb24gPSBNYXRoLm1heChwb3NpdGlvbiAtIDEsIDApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEtleS5Ib21lOlxyXG4gICAgICAgIHBvc2l0aW9uID0gMDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBLZXkuRW5kOlxyXG4gICAgICAgIHBvc2l0aW9uID0gbGlzdC5sZW5ndGggLSAxO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgY29uc3QgZWxtOiBIVE1MRWxlbWVudCA9IGxpc3RbcG9zaXRpb25dO1xyXG4gICAgZWxtLmZvY3VzKCk7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRNZW51RWxlbWVudHMoKTogSFRNTEVsZW1lbnRbXSB7XHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbShcclxuICAgICAgICB0aGlzLl9tZW51RWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kcm9wZG93bi1pdGVtOm5vdCguZGlzYWJsZWQpOm5vdCg6ZGlzYWJsZWQpJykpO1xyXG4gIH1cclxufVxyXG4iXX0=