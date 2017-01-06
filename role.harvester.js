var utilities = require('utilities');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep, miners) {

        if(creep.carry.energy < creep.carryCapacity) {

            var sortedContainers = utilities.getSortedContainersForCreep(creep);

            if(sortedContainers.length > 0) {
                var bestContainer = sortedContainers[0];
                var target = bestContainer;

            } else {
                var bestMiner = utilities.sortBestMinerForCreep(miners, creep)[0];
                var target = bestMiner;
            }

            if (!target) {
                //TODO: Manage errors
            } else {
                if(target.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
        else {
            //TODO: Store target to not recalculate each turn

            var sourceTargets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity;
                }
            })

            if(sourceTargets.length > 0) {

                var closestTarget = creep.pos.findClosestByPath(sourceTargets);
                if(creep.transfer(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestTarget);
                }

            } else {

                var sortedStorageTargets = creep.room.find(FIND_STRUCTURES, {
                    filter: (i) => (i.structureType == STRUCTURE_CONTAINER && _.sum(i.store) < i.storeCapacity)
                }).sort(function(a, b) {

                    sumA = _.sum(a.store);
                    sumB = _.sum(b.store);

                    return (sumA - sumB);
                });

                if (sortedStorageTargets.length > 0) {

                    var lowestTarget = sortedStorageTargets[0];
                    if(creep.transfer(lowestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(lowestTarget);
                    }

                } else {
                    creep.moveTo(Game.spawns['Spawn1']);
                }
            }
        }
    }
};

module.exports = roleHarvester;
