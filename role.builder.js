var utilities = require('utilities');

var roleBuilder = {

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

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.memory.buildingTargetId = 'None';

        }
        if(!creep.memory.building && creep.carry.energy >= creepMinimalWorkingCapacity) {
            creep.memory.building = true;
        }

        if(creep.memory.building) {
            if (creep.memory.buildingTargetId = 'None') {
                var constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);

                var damagedStructures = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ( structure.hits < structure.hitsMax &&
                        ((structure.structureType == STRUCTURE_WALL && structure.hits < 100000) ||
                        (structure.structureType == STRUCTURE_RAMPART && structure.hits < 100000) ||
                        (structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART)));
                    }
                })
                targets = constructionSites.concat(damagedStructures);

                if(targets.length) {
                    var closestTarget = creep.pos.findClosestByPath(targets);

                    if(closestTarget) {
                        creep.memory.buildingTargetId = closestTarget.id;
                    }
                    else {
                        //TODO: Manage errors
                    }
                } else {
                    creep.memory.buildingTargetId = 'None';
                }
            }

            if(creep.memory.buildingTargetId != 'None') {
                var target = Game.getObjectById(creep.memory.buildingTargetId);

                var error = creep.build(target);

                if(error == ERR_INVALID_TARGET) {
                    error = creep.repair(target);
                }
                if(error == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }
        else {
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
};

module.exports = roleBuilder;
