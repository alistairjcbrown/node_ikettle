/*
 *  This example will connect to the iKettle and output the current state.
 *  It will then hold the connection open for 30 seconds, and output any changes
 *  which occur on the model.
 *
 *  Update the host and port as required.
 */
(function() {
    "use strict";

    var iKettle = require("../index.js"),
        host = "192.168.0.58",
        port = 2000;

    iKettle.connect(port, host, function(err, state) {
        if (err) {
            console.log("An error occurred:", err);
            iKettle.disconnect();
            return;
        }

        console.log("iKettle state is:", JSON.stringify(state, null, "  "));
        console.log("\nListening for state changes for the next 30 seconds...");

        state.on("change", function(details) {
            console.log("\niKettle state updated:", JSON.stringify(details.changed, null, "  "));
        });

        /* global setTimeout */
        setTimeout(function() {
            console.log("\n30 seconds over, closing connection");
            iKettle.disconnect();
        }, 30000);
    });

}());
