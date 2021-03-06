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
        connect, getInitialRemoteState, initialRemoteData,
        remoteStateChange, localStateChange,
        setupRemoteListener, setupLocalListener;

    check.init();
    state.reset({ connected: false });

    // ---

    connect = function(port, host, callback) {
        callback = check(callback).is("function") ? callback : false;

        if (check(port).is.not("number") || port < 1) {
            throw new Error("Invalid port provided");
        }

        if (check(host).is.not("string") || host.length < 1) {
            throw new Error("Invalid host provided");
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
                    return callback && callback(new Error("Invalid response buffer"));
                }

                response = data.toString();
                if (response !== config.incoming.greeting) {
                    return callback && callback(new Error("Unexpected reply"));
                }

                callback && callback(null);
            });
        });
    };

    remoteStateChange = function(data) {
        state.update(data);
    };

    initialRemoteData = function(data) {
        var binary = utils.convertToBinary(data);
        state.setInitial(binary);
    };

    setupRemoteListener = function(callback) {
        callback = check(callback).is("function") ? callback : false;

        client.on("data", function(data) {
            var response, selected_data;
            if (check(data).is("null") || check(data).is("undefined") ||
                check(data.toString).is.not("function")) {
                return;
            }
            response = data.toString();

            selected_data = incoming_change.exec(data.toString());
            if (check(selected_data).is("object") && selected_data.length > 1) {
                return remoteStateChange(selected_data[1]);
            }

            selected_data = incoming_initial.exec(data.toString());
            if (check(selected_data).is("object") && selected_data.length > 1) {
                return initialRemoteData(selected_data[1]);
            }
        });

        client.on("close", function() {
            state.destroy();
        });

        callback && callback();
    };

    getInitialRemoteState = function(callback) {
        callback = check(callback).is("function") ? callback : false;

        client.write(config.outgoing.initial);
        state.once("all", function() {
            callback && callback();
        });
    };

    setupLocalListener = function(callback) {
        callback = check(callback).is("function") ? callback : false;

        state.on("change", localStateChange);
        callback && callback();
    };

    localStateChange = function(details, options) {
        var changes = details.changed;

        // Ignore remote changes from the kettle
        if (options.source === "kettle") {
            return;
        }

        if (changes.on === true) {
            client.write(config.outgoing.change.replace("{id}", "4"));
        } else if (changes.on === false) {
            client.write(config.outgoing.change.replace("{id}", "0"));
        }

        if (changes["100C"] === true) {
            client.write(config.outgoing.change.replace("{id}", "80"));
        }

        if (changes["95C"] === true) {
            client.write(config.outgoing.change.replace("{id}", "2"));
        }

        if (changes["80C"] === true) {
            client.write(config.outgoing.change.replace("{id}", "4000"));
        }

        if (changes["65C"] === true) {
            client.write(config.outgoing.change.replace("{id}", "200"));
        }

        if (changes.warm === true || changes.warm === false) {
            client.write(config.outgoing.change.replace("{id}", "8"));
        }

        if (changes.warm_time === 5) {
            client.write(config.outgoing.change.replace("{id}", "8005"));
        } else if (changes.warm_time === 10) {
            client.write(config.outgoing.change.replace("{id}", "8010"));
        } else if (changes.warm_time === 20) {
            client.write(config.outgoing.change.replace("{id}", "8020"));
        }
    };

    // Expose functionality

    module.exports = {
        connect: function(port, host, callback) {
            // Default port to 2000 if not provided
            if (check(port).is("string") && check(callback).is("undefined") &&
                (check(host).is("undefined") || check(host).is("function"))) {
                callback = host;
                host = port;
                port = 2000;
            }

            callback = check(callback).is("function") ? callback : false;

            Q.nfcall(connect, port, host)
            .then(function() {
                return Q.nfcall(setupRemoteListener);
            })
            .then(function() {
                return Q.nfcall(getInitialRemoteState);
            })
            .then(function() {
                return Q.nfcall(setupLocalListener);
            })
            .then(function() {
                callback && callback(null, state);
            }, function(error) {
                callback && callback(error);
            });
        },
        disconnect: function() {
            client.end();
            state.destroy();
        },
        state: state,
        connection: client
    };

}());
