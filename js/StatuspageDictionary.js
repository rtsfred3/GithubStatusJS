/**
 * Static dictionary for default values for Statuspage
 * @class
 */
class StatuspageDictionary {
    static get replaceableStringValue() { return '{}'; }

    static get BaseEnums() {
        return class {
            constructor(val){
                if (val instanceof StatuspageDictionary.BaseEnums){
                    this.val = val.val;
                } else if (typeof val == 'string') {
                    this.val = val;
                } else {
                    this.val = null;
                }
            }
    
            toString() {
                return this.val != null ? this.val : "";
            }
    
            static toJson() {
                var outputJson = {};
                Object.entries(this).forEach((arr) => outputJson[arr[0]] = arr[1].val);
                return outputJson;
            }
        }
    }

    static get StatusEnums() {
        return class extends StatuspageDictionary.BaseEnums {
            static get good() { return new this('good'); }
            static get minor() { return new this('minor'); }
            static get major() { return new this('major'); }
            static get critical() { return new this('critical'); }
            static get error() { return new this('error'); }
            static get maintenance() { return new this('maintenance'); }
            static get unavailable() { return new this('unavailable'); }
            static get loading() { return new this('loading'); }
            static get none() { return new this('none'); }
            static get resolved() { return new this('resolved'); }
            static get operational() { return new this('operational'); }
            static get degraded_performance() { return new this('degraded_performance'); }
            static get partial_outage() { return new this('partial_outage'); }
            static get major_outage() { return new this('major_outage'); }
            static get under_maintenance() { return new this('under_maintenance'); }


            // static good = new this('good');
            // static minor = new this('minor');
            // static major = new this('major');
            // static critical = new this('critical');
            // static error = new this('error');
            // static maintenance = new this('maintenance');
            // static unavailable = new this('unavailable');
            // static loading = new this('loading');
            // static none = new this('none');
            // static resolved = new this('resolved');
            // static operational = new this('operational');
            // static degraded_performance = new this('degraded_performance');
            // static partial_outage = new this('partial_outage');
            // static major_outage = new this('major_outage');
            // static under_maintenance = new this('under_maintenance');

            constructor(val){ super(val) }
        }
    }

    /**
     * Creates class of desired variables to be converted to JSON
     */
    static get _metaColors() {
        return class extends StatuspageDictionary.BaseEnums {
            static get none(){ return new this('#339966'); }
            static get minor(){ return new this('#DBAB09'); }
            static get major(){ return new this('#E36209'); }
            static get critical(){ return new this('#DC3545'); }
            static get unavailable(){ return new this('#4F93BD'); }
            static get error(){ return new this('#646464'); }
            static get maintenance(){ return new this('#0366D6'); }
            static get psa(){ return new this('#D83D42'); }

            static get good(){ return this.none; }
            static get under_maintenance(){ return this.maintenance; }
            static get loading(){ return this.unavailable; }
            static get operational(){ return this.good; }
            static get degraded_performance(){ return this.minor; }
            static get partial_outage(){ return this.major; }

            // static none = new this('#339966');
            // static minor = new this('#DBAB09');
            // static major = new this('#E36209');
            // static critical = new this('#DC3545');
            // static unavailable = new this('#4F93BD');
            // static error = new this('#646464');
            // static maintenance = new this('#0366D6');
            // static psa = new this('#D83D42');

            // static good = this.none;
            // static under_maintenance = this.maintenance;
            // static loading = this.unavailable;
            // static operational = this.good;
            // static degraded_performance = this.minor;
            // static partial_outage = this.major;

            constructor(val){ super(val) }
        }
    }

    /**
     * Creates class of desired variables to be converted to JSON
     */
    static get _indicatorVals() {
        return class extends StatuspageDictionary.BaseEnums {
            static get good() { return new this(StatuspageDictionary.StatusEnums.good); }
            static get minor() { return new this(StatuspageDictionary.StatusEnums.minor); }
            static get major() { return new this(StatuspageDictionary.StatusEnums.major); }
            static get critical() { return new this(StatuspageDictionary.StatusEnums.critical); }
            static get error() { return new this(StatuspageDictionary.StatusEnums.error); }
            static get maintenance() { return new this(StatuspageDictionary.StatusEnums.maintenance); }
            static get unavailable() { return new this(StatuspageDictionary.StatusEnums.unavailable); }
            static get loading() { return new this(StatuspageDictionary.StatusEnums.loading); }

            static get resolved() { return this.good; }
            static get none() { return new this.good; }
            static get operational() { return this.good; }
            static get degraded_performance() { return this.minor; }
            static get partial_outage() { return this.major; }
            static get major_outage() { return this.critical; }
            static get under_maintenance() { return this.maintenance; }

            // static good = new this(StatuspageDictionary.StatusEnums.good);
            // static minor = new this(StatuspageDictionary.StatusEnums.minor);
            // static major = new this(StatuspageDictionary.StatusEnums.major);
            // static critical = new this(StatuspageDictionary.StatusEnums.critical);
            // static error = new this(StatuspageDictionary.StatusEnums.error);
            // static maintenance = new this(StatuspageDictionary.StatusEnums.maintenance);
            // static unavailable = new this(StatuspageDictionary.StatusEnums.unavailable);
            // static loading = new this(StatuspageDictionary.StatusEnums.loading);

            // static resolved = this.good;
            // static none = this.good;
            // static operational = this.good;
            // static degraded_performance = this.minor;
            // static partial_outage = this.major;
            // static major_outage = this.critical;
            // static under_maintenance = this.maintenance;

            constructor(val){ super(val) }
        }
    }

    /**
     * Creates class of desired variables to be converted to JSON
     */
    static get _indicatorMessages() {
        return class extends StatuspageDictionary.BaseEnums {
            static get resolved() { return new this(StatuspageDictionary.StatusEnums.good); }
            static get minor() { return new this(StatuspageDictionary.StatusEnums.minor); }
            static get major() { return new this(StatuspageDictionary.StatusEnums.critical); }
            static get critical() { return new this(StatuspageDictionary.StatusEnums.maintenance); }

            // static resolved = new this(StatuspageDictionary.StatusEnums.good);
            // static investigating = new this(StatuspageDictionary.StatusEnums.minor);
            // static critical = new this(StatuspageDictionary.StatusEnums.critical);
            // static maintenance = new this(StatuspageDictionary.StatusEnums.maintenance);

            constructor(val){ super(val) }
        }
    }

    /**
     * Converts StatuspageDictionary._metaColors class to JSON
     * 
     * @returns {Object} Returns JSONified version of StatuspageDictionary._metaColors
     */
    static get MetaColors(){
        return StatuspageDictionary._metaColors.toJson();
    }

    /**
     * Returns StatuspageDictionary._indicatorVals.toJSON()
     * 
     * @returns {Object} Returns JSONified version of StatuspageDictionary._indicatorVals
     */
    static get IndicatorVals(){
        return StatuspageDictionary._indicatorVals.toJson();
    }

    /**
     * Returns StatuspageDictionary._indicatorMessages.toJSON()
     * 
     * @returns {Object} Returns JSONified version of StatuspageDictionary._indicatorMessages
     */
    static get IndicatorMessages(){
        return StatuspageDictionary._indicatorMessages.toJson();
    }
}