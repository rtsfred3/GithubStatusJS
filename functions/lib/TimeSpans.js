export default class TimeSpans {
    static get Hour() { return 60*60; }
    static get Day() { return TimeSpans.Day * 24; }
    static get Week() { return TimeSpans.Day * 7; }
    static get Month() { return TimeSpans.Week * 4; }
    static get Year() { return TimeSpans.Day * 365; }
}