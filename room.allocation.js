require('./prototype.source');
require('./prototype.room');

const MINER_PER_MINE = 1;

var roomAllocation = {

    prepareForTest: function () {
        var specUtilities = require('./spec/helpers/spec.utilities');
        specUtilities.loadScreepsAPI();
    },
    
    sourcesNeedingMiner: function(room) {
        var sourcesNeedingMinerDataArray = [];

        for(var sourceId in room.memory.sources) {

            var miners = room.memory.sources[sourceId].miners;

            for (var miner in miners) {
                if(!Game.creeps[miner]) {
                    console.log('Deleted ' + miner + ' from source ' + sourceId);
                    delete miners[miner];
                }
            }

            if (Object.keys(miners).length < MINER_PER_MINE) {
                var sourceData = {
                    sourceId: sourceId,
                    sourceClosestContainerId: room.memory.sources[sourceId].container
                }
                sourcesNeedingMinerDataArray.push(sourceData);
            }
        }
        return sourcesNeedingMinerDataArray;
    }
};

module.exports = roomAllocation;

