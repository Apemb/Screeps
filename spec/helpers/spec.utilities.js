var specUtilities = {

    loadScreepsAPI: function () {
        if (typeof WORK === "undefined") {
            WORK = "work";
        }
        if (typeof CARRY === "undefined") {
            CARRY = "carry";
        }
        if (typeof MOVE === "undefined") {
            MOVE = "move";
        }
    }
};

module.exports = specUtilities;