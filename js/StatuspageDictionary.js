class StatuspageDictionary {
    static SiteNameValue = '{{SiteName}}';
    static AmpIndicatorValue = '{{indicator}}';
    static replaceableStringValue = '{}';

    /**
     * @static
     * @readonly
     * @enum {string}
     * 
     * @property {string} StatuspageApp
     * @property {string} StatuspageError
     * @property {string} StatuspageLoading
     * @property {string} StatuspageUnavailable
     * @property {string} StatuspageStatus
     * @property {string} StatuspageComponent
     * @property {string} StatuspageComponents
     * @property {string} StatuspageIncidents
     * @property {string} StatuspageSummary
     */
    static get HTMLTags() {
        return Object.freeze({
            StatuspageApp: 'statuspage-app',
            StatuspageError: 'statuspage-error',
            StatuspageLoading: 'statuspage-loading',
            StatuspageUnavailable: 'statuspage-unavailable',
            StatuspageStatus: 'statuspage-status',
            StatuspageComponent: 'statuspage-component',
            StatuspageComponents: 'statuspage-components',
            StatuspageIncidents: 'statuspage-incidents',
            StatuspageSummary: 'statuspage-summary',
            StatusElement: 'status-element'
        });
    }

    /**
     * @static
     * @readonly
     * @enum {string}
     * 
     * @property {string} template_title_index
     * @property {string} template_title_status
     * @property {string} template_title_components
     * @property {string} template_descrisption
     */
    static get StatuspageHTMLTemplates() {
        return Object.freeze({
            template_title_index: `(Unofficial) ${this.replaceableStringValue} Status`,
            template_title_status: `(Unofficial) Mini ${this.replaceableStringValue} Status`,
            template_title_components: `(Unofficial) ${this.replaceableStringValue} Status Components`,
            template_title_amp: `(Unofficial) ${this.replaceableStringValue} Status AMP`,
            template_title_maintenance: `Under Maintenance`,
            template_title_error: `(Unofficial) ${this.replaceableStringValue} Status - Error`,
            template_title_unavailable: `(Unofficial) ${this.replaceableStringValue} Status - Unavailable`,
            template_descrisption: `An unofficial website to monitor ${this.replaceableStringValue} status updates.`,

            get [this.PathNames.Index]() { return this.template_title_index.replace(this.replaceableStringValue, this.SiteNameValue); },
            get [this.PathNames.Summary]() { return this.template_title_index.replace(this.replaceableStringValue, this.SiteNameValue); },
            get [this.PathNames.Status]() { return this.template_title_status.replace(this.replaceableStringValue, this.SiteNameValue); },
            get [this.PathNames.Components]() { return this.template_title_components.replace(this.replaceableStringValue, this.SiteNameValue); },
            get [this.PathNames.Amp]() { return this.template_title_amp.replace(this.replaceableStringValue, this.SiteNameValue); },
            get [this.PathNames.Maintenance]() { return this.template_title_maintenance.replace(this.replaceableStringValue, this.SiteNameValue); },
            get [this.PathNames.Error]() { return this.template_title_error.replace(this.replaceableStringValue, this.SiteNameValue); },
            get [this.PathNames.Unavailable]() { return this.template_title_unavailable.replace(this.replaceableStringValue, this.SiteNameValue); },
            get [this.PathNames.Description]() { return this.template_descrisption.replace(this.replaceableStringValue, this.SiteNameValue); }
        });
    }

    /**
     * @static
     * @readonly
     * @enum {string}
     * 
     * @property {string} good
     * @property {string} minor
     * @property {string} major
     * @property {string} critical
     * @property {string} error
     * @property {string} maintenance
     * @property {string} unavailable
     * @property {string} loading
     * @property {string} none
     * @property {string} resolved
     * @property {string} operational
     * @property {string} degraded_performance
     * @property {string} partial_outage
     * @property {string} major_outage
     * @property {string} under_maintenance
     */
    static get StatusEnums() {
        return Object.freeze({
            good: "good",
            minor: "minor",
            major:'major',
            critical: 'critical',
            error: 'error',
            maintenance: 'maintenance',
            unavailable: 'unavailable',
            loading: 'loading',
            none: 'none',
            resolved: 'resolved',
            operational: 'operational',
            degraded_performance: 'degraded_performance',
            partial_outage: 'partial_outage',
            major_outage: 'major_outage',
            under_maintenance: 'under_maintenance'
        });
    }

    /**
     * @static
     * @readonly
     * @enum {string}
     * 
     * @property {string} none
     * @property {string} minor
     * @property {string} major
     * @property {string} critical
     * @property {string} unavailable
     * @property {string} error
     * @property {string} maintenance
     * @property {string} psa
     * @property {string} good
     * @property {string} under_maintenance
     * @property {string} loading
     * @property {string} operational
     * @property {string} degraded_performance
     * @property {string} partial_outage
     */
    static get MetaColors() {
        return Object.freeze({
            [this.StatusEnums.none]: '#339966',
            [this.StatusEnums.minor]: '#DBAB09',
            [this.StatusEnums.major]: '#E25D10',
            [this.StatusEnums.critical]: '#DC3545',
            [this.StatusEnums.unavailable]: '#4F93BD',
            [this.StatusEnums.error]: '#646464',
            [this.StatusEnums.maintenance]: '#0366D6',
            psa: '#D83D42',

            get [this.StatusEnums.good]() { return this.none; },
            get [this.StatusEnums.under_maintenance]() { return this.maintenance; },
            get [this.StatusEnums.loading]() { return this.unavailable; },

            get [this.StatusEnums.operational](){ return this.none; },
            get [this.StatusEnums.degraded_performance](){ return this.minor; },
            get [this.StatusEnums.partial_outage](){ return this.major; }
        });
    }
    
    /**
     * @static
     * @readonly
     * @enum {string}
     * 
     * @property {string} good
     * @property {string} minor
     * @property {string} major
     * @property {string} critical
     * @property {string} error
     * @property {string} maintenance
     * @property {string} unavailable
     * @property {string} loading
     * @property {string} resolved
     * @property {string} none
     * @property {string} operational
     */
    static get IndicatorVals() {
        return Object.freeze({
            [this.StatusEnums.good]: this.StatusEnums.good,
            [this.StatusEnums.minor]: this.StatusEnums.minor,
            [this.StatusEnums.major]: this.StatusEnums.major,
            [this.StatusEnums.critical]: this.StatusEnums.critical,
            [this.StatusEnums.error]: this.StatusEnums.error,
            [this.StatusEnums.maintenance]: this.StatusEnums.maintenance,
            [this.StatusEnums.unavailable]: this.StatusEnums.unavailable,
            [this.StatusEnums.loading]: this.StatusEnums.loading,

            get [this.StatusEnums.resolved]() { return this.good; },
            get [this.StatusEnums.none]() { return this.good; },
            get [this.StatusEnums.operational]() { return this.good; },

            get [this.StatusEnums.degraded_performance]() { return this.minor; },
            get [this.StatusEnums.partial_outage]() { return this.major; },
            get [this.StatusEnums.major_outage]() { return this.critical; },
            get [this.StatusEnums.under_maintenance]() { return this.maintenance; }
        });
    }
    
    /**
     * @static
     * @readonly
     * @enum {string}
     * 
     * @property {string} resolved
     * @property {string} minor
     * @property {string} major
     * @property {string} critical
     */
    static get IndicatorMessages() {
        return Object.freeze({
            [this.StatusEnums.resolved]: this.StatusEnums.good,
            [this.StatusEnums.minor]: this.StatusEnums.minor,
            [this.StatusEnums.major]: this.StatusEnums.major,
            [this.StatusEnums.critical]: this.StatusEnums.critical
        });
    }

    /**
     * @static
     * @readonly
     * @enum {string}
     * 
     * @property {string} Index
     * @property {string} Status
     * @property {string} Components
     * @property {string} Amp
     */
    static get Paths() {
        return Object.freeze({
            [this.PathNames.Index]: '/',
            [this.PathNames.Status]: '/status/',
            [this.PathNames.Components]: '/components/',
            [this.PathNames.Amp]: '/amp/'
        });
    }

    /**
     * @static
     * @readonly
     * @enum {string}
     * 
     * @property {string} Index
     * @property {string} Status
     * @property {string} Component
     * @property {string} Components
     * @property {string} Amp
     * @property {string} Maintenance
     * @property {string} Error
     * @property {string} Description
     */
    static get PathNames() {
        return Object.freeze({
            Index: 'Index',
            Summary: 'Summary',
            Status: 'Status',
            Component: 'Component',
            Components: 'Components',
            Amp: 'Amp',
            Maintenance: 'Maintenance',
            Unavailable: 'Unavailable',
            Error: 'Error',
            Description: 'Description'
        });
    }
}