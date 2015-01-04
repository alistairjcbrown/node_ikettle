/**
 *  iKettle State Model
 */
(function() {
    "use strict";

    // Libraries
    var Backbone = require("backbone"),
        _ = require("underscore"),
        check = require("check-type").init(),
        set = Backbone.Model.prototype.set;

    // Force set to always validate
    Backbone.Model.prototype.set = function(key, val, options) {
        var data = {};

        if (check(key).is("object")) {
            data = key;
            options = val;
        } else {
            data[key] = val;
        }

        return set.call(this, data, _.extend({validate: true}, options));
    };

    module.exports = Backbone.Model.extend({
        validate: function(attributes, options) {
            if (attributes.connected !== true && options.source !== "kettle") {
                return new Error("Not connected");
            }
        },

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
            available:      false,
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
                available:      true,
                connected:      true
            }, {
                source: "kettle"
            });
        },

        destroy: function() {
            this.reset(this.defaults);
            Backbone.Model.prototype.destroy.apply(this, arguments);
        },

        reset: function(overrides) {
            var connection_state = {
                    connected: this.get("connected")
                },
                valid_overrides;

            if (check(overrides).is.not("object")) {
                overrides = {};
            }

            valid_overrides = _.pick(overrides, _.keys(this.defaults));

            this.set(_.extend({}, this.defaults, connection_state, valid_overrides), {
                source: "kettle"
            });
        },

        update: function(change_id) {
            var changes = {
                at_temperature: false,
                problem:        false,
                available:      true
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
                    this.reset(changes);
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

            this.set(changes, { source: "kettle" });
        }
    });

}());
