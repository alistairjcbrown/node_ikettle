/**
 *  iKettle connection
 *
 *  Interacts with the TCP endpoint of the iKettle
 *
 *  Thanks to: http://www.awe.com/mark/blog/20140223.html
 */
(function() {
    "use strict";

    // Libraries
    var net         = require("net"),
        Q           = require("q"),
        check       = require("check-type"),
        config      = require("../config/lib.json"),
        utils       = require("./utils"),
        State_model = require("./models/state"),

    // Local Variables
        client = new net.Socket(),
        state  = new State_model(),
        incoming_change  = new RegExp(config.incoming.change),
        incoming_initial = new RegExp(config.incoming.initial),
        connect, getInitialState,
        incomingStateChange, incomingInitialData, setupListener;

    check.init();
    state.reset({
        connected: false
    });

    // ---

    connect = function(port, host, callback) {
        // TODO: clever params which mean that port and host are optional
        //       Or accept an object of details...
        if (check(port).is.not("number") || port < 1) {
            throw new Error("No port provided");
        }

        if (check(host).is.not("string") || host.length < 1) {
            throw new Error("No host provided");
        }

        client.connect(port, host, function() {
            // Check that the client is connected to an iKettle
            // Ping the client with a kettle greeting
            client.write(config.outgoing.greeting);

            // Check for pong response from the kettle
            client.once("data", function(data) {
                var response;
                if (check(data).is("null") || check(data).is("undefined") ||
                    check(data.toString).is.not("function")) {
                    return callback(new Error("Invalid response buffer"));
                }

                response = data.toString();
                if (response !== config.incoming.greeting) {
                    return callback(new Error("Unexpected reply"));
                }

                callback(null);
            });
        });
    };

    incomingStateChange = function(data) {
        state.update(data);
    };

    incomingInitialData = function(data) {
        var binary = utils.convertToBinary(data);
        state.setInitial(binary);
    };

    setupListener = function(callback) {
        client.on("data", function(data) {
            var response, selected_data;
            if (check(data).is("null") || check(data).is("undefined") ||
                check(data.toString).is.not("function")) {
                return;
            }
            response = data.toString();

            selected_data = incoming_change.exec(data.toString());
            if (check(selected_data).is("object") && selected_data.length > 1) {
                return incomingStateChange(selected_data[1]);
            }

            selected_data = incoming_initial.exec(data.toString());
            if (check(selected_data).is("object") && selected_data.length > 1) {
                return incomingInitialData(selected_data[1]);
            }
        });

        callback();
    };

    getInitialState = function(callback) {
        client.write(config.outgoing.initial);
        state.once("all", function() {
            callback();
        });
    };

    // Expose functionality

    module.exports = {
        connect: function(port, host, callback) {
            Q.nfcall(connect, port, host)
            .then(function() {
                return Q.nfcall(setupListener);
            })
            .then(function() {
                return Q.nfcall(getInitialState);
            })
            .then(function() {
                callback(null, state);
            }, function(error) {
                callback(error);
            });
        },
        disconnect: function() {
            client.destroy();
            state.destroy();
        },
        state: state,
        connection: client
    };

}());
