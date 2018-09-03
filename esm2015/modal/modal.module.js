/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { NgbModalBackdrop } from './modal-backdrop';
import { NgbModalWindow } from './modal-window';
import { NgbModal } from './modal';
export { NgbModal } from './modal';
export { NgbModalConfig } from './modal-config';
export { NgbModalRef, NgbActiveModal } from './modal-ref';
export { ModalDismissReasons } from './modal-dismiss-reasons';
export class NgbModalModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbModalModule }; }
}
NgbModalModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgbModalBackdrop, NgbModalWindow],
                entryComponents: [NgbModalBackdrop, NgbModalWindow],
                providers: [NgbModal]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJtb2RhbC9tb2RhbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQXNCLE1BQU0sZUFBZSxDQUFDO0FBRTVELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBRWpDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDakMsT0FBTyxFQUFDLGNBQWMsRUFBa0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvRCxPQUFPLEVBQUMsV0FBVyxFQUFFLGNBQWMsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN4RCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQU81RCxNQUFNOzs7Ozs7OztJQU9KLE1BQU0sQ0FBQyxPQUFPLEtBQTBCLE1BQU0sQ0FBQyxFQUFDLFFBQVEsRUFBRSxjQUFjLEVBQUMsQ0FBQyxFQUFFOzs7WUFaN0UsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSxDQUFDLGdCQUFnQixFQUFFLGNBQWMsQ0FBQztnQkFDaEQsZUFBZSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDO2dCQUNuRCxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7YUFDdEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7TmdiTW9kYWxCYWNrZHJvcH0gZnJvbSAnLi9tb2RhbC1iYWNrZHJvcCc7XHJcbmltcG9ydCB7TmdiTW9kYWxXaW5kb3d9IGZyb20gJy4vbW9kYWwtd2luZG93JztcclxuaW1wb3J0IHtOZ2JNb2RhbH0gZnJvbSAnLi9tb2RhbCc7XHJcblxyXG5leHBvcnQge05nYk1vZGFsfSBmcm9tICcuL21vZGFsJztcclxuZXhwb3J0IHtOZ2JNb2RhbENvbmZpZywgTmdiTW9kYWxPcHRpb25zfSBmcm9tICcuL21vZGFsLWNvbmZpZyc7XHJcbmV4cG9ydCB7TmdiTW9kYWxSZWYsIE5nYkFjdGl2ZU1vZGFsfSBmcm9tICcuL21vZGFsLXJlZic7XHJcbmV4cG9ydCB7TW9kYWxEaXNtaXNzUmVhc29uc30gZnJvbSAnLi9tb2RhbC1kaXNtaXNzLXJlYXNvbnMnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtOZ2JNb2RhbEJhY2tkcm9wLCBOZ2JNb2RhbFdpbmRvd10sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbTmdiTW9kYWxCYWNrZHJvcCwgTmdiTW9kYWxXaW5kb3ddLFxyXG4gIHByb3ZpZGVyczogW05nYk1vZGFsXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiTW9kYWxNb2R1bGUge1xyXG4gIC8qKlxyXG4gICAqIEltcG9ydGluZyB3aXRoICcuZm9yUm9vdCgpJyBpcyBubyBsb25nZXIgbmVjZXNzYXJ5LCB5b3UgY2FuIHNpbXBseSBpbXBvcnQgdGhlIG1vZHVsZS5cclxuICAgKiBXaWxsIGJlIHJlbW92ZWQgaW4gNC4wLjAuXHJcbiAgICpcclxuICAgKiBAZGVwcmVjYXRlZCAzLjAuMFxyXG4gICAqL1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMgeyByZXR1cm4ge25nTW9kdWxlOiBOZ2JNb2RhbE1vZHVsZX07IH1cclxufVxyXG4iXX0=