/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { TemplateRef } from '@angular/core';
export class ContentRef {
    /**
     * @param {?} nodes
     * @param {?=} viewRef
     * @param {?=} componentRef
     */
    constructor(nodes, viewRef, componentRef) {
        this.nodes = nodes;
        this.viewRef = viewRef;
        this.componentRef = componentRef;
    }
}
if (false) {
    /** @type {?} */
    ContentRef.prototype.nodes;
    /** @type {?} */
    ContentRef.prototype.viewRef;
    /** @type {?} */
    ContentRef.prototype.componentRef;
}
/**
 * @template T
 */
export class PopupService {
    /**
     * @param {?} _type
     * @param {?} _injector
     * @param {?} _viewContainerRef
     * @param {?} _renderer
     * @param {?} _componentFactoryResolver
     */
    constructor(_type, _injector, _viewContainerRef, _renderer, _componentFactoryResolver) {
        this._type = _type;
        this._injector = _injector;
        this._viewContainerRef = _viewContainerRef;
        this._renderer = _renderer;
        this._componentFactoryResolver = _componentFactoryResolver;
    }
    /**
     * @param {?=} content
     * @param {?=} context
     * @return {?}
     */
    open(content, context) {
        if (!this._windowRef) {
            this._contentRef = this._getContentRef(content, context);
            this._windowRef = this._viewContainerRef.createComponent(this._componentFactoryResolver.resolveComponentFactory(this._type), 0, this._injector, this._contentRef.nodes);
        }
        return this._windowRef;
    }
    /**
     * @return {?}
     */
    close() {
        if (this._windowRef) {
            this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._windowRef.hostView));
            this._windowRef = null;
            if (this._contentRef.viewRef) {
                this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._contentRef.viewRef));
                this._contentRef = null;
            }
        }
    }
    /**
     * @param {?} content
     * @param {?=} context
     * @return {?}
     */
    _getContentRef(content, context) {
        if (!content) {
            return new ContentRef([]);
        }
        else if (content instanceof TemplateRef) {
            /** @type {?} */
            const viewRef = this._viewContainerRef.createEmbeddedView(/** @type {?} */ (content), context);
            return new ContentRef([viewRef.rootNodes], viewRef);
        }
        else {
            return new ContentRef([[this._renderer.createText(`${content}`)]]);
        }
    }
}
if (false) {
    /** @type {?} */
    PopupService.prototype._windowRef;
    /** @type {?} */
    PopupService.prototype._contentRef;
    /** @type {?} */
    PopupService.prototype._type;
    /** @type {?} */
    PopupService.prototype._injector;
    /** @type {?} */
    PopupService.prototype._viewContainerRef;
    /** @type {?} */
    PopupService.prototype._renderer;
    /** @type {?} */
    PopupService.prototype._componentFactoryResolver;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbInV0aWwvcG9wdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFTCxXQUFXLEVBTVosTUFBTSxlQUFlLENBQUM7QUFFdkIsTUFBTTs7Ozs7O0lBQ0osWUFBbUIsS0FBWSxFQUFTLE9BQWlCLEVBQVMsWUFBZ0M7UUFBL0UsVUFBSyxHQUFMLEtBQUssQ0FBTztRQUFTLFlBQU8sR0FBUCxPQUFPLENBQVU7UUFBUyxpQkFBWSxHQUFaLFlBQVksQ0FBb0I7S0FBSTtDQUN2Rzs7Ozs7Ozs7Ozs7O0FBRUQsTUFBTTs7Ozs7Ozs7SUFJSixZQUNZLE9BQW9CLFNBQW1CLEVBQVUsaUJBQW1DLEVBQ3BGLFdBQThCLHlCQUFtRDtRQURqRixVQUFLLEdBQUwsS0FBSztRQUFlLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ3BGLGNBQVMsR0FBVCxTQUFTO1FBQXFCLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBMEI7S0FBSTs7Ozs7O0lBRWpHLElBQUksQ0FBQyxPQUFtQyxFQUFFLE9BQWE7UUFDckQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FDcEQsSUFBSSxDQUFDLHlCQUF5QixDQUFDLHVCQUF1QixDQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFDeEYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QjtRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0tBQ3hCOzs7O0lBRUQsS0FBSztRQUNILEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDeEYsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFFdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUN4RixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQzthQUN6QjtTQUNGO0tBQ0Y7Ozs7OztJQUVPLGNBQWMsQ0FBQyxPQUFrQyxFQUFFLE9BQWE7UUFDdEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2IsTUFBTSxDQUFDLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzNCO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sWUFBWSxXQUFXLENBQUMsQ0FBQyxDQUFDOztZQUMxQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLG1CQUFpQixPQUFPLEdBQUUsT0FBTyxDQUFDLENBQUM7WUFDNUYsTUFBTSxDQUFDLElBQUksVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3JEO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwRTs7Q0FFSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgSW5qZWN0b3IsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgVmlld1JlZixcclxuICBWaWV3Q29udGFpbmVyUmVmLFxyXG4gIFJlbmRlcmVyMixcclxuICBDb21wb25lbnRSZWYsXHJcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29udGVudFJlZiB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIG5vZGVzOiBhbnlbXSwgcHVibGljIHZpZXdSZWY/OiBWaWV3UmVmLCBwdWJsaWMgY29tcG9uZW50UmVmPzogQ29tcG9uZW50UmVmPGFueT4pIHt9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQb3B1cFNlcnZpY2U8VD4ge1xyXG4gIHByaXZhdGUgX3dpbmRvd1JlZjogQ29tcG9uZW50UmVmPFQ+O1xyXG4gIHByaXZhdGUgX2NvbnRlbnRSZWY6IENvbnRlbnRSZWY7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcml2YXRlIF90eXBlOiBhbnksIHByaXZhdGUgX2luamVjdG9yOiBJbmplY3RvciwgcHJpdmF0ZSBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcclxuICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBfY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHt9XHJcblxyXG4gIG9wZW4oY29udGVudD86IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4sIGNvbnRleHQ/OiBhbnkpOiBDb21wb25lbnRSZWY8VD4ge1xyXG4gICAgaWYgKCF0aGlzLl93aW5kb3dSZWYpIHtcclxuICAgICAgdGhpcy5fY29udGVudFJlZiA9IHRoaXMuX2dldENvbnRlbnRSZWYoY29udGVudCwgY29udGV4dCk7XHJcbiAgICAgIHRoaXMuX3dpbmRvd1JlZiA9IHRoaXMuX3ZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KFxyXG4gICAgICAgICAgdGhpcy5fY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5PFQ+KHRoaXMuX3R5cGUpLCAwLCB0aGlzLl9pbmplY3RvcixcclxuICAgICAgICAgIHRoaXMuX2NvbnRlbnRSZWYubm9kZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLl93aW5kb3dSZWY7XHJcbiAgfVxyXG5cclxuICBjbG9zZSgpIHtcclxuICAgIGlmICh0aGlzLl93aW5kb3dSZWYpIHtcclxuICAgICAgdGhpcy5fdmlld0NvbnRhaW5lclJlZi5yZW1vdmUodGhpcy5fdmlld0NvbnRhaW5lclJlZi5pbmRleE9mKHRoaXMuX3dpbmRvd1JlZi5ob3N0VmlldykpO1xyXG4gICAgICB0aGlzLl93aW5kb3dSZWYgPSBudWxsO1xyXG5cclxuICAgICAgaWYgKHRoaXMuX2NvbnRlbnRSZWYudmlld1JlZikge1xyXG4gICAgICAgIHRoaXMuX3ZpZXdDb250YWluZXJSZWYucmVtb3ZlKHRoaXMuX3ZpZXdDb250YWluZXJSZWYuaW5kZXhPZih0aGlzLl9jb250ZW50UmVmLnZpZXdSZWYpKTtcclxuICAgICAgICB0aGlzLl9jb250ZW50UmVmID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZ2V0Q29udGVudFJlZihjb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+LCBjb250ZXh0PzogYW55KTogQ29udGVudFJlZiB7XHJcbiAgICBpZiAoIWNvbnRlbnQpIHtcclxuICAgICAgcmV0dXJuIG5ldyBDb250ZW50UmVmKFtdKTtcclxuICAgIH0gZWxzZSBpZiAoY29udGVudCBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKSB7XHJcbiAgICAgIGNvbnN0IHZpZXdSZWYgPSB0aGlzLl92aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyg8VGVtcGxhdGVSZWY8VD4+Y29udGVudCwgY29udGV4dCk7XHJcbiAgICAgIHJldHVybiBuZXcgQ29udGVudFJlZihbdmlld1JlZi5yb290Tm9kZXNdLCB2aWV3UmVmKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBuZXcgQ29udGVudFJlZihbW3RoaXMuX3JlbmRlcmVyLmNyZWF0ZVRleHQoYCR7Y29udGVudH1gKV1dKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19