/**
 *  Socket mock
 */
(function() {
    "use strict";

    var sinon = require("sinon"),
        sb = sinon.sandbox.create(),
        Socket = function() {
            this.connect = sb.spy();
            this.on = sb.spy();
            this.once = sb.spy();
            this.write = sb.spy();
            this.end = sb.spy();
        };

    setup(function() {
        sb.reset();
    });

    module.exports = Socket;

}());
