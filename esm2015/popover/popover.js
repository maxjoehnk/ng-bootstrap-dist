/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Directive, Input, Output, EventEmitter, ChangeDetectionStrategy, Inject, Injector, Renderer2, ElementRef, TemplateRef, ViewContainerRef, ComponentFactoryResolver, NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, race } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { listenToTriggers } from '../util/triggers';
import { positionElements } from '../util/positioning';
import { PopupService } from '../util/popup';
import { Key } from '../util/key';
import { NgbPopoverConfig } from './popover-config';
/** @type {?} */
let nextId = 0;
export class NgbPopoverWindow {
    /**
     * @param {?} _element
     * @param {?} _renderer
     */
    constructor(_element, _renderer) {
        this._element = _element;
        this._renderer = _renderer;
        this.placement = 'top';
    }
    /**
     * @return {?}
     */
    isTitleTemplate() { return this.title instanceof TemplateRef; }
    /**
     * @param {?} _placement
     * @return {?}
     */
    applyPlacement(_placement) {
        // remove the current placement classes
        this._renderer.removeClass(this._element.nativeElement, 'bs-popover-' + this.placement.toString().split('-')[0]);
        this._renderer.removeClass(this._element.nativeElement, 'bs-popover-' + this.placement.toString());
        // set the new placement classes
        this.placement = _placement;
        // apply the new placement
        this._renderer.addClass(this._element.nativeElement, 'bs-popover-' + this.placement.toString().split('-')[0]);
        this._renderer.addClass(this._element.nativeElement, 'bs-popover-' + this.placement.toString());
    }
    /**
     * Tells whether the event has been triggered from this component's subtree or not.
     *
     * @param {?} event the event to check
     *
     * @return {?} whether the event has been triggered from this component's subtree or not.
     */
    isEventFrom(event) { return this._element.nativeElement.contains(/** @type {?} */ (event.target)); }
}
NgbPopoverWindow.decorators = [
    { type: Component, args: [{
                selector: 'ngb-popover-window',
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    '[class]': '"popover bs-popover-" + placement.split("-")[0]+" bs-popover-" + placement + (popoverClass ? " " + popoverClass : "")',
                    'role': 'tooltip',
                    '[id]': 'id'
                },
                template: `
    <div class="arrow"></div>
    <h3 class="popover-header" *ngIf="title != null">
      <ng-template #simpleTitle>{{title}}</ng-template>
      <ng-template [ngTemplateOutlet]="isTitleTemplate() ? title : simpleTitle" [ngTemplateOutletContext]="context"></ng-template>
    </h3>
    <div class="popover-body"><ng-content></ng-content></div>`,
                styles: [`
    :host.bs-popover-top .arrow, :host.bs-popover-bottom .arrow {
      left: 50%;
      margin-left: -5px;
    }

    :host.bs-popover-top-left .arrow, :host.bs-popover-bottom-left .arrow {
      left: 2em;
    }

    :host.bs-popover-top-right .arrow, :host.bs-popover-bottom-right .arrow {
      left: auto;
      right: 2em;
    }

    :host.bs-popover-left .arrow, :host.bs-popover-right .arrow {
      top: 50%;
      margin-top: -5px;
    }

    :host.bs-popover-left-top .arrow, :host.bs-popover-right-top .arrow {
      top: 0.7em;
    }

    :host.bs-popover-left-bottom .arrow, :host.bs-popover-right-bottom .arrow {
      top: auto;
      bottom: 0.7em;
    }
  `]
            },] },
];
/** @nocollapse */
NgbPopoverWindow.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
NgbPopoverWindow.propDecorators = {
    placement: [{ type: Input }],
    title: [{ type: Input }],
    id: [{ type: Input }],
    popoverClass: [{ type: Input }],
    context: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NgbPopoverWindow.prototype.placement;
    /** @type {?} */
    NgbPopoverWindow.prototype.title;
    /** @type {?} */
    NgbPopoverWindow.prototype.id;
    /** @type {?} */
    NgbPopoverWindow.prototype.popoverClass;
    /** @type {?} */
    NgbPopoverWindow.prototype.context;
    /** @type {?} */
    NgbPopoverWindow.prototype._element;
    /** @type {?} */
    NgbPopoverWindow.prototype._renderer;
}
/**
 * A lightweight, extensible directive for fancy popover creation.
 */
export class NgbPopover {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} injector
     * @param {?} componentFactoryResolver
     * @param {?} viewContainerRef
     * @param {?} config
     * @param {?} _ngZone
     * @param {?} _document
     */
    constructor(_elementRef, _renderer, injector, componentFactoryResolver, viewContainerRef, config, _ngZone, _document) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._ngZone = _ngZone;
        this._document = _document;
        /**
         * Emits an event when the popover is shown
         */
        this.shown = new EventEmitter();
        /**
         * Emits an event when the popover is hidden
         */
        this.hidden = new EventEmitter();
        this._ngbPopoverWindowId = `ngb-popover-${nextId++}`;
        this.autoClose = config.autoClose;
        this.placement = config.placement;
        this.triggers = config.triggers;
        this.container = config.container;
        this.disablePopover = config.disablePopover;
        this.popoverClass = config.popoverClass;
        this._popupService = new PopupService(NgbPopoverWindow, injector, viewContainerRef, _renderer, componentFactoryResolver);
        this._zoneSubscription = _ngZone.onStable.subscribe(() => {
            if (this._windowRef) {
                this._windowRef.instance.applyPlacement(positionElements(this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement, this.container === 'body'));
            }
        });
    }
    /**
     * @return {?}
     */
    _isDisabled() {
        if (this.disablePopover) {
            return true;
        }
        if (!this.ngbPopover && !this.popoverTitle) {
            return true;
        }
        return false;
    }
    /**
     * Opens an element’s popover. This is considered a “manual” triggering of the popover.
     * The context is an optional value to be injected into the popover template when it is created.
     * @param {?=} context
     * @return {?}
     */
    open(context) {
        if (!this._windowRef && !this._isDisabled()) {
            this._windowRef = this._popupService.open(this.ngbPopover, context);
            this._windowRef.instance.title = this.popoverTitle;
            this._windowRef.instance.context = context;
            this._windowRef.instance.popoverClass = this.popoverClass;
            this._windowRef.instance.id = this._ngbPopoverWindowId;
            this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-describedby', this._ngbPopoverWindowId);
            if (this.container === 'body') {
                this._document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
            }
            // apply styling to set basic css-classes on target element, before going for positioning
            this._windowRef.changeDetectorRef.detectChanges();
            this._windowRef.changeDetectorRef.markForCheck();
            // position popover along the element
            this._windowRef.instance.applyPlacement(positionElements(this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement, this.container === 'body'));
            if (this.autoClose) {
                this._ngZone.runOutsideAngular(() => {
                    /** @type {?} */
                    let justOpened = true;
                    requestAnimationFrame(() => justOpened = false);
                    /** @type {?} */
                    const escapes$ = fromEvent(this._document, 'keyup')
                        .pipe(takeUntil(this.hidden), filter(event => event.which === Key.Escape));
                    /** @type {?} */
                    const clicks$ = fromEvent(this._document, 'click')
                        .pipe(takeUntil(this.hidden), filter(() => !justOpened), filter(event => this._shouldCloseFromClick(event)));
                    race([escapes$, clicks$]).subscribe(() => this._ngZone.run(() => this.close()));
                });
            }
            this.shown.emit();
        }
    }
    /**
     * Closes an element’s popover. This is considered a “manual” triggering of the popover.
     * @return {?}
     */
    close() {
        if (this._windowRef) {
            this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-describedby');
            this._popupService.close();
            this._windowRef = null;
            this.hidden.emit();
        }
    }
    /**
     * Toggles an element’s popover. This is considered a “manual” triggering of the popover.
     * @return {?}
     */
    toggle() {
        if (this._windowRef) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Returns whether or not the popover is currently being shown
     * @return {?}
     */
    isOpen() { return this._windowRef != null; }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._unregisterListenersFn = listenToTriggers(this._renderer, this._elementRef.nativeElement, this.triggers, this.open.bind(this), this.close.bind(this), this.toggle.bind(this));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        // close popover if title and content become empty, or disablePopover set to true
        if ((changes['ngbPopover'] || changes['popoverTitle'] || changes['disablePopover']) && this._isDisabled()) {
            this.close();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.close();
        this._unregisterListenersFn();
        this._zoneSubscription.unsubscribe();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _shouldCloseFromClick(event) {
        if (event.button !== 2) {
            if (this.autoClose === true) {
                return true;
            }
            else if (this.autoClose === 'inside' && this._isEventFromPopover(event)) {
                return true;
            }
            else if (this.autoClose === 'outside' && !this._isEventFromPopover(event)) {
                return true;
            }
        }
        return false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _isEventFromPopover(event) {
        /** @type {?} */
        const popup = this._windowRef.instance;
        return popup ? popup.isEventFrom(event) : false;
    }
}
NgbPopover.decorators = [
    { type: Directive, args: [{ selector: '[ngbPopover]', exportAs: 'ngbPopover' },] },
];
/** @nocollapse */
NgbPopover.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: Injector },
    { type: ComponentFactoryResolver },
    { type: ViewContainerRef },
    { type: NgbPopoverConfig },
    { type: NgZone },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
NgbPopover.propDecorators = {
    autoClose: [{ type: Input }],
    ngbPopover: [{ type: Input }],
    popoverTitle: [{ type: Input }],
    placement: [{ type: Input }],
    triggers: [{ type: Input }],
    container: [{ type: Input }],
    disablePopover: [{ type: Input }],
    popoverClass: [{ type: Input }],
    shown: [{ type: Output }],
    hidden: [{ type: Output }]
};
if (false) {
    /**
     * Indicates whether the popover should be closed on Escape key and inside/outside clicks.
     *
     * - true (default): closes on both outside and inside clicks as well as Escape presses
     * - false: disables the autoClose feature (NB: triggers still apply)
     * - 'inside': closes on inside clicks as well as Escape presses
     * - 'outside': closes on outside clicks (sometimes also achievable through triggers)
     * as well as Escape presses
     *
     * \@since 3.0.0
     * @type {?}
     */
    NgbPopover.prototype.autoClose;
    /**
     * Content to be displayed as popover. If title and content are empty, the popover won't open.
     * @type {?}
     */
    NgbPopover.prototype.ngbPopover;
    /**
     * Title of a popover. If title and content are empty, the popover won't open.
     * @type {?}
     */
    NgbPopover.prototype.popoverTitle;
    /**
     * Placement of a popover accepts:
     *    "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right",
     *    "left", "left-top", "left-bottom", "right", "right-top", "right-bottom"
     * and array of above values.
     * @type {?}
     */
    NgbPopover.prototype.placement;
    /**
     * Specifies events that should trigger. Supports a space separated list of event names.
     * @type {?}
     */
    NgbPopover.prototype.triggers;
    /**
     * A selector specifying the element the popover should be appended to.
     * Currently only supports "body".
     * @type {?}
     */
    NgbPopover.prototype.container;
    /**
     * A flag indicating if a given popover is disabled and should not be displayed.
     *
     * \@since 1.1.0
     * @type {?}
     */
    NgbPopover.prototype.disablePopover;
    /**
     * An optional class applied to ngb-popover-window
     *
     * \@since 2.2.0
     * @type {?}
     */
    NgbPopover.prototype.popoverClass;
    /**
     * Emits an event when the popover is shown
     * @type {?}
     */
    NgbPopover.prototype.shown;
    /**
     * Emits an event when the popover is hidden
     * @type {?}
     */
    NgbPopover.prototype.hidden;
    /** @type {?} */
    NgbPopover.prototype._ngbPopoverWindowId;
    /** @type {?} */
    NgbPopover.prototype._popupService;
    /** @type {?} */
    NgbPopover.prototype._windowRef;
    /** @type {?} */
    NgbPopover.prototype._unregisterListenersFn;
    /** @type {?} */
    NgbPopover.prototype._zoneSubscription;
    /** @type {?} */
    NgbPopover.prototype._elementRef;
    /** @type {?} */
    NgbPopover.prototype._renderer;
    /** @type {?} */
    NgbPopover.prototype._ngZone;
    /** @type {?} */
    NgbPopover.prototype._document;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsicG9wb3Zlci9wb3BvdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWix1QkFBdUIsRUFJdkIsTUFBTSxFQUNOLFFBQVEsRUFDUixTQUFTLEVBRVQsVUFBVSxFQUNWLFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIsd0JBQXdCLEVBQ3hCLE1BQU0sRUFFUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDckMsT0FBTyxFQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUMsZ0JBQWdCLEVBQTRCLE1BQU0scUJBQXFCLENBQUM7QUFDaEYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBRWhDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDOztBQUVsRCxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFnRGYsTUFBTTs7Ozs7SUFPSixZQUFvQixRQUFpQyxFQUFVLFNBQW9CO1FBQS9ELGFBQVEsR0FBUixRQUFRLENBQXlCO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVzt5QkFObkQsS0FBSztLQU1rRDs7OztJQUV2RixlQUFlLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLFlBQVksV0FBVyxDQUFDLEVBQUU7Ozs7O0lB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XG4gIENvbXBvbmVudCxcclxuICBEaXJlY3RpdmUsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBJbmplY3QsXHJcbiAgSW5qZWN0b3IsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIENvbXBvbmVudFJlZixcclxuICBFbGVtZW50UmVmLFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIFZpZXdDb250YWluZXJSZWYsXHJcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gIE5nWm9uZSxcclxuICBTaW1wbGVDaGFuZ2VzXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7ZnJvbUV2ZW50LCByYWNlfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtmaWx0ZXIsIHRha2VVbnRpbH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHtsaXN0ZW5Ub1RyaWdnZXJzfSBmcm9tICcuLi91dGlsL3RyaWdnZXJzJztcclxuaW1wb3J0IHtwb3NpdGlvbkVsZW1lbnRzLCBQbGFjZW1lbnQsIFBsYWNlbWVudEFycmF5fSBmcm9tICcuLi91dGlsL3Bvc2l0aW9uaW5nJztcclxuaW1wb3J0IHtQb3B1cFNlcnZpY2V9IGZyb20gJy4uL3V0aWwvcG9wdXAnO1xyXG5pbXBvcnQge0tleX0gZnJvbSAnLi4vdXRpbC9rZXknO1xyXG5cclxuaW1wb3J0IHtOZ2JQb3BvdmVyQ29uZmlnfSBmcm9tICcuL3BvcG92ZXItY29uZmlnJztcclxuXHJcbmxldCBuZXh0SWQgPSAwO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ2ItcG9wb3Zlci13aW5kb3cnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIGhvc3Q6IHtcclxuICAgICdbY2xhc3NdJzpcclxuICAgICAgICAnXCJwb3BvdmVyIGJzLXBvcG92ZXItXCIgKyBwbGFjZW1lbnQuc3BsaXQoXCItXCIpWzBdK1wiIGJzLXBvcG92ZXItXCIgKyBwbGFjZW1lbnQgKyAocG9wb3ZlckNsYXNzID8gXCIgXCIgKyBwb3BvdmVyQ2xhc3MgOiBcIlwiKScsXHJcbiAgICAncm9sZSc6ICd0b29sdGlwJyxcclxuICAgICdbaWRdJzogJ2lkJ1xyXG4gIH0sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJhcnJvd1wiPjwvZGl2PlxyXG4gICAgPGgzIGNsYXNzPVwicG9wb3Zlci1oZWFkZXJcIiAqbmdJZj1cInRpdGxlICE9IG51bGxcIj5cclxuICAgICAgPG5nLXRlbXBsYXRlICNzaW1wbGVUaXRsZT57e3RpdGxlfX08L25nLXRlbXBsYXRlPlxyXG4gICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiaXNUaXRsZVRlbXBsYXRlKCkgPyB0aXRsZSA6IHNpbXBsZVRpdGxlXCIgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cImNvbnRleHRcIj48L25nLXRlbXBsYXRlPlxyXG4gICAgPC9oMz5cclxuICAgIDxkaXYgY2xhc3M9XCJwb3BvdmVyLWJvZHlcIj48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9kaXY+YCxcclxuICBzdHlsZXM6IFtgXHJcbiAgICA6aG9zdC5icy1wb3BvdmVyLXRvcCAuYXJyb3csIDpob3N0LmJzLXBvcG92ZXItYm90dG9tIC5hcnJvdyB7XHJcbiAgICAgIGxlZnQ6IDUwJTtcclxuICAgICAgbWFyZ2luLWxlZnQ6IC01cHg7XHJcbiAgICB9XHJcblxyXG4gICAgOmhvc3QuYnMtcG9wb3Zlci10b3AtbGVmdCAuYXJyb3csIDpob3N0LmJzLXBvcG92ZXItYm90dG9tLWxlZnQgLmFycm93IHtcclxuICAgICAgbGVmdDogMmVtO1xyXG4gICAgfVxyXG5cclxuICAgIDpob3N0LmJzLXBvcG92ZXItdG9wLXJpZ2h0IC5hcnJvdywgOmhvc3QuYnMtcG9wb3Zlci1ib3R0b20tcmlnaHQgLmFycm93IHtcclxuICAgICAgbGVmdDogYXV0bztcclxuICAgICAgcmlnaHQ6IDJlbTtcclxuICAgIH1cclxuXHJcbiAgICA6aG9zdC5icy1wb3BvdmVyLWxlZnQgLmFycm93LCA6aG9zdC5icy1wb3BvdmVyLXJpZ2h0IC5hcnJvdyB7XHJcbiAgICAgIHRvcDogNTAlO1xyXG4gICAgICBtYXJnaW4tdG9wOiAtNXB4O1xyXG4gICAgfVxyXG5cclxuICAgIDpob3N0LmJzLXBvcG92ZXItbGVmdC10b3AgLmFycm93LCA6aG9zdC5icy1wb3BvdmVyLXJpZ2h0LXRvcCAuYXJyb3cge1xyXG4gICAgICB0b3A6IDAuN2VtO1xyXG4gICAgfVxyXG5cclxuICAgIDpob3N0LmJzLXBvcG92ZXItbGVmdC1ib3R0b20gLmFycm93LCA6aG9zdC5icy1wb3BvdmVyLXJpZ2h0LWJvdHRvbSAuYXJyb3cge1xyXG4gICAgICB0b3A6IGF1dG87XHJcbiAgICAgIGJvdHRvbTogMC43ZW07XHJcbiAgICB9XHJcbiAgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYlBvcG92ZXJXaW5kb3cge1xyXG4gIEBJbnB1dCgpIHBsYWNlbWVudDogUGxhY2VtZW50ID0gJ3RvcCc7XHJcbiAgQElucHV0KCkgdGl0bGU6IHVuZGVmaW5lZCB8IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgQElucHV0KCkgaWQ6IHN0cmluZztcclxuICBASW5wdXQoKSBwb3BvdmVyQ2xhc3M6IHN0cmluZztcclxuICBASW5wdXQoKSBjb250ZXh0OiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxyXG5cclxuICBpc1RpdGxlVGVtcGxhdGUoKSB7IHJldHVybiB0aGlzLnRpdGxlIGluc3RhbmNlb2YgVGVtcGxhdGVSZWY7IH1cclxuXHJcbiAgYXBwbHlQbGFjZW1lbnQoX3BsYWNlbWVudDogUGxhY2VtZW50KSB7XHJcbiAgICAvLyByZW1vdmUgdGhlIGN1cnJlbnQgcGxhY2VtZW50IGNsYXNzZXNcclxuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2JzLXBvcG92ZXItJyArIHRoaXMucGxhY2VtZW50LnRvU3RyaW5nKCkuc3BsaXQoJy0nKVswXSk7XHJcbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdicy1wb3BvdmVyLScgKyB0aGlzLnBsYWNlbWVudC50b1N0cmluZygpKTtcclxuXHJcbiAgICAvLyBzZXQgdGhlIG5ldyBwbGFjZW1lbnQgY2xhc3Nlc1xyXG4gICAgdGhpcy5wbGFjZW1lbnQgPSBfcGxhY2VtZW50O1xyXG5cclxuICAgIC8vIGFwcGx5IHRoZSBuZXcgcGxhY2VtZW50XHJcbiAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdicy1wb3BvdmVyLScgKyB0aGlzLnBsYWNlbWVudC50b1N0cmluZygpLnNwbGl0KCctJylbMF0pO1xyXG4gICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnYnMtcG9wb3Zlci0nICsgdGhpcy5wbGFjZW1lbnQudG9TdHJpbmcoKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUZWxscyB3aGV0aGVyIHRoZSBldmVudCBoYXMgYmVlbiB0cmlnZ2VyZWQgZnJvbSB0aGlzIGNvbXBvbmVudCdzIHN1YnRyZWUgb3Igbm90LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGV2ZW50IHRoZSBldmVudCB0byBjaGVja1xyXG4gICAqXHJcbiAgICogQHJldHVybiB3aGV0aGVyIHRoZSBldmVudCBoYXMgYmVlbiB0cmlnZ2VyZWQgZnJvbSB0aGlzIGNvbXBvbmVudCdzIHN1YnRyZWUgb3Igbm90LlxyXG4gICAqL1xyXG4gIGlzRXZlbnRGcm9tKGV2ZW50OiBFdmVudCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCk7IH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEEgbGlnaHR3ZWlnaHQsIGV4dGVuc2libGUgZGlyZWN0aXZlIGZvciBmYW5jeSBwb3BvdmVyIGNyZWF0aW9uLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbmdiUG9wb3Zlcl0nLCBleHBvcnRBczogJ25nYlBvcG92ZXInfSlcclxuZXhwb3J0IGNsYXNzIE5nYlBvcG92ZXIgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcG9wb3ZlciBzaG91bGQgYmUgY2xvc2VkIG9uIEVzY2FwZSBrZXkgYW5kIGluc2lkZS9vdXRzaWRlIGNsaWNrcy5cclxuICAgKlxyXG4gICAqIC0gdHJ1ZSAoZGVmYXVsdCk6IGNsb3NlcyBvbiBib3RoIG91dHNpZGUgYW5kIGluc2lkZSBjbGlja3MgYXMgd2VsbCBhcyBFc2NhcGUgcHJlc3Nlc1xyXG4gICAqIC0gZmFsc2U6IGRpc2FibGVzIHRoZSBhdXRvQ2xvc2UgZmVhdHVyZSAoTkI6IHRyaWdnZXJzIHN0aWxsIGFwcGx5KVxyXG4gICAqIC0gJ2luc2lkZSc6IGNsb3NlcyBvbiBpbnNpZGUgY2xpY2tzIGFzIHdlbGwgYXMgRXNjYXBlIHByZXNzZXNcclxuICAgKiAtICdvdXRzaWRlJzogY2xvc2VzIG9uIG91dHNpZGUgY2xpY2tzIChzb21ldGltZXMgYWxzbyBhY2hpZXZhYmxlIHRocm91Z2ggdHJpZ2dlcnMpXHJcbiAgICogYXMgd2VsbCBhcyBFc2NhcGUgcHJlc3Nlc1xyXG4gICAqXHJcbiAgICogQHNpbmNlIDMuMC4wXHJcbiAgICovXHJcbiAgQElucHV0KCkgYXV0b0Nsb3NlOiBib29sZWFuIHwgJ2luc2lkZScgfCAnb3V0c2lkZSc7XHJcbiAgLyoqXHJcbiAgICogQ29udGVudCB0byBiZSBkaXNwbGF5ZWQgYXMgcG9wb3Zlci4gSWYgdGl0bGUgYW5kIGNvbnRlbnQgYXJlIGVtcHR5LCB0aGUgcG9wb3ZlciB3b24ndCBvcGVuLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG5nYlBvcG92ZXI6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgLyoqXHJcbiAgICogVGl0bGUgb2YgYSBwb3BvdmVyLiBJZiB0aXRsZSBhbmQgY29udGVudCBhcmUgZW1wdHksIHRoZSBwb3BvdmVyIHdvbid0IG9wZW4uXHJcbiAgICovXHJcbiAgQElucHV0KCkgcG9wb3ZlclRpdGxlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIC8qKlxyXG4gICAqIFBsYWNlbWVudCBvZiBhIHBvcG92ZXIgYWNjZXB0czpcclxuICAgKiAgICBcInRvcFwiLCBcInRvcC1sZWZ0XCIsIFwidG9wLXJpZ2h0XCIsIFwiYm90dG9tXCIsIFwiYm90dG9tLWxlZnRcIiwgXCJib3R0b20tcmlnaHRcIixcclxuICAgKiAgICBcImxlZnRcIiwgXCJsZWZ0LXRvcFwiLCBcImxlZnQtYm90dG9tXCIsIFwicmlnaHRcIiwgXCJyaWdodC10b3BcIiwgXCJyaWdodC1ib3R0b21cIlxyXG4gICAqIGFuZCBhcnJheSBvZiBhYm92ZSB2YWx1ZXMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgcGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheTtcclxuICAvKipcclxuICAgKiBTcGVjaWZpZXMgZXZlbnRzIHRoYXQgc2hvdWxkIHRyaWdnZXIuIFN1cHBvcnRzIGEgc3BhY2Ugc2VwYXJhdGVkIGxpc3Qgb2YgZXZlbnQgbmFtZXMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgdHJpZ2dlcnM6IHN0cmluZztcclxuICAvKipcclxuICAgKiBBIHNlbGVjdG9yIHNwZWNpZnlpbmcgdGhlIGVsZW1lbnQgdGhlIHBvcG92ZXIgc2hvdWxkIGJlIGFwcGVuZGVkIHRvLlxyXG4gICAqIEN1cnJlbnRseSBvbmx5IHN1cHBvcnRzIFwiYm9keVwiLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNvbnRhaW5lcjogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGlmIGEgZ2l2ZW4gcG9wb3ZlciBpcyBkaXNhYmxlZCBhbmQgc2hvdWxkIG5vdCBiZSBkaXNwbGF5ZWQuXHJcbiAgICpcclxuICAgKiBAc2luY2UgMS4xLjBcclxuICAgKi9cclxuICBASW5wdXQoKSBkaXNhYmxlUG9wb3ZlcjogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBBbiBvcHRpb25hbCBjbGFzcyBhcHBsaWVkIHRvIG5nYi1wb3BvdmVyLXdpbmRvd1xyXG4gICAqXHJcbiAgICogQHNpbmNlIDIuMi4wXHJcbiAgICovXHJcbiAgQElucHV0KCkgcG9wb3ZlckNsYXNzOiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiB0aGUgcG9wb3ZlciBpcyBzaG93blxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzaG93biA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAvKipcclxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIHRoZSBwb3BvdmVyIGlzIGhpZGRlblxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBoaWRkZW4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIHByaXZhdGUgX25nYlBvcG92ZXJXaW5kb3dJZCA9IGBuZ2ItcG9wb3Zlci0ke25leHRJZCsrfWA7XHJcbiAgcHJpdmF0ZSBfcG9wdXBTZXJ2aWNlOiBQb3B1cFNlcnZpY2U8TmdiUG9wb3ZlcldpbmRvdz47XHJcbiAgcHJpdmF0ZSBfd2luZG93UmVmOiBDb21wb25lbnRSZWY8TmdiUG9wb3ZlcldpbmRvdz47XHJcbiAgcHJpdmF0ZSBfdW5yZWdpc3Rlckxpc3RlbmVyc0ZuO1xyXG4gIHByaXZhdGUgX3pvbmVTdWJzY3JpcHRpb246IGFueTtcclxuICBwcml2YXRlIF9pc0Rpc2FibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHRoaXMuZGlzYWJsZVBvcG92ZXIpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMubmdiUG9wb3ZlciAmJiAhdGhpcy5wb3BvdmVyVGl0bGUpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsIGluamVjdG9yOiBJbmplY3RvcixcclxuICAgICAgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsIGNvbmZpZzogTmdiUG9wb3ZlckNvbmZpZyxcclxuICAgICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnkpIHtcclxuICAgIHRoaXMuYXV0b0Nsb3NlID0gY29uZmlnLmF1dG9DbG9zZTtcclxuICAgIHRoaXMucGxhY2VtZW50ID0gY29uZmlnLnBsYWNlbWVudDtcclxuICAgIHRoaXMudHJpZ2dlcnMgPSBjb25maWcudHJpZ2dlcnM7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbmZpZy5jb250YWluZXI7XHJcbiAgICB0aGlzLmRpc2FibGVQb3BvdmVyID0gY29uZmlnLmRpc2FibGVQb3BvdmVyO1xyXG4gICAgdGhpcy5wb3BvdmVyQ2xhc3MgPSBjb25maWcucG9wb3ZlckNsYXNzO1xyXG4gICAgdGhpcy5fcG9wdXBTZXJ2aWNlID0gbmV3IFBvcHVwU2VydmljZTxOZ2JQb3BvdmVyV2luZG93PihcclxuICAgICAgICBOZ2JQb3BvdmVyV2luZG93LCBpbmplY3Rvciwgdmlld0NvbnRhaW5lclJlZiwgX3JlbmRlcmVyLCBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpO1xyXG5cclxuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24gPSBfbmdab25lLm9uU3RhYmxlLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLl93aW5kb3dSZWYpIHtcclxuICAgICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuYXBwbHlQbGFjZW1lbnQoXHJcbiAgICAgICAgICAgIHBvc2l0aW9uRWxlbWVudHMoXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX3dpbmRvd1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LCB0aGlzLnBsYWNlbWVudCxcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID09PSAnYm9keScpKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPcGVucyBhbiBlbGVtZW504oCZcyBwb3BvdmVyLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSDigJxtYW51YWzigJ0gdHJpZ2dlcmluZyBvZiB0aGUgcG9wb3Zlci5cclxuICAgKiBUaGUgY29udGV4dCBpcyBhbiBvcHRpb25hbCB2YWx1ZSB0byBiZSBpbmplY3RlZCBpbnRvIHRoZSBwb3BvdmVyIHRlbXBsYXRlIHdoZW4gaXQgaXMgY3JlYXRlZC5cclxuICAgKi9cclxuICBvcGVuKGNvbnRleHQ/OiBhbnkpIHtcclxuICAgIGlmICghdGhpcy5fd2luZG93UmVmICYmICF0aGlzLl9pc0Rpc2FibGVkKCkpIHtcclxuICAgICAgdGhpcy5fd2luZG93UmVmID0gdGhpcy5fcG9wdXBTZXJ2aWNlLm9wZW4odGhpcy5uZ2JQb3BvdmVyLCBjb250ZXh0KTtcclxuICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLnRpdGxlID0gdGhpcy5wb3BvdmVyVGl0bGU7XHJcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5jb250ZXh0ID0gY29udGV4dDtcclxuICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLnBvcG92ZXJDbGFzcyA9IHRoaXMucG9wb3ZlckNsYXNzO1xyXG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuaWQgPSB0aGlzLl9uZ2JQb3BvdmVyV2luZG93SWQ7XHJcblxyXG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYXJpYS1kZXNjcmliZWRieScsIHRoaXMuX25nYlBvcG92ZXJXaW5kb3dJZCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5jb250YWluZXIgPT09ICdib2R5Jykge1xyXG4gICAgICAgIHRoaXMuX2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5jb250YWluZXIpLmFwcGVuZENoaWxkKHRoaXMuX3dpbmRvd1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gYXBwbHkgc3R5bGluZyB0byBzZXQgYmFzaWMgY3NzLWNsYXNzZXMgb24gdGFyZ2V0IGVsZW1lbnQsIGJlZm9yZSBnb2luZyBmb3IgcG9zaXRpb25pbmdcclxuICAgICAgdGhpcy5fd2luZG93UmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgdGhpcy5fd2luZG93UmVmLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xyXG5cclxuICAgICAgLy8gcG9zaXRpb24gcG9wb3ZlciBhbG9uZyB0aGUgZWxlbWVudFxyXG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuYXBwbHlQbGFjZW1lbnQoXHJcbiAgICAgICAgICBwb3NpdGlvbkVsZW1lbnRzKFxyXG4gICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsIHRoaXMucGxhY2VtZW50LFxyXG4gICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID09PSAnYm9keScpKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLmF1dG9DbG9zZSkge1xyXG4gICAgICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAvLyBwcmV2ZW50cyBhdXRvbWF0aWMgY2xvc2luZyByaWdodCBhZnRlciBhbiBvcGVuaW5nIGJ5IHB1dHRpbmcgYSBndWFyZCBmb3IgdGhlIHRpbWUgb2Ygb25lIGV2ZW50IGhhbmRsaW5nXHJcbiAgICAgICAgICAvLyBwYXNzXHJcbiAgICAgICAgICAvLyB1c2UgY2FzZTogY2xpY2sgZXZlbnQgd291bGQgcmVhY2ggYW4gZWxlbWVudCBvcGVuaW5nIHRoZSBwb3BvdmVyIGZpcnN0LCB0aGVuIHJlYWNoIHRoZSBhdXRvQ2xvc2UgaGFuZGxlclxyXG4gICAgICAgICAgLy8gd2hpY2ggd291bGQgY2xvc2UgaXRcclxuICAgICAgICAgIGxldCBqdXN0T3BlbmVkID0gdHJ1ZTtcclxuICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBqdXN0T3BlbmVkID0gZmFsc2UpO1xyXG5cclxuICAgICAgICAgIGNvbnN0IGVzY2FwZXMkID0gZnJvbUV2ZW50PEtleWJvYXJkRXZlbnQ+KHRoaXMuX2RvY3VtZW50LCAna2V5dXAnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuaGlkZGVuKSwgZmlsdGVyKGV2ZW50ID0+IGV2ZW50LndoaWNoID09PSBLZXkuRXNjYXBlKSk7XHJcblxyXG4gICAgICAgICAgY29uc3QgY2xpY2tzJCA9IGZyb21FdmVudDxNb3VzZUV2ZW50Pih0aGlzLl9kb2N1bWVudCwgJ2NsaWNrJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWtlVW50aWwodGhpcy5oaWRkZW4pLCBmaWx0ZXIoKCkgPT4gIWp1c3RPcGVuZWQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyKGV2ZW50ID0+IHRoaXMuX3Nob3VsZENsb3NlRnJvbUNsaWNrKGV2ZW50KSkpO1xyXG5cclxuICAgICAgICAgIHJhY2U8RXZlbnQ+KFtlc2NhcGVzJCwgY2xpY2tzJF0pLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHRoaXMuY2xvc2UoKSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnNob3duLmVtaXQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsb3NlcyBhbiBlbGVtZW504oCZcyBwb3BvdmVyLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSDigJxtYW51YWzigJ0gdHJpZ2dlcmluZyBvZiB0aGUgcG9wb3Zlci5cclxuICAgKi9cclxuICBjbG9zZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl93aW5kb3dSZWYpIHtcclxuICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQXR0cmlidXRlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2FyaWEtZGVzY3JpYmVkYnknKTtcclxuICAgICAgdGhpcy5fcG9wdXBTZXJ2aWNlLmNsb3NlKCk7XHJcbiAgICAgIHRoaXMuX3dpbmRvd1JlZiA9IG51bGw7XHJcbiAgICAgIHRoaXMuaGlkZGVuLmVtaXQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRvZ2dsZXMgYW4gZWxlbWVudOKAmXMgcG9wb3Zlci4gVGhpcyBpcyBjb25zaWRlcmVkIGEg4oCcbWFudWFs4oCdIHRyaWdnZXJpbmcgb2YgdGhlIHBvcG92ZXIuXHJcbiAgICovXHJcbiAgdG9nZ2xlKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX3dpbmRvd1JlZikge1xyXG4gICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm9wZW4oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHBvcG92ZXIgaXMgY3VycmVudGx5IGJlaW5nIHNob3duXHJcbiAgICovXHJcbiAgaXNPcGVuKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fd2luZG93UmVmICE9IG51bGw7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLl91bnJlZ2lzdGVyTGlzdGVuZXJzRm4gPSBsaXN0ZW5Ub1RyaWdnZXJzKFxyXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLCB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMudHJpZ2dlcnMsIHRoaXMub3Blbi5iaW5kKHRoaXMpLCB0aGlzLmNsb3NlLmJpbmQodGhpcyksXHJcbiAgICAgICAgdGhpcy50b2dnbGUuYmluZCh0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICAvLyBjbG9zZSBwb3BvdmVyIGlmIHRpdGxlIGFuZCBjb250ZW50IGJlY29tZSBlbXB0eSwgb3IgZGlzYWJsZVBvcG92ZXIgc2V0IHRvIHRydWVcclxuICAgIGlmICgoY2hhbmdlc1snbmdiUG9wb3ZlciddIHx8IGNoYW5nZXNbJ3BvcG92ZXJUaXRsZSddIHx8IGNoYW5nZXNbJ2Rpc2FibGVQb3BvdmVyJ10pICYmIHRoaXMuX2lzRGlzYWJsZWQoKSkge1xyXG4gICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIHRoaXMuX3VucmVnaXN0ZXJMaXN0ZW5lcnNGbigpO1xyXG4gICAgdGhpcy5fem9uZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc2hvdWxkQ2xvc2VGcm9tQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIGlmIChldmVudC5idXR0b24gIT09IDIpIHtcclxuICAgICAgaWYgKHRoaXMuYXV0b0Nsb3NlID09PSB0cnVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5hdXRvQ2xvc2UgPT09ICdpbnNpZGUnICYmIHRoaXMuX2lzRXZlbnRGcm9tUG9wb3ZlcihldmVudCkpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmF1dG9DbG9zZSA9PT0gJ291dHNpZGUnICYmICF0aGlzLl9pc0V2ZW50RnJvbVBvcG92ZXIoZXZlbnQpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2lzRXZlbnRGcm9tUG9wb3ZlcihldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgY29uc3QgcG9wdXAgPSB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2U7XHJcbiAgICByZXR1cm4gcG9wdXAgPyBwb3B1cC5pc0V2ZW50RnJvbShldmVudCkgOiBmYWxzZTtcclxuICB9XHJcbn1cclxuIl19