if (Global.Test) {
    (function() {
        var specUtilities = require('./spec/helpers/spec.utilities');
        specUtilities.loadScreepsAPI();
    })();
}

if(!Room.prototype.updateSourcesCharacteristics) {

    Room.prototype.updateSourcesCharacteristics = function() {


        if (!this.memory.sources) {
            this.memory.sources = {};
        }

        var sources = this.find(FIND_SOURCES);
        for (var i in sources) {
            var source = sources[i];

            if(!source.memory) {
                source.memory = {};
            }

            if(!source.memory.miners) {
                source.memory.miners = {};
            }

            if(!source.memory.container){
                source.memory.container = {};
            }
            var containers = source.room.find(FIND_STRUCTURES, {
                filter: (i) => (i.structureType == STRUCTURE_CONTAINER)
            });
            if(containers.length > 0) {
                var closestContainer = source.pos.findClosestByRange(containers);
                source.memory.container = closestContainer.id;
            }
        }
    };

}

if(!Room.prototype.memory) {

    Object.defineProperty(Room.prototype, "memory",{
        get: function() {
            return Memory.rooms[this.name];
        },
        set: function(value) {
            return Memory.rooms[this.name] = value;
        }
    });
}
