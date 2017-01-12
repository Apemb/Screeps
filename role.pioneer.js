var rolePioneer = {

    run : function(creep){

        var meetupFlag = Game.flags['Pioneers'];

        if(typeof meetupFlag === "undefined") {
            var targetRoom = creep.room;
        } else {
            var targetRoom = meetupFlag.pos.roomName;
        }

        if (creep.room.name != targetRoom){
            let exit = creep.room.findExitTo(targetRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit));

        } else {
            if (meetupFlag.color == COLOR_GREEN) {
                if(creep.memory.building && creep.carry.energy == 0) {
                    creep.memory.building = false;
                }
                if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
                    creep.memory.building = true;
                }

                if(creep.memory.building) {
                    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                    if(targets.length) {
                        if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0]);
                        }
                    }
                }
                else {
                    var sources = creep.room.find(FIND_SOURCES);
                    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0]);
                    }
                }
            } else {
                creep.moveTo(meetupFlag.pos);
            }
        }
    }
};

module.exports = rolePioneer;
