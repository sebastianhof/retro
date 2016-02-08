export class Store {

    private static state = {
        dashboard: [],
        items: [],
        devices: [],
        locations: [],
        rules: []
    };

    static getState() {
        return Store.state;
    }

    static setState(property, data) {
        Store.state[property] = data;
    }

}