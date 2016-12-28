if(!Source.prototype.cleanMinerMemory) {

    Source.prototype.cleanMinerMemory = function () {
        for(var minerName in this.room.memory.sources[this.id].miners) {
            if(!Game.creeps[minerName]) {
                delete this.room.memory.sources[this.id].miners[minerName];
            }
        }
    };
}

if(!Source.prototype.memory) {

    Source.prototype.memory = function() {
        console.log('source id: ' + this.id + 'has miners: ' + this.room.memory.sources[this.id].miners);
        return this.room.memory.sources[this.id];
    };
}