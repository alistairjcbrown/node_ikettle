/**
 *  iKettle State Model Tests
 */
(function() {
    "use strict";

    var chai = require("chai"),
        sinon = require("sinon"),
        sinon_chai = require("sinon-chai"),
        expect = chai.expect,
        env = {},
        Backbone = require("backbone"),
        State_model = require("../../lib/models/state");

    chai.use(sinon_chai);

    suite("iKettle State Model", function() {
        setup(function() {
            env = {
                sb: sinon.sandbox.create()
            };
        });

        teardown(function() {
            env.sb.restore();
        });

        test("should exist", function() {
            expect(State_model).to.be.a("function");
        });

        suite("instantiated", function() {
            setup(function() {
                env.model = new State_model();
                env.model.reset();
                env.state_change = env.sb.spy();
                env.model.on("change", env.state_change);
                env.invalid_state_change = env.sb.spy();
                env.model.on("invalid", env.invalid_state_change);
            });

            teardown(function() {
                env.model.off("change");
                env.model.off("invalid");
                env.model.destroy();
            });

            test("should be a Backbone model", function() {
                expect(env.model).to.be.an.instanceOf(Backbone.Model);
            });

            suite("change state model", function() {
                test("should not allow changes when not connected", function() {
                    env.model.set("on", true);
                    expect(env.state_change).to.not.be.called;
                    var err = env.invalid_state_change.getCall(0).args[1];
                    expect(err).to.be.instanceOf(Error);
                    expect(err.message).to.equal("Not connected");
                });

                test("should allow changes when connected", function() {
                    env.model.attributes.connected = true;
                    env.model.set("on", true);
                    expect(env.invalid_state_change).to.not.be.called;
                    var changes = env.state_change.getCall(0).args[0].changed;
                    expect(changes).to.deep.equal({ on: true });
                });

                test("should not tag changes with source", function() {
                    env.model.attributes.connected = true;
                    env.model.set("on", true);
                    var options = env.state_change.getCall(0).args[1];
                    expect(options.source).to.not.exist;
                });
            });

            suite("update", function() {
                setup(function() {
                    env.model.attributes.connected = true;
                    env.model.attributes.available = true;
                });

                test("should exist", function() {
                    expect(env.model.update).to.be.a("function");
                });

                test("should set the source to iKettle", function() {
                    env.model.update("100");
                    var options = env.state_change.getCall(0).args[1];
                    expect(options.source).to.equal("kettle");
                });

                test("should set temperature to 100C", function() {
                    env.model.update("100");
                    var changes = env.state_change.getCall(0).args[0].changed;
                    expect(changes).to.deep.equal({ "100C": true });
                });

                test("should set temperature to 95C", function() {
                    env.model.update("95");
                    var changes = env.state_change.getCall(0).args[0].changed;
                    expect(changes).to.deep.equal({ "95C": true });
                });

                test("should set temperature to 80C", function() {
                    env.model.update("80");
                    var changes = env.state_change.getCall(0).args[0].changed;
                    expect(changes).to.deep.equal({ "80C": true });
                });

                test("should set temperature to 65C", function() {
                    env.model.update("65");
                    var changes = env.state_change.getCall(0).args[0].changed;
                    expect(changes).to.deep.equal({ "65C": true });
                });

                test("should set warm", function() {
                    env.model.update("11");
                    var changes = env.state_change.getCall(0).args[0].changed;
                    expect(changes).to.deep.equal({ warm: true });
                });

                test("should unset warm", function() {
                    env.model.attributes.warm = true;
                    env.model.update("10");
                    var changes = env.state_change.getCall(0).args[0].changed;
                    expect(changes).to.deep.equal({ warm: false });
                });

                test("should set on", function() {
                    env.model.update("5");
                    var changes = env.state_change.getCall(0).args[0].changed;
                    expect(changes).to.deep.equal({ on: true });
                });

                test("should set off", function() {
                    env.model.attributes.on = true;
                    env.model.update("0");
                    var changes = env.state_change.getCall(0).args[0].changed;
                    expect(changes).to.deep.equal({ on: false });
                });

                test("should set warm length to 5 minutes", function() {
                    env.model.update("8005");
                    var changes = env.state_change.getCall(0).args[0].changed;
                    expect(changes).to.deep.equal({ warm_time: 5 });
                });

                test("should set warm length to 10 minutes", function() {
                    env.model.update("8010");
                    var changes = env.state_change.getCall(0).args[0].changed;
                    expect(changes).to.deep.equal({ warm_time: 10 });
                });

                test("should set warm length to 20 minutes", function() {
                    env.model.update("8020");
                    var changes = env.state_change.getCall(0).args[0].changed;
                    expect(changes).to.deep.equal({ warm_time: 20 });
                });

                test("should set 'at temperature' flag", function() {
                    env.model.update("3");
                    var changes = env.state_change.getCall(0).args[0].changed;
                    expect(changes).to.deep.equal({ at_temperature: true });
                });

                test("should set 'problem' flag", function() {
                    env.model.update("2");
                    var changes = env.state_change.getCall(0).args[0].changed;
                    expect(changes).to.deep.equal({ problem: true });
                });

                test("should set 'available' flag", function() {
                    env.model.attributes.available = true;
                    env.model.update("1");
                    var changes = env.state_change.getCall(0).args[0].changed;
                    expect(changes).to.deep.equal({ available: false });
                });

                suite("when temperature is changed", function() {
                    setup(function() {
                        env.model.attributes.on = true;
                        env.model.attributes["100C"] = true;
                    });

                    test("should unset old temperature", function() {
                        env.model.update("80");
                        var changes = env.state_change.getCall(0).args[0].changed;
                        expect(changes).to.deep.equal({ "80C": true, "100C": false });
                    });
                });

                suite("when warm has ended", function() {
                    setup(function() {
                        env.model.attributes.warm = true;
                        env.model.attributes.warm_time = 5;
                    });

                    test("should unset warm time", function() {
                        env.model.update("10");
                        var changes = env.state_change.getCall(0).args[0].changed;
                        expect(changes).to.deep.equal({ warm: false, warm_time: null });
                    });
                });

                suite("when turned off", function() {
                    setup(function() {
                        env.model.attributes.on = true;
                        env.model.attributes["80C"] = true;
                    });

                    test("should reset", function() {
                        env.model.update("0");
                        var changes = env.state_change.getCall(0).args[0].changed;
                        expect(changes).to.deep.equal({ on: false, "80C": false });
                    });
                });

                suite("when no longer available", function() {
                    setup(function() {
                        env.model.attributes.on = true;
                        env.model.attributes["65C"] = true;
                    });

                    test("should reset with not available", function() {
                        env.model.update("1");
                        var changes = env.state_change.getCall(0).args[0].changed;
                        expect(changes).to.deep.equal({
                            on: false,
                            available: false,
                            "65C": false
                        });
                    });
                });

                suite("when flags are set and new response received", function() {
                    setup(function() {
                        env.model.attributes.at_temperature = true;
                        env.model.attributes.problem        = true;
                        env.model.attributes.available      = false;
                    });

                    test("should reset 'at temperature' flag to false", function() {
                        env.model.update("5");
                        var changes = env.state_change.getCall(0).args[0].changed;
                        expect(changes.at_temperature).to.equal(false);
                    });

                    test("should reset 'problem' flag to false", function() {
                        env.model.update("5");
                        var changes = env.state_change.getCall(0).args[0].changed;
                        expect(changes.problem).to.equal(false);
                    });

                    test("should reset 'available' flag to true", function() {
                        env.model.update("5");
                        var changes = env.state_change.getCall(0).args[0].changed;
                        expect(changes.available).to.equal(true);
                    });
                });
            });

            suite("tempChange", function() {
                test("should exist", function() {
                    expect(env.model.tempChange).to.be.a("function");
                });

                test("should return object with only provided temp set to true", function() {
                    expect(env.model.tempChange("80C")).to.deep.equal({
                        "100C": false,
                        "95C":  false,
                        "80C":  true,
                        "65C":  false
                    });
                });

                test("should return object with all temps set to false for unknown temp", function() {
                    expect(env.model.tempChange("foo")).to.deep.equal({
                        "100C": false,
                        "95C":  false,
                        "80C":  false,
                        "65C":  false
                    });
                });
            });

            suite("setInitial", function() {
                setup(function() {
                    env.model.attributes.connected = true;
                    env.model.attributes.available = true;
                });

                test("should exist", function() {
                    expect(env.model.setInitial).to.be.a("function");
                });

                test("should set the source to iKettle", function() {
                    env.model.setInitial("100000");
                    var options = env.state_change.getCall(0).args[1];
                    expect(options.source).to.equal("kettle");
                });

                test("should return base initial state when binary 0", function() {
                    env.model.attributes.on = true;
                    env.model.setInitial("000000");
                    var changes = env.state_change.getCall(0).args[0].changed;
                    expect(changes).to.deep.equal({ on: false });
                });

                test("should return on when binary 32", function() {
                    env.model.setInitial("100000");
                    var changes = env.state_change.getCall(0).args[0].changed;
                    expect(changes).to.deep.equal({ on: true });
                });

                test("should return warm when binary 16", function() {
                    env.model.setInitial("010000");
                    var changes = env.state_change.getCall(0).args[0].changed;
                    expect(changes).to.deep.equal({ warm: true });
                });

                test("should return 65C when binary 8", function() {
                    env.model.setInitial("001000");
                    var changes = env.state_change.getCall(0).args[0].changed;
                    expect(changes).to.deep.equal({ "65C": true });
                });

                test("should return 80C when binary 4", function() {
                    env.model.setInitial("000100");
                    var changes = env.state_change.getCall(0).args[0].changed;
                    expect(changes).to.deep.equal({ "80C": true });
                });

                test("should return 95C when binary 2", function() {
                    env.model.setInitial("000010");
                    var changes = env.state_change.getCall(0).args[0].changed;
                    expect(changes).to.deep.equal({ "95C": true });
                });

                test("should return 100C when binary 1", function() {
                    env.model.setInitial("000001");
                    var changes = env.state_change.getCall(0).args[0].changed;
                    expect(changes).to.deep.equal({ "100C": true });
                });
            });

            suite("reset", function() {
                test("should exist", function() {
                    expect(env.model.reset).to.be.a("function");
                });

                test("should set the source to iKettle", function() {
                    env.model.reset({ on: true });
                    var options = env.state_change.getCall(0).args[1];
                    expect(options.source).to.equal("kettle");
                });

                test("should set model back to default values", function() {
                    env.model.attributes.on = true;
                    env.model.attributes["80C"] = true;

                    env.model.reset();
                    var changes = env.state_change.getCall(0).args[0].changed;
                    expect(changes).to.deep.equal({ on: false, "80C": false });
                });

                test("should use reset overrides provided", function() {
                    env.model.reset({ on: true, "65C": true });
                    var changes = env.state_change.getCall(0).args[0].changed;
                    expect(changes).to.deep.equal({ on: true, "65C": true });
                });

                test("should ignore invalid overrides", function() {
                    env.model.reset({ foo: "bar" });
                    expect(env.state_change).to.not.be.called;
                    expect(env.model.get("foo")).to.not.exist;
                });

                test("should retain model connected value", function() {
                    env.model.attributes.connected = "foo";

                    env.model.reset();
                    expect(env.model.get("connected")).to.equal("foo");
                });
            });

            suite("destroy", function() {
                setup(function() {
                    env.model.set({
                        connected: true,
                        available: true,
                        on: true
                    });
                });

                test("should exist", function() {
                    expect(env.model.destroy).to.be.a("function");
                });

                test("should set model back to defaults", function() {
                    env.model.destroy();
                    expect(env.model.get("connected")).to.be.false;
                    expect(env.model.get("available")).to.be.false;
                    expect(env.model.get("on")).to.be.false;
                });
            });
        });
    });

}());
