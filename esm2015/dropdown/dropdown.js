/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { forwardRef, Inject, Directive, Input, Output, EventEmitter, ElementRef, ContentChild, NgZone, Renderer2, ChangeDetectorRef, ContentChildren } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, race, Subject, merge } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { NgbDropdownConfig } from './dropdown-config';
import { positionElements } from '../util/positioning';
import { Key } from '../util/key';
/**
 *
 */
export class NgbDropdownItem {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this.dropdownItemEl = _elementRef.nativeElement;
    }
    /**
     * @return {?}
     */
    get disabled() { return this._disabled != null; }
}
NgbDropdownItem.decorators = [
    { type: Directive, args: [{ selector: '.dropdown-item:not(.disabled)' },] },
];
/** @nocollapse */
NgbDropdownItem.ctorParameters = () => [
    { type: ElementRef }
];
NgbDropdownItem.propDecorators = {
    _disabled: [{ type: Input, args: ['disabled',] }]
};
if (false) {
    /** @type {?} */
    NgbDropdownItem.prototype.dropdownItemEl;
    /** @type {?} */
    NgbDropdownItem.prototype._disabled;
    /** @type {?} */
    NgbDropdownItem.prototype._elementRef;
}
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
NgbDropdownMenu.propDecorators = {
    menuItems: [{ type: ContentChildren, args: [NgbDropdownItem,] }]
};
if (false) {
    /** @type {?} */
    NgbDropdownMenu.prototype.placement;
    /** @type {?} */
    NgbDropdownMenu.prototype.isOpen;
    /** @type {?} */
    NgbDropdownMenu.prototype.menuItems;
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
     * @return {?}
     */
    ngAfterViewInit() { this._setKeyboardHandlers(); }
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
     * @return {?}
     */
    _setKeyboardHandlers() {
        /** @type {?} */
        const listeners = [];
        if (this._anchor) {
            /** @type {?} */
            const anchor$ = fromEvent(this._anchor.anchorEl, 'keydown').pipe(filter(filterKeyboardEvents));
            listeners.push(anchor$);
        }
        if (this._menu) {
            /** @type {?} */
            const items$ = merge(...this._menu.menuItems.map(item => fromEvent(item.dropdownItemEl, 'keydown')))
                .pipe(filter(filterKeyboardEvents));
            listeners.push(items$);
        }
        merge(...listeners).subscribe(this.onKeyDown.bind(this));
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyDown(event) {
        if (!this.isOpen()) {
            this.open();
        }
        /** @type {?} */
        const list = this._getMenuElements();
        if (list.length === 0) {
            return;
        }
        /** @type {?} */
        let position = list.findIndex(element => element === this._document.activeElement);
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
        const elm = list[position];
        elm.focus();
        event.preventDefault();
    }
    /**
     * @return {?}
     */
    _getMenuElements() {
        if (this._menu == null) {
            return [];
        }
        return this._menu.menuItems.filter(item => !item.disabled).map(item => item.dropdownItemEl);
    }
}
NgbDropdown.decorators = [
    { type: Directive, args: [{ selector: '[ngbDropdown]', exportAs: 'ngbDropdown', host: { '[class.show]': 'isOpen()' } },] },
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
    _menuElementRef: [{ type: ContentChild, args: [NgbDropdownMenu, { read: ElementRef },] }],
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
/**
 * @param {?} event
 * @return {?}
 */
function filterKeyboardEvents(event) {
    return event.which === Key.ArrowDown || event.which === Key.ArrowUp || event.which === Key.Home ||
        event.which === Key.End;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImRyb3Bkb3duL2Ryb3Bkb3duLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsVUFBVSxFQUNWLE1BQU0sRUFDTixTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sU0FBUyxFQUdULGlCQUFpQixFQUNqQixlQUFlLEVBRWhCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQWdCLEtBQUssRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNuRSxPQUFPLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxnQkFBZ0IsRUFBNEIsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRixPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sYUFBYSxDQUFDOzs7O0FBS2hDLE1BQU07Ozs7SUFLSixZQUFvQixXQUFvQztRQUFwQyxnQkFBVyxHQUFYLFdBQVcsQ0FBeUI7UUFBSSxJQUFJLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUM7S0FBRTs7OztJQUU5RyxJQUFJLFFBQVEsS0FBYyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsRUFBRTs7O1lBUjNELFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSwrQkFBK0IsRUFBQzs7OztZQW5CcEQsVUFBVTs7O3dCQXVCVCxLQUFLLFNBQUMsVUFBVTs7Ozs7Ozs7Ozs7OztBQWFuQixNQUFNOzs7Ozs7SUFNSixZQUNr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QUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzs7OztZQWxNL0YsU0FBUyxTQUFDLEVBQUMsUUFBUSxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxFQUFDLGNBQWMsRUFBRSxVQUFVLEVBQUMsRUFBQzs7OztZQTlHakcsaUJBQWlCO1lBT1gsaUJBQWlCOzRDQStJcUQsTUFBTSxTQUFDLFFBQVE7WUExSjNGLE1BQU07OztvQkF1SEwsWUFBWSxTQUFDLGVBQWU7OEJBRTVCLFlBQVksU0FBQyxlQUFlLEVBQUUsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFDO3NCQUVoRCxZQUFZLFNBQUMsaUJBQWlCO3dCQVM5QixLQUFLO29CQUtMLEtBQUssU0FBQyxNQUFNO3dCQVFaLEtBQUs7eUJBTUwsTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlLVCw4QkFBOEIsS0FBb0I7SUFDaEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssR0FBRyxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUMsS0FBSyxLQUFLLEdBQUcsQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxHQUFHLENBQUMsSUFBSTtRQUMzRixLQUFLLENBQUMsS0FBSyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUM7Q0FDN0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIGZvcndhcmRSZWYsXHJcbiAgSW5qZWN0LFxyXG4gIERpcmVjdGl2ZSxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgQ29udGVudENoaWxkLFxyXG4gIE5nWm9uZSxcclxuICBSZW5kZXJlcjIsXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb250ZW50Q2hpbGRyZW4sXHJcbiAgQWZ0ZXJWaWV3SW5pdFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge2Zyb21FdmVudCwgcmFjZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9uLCBtZXJnZX0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7ZmlsdGVyLCB0YWtlVW50aWx9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHtOZ2JEcm9wZG93bkNvbmZpZ30gZnJvbSAnLi9kcm9wZG93bi1jb25maWcnO1xyXG5pbXBvcnQge3Bvc2l0aW9uRWxlbWVudHMsIFBsYWNlbWVudEFycmF5LCBQbGFjZW1lbnR9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmcnO1xyXG5pbXBvcnQge0tleX0gZnJvbSAnLi4vdXRpbC9rZXknO1xyXG5cclxuLyoqXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJy5kcm9wZG93bi1pdGVtOm5vdCguZGlzYWJsZWQpJ30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JEcm9wZG93bkl0ZW0ge1xyXG4gIGRyb3Bkb3duSXRlbUVsOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgQElucHV0KCdkaXNhYmxlZCcpIHByaXZhdGUgX2Rpc2FibGVkO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PikgeyB0aGlzLmRyb3Bkb3duSXRlbUVsID0gX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDsgfVxyXG5cclxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9kaXNhYmxlZCAhPSBudWxsOyB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbmdiRHJvcGRvd25NZW51XScsXHJcbiAgaG9zdDogeydbY2xhc3MuZHJvcGRvd24tbWVudV0nOiAndHJ1ZScsICdbY2xhc3Muc2hvd10nOiAnZHJvcGRvd24uaXNPcGVuKCknLCAnW2F0dHIueC1wbGFjZW1lbnRdJzogJ3BsYWNlbWVudCd9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JEcm9wZG93bk1lbnUge1xyXG4gIHBsYWNlbWVudDogUGxhY2VtZW50ID0gJ2JvdHRvbSc7XHJcbiAgaXNPcGVuID0gZmFsc2U7XHJcblxyXG4gIEBDb250ZW50Q2hpbGRyZW4oTmdiRHJvcGRvd25JdGVtKSBtZW51SXRlbXM6IE5nYkRyb3Bkb3duSXRlbVtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nYkRyb3Bkb3duKSkgcHVibGljIGRyb3Bkb3duLCBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcclxuICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikge31cclxuXHJcbiAgaXNFdmVudEZyb20oJGV2ZW50KSB7IHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoJGV2ZW50LnRhcmdldCk7IH1cclxuXHJcbiAgcG9zaXRpb24odHJpZ2dlckVsLCBwbGFjZW1lbnQpIHtcclxuICAgIHRoaXMuYXBwbHlQbGFjZW1lbnQocG9zaXRpb25FbGVtZW50cyh0cmlnZ2VyRWwsIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgcGxhY2VtZW50KSk7XHJcbiAgfVxyXG5cclxuICBhcHBseVBsYWNlbWVudChfcGxhY2VtZW50OiBQbGFjZW1lbnQpIHtcclxuICAgIC8vIHJlbW92ZSB0aGUgY3VycmVudCBwbGFjZW1lbnQgY2xhc3Nlc1xyXG4gICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnBhcmVudE5vZGUsICdkcm9wdXAnKTtcclxuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLCAnZHJvcGRvd24nKTtcclxuICAgIHRoaXMucGxhY2VtZW50ID0gX3BsYWNlbWVudDtcclxuICAgIC8qKlxyXG4gICAgICogYXBwbHkgdGhlIG5ldyBwbGFjZW1lbnRcclxuICAgICAqIGluIGNhc2Ugb2YgdG9wIHVzZSB1cC1hcnJvdyBvciBkb3duLWFycm93IG90aGVyd2lzZVxyXG4gICAgICovXHJcbiAgICBpZiAoX3BsYWNlbWVudC5zZWFyY2goJ150b3AnKSAhPT0gLTEpIHtcclxuICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnBhcmVudE5vZGUsICdkcm9wdXAnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLCAnZHJvcGRvd24nKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNYXJrcyBhbiBlbGVtZW50IHRvIHdoaWNoIGRyb3Bkb3duIG1lbnUgd2lsbCBiZSBhbmNob3JlZC4gVGhpcyBpcyBhIHNpbXBsZSB2ZXJzaW9uXHJcbiAqIG9mIHRoZSBOZ2JEcm9wZG93blRvZ2dsZSBkaXJlY3RpdmUuIEl0IHBsYXlzIHRoZSBzYW1lIHJvbGUgYXMgTmdiRHJvcGRvd25Ub2dnbGUgYnV0XHJcbiAqIGRvZXNuJ3QgbGlzdGVuIHRvIGNsaWNrIGV2ZW50cyB0byB0b2dnbGUgZHJvcGRvd24gbWVudSB0aHVzIGVuYWJsaW5nIHN1cHBvcnQgZm9yXHJcbiAqIGV2ZW50cyBvdGhlciB0aGFuIGNsaWNrLlxyXG4gKlxyXG4gKiBAc2luY2UgMS4xLjBcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW25nYkRyb3Bkb3duQW5jaG9yXScsXHJcbiAgaG9zdDogeydjbGFzcyc6ICdkcm9wZG93bi10b2dnbGUnLCAnYXJpYS1oYXNwb3B1cCc6ICd0cnVlJywgJ1thdHRyLmFyaWEtZXhwYW5kZWRdJzogJ2Ryb3Bkb3duLmlzT3BlbigpJ31cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYkRyb3Bkb3duQW5jaG9yIHtcclxuICBhbmNob3JFbDtcclxuXHJcbiAgY29uc3RydWN0b3IoQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nYkRyb3Bkb3duKSkgcHVibGljIGRyb3Bkb3duLCBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xyXG4gICAgdGhpcy5hbmNob3JFbCA9IF9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBpc0V2ZW50RnJvbSgkZXZlbnQpIHsgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jb250YWlucygkZXZlbnQudGFyZ2V0KTsgfVxyXG59XHJcblxyXG4vKipcclxuICogQWxsb3dzIHRoZSBkcm9wZG93biB0byBiZSB0b2dnbGVkIHZpYSBjbGljay4gVGhpcyBkaXJlY3RpdmUgaXMgb3B0aW9uYWw6IHlvdSBjYW4gdXNlIE5nYkRyb3Bkb3duQW5jaG9yIGFzIGFuXHJcbiAqIGFsdGVybmF0aXZlLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbmdiRHJvcGRvd25Ub2dnbGVdJyxcclxuICBob3N0OiB7XHJcbiAgICAnY2xhc3MnOiAnZHJvcGRvd24tdG9nZ2xlJyxcclxuICAgICdhcmlhLWhhc3BvcHVwJzogJ3RydWUnLFxyXG4gICAgJ1thdHRyLmFyaWEtZXhwYW5kZWRdJzogJ2Ryb3Bkb3duLmlzT3BlbigpJyxcclxuICAgICcoY2xpY2spJzogJ3RvZ2dsZU9wZW4oKSdcclxuICB9LFxyXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBOZ2JEcm9wZG93bkFuY2hvciwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdiRHJvcGRvd25Ub2dnbGUpfV1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYkRyb3Bkb3duVG9nZ2xlIGV4dGVuZHMgTmdiRHJvcGRvd25BbmNob3Ige1xyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ2JEcm9wZG93bikpIGRyb3Bkb3duLCBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xyXG4gICAgc3VwZXIoZHJvcGRvd24sIGVsZW1lbnRSZWYpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlT3BlbigpIHsgdGhpcy5kcm9wZG93bi50b2dnbGUoKTsgfVxyXG59XHJcblxyXG4vKipcclxuICogVHJhbnNmb3JtcyBhIG5vZGUgaW50byBhIGRyb3Bkb3duLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbmdiRHJvcGRvd25dJywgZXhwb3J0QXM6ICduZ2JEcm9wZG93bicsIGhvc3Q6IHsnW2NsYXNzLnNob3ddJzogJ2lzT3BlbigpJ319KVxyXG5leHBvcnQgY2xhc3MgTmdiRHJvcGRvd24gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSBfY2xvc2VkJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcbiAgcHJpdmF0ZSBfem9uZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBAQ29udGVudENoaWxkKE5nYkRyb3Bkb3duTWVudSkgcHJpdmF0ZSBfbWVudTogTmdiRHJvcGRvd25NZW51O1xyXG5cclxuICBAQ29udGVudENoaWxkKE5nYkRyb3Bkb3duTWVudSwge3JlYWQ6IEVsZW1lbnRSZWZ9KSBwcml2YXRlIF9tZW51RWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XHJcblxyXG4gIEBDb250ZW50Q2hpbGQoTmdiRHJvcGRvd25BbmNob3IpIHByaXZhdGUgX2FuY2hvcjogTmdiRHJvcGRvd25BbmNob3I7XHJcblxyXG4gIC8qKlxyXG4gICAqIEluZGljYXRlcyB0aGF0IGRyb3Bkb3duIHNob3VsZCBiZSBjbG9zZWQgd2hlbiBzZWxlY3Rpbmcgb25lIG9mIGRyb3Bkb3duIGl0ZW1zIChjbGljaykgb3IgcHJlc3NpbmcgRVNDLlxyXG4gICAqIFdoZW4gaXQgaXMgdHJ1ZSAoZGVmYXVsdCkgZHJvcGRvd25zIGFyZSBhdXRvbWF0aWNhbGx5IGNsb3NlZCBvbiBib3RoIG91dHNpZGUgYW5kIGluc2lkZSAobWVudSkgY2xpY2tzLlxyXG4gICAqIFdoZW4gaXQgaXMgZmFsc2UgZHJvcGRvd25zIGFyZSBuZXZlciBhdXRvbWF0aWNhbGx5IGNsb3NlZC5cclxuICAgKiBXaGVuIGl0IGlzICdvdXRzaWRlJyBkcm9wZG93bnMgYXJlIGF1dG9tYXRpY2FsbHkgY2xvc2VkIG9uIG91dHNpZGUgY2xpY2tzIGJ1dCBub3Qgb24gbWVudSBjbGlja3MuXHJcbiAgICogV2hlbiBpdCBpcyAnaW5zaWRlJyBkcm9wZG93bnMgYXJlIGF1dG9tYXRpY2FsbHkgb24gbWVudSBjbGlja3MgYnV0IG5vdCBvbiBvdXRzaWRlIGNsaWNrcy5cclxuICAgKi9cclxuICBASW5wdXQoKSBhdXRvQ2xvc2U6IGJvb2xlYW4gfCAnb3V0c2lkZScgfCAnaW5zaWRlJztcclxuXHJcbiAgLyoqXHJcbiAgICogIERlZmluZXMgd2hldGhlciBvciBub3QgdGhlIGRyb3Bkb3duLW1lbnUgaXMgb3BlbiBpbml0aWFsbHkuXHJcbiAgICovXHJcbiAgQElucHV0KCdvcGVuJykgX29wZW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogUGxhY2VtZW50IG9mIGEgcG9wb3ZlciBhY2NlcHRzOlxyXG4gICAqICAgIFwidG9wXCIsIFwidG9wLWxlZnRcIiwgXCJ0b3AtcmlnaHRcIiwgXCJib3R0b21cIiwgXCJib3R0b20tbGVmdFwiLCBcImJvdHRvbS1yaWdodFwiLFxyXG4gICAqICAgIFwibGVmdFwiLCBcImxlZnQtdG9wXCIsIFwibGVmdC1ib3R0b21cIiwgXCJyaWdodFwiLCBcInJpZ2h0LXRvcFwiLCBcInJpZ2h0LWJvdHRvbVwiXHJcbiAgICogYW5kIGFycmF5IG9mIGFib3ZlIHZhbHVlcy5cclxuICAgKi9cclxuICBASW5wdXQoKSBwbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5O1xyXG5cclxuICAvKipcclxuICAgKiAgQW4gZXZlbnQgZmlyZWQgd2hlbiB0aGUgZHJvcGRvd24gaXMgb3BlbmVkIG9yIGNsb3NlZC5cclxuICAgKiAgRXZlbnQncyBwYXlsb2FkIGVxdWFscyB3aGV0aGVyIGRyb3Bkb3duIGlzIG9wZW4uXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG9wZW5DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGNvbmZpZzogTmdiRHJvcGRvd25Db25maWcsIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksXHJcbiAgICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lKSB7XHJcbiAgICB0aGlzLnBsYWNlbWVudCA9IGNvbmZpZy5wbGFjZW1lbnQ7XHJcbiAgICB0aGlzLmF1dG9DbG9zZSA9IGNvbmZpZy5hdXRvQ2xvc2U7XHJcbiAgICB0aGlzLl96b25lU3Vic2NyaXB0aW9uID0gX25nWm9uZS5vblN0YWJsZS5zdWJzY3JpYmUoKCkgPT4geyB0aGlzLl9wb3NpdGlvbk1lbnUoKTsgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmICh0aGlzLl9tZW51KSB7XHJcbiAgICAgIHRoaXMuX21lbnUuYXBwbHlQbGFjZW1lbnQoQXJyYXkuaXNBcnJheSh0aGlzLnBsYWNlbWVudCkgPyAodGhpcy5wbGFjZW1lbnRbMF0pIDogdGhpcy5wbGFjZW1lbnQgYXMgUGxhY2VtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fb3Blbikge1xyXG4gICAgICB0aGlzLl9zZXRDbG9zZUhhbmRsZXJzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7IHRoaXMuX3NldEtleWJvYXJkSGFuZGxlcnMoKTsgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVja3MgaWYgdGhlIGRyb3Bkb3duIG1lbnUgaXMgb3BlbiBvciBub3QuXHJcbiAgICovXHJcbiAgaXNPcGVuKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fb3BlbjsgfVxyXG5cclxuICAvKipcclxuICAgKiBPcGVucyB0aGUgZHJvcGRvd24gbWVudSBvZiBhIGdpdmVuIG5hdmJhciBvciB0YWJiZWQgbmF2aWdhdGlvbi5cclxuICAgKi9cclxuICBvcGVuKCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLl9vcGVuKSB7XHJcbiAgICAgIHRoaXMuX29wZW4gPSB0cnVlO1xyXG4gICAgICB0aGlzLl9wb3NpdGlvbk1lbnUoKTtcclxuICAgICAgdGhpcy5vcGVuQ2hhbmdlLmVtaXQodHJ1ZSk7XHJcbiAgICAgIHRoaXMuX3NldENsb3NlSGFuZGxlcnMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3NldENsb3NlSGFuZGxlcnMoKSB7XHJcbiAgICBpZiAodGhpcy5hdXRvQ2xvc2UpIHtcclxuICAgICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICBjb25zdCBlc2NhcGVzJCA9IGZyb21FdmVudDxLZXlib2FyZEV2ZW50Pih0aGlzLl9kb2N1bWVudCwgJ2tleXVwJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fY2xvc2VkJCksIGZpbHRlcihldmVudCA9PiBldmVudC53aGljaCA9PT0gS2V5LkVzY2FwZSkpO1xyXG5cclxuICAgICAgICBjb25zdCBjbGlja3MkID0gZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KHRoaXMuX2RvY3VtZW50LCAnY2xpY2snKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX2Nsb3NlZCQpLCBmaWx0ZXIoZXZlbnQgPT4gdGhpcy5fc2hvdWxkQ2xvc2VGcm9tQ2xpY2soZXZlbnQpKSk7XHJcblxyXG4gICAgICAgIHJhY2U8RXZlbnQ+KFtlc2NhcGVzJCwgY2xpY2tzJF0pLnBpcGUodGFrZVVudGlsKHRoaXMuX2Nsb3NlZCQpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fbmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xvc2VzIHRoZSBkcm9wZG93biBtZW51IG9mIGEgZ2l2ZW4gbmF2YmFyIG9yIHRhYmJlZCBuYXZpZ2F0aW9uLlxyXG4gICAqL1xyXG4gIGNsb3NlKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX29wZW4pIHtcclxuICAgICAgdGhpcy5fb3BlbiA9IGZhbHNlO1xyXG4gICAgICB0aGlzLl9jbG9zZWQkLm5leHQoKTtcclxuICAgICAgdGhpcy5vcGVuQ2hhbmdlLmVtaXQoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVG9nZ2xlcyB0aGUgZHJvcGRvd24gbWVudSBvZiBhIGdpdmVuIG5hdmJhciBvciB0YWJiZWQgbmF2aWdhdGlvbi5cclxuICAgKi9cclxuICB0b2dnbGUoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5pc09wZW4oKSkge1xyXG4gICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm9wZW4oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3Nob3VsZENsb3NlRnJvbUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQuYnV0dG9uICE9PSAyICYmICF0aGlzLl9pc0V2ZW50RnJvbVRvZ2dsZShldmVudCkpIHtcclxuICAgICAgaWYgKHRoaXMuYXV0b0Nsb3NlID09PSB0cnVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5hdXRvQ2xvc2UgPT09ICdpbnNpZGUnICYmIHRoaXMuX2lzRXZlbnRGcm9tTWVudShldmVudCkpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmF1dG9DbG9zZSA9PT0gJ291dHNpZGUnICYmICF0aGlzLl9pc0V2ZW50RnJvbU1lbnUoZXZlbnQpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5fY2xvc2VkJC5uZXh0KCk7XHJcbiAgICB0aGlzLl96b25lU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9pc0V2ZW50RnJvbVRvZ2dsZSgkZXZlbnQpIHsgcmV0dXJuIHRoaXMuX2FuY2hvci5pc0V2ZW50RnJvbSgkZXZlbnQpOyB9XHJcblxyXG4gIHByaXZhdGUgX2lzRXZlbnRGcm9tTWVudSgkZXZlbnQpIHsgcmV0dXJuIHRoaXMuX21lbnUgPyB0aGlzLl9tZW51LmlzRXZlbnRGcm9tKCRldmVudCkgOiBmYWxzZTsgfVxyXG5cclxuICBwcml2YXRlIF9wb3NpdGlvbk1lbnUoKSB7XHJcbiAgICBpZiAodGhpcy5pc09wZW4oKSAmJiB0aGlzLl9tZW51KSB7XHJcbiAgICAgIHRoaXMuX21lbnUucG9zaXRpb24odGhpcy5fYW5jaG9yLmFuY2hvckVsLCB0aGlzLnBsYWNlbWVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zZXRLZXlib2FyZEhhbmRsZXJzKCkge1xyXG4gICAgY29uc3QgbGlzdGVuZXJzID0gW107XHJcbiAgICBpZiAodGhpcy5fYW5jaG9yKSB7XHJcbiAgICAgIGNvbnN0IGFuY2hvciQgPSBmcm9tRXZlbnQ8S2V5Ym9hcmRFdmVudD4odGhpcy5fYW5jaG9yLmFuY2hvckVsLCAna2V5ZG93bicpLnBpcGUoZmlsdGVyKGZpbHRlcktleWJvYXJkRXZlbnRzKSk7XHJcbiAgICAgIGxpc3RlbmVycy5wdXNoKGFuY2hvciQpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX21lbnUpIHtcclxuICAgICAgY29uc3QgaXRlbXMkID1cclxuICAgICAgICAgIG1lcmdlKC4uLnRoaXMuX21lbnUubWVudUl0ZW1zLm1hcChpdGVtID0+IGZyb21FdmVudDxLZXlib2FyZEV2ZW50PihpdGVtLmRyb3Bkb3duSXRlbUVsLCAna2V5ZG93bicpKSlcclxuICAgICAgICAgICAgICAucGlwZShmaWx0ZXIoZmlsdGVyS2V5Ym9hcmRFdmVudHMpKTtcclxuICAgICAgbGlzdGVuZXJzLnB1c2goaXRlbXMkKTtcclxuICAgIH1cclxuXHJcbiAgICBtZXJnZSguLi5saXN0ZW5lcnMpLnN1YnNjcmliZSh0aGlzLm9uS2V5RG93bi5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgaWYgKCF0aGlzLmlzT3BlbigpKSB7XHJcbiAgICAgIHRoaXMub3BlbigpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbGlzdCA9IHRoaXMuX2dldE1lbnVFbGVtZW50cygpO1xyXG5cclxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHBvc2l0aW9uID0gbGlzdC5maW5kSW5kZXgoZWxlbWVudCA9PiBlbGVtZW50ID09PSB0aGlzLl9kb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcclxuICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcclxuICAgICAgY2FzZSBLZXkuQXJyb3dEb3duOlxyXG4gICAgICAgIHBvc2l0aW9uID0gTWF0aC5taW4ocG9zaXRpb24gKyAxLCBsaXN0Lmxlbmd0aCAtIDEpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEtleS5BcnJvd1VwOlxyXG4gICAgICAgIHBvc2l0aW9uID0gTWF0aC5tYXgocG9zaXRpb24gLSAxLCAwKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBLZXkuSG9tZTpcclxuICAgICAgICBwb3NpdGlvbiA9IDA7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgS2V5LkVuZDpcclxuICAgICAgICBwb3NpdGlvbiA9IGxpc3QubGVuZ3RoIC0gMTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIGNvbnN0IGVsbTogSFRNTEVsZW1lbnQgPSBsaXN0W3Bvc2l0aW9uXTtcclxuICAgIGVsbS5mb2N1cygpO1xyXG5cclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9nZXRNZW51RWxlbWVudHMoKTogSFRNTEVsZW1lbnRbXSB7XHJcbiAgICBpZiAodGhpcy5fbWVudSA9PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9tZW51Lm1lbnVJdGVtcy5maWx0ZXIoaXRlbSA9PiAhaXRlbS5kaXNhYmxlZCkubWFwKGl0ZW0gPT4gaXRlbS5kcm9wZG93bkl0ZW1FbCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBmaWx0ZXJLZXlib2FyZEV2ZW50cyhldmVudDogS2V5Ym9hcmRFdmVudCk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiBldmVudC53aGljaCA9PT0gS2V5LkFycm93RG93biB8fCBldmVudC53aGljaCA9PT0gS2V5LkFycm93VXAgfHwgZXZlbnQud2hpY2ggPT09IEtleS5Ib21lIHx8XHJcbiAgICAgIGV2ZW50LndoaWNoID09PSBLZXkuRW5kO1xyXG59XHJcbiJdfQ==