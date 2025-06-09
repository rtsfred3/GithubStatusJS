class Utils {
    static ToObject(className) {
        let classProps = Object.getOwnPropertyNames(className).filter(p => !(Object.getOwnPropertyNames(class {})).includes(p));
        return classProps.reduce((acc, curr) => (({ ...acc, [curr]: className[curr] })), {});
    }
}