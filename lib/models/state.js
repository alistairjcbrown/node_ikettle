/**
 *  iKettle State Model
 */
(function() {
    "use strict";

    // Libraries
    var Backbone = require("backbone"),
        _ = require("underscore"),
        check = require("check-type").init(),

    // Local Variables
        IKettle_state;

    // ---

    IKettle_state = Backbone.Model.extend({

        defaults: {
            "100C":         false,
            "95C":          false,
            "80C":          false,
            "65C":          false,
            warm:           false,
            warm_time:      null,
            on:             false,
            at_temperature: false,
            problem:        false,
            available:      true,
            connected:      false
        },

        tempChange: function(temp) {
            return {
                "100C": temp === "100C",
                "95C":  temp === "95C",
                "80C":  temp === "80C",
                "65C":  temp === "65C"
            };
        },

        setInitial: function(binary) {
            this.set({
                "100C":         binary[5] === "1",
                "95C":          binary[4] === "1",
                "80C":          binary[3] === "1",
                "65C":          binary[2] === "1",
                warm:           binary[1] === "1",
                on:             binary[0] === "1",
                warm_time:      this.defaults.warm_time,
                at_temperature: this.defaults.at_temperature,
                problem:        this.defaults.problem,
                available:      this.defaults.available,
                connected:      true
            });
        },

        reset: function(overrides) {
            if (check(overrides).is.not("object")) {
                overrides = {};
            }
            overrides.connected = this.get("connected");
            this.set(_.extend({}, this.defaults, overrides));
        },

        update: function(change_id) {
            var changes = {
                at_temperature: this.defaults.at_temperature,
                problem:        this.defaults.problem,
                available:      this.defaults.available
            };

            switch(change_id) {
                case "100": {
                    _.extend(changes, this.tempChange("100C"));
                    break;
                }
                case "95": {
                    _.extend(changes, this.tempChange("95C"));
                    break;
                }
                case "80": {
                    _.extend(changes, this.tempChange("80C"));
                    break;
                }
                case "65": {
                    _.extend(changes, this.tempChange("65C"));
                    break;
                }
                case "11": {
                    _.extend(changes, { warm: true });
                    break;
                }
                case "10": {
                    _.extend(changes, { warm: false });
                    _.extend(changes, { warm_time: null });
                    break;
                }
                case "5": {
                    _.extend(changes, { on: true });
                    break;
                }
                case "0": {
                    this.reset();
                    return;
                }
                case "8005":
                case "8010":
                case "8020": {
                    _.extend(changes, {
                        warm_time: parseInt(change_id.slice(-2), 10)
                    });
                    break;
                }
                case "3": {
                    _.extend(changes, { at_temperature: true });
                    break;
                }
                case "2": {
                    _.extend(changes, { problem: true });
                    break;
                }
                case "1": {
                    this.reset({
                        available: false
                    });
                    return;
                }
            }

            this.set(changes);
        }

    });

    module.exports = IKettle_state;
}());
