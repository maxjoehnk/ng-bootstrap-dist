/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { NgbAccordionModule } from './accordion/accordion.module';
import { NgbAlertModule } from './alert/alert.module';
import { NgbButtonsModule } from './buttons/buttons.module';
import { NgbCarouselModule } from './carousel/carousel.module';
import { NgbCollapseModule } from './collapse/collapse.module';
import { NgbDatepickerModule } from './datepicker/datepicker.module';
import { NgbDropdownModule } from './dropdown/dropdown.module';
import { NgbModalModule } from './modal/modal.module';
import { NgbPaginationModule } from './pagination/pagination.module';
import { NgbPopoverModule } from './popover/popover.module';
import { NgbProgressbarModule } from './progressbar/progressbar.module';
import { NgbRatingModule } from './rating/rating.module';
import { NgbTabsetModule } from './tabset/tabset.module';
import { NgbTimepickerModule } from './timepicker/timepicker.module';
import { NgbTooltipModule } from './tooltip/tooltip.module';
import { NgbTypeaheadModule } from './typeahead/typeahead.module';
export { NgbAccordionModule, NgbAccordionConfig, NgbAccordion, NgbPanel, NgbPanelTitle, NgbPanelContent } from './accordion/accordion.module';
export { NgbAlertModule, NgbAlertConfig, NgbAlert } from './alert/alert.module';
export { NgbButtonsModule, NgbCheckBox, NgbRadioGroup } from './buttons/buttons.module';
export { NgbCarouselModule, NgbCarouselConfig, NgbCarousel, NgbSlide } from './carousel/carousel.module';
export { NgbCollapseModule, NgbCollapse } from './collapse/collapse.module';
export { NgbCalendar, NgbCalendarIslamicCivil, NgbCalendarIslamicUmalqura, NgbCalendarHebrew, NgbCalendarPersian, NgbDatepickerModule, NgbDatepickerI18n, NgbDatepickerI18nHebrew, NgbDatepickerConfig, NgbDate, NgbDateParserFormatter, NgbDateAdapter, NgbDateNativeAdapter, NgbDateNativeUTCAdapter, NgbDatepicker, NgbInputDatepicker } from './datepicker/datepicker.module';
export { NgbDropdownModule, NgbDropdownConfig, NgbDropdown } from './dropdown/dropdown.module';
export { NgbModalModule, NgbModal, NgbModalConfig, NgbActiveModal, NgbModalRef, ModalDismissReasons } from './modal/modal.module';
export { NgbPaginationModule, NgbPaginationConfig, NgbPagination } from './pagination/pagination.module';
export { NgbPopoverModule, NgbPopoverConfig, NgbPopover } from './popover/popover.module';
export { NgbProgressbarModule, NgbProgressbarConfig, NgbProgressbar } from './progressbar/progressbar.module';
export { NgbRatingModule, NgbRatingConfig, NgbRating } from './rating/rating.module';
export { NgbTabsetModule, NgbTabsetConfig, NgbTabset, NgbTab, NgbTabContent, NgbTabTitle } from './tabset/tabset.module';
export { NgbTimepickerModule, NgbTimepickerConfig, NgbTimepicker, NgbTimeAdapter } from './timepicker/timepicker.module';
export { NgbTooltipModule, NgbTooltipConfig, NgbTooltip } from './tooltip/tooltip.module';
export { NgbHighlight, NgbTypeaheadModule, NgbTypeaheadConfig, NgbTypeahead } from './typeahead/typeahead.module';
/** @type {?} */
const NGB_MODULES = [
    NgbAccordionModule, NgbAlertModule, NgbButtonsModule, NgbCarouselModule, NgbCollapseModule, NgbDatepickerModule,
    NgbDropdownModule, NgbModalModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbRatingModule,
    NgbTabsetModule, NgbTimepickerModule, NgbTooltipModule, NgbTypeaheadModule
];
export class NgbModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbModule }; }
}
NgbModule.decorators = [
    { type: NgModule, args: [{ imports: NGB_MODULES, exports: NGB_MODULES },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFzQixNQUFNLGVBQWUsQ0FBQztBQUU1RCxPQUFPLEVBQUMsa0JBQWtCLEVBQXNCLE1BQU0sOEJBQThCLENBQUM7QUFDckYsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQzdELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQzdELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQzdELE9BQU8sRUFDTCxjQUFjLEVBTWYsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGVBQWUsRUFBb0IsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUMsa0JBQWtCLEVBQThCLE1BQU0sOEJBQThCLENBQUM7QUFFN0YsT0FBTyxFQUNMLGtCQUFrQixFQUVsQixrQkFBa0IsRUFDbEIsWUFBWSxFQUNaLFFBQVEsRUFDUixhQUFhLEVBQ2IsZUFBZSxFQUNoQixNQUFNLDhCQUE4QixDQUFDO0FBQ3RDLE9BQU8sRUFBQyxjQUFjLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzlFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDdEYsT0FBTyxFQUFDLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUN2RyxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsV0FBVyxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDMUUsT0FBTyxFQUNMLFdBQVcsRUFFWCx1QkFBdUIsRUFDdkIsMEJBQTBCLEVBQzFCLGlCQUFpQixFQUNqQixrQkFBa0IsRUFDbEIsbUJBQW1CLEVBQ25CLGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsbUJBQW1CLEVBRW5CLE9BQU8sRUFDUCxzQkFBc0IsRUFDdEIsY0FBYyxFQUNkLG9CQUFvQixFQUNwQix1QkFBdUIsRUFDdkIsYUFBYSxFQUNiLGtCQUFrQixFQUNuQixNQUFNLGdDQUFnQyxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RixPQUFPLEVBQ0wsY0FBYyxFQUNkLFFBQVEsRUFDUixjQUFjLEVBRWQsY0FBYyxFQUNkLFdBQVcsRUFDWCxtQkFBbUIsRUFDcEIsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUMsbUJBQW1CLEVBQUUsbUJBQW1CLEVBQUUsYUFBYSxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDdkcsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLFVBQVUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3hGLE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxjQUFjLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUM1RyxPQUFPLEVBQUMsZUFBZSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRixPQUFPLEVBQ0wsZUFBZSxFQUVmLGVBQWUsRUFDZixTQUFTLEVBQ1QsTUFBTSxFQUNOLGFBQWEsRUFDYixXQUFXLEVBQ1osTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQ0wsbUJBQW1CLEVBQ25CLG1CQUFtQixFQUVuQixhQUFhLEVBQ2IsY0FBYyxFQUNmLE1BQU0sZ0NBQWdDLENBQUM7QUFDeEMsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLFVBQVUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3hGLE9BQU8sRUFDTCxZQUFZLEVBQ1osa0JBQWtCLEVBQ2xCLGtCQUFrQixFQUVsQixZQUFZLEVBQ2IsTUFBTSw4QkFBOEIsQ0FBQzs7QUFJdEMsTUFBTSxXQUFXLEdBQUc7SUFDbEIsa0JBQWtCLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLG1CQUFtQjtJQUMvRyxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQUUsb0JBQW9CLEVBQUUsZUFBZTtJQUMvRyxlQUFlLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQUUsa0JBQWtCO0NBQzNFLENBQUM7QUFHRixNQUFNOzs7Ozs7OztJQU9KLE1BQU0sQ0FBQyxPQUFPLEtBQTBCLE1BQU0sQ0FBQyxFQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUMsQ0FBQyxFQUFFOzs7WUFSeEUsUUFBUSxTQUFDLEVBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7TmdiQWNjb3JkaW9uTW9kdWxlLCBOZ2JQYW5lbENoYW5nZUV2ZW50fSBmcm9tICcuL2FjY29yZGlvbi9hY2NvcmRpb24ubW9kdWxlJztcbmltcG9ydCB7TmdiQWxlcnRNb2R1bGV9IGZyb20gJy4vYWxlcnQvYWxlcnQubW9kdWxlJztcbmltcG9ydCB7TmdiQnV0dG9uc01vZHVsZX0gZnJvbSAnLi9idXR0b25zL2J1dHRvbnMubW9kdWxlJztcbmltcG9ydCB7TmdiQ2Fyb3VzZWxNb2R1bGV9IGZyb20gJy4vY2Fyb3VzZWwvY2Fyb3VzZWwubW9kdWxlJztcbmltcG9ydCB7TmdiQ29sbGFwc2VNb2R1bGV9IGZyb20gJy4vY29sbGFwc2UvY29sbGFwc2UubW9kdWxlJztcbmltcG9ydCB7TmdiRGF0ZXBpY2tlck1vZHVsZX0gZnJvbSAnLi9kYXRlcGlja2VyL2RhdGVwaWNrZXIubW9kdWxlJztcbmltcG9ydCB7TmdiRHJvcGRvd25Nb2R1bGV9IGZyb20gJy4vZHJvcGRvd24vZHJvcGRvd24ubW9kdWxlJztcbmltcG9ydCB7XG4gIE5nYk1vZGFsTW9kdWxlLFxuICBOZ2JNb2RhbCxcbiAgTmdiTW9kYWxDb25maWcsXG4gIE5nYk1vZGFsT3B0aW9ucyxcbiAgTmdiTW9kYWxSZWYsXG4gIE1vZGFsRGlzbWlzc1JlYXNvbnNcbn0gZnJvbSAnLi9tb2RhbC9tb2RhbC5tb2R1bGUnO1xuaW1wb3J0IHtOZ2JQYWdpbmF0aW9uTW9kdWxlfSBmcm9tICcuL3BhZ2luYXRpb24vcGFnaW5hdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHtOZ2JQb3BvdmVyTW9kdWxlfSBmcm9tICcuL3BvcG92ZXIvcG9wb3Zlci5tb2R1bGUnO1xuaW1wb3J0IHtOZ2JQcm9ncmVzc2Jhck1vZHVsZX0gZnJvbSAnLi9wcm9ncmVzc2Jhci9wcm9ncmVzc2Jhci5tb2R1bGUnO1xuaW1wb3J0IHtOZ2JSYXRpbmdNb2R1bGV9IGZyb20gJy4vcmF0aW5nL3JhdGluZy5tb2R1bGUnO1xuaW1wb3J0IHtOZ2JUYWJzZXRNb2R1bGUsIE5nYlRhYkNoYW5nZUV2ZW50fSBmcm9tICcuL3RhYnNldC90YWJzZXQubW9kdWxlJztcbmltcG9ydCB7TmdiVGltZXBpY2tlck1vZHVsZX0gZnJvbSAnLi90aW1lcGlja2VyL3RpbWVwaWNrZXIubW9kdWxlJztcbmltcG9ydCB7TmdiVG9vbHRpcE1vZHVsZX0gZnJvbSAnLi90b29sdGlwL3Rvb2x0aXAubW9kdWxlJztcbmltcG9ydCB7TmdiVHlwZWFoZWFkTW9kdWxlLCBOZ2JUeXBlYWhlYWRTZWxlY3RJdGVtRXZlbnR9IGZyb20gJy4vdHlwZWFoZWFkL3R5cGVhaGVhZC5tb2R1bGUnO1xuXG5leHBvcnQge1xuICBOZ2JBY2NvcmRpb25Nb2R1bGUsXG4gIE5nYlBhbmVsQ2hhbmdlRXZlbnQsXG4gIE5nYkFjY29yZGlvbkNvbmZpZyxcbiAgTmdiQWNjb3JkaW9uLFxuICBOZ2JQYW5lbCxcbiAgTmdiUGFuZWxUaXRsZSxcbiAgTmdiUGFuZWxDb250ZW50XG59IGZyb20gJy4vYWNjb3JkaW9uL2FjY29yZGlvbi5tb2R1bGUnO1xuZXhwb3J0IHtOZ2JBbGVydE1vZHVsZSwgTmdiQWxlcnRDb25maWcsIE5nYkFsZXJ0fSBmcm9tICcuL2FsZXJ0L2FsZXJ0Lm1vZHVsZSc7XG5leHBvcnQge05nYkJ1dHRvbnNNb2R1bGUsIE5nYkNoZWNrQm94LCBOZ2JSYWRpb0dyb3VwfSBmcm9tICcuL2J1dHRvbnMvYnV0dG9ucy5tb2R1bGUnO1xuZXhwb3J0IHtOZ2JDYXJvdXNlbE1vZHVsZSwgTmdiQ2Fyb3VzZWxDb25maWcsIE5nYkNhcm91c2VsLCBOZ2JTbGlkZX0gZnJvbSAnLi9jYXJvdXNlbC9jYXJvdXNlbC5tb2R1bGUnO1xuZXhwb3J0IHtOZ2JDb2xsYXBzZU1vZHVsZSwgTmdiQ29sbGFwc2V9IGZyb20gJy4vY29sbGFwc2UvY29sbGFwc2UubW9kdWxlJztcbmV4cG9ydCB7XG4gIE5nYkNhbGVuZGFyLFxuICBOZ2JQZXJpb2QsXG4gIE5nYkNhbGVuZGFySXNsYW1pY0NpdmlsLFxuICBOZ2JDYWxlbmRhcklzbGFtaWNVbWFscXVyYSxcbiAgTmdiQ2FsZW5kYXJIZWJyZXcsXG4gIE5nYkNhbGVuZGFyUGVyc2lhbixcbiAgTmdiRGF0ZXBpY2tlck1vZHVsZSxcbiAgTmdiRGF0ZXBpY2tlckkxOG4sXG4gIE5nYkRhdGVwaWNrZXJJMThuSGVicmV3LFxuICBOZ2JEYXRlcGlja2VyQ29uZmlnLFxuICBOZ2JEYXRlU3RydWN0LFxuICBOZ2JEYXRlLFxuICBOZ2JEYXRlUGFyc2VyRm9ybWF0dGVyLFxuICBOZ2JEYXRlQWRhcHRlcixcbiAgTmdiRGF0ZU5hdGl2ZUFkYXB0ZXIsXG4gIE5nYkRhdGVOYXRpdmVVVENBZGFwdGVyLFxuICBOZ2JEYXRlcGlja2VyLFxuICBOZ2JJbnB1dERhdGVwaWNrZXJcbn0gZnJvbSAnLi9kYXRlcGlja2VyL2RhdGVwaWNrZXIubW9kdWxlJztcbmV4cG9ydCB7TmdiRHJvcGRvd25Nb2R1bGUsIE5nYkRyb3Bkb3duQ29uZmlnLCBOZ2JEcm9wZG93bn0gZnJvbSAnLi9kcm9wZG93bi9kcm9wZG93bi5tb2R1bGUnO1xuZXhwb3J0IHtcbiAgTmdiTW9kYWxNb2R1bGUsXG4gIE5nYk1vZGFsLFxuICBOZ2JNb2RhbENvbmZpZyxcbiAgTmdiTW9kYWxPcHRpb25zLFxuICBOZ2JBY3RpdmVNb2RhbCxcbiAgTmdiTW9kYWxSZWYsXG4gIE1vZGFsRGlzbWlzc1JlYXNvbnNcbn0gZnJvbSAnLi9tb2RhbC9tb2RhbC5tb2R1bGUnO1xuZXhwb3J0IHtOZ2JQYWdpbmF0aW9uTW9kdWxlLCBOZ2JQYWdpbmF0aW9uQ29uZmlnLCBOZ2JQYWdpbmF0aW9ufSBmcm9tICcuL3BhZ2luYXRpb24vcGFnaW5hdGlvbi5tb2R1bGUnO1xuZXhwb3J0IHtOZ2JQb3BvdmVyTW9kdWxlLCBOZ2JQb3BvdmVyQ29uZmlnLCBOZ2JQb3BvdmVyfSBmcm9tICcuL3BvcG92ZXIvcG9wb3Zlci5tb2R1bGUnO1xuZXhwb3J0IHtOZ2JQcm9ncmVzc2Jhck1vZHVsZSwgTmdiUHJvZ3Jlc3NiYXJDb25maWcsIE5nYlByb2dyZXNzYmFyfSBmcm9tICcuL3Byb2dyZXNzYmFyL3Byb2dyZXNzYmFyLm1vZHVsZSc7XG5leHBvcnQge05nYlJhdGluZ01vZHVsZSwgTmdiUmF0aW5nQ29uZmlnLCBOZ2JSYXRpbmd9IGZyb20gJy4vcmF0aW5nL3JhdGluZy5tb2R1bGUnO1xuZXhwb3J0IHtcbiAgTmdiVGFic2V0TW9kdWxlLFxuICBOZ2JUYWJDaGFuZ2VFdmVudCxcbiAgTmdiVGFic2V0Q29uZmlnLFxuICBOZ2JUYWJzZXQsXG4gIE5nYlRhYixcbiAgTmdiVGFiQ29udGVudCxcbiAgTmdiVGFiVGl0bGVcbn0gZnJvbSAnLi90YWJzZXQvdGFic2V0Lm1vZHVsZSc7XG5leHBvcnQge1xuICBOZ2JUaW1lcGlja2VyTW9kdWxlLFxuICBOZ2JUaW1lcGlja2VyQ29uZmlnLFxuICBOZ2JUaW1lU3RydWN0LFxuICBOZ2JUaW1lcGlja2VyLFxuICBOZ2JUaW1lQWRhcHRlclxufSBmcm9tICcuL3RpbWVwaWNrZXIvdGltZXBpY2tlci5tb2R1bGUnO1xuZXhwb3J0IHtOZ2JUb29sdGlwTW9kdWxlLCBOZ2JUb29sdGlwQ29uZmlnLCBOZ2JUb29sdGlwfSBmcm9tICcuL3Rvb2x0aXAvdG9vbHRpcC5tb2R1bGUnO1xuZXhwb3J0IHtcbiAgTmdiSGlnaGxpZ2h0LFxuICBOZ2JUeXBlYWhlYWRNb2R1bGUsXG4gIE5nYlR5cGVhaGVhZENvbmZpZyxcbiAgTmdiVHlwZWFoZWFkU2VsZWN0SXRlbUV2ZW50LFxuICBOZ2JUeXBlYWhlYWRcbn0gZnJvbSAnLi90eXBlYWhlYWQvdHlwZWFoZWFkLm1vZHVsZSc7XG5cbmV4cG9ydCB7UGxhY2VtZW50fSBmcm9tICcuL3V0aWwvcG9zaXRpb25pbmcnO1xuXG5jb25zdCBOR0JfTU9EVUxFUyA9IFtcbiAgTmdiQWNjb3JkaW9uTW9kdWxlLCBOZ2JBbGVydE1vZHVsZSwgTmdiQnV0dG9uc01vZHVsZSwgTmdiQ2Fyb3VzZWxNb2R1bGUsIE5nYkNvbGxhcHNlTW9kdWxlLCBOZ2JEYXRlcGlja2VyTW9kdWxlLFxuICBOZ2JEcm9wZG93bk1vZHVsZSwgTmdiTW9kYWxNb2R1bGUsIE5nYlBhZ2luYXRpb25Nb2R1bGUsIE5nYlBvcG92ZXJNb2R1bGUsIE5nYlByb2dyZXNzYmFyTW9kdWxlLCBOZ2JSYXRpbmdNb2R1bGUsXG4gIE5nYlRhYnNldE1vZHVsZSwgTmdiVGltZXBpY2tlck1vZHVsZSwgTmdiVG9vbHRpcE1vZHVsZSwgTmdiVHlwZWFoZWFkTW9kdWxlXG5dO1xuXG5ATmdNb2R1bGUoe2ltcG9ydHM6IE5HQl9NT0RVTEVTLCBleHBvcnRzOiBOR0JfTU9EVUxFU30pXG5leHBvcnQgY2xhc3MgTmdiTW9kdWxlIHtcbiAgLyoqXG4gICAqIEltcG9ydGluZyB3aXRoICcuZm9yUm9vdCgpJyBpcyBubyBsb25nZXIgbmVjZXNzYXJ5LCB5b3UgY2FuIHNpbXBseSBpbXBvcnQgdGhlIG1vZHVsZS5cbiAgICogV2lsbCBiZSByZW1vdmVkIGluIDQuMC4wLlxuICAgKlxuICAgKiBAZGVwcmVjYXRlZCAzLjAuMFxuICAgKi9cbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7IHJldHVybiB7bmdNb2R1bGU6IE5nYk1vZHVsZX07IH1cbn1cbiJdfQ==