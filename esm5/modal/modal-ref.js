/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * A reference to an active (currently opened) modal. Instances of this class
 * can be injected into components passed as modal content.
 */
var /**
 * A reference to an active (currently opened) modal. Instances of this class
 * can be injected into components passed as modal content.
 */
NgbActiveModal = /** @class */ (function () {
    function NgbActiveModal() {
    }
    /**
     * Can be used to close a modal, passing an optional result.
     */
    /**
     * Can be used to close a modal, passing an optional result.
     * @param {?=} result
     * @return {?}
     */
    NgbActiveModal.prototype.close = /**
     * Can be used to close a modal, passing an optional result.
     * @param {?=} result
     * @return {?}
     */
    function (result) { };
    /**
     * Can be used to dismiss a modal, passing an optional reason.
     */
    /**
     * Can be used to dismiss a modal, passing an optional reason.
     * @param {?=} reason
     * @return {?}
     */
    NgbActiveModal.prototype.dismiss = /**
     * Can be used to dismiss a modal, passing an optional reason.
     * @param {?=} reason
     * @return {?}
     */
    function (reason) { };
    return NgbActiveModal;
}());
/**
 * A reference to an active (currently opened) modal. Instances of this class
 * can be injected into components passed as modal content.
 */
export { NgbActiveModal };
/**
 * A reference to a newly opened modal.
 */
var /**
 * A reference to a newly opened modal.
 */
NgbModalRef = /** @class */ (function () {
    function NgbModalRef(_windowCmptRef, _contentRef, _backdropCmptRef, _beforeDismiss) {
        var _this = this;
        this._windowCmptRef = _windowCmptRef;
        this._contentRef = _contentRef;
        this._backdropCmptRef = _backdropCmptRef;
        this._beforeDismiss = _beforeDismiss;
        _windowCmptRef.instance.dismissEvent.subscribe(function (reason) { _this.dismiss(reason); });
        this.result = new Promise(function (resolve, reject) {
            _this._resolve = resolve;
            _this._reject = reject;
        });
        this.result.then(null, function () { });
    }
    Object.defineProperty(NgbModalRef.prototype, "componentInstance", {
        /**
         * The instance of component used as modal's content.
         * Undefined when a TemplateRef is used as modal's content.
         */
        get: /**
         * The instance of component used as modal's content.
         * Undefined when a TemplateRef is used as modal's content.
         * @return {?}
         */
        function () {
            if (this._contentRef.componentRef) {
                return this._contentRef.componentRef.instance;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Can be used to close a modal, passing an optional result.
     */
    /**
     * Can be used to close a modal, passing an optional result.
     * @param {?=} result
     * @return {?}
     */
    NgbModalRef.prototype.close = /**
     * Can be used to close a modal, passing an optional result.
     * @param {?=} result
     * @return {?}
     */
    function (result) {
        if (this._windowCmptRef) {
            this._resolve(result);
            this._removeModalElements();
        }
    };
    /**
     * @param {?=} reason
     * @return {?}
     */
    NgbModalRef.prototype._dismiss = /**
     * @param {?=} reason
     * @return {?}
     */
    function (reason) {
        this._reject(reason);
        this._removeModalElements();
    };
    /**
     * Can be used to dismiss a modal, passing an optional reason.
     */
    /**
     * Can be used to dismiss a modal, passing an optional reason.
     * @param {?=} reason
     * @return {?}
     */
    NgbModalRef.prototype.dismiss = /**
     * Can be used to dismiss a modal, passing an optional reason.
     * @param {?=} reason
     * @return {?}
     */
    function (reason) {
        var _this = this;
        if (this._windowCmptRef) {
            if (!this._beforeDismiss) {
                this._dismiss(reason);
            }
            else {
                /** @type {?} */
                var dismiss = this._beforeDismiss();
                if (dismiss && dismiss.then) {
                    dismiss.then(function (result) {
                        if (result !== false) {
                            _this._dismiss(reason);
                        }
                    }, function () { });
                }
                else if (dismiss !== false) {
                    this._dismiss(reason);
                }
            }
        }
    };
    /**
     * @return {?}
     */
    NgbModalRef.prototype._removeModalElements = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var windowNativeEl = this._windowCmptRef.location.nativeElement;
        windowNativeEl.parentNode.removeChild(windowNativeEl);
        this._windowCmptRef.destroy();
        if (this._backdropCmptRef) {
            /** @type {?} */
            var backdropNativeEl = this._backdropCmptRef.location.nativeElement;
            backdropNativeEl.parentNode.removeChild(backdropNativeEl);
            this._backdropCmptRef.destroy();
        }
        if (this._contentRef && this._contentRef.viewRef) {
            this._contentRef.viewRef.destroy();
        }
        this._windowCmptRef = null;
        this._backdropCmptRef = null;
        this._contentRef = null;
    };
    return NgbModalRef;
}());
/**
 * A reference to a newly opened modal.
 */
export { NgbModalRef };
if (false) {
    /** @type {?} */
    NgbModalRef.prototype._resolve;
    /** @type {?} */
    NgbModalRef.prototype._reject;
    /**
     * A promise that is resolved when a modal is closed and rejected when a modal is dismissed.
     * @type {?}
     */
    NgbModalRef.prototype.result;
    /** @type {?} */
    NgbModalRef.prototype._windowCmptRef;
    /** @type {?} */
    NgbModalRef.prototype._contentRef;
    /** @type {?} */
    NgbModalRef.prototype._backdropCmptRef;
    /** @type {?} */
    NgbModalRef.prototype._beforeDismiss;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtcmVmLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJtb2RhbC9tb2RhbC1yZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFXQTs7OztBQUFBOzs7SUFDRTs7T0FFRzs7Ozs7O0lBQ0gsOEJBQUs7Ozs7O0lBQUwsVUFBTSxNQUFZLEtBQVU7SUFFNUI7O09BRUc7Ozs7OztJQUNILGdDQUFPOzs7OztJQUFQLFVBQVEsTUFBWSxLQUFVO3lCQXBCaEM7SUFxQkMsQ0FBQTs7Ozs7QUFWRCwwQkFVQzs7OztBQUtEOzs7QUFBQTtJQW1CRSxxQkFDWSxnQkFBc0QsV0FBdUIsRUFDN0Usa0JBQTJELGNBQXlCO1FBRmhHLGlCQVVDO1FBVFcsbUJBQWMsR0FBZCxjQUFjO1FBQXdDLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQzdFLHFCQUFnQixHQUFoQixnQkFBZ0I7UUFBMkMsbUJBQWMsR0FBZCxjQUFjLENBQVc7UUFDOUYsY0FBYyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQUMsTUFBVyxJQUFPLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFM0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3hDLEtBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1lBQ3hCLEtBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1NBQ3ZCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxlQUFRLENBQUMsQ0FBQztLQUNsQztJQXJCRCxzQkFBSSwwQ0FBaUI7UUFKckI7OztXQUdHOzs7Ozs7UUFDSDtZQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQzthQUMvQztTQUNGOzs7T0FBQTtJQW1CRDs7T0FFRzs7Ozs7O0lBQ0gsMkJBQUs7Ozs7O0lBQUwsVUFBTSxNQUFZO1FBQ2hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7U0FDN0I7S0FDRjs7Ozs7SUFFTyw4QkFBUTs7OztjQUFDLE1BQVk7UUFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQzs7SUFHOUI7O09BRUc7Ozs7OztJQUNILDZCQUFPOzs7OztJQUFQLFVBQVEsTUFBWTtRQUFwQixpQkFtQkM7UUFsQkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN2QjtZQUFDLElBQUksQ0FBQyxDQUFDOztnQkFDTixJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3RDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDNUIsT0FBTyxDQUFDLElBQUksQ0FDUixVQUFBLE1BQU07d0JBQ0osRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7NEJBQ3JCLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7eUJBQ3ZCO3FCQUNGLEVBQ0QsZUFBUSxDQUFDLENBQUM7aUJBQ2Y7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUN2QjthQUNGO1NBQ0Y7S0FDRjs7OztJQUVPLDBDQUFvQjs7Ozs7UUFDMUIsSUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO1FBQ2xFLGNBQWMsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQzs7WUFDMUIsSUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztZQUN0RSxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2pDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDcEM7UUFFRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDOztzQkFqSDVCO0lBbUhDLENBQUE7Ozs7QUF6RkQsdUJBeUZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnRSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtOZ2JNb2RhbEJhY2tkcm9wfSBmcm9tICcuL21vZGFsLWJhY2tkcm9wJztcclxuaW1wb3J0IHtOZ2JNb2RhbFdpbmRvd30gZnJvbSAnLi9tb2RhbC13aW5kb3cnO1xyXG5cclxuaW1wb3J0IHtDb250ZW50UmVmfSBmcm9tICcuLi91dGlsL3BvcHVwJztcclxuXHJcbi8qKlxyXG4gKiBBIHJlZmVyZW5jZSB0byBhbiBhY3RpdmUgKGN1cnJlbnRseSBvcGVuZWQpIG1vZGFsLiBJbnN0YW5jZXMgb2YgdGhpcyBjbGFzc1xyXG4gKiBjYW4gYmUgaW5qZWN0ZWQgaW50byBjb21wb25lbnRzIHBhc3NlZCBhcyBtb2RhbCBjb250ZW50LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE5nYkFjdGl2ZU1vZGFsIHtcclxuICAvKipcclxuICAgKiBDYW4gYmUgdXNlZCB0byBjbG9zZSBhIG1vZGFsLCBwYXNzaW5nIGFuIG9wdGlvbmFsIHJlc3VsdC5cclxuICAgKi9cclxuICBjbG9zZShyZXN1bHQ/OiBhbnkpOiB2b2lkIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbiBiZSB1c2VkIHRvIGRpc21pc3MgYSBtb2RhbCwgcGFzc2luZyBhbiBvcHRpb25hbCByZWFzb24uXHJcbiAgICovXHJcbiAgZGlzbWlzcyhyZWFzb24/OiBhbnkpOiB2b2lkIHt9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIHJlZmVyZW5jZSB0byBhIG5ld2x5IG9wZW5lZCBtb2RhbC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBOZ2JNb2RhbFJlZiB7XHJcbiAgcHJpdmF0ZSBfcmVzb2x2ZTogKHJlc3VsdD86IGFueSkgPT4gdm9pZDtcclxuICBwcml2YXRlIF9yZWplY3Q6IChyZWFzb24/OiBhbnkpID0+IHZvaWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBpbnN0YW5jZSBvZiBjb21wb25lbnQgdXNlZCBhcyBtb2RhbCdzIGNvbnRlbnQuXHJcbiAgICogVW5kZWZpbmVkIHdoZW4gYSBUZW1wbGF0ZVJlZiBpcyB1c2VkIGFzIG1vZGFsJ3MgY29udGVudC5cclxuICAgKi9cclxuICBnZXQgY29tcG9uZW50SW5zdGFuY2UoKTogYW55IHtcclxuICAgIGlmICh0aGlzLl9jb250ZW50UmVmLmNvbXBvbmVudFJlZikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fY29udGVudFJlZi5jb21wb25lbnRSZWYuaW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBIHByb21pc2UgdGhhdCBpcyByZXNvbHZlZCB3aGVuIGEgbW9kYWwgaXMgY2xvc2VkIGFuZCByZWplY3RlZCB3aGVuIGEgbW9kYWwgaXMgZGlzbWlzc2VkLlxyXG4gICAqL1xyXG4gIHJlc3VsdDogUHJvbWlzZTxhbnk+O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgcHJpdmF0ZSBfd2luZG93Q21wdFJlZjogQ29tcG9uZW50UmVmPE5nYk1vZGFsV2luZG93PiwgcHJpdmF0ZSBfY29udGVudFJlZjogQ29udGVudFJlZixcclxuICAgICAgcHJpdmF0ZSBfYmFja2Ryb3BDbXB0UmVmPzogQ29tcG9uZW50UmVmPE5nYk1vZGFsQmFja2Ryb3A+LCBwcml2YXRlIF9iZWZvcmVEaXNtaXNzPzogRnVuY3Rpb24pIHtcclxuICAgIF93aW5kb3dDbXB0UmVmLmluc3RhbmNlLmRpc21pc3NFdmVudC5zdWJzY3JpYmUoKHJlYXNvbjogYW55KSA9PiB7IHRoaXMuZGlzbWlzcyhyZWFzb24pOyB9KTtcclxuXHJcbiAgICB0aGlzLnJlc3VsdCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdGhpcy5fcmVzb2x2ZSA9IHJlc29sdmU7XHJcbiAgICAgIHRoaXMuX3JlamVjdCA9IHJlamVjdDtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5yZXN1bHQudGhlbihudWxsLCAoKSA9PiB7fSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYW4gYmUgdXNlZCB0byBjbG9zZSBhIG1vZGFsLCBwYXNzaW5nIGFuIG9wdGlvbmFsIHJlc3VsdC5cclxuICAgKi9cclxuICBjbG9zZShyZXN1bHQ/OiBhbnkpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl93aW5kb3dDbXB0UmVmKSB7XHJcbiAgICAgIHRoaXMuX3Jlc29sdmUocmVzdWx0KTtcclxuICAgICAgdGhpcy5fcmVtb3ZlTW9kYWxFbGVtZW50cygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZGlzbWlzcyhyZWFzb24/OiBhbnkpIHtcclxuICAgIHRoaXMuX3JlamVjdChyZWFzb24pO1xyXG4gICAgdGhpcy5fcmVtb3ZlTW9kYWxFbGVtZW50cygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FuIGJlIHVzZWQgdG8gZGlzbWlzcyBhIG1vZGFsLCBwYXNzaW5nIGFuIG9wdGlvbmFsIHJlYXNvbi5cclxuICAgKi9cclxuICBkaXNtaXNzKHJlYXNvbj86IGFueSk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX3dpbmRvd0NtcHRSZWYpIHtcclxuICAgICAgaWYgKCF0aGlzLl9iZWZvcmVEaXNtaXNzKSB7XHJcbiAgICAgICAgdGhpcy5fZGlzbWlzcyhyZWFzb24pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGRpc21pc3MgPSB0aGlzLl9iZWZvcmVEaXNtaXNzKCk7XHJcbiAgICAgICAgaWYgKGRpc21pc3MgJiYgZGlzbWlzcy50aGVuKSB7XHJcbiAgICAgICAgICBkaXNtaXNzLnRoZW4oXHJcbiAgICAgICAgICAgICAgcmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuX2Rpc21pc3MocmVhc29uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICgpID0+IHt9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRpc21pc3MgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICB0aGlzLl9kaXNtaXNzKHJlYXNvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9yZW1vdmVNb2RhbEVsZW1lbnRzKCkge1xyXG4gICAgY29uc3Qgd2luZG93TmF0aXZlRWwgPSB0aGlzLl93aW5kb3dDbXB0UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB3aW5kb3dOYXRpdmVFbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHdpbmRvd05hdGl2ZUVsKTtcclxuICAgIHRoaXMuX3dpbmRvd0NtcHRSZWYuZGVzdHJveSgpO1xyXG5cclxuICAgIGlmICh0aGlzLl9iYWNrZHJvcENtcHRSZWYpIHtcclxuICAgICAgY29uc3QgYmFja2Ryb3BOYXRpdmVFbCA9IHRoaXMuX2JhY2tkcm9wQ21wdFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50O1xyXG4gICAgICBiYWNrZHJvcE5hdGl2ZUVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYmFja2Ryb3BOYXRpdmVFbCk7XHJcbiAgICAgIHRoaXMuX2JhY2tkcm9wQ21wdFJlZi5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX2NvbnRlbnRSZWYgJiYgdGhpcy5fY29udGVudFJlZi52aWV3UmVmKSB7XHJcbiAgICAgIHRoaXMuX2NvbnRlbnRSZWYudmlld1JlZi5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fd2luZG93Q21wdFJlZiA9IG51bGw7XHJcbiAgICB0aGlzLl9iYWNrZHJvcENtcHRSZWYgPSBudWxsO1xyXG4gICAgdGhpcy5fY29udGVudFJlZiA9IG51bGw7XHJcbiAgfVxyXG59XHJcbiJdfQ==