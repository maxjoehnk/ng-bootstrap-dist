/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbTimepicker } from './timepicker';
export { NgbTimepicker } from './timepicker';
export { NgbTimepickerConfig } from './timepicker-config';
export { NgbTimeAdapter } from './ngb-time-adapter';
var NgbTimepickerModule = /** @class */ (function () {
    function NgbTimepickerModule() {
    }
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     */
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    NgbTimepickerModule.forRoot = /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    function () { return { ngModule: NgbTimepickerModule }; };
    NgbTimepickerModule.decorators = [
        { type: NgModule, args: [{ declarations: [NgbTimepicker], exports: [NgbTimepicker], imports: [CommonModule] },] },
    ];
    return NgbTimepickerModule;
}());
export { NgbTimepickerModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbInRpbWVwaWNrZXIvdGltZXBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQXNCLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUU3QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRTNDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDM0MsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFFeEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG9CQUFvQixDQUFDOzs7O0lBSWhEOzs7OztPQUtHOzs7Ozs7OztJQUNJLDJCQUFPOzs7Ozs7O0lBQWQsY0FBd0MsTUFBTSxDQUFDLEVBQUMsUUFBUSxFQUFFLG1CQUFtQixFQUFDLENBQUMsRUFBRTs7Z0JBUmxGLFFBQVEsU0FBQyxFQUFDLFlBQVksRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFDOzs4QkFWNUY7O1NBV2EsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHtOZ2JUaW1lcGlja2VyfSBmcm9tICcuL3RpbWVwaWNrZXInO1xyXG5cclxuZXhwb3J0IHtOZ2JUaW1lcGlja2VyfSBmcm9tICcuL3RpbWVwaWNrZXInO1xyXG5leHBvcnQge05nYlRpbWVwaWNrZXJDb25maWd9IGZyb20gJy4vdGltZXBpY2tlci1jb25maWcnO1xyXG5leHBvcnQge05nYlRpbWVTdHJ1Y3R9IGZyb20gJy4vbmdiLXRpbWUtc3RydWN0JztcclxuZXhwb3J0IHtOZ2JUaW1lQWRhcHRlcn0gZnJvbSAnLi9uZ2ItdGltZS1hZGFwdGVyJztcclxuXHJcbkBOZ01vZHVsZSh7ZGVjbGFyYXRpb25zOiBbTmdiVGltZXBpY2tlcl0sIGV4cG9ydHM6IFtOZ2JUaW1lcGlja2VyXSwgaW1wb3J0czogW0NvbW1vbk1vZHVsZV19KVxyXG5leHBvcnQgY2xhc3MgTmdiVGltZXBpY2tlck1vZHVsZSB7XHJcbiAgLyoqXHJcbiAgICogSW1wb3J0aW5nIHdpdGggJy5mb3JSb290KCknIGlzIG5vIGxvbmdlciBuZWNlc3NhcnksIHlvdSBjYW4gc2ltcGx5IGltcG9ydCB0aGUgbW9kdWxlLlxyXG4gICAqIFdpbGwgYmUgcmVtb3ZlZCBpbiA0LjAuMC5cclxuICAgKlxyXG4gICAqIEBkZXByZWNhdGVkIDMuMC4wXHJcbiAgICovXHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7IHJldHVybiB7bmdNb2R1bGU6IE5nYlRpbWVwaWNrZXJNb2R1bGV9OyB9XHJcbn1cclxuIl19