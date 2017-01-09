if (Global.Test) {
    (function() {
        var specUtilities = require('./spec/helpers/spec.utilities');
        specUtilities.loadScreepsAPI();
    })();
}

Source.prototype.cleanMinerMemory = function () {
    for(var minerName in this.room.memory.sources[this.id].miners) {
        if(!Game.creeps[minerName]) {
            delete this.room.memory.sources[this.id].miners[minerName];
        }
    }
};

Object.defineProperty(Source.prototype, "memory",{
    get: function() {
        return this.room.memory.sources[this.id];
    },
    set: function(value) {
        this.room.memory.sources[this.id] = value;
    }
});

