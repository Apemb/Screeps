if(!Room.prototype.addSourcesToMemory) {

    Room.prototype.addSourcesToMemory = function () {
        if (!this.memory.sources) {
            this.memory.sources = {};
            var sources = this.find(FIND_SOURCES);
            for (var i in sources) {
                var source = sources[i];
                source.memory = this.memory.sources[source.id] = {};
                source.memory.miners = {};
            }
        }
    }
}

if(!Room.prototype.memory) {

    Room.prototype.memory = function () {
        return Memory.rooms[this.name];
    }
}