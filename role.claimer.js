var roleClaimer = {

    run : function(creep){

        var meetupFlag = Game.flags['Claim'];

        if(typeof meetupFlag === "undefined") {
            var targetRoom = creep.room;
        } else {
            var targetRoom = meetupFlag.pos.roomName;
        }

        if (creep.room.name != targetRoom){
            let exit = creep.room.findExitTo(targetRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit));

        } else {
            if (meetupFlag.color == COLOR_WHITE) {
                if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            } else {
                creep.moveTo(meetupFlag.pos);
            }
        }
    }
};

module.exports = roleClaimer;
