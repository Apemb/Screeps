var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            var closestSource = creep.pos.findClosestByPath(sources);
            
            creep.memory.sourceToMineId = closestSource.id;
            closestSource.room.memory.sources[closestSource.id].miners[creep.name] = {};
            closestSource.cleanMinerMemory();
            if (creep.harvest(closestSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestSource);
            }
        }
    }
};

module.exports = roleMiner;