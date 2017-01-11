var roleSoldier = {

    run : function(creep){

        var meetupFlag = Game.flags['Soldier'];

        if(typeof meetupFlag === "undefined") {
            var targetRoom = creep.room;
        } else {
            var targetRoom = meetupFlag.pos.roomName;
        }

        if (creep.room.name != targetRoom){
            let exit = creep.room.findExitTo(targetRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit));

        } else {
            if (meetupFlag.color == COLOR_RED) {
                var primaryTarget = creep.pos.findClosestByRange([
                    Game.rooms[creep.pos.roomName].hostiles,
                    Game.rooms[creep.pos.roomName].hostileStructures,
                    creep.pos.findClosestByRange(FIND_STRUCTURES, {filter : (s) => s.structureType == STRUCTURE_WALL })
                ]);
            } else if (meetupFlag.color == COLOR_ORANGE){
                var primaryTarget = creep.pos.findClosestByRange([
                    Game.rooms[creep.pos.roomName].hostiles,
                    Game.rooms[creep.pos.roomName].hostileTowers
                ]);
            } else if (meetupFlag.color == COLOR_YELLOW){
                var primaryTarget = creep.pos.findClosestByRange([
                    creep.pos.findClosestByRange(FIND_STRUCTURES, {filter : (s) => s.structureType == STRUCTURE_SPAWN })
                ]);
            } else {
                var primaryTarget = null;
            }

            if(primaryTarget != null) {
                if(creep.attack(primaryTarget) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(primaryTarget);
                }
                else{
                    creep.attack(primaryTarget);
                }
            } else {
                creep.moveTo(meetupFlag.pos);
            }
        }
    }
};

module.exports = roleSoldier;
