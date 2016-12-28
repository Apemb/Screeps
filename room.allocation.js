require('extension.source');
require('extension.room');

const MINER_PER_MINE = 1;

var roomAllocation = {
    
    sourcesNeedingMiner: function(room) {
        var sourcesNeedingMinerArray = [];

        for(var sourceId in room.memory.sources) {

            var miners = room.memory.sources[sourceId].miners;

            for (var miner in miners) {
                if(!Game.creeps[miner]) {
                    console.log('Deleted ' + miner + ' from source ' + sourceId);
                    delete miners[miner];
                }
            }

            if (Object.keys(miners).length < MINER_PER_MINE) {
                sourcesNeedingMinerArray.push(sourceId);
            }
        }
        return sourcesNeedingMinerArray;
    }
};

module.exports = roomAllocation;

