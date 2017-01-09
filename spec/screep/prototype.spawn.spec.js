Global = {};
Global.Test = true;
Global.Log = false;

describe("spawn", function() {
    var specUtilities = require('../helpers/spec.utilities');
    var roomAllocation = require('../../room.allocation');

    require('../../prototype.room');
    require('../../prototype.source');
    require('../../prototype.spawn');

    specUtilities.loadScreepsAPI();
    roomAllocation.prepareForTest();

    var roomMock = new Room();

    beforeEach(function() {

        roomMock = new Room();
        roomMock.energyCapacityAvailable = 1000;
        roomMock.energyAvailable = 500

    });

    describe("createMiner", function() {

        it("return at least the base arguments even if energy  equal 0", function() {
            // Arrange
            var minerData = {};
            minerData.sourceId = "1234";
            minerData.sourceClosestContainerId = "abcd";

            var spawn = new Spawn();
            spawn.room = roomMock;

            var receivedAttributes = [];
            var receivedName = "";
            var receivedMemory = {};

            spawn.createCreep = function (creepAttributes, creepName, creepMemory) {
                receivedAttributes = creepAttributes;
                receivedName = creepName;
                receivedMemory = creepMemory;
            };

            // Act
            spawn.createMiner(minerData);

            // Assert
            expect(receivedAttributes).toEqual([WORK,CARRY,MOVE,WORK,WORK,WORK]);
            expect(receivedName).toBeUndefined();
            expect(receivedMemory).toEqual({
                role: 'miner',
                source: minerData.sourceId,
                container: minerData.sourceClosestContainerId
            });
        });
    });
});
