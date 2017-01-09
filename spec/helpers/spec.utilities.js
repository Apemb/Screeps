var specUtilities = {

    loadScreepsAPI: function ()
    {
        
        Room = function() { };
        
        require('../../screepsAPI/screeps.api.constants');
        require('../../screepsAPI/screeps.api.source');
        require('../../screepsAPI/screeps.api.object.spawn');
    }
};

module.exports = specUtilities;