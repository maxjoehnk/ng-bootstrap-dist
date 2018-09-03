/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Represent options available when opening new modal windows.
 * @record
 */
export function NgbModalOptions() { }
/**
 * Sets the aria attribute aria-labelledby to a modal window.
 *
 * \@since 2.2.0
 * @type {?|undefined}
 */
NgbModalOptions.prototype.ariaLabelledBy;
/**
 * Whether a backdrop element should be created for a given modal (true by default).
 * Alternatively, specify 'static' for a backdrop which doesn't close the modal on click.
 * @type {?|undefined}
 */
NgbModalOptions.prototype.backdrop;
/**
 * Function called when a modal will be dismissed.
 * If this function returns false, the promise is resolved with false or the promise is rejected, the modal is not
 * dismissed.
 * @type {?|undefined}
 */
NgbModalOptions.prototype.beforeDismiss;
/**
 * To center the modal vertically (false by default).
 *
 * \@since 1.1.0
 * @type {?|undefined}
 */
NgbModalOptions.prototype.centered;
/**
 * An element to which to attach newly opened modal windows.
 * @type {?|undefined}
 */
NgbModalOptions.prototype.container;
/**
 * Injector to use for modal content.
 * @type {?|undefined}
 */
NgbModalOptions.prototype.injector;
/**
 * Whether to close the modal when escape key is pressed (true by default).
 * @type {?|undefined}
 */
NgbModalOptions.prototype.keyboard;
/**
 * Size of a new modal window.
 * @type {?|undefined}
 */
NgbModalOptions.prototype.size;
/**
 * Custom class to append to the modal window
 * @type {?|undefined}
 */
NgbModalOptions.prototype.windowClass;
/**
 * Custom class to append to the modal backdrop
 *
 * \@since 1.1.0
 * @type {?|undefined}
 */
NgbModalOptions.prototype.backdropClass;
/**
 * Configuration object token for the NgbModal service.
 * You can provide this configuration, typically in your root module in order to provide default option values for every
 * modal.
 *
 * \@since 3.1.0
 */
export class NgbModalConfig {
    constructor() {
        this.backdrop = true;
        this.keyboard = true;
    }
}
NgbModalConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */ NgbModalConfig.ngInjectableDef = i0.defineInjectable({ factory: function NgbModalConfig_Factory() { return new NgbModalConfig(); }, token: NgbModalConfig, providedIn: "root" });
if (false) {
    /** @type {?} */
    NgbModalConfig.prototype.backdrop;
    /** @type {?} */
    NgbModalConfig.prototype.keyboard;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJtb2RhbC9tb2RhbC1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQVcsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwRW5ELE1BQU07O3dCQUMyQixJQUFJO3dCQUN4QixJQUFJOzs7O1lBSGhCLFVBQVUsU0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGUsIEluamVjdG9yfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnQgb3B0aW9ucyBhdmFpbGFibGUgd2hlbiBvcGVuaW5nIG5ldyBtb2RhbCB3aW5kb3dzLlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBOZ2JNb2RhbE9wdGlvbnMge1xyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIGFyaWEgYXR0cmlidXRlIGFyaWEtbGFiZWxsZWRieSB0byBhIG1vZGFsIHdpbmRvdy5cclxuICAgKlxyXG4gICAqIEBzaW5jZSAyLjIuMFxyXG4gICAqL1xyXG4gIGFyaWFMYWJlbGxlZEJ5Pzogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGEgYmFja2Ryb3AgZWxlbWVudCBzaG91bGQgYmUgY3JlYXRlZCBmb3IgYSBnaXZlbiBtb2RhbCAodHJ1ZSBieSBkZWZhdWx0KS5cclxuICAgKiBBbHRlcm5hdGl2ZWx5LCBzcGVjaWZ5ICdzdGF0aWMnIGZvciBhIGJhY2tkcm9wIHdoaWNoIGRvZXNuJ3QgY2xvc2UgdGhlIG1vZGFsIG9uIGNsaWNrLlxyXG4gICAqL1xyXG4gIGJhY2tkcm9wPzogYm9vbGVhbiB8ICdzdGF0aWMnO1xyXG5cclxuICAvKipcclxuICAgKiBGdW5jdGlvbiBjYWxsZWQgd2hlbiBhIG1vZGFsIHdpbGwgYmUgZGlzbWlzc2VkLlxyXG4gICAqIElmIHRoaXMgZnVuY3Rpb24gcmV0dXJucyBmYWxzZSwgdGhlIHByb21pc2UgaXMgcmVzb2x2ZWQgd2l0aCBmYWxzZSBvciB0aGUgcHJvbWlzZSBpcyByZWplY3RlZCwgdGhlIG1vZGFsIGlzIG5vdFxyXG4gICAqIGRpc21pc3NlZC5cclxuICAgKi9cclxuICBiZWZvcmVEaXNtaXNzPzogKCkgPT4gYm9vbGVhbiB8IFByb21pc2U8Ym9vbGVhbj47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRvIGNlbnRlciB0aGUgbW9kYWwgdmVydGljYWxseSAoZmFsc2UgYnkgZGVmYXVsdCkuXHJcbiAgICpcclxuICAgKiBAc2luY2UgMS4xLjBcclxuICAgKi9cclxuICBjZW50ZXJlZD86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIGVsZW1lbnQgdG8gd2hpY2ggdG8gYXR0YWNoIG5ld2x5IG9wZW5lZCBtb2RhbCB3aW5kb3dzLlxyXG4gICAqL1xyXG4gIGNvbnRhaW5lcj86IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogSW5qZWN0b3IgdG8gdXNlIGZvciBtb2RhbCBjb250ZW50LlxyXG4gICAqL1xyXG4gIGluamVjdG9yPzogSW5qZWN0b3I7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdG8gY2xvc2UgdGhlIG1vZGFsIHdoZW4gZXNjYXBlIGtleSBpcyBwcmVzc2VkICh0cnVlIGJ5IGRlZmF1bHQpLlxyXG4gICAqL1xyXG4gIGtleWJvYXJkPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogU2l6ZSBvZiBhIG5ldyBtb2RhbCB3aW5kb3cuXHJcbiAgICovXHJcbiAgc2l6ZT86ICdzbScgfCAnbGcnO1xyXG5cclxuICAvKipcclxuICAgKiBDdXN0b20gY2xhc3MgdG8gYXBwZW5kIHRvIHRoZSBtb2RhbCB3aW5kb3dcclxuICAgKi9cclxuICB3aW5kb3dDbGFzcz86IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogQ3VzdG9tIGNsYXNzIHRvIGFwcGVuZCB0byB0aGUgbW9kYWwgYmFja2Ryb3BcclxuICAgKlxyXG4gICAqIEBzaW5jZSAxLjEuMFxyXG4gICAqL1xyXG4gIGJhY2tkcm9wQ2xhc3M/OiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4qIENvbmZpZ3VyYXRpb24gb2JqZWN0IHRva2VuIGZvciB0aGUgTmdiTW9kYWwgc2VydmljZS5cclxuKiBZb3UgY2FuIHByb3ZpZGUgdGhpcyBjb25maWd1cmF0aW9uLCB0eXBpY2FsbHkgaW4geW91ciByb290IG1vZHVsZSBpbiBvcmRlciB0byBwcm92aWRlIGRlZmF1bHQgb3B0aW9uIHZhbHVlcyBmb3IgZXZlcnlcclxuKiBtb2RhbC5cclxuKlxyXG4qIEBzaW5jZSAzLjEuMFxyXG4qL1xyXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcclxuZXhwb3J0IGNsYXNzIE5nYk1vZGFsQ29uZmlnIGltcGxlbWVudHMgTmdiTW9kYWxPcHRpb25zIHtcclxuICBiYWNrZHJvcDogYm9vbGVhbiB8ICdzdGF0aWMnID0gdHJ1ZTtcclxuICBrZXlib2FyZCA9IHRydWU7XHJcbn1cclxuIl19