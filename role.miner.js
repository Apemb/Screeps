var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.memory.source) {
            var sourceId = creep.memory.source;
            var source = Game.getObjectById(sourceId);
        } else {
            var sources = creep.room.find(FIND_SOURCES);
            var source = creep.pos.findClosestByPath(sources);
        }

        if(!source.room.memory.sources[source.id]['miners'][creep.name]) {
            console.log('Added ' + creep.name + ' to source ' + source.id);
            source.room.memory.sources[source.id]['miners'][creep.name] = {};
        }

        if(creep.carry.energy < creep.carryCapacity) {
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }

        } else {
            if (creep.memory.container) {
                var container = Game.getObjectById(creep.memory.container);
                if(creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container);
                }
            }
        }
    }
};

module.exports = roleMiner;