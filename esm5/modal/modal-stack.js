/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { DOCUMENT } from '@angular/common';
import { ApplicationRef, Inject, Injectable, Injector, RendererFactory2, TemplateRef, } from '@angular/core';
import { Subject } from 'rxjs';
import { ngbFocusTrap } from '../util/focus-trap';
import { ContentRef } from '../util/popup';
import { ScrollBar } from '../util/scrollbar';
import { isDefined, isString } from '../util/util';
import { NgbModalBackdrop } from './modal-backdrop';
import { NgbActiveModal, NgbModalRef } from './modal-ref';
import { NgbModalWindow } from './modal-window';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../util/scrollbar";
var NgbModalStack = /** @class */ (function () {
    function NgbModalStack(_applicationRef, _injector, _document, _scrollBar, _rendererFactory) {
        var _this = this;
        this._applicationRef = _applicationRef;
        this._injector = _injector;
        this._document = _document;
        this._scrollBar = _scrollBar;
        this._rendererFactory = _rendererFactory;
        this._windowAttributes = ['ariaLabelledBy', 'backdrop', 'centered', 'keyboard', 'size', 'windowClass'];
        this._backdropAttributes = ['backdropClass'];
        this._modalRefs = [];
        this._windowCmpts = [];
        this._activeWindowCmptHasChanged = new Subject();
        // Trap focus on active WindowCmpt
        this._activeWindowCmptHasChanged.subscribe(function () {
            if (_this._windowCmpts.length) {
                /** @type {?} */
                var activeWindowCmpt = _this._windowCmpts[_this._windowCmpts.length - 1];
                ngbFocusTrap(activeWindowCmpt.location.nativeElement, _this._activeWindowCmptHasChanged);
            }
        });
    }
    /**
     * @param {?} moduleCFR
     * @param {?} contentInjector
     * @param {?} content
     * @param {?} options
     * @return {?}
     */
    NgbModalStack.prototype.open = /**
     * @param {?} moduleCFR
     * @param {?} contentInjector
     * @param {?} content
     * @param {?} options
     * @return {?}
     */
    function (moduleCFR, contentInjector, content, options) {
        var _this = this;
        /** @type {?} */
        var containerEl = isDefined(options.container) ? this._document.querySelector(options.container) : this._document.body;
        /** @type {?} */
        var renderer = this._rendererFactory.createRenderer(null, null);
        /** @type {?} */
        var revertPaddingForScrollBar = this._scrollBar.compensate();
        /** @type {?} */
        var removeBodyClass = function () {
            if (!_this._modalRefs.length) {
                renderer.removeClass(_this._document.body, 'modal-open');
            }
        };
        if (!containerEl) {
            throw new Error("The specified modal container \"" + (options.container || 'body') + "\" was not found in the DOM.");
        }
        /** @type {?} */
        var activeModal = new NgbActiveModal();
        /** @type {?} */
        var contentRef = this._getContentRef(moduleCFR, options.injector || contentInjector, content, activeModal);
        /** @type {?} */
        var backdropCmptRef = options.backdrop !== false ? this._attachBackdrop(moduleCFR, containerEl) : null;
        /** @type {?} */
        var windowCmptRef = this._attachWindowComponent(moduleCFR, containerEl, contentRef);
        /** @type {?} */
        var ngbModalRef = new NgbModalRef(windowCmptRef, contentRef, backdropCmptRef, options.beforeDismiss);
        this._registerModalRef(ngbModalRef);
        this._registerWindowCmpt(windowCmptRef);
        ngbModalRef.result.then(revertPaddingForScrollBar, revertPaddingForScrollBar);
        ngbModalRef.result.then(removeBodyClass, removeBodyClass);
        activeModal.close = function (result) { ngbModalRef.close(result); };
        activeModal.dismiss = function (reason) { ngbModalRef.dismiss(reason); };
        this._applyWindowOptions(windowCmptRef.instance, options);
        if (this._modalRefs.length === 1) {
            renderer.addClass(this._document.body, 'modal-open');
        }
        if (backdropCmptRef && backdropCmptRef.instance) {
            this._applyBackdropOptions(backdropCmptRef.instance, options);
        }
        return ngbModalRef;
    };
    /**
     * @param {?=} reason
     * @return {?}
     */
    NgbModalStack.prototype.dismissAll = /**
     * @param {?=} reason
     * @return {?}
     */
    function (reason) { this._modalRefs.forEach(function (ngbModalRef) { return ngbModalRef.dismiss(reason); }); };
    /**
     * @param {?} moduleCFR
     * @param {?} containerEl
     * @return {?}
     */
    NgbModalStack.prototype._attachBackdrop = /**
     * @param {?} moduleCFR
     * @param {?} containerEl
     * @return {?}
     */
    function (moduleCFR, containerEl) {
        /** @type {?} */
        var backdropFactory = moduleCFR.resolveComponentFactory(NgbModalBackdrop);
        /** @type {?} */
        var backdropCmptRef = backdropFactory.create(this._injector);
        this._applicationRef.attachView(backdropCmptRef.hostView);
        containerEl.appendChild(backdropCmptRef.location.nativeElement);
        return backdropCmptRef;
    };
    /**
     * @param {?} moduleCFR
     * @param {?} containerEl
     * @param {?} contentRef
     * @return {?}
     */
    NgbModalStack.prototype._attachWindowComponent = /**
     * @param {?} moduleCFR
     * @param {?} containerEl
     * @param {?} contentRef
     * @return {?}
     */
    function (moduleCFR, containerEl, contentRef) {
        /** @type {?} */
        var windowFactory = moduleCFR.resolveComponentFactory(NgbModalWindow);
        /** @type {?} */
        var windowCmptRef = windowFactory.create(this._injector, contentRef.nodes);
        this._applicationRef.attachView(windowCmptRef.hostView);
        containerEl.appendChild(windowCmptRef.location.nativeElement);
        return windowCmptRef;
    };
    /**
     * @param {?} windowInstance
     * @param {?} options
     * @return {?}
     */
    NgbModalStack.prototype._applyWindowOptions = /**
     * @param {?} windowInstance
     * @param {?} options
     * @return {?}
     */
    function (windowInstance, options) {
        this._windowAttributes.forEach(function (optionName) {
            if (isDefined(options[optionName])) {
                windowInstance[optionName] = options[optionName];
            }
        });
    };
    /**
     * @param {?} backdropInstance
     * @param {?} options
     * @return {?}
     */
    NgbModalStack.prototype._applyBackdropOptions = /**
     * @param {?} backdropInstance
     * @param {?} options
     * @return {?}
     */
    function (backdropInstance, options) {
        this._backdropAttributes.forEach(function (optionName) {
            if (isDefined(options[optionName])) {
                backdropInstance[optionName] = options[optionName];
            }
        });
    };
    /**
     * @param {?} moduleCFR
     * @param {?} contentInjector
     * @param {?} content
     * @param {?} activeModal
     * @return {?}
     */
    NgbModalStack.prototype._getContentRef = /**
     * @param {?} moduleCFR
     * @param {?} contentInjector
     * @param {?} content
     * @param {?} activeModal
     * @return {?}
     */
    function (moduleCFR, contentInjector, content, activeModal) {
        if (!content) {
            return new ContentRef([]);
        }
        else if (content instanceof TemplateRef) {
            return this._createFromTemplateRef(content, activeModal);
        }
        else if (isString(content)) {
            return this._createFromString(content);
        }
        else {
            return this._createFromComponent(moduleCFR, contentInjector, content, activeModal);
        }
    };
    /**
     * @param {?} content
     * @param {?} activeModal
     * @return {?}
     */
    NgbModalStack.prototype._createFromTemplateRef = /**
     * @param {?} content
     * @param {?} activeModal
     * @return {?}
     */
    function (content, activeModal) {
        /** @type {?} */
        var context = {
            $implicit: activeModal,
            close: /**
             * @param {?} result
             * @return {?}
             */
            function (result) { activeModal.close(result); },
            dismiss: /**
             * @param {?} reason
             * @return {?}
             */
            function (reason) { activeModal.dismiss(reason); }
        };
        /** @type {?} */
        var viewRef = content.createEmbeddedView(context);
        this._applicationRef.attachView(viewRef);
        return new ContentRef([viewRef.rootNodes], viewRef);
    };
    /**
     * @param {?} content
     * @return {?}
     */
    NgbModalStack.prototype._createFromString = /**
     * @param {?} content
     * @return {?}
     */
    function (content) {
        /** @type {?} */
        var component = this._document.createTextNode("" + content);
        return new ContentRef([[component]]);
    };
    /**
     * @param {?} moduleCFR
     * @param {?} contentInjector
     * @param {?} content
     * @param {?} context
     * @return {?}
     */
    NgbModalStack.prototype._createFromComponent = /**
     * @param {?} moduleCFR
     * @param {?} contentInjector
     * @param {?} content
     * @param {?} context
     * @return {?}
     */
    function (moduleCFR, contentInjector, content, context) {
        /** @type {?} */
        var contentCmptFactory = moduleCFR.resolveComponentFactory(content);
        /** @type {?} */
        var modalContentInjector = Injector.create({ providers: [{ provide: NgbActiveModal, useValue: context }], parent: contentInjector });
        /** @type {?} */
        var componentRef = contentCmptFactory.create(modalContentInjector);
        this._applicationRef.attachView(componentRef.hostView);
        return new ContentRef([[componentRef.location.nativeElement]], componentRef.hostView, componentRef);
    };
    /**
     * @param {?} ngbModalRef
     * @return {?}
     */
    NgbModalStack.prototype._registerModalRef = /**
     * @param {?} ngbModalRef
     * @return {?}
     */
    function (ngbModalRef) {
        var _this = this;
        /** @type {?} */
        var unregisterModalRef = function () {
            /** @type {?} */
            var index = _this._modalRefs.indexOf(ngbModalRef);
            if (index > -1) {
                _this._modalRefs.splice(index, 1);
            }
        };
        this._modalRefs.push(ngbModalRef);
        ngbModalRef.result.then(unregisterModalRef, unregisterModalRef);
    };
    /**
     * @param {?} ngbWindowCmpt
     * @return {?}
     */
    NgbModalStack.prototype._registerWindowCmpt = /**
     * @param {?} ngbWindowCmpt
     * @return {?}
     */
    function (ngbWindowCmpt) {
        var _this = this;
        this._windowCmpts.push(ngbWindowCmpt);
        this._activeWindowCmptHasChanged.next();
        ngbWindowCmpt.onDestroy(function () {
            /** @type {?} */
            var index = _this._windowCmpts.indexOf(ngbWindowCmpt);
            if (index > -1) {
                _this._windowCmpts.splice(index, 1);
                _this._activeWindowCmptHasChanged.next();
            }
        });
    };
    NgbModalStack.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    NgbModalStack.ctorParameters = function () { return [
        { type: ApplicationRef },
        { type: Injector },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: ScrollBar },
        { type: RendererFactory2 }
    ]; };
    /** @nocollapse */ NgbModalStack.ngInjectableDef = i0.defineInjectable({ factory: function NgbModalStack_Factory() { return new NgbModalStack(i0.inject(i0.ApplicationRef), i0.inject(i0.INJECTOR), i0.inject(i1.DOCUMENT), i0.inject(i2.ScrollBar), i0.inject(i0.RendererFactory2)); }, token: NgbModalStack, providedIn: "root" });
    return NgbModalStack;
}());
export { NgbModalStack };
if (false) {
    /** @type {?} */
    NgbModalStack.prototype._windowAttributes;
    /** @type {?} */
    NgbModalStack.prototype._backdropAttributes;
    /** @type {?} */
    NgbModalStack.prototype._modalRefs;
    /** @type {?} */
    NgbModalStack.prototype._windowCmpts;
    /** @type {?} */
    NgbModalStack.prototype._activeWindowCmptHasChanged;
    /** @type {?} */
    NgbModalStack.prototype._applicationRef;
    /** @type {?} */
    NgbModalStack.prototype._injector;
    /** @type {?} */
    NgbModalStack.prototype._document;
    /** @type {?} */
    NgbModalStack.prototype._scrollBar;
    /** @type {?} */
    NgbModalStack.prototype._rendererFactory;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtc3RhY2suanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbIm1vZGFsL21vZGFsLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUNMLGNBQWMsRUFHZCxNQUFNLEVBQ04sVUFBVSxFQUNWLFFBQVEsRUFDUixnQkFBZ0IsRUFDaEIsV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFN0IsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxTQUFTLEVBQUUsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ2pELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxjQUFjLEVBQUUsV0FBVyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3hELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7SUFVNUMsdUJBQ1ksaUJBQXlDLFNBQW1CLEVBQTRCLFNBQWMsRUFDdEcsWUFBK0IsZ0JBQWtDO1FBRjdFLGlCQVVDO1FBVFcsb0JBQWUsR0FBZixlQUFlO1FBQTBCLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFBNEIsY0FBUyxHQUFULFNBQVMsQ0FBSztRQUN0RyxlQUFVLEdBQVYsVUFBVTtRQUFxQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO2lDQVJqRCxDQUFDLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFB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LENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNsQztTQUNGLENBQUM7UUFDRixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNsQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDOzs7Ozs7SUFHMUQsMkNBQW1COzs7O2NBQUMsYUFBMkM7O1FBQ3JFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUV4QyxhQUFhLENBQUMsU0FBUyxDQUFDOztZQUN0QixJQUFNLEtBQUssR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN2RCxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNmLEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDbkMsS0FBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3pDO1NBQ0YsQ0FBQyxDQUFDOzs7Z0JBL0pOLFVBQVUsU0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUM7Ozs7Z0JBbkI5QixjQUFjO2dCQUtkLFFBQVE7Z0RBdUJtRSxNQUFNLFNBQUMsUUFBUTtnQkFmcEYsU0FBUztnQkFQZixnQkFBZ0I7Ozt3QkFSbEI7O1NBc0JhLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge1xyXG4gIEFwcGxpY2F0aW9uUmVmLFxyXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICBDb21wb25lbnRSZWYsXHJcbiAgSW5qZWN0LFxyXG4gIEluamVjdGFibGUsXHJcbiAgSW5qZWN0b3IsXHJcbiAgUmVuZGVyZXJGYWN0b3J5MixcclxuICBUZW1wbGF0ZVJlZixcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7bmdiRm9jdXNUcmFwfSBmcm9tICcuLi91dGlsL2ZvY3VzLXRyYXAnO1xyXG5pbXBvcnQge0NvbnRlbnRSZWZ9IGZyb20gJy4uL3V0aWwvcG9wdXAnO1xyXG5pbXBvcnQge1Njcm9sbEJhcn0gZnJvbSAnLi4vdXRpbC9zY3JvbGxiYXInO1xyXG5pbXBvcnQge2lzRGVmaW5lZCwgaXNTdHJpbmd9IGZyb20gJy4uL3V0aWwvdXRpbCc7XHJcbmltcG9ydCB7TmdiTW9kYWxCYWNrZHJvcH0gZnJvbSAnLi9tb2RhbC1iYWNrZHJvcCc7XHJcbmltcG9ydCB7TmdiQWN0aXZlTW9kYWwsIE5nYk1vZGFsUmVmfSBmcm9tICcuL21vZGFsLXJlZic7XHJcbmltcG9ydCB7TmdiTW9kYWxXaW5kb3d9IGZyb20gJy4vbW9kYWwtd2luZG93JztcclxuXHJcbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxyXG5leHBvcnQgY2xhc3MgTmdiTW9kYWxTdGFjayB7XHJcbiAgcHJpdmF0ZSBfd2luZG93QXR0cmlidXRlcyA9IFsnYXJpYUxhYmVsbGVkQnknLCAnYmFja2Ryb3AnLCAnY2VudGVyZWQnLCAna2V5Ym9hcmQnLCAnc2l6ZScsICd3aW5kb3dDbGFzcyddO1xyXG4gIHByaXZhdGUgX2JhY2tkcm9wQXR0cmlidXRlcyA9IFsnYmFja2Ryb3BDbGFzcyddO1xyXG4gIHByaXZhdGUgX21vZGFsUmVmczogTmdiTW9kYWxSZWZbXSA9IFtdO1xyXG4gIHByaXZhdGUgX3dpbmRvd0NtcHRzOiBDb21wb25lbnRSZWY8TmdiTW9kYWxXaW5kb3c+W10gPSBbXTtcclxuICBwcml2YXRlIF9hY3RpdmVXaW5kb3dDbXB0SGFzQ2hhbmdlZCA9IG5ldyBTdWJqZWN0KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcml2YXRlIF9hcHBsaWNhdGlvblJlZjogQXBwbGljYXRpb25SZWYsIHByaXZhdGUgX2luamVjdG9yOiBJbmplY3RvciwgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSxcclxuICAgICAgcHJpdmF0ZSBfc2Nyb2xsQmFyOiBTY3JvbGxCYXIsIHByaXZhdGUgX3JlbmRlcmVyRmFjdG9yeTogUmVuZGVyZXJGYWN0b3J5Mikge1xyXG4gICAgLy8gVHJhcCBmb2N1cyBvbiBhY3RpdmUgV2luZG93Q21wdFxyXG4gICAgdGhpcy5fYWN0aXZlV2luZG93Q21wdEhhc0NoYW5nZWQuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuX3dpbmRvd0NtcHRzLmxlbmd0aCkge1xyXG4gICAgICAgIGNvbnN0IGFjdGl2ZVdpbmRvd0NtcHQgPSB0aGlzLl93aW5kb3dDbXB0c1t0aGlzLl93aW5kb3dDbXB0cy5sZW5ndGggLSAxXTtcclxuICAgICAgICBuZ2JGb2N1c1RyYXAoYWN0aXZlV2luZG93Q21wdC5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LCB0aGlzLl9hY3RpdmVXaW5kb3dDbXB0SGFzQ2hhbmdlZCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb3Blbihtb2R1bGVDRlI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgY29udGVudEluamVjdG9yOiBJbmplY3RvciwgY29udGVudDogYW55LCBvcHRpb25zKTogTmdiTW9kYWxSZWYge1xyXG4gICAgY29uc3QgY29udGFpbmVyRWwgPVxyXG4gICAgICAgIGlzRGVmaW5lZChvcHRpb25zLmNvbnRhaW5lcikgPyB0aGlzLl9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdGlvbnMuY29udGFpbmVyKSA6IHRoaXMuX2RvY3VtZW50LmJvZHk7XHJcbiAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuX3JlbmRlcmVyRmFjdG9yeS5jcmVhdGVSZW5kZXJlcihudWxsLCBudWxsKTtcclxuXHJcbiAgICBjb25zdCByZXZlcnRQYWRkaW5nRm9yU2Nyb2xsQmFyID0gdGhpcy5fc2Nyb2xsQmFyLmNvbXBlbnNhdGUoKTtcclxuICAgIGNvbnN0IHJlbW92ZUJvZHlDbGFzcyA9ICgpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLl9tb2RhbFJlZnMubGVuZ3RoKSB7XHJcbiAgICAgICAgcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fZG9jdW1lbnQuYm9keSwgJ21vZGFsLW9wZW4nKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoIWNvbnRhaW5lckVsKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIHNwZWNpZmllZCBtb2RhbCBjb250YWluZXIgXCIke29wdGlvbnMuY29udGFpbmVyIHx8ICdib2R5J31cIiB3YXMgbm90IGZvdW5kIGluIHRoZSBET00uYCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWN0aXZlTW9kYWwgPSBuZXcgTmdiQWN0aXZlTW9kYWwoKTtcclxuICAgIGNvbnN0IGNvbnRlbnRSZWYgPSB0aGlzLl9nZXRDb250ZW50UmVmKG1vZHVsZUNGUiwgb3B0aW9ucy5pbmplY3RvciB8fCBjb250ZW50SW5qZWN0b3IsIGNvbnRlbnQsIGFjdGl2ZU1vZGFsKTtcclxuXHJcbiAgICBsZXQgYmFja2Ryb3BDbXB0UmVmOiBDb21wb25lbnRSZWY8TmdiTW9kYWxCYWNrZHJvcD4gPVxyXG4gICAgICAgIG9wdGlvbnMuYmFja2Ryb3AgIT09IGZhbHNlID8gdGhpcy5fYXR0YWNoQmFja2Ryb3AobW9kdWxlQ0ZSLCBjb250YWluZXJFbCkgOiBudWxsO1xyXG4gICAgbGV0IHdpbmRvd0NtcHRSZWY6IENvbXBvbmVudFJlZjxOZ2JNb2RhbFdpbmRvdz4gPSB0aGlzLl9hdHRhY2hXaW5kb3dDb21wb25lbnQobW9kdWxlQ0ZSLCBjb250YWluZXJFbCwgY29udGVudFJlZik7XHJcbiAgICBsZXQgbmdiTW9kYWxSZWY6IE5nYk1vZGFsUmVmID0gbmV3IE5nYk1vZGFsUmVmKHdpbmRvd0NtcHRSZWYsIGNvbnRlbnRSZWYsIGJhY2tkcm9wQ21wdFJlZiwgb3B0aW9ucy5iZWZvcmVEaXNtaXNzKTtcclxuXHJcbiAgICB0aGlzLl9yZWdpc3Rlck1vZGFsUmVmKG5nYk1vZGFsUmVmKTtcclxuICAgIHRoaXMuX3JlZ2lzdGVyV2luZG93Q21wdCh3aW5kb3dDbXB0UmVmKTtcclxuICAgIG5nYk1vZGFsUmVmLnJlc3VsdC50aGVuKHJldmVydFBhZGRpbmdGb3JTY3JvbGxCYXIsIHJldmVydFBhZGRpbmdGb3JTY3JvbGxCYXIpO1xyXG4gICAgbmdiTW9kYWxSZWYucmVzdWx0LnRoZW4ocmVtb3ZlQm9keUNsYXNzLCByZW1vdmVCb2R5Q2xhc3MpO1xyXG4gICAgYWN0aXZlTW9kYWwuY2xvc2UgPSAocmVzdWx0OiBhbnkpID0+IHsgbmdiTW9kYWxSZWYuY2xvc2UocmVzdWx0KTsgfTtcclxuICAgIGFjdGl2ZU1vZGFsLmRpc21pc3MgPSAocmVhc29uOiBhbnkpID0+IHsgbmdiTW9kYWxSZWYuZGlzbWlzcyhyZWFzb24pOyB9O1xyXG5cclxuICAgIHRoaXMuX2FwcGx5V2luZG93T3B0aW9ucyh3aW5kb3dDbXB0UmVmLmluc3RhbmNlLCBvcHRpb25zKTtcclxuICAgIGlmICh0aGlzLl9tb2RhbFJlZnMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgIHJlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2RvY3VtZW50LmJvZHksICdtb2RhbC1vcGVuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGJhY2tkcm9wQ21wdFJlZiAmJiBiYWNrZHJvcENtcHRSZWYuaW5zdGFuY2UpIHtcclxuICAgICAgdGhpcy5fYXBwbHlCYWNrZHJvcE9wdGlvbnMoYmFja2Ryb3BDbXB0UmVmLmluc3RhbmNlLCBvcHRpb25zKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZ2JNb2RhbFJlZjtcclxuICB9XHJcblxyXG4gIGRpc21pc3NBbGwocmVhc29uPzogYW55KSB7IHRoaXMuX21vZGFsUmVmcy5mb3JFYWNoKG5nYk1vZGFsUmVmID0+IG5nYk1vZGFsUmVmLmRpc21pc3MocmVhc29uKSk7IH1cclxuXHJcbiAgcHJpdmF0ZSBfYXR0YWNoQmFja2Ryb3AobW9kdWxlQ0ZSOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIGNvbnRhaW5lckVsOiBhbnkpOiBDb21wb25lbnRSZWY8TmdiTW9kYWxCYWNrZHJvcD4ge1xyXG4gICAgbGV0IGJhY2tkcm9wRmFjdG9yeSA9IG1vZHVsZUNGUi5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShOZ2JNb2RhbEJhY2tkcm9wKTtcclxuICAgIGxldCBiYWNrZHJvcENtcHRSZWYgPSBiYWNrZHJvcEZhY3RvcnkuY3JlYXRlKHRoaXMuX2luamVjdG9yKTtcclxuICAgIHRoaXMuX2FwcGxpY2F0aW9uUmVmLmF0dGFjaFZpZXcoYmFja2Ryb3BDbXB0UmVmLmhvc3RWaWV3KTtcclxuICAgIGNvbnRhaW5lckVsLmFwcGVuZENoaWxkKGJhY2tkcm9wQ21wdFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcclxuICAgIHJldHVybiBiYWNrZHJvcENtcHRSZWY7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9hdHRhY2hXaW5kb3dDb21wb25lbnQobW9kdWxlQ0ZSOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIGNvbnRhaW5lckVsOiBhbnksIGNvbnRlbnRSZWY6IGFueSk6XHJcbiAgICAgIENvbXBvbmVudFJlZjxOZ2JNb2RhbFdpbmRvdz4ge1xyXG4gICAgbGV0IHdpbmRvd0ZhY3RvcnkgPSBtb2R1bGVDRlIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoTmdiTW9kYWxXaW5kb3cpO1xyXG4gICAgbGV0IHdpbmRvd0NtcHRSZWYgPSB3aW5kb3dGYWN0b3J5LmNyZWF0ZSh0aGlzLl9pbmplY3RvciwgY29udGVudFJlZi5ub2Rlcyk7XHJcbiAgICB0aGlzLl9hcHBsaWNhdGlvblJlZi5hdHRhY2hWaWV3KHdpbmRvd0NtcHRSZWYuaG9zdFZpZXcpO1xyXG4gICAgY29udGFpbmVyRWwuYXBwZW5kQ2hpbGQod2luZG93Q21wdFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcclxuICAgIHJldHVybiB3aW5kb3dDbXB0UmVmO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfYXBwbHlXaW5kb3dPcHRpb25zKHdpbmRvd0luc3RhbmNlOiBOZ2JNb2RhbFdpbmRvdywgb3B0aW9uczogT2JqZWN0KTogdm9pZCB7XHJcbiAgICB0aGlzLl93aW5kb3dBdHRyaWJ1dGVzLmZvckVhY2goKG9wdGlvbk5hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgICBpZiAoaXNEZWZpbmVkKG9wdGlvbnNbb3B0aW9uTmFtZV0pKSB7XHJcbiAgICAgICAgd2luZG93SW5zdGFuY2Vbb3B0aW9uTmFtZV0gPSBvcHRpb25zW29wdGlvbk5hbWVdO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2FwcGx5QmFja2Ryb3BPcHRpb25zKGJhY2tkcm9wSW5zdGFuY2U6IE5nYk1vZGFsQmFja2Ryb3AsIG9wdGlvbnM6IE9iamVjdCk6IHZvaWQge1xyXG4gICAgdGhpcy5fYmFja2Ryb3BBdHRyaWJ1dGVzLmZvckVhY2goKG9wdGlvbk5hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgICBpZiAoaXNEZWZpbmVkKG9wdGlvbnNbb3B0aW9uTmFtZV0pKSB7XHJcbiAgICAgICAgYmFja2Ryb3BJbnN0YW5jZVtvcHRpb25OYW1lXSA9IG9wdGlvbnNbb3B0aW9uTmFtZV07XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZ2V0Q29udGVudFJlZihcclxuICAgICAgbW9kdWxlQ0ZSOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIGNvbnRlbnRJbmplY3RvcjogSW5qZWN0b3IsIGNvbnRlbnQ6IGFueSxcclxuICAgICAgYWN0aXZlTW9kYWw6IE5nYkFjdGl2ZU1vZGFsKTogQ29udGVudFJlZiB7XHJcbiAgICBpZiAoIWNvbnRlbnQpIHtcclxuICAgICAgcmV0dXJuIG5ldyBDb250ZW50UmVmKFtdKTtcclxuICAgIH0gZWxzZSBpZiAoY29udGVudCBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVGcm9tVGVtcGxhdGVSZWYoY29udGVudCwgYWN0aXZlTW9kYWwpO1xyXG4gICAgfSBlbHNlIGlmIChpc1N0cmluZyhjb250ZW50KSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fY3JlYXRlRnJvbVN0cmluZyhjb250ZW50KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVGcm9tQ29tcG9uZW50KG1vZHVsZUNGUiwgY29udGVudEluamVjdG9yLCBjb250ZW50LCBhY3RpdmVNb2RhbCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9jcmVhdGVGcm9tVGVtcGxhdGVSZWYoY29udGVudDogVGVtcGxhdGVSZWY8YW55PiwgYWN0aXZlTW9kYWw6IE5nYkFjdGl2ZU1vZGFsKTogQ29udGVudFJlZiB7XHJcbiAgICBjb25zdCBjb250ZXh0ID0ge1xyXG4gICAgICAkaW1wbGljaXQ6IGFjdGl2ZU1vZGFsLFxyXG4gICAgICBjbG9zZShyZXN1bHQpIHsgYWN0aXZlTW9kYWwuY2xvc2UocmVzdWx0KTsgfSxcclxuICAgICAgZGlzbWlzcyhyZWFzb24pIHsgYWN0aXZlTW9kYWwuZGlzbWlzcyhyZWFzb24pOyB9XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgdmlld1JlZiA9IGNvbnRlbnQuY3JlYXRlRW1iZWRkZWRWaWV3KGNvbnRleHQpO1xyXG4gICAgdGhpcy5fYXBwbGljYXRpb25SZWYuYXR0YWNoVmlldyh2aWV3UmVmKTtcclxuICAgIHJldHVybiBuZXcgQ29udGVudFJlZihbdmlld1JlZi5yb290Tm9kZXNdLCB2aWV3UmVmKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2NyZWF0ZUZyb21TdHJpbmcoY29udGVudDogc3RyaW5nKTogQ29udGVudFJlZiB7XHJcbiAgICBjb25zdCBjb21wb25lbnQgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgJHtjb250ZW50fWApO1xyXG4gICAgcmV0dXJuIG5ldyBDb250ZW50UmVmKFtbY29tcG9uZW50XV0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfY3JlYXRlRnJvbUNvbXBvbmVudChcclxuICAgICAgbW9kdWxlQ0ZSOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIGNvbnRlbnRJbmplY3RvcjogSW5qZWN0b3IsIGNvbnRlbnQ6IGFueSxcclxuICAgICAgY29udGV4dDogTmdiQWN0aXZlTW9kYWwpOiBDb250ZW50UmVmIHtcclxuICAgIGNvbnN0IGNvbnRlbnRDbXB0RmFjdG9yeSA9IG1vZHVsZUNGUi5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb250ZW50KTtcclxuICAgIGNvbnN0IG1vZGFsQ29udGVudEluamVjdG9yID1cclxuICAgICAgICBJbmplY3Rvci5jcmVhdGUoe3Byb3ZpZGVyczogW3twcm92aWRlOiBOZ2JBY3RpdmVNb2RhbCwgdXNlVmFsdWU6IGNvbnRleHR9XSwgcGFyZW50OiBjb250ZW50SW5qZWN0b3J9KTtcclxuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IGNvbnRlbnRDbXB0RmFjdG9yeS5jcmVhdGUobW9kYWxDb250ZW50SW5qZWN0b3IpO1xyXG4gICAgdGhpcy5fYXBwbGljYXRpb25SZWYuYXR0YWNoVmlldyhjb21wb25lbnRSZWYuaG9zdFZpZXcpO1xyXG4gICAgcmV0dXJuIG5ldyBDb250ZW50UmVmKFtbY29tcG9uZW50UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnRdXSwgY29tcG9uZW50UmVmLmhvc3RWaWV3LCBjb21wb25lbnRSZWYpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfcmVnaXN0ZXJNb2RhbFJlZihuZ2JNb2RhbFJlZjogTmdiTW9kYWxSZWYpIHtcclxuICAgIGNvbnN0IHVucmVnaXN0ZXJNb2RhbFJlZiA9ICgpID0+IHtcclxuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9tb2RhbFJlZnMuaW5kZXhPZihuZ2JNb2RhbFJlZik7XHJcbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgdGhpcy5fbW9kYWxSZWZzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGlzLl9tb2RhbFJlZnMucHVzaChuZ2JNb2RhbFJlZik7XHJcbiAgICBuZ2JNb2RhbFJlZi5yZXN1bHQudGhlbih1bnJlZ2lzdGVyTW9kYWxSZWYsIHVucmVnaXN0ZXJNb2RhbFJlZik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9yZWdpc3RlcldpbmRvd0NtcHQobmdiV2luZG93Q21wdDogQ29tcG9uZW50UmVmPE5nYk1vZGFsV2luZG93Pikge1xyXG4gICAgdGhpcy5fd2luZG93Q21wdHMucHVzaChuZ2JXaW5kb3dDbXB0KTtcclxuICAgIHRoaXMuX2FjdGl2ZVdpbmRvd0NtcHRIYXNDaGFuZ2VkLm5leHQoKTtcclxuXHJcbiAgICBuZ2JXaW5kb3dDbXB0Lm9uRGVzdHJveSgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fd2luZG93Q21wdHMuaW5kZXhPZihuZ2JXaW5kb3dDbXB0KTtcclxuICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICB0aGlzLl93aW5kb3dDbXB0cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIHRoaXMuX2FjdGl2ZVdpbmRvd0NtcHRIYXNDaGFuZ2VkLm5leHQoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==