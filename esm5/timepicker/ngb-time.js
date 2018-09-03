/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { isNumber, toInteger } from '../util/util';
var NgbTime = /** @class */ (function () {
    function NgbTime(hour, minute, second) {
        this.hour = toInteger(hour);
        this.minute = toInteger(minute);
        this.second = toInteger(second);
    }
    /**
     * @param {?=} step
     * @return {?}
     */
    NgbTime.prototype.changeHour = /**
     * @param {?=} step
     * @return {?}
     */
    function (step) {
        if (step === void 0) { step = 1; }
        this.updateHour((isNaN(this.hour) ? 0 : this.hour) + step);
    };
    /**
     * @param {?} hour
     * @return {?}
     */
    NgbTime.prototype.updateHour = /**
     * @param {?} hour
     * @return {?}
     */
    function (hour) {
        if (isNumber(hour)) {
            this.hour = (hour < 0 ? 24 + hour : hour) % 24;
        }
        else {
            this.hour = NaN;
        }
    };
    /**
     * @param {?=} step
     * @return {?}
     */
    NgbTime.prototype.changeMinute = /**
     * @param {?=} step
     * @return {?}
     */
    function (step) {
        if (step === void 0) { step = 1; }
        this.updateMinute((isNaN(this.minute) ? 0 : this.minute) + step);
    };
    /**
     * @param {?} minute
     * @return {?}
     */
    NgbTime.prototype.updateMinute = /**
     * @param {?} minute
     * @return {?}
     */
    function (minute) {
        if (isNumber(minute)) {
            this.minute = minute % 60 < 0 ? 60 + minute % 60 : minute % 60;
            this.changeHour(Math.floor(minute / 60));
        }
        else {
            this.minute = NaN;
        }
    };
    /**
     * @param {?=} step
     * @return {?}
     */
    NgbTime.prototype.changeSecond = /**
     * @param {?=} step
     * @return {?}
     */
    function (step) {
        if (step === void 0) { step = 1; }
        this.updateSecond((isNaN(this.second) ? 0 : this.second) + step);
    };
    /**
     * @param {?} second
     * @return {?}
     */
    NgbTime.prototype.updateSecond = /**
     * @param {?} second
     * @return {?}
     */
    function (second) {
        if (isNumber(second)) {
            this.second = second < 0 ? 60 + second % 60 : second % 60;
            this.changeMinute(Math.floor(second / 60));
        }
        else {
            this.second = NaN;
        }
    };
    /**
     * @param {?=} checkSecs
     * @return {?}
     */
    NgbTime.prototype.isValid = /**
     * @param {?=} checkSecs
     * @return {?}
     */
    function (checkSecs) {
        if (checkSecs === void 0) { checkSecs = true; }
        return isNumber(this.hour) && isNumber(this.minute) && (checkSecs ? isNumber(this.second) : true);
    };
    /**
     * @return {?}
     */
    NgbTime.prototype.toString = /**
     * @return {?}
     */
    function () { return (this.hour || 0) + ":" + (this.minute || 0) + ":" + (this.second || 0); };
    return NgbTime;
}());
export { NgbTime };
if (false) {
    /** @type {?} */
    NgbTime.prototype.hour;
    /** @type {?} */
    NgbTime.prototype.minute;
    /** @type {?} */
    NgbTime.prototype.second;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLXRpbWUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbInRpbWVwaWNrZXIvbmdiLXRpbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUUsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRWpELElBQUE7SUFLRSxpQkFBWSxJQUFhLEVBQUUsTUFBZSxFQUFFLE1BQWU7UUFDekQsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDakM7Ozs7O0lBRUQsNEJBQVU7Ozs7SUFBVixVQUFXLElBQVE7UUFBUixxQkFBQSxFQUFBLFFBQVE7UUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7S0FBRTs7Ozs7SUFFcEYsNEJBQVU7Ozs7SUFBVixVQUFXLElBQVk7UUFDckIsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ2hEO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztTQUNqQjtLQUNGOzs7OztJQUVELDhCQUFZOzs7O0lBQVosVUFBYSxJQUFRO1FBQVIscUJBQUEsRUFBQSxRQUFRO1FBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0tBQUU7Ozs7O0lBRTVGLDhCQUFZOzs7O0lBQVosVUFBYSxNQUFjO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFDL0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztTQUNuQjtLQUNGOzs7OztJQUVELDhCQUFZOzs7O0lBQVosVUFBYSxJQUFRO1FBQVIscUJBQUEsRUFBQSxRQUFRO1FBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0tBQUU7Ozs7O0lBRTVGLDhCQUFZOzs7O0lBQVosVUFBYSxNQUFjO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUMxRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDNUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1NBQ25CO0tBQ0Y7Ozs7O0lBRUQseUJBQU87Ozs7SUFBUCxVQUFRLFNBQWdCO1FBQWhCLDBCQUFBLEVBQUEsZ0JBQWdCO1FBQ3RCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ25HOzs7O0lBRUQsMEJBQVE7OztJQUFSLGNBQWEsTUFBTSxDQUFDLENBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFdBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLFdBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUUsQ0FBQyxFQUFFO2tCQWpEcEY7SUFrREMsQ0FBQTtBQWhERCxtQkFnREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzTnVtYmVyLCB0b0ludGVnZXJ9IGZyb20gJy4uL3V0aWwvdXRpbCc7XHJcblxyXG5leHBvcnQgY2xhc3MgTmdiVGltZSB7XHJcbiAgaG91cjogbnVtYmVyO1xyXG4gIG1pbnV0ZTogbnVtYmVyO1xyXG4gIHNlY29uZDogbnVtYmVyO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihob3VyPzogbnVtYmVyLCBtaW51dGU/OiBudW1iZXIsIHNlY29uZD86IG51bWJlcikge1xyXG4gICAgdGhpcy5ob3VyID0gdG9JbnRlZ2VyKGhvdXIpO1xyXG4gICAgdGhpcy5taW51dGUgPSB0b0ludGVnZXIobWludXRlKTtcclxuICAgIHRoaXMuc2Vjb25kID0gdG9JbnRlZ2VyKHNlY29uZCk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VIb3VyKHN0ZXAgPSAxKSB7IHRoaXMudXBkYXRlSG91cigoaXNOYU4odGhpcy5ob3VyKSA/IDAgOiB0aGlzLmhvdXIpICsgc3RlcCk7IH1cclxuXHJcbiAgdXBkYXRlSG91cihob3VyOiBudW1iZXIpIHtcclxuICAgIGlmIChpc051bWJlcihob3VyKSkge1xyXG4gICAgICB0aGlzLmhvdXIgPSAoaG91ciA8IDAgPyAyNCArIGhvdXIgOiBob3VyKSAlIDI0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5ob3VyID0gTmFOO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hhbmdlTWludXRlKHN0ZXAgPSAxKSB7IHRoaXMudXBkYXRlTWludXRlKChpc05hTih0aGlzLm1pbnV0ZSkgPyAwIDogdGhpcy5taW51dGUpICsgc3RlcCk7IH1cclxuXHJcbiAgdXBkYXRlTWludXRlKG1pbnV0ZTogbnVtYmVyKSB7XHJcbiAgICBpZiAoaXNOdW1iZXIobWludXRlKSkge1xyXG4gICAgICB0aGlzLm1pbnV0ZSA9IG1pbnV0ZSAlIDYwIDwgMCA/IDYwICsgbWludXRlICUgNjAgOiBtaW51dGUgJSA2MDtcclxuICAgICAgdGhpcy5jaGFuZ2VIb3VyKE1hdGguZmxvb3IobWludXRlIC8gNjApKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubWludXRlID0gTmFOO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hhbmdlU2Vjb25kKHN0ZXAgPSAxKSB7IHRoaXMudXBkYXRlU2Vjb25kKChpc05hTih0aGlzLnNlY29uZCkgPyAwIDogdGhpcy5zZWNvbmQpICsgc3RlcCk7IH1cclxuXHJcbiAgdXBkYXRlU2Vjb25kKHNlY29uZDogbnVtYmVyKSB7XHJcbiAgICBpZiAoaXNOdW1iZXIoc2Vjb25kKSkge1xyXG4gICAgICB0aGlzLnNlY29uZCA9IHNlY29uZCA8IDAgPyA2MCArIHNlY29uZCAlIDYwIDogc2Vjb25kICUgNjA7XHJcbiAgICAgIHRoaXMuY2hhbmdlTWludXRlKE1hdGguZmxvb3Ioc2Vjb25kIC8gNjApKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2Vjb25kID0gTmFOO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNWYWxpZChjaGVja1NlY3MgPSB0cnVlKSB7XHJcbiAgICByZXR1cm4gaXNOdW1iZXIodGhpcy5ob3VyKSAmJiBpc051bWJlcih0aGlzLm1pbnV0ZSkgJiYgKGNoZWNrU2VjcyA/IGlzTnVtYmVyKHRoaXMuc2Vjb25kKSA6IHRydWUpO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKSB7IHJldHVybiBgJHt0aGlzLmhvdXIgfHwgMH06JHt0aGlzLm1pbnV0ZSB8fCAwfToke3RoaXMuc2Vjb25kIHx8IDB9YDsgfVxyXG59XHJcbiJdfQ==