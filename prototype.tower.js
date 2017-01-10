module.exports = function() {

    StructureTower.prototype.spendEnergy = function () {

        let enemyTarget = this.pos.findClosestByRange(this.room.hostiles);
        if (enemyTarget != undefined) {
            this.attack(enemyTarget);
        }

        else{
            alliedTarget = this.pos.findClosestByRange(FIND_MY_CREEPS, {filter: c => c.hits < c.hitsMax});
            if (alliedTarget != undefined) {
                this.heal(alliedTarget);
            }
            else{
                repairTarget = this.room.find(FIND_STRUCTURES, {filter: s => s.hits < Math.min(150000, s.hitsMax)});
                if (repairTarget.length) {
                    this.repair(repairTarget[0]);
                }
            }
        }
    }
}