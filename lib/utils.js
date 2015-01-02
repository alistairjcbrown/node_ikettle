/**
 *  Utils
 *
 *  A collection of useful functions
 */
(function() {
    "use strict";

    module.exports = {

        convertToBinary: function(data) {
            var binary = data.charCodeAt(0).toString(2);
            return ("000000" + binary).slice(-6);
        }

    };

}());
