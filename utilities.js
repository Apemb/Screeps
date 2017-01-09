var utilities = {

    getSortedContainersForCreep: function(creep) {

        var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (i) => (i.structureType == STRUCTURE_CONTAINER)
        });

        containers = containers;

        return containers.sort(function (a, b) {
            var pathToA = creep.pos.findPathTo(a);
            var pathToB = creep.pos.findPathTo(b);

            lengthToA = _.sum(a.store) / 10 - pathToA.length ;
            lengthToB = _.sum(b.store) / 10 - pathToB.length ;

            return (lengthToB - lengthToA);
        });
    },

    sortBestMinerForCreep: function(array, creep) {
        return array.sort(function (a, b) {
            var pathToA = creep.pos.findPathTo(a);
            var pathToB = creep.pos.findPathTo(b);

            lengthToA = a.carry.energy * 2 - pathToA.length ;
            lengthToB = b.carry.energy * 2 - pathToB.length ;

            return (lengthToB - lengthToA);
        });
    }

};

module.exports = utilities;