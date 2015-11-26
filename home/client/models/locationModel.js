define(["require", "exports"], function (require, exports) {
    (function (LocationType) {
        LocationType[LocationType["LIVING_ROOM"] = 0] = "LIVING_ROOM";
        LocationType[LocationType["BEDROOM"] = 1] = "BEDROOM";
        LocationType[LocationType["KITCHEN"] = 2] = "KITCHEN";
        LocationType[LocationType["OUTSIDE"] = 3] = "OUTSIDE";
        LocationType[LocationType["BATHROOM"] = 4] = "BATHROOM";
        LocationType[LocationType["HALL"] = 5] = "HALL";
        LocationType[LocationType["TOILET"] = 6] = "TOILET";
        LocationType[LocationType["OTHER"] = 7] = "OTHER";
    })(exports.LocationType || (exports.LocationType = {}));
    var LocationType = exports.LocationType;
});
