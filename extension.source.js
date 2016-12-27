if(!Source.prototype.cleanMinerMemory) {

    Source.prototype.cleanMinerMemory = function () {

        for(var minerName in this.room.memory.sources[this.id].miners) {
            if(!Game.creeps[minerName]) {
                delete this.room.memory.sources[this.id].miners[minerName];
            }
        }
    };
}
