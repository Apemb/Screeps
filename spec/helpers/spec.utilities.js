var specUtilities = {

    loadScreepsAPI: function ()
    {
        require('../../ScreepsAutocomplete/Structures/StructureSpawn');

        require('../../ScreepsAutocomplete/Room');
        Room = function() { };

        require('../../ScreepsAutocomplete/Creep');

        require('../../ScreepsAutocomplete/Memory');

        require('../../screepsAPI/screeps.api.constants');
        require('../../screepsAPI/screeps.api.source');
    }
};

module.exports = specUtilities;