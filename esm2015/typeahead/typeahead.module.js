/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbHighlight } from './highlight';
import { NgbTypeaheadWindow } from './typeahead-window';
import { NgbTypeahead } from './typeahead';
export { NgbHighlight } from './highlight';
export { NgbTypeaheadWindow } from './typeahead-window';
export { NgbTypeaheadConfig } from './typeahead-config';
export { NgbTypeahead } from './typeahead';
export class NgbTypeaheadModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbTypeaheadModule }; }
}
NgbTypeaheadModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgbTypeahead, NgbHighlight, NgbTypeaheadWindow],
                exports: [NgbTypeahead, NgbHighlight],
                imports: [CommonModule],
                entryComponents: [NgbTypeaheadWindow]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsidHlwZWFoZWFkL3R5cGVhaGVhZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQXNCLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUU3QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFFekMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUMsWUFBWSxFQUE4QixNQUFNLGFBQWEsQ0FBQztBQVF0RSxNQUFNOzs7Ozs7OztJQU9KLE1BQU0sQ0FBQyxPQUFPLEtBQTBCLE1BQU0sQ0FBQyxFQUFDLFFBQVEsRUFBRSxrQkFBa0IsRUFBQyxDQUFDLEVBQUU7OztZQWJqRixRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxrQkFBa0IsQ0FBQztnQkFDOUQsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQztnQkFDckMsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUN2QixlQUFlLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQzthQUN0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7TmdiSGlnaGxpZ2h0fSBmcm9tICcuL2hpZ2hsaWdodCc7XHJcbmltcG9ydCB7TmdiVHlwZWFoZWFkV2luZG93fSBmcm9tICcuL3R5cGVhaGVhZC13aW5kb3cnO1xyXG5pbXBvcnQge05nYlR5cGVhaGVhZH0gZnJvbSAnLi90eXBlYWhlYWQnO1xyXG5cclxuZXhwb3J0IHtOZ2JIaWdobGlnaHR9IGZyb20gJy4vaGlnaGxpZ2h0JztcclxuZXhwb3J0IHtOZ2JUeXBlYWhlYWRXaW5kb3d9IGZyb20gJy4vdHlwZWFoZWFkLXdpbmRvdyc7XHJcbmV4cG9ydCB7TmdiVHlwZWFoZWFkQ29uZmlnfSBmcm9tICcuL3R5cGVhaGVhZC1jb25maWcnO1xyXG5leHBvcnQge05nYlR5cGVhaGVhZCwgTmdiVHlwZWFoZWFkU2VsZWN0SXRlbUV2ZW50fSBmcm9tICcuL3R5cGVhaGVhZCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGRlY2xhcmF0aW9uczogW05nYlR5cGVhaGVhZCwgTmdiSGlnaGxpZ2h0LCBOZ2JUeXBlYWhlYWRXaW5kb3ddLFxyXG4gIGV4cG9ydHM6IFtOZ2JUeXBlYWhlYWQsIE5nYkhpZ2hsaWdodF0sXHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbTmdiVHlwZWFoZWFkV2luZG93XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiVHlwZWFoZWFkTW9kdWxlIHtcclxuICAvKipcclxuICAgKiBJbXBvcnRpbmcgd2l0aCAnLmZvclJvb3QoKScgaXMgbm8gbG9uZ2VyIG5lY2Vzc2FyeSwgeW91IGNhbiBzaW1wbHkgaW1wb3J0IHRoZSBtb2R1bGUuXHJcbiAgICogV2lsbCBiZSByZW1vdmVkIGluIDQuMC4wLlxyXG4gICAqXHJcbiAgICogQGRlcHJlY2F0ZWQgMy4wLjBcclxuICAgKi9cclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHsgcmV0dXJuIHtuZ01vZHVsZTogTmdiVHlwZWFoZWFkTW9kdWxlfTsgfVxyXG59XHJcbiJdfQ==