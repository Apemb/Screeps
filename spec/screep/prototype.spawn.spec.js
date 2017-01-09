Global = {};
Global.Test = true;


describe("spawn", function() {
    var specUtilities = require('../helpers/spec.utilities');
    var roomAllocation = require('../../room.allocation');

    require('../../prototype.room');
    require('../../prototype.source');
    require('../../prototype.spawn');

    specUtilities.loadScreepsAPI();
    roomAllocation.prepareForTest();
    // Source.prepareForTest();
    // Room.prepareForTest();


    beforeEach(function() {

        var room = new Room();
        room.find = function(type, opts) {
            return [];
        };
        room.energyCapacityAvailable = 1000;

    });

    describe("spawnCreepsIfNecessary", function() {

        it("return at least the base arguments even if energy  equal 0", function() {
            // Arrange
            var spawn = new Spawn();
            spawn.energy = 100

            // Act

            // Assert
        });
    });
});
