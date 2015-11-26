define(["require", "exports"], function (require, exports) {
    (function (ItemType) {
        ItemType[ItemType["THERMOSTAT"] = 0] = "THERMOSTAT";
        ItemType[ItemType["WEATHERSTATION"] = 1] = "WEATHERSTATION";
        ItemType[ItemType["LIGHT"] = 2] = "LIGHT";
        ItemType[ItemType["COLORLIGHT"] = 3] = "COLORLIGHT";
        ItemType[ItemType["DIMMER"] = 4] = "DIMMER";
        ItemType[ItemType["COLORDIMMER"] = 5] = "COLORDIMMER";
        ItemType[ItemType["SWITCH"] = 6] = "SWITCH";
        ItemType[ItemType["BODYWEIGHT"] = 7] = "BODYWEIGHT";
        ItemType[ItemType["HEART_RATE_MONITOR"] = 8] = "HEART_RATE_MONITOR";
        ItemType[ItemType["DOORLOCK"] = 9] = "DOORLOCK";
        ItemType[ItemType["WINDOW_CONTACT"] = 10] = "WINDOW_CONTACT";
        ItemType[ItemType["CCTV"] = 11] = "CCTV";
        ItemType[ItemType["SMOKE_DETECTOR"] = 12] = "SMOKE_DETECTOR";
        ItemType[ItemType["GARAGE_DOOR"] = 13] = "GARAGE_DOOR";
        ItemType[ItemType["UNDEFINED"] = 14] = "UNDEFINED";
    })(exports.ItemType || (exports.ItemType = {}));
    var ItemType = exports.ItemType;
    (function (ItemCategory) {
        ItemCategory[ItemCategory["CLIMATE"] = 0] = "CLIMATE";
        ItemCategory[ItemCategory["LIGHTING"] = 1] = "LIGHTING";
        ItemCategory[ItemCategory["APPLIANCES"] = 2] = "APPLIANCES";
        ItemCategory[ItemCategory["SECURITY"] = 3] = "SECURITY";
        ItemCategory[ItemCategory["OUTDOOR"] = 4] = "OUTDOOR";
        ItemCategory[ItemCategory["CAR"] = 5] = "CAR";
    })(exports.ItemCategory || (exports.ItemCategory = {}));
    var ItemCategory = exports.ItemCategory;
});
