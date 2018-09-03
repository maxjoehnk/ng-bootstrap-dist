/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * A reference to an active (currently opened) modal. Instances of this class
 * can be injected into components passed as modal content.
 */
export class NgbActiveModal {
    /**
     * Can be used to close a modal, passing an optional result.
     * @param {?=} result
     * @return {?}
     */
    close(result) { }
    /**
     * Can be used to dismiss a modal, passing an optional reason.
     * @param {?=} reason
     * @return {?}
     */
    dismiss(reason) { }
}
/**
 * A reference to a newly opened modal.
 */
export class NgbModalRef {
    /**
     * @param {?} _windowCmptRef
     * @param {?} _contentRef
     * @param {?=} _backdropCmptRef
     * @param {?=} _beforeDismiss
     */
    constructor(_windowCmptRef, _contentRef, _backdropCmptRef, _beforeDismiss) {
        this._windowCmptRef = _windowCmptRef;
        this._contentRef = _contentRef;
        this._backdropCmptRef = _backdropCmptRef;
        this._beforeDismiss = _beforeDismiss;
        _windowCmptRef.instance.dismissEvent.subscribe((reason) => { this.dismiss(reason); });
        this.result = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
        this.result.then(null, () => { });
    }
    /**
     * The instance of component used as modal's content.
     * Undefined when a TemplateRef is used as modal's content.
     * @return {?}
     */
    get componentInstance() {
        if (this._contentRef.componentRef) {
            return this._contentRef.componentRef.instance;
        }
    }
    /**
     * Can be used to close a modal, passing an optional result.
     * @param {?=} result
     * @return {?}
     */
    close(result) {
        if (this._windowCmptRef) {
            this._resolve(result);
            this._removeModalElements();
        }
    }
    /**
     * @param {?=} reason
     * @return {?}
     */
    _dismiss(reason) {
        this._reject(reason);
        this._removeModalElements();
    }
    /**
     * Can be used to dismiss a modal, passing an optional reason.
     * @param {?=} reason
     * @return {?}
     */
    dismiss(reason) {
        if (this._windowCmptRef) {
            if (!this._beforeDismiss) {
                this._dismiss(reason);
            }
            else {
                /** @type {?} */
                const dismiss = this._beforeDismiss();
                if (dismiss && dismiss.then) {
                    dismiss.then(result => {
                        if (result !== false) {
                            this._dismiss(reason);
                        }
                    }, () => { });
                }
                else if (dismiss !== false) {
                    this._dismiss(reason);
                }
            }
        }
    }
    /**
     * @return {?}
     */
    _removeModalElements() {
        /** @type {?} */
        const windowNativeEl = this._windowCmptRef.location.nativeElement;
        windowNativeEl.parentNode.removeChild(windowNativeEl);
        this._windowCmptRef.destroy();
        if (this._backdropCmptRef) {
            /** @type {?} */
            const backdropNativeEl = this._backdropCmptRef.location.nativeElement;
            backdropNativeEl.parentNode.removeChild(backdropNativeEl);
            this._backdropCmptRef.destroy();
        }
        if (this._contentRef && this._contentRef.viewRef) {
            this._contentRef.viewRef.destroy();
        }
        this._windowCmptRef = null;
        this._backdropCmptRef = null;
        this._contentRef = null;
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtcmVmLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJtb2RhbC9tb2RhbC1yZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFXQSxNQUFNOzs7Ozs7SUFJSixLQUFLLENBQUMsTUFBWSxLQUFVOzs7Ozs7SUFLNUIsT0FBTyxDQUFDLE1BQVksS0FBVTtDQUMvQjs7OztBQUtELE1BQU07Ozs7Ozs7SUFtQkosWUFDWSxnQkFBc0QsV0FBdUIsRUFDN0Usa0JBQTJELGNBQXlCO1FBRHBGLG1CQUFjLEdBQWQsY0FBYztRQUF3QyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUM3RSxxQkFBZ0IsR0FBaEIsZ0JBQWdCO1FBQTJDLG1CQUFjLEdBQWQsY0FBYyxDQUFXO1FBQzlGLGNBQWMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQVcsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUUzRixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzVDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1NBQ3ZCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBRyxDQUFDLENBQUM7S0FDbEM7Ozs7OztJQXJCRCxJQUFJLGlCQUFpQjtRQUNuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQztTQUMvQztLQUNGOzs7Ozs7SUFzQkQsS0FBSyxDQUFDLE1BQVk7UUFDaEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztTQUM3QjtLQUNGOzs7OztJQUVPLFFBQVEsQ0FBQyxNQUFZO1FBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7Ozs7Ozs7SUFNOUIsT0FBTyxDQUFDLE1BQVk7UUFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN2QjtZQUFDLElBQUksQ0FBQyxDQUFDOztnQkFDTixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3RDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDNUIsT0FBTyxDQUFDLElBQUksQ0FDUixNQUFNLENBQUMsRUFBRTt3QkFDUCxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQzs0QkFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQzt5QkFDdkI7cUJBQ0YsRUFDRCxHQUFHLEVBQUUsSUFBRyxDQUFDLENBQUM7aUJBQ2Y7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUN2QjthQUNGO1NBQ0Y7S0FDRjs7OztJQUVPLG9CQUFvQjs7UUFDMUIsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO1FBQ2xFLGNBQWMsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQzs7WUFDMUIsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztZQUN0RSxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2pDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDcEM7UUFFRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDOztDQUUzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50UmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7TmdiTW9kYWxCYWNrZHJvcH0gZnJvbSAnLi9tb2RhbC1iYWNrZHJvcCc7XHJcbmltcG9ydCB7TmdiTW9kYWxXaW5kb3d9IGZyb20gJy4vbW9kYWwtd2luZG93JztcclxuXHJcbmltcG9ydCB7Q29udGVudFJlZn0gZnJvbSAnLi4vdXRpbC9wb3B1cCc7XHJcblxyXG4vKipcclxuICogQSByZWZlcmVuY2UgdG8gYW4gYWN0aXZlIChjdXJyZW50bHkgb3BlbmVkKSBtb2RhbC4gSW5zdGFuY2VzIG9mIHRoaXMgY2xhc3NcclxuICogY2FuIGJlIGluamVjdGVkIGludG8gY29tcG9uZW50cyBwYXNzZWQgYXMgbW9kYWwgY29udGVudC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBOZ2JBY3RpdmVNb2RhbCB7XHJcbiAgLyoqXHJcbiAgICogQ2FuIGJlIHVzZWQgdG8gY2xvc2UgYSBtb2RhbCwgcGFzc2luZyBhbiBvcHRpb25hbCByZXN1bHQuXHJcbiAgICovXHJcbiAgY2xvc2UocmVzdWx0PzogYW55KTogdm9pZCB7fVxyXG5cclxuICAvKipcclxuICAgKiBDYW4gYmUgdXNlZCB0byBkaXNtaXNzIGEgbW9kYWwsIHBhc3NpbmcgYW4gb3B0aW9uYWwgcmVhc29uLlxyXG4gICAqL1xyXG4gIGRpc21pc3MocmVhc29uPzogYW55KTogdm9pZCB7fVxyXG59XHJcblxyXG4vKipcclxuICogQSByZWZlcmVuY2UgdG8gYSBuZXdseSBvcGVuZWQgbW9kYWwuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTmdiTW9kYWxSZWYge1xyXG4gIHByaXZhdGUgX3Jlc29sdmU6IChyZXN1bHQ/OiBhbnkpID0+IHZvaWQ7XHJcbiAgcHJpdmF0ZSBfcmVqZWN0OiAocmVhc29uPzogYW55KSA9PiB2b2lkO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgaW5zdGFuY2Ugb2YgY29tcG9uZW50IHVzZWQgYXMgbW9kYWwncyBjb250ZW50LlxyXG4gICAqIFVuZGVmaW5lZCB3aGVuIGEgVGVtcGxhdGVSZWYgaXMgdXNlZCBhcyBtb2RhbCdzIGNvbnRlbnQuXHJcbiAgICovXHJcbiAgZ2V0IGNvbXBvbmVudEluc3RhbmNlKCk6IGFueSB7XHJcbiAgICBpZiAodGhpcy5fY29udGVudFJlZi5jb21wb25lbnRSZWYpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2NvbnRlbnRSZWYuY29tcG9uZW50UmVmLmluc3RhbmNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQSBwcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgd2hlbiBhIG1vZGFsIGlzIGNsb3NlZCBhbmQgcmVqZWN0ZWQgd2hlbiBhIG1vZGFsIGlzIGRpc21pc3NlZC5cclxuICAgKi9cclxuICByZXN1bHQ6IFByb21pc2U8YW55PjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgIHByaXZhdGUgX3dpbmRvd0NtcHRSZWY6IENvbXBvbmVudFJlZjxOZ2JNb2RhbFdpbmRvdz4sIHByaXZhdGUgX2NvbnRlbnRSZWY6IENvbnRlbnRSZWYsXHJcbiAgICAgIHByaXZhdGUgX2JhY2tkcm9wQ21wdFJlZj86IENvbXBvbmVudFJlZjxOZ2JNb2RhbEJhY2tkcm9wPiwgcHJpdmF0ZSBfYmVmb3JlRGlzbWlzcz86IEZ1bmN0aW9uKSB7XHJcbiAgICBfd2luZG93Q21wdFJlZi5pbnN0YW5jZS5kaXNtaXNzRXZlbnQuc3Vic2NyaWJlKChyZWFzb246IGFueSkgPT4geyB0aGlzLmRpc21pc3MocmVhc29uKTsgfSk7XHJcblxyXG4gICAgdGhpcy5yZXN1bHQgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMuX3Jlc29sdmUgPSByZXNvbHZlO1xyXG4gICAgICB0aGlzLl9yZWplY3QgPSByZWplY3Q7XHJcbiAgICB9KTtcclxuICAgIHRoaXMucmVzdWx0LnRoZW4obnVsbCwgKCkgPT4ge30pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FuIGJlIHVzZWQgdG8gY2xvc2UgYSBtb2RhbCwgcGFzc2luZyBhbiBvcHRpb25hbCByZXN1bHQuXHJcbiAgICovXHJcbiAgY2xvc2UocmVzdWx0PzogYW55KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fd2luZG93Q21wdFJlZikge1xyXG4gICAgICB0aGlzLl9yZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgIHRoaXMuX3JlbW92ZU1vZGFsRWxlbWVudHMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2Rpc21pc3MocmVhc29uPzogYW55KSB7XHJcbiAgICB0aGlzLl9yZWplY3QocmVhc29uKTtcclxuICAgIHRoaXMuX3JlbW92ZU1vZGFsRWxlbWVudHMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbiBiZSB1c2VkIHRvIGRpc21pc3MgYSBtb2RhbCwgcGFzc2luZyBhbiBvcHRpb25hbCByZWFzb24uXHJcbiAgICovXHJcbiAgZGlzbWlzcyhyZWFzb24/OiBhbnkpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl93aW5kb3dDbXB0UmVmKSB7XHJcbiAgICAgIGlmICghdGhpcy5fYmVmb3JlRGlzbWlzcykge1xyXG4gICAgICAgIHRoaXMuX2Rpc21pc3MocmVhc29uKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBkaXNtaXNzID0gdGhpcy5fYmVmb3JlRGlzbWlzcygpO1xyXG4gICAgICAgIGlmIChkaXNtaXNzICYmIGRpc21pc3MudGhlbikge1xyXG4gICAgICAgICAgZGlzbWlzcy50aGVuKFxyXG4gICAgICAgICAgICAgIHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLl9kaXNtaXNzKHJlYXNvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAoKSA9PiB7fSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkaXNtaXNzICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgdGhpcy5fZGlzbWlzcyhyZWFzb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfcmVtb3ZlTW9kYWxFbGVtZW50cygpIHtcclxuICAgIGNvbnN0IHdpbmRvd05hdGl2ZUVsID0gdGhpcy5fd2luZG93Q21wdFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50O1xyXG4gICAgd2luZG93TmF0aXZlRWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh3aW5kb3dOYXRpdmVFbCk7XHJcbiAgICB0aGlzLl93aW5kb3dDbXB0UmVmLmRlc3Ryb3koKTtcclxuXHJcbiAgICBpZiAodGhpcy5fYmFja2Ryb3BDbXB0UmVmKSB7XHJcbiAgICAgIGNvbnN0IGJhY2tkcm9wTmF0aXZlRWwgPSB0aGlzLl9iYWNrZHJvcENtcHRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudDtcclxuICAgICAgYmFja2Ryb3BOYXRpdmVFbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGJhY2tkcm9wTmF0aXZlRWwpO1xyXG4gICAgICB0aGlzLl9iYWNrZHJvcENtcHRSZWYuZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9jb250ZW50UmVmICYmIHRoaXMuX2NvbnRlbnRSZWYudmlld1JlZikge1xyXG4gICAgICB0aGlzLl9jb250ZW50UmVmLnZpZXdSZWYuZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3dpbmRvd0NtcHRSZWYgPSBudWxsO1xyXG4gICAgdGhpcy5fYmFja2Ryb3BDbXB0UmVmID0gbnVsbDtcclxuICAgIHRoaXMuX2NvbnRlbnRSZWYgPSBudWxsO1xyXG4gIH1cclxufVxyXG4iXX0=