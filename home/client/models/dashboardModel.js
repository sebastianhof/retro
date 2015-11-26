define(["require", "exports"], function (require, exports) {
    (function (DashboardType) {
        DashboardType[DashboardType["ITEM"] = 0] = "ITEM";
        DashboardType[DashboardType["SHORTCUT"] = 1] = "SHORTCUT";
        DashboardType[DashboardType["GRAPH"] = 2] = "GRAPH";
    })(exports.DashboardType || (exports.DashboardType = {}));
    var DashboardType = exports.DashboardType;
});
