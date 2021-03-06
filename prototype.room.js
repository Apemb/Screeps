if (Global.Test) {
    (function() {
        var specUtilities = require('./spec/helpers/spec.utilities');
        specUtilities.loadScreepsAPI();
    })();
}

ALLIED_PLAYERS = ['Goldnose'];

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

if(!Room.prototype.hostiles) {
    Object.defineProperty(Room.prototype, "hostiles",{
        get:  function () {
            if (_.isUndefined(this._hostiles)) {
                let notAllied = (creep) =>
                    !(ALLIED_PLAYERS.some((player) =>
                        player.toLowerCase() == creep.owner.username.toLowerCase()
                    ));
                this._hostiles = this.find(FIND_HOSTILE_CREEPS, {filter: notAllied});
            }
            return this._hostiles;
        }
    });
}

if(!Room.prototype.hostileTowers) {
    Object.defineProperty(Room.prototype, "hostileTowers",{
        get:  function () {
            if (_.isUndefined(this._hostileTowers)) {
                let notAlliedTowers = (structure) =>
                    !(ALLIED_PLAYERS.some((player) =>
                        player.toLowerCase() == structure.owner.username.toLowerCase() &&
                        structure.structureType == STRUCTURE_TOWER
                    ));
                this._hostileTowers = this.find(FIND_HOSTILE_STRUCTURES, {filter: notAlliedTowers});
            }
            return this._hostileTowers;
        }
    });
}


if(!Room.prototype.hostileStructures) {
    Object.defineProperty(Room.prototype, "hostileStructures",{
        get:  function () {
            if (_.isUndefined(this._hostileStructures)) {
                let notAlliedStructures = (structure) =>
                    !(ALLIED_PLAYERS.some((player) =>
                        player.toLowerCase() == structure.owner.username.toLowerCase()
                    ));
                this._hostileStructures = this.find(FIND_HOSTILE_STRUCTURES, {filter: notAlliedStructures});
            }
            return this._hostileStructures;
        }
    });
}