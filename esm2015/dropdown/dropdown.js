/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
export class NgbDropdownMenu {
    /**
     * @param {?} dropdown
     * @param {?} _elementRef
     * @param {?} _renderer
     */
    constructor(dropdown, _elementRef, _renderer) {
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
    isEventFrom($event) { return this._elementRef.nativeElement.contains($event.target); }
    /**
     * @param {?} triggerEl
     * @param {?} placement
     * @return {?}
     */
    position(triggerEl, placement) {
        this.applyPlacement(positionElements(triggerEl, this._elementRef.nativeElement, placement));
    }
    /**
     * @param {?} _placement
     * @return {?}
     */
    applyPlacement(_placement) {
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
    }
}
NgbDropdownMenu.decorators = [
    { type: Directive, args: [{
                selector: '[ngbDropdownMenu]',
                host: { '[class.dropdown-menu]': 'true', '[class.show]': 'dropdown.isOpen()', '[attr.x-placement]': 'placement' }
            },] },
];
/** @nocollapse */
NgbDropdownMenu.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgbDropdown),] }] },
    { type: ElementRef },
    { type: Renderer2 }
];
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
export class NgbDropdownAnchor {
    /**
     * @param {?} dropdown
     * @param {?} _elementRef
     */
    constructor(dropdown, _elementRef) {
        this.dropdown = dropdown;
        this._elementRef = _elementRef;
        this.anchorEl = _elementRef.nativeElement;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    isEventFrom($event) { return this._elementRef.nativeElement.contains($event.target); }
}
NgbDropdownAnchor.decorators = [
    { type: Directive, args: [{
                selector: '[ngbDropdownAnchor]',
                host: { 'class': 'dropdown-toggle', 'aria-haspopup': 'true', '[attr.aria-expanded]': 'dropdown.isOpen()' }
            },] },
];
/** @nocollapse */
NgbDropdownAnchor.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgbDropdown),] }] },
    { type: ElementRef }
];
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
export class NgbDropdownToggle extends NgbDropdownAnchor {
    /**
     * @param {?} dropdown
     * @param {?} elementRef
     */
    constructor(dropdown, elementRef) {
        super(dropdown, elementRef);
    }
    /**
     * @return {?}
     */
    toggleOpen() { this.dropdown.toggle(); }
}
NgbDropdownToggle.decorators = [
    { type: Directive, args: [{
                selector: '[ngbDropdownToggle]',
                host: {
                    'class': 'dropdown-toggle',
                    'aria-haspopup': 'true',
                    '[attr.aria-expanded]': 'dropdown.isOpen()',
                    '(click)': 'toggleOpen()'
                },
                providers: [{ provide: NgbDropdownAnchor, useExisting: forwardRef(() => NgbDropdownToggle) }]
            },] },
];
/** @nocollapse */
NgbDropdownToggle.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgbDropdown),] }] },
    { type: ElementRef }
];
/**
 * Transforms a node into a dropdown.
 */
export class NgbDropdown {
    /**
     * @param {?} _changeDetector
     * @param {?} config
     * @param {?} _document
     * @param {?} _ngZone
     */
    constructor(_changeDetector, config, _document, _ngZone) {
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
        this._zoneSubscription = _ngZone.onStable.subscribe(() => { this._positionMenu(); });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this._menu) {
            this._menu.applyPlacement(Array.isArray(this.placement) ? (this.placement[0]) : /** @type {?} */ (this.placement));
        }
        if (this._open) {
            this._setCloseHandlers();
        }
    }
    /**
     * Checks if the dropdown menu is open or not.
     * @return {?}
     */
    isOpen() { return this._open; }
    /**
     * Opens the dropdown menu of a given navbar or tabbed navigation.
     * @return {?}
     */
    open() {
        if (!this._open) {
            this._open = true;
            this._positionMenu();
            this.openChange.emit(true);
            this._setCloseHandlers();
        }
    }
    /**
     * @return {?}
     */
    _setCloseHandlers() {
        if (this.autoClose) {
            this._ngZone.runOutsideAngular(() => {
                /** @type {?} */
                const escapes$ = fromEvent(this._document, 'keyup')
                    .pipe(takeUntil(this._closed$), filter(event => event.which === Key.Escape));
                /** @type {?} */
                const clicks$ = fromEvent(this._document, 'click')
                    .pipe(takeUntil(this._closed$), filter(event => this._shouldCloseFromClick(event)));
                race([escapes$, clicks$]).pipe(takeUntil(this._closed$)).subscribe(() => this._ngZone.run(() => {
                    this.close();
                    this._changeDetector.markForCheck();
                }));
            });
        }
    }
    /**
     * Closes the dropdown menu of a given navbar or tabbed navigation.
     * @return {?}
     */
    close() {
        if (this._open) {
            this._open = false;
            this._closed$.next();
            this.openChange.emit(false);
        }
    }
    /**
     * Toggles the dropdown menu of a given navbar or tabbed navigation.
     * @return {?}
     */
    toggle() {
        if (this.isOpen()) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _shouldCloseFromClick(event) {
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
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._closed$.next();
        this._zoneSubscription.unsubscribe();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    _isEventFromToggle($event) { return this._anchor.isEventFrom($event); }
    /**
     * @param {?} $event
     * @return {?}
     */
    _isEventFromMenu($event) { return this._menu ? this._menu.isEventFrom($event) : false; }
    /**
     * @return {?}
     */
    _positionMenu() {
        if (this.isOpen() && this._menu) {
            this._menu.position(this._anchor.anchorEl, this.placement);
        }
    }
    /**
     * @param {?} list
     * @return {?}
     */
    getActiveElmIndex(list) {
        /** @type {?} */
        let i = 0;
        /** @type {?} */
        let position = -1;
        for (let elm of list) {
            if (elm === document.activeElement) {
                position = i;
            }
            i++;
        }
        return position;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    keyboardEvent($event) {
        if (!this.isOpen()) {
            this.open();
        }
        /** @type {?} */
        let list = this.getMenuElements();
        /** @type {?} */
        let position = this.getActiveElmIndex(list);
        switch ($event.which) {
            case Key.ArrowDown:
                position++;
                break;
            case Key.ArrowUp:
                position--;
                break;
        }
        if (position >= list.length) {
            position = list.length - 1;
        }
        if (position < 0) {
            position = 0;
        }
        /** @type {?} */
        let elm = list[position];
        if (elm) {
            elm.focus();
            return false;
        }
        else {
            return true;
        }
    }
    /**
     * @return {?}
     */
    getMenuElements() { return /** @type {?} */ (Array.from(this._menuRef.nativeElement.children)); }
}
NgbDropdown.decorators = [
    { type: Directive, args: [{
                selector: '[ngbDropdown]',
                exportAs: 'ngbDropdown',
                host: {
                    '[class.show]': 'isOpen()',
                    '(keydown.ArrowUp)': 'keyboardEvent($event)',
                    '(keydown.ArrowDown)': 'keyboardEvent($event)'
                }
            },] },
];
/** @nocollapse */
NgbDropdown.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NgbDropdownConfig },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: NgZone }
];
NgbDropdown.propDecorators = {
    _menu: [{ type: ContentChild, args: [NgbDropdownMenu,] }],
    _menuRef: [{ type: ContentChild, args: [NgbDropdownMenu, { read: ElementRef },] }],
    _anchor: [{ type: ContentChild, args: [NgbDropdownAnchor,] }],
    autoClose: [{ type: Input }],
    _open: [{ type: Input, args: ['open',] }],
    placement: [{ type: Input }],
    openChange: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    NgbDropdown.prototype._closed$;
    /** @type {?} */
    NgbDropdown.prototype._zoneSubscription;
    /** @type {?} */
    NgbDropdown.prototype._menu;
    /** @type {?} */
    NgbDropdown.prototype._menuRef;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImRyb3Bkb3duL2Ryb3Bkb3duLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsVUFBVSxFQUNWLE1BQU0sRUFDTixTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sU0FBUyxFQUdULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFlLE1BQU0sTUFBTSxDQUFDO0FBQzVELE9BQU8sRUFBQyxNQUFNLEVBQUUsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxFQUFDLGdCQUFnQixFQUE0QixNQUFNLHFCQUFxQixDQUFDO0FBQ2hGLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxhQUFhLENBQUM7Ozs7QUFRaEMsTUFBTTs7Ozs7O0lBSUosWUFDa0QsUUFBUSxFQUFVLFdBQW9DLEVBQzVGO1FBRHNDLGFBQVEsR0FBUixRQUFRLENBQUE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBeUI7UUFDNUYsY0FBUyxHQUFULFNBQVM7eUJBTEUsUUFBUTtzQkFDdEIsS0FBSztLQUlzQjs7Ozs7SUFFcEMsV0FBVyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFOzs7Ozs7SUFFdEYsUUFBUSxDQUFDLFNBQVMsRUFBRSxTQUFTO1FBQzNCLElBQUksQ0FBQyxjQUFjLENB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Q3pCLFFBQVEsRUFBRSxhQUFhO2dCQUN2QixJQUFJLEVBQUU7b0JBQ0osY0FBYyxFQUFFLFVBQVU7b0JBQzFCLG1CQUFtQixFQUFFLHVCQUF1QjtvQkFDNUMscUJBQXFCLEVBQUUsdUJBQXVCO2lCQUMvQzthQUNGOzs7O1lBckdDLGlCQUFpQjtZQUtYLGlCQUFpQjs0Q0F5SXFELE1BQU0sU0FBQyxRQUFRO1lBbEozRixNQUFNOzs7b0JBK0dMLFlBQVksU0FBQyxlQUFlO3VCQUU1QixZQUFZLFNBQUMsZUFBZSxFQUFFLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBQztzQkFFaEQsWUFBWSxTQUFDLGlCQUFpQjt3QkFTOUIsS0FBSztvQkFLTCxLQUFLLFNBQUMsTUFBTTt3QkFRWixLQUFLO3lCQU1MLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIGZvcndhcmRSZWYsXHJcbiAgSW5qZWN0LFxyXG4gIERpcmVjdGl2ZSxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgQ29udGVudENoaWxkLFxyXG4gIE5nWm9uZSxcclxuICBSZW5kZXJlcjIsXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge2Zyb21FdmVudCwgcmFjZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtmaWx0ZXIsIHRha2VVbnRpbH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQge05nYkRyb3Bkb3duQ29uZmlnfSBmcm9tICcuL2Ryb3Bkb3duLWNvbmZpZyc7XHJcbmltcG9ydCB7cG9zaXRpb25FbGVtZW50cywgUGxhY2VtZW50QXJyYXksIFBsYWNlbWVudH0gZnJvbSAnLi4vdXRpbC9wb3NpdGlvbmluZyc7XHJcbmltcG9ydCB7S2V5fSBmcm9tICcuLi91dGlsL2tleSc7XHJcblxyXG4vKipcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW25nYkRyb3Bkb3duTWVudV0nLFxyXG4gIGhvc3Q6IHsnW2NsYXNzLmRyb3Bkb3duLW1lbnVdJzogJ3RydWUnLCAnW2NsYXNzLnNob3ddJzogJ2Ryb3Bkb3duLmlzT3BlbigpJywgJ1thdHRyLngtcGxhY2VtZW50XSc6ICdwbGFjZW1lbnQnfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiRHJvcGRvd25NZW51IHtcclxuICBwbGFjZW1lbnQ6IFBsYWNlbWVudCA9ICdib3R0b20nO1xyXG4gIGlzT3BlbiA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nYkRyb3Bkb3duKSkgcHVibGljIGRyb3Bkb3duLCBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcclxuICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikge31cclxuXHJcbiAgaXNFdmVudEZyb20oJGV2ZW50KSB7IHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoJGV2ZW50LnRhcmdldCk7IH1cclxuXHJcbiAgcG9zaXRpb24odHJpZ2dlckVsLCBwbGFjZW1lbnQpIHtcclxuICAgIHRoaXMuYXBwbHlQbGFjZW1lbnQocG9zaXRpb25FbGVtZW50cyh0cmlnZ2VyRWwsIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgcGxhY2VtZW50KSk7XHJcbiAgfVxyXG5cclxuICBhcHBseVBsYWNlbWVudChfcGxhY2VtZW50OiBQbGFjZW1lbnQpIHtcclxuICAgIC8vIHJlbW92ZSB0aGUgY3VycmVudCBwbGFjZW1lbnQgY2xhc3Nlc1xyXG4gICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnBhcmVudE5vZGUsICdkcm9wdXAnKTtcclxuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLCAnZHJvcGRvd24nKTtcclxuICAgIHRoaXMucGxhY2VtZW50ID0gX3BsYWNlbWVudDtcclxuICAgIC8qKlxyXG4gICAgICogYXBwbHkgdGhlIG5ldyBwbGFjZW1lbnRcclxuICAgICAqIGluIGNhc2Ugb2YgdG9wIHVzZSB1cC1hcnJvdyBvciBkb3duLWFycm93IG90aGVyd2lzZVxyXG4gICAgICovXHJcbiAgICBpZiAoX3BsYWNlbWVudC5zZWFyY2goJ150b3AnKSAhPT0gLTEpIHtcclxuICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnBhcmVudE5vZGUsICdkcm9wdXAnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLCAnZHJvcGRvd24nKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNYXJrcyBhbiBlbGVtZW50IHRvIHdoaWNoIGRyb3Bkb3duIG1lbnUgd2lsbCBiZSBhbmNob3JlZC4gVGhpcyBpcyBhIHNpbXBsZSB2ZXJzaW9uXHJcbiAqIG9mIHRoZSBOZ2JEcm9wZG93blRvZ2dsZSBkaXJlY3RpdmUuIEl0IHBsYXlzIHRoZSBzYW1lIHJvbGUgYXMgTmdiRHJvcGRvd25Ub2dnbGUgYnV0XHJcbiAqIGRvZXNuJ3QgbGlzdGVuIHRvIGNsaWNrIGV2ZW50cyB0byB0b2dnbGUgZHJvcGRvd24gbWVudSB0aHVzIGVuYWJsaW5nIHN1cHBvcnQgZm9yXHJcbiAqIGV2ZW50cyBvdGhlciB0aGFuIGNsaWNrLlxyXG4gKlxyXG4gKiBAc2luY2UgMS4xLjBcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW25nYkRyb3Bkb3duQW5jaG9yXScsXHJcbiAgaG9zdDogeydjbGFzcyc6ICdkcm9wZG93bi10b2dnbGUnLCAnYXJpYS1oYXNwb3B1cCc6ICd0cnVlJywgJ1thdHRyLmFyaWEtZXhwYW5kZWRdJzogJ2Ryb3Bkb3duLmlzT3BlbigpJ31cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYkRyb3Bkb3duQW5jaG9yIHtcclxuICBhbmNob3JFbDtcclxuXHJcbiAgY29uc3RydWN0b3IoQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nYkRyb3Bkb3duKSkgcHVibGljIGRyb3Bkb3duLCBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xyXG4gICAgdGhpcy5hbmNob3JFbCA9IF9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBpc0V2ZW50RnJvbSgkZXZlbnQpIHsgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jb250YWlucygkZXZlbnQudGFyZ2V0KTsgfVxyXG59XHJcblxyXG4vKipcclxuICogQWxsb3dzIHRoZSBkcm9wZG93biB0byBiZSB0b2dnbGVkIHZpYSBjbGljay4gVGhpcyBkaXJlY3RpdmUgaXMgb3B0aW9uYWw6IHlvdSBjYW4gdXNlIE5nYkRyb3Bkb3duQW5jaG9yIGFzIGFuXHJcbiAqIGFsdGVybmF0aXZlLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbmdiRHJvcGRvd25Ub2dnbGVdJyxcclxuICBob3N0OiB7XHJcbiAgICAnY2xhc3MnOiAnZHJvcGRvd24tdG9nZ2xlJyxcclxuICAgICdhcmlhLWhhc3BvcHVwJzogJ3RydWUnLFxyXG4gICAgJ1thdHRyLmFyaWEtZXhwYW5kZWRdJzogJ2Ryb3Bkb3duLmlzT3BlbigpJyxcclxuICAgICcoY2xpY2spJzogJ3RvZ2dsZU9wZW4oKSdcclxuICB9LFxyXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBOZ2JEcm9wZG93bkFuY2hvciwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdiRHJvcGRvd25Ub2dnbGUpfV1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYkRyb3Bkb3duVG9nZ2xlIGV4dGVuZHMgTmdiRHJvcGRvd25BbmNob3Ige1xyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ2JEcm9wZG93bikpIGRyb3Bkb3duLCBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xyXG4gICAgc3VwZXIoZHJvcGRvd24sIGVsZW1lbnRSZWYpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlT3BlbigpIHsgdGhpcy5kcm9wZG93bi50b2dnbGUoKTsgfVxyXG59XHJcblxyXG4vKipcclxuICogVHJhbnNmb3JtcyBhIG5vZGUgaW50byBhIGRyb3Bkb3duLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbmdiRHJvcGRvd25dJyxcclxuICBleHBvcnRBczogJ25nYkRyb3Bkb3duJyxcclxuICBob3N0OiB7XHJcbiAgICAnW2NsYXNzLnNob3ddJzogJ2lzT3BlbigpJyxcclxuICAgICcoa2V5ZG93bi5BcnJvd1VwKSc6ICdrZXlib2FyZEV2ZW50KCRldmVudCknLFxyXG4gICAgJyhrZXlkb3duLkFycm93RG93biknOiAna2V5Ym9hcmRFdmVudCgkZXZlbnQpJ1xyXG4gIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYkRyb3Bkb3duIGltcGxlbWVudHMgT25Jbml0LFxyXG4gICAgT25EZXN0cm95IHtcclxuICBwcml2YXRlIF9jbG9zZWQkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuICBwcml2YXRlIF96b25lU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIEBDb250ZW50Q2hpbGQoTmdiRHJvcGRvd25NZW51KSBwcml2YXRlIF9tZW51OiBOZ2JEcm9wZG93bk1lbnU7XHJcblxyXG4gIEBDb250ZW50Q2hpbGQoTmdiRHJvcGRvd25NZW51LCB7cmVhZDogRWxlbWVudFJlZn0pIHByaXZhdGUgX21lbnVSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICBAQ29udGVudENoaWxkKE5nYkRyb3Bkb3duQW5jaG9yKSBwcml2YXRlIF9hbmNob3I6IE5nYkRyb3Bkb3duQW5jaG9yO1xyXG5cclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgdGhhdCBkcm9wZG93biBzaG91bGQgYmUgY2xvc2VkIHdoZW4gc2VsZWN0aW5nIG9uZSBvZiBkcm9wZG93biBpdGVtcyAoY2xpY2spIG9yIHByZXNzaW5nIEVTQy5cclxuICAgKiBXaGVuIGl0IGlzIHRydWUgKGRlZmF1bHQpIGRyb3Bkb3ducyBhcmUgYXV0b21hdGljYWxseSBjbG9zZWQgb24gYm90aCBvdXRzaWRlIGFuZCBpbnNpZGUgKG1lbnUpIGNsaWNrcy5cclxuICAgKiBXaGVuIGl0IGlzIGZhbHNlIGRyb3Bkb3ducyBhcmUgbmV2ZXIgYXV0b21hdGljYWxseSBjbG9zZWQuXHJcbiAgICogV2hlbiBpdCBpcyAnb3V0c2lkZScgZHJvcGRvd25zIGFyZSBhdXRvbWF0aWNhbGx5IGNsb3NlZCBvbiBvdXRzaWRlIGNsaWNrcyBidXQgbm90IG9uIG1lbnUgY2xpY2tzLlxyXG4gICAqIFdoZW4gaXQgaXMgJ2luc2lkZScgZHJvcGRvd25zIGFyZSBhdXRvbWF0aWNhbGx5IG9uIG1lbnUgY2xpY2tzIGJ1dCBub3Qgb24gb3V0c2lkZSBjbGlja3MuXHJcbiAgICovXHJcbiAgQElucHV0KCkgYXV0b0Nsb3NlOiBib29sZWFuIHwgJ291dHNpZGUnIHwgJ2luc2lkZSc7XHJcblxyXG4gIC8qKlxyXG4gICAqICBEZWZpbmVzIHdoZXRoZXIgb3Igbm90IHRoZSBkcm9wZG93bi1tZW51IGlzIG9wZW4gaW5pdGlhbGx5LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgnb3BlbicpIF9vcGVuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFBsYWNlbWVudCBvZiBhIHBvcG92ZXIgYWNjZXB0czpcclxuICAgKiAgICBcInRvcFwiLCBcInRvcC1sZWZ0XCIsIFwidG9wLXJpZ2h0XCIsIFwiYm90dG9tXCIsIFwiYm90dG9tLWxlZnRcIiwgXCJib3R0b20tcmlnaHRcIixcclxuICAgKiAgICBcImxlZnRcIiwgXCJsZWZ0LXRvcFwiLCBcImxlZnQtYm90dG9tXCIsIFwicmlnaHRcIiwgXCJyaWdodC10b3BcIiwgXCJyaWdodC1ib3R0b21cIlxyXG4gICAqIGFuZCBhcnJheSBvZiBhYm92ZSB2YWx1ZXMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgcGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheTtcclxuXHJcbiAgLyoqXHJcbiAgICogIEFuIGV2ZW50IGZpcmVkIHdoZW4gdGhlIGRyb3Bkb3duIGlzIG9wZW5lZCBvciBjbG9zZWQuXHJcbiAgICogIEV2ZW50J3MgcGF5bG9hZCBlcXVhbHMgd2hldGhlciBkcm9wZG93biBpcyBvcGVuLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBvcGVuQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLCBjb25maWc6IE5nYkRyb3Bkb3duQ29uZmlnLCBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LFxyXG4gICAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSkge1xyXG4gICAgdGhpcy5wbGFjZW1lbnQgPSBjb25maWcucGxhY2VtZW50O1xyXG4gICAgdGhpcy5hdXRvQ2xvc2UgPSBjb25maWcuYXV0b0Nsb3NlO1xyXG4gICAgdGhpcy5fem9uZVN1YnNjcmlwdGlvbiA9IF9uZ1pvbmUub25TdGFibGUuc3Vic2NyaWJlKCgpID0+IHsgdGhpcy5fcG9zaXRpb25NZW51KCk7IH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5fbWVudSkge1xyXG4gICAgICB0aGlzLl9tZW51LmFwcGx5UGxhY2VtZW50KEFycmF5LmlzQXJyYXkodGhpcy5wbGFjZW1lbnQpID8gKHRoaXMucGxhY2VtZW50WzBdKSA6IHRoaXMucGxhY2VtZW50IGFzIFBsYWNlbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX29wZW4pIHtcclxuICAgICAgdGhpcy5fc2V0Q2xvc2VIYW5kbGVycygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIGlmIHRoZSBkcm9wZG93biBtZW51IGlzIG9wZW4gb3Igbm90LlxyXG4gICAqL1xyXG4gIGlzT3BlbigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX29wZW47IH1cclxuXHJcbiAgLyoqXHJcbiAgICogT3BlbnMgdGhlIGRyb3Bkb3duIG1lbnUgb2YgYSBnaXZlbiBuYXZiYXIgb3IgdGFiYmVkIG5hdmlnYXRpb24uXHJcbiAgICovXHJcbiAgb3BlbigpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5fb3Blbikge1xyXG4gICAgICB0aGlzLl9vcGVuID0gdHJ1ZTtcclxuICAgICAgdGhpcy5fcG9zaXRpb25NZW51KCk7XHJcbiAgICAgIHRoaXMub3BlbkNoYW5nZS5lbWl0KHRydWUpO1xyXG4gICAgICB0aGlzLl9zZXRDbG9zZUhhbmRsZXJzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zZXRDbG9zZUhhbmRsZXJzKCkge1xyXG4gICAgaWYgKHRoaXMuYXV0b0Nsb3NlKSB7XHJcbiAgICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZXNjYXBlcyQgPSBmcm9tRXZlbnQ8S2V5Ym9hcmRFdmVudD4odGhpcy5fZG9jdW1lbnQsICdrZXl1cCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX2Nsb3NlZCQpLCBmaWx0ZXIoZXZlbnQgPT4gZXZlbnQud2hpY2ggPT09IEtleS5Fc2NhcGUpKTtcclxuXHJcbiAgICAgICAgY29uc3QgY2xpY2tzJCA9IGZyb21FdmVudDxNb3VzZUV2ZW50Pih0aGlzLl9kb2N1bWVudCwgJ2NsaWNrJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9jbG9zZWQkKSwgZmlsdGVyKGV2ZW50ID0+IHRoaXMuX3Nob3VsZENsb3NlRnJvbUNsaWNrKGV2ZW50KSkpO1xyXG5cclxuICAgICAgICByYWNlPEV2ZW50PihbZXNjYXBlcyQsIGNsaWNrcyRdKS5waXBlKHRha2VVbnRpbCh0aGlzLl9jbG9zZWQkKSkuc3Vic2NyaWJlKCgpID0+IHRoaXMuX25nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsb3NlcyB0aGUgZHJvcGRvd24gbWVudSBvZiBhIGdpdmVuIG5hdmJhciBvciB0YWJiZWQgbmF2aWdhdGlvbi5cclxuICAgKi9cclxuICBjbG9zZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl9vcGVuKSB7XHJcbiAgICAgIHRoaXMuX29wZW4gPSBmYWxzZTtcclxuICAgICAgdGhpcy5fY2xvc2VkJC5uZXh0KCk7XHJcbiAgICAgIHRoaXMub3BlbkNoYW5nZS5lbWl0KGZhbHNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRvZ2dsZXMgdGhlIGRyb3Bkb3duIG1lbnUgb2YgYSBnaXZlbiBuYXZiYXIgb3IgdGFiYmVkIG5hdmlnYXRpb24uXHJcbiAgICovXHJcbiAgdG9nZ2xlKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaXNPcGVuKCkpIHtcclxuICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5vcGVuKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zaG91bGRDbG9zZUZyb21DbGljayhldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgaWYgKGV2ZW50LmJ1dHRvbiAhPT0gMiAmJiAhdGhpcy5faXNFdmVudEZyb21Ub2dnbGUoZXZlbnQpKSB7XHJcbiAgICAgIGlmICh0aGlzLmF1dG9DbG9zZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuYXV0b0Nsb3NlID09PSAnaW5zaWRlJyAmJiB0aGlzLl9pc0V2ZW50RnJvbU1lbnUoZXZlbnQpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5hdXRvQ2xvc2UgPT09ICdvdXRzaWRlJyAmJiAhdGhpcy5faXNFdmVudEZyb21NZW51KGV2ZW50KSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuX2Nsb3NlZCQubmV4dCgpO1xyXG4gICAgdGhpcy5fem9uZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfaXNFdmVudEZyb21Ub2dnbGUoJGV2ZW50KSB7IHJldHVybiB0aGlzLl9hbmNob3IuaXNFdmVudEZyb20oJGV2ZW50KTsgfVxyXG5cclxuICBwcml2YXRlIF9pc0V2ZW50RnJvbU1lbnUoJGV2ZW50KSB7IHJldHVybiB0aGlzLl9tZW51ID8gdGhpcy5fbWVudS5pc0V2ZW50RnJvbSgkZXZlbnQpIDogZmFsc2U7IH1cclxuXHJcbiAgcHJpdmF0ZSBfcG9zaXRpb25NZW51KCkge1xyXG4gICAgaWYgKHRoaXMuaXNPcGVuKCkgJiYgdGhpcy5fbWVudSkge1xyXG4gICAgICB0aGlzLl9tZW51LnBvc2l0aW9uKHRoaXMuX2FuY2hvci5hbmNob3JFbCwgdGhpcy5wbGFjZW1lbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRBY3RpdmVFbG1JbmRleChsaXN0KTogbnVtYmVyIHtcclxuICAgIGxldCBpID0gMDtcclxuICAgIGxldCBwb3NpdGlvbiA9IC0xO1xyXG4gICAgZm9yIChsZXQgZWxtIG9mIGxpc3QpIHtcclxuICAgICAgaWYgKGVsbSA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkge1xyXG4gICAgICAgIHBvc2l0aW9uID0gaTtcclxuICAgICAgfVxyXG4gICAgICBpKys7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcG9zaXRpb247XHJcbiAgfVxyXG5cclxuICBrZXlib2FyZEV2ZW50KCRldmVudCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKCF0aGlzLmlzT3BlbigpKSB7XHJcbiAgICAgIHRoaXMub3BlbigpO1xyXG4gICAgfVxyXG4gICAgbGV0IGxpc3QgPSB0aGlzLmdldE1lbnVFbGVtZW50cygpO1xyXG4gICAgbGV0IHBvc2l0aW9uOiBudW1iZXIgPSB0aGlzLmdldEFjdGl2ZUVsbUluZGV4KGxpc3QpO1xyXG4gICAgc3dpdGNoICgkZXZlbnQud2hpY2gpIHtcclxuICAgICAgY2FzZSBLZXkuQXJyb3dEb3duOlxyXG4gICAgICAgIHBvc2l0aW9uKys7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgS2V5LkFycm93VXA6XHJcbiAgICAgICAgcG9zaXRpb24tLTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIGlmIChwb3NpdGlvbiA+PSBsaXN0Lmxlbmd0aCkge1xyXG4gICAgICBwb3NpdGlvbiA9IGxpc3QubGVuZ3RoIC0gMTtcclxuICAgIH1cclxuICAgIGlmIChwb3NpdGlvbiA8IDApIHtcclxuICAgICAgcG9zaXRpb24gPSAwO1xyXG4gICAgfVxyXG4gICAgbGV0IGVsbTogSFRNTEVsZW1lbnQgPSBsaXN0W3Bvc2l0aW9uXTtcclxuICAgIGlmIChlbG0pIHtcclxuICAgICAgZWxtLmZvY3VzKCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRNZW51RWxlbWVudHMoKTogSFRNTEVsZW1lbnRbXSB7IHJldHVybiA8SFRNTEVsZW1lbnRbXT5BcnJheS5mcm9tKHRoaXMuX21lbnVSZWYubmF0aXZlRWxlbWVudC5jaGlsZHJlbik7IH1cclxufVxyXG4iXX0=