/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { isNumber, toInteger } from '../util/util';
export class NgbTime {
    /**
     * @param {?=} hour
     * @param {?=} minute
     * @param {?=} second
     */
    constructor(hour, minute, second) {
        this.hour = toInteger(hour);
        this.minute = toInteger(minute);
        this.second = toInteger(second);
    }
    /**
     * @param {?=} step
     * @return {?}
     */
    changeHour(step = 1) { this.updateHour((isNaN(this.hour) ? 0 : this.hour) + step); }
    /**
     * @param {?} hour
     * @return {?}
     */
    updateHour(hour) {
        if (isNumber(hour)) {
            this.hour = (hour < 0 ? 24 + hour : hour) % 24;
        }
        else {
            this.hour = NaN;
        }
    }
    /**
     * @param {?=} step
     * @return {?}
     */
    changeMinute(step = 1) { this.updateMinute((isNaN(this.minute) ? 0 : this.minute) + step); }
    /**
     * @param {?} minute
     * @return {?}
     */
    updateMinute(minute) {
        if (isNumber(minute)) {
            this.minute = minute % 60 < 0 ? 60 + minute % 60 : minute % 60;
            this.changeHour(Math.floor(minute / 60));
        }
        else {
            this.minute = NaN;
        }
    }
    /**
     * @param {?=} step
     * @return {?}
     */
    changeSecond(step = 1) { this.updateSecond((isNaN(this.second) ? 0 : this.second) + step); }
    /**
     * @param {?} second
     * @return {?}
     */
    updateSecond(second) {
        if (isNumber(second)) {
            this.second = second < 0 ? 60 + second % 60 : second % 60;
            this.changeMinute(Math.floor(second / 60));
        }
        else {
            this.second = NaN;
        }
    }
    /**
     * @param {?=} checkSecs
     * @return {?}
     */
    isValid(checkSecs = true) {
        return isNumber(this.hour) && isNumber(this.minute) && (checkSecs ? isNumber(this.second) : true);
    }
    /**
     * @return {?}
     */
    toString() { return `${this.hour || 0}:${this.minute || 0}:${this.second || 0}`; }
}
if (false) {
    /** @type {?} */
    NgbTime.prototype.hour;
    /** @type {?} */
    NgbTime.prototype.minute;
    /** @type {?} */
    NgbTime.prototype.second;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLXRpbWUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbInRpbWVwaWNrZXIvbmdiLXRpbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUUsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRWpELE1BQU07Ozs7OztJQUtKLFlBQVksSUFBYSxFQUFFLE1BQWUsRUFBRSxNQUFlO1FBQ3pELElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2pDOzs7OztJQUVELFVBQVUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFOzs7OztJQUVwRixVQUFVLENBQUMsSUFBWTtRQUNyQixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDaEQ7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1NBQ2pCO0tBQ0Y7Ozs7O0lBRUQsWUFBWSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUU7Ozs7O0lBRTVGLFlBQVksQ0FBQyxNQUFjO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFDL0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztTQUNuQjtLQUNGOzs7OztJQUVELFlBQVksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFOzs7OztJQUU1RixZQUFZLENBQUMsTUFBYztRQUN6QixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFDMUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzVDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztTQUNuQjtLQUNGOzs7OztJQUVELE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSTtRQUN0QixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNuRzs7OztJQUVELFFBQVEsS0FBSyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7Q0FDbkYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzTnVtYmVyLCB0b0ludGVnZXJ9IGZyb20gJy4uL3V0aWwvdXRpbCc7XHJcblxyXG5leHBvcnQgY2xhc3MgTmdiVGltZSB7XHJcbiAgaG91cjogbnVtYmVyO1xyXG4gIG1pbnV0ZTogbnVtYmVyO1xyXG4gIHNlY29uZDogbnVtYmVyO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihob3VyPzogbnVtYmVyLCBtaW51dGU/OiBudW1iZXIsIHNlY29uZD86IG51bWJlcikge1xyXG4gICAgdGhpcy5ob3VyID0gdG9JbnRlZ2VyKGhvdXIpO1xyXG4gICAgdGhpcy5taW51dGUgPSB0b0ludGVnZXIobWludXRlKTtcclxuICAgIHRoaXMuc2Vjb25kID0gdG9JbnRlZ2VyKHNlY29uZCk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VIb3VyKHN0ZXAgPSAxKSB7IHRoaXMudXBkYXRlSG91cigoaXNOYU4odGhpcy5ob3VyKSA/IDAgOiB0aGlzLmhvdXIpICsgc3RlcCk7IH1cclxuXHJcbiAgdXBkYXRlSG91cihob3VyOiBudW1iZXIpIHtcclxuICAgIGlmIChpc051bWJlcihob3VyKSkge1xyXG4gICAgICB0aGlzLmhvdXIgPSAoaG91ciA8IDAgPyAyNCArIGhvdXIgOiBob3VyKSAlIDI0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5ob3VyID0gTmFOO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hhbmdlTWludXRlKHN0ZXAgPSAxKSB7IHRoaXMudXBkYXRlTWludXRlKChpc05hTih0aGlzLm1pbnV0ZSkgPyAwIDogdGhpcy5taW51dGUpICsgc3RlcCk7IH1cclxuXHJcbiAgdXBkYXRlTWludXRlKG1pbnV0ZTogbnVtYmVyKSB7XHJcbiAgICBpZiAoaXNOdW1iZXIobWludXRlKSkge1xyXG4gICAgICB0aGlzLm1pbnV0ZSA9IG1pbnV0ZSAlIDYwIDwgMCA/IDYwICsgbWludXRlICUgNjAgOiBtaW51dGUgJSA2MDtcclxuICAgICAgdGhpcy5jaGFuZ2VIb3VyKE1hdGguZmxvb3IobWludXRlIC8gNjApKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubWludXRlID0gTmFOO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hhbmdlU2Vjb25kKHN0ZXAgPSAxKSB7IHRoaXMudXBkYXRlU2Vjb25kKChpc05hTih0aGlzLnNlY29uZCkgPyAwIDogdGhpcy5zZWNvbmQpICsgc3RlcCk7IH1cclxuXHJcbiAgdXBkYXRlU2Vjb25kKHNlY29uZDogbnVtYmVyKSB7XHJcbiAgICBpZiAoaXNOdW1iZXIoc2Vjb25kKSkge1xyXG4gICAgICB0aGlzLnNlY29uZCA9IHNlY29uZCA8IDAgPyA2MCArIHNlY29uZCAlIDYwIDogc2Vjb25kICUgNjA7XHJcbiAgICAgIHRoaXMuY2hhbmdlTWludXRlKE1hdGguZmxvb3Ioc2Vjb25kIC8gNjApKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2Vjb25kID0gTmFOO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNWYWxpZChjaGVja1NlY3MgPSB0cnVlKSB7XHJcbiAgICByZXR1cm4gaXNOdW1iZXIodGhpcy5ob3VyKSAmJiBpc051bWJlcih0aGlzLm1pbnV0ZSkgJiYgKGNoZWNrU2VjcyA/IGlzTnVtYmVyKHRoaXMuc2Vjb25kKSA6IHRydWUpO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKSB7IHJldHVybiBgJHt0aGlzLmhvdXIgfHwgMH06JHt0aGlzLm1pbnV0ZSB8fCAwfToke3RoaXMuc2Vjb25kIHx8IDB9YDsgfVxyXG59XHJcbiJdfQ==