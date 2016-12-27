
var roomAllocation = {
    
    sourcesNeedingMiner: function(room) {
        var sources = room.find(FIND_SOURCES);
        return [];
    }
};

module.exports = roomAllocation;

