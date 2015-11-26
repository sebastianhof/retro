define(["require", "exports"], function (require, exports) {
    (function (CommandType) {
        CommandType[CommandType["SET_TEMP"] = 0] = "SET_TEMP";
        CommandType[CommandType["SET_COLOR"] = 1] = "SET_COLOR";
        CommandType[CommandType["SET_SWITCH"] = 2] = "SET_SWITCH";
        CommandType[CommandType["SET_BRIGHTNESS"] = 3] = "SET_BRIGHTNESS";
    })(exports.CommandType || (exports.CommandType = {}));
    var CommandType = exports.CommandType;
});
