Global = {};
Global.Test = true;
Global.Log = false;
Global.DebugLog = false;

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
        it("should create the miner with the right attributes", function() {
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
    describe("createHarvester", function() {
        it("should create the harvester with the right attributes", function() {
            // Arrange
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
            spawn.createHarvester();

            // Assert
            expect(receivedAttributes).toEqual([CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]);
            expect(receivedName).toBeUndefined();
            expect(receivedMemory).toEqual({
                role: 'harvester'
            });
        });
    });
    describe("createBuilder", function() {
        it("should create the builder with the right attributes", function() {
            // Arrange
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
            spawn.createBuilder();

            // Assert
            expect(receivedAttributes).toEqual([WORK,CARRY,MOVE,WORK,CARRY,MOVE]);
            expect(receivedName).toBeUndefined();
            expect(receivedMemory).toEqual({
                role: 'builder'
            });
        });
    });
    describe("createSolider", function() {
        it("should create the soldier with the right attributes", function() {
            // Arrange
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
            spawn.createSoldier();

            // Assert
            expect(receivedAttributes).toEqual([
                ATTACK,TOUGH,MOVE,MOVE,
                ATTACK,TOUGH,MOVE,MOVE
            ]);
            expect(receivedName).toBeUndefined();
            expect(receivedMemory).toEqual({
                role: 'soldier'
            });
        });
    });
});
