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