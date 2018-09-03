/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Directive, Input, Output, EventEmitter, ChangeDetectionStrategy, Inject, Injector, Renderer2, ElementRef, ViewContainerRef, ComponentFactoryResolver, NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, race } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { listenToTriggers } from '../util/triggers';
import { positionElements } from '../util/positioning';
import { PopupService } from '../util/popup';
import { Key } from '../util/key';
import { NgbTooltipConfig } from './tooltip-config';
/** @type {?} */
var nextId = 0;
var NgbTooltipWindow = /** @class */ (function () {
    function NgbTooltipWindow(_element, _renderer) {
        this._element = _element;
        this._renderer = _renderer;
        this.placement = 'top';
    }
    /**
     * @param {?} _placement
     * @return {?}
     */
    NgbTooltipWindow.prototype.applyPlacement = /**
     * @param {?} _placement
     * @return {?}
     */
    function (_placement) {
        // remove the current placement classes
        this._renderer.removeClass(this._element.nativeElement, 'bs-tooltip-' + this.placement.toString().split('-')[0]);
        this._renderer.removeClass(this._element.nativeElement, 'bs-tooltip-' + this.placement.toString());
        // set the new placement classes
        this.placement = _placement;
        // apply the new placement
        this._renderer.addClass(this._element.nativeElement, 'bs-tooltip-' + this.placement.toString().split('-')[0]);
        this._renderer.addClass(this._element.nativeElement, 'bs-tooltip-' + this.placement.toString());
    };
    /**
     * Tells whether the event has been triggered from this component's subtree or not.
     *
     * @param event the event to check
     *
     * @return whether the event has been triggered from this component's subtree or not.
     */
    /**
     * Tells whether the event has been triggered from this component's subtree or not.
     *
     * @param {?} event the event to check
     *
     * @return {?} whether the event has been triggered from this component's subtree or not.
     */
    NgbTooltipWindow.prototype.isEventFrom = /**
     * Tells whether the event has been triggered from this component's subtree or not.
     *
     * @param {?} event the event to check
     *
     * @return {?} whether the event has been triggered from this component's subtree or not.
     */
    function (event) { return this._element.nativeElement.contains(/** @type {?} */ (event.target)); };
    NgbTooltipWindow.decorators = [
        { type: Component, args: [{
                    selector: 'ngb-tooltip-window',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        '[class]': '"tooltip show bs-tooltip-" + placement.split("-")[0]+" bs-tooltip-" + placement + (tooltipClass ? " " + tooltipClass : "")',
                        'role': 'tooltip',
                        '[id]': 'id'
                    },
                    template: "<div class=\"arrow\"></div><div class=\"tooltip-inner\"><ng-content></ng-content></div>",
                    styles: ["\n    :host.bs-tooltip-top .arrow, :host.bs-tooltip-bottom .arrow {\n      left: calc(50% - 0.4rem);\n    }\n\n    :host.bs-tooltip-top-left .arrow, :host.bs-tooltip-bottom-left .arrow {\n      left: 1em;\n    }\n\n    :host.bs-tooltip-top-right .arrow, :host.bs-tooltip-bottom-right .arrow {\n      left: auto;\n      right: 0.8rem;\n    }\n\n    :host.bs-tooltip-left .arrow, :host.bs-tooltip-right .arrow {\n      top: calc(50% - 0.4rem);\n    }\n\n    :host.bs-tooltip-left-top .arrow, :host.bs-tooltip-right-top .arrow {\n      top: 0.4rem;\n    }\n\n    :host.bs-tooltip-left-bottom .arrow, :host.bs-tooltip-right-bottom .arrow {\n      top: auto;\n      bottom: 0.4rem;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    NgbTooltipWindow.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    NgbTooltipWindow.propDecorators = {
        placement: [{ type: Input }],
        id: [{ type: Input }],
        tooltipClass: [{ type: Input }]
    };
    return NgbTooltipWindow;
}());
export { NgbTooltipWindow };
if (false) {
    /** @type {?} */
    NgbTooltipWindow.prototype.placement;
    /** @type {?} */
    NgbTooltipWindow.prototype.id;
    /** @type {?} */
    NgbTooltipWindow.prototype.tooltipClass;
    /** @type {?} */
    NgbTooltipWindow.prototype._element;
    /** @type {?} */
    NgbTooltipWindow.prototype._renderer;
}
/**
 * A lightweight, extensible directive for fancy tooltip creation.
 */
var NgbTooltip = /** @class */ (function () {
    function NgbTooltip(_elementRef, _renderer, injector, componentFactoryResolver, viewContainerRef, config, _ngZone, _document) {
        var _this = this;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._ngZone = _ngZone;
        this._document = _document;
        /**
         * Emits an event when the tooltip is shown
         */
        this.shown = new EventEmitter();
        /**
         * Emits an event when the tooltip is hidden
         */
        this.hidden = new EventEmitter();
        this._ngbTooltipWindowId = "ngb-tooltip-" + nextId++;
        this.autoClose = config.autoClose;
        this.placement = config.placement;
        this.triggers = config.triggers;
        this.container = config.container;
        this.disableTooltip = config.disableTooltip;
        this.tooltipClass = config.tooltipClass;
        this._popupService = new PopupService(NgbTooltipWindow, injector, viewContainerRef, _renderer, componentFactoryResolver);
        this._zoneSubscription = _ngZone.onStable.subscribe(function () {
            if (_this._windowRef) {
                _this._windowRef.instance.applyPlacement(positionElements(_this._elementRef.nativeElement, _this._windowRef.location.nativeElement, _this.placement, _this.container === 'body'));
            }
        });
    }
    Object.defineProperty(NgbTooltip.prototype, "ngbTooltip", {
        get: /**
         * @return {?}
         */
        function () { return this._ngbTooltip; },
        /**
         * Content to be displayed as tooltip. If falsy, the tooltip won't open.
         */
        set: /**
         * Content to be displayed as tooltip. If falsy, the tooltip won't open.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._ngbTooltip = value;
            if (!value && this._windowRef) {
                this.close();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Opens an element’s tooltip. This is considered a “manual” triggering of the tooltip.
     * The context is an optional value to be injected into the tooltip template when it is created.
     */
    /**
     * Opens an element’s tooltip. This is considered a “manual” triggering of the tooltip.
     * The context is an optional value to be injected into the tooltip template when it is created.
     * @param {?=} context
     * @return {?}
     */
    NgbTooltip.prototype.open = /**
     * Opens an element’s tooltip. This is considered a “manual” triggering of the tooltip.
     * The context is an optional value to be injected into the tooltip template when it is created.
     * @param {?=} context
     * @return {?}
     */
    function (context) {
        var _this = this;
        if (!this._windowRef && this._ngbTooltip && !this.disableTooltip) {
            this._windowRef = this._popupService.open(this._ngbTooltip, context);
            this._windowRef.instance.tooltipClass = this.tooltipClass;
            this._windowRef.instance.id = this._ngbTooltipWindowId;
            this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-describedby', this._ngbTooltipWindowId);
            if (this.container === 'body') {
                this._document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
            }
            this._windowRef.instance.placement = Array.isArray(this.placement) ? this.placement[0] : this.placement;
            // apply styling to set basic css-classes on target element, before going for positioning
            this._windowRef.changeDetectorRef.detectChanges();
            this._windowRef.changeDetectorRef.markForCheck();
            // position tooltip along the element
            this._windowRef.instance.applyPlacement(positionElements(this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement, this.container === 'body'));
            if (this.autoClose) {
                this._ngZone.runOutsideAngular(function () {
                    /** @type {?} */
                    var justOpened = true;
                    requestAnimationFrame(function () { return justOpened = false; });
                    /** @type {?} */
                    var escapes$ = fromEvent(_this._document, 'keyup')
                        .pipe(takeUntil(_this.hidden), filter(function (event) { return event.which === Key.Escape; }));
                    /** @type {?} */
                    var clicks$ = fromEvent(_this._document, 'click')
                        .pipe(takeUntil(_this.hidden), filter(function () { return !justOpened; }), filter(function (event) { return _this._shouldCloseFromClick(event); }));
                    race([escapes$, clicks$]).subscribe(function () { return _this._ngZone.run(function () { return _this.close(); }); });
                });
            }
            this.shown.emit();
        }
    };
    /**
     * Closes an element’s tooltip. This is considered a “manual” triggering of the tooltip.
     */
    /**
     * Closes an element’s tooltip. This is considered a “manual” triggering of the tooltip.
     * @return {?}
     */
    NgbTooltip.prototype.close = /**
     * Closes an element’s tooltip. This is considered a “manual” triggering of the tooltip.
     * @return {?}
     */
    function () {
        if (this._windowRef != null) {
            this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-describedby');
            this._popupService.close();
            this._windowRef = null;
            this.hidden.emit();
        }
    };
    /**
     * Toggles an element’s tooltip. This is considered a “manual” triggering of the tooltip.
     */
    /**
     * Toggles an element’s tooltip. This is considered a “manual” triggering of the tooltip.
     * @return {?}
     */
    NgbTooltip.prototype.toggle = /**
     * Toggles an element’s tooltip. This is considered a “manual” triggering of the tooltip.
     * @return {?}
     */
    function () {
        if (this._windowRef) {
            this.close();
        }
        else {
            this.open();
        }
    };
    /**
     * Returns whether or not the tooltip is currently being shown
     */
    /**
     * Returns whether or not the tooltip is currently being shown
     * @return {?}
     */
    NgbTooltip.prototype.isOpen = /**
     * Returns whether or not the tooltip is currently being shown
     * @return {?}
     */
    function () { return this._windowRef != null; };
    /**
     * @return {?}
     */
    NgbTooltip.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._unregisterListenersFn = listenToTriggers(this._renderer, this._elementRef.nativeElement, this.triggers, this.open.bind(this), this.close.bind(this), this.toggle.bind(this));
    };
    /**
     * @return {?}
     */
    NgbTooltip.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.close();
        // This check is needed as it might happen that ngOnDestroy is called before ngOnInit
        // under certain conditions, see: https://github.com/ng-bootstrap/ng-bootstrap/issues/2199
        if (this._unregisterListenersFn) {
            this._unregisterListenersFn();
        }
        this._zoneSubscription.unsubscribe();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgbTooltip.prototype._shouldCloseFromClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.button !== 2) {
            if (this.autoClose === true) {
                return true;
            }
            else if (this.autoClose === 'inside' && this._isEventFromTooltip(event)) {
                return true;
            }
            else if (this.autoClose === 'outside' && !this._isEventFromTooltip(event)) {
                return true;
            }
        }
        return false;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgbTooltip.prototype._isEventFromTooltip = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var popup = this._windowRef.instance;
        return popup ? popup.isEventFrom(event) : false;
    };
    NgbTooltip.decorators = [
        { type: Directive, args: [{ selector: '[ngbTooltip]', exportAs: 'ngbTooltip' },] },
    ];
    /** @nocollapse */
    NgbTooltip.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: Injector },
        { type: ComponentFactoryResolver },
        { type: ViewContainerRef },
        { type: NgbTooltipConfig },
        { type: NgZone },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    NgbTooltip.propDecorators = {
        autoClose: [{ type: Input }],
        placement: [{ type: Input }],
        triggers: [{ type: Input }],
        container: [{ type: Input }],
        disableTooltip: [{ type: Input }],
        tooltipClass: [{ type: Input }],
        shown: [{ type: Output }],
        hidden: [{ type: Output }],
        ngbTooltip: [{ type: Input }]
    };
    return NgbTooltip;
}());
export { NgbTooltip };
if (false) {
    /**
     * Indicates whether the tooltip should be closed on Escape key and inside/outside clicks.
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
    NgbTooltip.prototype.autoClose;
    /**
     * Placement of a tooltip accepts:
     *    "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right",
     *    "left", "left-top", "left-bottom", "right", "right-top", "right-bottom"
     * and array of above values.
     * @type {?}
     */
    NgbTooltip.prototype.placement;
    /**
     * Specifies events that should trigger. Supports a space separated list of event names.
     * @type {?}
     */
    NgbTooltip.prototype.triggers;
    /**
     * A selector specifying the element the tooltip should be appended to.
     * Currently only supports "body".
     * @type {?}
     */
    NgbTooltip.prototype.container;
    /**
     * A flag indicating if a given tooltip is disabled and should not be displayed.
     *
     * \@since 1.1.0
     * @type {?}
     */
    NgbTooltip.prototype.disableTooltip;
    /**
     * An optional class applied to ngb-tooltip-window
     *
     * \@since 3.2.0
     * @type {?}
     */
    NgbTooltip.prototype.tooltipClass;
    /**
     * Emits an event when the tooltip is shown
     * @type {?}
     */
    NgbTooltip.prototype.shown;
    /**
     * Emits an event when the tooltip is hidden
     * @type {?}
     */
    NgbTooltip.prototype.hidden;
    /** @type {?} */
    NgbTooltip.prototype._ngbTooltip;
    /** @type {?} */
    NgbTooltip.prototype._ngbTooltipWindowId;
    /** @type {?} */
    NgbTooltip.prototype._popupService;
    /** @type {?} */
    NgbTooltip.prototype._windowRef;
    /** @type {?} */
    NgbTooltip.prototype._unregisterListenersFn;
    /** @type {?} */
    NgbTooltip.prototype._zoneSubscription;
    /** @type {?} */
    NgbTooltip.prototype._elementRef;
    /** @type {?} */
    NgbTooltip.prototype._renderer;
    /** @type {?} */
    NgbTooltip.prototype._ngZone;
    /** @type {?} */
    NgbTooltip.prototype._document;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsidG9vbHRpcC90b29sdGlwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWix1QkFBdUIsRUFHdkIsTUFBTSxFQUNOLFFBQVEsRUFDUixTQUFTLEVBRVQsVUFBVSxFQUVWLGdCQUFnQixFQUNoQix3QkFBd0IsRUFDeEIsTUFBTSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QyxPQUFPLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNyQyxPQUFPLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRWpELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxnQkFBZ0IsRUFBNEIsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFFaEMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7O0FBRWxELElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQzs7SUE2Q2IsMEJBQW9CLFFBQWlDLEVBQVUsU0FBb0I7UUFBL0QsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO3lCQUpuRCxLQUFLO0tBSWtEOzs7OztJQUV2Rix5Q0FBYzs7OztJQUFkLFVBQWUsVUFBcUI7O1FBRWxDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pILElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7O1FBR25HLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDOztRQUc1QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5RyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0tBQ2pHO0lBQ0Q7Ozs7OztPQU1HOzs7Ozs7OztJQUNILHNDQUFXOzs7Ozs7O0lBQVgsVUFBWSxLQUFZLElBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsbUJBQUMsS0FBSyxDQUFDLE1BQXFCLEVBQUMsQ0FBQyxFQUFFOztnQkFoRWpILFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsSUFBSSxFQUFFO3dCQUNKLFNBQVMsRUFDTCw0SEFBNEg7d0JBQ2hJLE1BQU0sRUFBRSxTQUFTO3dCQUNqQixNQUFNLEVBQUUsSUFBSTtxQkFDYjtvQkFDRCxRQUFRLEVBQUUseUZBQXFGO29CQUMvRixNQUFNLEVBQUUsQ0FBQyxpckJBMEJSLENBQUM7aUJBQ0g7Ozs7Z0JBekRDLFVBQVU7Z0JBRlYsU0FBUzs7OzRCQTZEUixLQUFLO3FCQUNMLEtBQUs7K0JBQ0wsS0FBSzs7MkJBMUVSOztTQXVFYSxnQkFBZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBMEYzQixvQkFDWSxhQUE4QyxTQUFvQixFQUFFLFFBQWtCLEVBQzlGLHdCQUFrRCxFQUFFLGdCQUFrQyxFQUFFLE1BQXdCLEVBQ3hHLFNBQTJDLFNBQWM7UUFIckUsaUJBcUJDO1FBcEJXLGdCQUFXLEdBQVgsV0FBVztRQUFtQyxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBRWxFLFlBQU8sR0FBUCxPQUFPO1FBQW9DLGNBQVMsR0FBVCxTQUFTLENBQUs7Ozs7cUJBaEJuRCxJQUFJLFlBQVksRUFBRTs7OztzQkFJakIsSUFBSSxZQUFZLEVBQUU7bUNBR1AsaUJBQWUsTUFBTSxFQUFJO1FBVXJELElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNsQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNsQyxJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUM7UUFDNUMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxZQUFZLENBQ2pDLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztRQUV2RixJQUFJLENBQUMsaUJBQWlCLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7WUFDbEQsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLEtBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FDbkMsZ0JBQWdCLENBQ1osS0FBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsS0FBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLEtBQUksQ0FBQyxTQUFTLEVBQ3RGLEtBQUksQ0FBQyxTQUFTLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQzthQUNyQztTQUNGLENBQUMsQ0FBQztLQUNKO0lBS0Qsc0JBQ0ksa0NBQVU7Ozs7UUFPZCxjQUFtQixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBWDdDOztXQUVHOzs7Ozs7UUFDSCxVQUNlLEtBQWdDO1lBQzdDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDZDtTQUNGOzs7T0FBQTtJQUlEOzs7T0FHRzs7Ozs7OztJQUNILHlCQUFJOzs7Ozs7SUFBSixVQUFLLE9BQWE7UUFBbEIsaUJBK0NDO1FBOUNDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDakUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQzFELElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUM7WUFFdkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFFMUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ2xHO1lBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDOztZQUd4RyxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ2xELElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7O1lBR2pELElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FDbkMsZ0JBQWdCLENBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQ3RGLElBQUksQ0FBQyxTQUFTLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztZQUVwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQzs7b0JBSzdCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQztvQkFDdEIscUJBQXFCLENBQUMsY0FBTSxPQUFBLFVBQVUsR0FBRyxLQUFLLEVBQWxCLENBQWtCLENBQUMsQ0FBQzs7b0JBRWhELElBQU0sUUFBUSxHQUFHLFNBQVMsQ0FBZ0IsS0FBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUM7eUJBQzVDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxLQUFLLEtBQUssR0FBRyxDQUFDLE1BQU0sRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDLENBQUM7O29CQUVoRyxJQUFNLE9BQU8sR0FBRyxTQUFTLENBQWEsS0FBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUM7eUJBQ3pDLElBQUksQ0FDRCxTQUFTLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxjQUFNLE9BQUEsQ0FBQyxVQUFVLEVBQVgsQ0FBVyxDQUFDLEVBQ2pELE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsRUFBakMsQ0FBaUMsQ0FBQyxDQUFDLENBQUM7b0JBRTVFLElBQUksQ0FBUSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxLQUFLLEVBQUUsRUFBWixDQUFZLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQyxDQUFDO2lCQUN4RixDQUFDLENBQUM7YUFDSjtZQUVELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDbkI7S0FDRjtJQUVEOztPQUVHOzs7OztJQUNILDBCQUFLOzs7O0lBQUw7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztZQUNuRixJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDcEI7S0FDRjtJQUVEOztPQUVHOzs7OztJQUNILDJCQUFNOzs7O0lBQU47UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDZDtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2I7S0FDRjtJQUVEOztPQUVHOzs7OztJQUNILDJCQUFNOzs7O0lBQU4sY0FBb0IsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLEVBQUU7Ozs7SUFFckQsNkJBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLHNCQUFzQixHQUFHLGdCQUFnQixDQUMxQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQzFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDN0I7Ozs7SUFFRCxnQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7OztRQUdiLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7U0FDL0I7UUFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDdEM7Ozs7O0lBRU8sMENBQXFCOzs7O2NBQUMsS0FBaUI7UUFDN0MsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQzthQUNiO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFFLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDYjtZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVFLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDYjtTQUNGO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQzs7Ozs7O0lBR1Asd0NBQW1COzs7O2NBQUMsS0FBaUI7O1FBQzNDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQzs7O2dCQTlNbkQsU0FBUyxTQUFDLEVBQUMsUUFBUSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFDOzs7O2dCQTFGM0QsVUFBVTtnQkFGVixTQUFTO2dCQURULFFBQVE7Z0JBTVIsd0JBQXdCO2dCQUR4QixnQkFBZ0I7Z0JBY1YsZ0JBQWdCO2dCQVp0QixNQUFNO2dEQW1Kd0IsTUFBTSxTQUFDLFFBQVE7Ozs0QkFoRDVDLEtBQUs7NEJBT0wsS0FBSzsyQkFJTCxLQUFLOzRCQUtMLEtBQUs7aUNBTUwsS0FBSzsrQkFNTCxLQUFLO3dCQUlMLE1BQU07eUJBSU4sTUFBTTs2QkFtQ04sS0FBSzs7cUJBM0xSOztTQXdHYSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgRGlyZWN0aXZlLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBJbmplY3QsXHJcbiAgSW5qZWN0b3IsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIENvbXBvbmVudFJlZixcclxuICBFbGVtZW50UmVmLFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIFZpZXdDb250YWluZXJSZWYsXHJcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gIE5nWm9uZVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHtmcm9tRXZlbnQsIHJhY2V9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge2ZpbHRlciwgdGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQge2xpc3RlblRvVHJpZ2dlcnN9IGZyb20gJy4uL3V0aWwvdHJpZ2dlcnMnO1xyXG5pbXBvcnQge3Bvc2l0aW9uRWxlbWVudHMsIFBsYWNlbWVudCwgUGxhY2VtZW50QXJyYXl9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmcnO1xyXG5pbXBvcnQge1BvcHVwU2VydmljZX0gZnJvbSAnLi4vdXRpbC9wb3B1cCc7XHJcbmltcG9ydCB7S2V5fSBmcm9tICcuLi91dGlsL2tleSc7XHJcblxyXG5pbXBvcnQge05nYlRvb2x0aXBDb25maWd9IGZyb20gJy4vdG9vbHRpcC1jb25maWcnO1xyXG5cclxubGV0IG5leHRJZCA9IDA7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25nYi10b29sdGlwLXdpbmRvdycsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgaG9zdDoge1xyXG4gICAgJ1tjbGFzc10nOlxyXG4gICAgICAgICdcInRvb2x0aXAgc2hvdyBicy10b29sdGlwLVwiICsgcGxhY2VtZW50LnNwbGl0KFwiLVwiKVswXStcIiBicy10b29sdGlwLVwiICsgcGxhY2VtZW50ICsgKHRvb2x0aXBDbGFzcyA/IFwiIFwiICsgdG9vbHRpcENsYXNzIDogXCJcIiknLFxyXG4gICAgJ3JvbGUnOiAndG9vbHRpcCcsXHJcbiAgICAnW2lkXSc6ICdpZCdcclxuICB9LFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImFycm93XCI+PC9kaXY+PGRpdiBjbGFzcz1cInRvb2x0aXAtaW5uZXJcIj48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9kaXY+YCxcclxuICBzdHlsZXM6IFtgXHJcbiAgICA6aG9zdC5icy10b29sdGlwLXRvcCAuYXJyb3csIDpob3N0LmJzLXRvb2x0aXAtYm90dG9tIC5hcnJvdyB7XHJcbiAgICAgIGxlZnQ6IGNhbGMoNTAlIC0gMC40cmVtKTtcclxuICAgIH1cclxuXHJcbiAgICA6aG9zdC5icy10b29sdGlwLXRvcC1sZWZ0IC5hcnJvdywgOmhvc3QuYnMtdG9vbHRpcC1ib3R0b20tbGVmdCAuYXJyb3cge1xyXG4gICAgICBsZWZ0OiAxZW07XHJcbiAgICB9XHJcblxyXG4gICAgOmhvc3QuYnMtdG9vbHRpcC10b3AtcmlnaHQgLmFycm93LCA6aG9zdC5icy10b29sdGlwLWJvdHRvbS1yaWdodCAuYXJyb3cge1xyXG4gICAgICBsZWZ0OiBhdXRvO1xyXG4gICAgICByaWdodDogMC44cmVtO1xyXG4gICAgfVxyXG5cclxuICAgIDpob3N0LmJzLXRvb2x0aXAtbGVmdCAuYXJyb3csIDpob3N0LmJzLXRvb2x0aXAtcmlnaHQgLmFycm93IHtcclxuICAgICAgdG9wOiBjYWxjKDUwJSAtIDAuNHJlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgOmhvc3QuYnMtdG9vbHRpcC1sZWZ0LXRvcCAuYXJyb3csIDpob3N0LmJzLXRvb2x0aXAtcmlnaHQtdG9wIC5hcnJvdyB7XHJcbiAgICAgIHRvcDogMC40cmVtO1xyXG4gICAgfVxyXG5cclxuICAgIDpob3N0LmJzLXRvb2x0aXAtbGVmdC1ib3R0b20gLmFycm93LCA6aG9zdC5icy10b29sdGlwLXJpZ2h0LWJvdHRvbSAuYXJyb3cge1xyXG4gICAgICB0b3A6IGF1dG87XHJcbiAgICAgIGJvdHRvbTogMC40cmVtO1xyXG4gICAgfVxyXG4gIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JUb29sdGlwV2luZG93IHtcclxuICBASW5wdXQoKSBwbGFjZW1lbnQ6IFBsYWNlbWVudCA9ICd0b3AnO1xyXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgdG9vbHRpcENsYXNzOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxyXG5cclxuICBhcHBseVBsYWNlbWVudChfcGxhY2VtZW50OiBQbGFjZW1lbnQpIHtcclxuICAgIC8vIHJlbW92ZSB0aGUgY3VycmVudCBwbGFjZW1lbnQgY2xhc3Nlc1xyXG4gICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnYnMtdG9vbHRpcC0nICsgdGhpcy5wbGFjZW1lbnQudG9TdHJpbmcoKS5zcGxpdCgnLScpWzBdKTtcclxuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2JzLXRvb2x0aXAtJyArIHRoaXMucGxhY2VtZW50LnRvU3RyaW5nKCkpO1xyXG5cclxuICAgIC8vIHNldCB0aGUgbmV3IHBsYWNlbWVudCBjbGFzc2VzXHJcbiAgICB0aGlzLnBsYWNlbWVudCA9IF9wbGFjZW1lbnQ7XHJcblxyXG4gICAgLy8gYXBwbHkgdGhlIG5ldyBwbGFjZW1lbnRcclxuICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2JzLXRvb2x0aXAtJyArIHRoaXMucGxhY2VtZW50LnRvU3RyaW5nKCkuc3BsaXQoJy0nKVswXSk7XHJcbiAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdicy10b29sdGlwLScgKyB0aGlzLnBsYWNlbWVudC50b1N0cmluZygpKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogVGVsbHMgd2hldGhlciB0aGUgZXZlbnQgaGFzIGJlZW4gdHJpZ2dlcmVkIGZyb20gdGhpcyBjb21wb25lbnQncyBzdWJ0cmVlIG9yIG5vdC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBldmVudCB0aGUgZXZlbnQgdG8gY2hlY2tcclxuICAgKlxyXG4gICAqIEByZXR1cm4gd2hldGhlciB0aGUgZXZlbnQgaGFzIGJlZW4gdHJpZ2dlcmVkIGZyb20gdGhpcyBjb21wb25lbnQncyBzdWJ0cmVlIG9yIG5vdC5cclxuICAgKi9cclxuICBpc0V2ZW50RnJvbShldmVudDogRXZlbnQpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpOyB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIGxpZ2h0d2VpZ2h0LCBleHRlbnNpYmxlIGRpcmVjdGl2ZSBmb3IgZmFuY3kgdG9vbHRpcCBjcmVhdGlvbi5cclxuICovXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25nYlRvb2x0aXBdJywgZXhwb3J0QXM6ICduZ2JUb29sdGlwJ30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JUb29sdGlwIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSB0b29sdGlwIHNob3VsZCBiZSBjbG9zZWQgb24gRXNjYXBlIGtleSBhbmQgaW5zaWRlL291dHNpZGUgY2xpY2tzLlxyXG4gICAqXHJcbiAgICogLSB0cnVlIChkZWZhdWx0KTogY2xvc2VzIG9uIGJvdGggb3V0c2lkZSBhbmQgaW5zaWRlIGNsaWNrcyBhcyB3ZWxsIGFzIEVzY2FwZSBwcmVzc2VzXHJcbiAgICogLSBmYWxzZTogZGlzYWJsZXMgdGhlIGF1dG9DbG9zZSBmZWF0dXJlIChOQjogdHJpZ2dlcnMgc3RpbGwgYXBwbHkpXHJcbiAgICogLSAnaW5zaWRlJzogY2xvc2VzIG9uIGluc2lkZSBjbGlja3MgYXMgd2VsbCBhcyBFc2NhcGUgcHJlc3Nlc1xyXG4gICAqIC0gJ291dHNpZGUnOiBjbG9zZXMgb24gb3V0c2lkZSBjbGlja3MgKHNvbWV0aW1lcyBhbHNvIGFjaGlldmFibGUgdGhyb3VnaCB0cmlnZ2VycylcclxuICAgKiBhcyB3ZWxsIGFzIEVzY2FwZSBwcmVzc2VzXHJcbiAgICpcclxuICAgKiBAc2luY2UgMy4wLjBcclxuICAgKi9cclxuICBASW5wdXQoKSBhdXRvQ2xvc2U6IGJvb2xlYW4gfCAnaW5zaWRlJyB8ICdvdXRzaWRlJztcclxuICAvKipcclxuICAgICogUGxhY2VtZW50IG9mIGEgdG9vbHRpcCBhY2NlcHRzOlxyXG4gICAgKiAgICBcInRvcFwiLCBcInRvcC1sZWZ0XCIsIFwidG9wLXJpZ2h0XCIsIFwiYm90dG9tXCIsIFwiYm90dG9tLWxlZnRcIiwgXCJib3R0b20tcmlnaHRcIixcclxuICAgICogICAgXCJsZWZ0XCIsIFwibGVmdC10b3BcIiwgXCJsZWZ0LWJvdHRvbVwiLCBcInJpZ2h0XCIsIFwicmlnaHQtdG9wXCIsIFwicmlnaHQtYm90dG9tXCJcclxuICAgICogYW5kIGFycmF5IG9mIGFib3ZlIHZhbHVlcy5cclxuICAgICovXHJcbiAgQElucHV0KCkgcGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheTtcclxuICAvKipcclxuICAgKiBTcGVjaWZpZXMgZXZlbnRzIHRoYXQgc2hvdWxkIHRyaWdnZXIuIFN1cHBvcnRzIGEgc3BhY2Ugc2VwYXJhdGVkIGxpc3Qgb2YgZXZlbnQgbmFtZXMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgdHJpZ2dlcnM6IHN0cmluZztcclxuICAvKipcclxuICAgKiBBIHNlbGVjdG9yIHNwZWNpZnlpbmcgdGhlIGVsZW1lbnQgdGhlIHRvb2x0aXAgc2hvdWxkIGJlIGFwcGVuZGVkIHRvLlxyXG4gICAqIEN1cnJlbnRseSBvbmx5IHN1cHBvcnRzIFwiYm9keVwiLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNvbnRhaW5lcjogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGlmIGEgZ2l2ZW4gdG9vbHRpcCBpcyBkaXNhYmxlZCBhbmQgc2hvdWxkIG5vdCBiZSBkaXNwbGF5ZWQuXHJcbiAgICpcclxuICAgKiBAc2luY2UgMS4xLjBcclxuICAgKi9cclxuICBASW5wdXQoKSBkaXNhYmxlVG9vbHRpcDogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBBbiBvcHRpb25hbCBjbGFzcyBhcHBsaWVkIHRvIG5nYi10b29sdGlwLXdpbmRvd1xyXG4gICAqXHJcbiAgICogQHNpbmNlIDMuMi4wXHJcbiAgICovXHJcbiAgQElucHV0KCkgdG9vbHRpcENsYXNzOiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiB0aGUgdG9vbHRpcCBpcyBzaG93blxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzaG93biA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAvKipcclxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIHRoZSB0b29sdGlwIGlzIGhpZGRlblxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBoaWRkZW4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIHByaXZhdGUgX25nYlRvb2x0aXA6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgcHJpdmF0ZSBfbmdiVG9vbHRpcFdpbmRvd0lkID0gYG5nYi10b29sdGlwLSR7bmV4dElkKyt9YDtcclxuICBwcml2YXRlIF9wb3B1cFNlcnZpY2U6IFBvcHVwU2VydmljZTxOZ2JUb29sdGlwV2luZG93PjtcclxuICBwcml2YXRlIF93aW5kb3dSZWY6IENvbXBvbmVudFJlZjxOZ2JUb29sdGlwV2luZG93PjtcclxuICBwcml2YXRlIF91bnJlZ2lzdGVyTGlzdGVuZXJzRm47XHJcbiAgcHJpdmF0ZSBfem9uZVN1YnNjcmlwdGlvbjogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsIGluamVjdG9yOiBJbmplY3RvcixcclxuICAgICAgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsIGNvbmZpZzogTmdiVG9vbHRpcENvbmZpZyxcclxuICAgICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnkpIHtcclxuICAgIHRoaXMuYXV0b0Nsb3NlID0gY29uZmlnLmF1dG9DbG9zZTtcclxuICAgIHRoaXMucGxhY2VtZW50ID0gY29uZmlnLnBsYWNlbWVudDtcclxuICAgIHRoaXMudHJpZ2dlcnMgPSBjb25maWcudHJpZ2dlcnM7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbmZpZy5jb250YWluZXI7XHJcbiAgICB0aGlzLmRpc2FibGVUb29sdGlwID0gY29uZmlnLmRpc2FibGVUb29sdGlwO1xyXG4gICAgdGhpcy50b29sdGlwQ2xhc3MgPSBjb25maWcudG9vbHRpcENsYXNzO1xyXG4gICAgdGhpcy5fcG9wdXBTZXJ2aWNlID0gbmV3IFBvcHVwU2VydmljZTxOZ2JUb29sdGlwV2luZG93PihcclxuICAgICAgICBOZ2JUb29sdGlwV2luZG93LCBpbmplY3Rvciwgdmlld0NvbnRhaW5lclJlZiwgX3JlbmRlcmVyLCBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpO1xyXG5cclxuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24gPSBfbmdab25lLm9uU3RhYmxlLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLl93aW5kb3dSZWYpIHtcclxuICAgICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuYXBwbHlQbGFjZW1lbnQoXHJcbiAgICAgICAgICAgIHBvc2l0aW9uRWxlbWVudHMoXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX3dpbmRvd1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LCB0aGlzLnBsYWNlbWVudCxcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID09PSAnYm9keScpKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb250ZW50IHRvIGJlIGRpc3BsYXllZCBhcyB0b29sdGlwLiBJZiBmYWxzeSwgdGhlIHRvb2x0aXAgd29uJ3Qgb3Blbi5cclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCBuZ2JUb29sdGlwKHZhbHVlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+KSB7XHJcbiAgICB0aGlzLl9uZ2JUb29sdGlwID0gdmFsdWU7XHJcbiAgICBpZiAoIXZhbHVlICYmIHRoaXMuX3dpbmRvd1JlZikge1xyXG4gICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXQgbmdiVG9vbHRpcCgpIHsgcmV0dXJuIHRoaXMuX25nYlRvb2x0aXA7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogT3BlbnMgYW4gZWxlbWVudOKAmXMgdG9vbHRpcC4gVGhpcyBpcyBjb25zaWRlcmVkIGEg4oCcbWFudWFs4oCdIHRyaWdnZXJpbmcgb2YgdGhlIHRvb2x0aXAuXHJcbiAgICogVGhlIGNvbnRleHQgaXMgYW4gb3B0aW9uYWwgdmFsdWUgdG8gYmUgaW5qZWN0ZWQgaW50byB0aGUgdG9vbHRpcCB0ZW1wbGF0ZSB3aGVuIGl0IGlzIGNyZWF0ZWQuXHJcbiAgICovXHJcbiAgb3Blbihjb250ZXh0PzogYW55KSB7XHJcbiAgICBpZiAoIXRoaXMuX3dpbmRvd1JlZiAmJiB0aGlzLl9uZ2JUb29sdGlwICYmICF0aGlzLmRpc2FibGVUb29sdGlwKSB7XHJcbiAgICAgIHRoaXMuX3dpbmRvd1JlZiA9IHRoaXMuX3BvcHVwU2VydmljZS5vcGVuKHRoaXMuX25nYlRvb2x0aXAsIGNvbnRleHQpO1xyXG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UudG9vbHRpcENsYXNzID0gdGhpcy50b29sdGlwQ2xhc3M7XHJcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5pZCA9IHRoaXMuX25nYlRvb2x0aXBXaW5kb3dJZDtcclxuXHJcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdhcmlhLWRlc2NyaWJlZGJ5JywgdGhpcy5fbmdiVG9vbHRpcFdpbmRvd0lkKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknKSB7XHJcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmNvbnRhaW5lcikuYXBwZW5kQ2hpbGQodGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UucGxhY2VtZW50ID0gQXJyYXkuaXNBcnJheSh0aGlzLnBsYWNlbWVudCkgPyB0aGlzLnBsYWNlbWVudFswXSA6IHRoaXMucGxhY2VtZW50O1xyXG5cclxuICAgICAgLy8gYXBwbHkgc3R5bGluZyB0byBzZXQgYmFzaWMgY3NzLWNsYXNzZXMgb24gdGFyZ2V0IGVsZW1lbnQsIGJlZm9yZSBnb2luZyBmb3IgcG9zaXRpb25pbmdcclxuICAgICAgdGhpcy5fd2luZG93UmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgdGhpcy5fd2luZG93UmVmLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xyXG5cclxuICAgICAgLy8gcG9zaXRpb24gdG9vbHRpcCBhbG9uZyB0aGUgZWxlbWVudFxyXG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuYXBwbHlQbGFjZW1lbnQoXHJcbiAgICAgICAgICBwb3NpdGlvbkVsZW1lbnRzKFxyXG4gICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsIHRoaXMucGxhY2VtZW50LFxyXG4gICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID09PSAnYm9keScpKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLmF1dG9DbG9zZSkge1xyXG4gICAgICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAvLyBwcmV2ZW50cyBhdXRvbWF0aWMgY2xvc2luZyByaWdodCBhZnRlciBhbiBvcGVuaW5nIGJ5IHB1dHRpbmcgYSBndWFyZCBmb3IgdGhlIHRpbWUgb2Ygb25lIGV2ZW50IGhhbmRsaW5nXHJcbiAgICAgICAgICAvLyBwYXNzXHJcbiAgICAgICAgICAvLyB1c2UgY2FzZTogY2xpY2sgZXZlbnQgd291bGQgcmVhY2ggYW4gZWxlbWVudCBvcGVuaW5nIHRoZSB0b29sdGlwIGZpcnN0LCB0aGVuIHJlYWNoIHRoZSBhdXRvQ2xvc2UgaGFuZGxlclxyXG4gICAgICAgICAgLy8gd2hpY2ggd291bGQgY2xvc2UgaXRcclxuICAgICAgICAgIGxldCBqdXN0T3BlbmVkID0gdHJ1ZTtcclxuICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBqdXN0T3BlbmVkID0gZmFsc2UpO1xyXG5cclxuICAgICAgICAgIGNvbnN0IGVzY2FwZXMkID0gZnJvbUV2ZW50PEtleWJvYXJkRXZlbnQ+KHRoaXMuX2RvY3VtZW50LCAna2V5dXAnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuaGlkZGVuKSwgZmlsdGVyKGV2ZW50ID0+IGV2ZW50LndoaWNoID09PSBLZXkuRXNjYXBlKSk7XHJcblxyXG4gICAgICAgICAgY29uc3QgY2xpY2tzJCA9IGZyb21FdmVudDxNb3VzZUV2ZW50Pih0aGlzLl9kb2N1bWVudCwgJ2NsaWNrJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWtlVW50aWwodGhpcy5oaWRkZW4pLCBmaWx0ZXIoKCkgPT4gIWp1c3RPcGVuZWQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyKGV2ZW50ID0+IHRoaXMuX3Nob3VsZENsb3NlRnJvbUNsaWNrKGV2ZW50KSkpO1xyXG5cclxuICAgICAgICAgIHJhY2U8RXZlbnQ+KFtlc2NhcGVzJCwgY2xpY2tzJF0pLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHRoaXMuY2xvc2UoKSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnNob3duLmVtaXQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsb3NlcyBhbiBlbGVtZW504oCZcyB0b29sdGlwLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSDigJxtYW51YWzigJ0gdHJpZ2dlcmluZyBvZiB0aGUgdG9vbHRpcC5cclxuICAgKi9cclxuICBjbG9zZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl93aW5kb3dSZWYgIT0gbnVsbCkge1xyXG4gICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVBdHRyaWJ1dGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYXJpYS1kZXNjcmliZWRieScpO1xyXG4gICAgICB0aGlzLl9wb3B1cFNlcnZpY2UuY2xvc2UoKTtcclxuICAgICAgdGhpcy5fd2luZG93UmVmID0gbnVsbDtcclxuICAgICAgdGhpcy5oaWRkZW4uZW1pdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVG9nZ2xlcyBhbiBlbGVtZW504oCZcyB0b29sdGlwLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSDigJxtYW51YWzigJ0gdHJpZ2dlcmluZyBvZiB0aGUgdG9vbHRpcC5cclxuICAgKi9cclxuICB0b2dnbGUoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fd2luZG93UmVmKSB7XHJcbiAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub3BlbigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgdG9vbHRpcCBpcyBjdXJyZW50bHkgYmVpbmcgc2hvd25cclxuICAgKi9cclxuICBpc09wZW4oKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl93aW5kb3dSZWYgIT0gbnVsbDsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuX3VucmVnaXN0ZXJMaXN0ZW5lcnNGbiA9IGxpc3RlblRvVHJpZ2dlcnMoXHJcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIsIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy50cmlnZ2VycywgdGhpcy5vcGVuLmJpbmQodGhpcyksIHRoaXMuY2xvc2UuYmluZCh0aGlzKSxcclxuICAgICAgICB0aGlzLnRvZ2dsZS5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgLy8gVGhpcyBjaGVjayBpcyBuZWVkZWQgYXMgaXQgbWlnaHQgaGFwcGVuIHRoYXQgbmdPbkRlc3Ryb3kgaXMgY2FsbGVkIGJlZm9yZSBuZ09uSW5pdFxyXG4gICAgLy8gdW5kZXIgY2VydGFpbiBjb25kaXRpb25zLCBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9uZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2lzc3Vlcy8yMTk5XHJcbiAgICBpZiAodGhpcy5fdW5yZWdpc3Rlckxpc3RlbmVyc0ZuKSB7XHJcbiAgICAgIHRoaXMuX3VucmVnaXN0ZXJMaXN0ZW5lcnNGbigpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fem9uZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc2hvdWxkQ2xvc2VGcm9tQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIGlmIChldmVudC5idXR0b24gIT09IDIpIHtcclxuICAgICAgaWYgKHRoaXMuYXV0b0Nsb3NlID09PSB0cnVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5hdXRvQ2xvc2UgPT09ICdpbnNpZGUnICYmIHRoaXMuX2lzRXZlbnRGcm9tVG9vbHRpcChldmVudCkpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmF1dG9DbG9zZSA9PT0gJ291dHNpZGUnICYmICF0aGlzLl9pc0V2ZW50RnJvbVRvb2x0aXAoZXZlbnQpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2lzRXZlbnRGcm9tVG9vbHRpcChldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgY29uc3QgcG9wdXAgPSB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2U7XHJcbiAgICByZXR1cm4gcG9wdXAgPyBwb3B1cC5pc0V2ZW50RnJvbShldmVudCkgOiBmYWxzZTtcclxuICB9XHJcbn1cclxuIl19