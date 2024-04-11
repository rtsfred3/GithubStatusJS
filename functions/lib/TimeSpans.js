export default class TimeSpans {
    static get Minute() { return 60; }
    static get Hour() { return TimeSpans.Minute * 60; }
    static get Day() { return TimeSpans.Hour * 24; }
    static get Week() { return TimeSpans.Day * 7; }
    static get Month() { return TimeSpans.Week * 4; }
    static get Year() { return TimeSpans.Day * 365; }
}