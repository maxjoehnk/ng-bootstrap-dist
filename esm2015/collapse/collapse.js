/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Input } from '@angular/core';
/**
 * The NgbCollapse directive provides a simple way to hide and show an element with animations.
 */
export class NgbCollapse {
    constructor() {
        /**
         * A flag indicating collapsed (true) or open (false) state.
         */
        this.collapsed = false;
    }
}
NgbCollapse.decorators = [
    { type: Directive, args: [{
                selector: '[ngbCollapse]',
                exportAs: 'ngbCollapse',
                host: { '[class.collapse]': 'true', '[class.show]': '!collapsed' }
            },] },
];
NgbCollapse.propDecorators = {
    collapsed: [{ type: Input, args: ['ngbCollapse',] }]
};
if (false) {
    /**
     * A flag indicating collapsed (true) or open (false) state.
     * @type {?}
     */
    NgbCollapse.prototype.collapsed;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImNvbGxhcHNlL2NvbGxhcHNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQzs7OztBQVUvQyxNQUFNOzs7Ozt5QkFJOEIsS0FBSzs7OztZQVR4QyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRSxhQUFhO2dCQUN2QixJQUFJLEVBQUUsRUFBQyxrQkFBa0IsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBQzthQUNqRTs7O3dCQUtFLEtBQUssU0FBQyxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgTmdiQ29sbGFwc2UgZGlyZWN0aXZlIHByb3ZpZGVzIGEgc2ltcGxlIHdheSB0byBoaWRlIGFuZCBzaG93IGFuIGVsZW1lbnQgd2l0aCBhbmltYXRpb25zLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbmdiQ29sbGFwc2VdJyxcclxuICBleHBvcnRBczogJ25nYkNvbGxhcHNlJyxcclxuICBob3N0OiB7J1tjbGFzcy5jb2xsYXBzZV0nOiAndHJ1ZScsICdbY2xhc3Muc2hvd10nOiAnIWNvbGxhcHNlZCd9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JDb2xsYXBzZSB7XHJcbiAgLyoqXHJcbiAgICogQSBmbGFnIGluZGljYXRpbmcgY29sbGFwc2VkICh0cnVlKSBvciBvcGVuIChmYWxzZSkgc3RhdGUuXHJcbiAgICovXHJcbiAgQElucHV0KCduZ2JDb2xsYXBzZScpIGNvbGxhcHNlZCA9IGZhbHNlO1xyXG59XHJcbiJdfQ==