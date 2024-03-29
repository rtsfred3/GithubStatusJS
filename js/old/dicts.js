var metaColors = {};
var indicatorVals = {};
var indicatorMessages = {};

// var functEnum = {};
// var pageEnum = {};

Object.defineProperties(metaColors, {
    'none': { value: '#339966', enumerable: true },
    'minor': { value: '#DBAB09', enumerable: true },
    'major': { value: '#E25D10', enumerable: true },
    'critical': { value: '#DC3545', enumerable: true },
    'unavailable': { value: '#4F93BD', enumerable: true },
    'error': { value: '#646464', enumerable: true },
    'maintenance': { value: '#0366D6', enumerable: true },
    'psa': { value: '#D83D42', enumerable: true },
    
    'good': {
        enumerable: true,
        get: function(){
            return this.none;
        }
    },

    'under_maintenance': {
        enumerable: true,
        get: function(){
            return this.maintenance;
        }
    },

    'loading': {
        enumerable: true,
        get: function(){
            return this.unavailable;
        }
    }
});

Object.defineProperties(indicatorVals, {
    'good': { value: 'good', enumerable: true },
    'minor': { value: 'minor', enumerable: true },
    'major': { value: 'major', enumerable: true },
    'critical': { value: 'critical', enumerable: true },
    'error': { value: 'error', enumerable: true },
    'maintenance': { value: 'maintenance', enumerable: true },
    'unavailable': { value: 'unavailable', enumerable: true },
    'loading': { value: 'loading', enumerable: true },

    'resolved': {
        enumerable: true,
        get: function(){
            return this.good;
        }
    },
    
    'none': {
        enumerable: true,
        get: function(){
            return this.good;
        }
    },
    
    'operational': {
        enumerable: true,
        get: function(){
            return this.good;
        }
    },
    
    'degraded_performance': {
        enumerable: true,
        get: function(){
            return this.minor;
        }
    },
    
    'partial_outage': {
        enumerable: true,
        get: function(){
            return this.major;
        }
    },
    
    'major_outage': {
        enumerable: true,
        get: function(){
            return this.critical;
        }
    },
    
    'under_maintenance': {
        enumerable: true,
        get: function(){
            return this.maintenance;
        }
    },
});

Object.defineProperties(indicatorMessages, {
    'resolved': { value: 'good', enumerable: true },
    'investigating': { value: 'minor', enumerable: true },
    'critical': { value: 'critical', enumerable: true },
    'maintenance': { value: 'maintenance', enumerable: true }
});

// Object.defineProperties(functEnum, {
//     'Status': { value: 0, enumerable: true },
//     'StatusFull': { value: 1, enumerable: true },
//     'Messages': { value: 2, enumerable: true },
//     'StatusMessages': { value: 3, enumerable: true },
//     'Components': { value: 4, enumerable: true },
//     'PSA': { value: 5, enumerable: true },
// });

// Object.defineProperties(pageEnum, {
//     'Index': { value: 0, enumerable: true },
//     'Status': { value: 1, enumerable: true },
//     'Components': { value: 2, enumerable: true },
//     'Error': { value: 3, enumerable: true },
// });