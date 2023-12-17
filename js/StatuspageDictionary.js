/**
 * Static dictionary for default values for Statuspage
 * @class
 */
class StatuspageDictionary {
    static get replaceableStringValue(){
        return '{}';
    }

    /**
     * Creates class of desired variables to be converted to JSON
     */
    static get _metaColors() {
        return class MetaColors {
            constructor(){
                this.none = '#339966';
                this.minor = '#DBAB09';
                this.major = '#E25D10';
                this.critical = '#DC3545';
                this.unavailable = '#4F93BD';
                this.error = '#646464';
                this.maintenance = '#0366D6';
                this.psa = '#D83D42';

                this.good = this.none;
                this.under_maintenance = this.maintenance;
                this.loading = this.unavailable;

                this.operational = this.good;
                this.degraded_performance = this.minor;
                this.partial_outage = this.major;

                this.major = '#e36209';
            }
        }
    }

    /**
     * Creates class of desired variables to be converted to JSON
     */
    static get _indicatorVals() {
        return class IndicatorVals{
            constructor(){
                this.good = 'good';
                this.minor = 'minor';
                this.major = 'major';
                this.critical = 'critical';
                this.error = 'error';
                this.maintenance = 'maintenance';
                this.unavailable = 'unavailable';
                this.loading = 'loading';

                this.resolved = this.good;
                this.none = this.good;
                this.operational = this.good;
                this.degraded_performance = this.minor;
                this.partial_outage = this.major;
                this.major_outage = this.critical;
                this.under_maintenance = this.maintenance;
            }
        }
    }

    /**
     * Creates class of desired variables to be converted to JSON
     */
    static get _indicatorMessages() {
        return class IndicatorMessages {
            constructor() {
                var __indicatorVals = new StatuspageDictionary._indicatorVals();

                this.resolved = __indicatorVals.good;
                this.investigating = __indicatorVals.minor;
                this.critical = __indicatorVals.critical;
                this.maintenance = __indicatorVals.maintenance;
            }
        }
    }

    /**
     * Converts StatuspageDictionary._metaColors class to JSON
     * 
     * @returns {MetaColors} Returns JSONified version of StatuspageDictionary._metaColors
     */
    static get MetaColors(){
        return JSON.parse(JSON.stringify(new StatuspageDictionary._metaColors()));
    }

    /**
     * Converts StatuspageDictionary._indicatorVals class to JSON
     * 
     * @returns {IndicatorVals} Returns JSONified version of StatuspageDictionary._indicatorVals
     */
    static get IndicatorVals(){
        return JSON.parse(JSON.stringify(new StatuspageDictionary._indicatorVals()));
    }

    /**
     * Converts StatuspageDictionary._indicatorMessages class to JSON
     * @returns {IndicatorMessages} Returns JSONified version of StatuspageDictionary._indicatorMessages
     */
    static get IndicatorMessages(){
        return JSON.parse(JSON.stringify(new StatuspageDictionary._indicatorMessages()));
    }
}