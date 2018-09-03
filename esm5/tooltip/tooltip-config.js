/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Configuration service for the NgbTooltip directive.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the tooltips used in the application.
 */
var NgbTooltipConfig = /** @class */ (function () {
    function NgbTooltipConfig() {
        this.autoClose = true;
        this.placement = 'top';
        this.triggers = 'hover';
        this.disableTooltip = false;
    }
    NgbTooltipConfig.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */ NgbTooltipConfig.ngInjectableDef = i0.defineInjectable({ factory: function NgbTooltipConfig_Factory() { return new NgbTooltipConfig(); }, token: NgbTooltipConfig, providedIn: "root" });
    return NgbTooltipConfig;
}());
export { NgbTooltipConfig };
if (false) {
    /** @type {?} */
    NgbTooltipConfig.prototype.autoClose;
    /** @type {?} */
    NgbTooltipConfig.prototype.placement;
    /** @type {?} */
    NgbTooltipConfig.prototype.triggers;
    /** @type {?} */
    NgbTooltipConfig.prototype.container;
    /** @type {?} */
    NgbTooltipConfig.prototype.disableTooltip;
    /** @type {?} */
    NgbTooltipConfig.prototype.tooltipClass;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC1jb25maWcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbInRvb2x0aXAvdG9vbHRpcC1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozt5QkFVSyxJQUFJO3lCQUNwQixLQUFLO3dCQUN0QixPQUFPOzhCQUVELEtBQUs7OztnQkFOdkIsVUFBVSxTQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7OzJCQVJoQzs7U0FTYSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1BsYWNlbWVudEFycmF5fSBmcm9tICcuLi91dGlsL3Bvc2l0aW9uaW5nJztcclxuXHJcbi8qKlxyXG4gKiBDb25maWd1cmF0aW9uIHNlcnZpY2UgZm9yIHRoZSBOZ2JUb29sdGlwIGRpcmVjdGl2ZS5cclxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXHJcbiAqIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCB0aGUgdG9vbHRpcHMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcclxuZXhwb3J0IGNsYXNzIE5nYlRvb2x0aXBDb25maWcge1xyXG4gIGF1dG9DbG9zZTogYm9vbGVhbiB8ICdpbnNpZGUnIHwgJ291dHNpZGUnID0gdHJ1ZTtcclxuICBwbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5ID0gJ3RvcCc7XHJcbiAgdHJpZ2dlcnMgPSAnaG92ZXInO1xyXG4gIGNvbnRhaW5lcjogc3RyaW5nO1xyXG4gIGRpc2FibGVUb29sdGlwID0gZmFsc2U7XHJcbiAgdG9vbHRpcENsYXNzOiBzdHJpbmc7XHJcbn1cclxuIl19