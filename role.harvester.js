var utilities = require('utilities');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep, miners) {

        var creepMinimalWorkingCapacity = Math.min(
            creep.carryCapacity,
            150
        );

        function transferEnergyFromCreepToTargetOrMoveToIt (creep, target) {
            var errorFromTransfer = target.transfer(creep, RESOURCE_ENERGY);

            if(errorFromTransfer == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
                return 0

            } else {
                return errorFromTransfer
            }
        };

        if(creep.carry.energy < creepMinimalWorkingCapacity) {

            var droppedEnergy = creep.room.find(FIND_DROPPED_ENERGY, {
                filter: (i) => (i.energy > 100)
            });

            if (droppedEnergy.length > 0) {
                var errorFromTransfer = creep.pickup(droppedEnergy[0]);

                if(errorFromTransfer == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedEnergy[0].pos);
                }

            } else {

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
                    var errorFromTransfer = transferEnergyFromCreepToTargetOrMoveToIt(creep,target);

                    if (errorFromTransfer == ERR_NOT_ENOUGH_ENERGY) {
                        var bestMiner = utilities.sortBestMinerForCreep(miners, creep)[0];
                        var errorFromTransfer = transferEnergyFromCreepToTargetOrMoveToIt(creep,bestMiner);
                    }
                }
            }
        }
        else {
            //TODO: Store target to not recalculate each turn

            var sourceTargets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity) ||
                        (structure.structureType == STRUCTURE_TOWER &&
                        structure.energy < structure.energyCapacity/2)
                        ;
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
