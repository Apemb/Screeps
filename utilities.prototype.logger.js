logger = function () { };

logger.log = function (message) {
    if (Global.Log) {
        if (typeof message === "undefined") {
            console.log();
        } else {
            console.log(message);
        }
    }
};

logger.debugLog = function (message) {
    if (Global.DebugLog) {
        if (typeof message === "undefined") {
            console.log();
        } else {
            console.log(" >> " + message);
        }
    }
};