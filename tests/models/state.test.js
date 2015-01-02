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
            });

            teardown(function() {
                env.model.destroy();
            });

            test("should be a Backbone model", function() {
                expect(env.model).to.be.an.instanceOf(Backbone.Model);
            });

            suite("update", function() {
                setup(function() {
                    env.state_change = env.sb.spy();
                    env.model.reset();
                    env.model.on("change", env.state_change);
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
        });
    });

}());
