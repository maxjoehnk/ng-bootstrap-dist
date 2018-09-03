/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, Injector, ComponentFactoryResolver } from '@angular/core';
import { NgbModalConfig } from './modal-config';
import { NgbModalStack } from './modal-stack';
import * as i0 from "@angular/core";
import * as i1 from "./modal-stack";
import * as i2 from "./modal-config";
/**
 * A service to open modal windows. Creating a modal is straightforward: create a template and pass it as an argument to
 * the "open" method!
 */
export class NgbModal {
    /**
     * @param {?} _moduleCFR
     * @param {?} _injector
     * @param {?} _modalStack
     * @param {?} _config
     */
    constructor(_moduleCFR, _injector, _modalStack, _config) {
        this._moduleCFR = _moduleCFR;
        this._injector = _injector;
        this._modalStack = _modalStack;
        this._config = _config;
    }
    /**
     * Opens a new modal window with the specified content and using supplied options. Content can be provided
     * as a TemplateRef or a component type. If you pass a component type as content than instances of those
     * components can be injected with an instance of the NgbActiveModal class. You can use methods on the
     * NgbActiveModal class to close / dismiss modals from "inside" of a component.
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    open(content, options = {}) {
        /** @type {?} */
        const combinedOptions = Object.assign({}, this._config, options);
        return this._modalStack.open(this._moduleCFR, this._injector, content, combinedOptions);
    }
    /**
     * Dismiss all currently displayed modal windows with the supplied reason.
     *
     * \@since 3.1.0
     * @param {?=} reason
     * @return {?}
     */
    dismissAll(reason) { this._modalStack.dismissAll(reason); }
}
NgbModal.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */
NgbModal.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: Injector },
    { type: NgbModalStack },
    { type: NgbModalConfig }
];
/** @nocollapse */ NgbModal.ngInjectableDef = i0.defineInjectable({ factory: function NgbModal_Factory() { return new NgbModal(i0.inject(i0.ComponentFactoryResolver), i0.inject(i0.INJECTOR), i0.inject(i1.NgbModalStack), i0.inject(i2.NgbModalConfig)); }, token: NgbModal, providedIn: "root" });
if (false) {
    /** @type {?} */
    NgbModal.prototype._moduleCFR;
    /** @type {?} */
    NgbModal.prototype._injector;
    /** @type {?} */
    NgbModal.prototype._modalStack;
    /** @type {?} */
    NgbModal.prototype._config;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbIm1vZGFsL21vZGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSx3QkFBd0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUU3RSxPQUFPLEVBQWtCLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRS9ELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7O0FBTzVDLE1BQU07Ozs7Ozs7SUFDSixZQUNZLFlBQThDLFNBQW1CLEVBQVUsV0FBMEIsRUFDckc7UUFEQSxlQUFVLEdBQVYsVUFBVTtRQUFvQyxjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWU7UUFDckcsWUFBTyxHQUFQLE9BQU87S0FBb0I7Ozs7Ozs7Ozs7SUFRdkMsSUFBSSxDQUFDLE9BQVksRUFBRSxVQUEyQixFQUFFOztRQUM5QyxNQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0tBQ3pGOzs7Ozs7OztJQU9ELFVBQVUsQ0FBQyxNQUFZLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRTs7O1lBdEJsRSxVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOzs7O1lBVkYsd0JBQXdCO1lBQWxDLFFBQVE7WUFJcEIsYUFBYTtZQUZJLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGUsIEluamVjdG9yLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtOZ2JNb2RhbE9wdGlvbnMsIE5nYk1vZGFsQ29uZmlnfSBmcm9tICcuL21vZGFsLWNvbmZpZyc7XHJcbmltcG9ydCB7TmdiTW9kYWxSZWZ9IGZyb20gJy4vbW9kYWwtcmVmJztcclxuaW1wb3J0IHtOZ2JNb2RhbFN0YWNrfSBmcm9tICcuL21vZGFsLXN0YWNrJztcclxuXHJcbi8qKlxyXG4gKiBBIHNlcnZpY2UgdG8gb3BlbiBtb2RhbCB3aW5kb3dzLiBDcmVhdGluZyBhIG1vZGFsIGlzIHN0cmFpZ2h0Zm9yd2FyZDogY3JlYXRlIGEgdGVtcGxhdGUgYW5kIHBhc3MgaXQgYXMgYW4gYXJndW1lbnQgdG9cclxuICogdGhlIFwib3BlblwiIG1ldGhvZCFcclxuICovXHJcbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxyXG5leHBvcnQgY2xhc3MgTmdiTW9kYWwge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcml2YXRlIF9tb2R1bGVDRlI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgcHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yLCBwcml2YXRlIF9tb2RhbFN0YWNrOiBOZ2JNb2RhbFN0YWNrLFxyXG4gICAgICBwcml2YXRlIF9jb25maWc6IE5nYk1vZGFsQ29uZmlnKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBPcGVucyBhIG5ldyBtb2RhbCB3aW5kb3cgd2l0aCB0aGUgc3BlY2lmaWVkIGNvbnRlbnQgYW5kIHVzaW5nIHN1cHBsaWVkIG9wdGlvbnMuIENvbnRlbnQgY2FuIGJlIHByb3ZpZGVkXHJcbiAgICogYXMgYSBUZW1wbGF0ZVJlZiBvciBhIGNvbXBvbmVudCB0eXBlLiBJZiB5b3UgcGFzcyBhIGNvbXBvbmVudCB0eXBlIGFzIGNvbnRlbnQgdGhhbiBpbnN0YW5jZXMgb2YgdGhvc2VcclxuICAgKiBjb21wb25lbnRzIGNhbiBiZSBpbmplY3RlZCB3aXRoIGFuIGluc3RhbmNlIG9mIHRoZSBOZ2JBY3RpdmVNb2RhbCBjbGFzcy4gWW91IGNhbiB1c2UgbWV0aG9kcyBvbiB0aGVcclxuICAgKiBOZ2JBY3RpdmVNb2RhbCBjbGFzcyB0byBjbG9zZSAvIGRpc21pc3MgbW9kYWxzIGZyb20gXCJpbnNpZGVcIiBvZiBhIGNvbXBvbmVudC5cclxuICAgKi9cclxuICBvcGVuKGNvbnRlbnQ6IGFueSwgb3B0aW9uczogTmdiTW9kYWxPcHRpb25zID0ge30pOiBOZ2JNb2RhbFJlZiB7XHJcbiAgICBjb25zdCBjb21iaW5lZE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9jb25maWcsIG9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIHRoaXMuX21vZGFsU3RhY2sub3Blbih0aGlzLl9tb2R1bGVDRlIsIHRoaXMuX2luamVjdG9yLCBjb250ZW50LCBjb21iaW5lZE9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGlzbWlzcyBhbGwgY3VycmVudGx5IGRpc3BsYXllZCBtb2RhbCB3aW5kb3dzIHdpdGggdGhlIHN1cHBsaWVkIHJlYXNvbi5cclxuICAgKlxyXG4gICAqIEBzaW5jZSAzLjEuMFxyXG4gICAqL1xyXG4gIGRpc21pc3NBbGwocmVhc29uPzogYW55KSB7IHRoaXMuX21vZGFsU3RhY2suZGlzbWlzc0FsbChyZWFzb24pOyB9XHJcbn1cclxuIl19