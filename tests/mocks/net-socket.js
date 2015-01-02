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
            this.destroy = sb.spy();
            this._sb_reset = function() {
                sb.reset();
            };
        };

    setup(function() {
        sb.reset();
    });

    module.exports = Socket;

}());
