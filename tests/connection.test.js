/**
 *  iKettle Connection Tests
 */
(function() {
    "use strict";

    var chai = require("chai"),
        sinon = require("sinon"),
        sinon_chai = require("sinon-chai"),
        expect = chai.expect,
        env = {},
        Backbone = require("backbone"),
        net = require("net"),
        net_socket_mock = require("./mocks/net-socket"),
        ikettle,
        exposeConnectionFunctionality, exposeResponseFunctionality,
        exposeLocalStateFunctionality;

    // Mock the net Socket object
    net.Socket = net_socket_mock;
    chai.use(sinon_chai);
    ikettle = require("../lib/connection");

    exposeConnectionFunctionality = function(callback) {
        env.connect_callback = env.sb.spy();
        ikettle.connect(env.port, env.host, env.connect_callback);

        process.nextTick(function() {
            var connection_call = ikettle.connection.connect.getCall(0);
            env.connection_handler = connection_call.args[2];
            callback();
        });
    };

    exposeResponseFunctionality = function(callback) {
        var pong_handler;
        env.connection_handler();

        pong_handler = ikettle.connection.once.getCall(0).args[1];
        pong_handler("HELLOAPP\r");

        process.nextTick(function() {
            var response_call = ikettle.connection.on.getCall(0),
                close_call = ikettle.connection.on.getCall(1);
            env.response_handler = response_call.args[1];
            env.close_handler = close_call.args[1];

            callback();
        });
    };

    exposeLocalStateFunctionality = function(callback) {
        ikettle.state.reset({ connected: false });
        ikettle.state.on.reset();
        env.response_handler("sys status key=\u0000\r");

        process.nextTick(function() {
            var local_change_call = ikettle.state.on.getCall(0);
            env.local_change_handler = local_change_call.args[1];

            callback();
        });
    };

    suite("iKettle connection", function() {
        setup(function() {
            env = {
                port: 2000,
                host: "127.0.0.1",
                sb: sinon.sandbox.create()
            };
            env.sb.spy(ikettle.state, "on");
        });

        teardown(function() {
            env.sb.restore();
        });

        test("should exist", function() {
            expect(ikettle).to.be.an("object");
        });

        suite("connect", function() {
            test("should exist", function() {
                expect(ikettle.connect).to.be.a("function");
            });

            test("should default port to 2000 when only host provided", function(done) {
                ikettle.connect(env.host);

                process.nextTick(function() {
                    var connection_call = ikettle.connection.connect.getCall(0);
                    expect(connection_call.args[0]).to.equal(2000);
                    expect(connection_call.args[1]).to.equal(env.host);
                    done();
                });
            });

            test("should default port to 2000 when host and callback provided", function(done) {
                ikettle.connect(env.host, function() {});

                process.nextTick(function() {
                    var connection_call = ikettle.connection.connect.getCall(0);
                    expect(connection_call.args[0]).to.equal(2000);
                    expect(connection_call.args[1]).to.equal(env.host);
                    done();
                });
            });

            test("should throw an error when port is not provided", function(done) {
                ikettle.connect(null, null, function(err) {
                    expect(err).to.be.instanceOf(Error);
                    expect(err.message).to.equal("Invalid port provided");
                    done();
                });
            });

            test("should throw an error when host is not provided", function(done) {
                ikettle.connect(env.port, null, function(err) {
                    expect(err).to.be.instanceOf(Error);
                    expect(err.message).to.equal("Invalid host provided");
                    done();
                });
            });

            test("should connect using net socket", function(done) {
                ikettle.connect(env.port, env.host);

                process.nextTick(function() {
                    var connection_call = ikettle.connection.connect.getCall(0);
                    expect(connection_call.args[0]).to.equal(env.port);
                    expect(connection_call.args[1]).to.equal(env.host);
                    done();
                });
            });

            suite("connected", function() {
                setup(function(done) {
                    exposeConnectionFunctionality(done);
                });

                test("should ping greeting on connection", function() {
                    env.connection_handler();
                    expect(ikettle.connection.write).to.be.calledOnce;
                    expect(ikettle.connection.write.getCall(0).args[0]).to.equal("HELLOKETTLE\n");
                });

                test("should bind to single response data", function() {
                    env.connection_handler();
                    expect(ikettle.connection.once).to.be.calledOnce;
                    expect(ikettle.connection.once.getCall(0).args[0]).to.equal("data");
                });

                suite("on response", function() {
                    setup(function() {
                        env.connection_handler();
                        env.pong_handler = ikettle.connection.once.getCall(0).args[1];
                    });

                    test("should provide error on invalid response", function(done) {
                        env.pong_handler(null);
                        process.nextTick(function() {
                            var err = env.connect_callback.getCall(0).args[0];
                            expect(err).to.be.instanceOf(Error);
                            expect(err.message).to.equal("Invalid response buffer");
                            done();
                        });
                    });

                    test("should provide error on unknown response", function(done) {
                        env.pong_handler("foo");
                        process.nextTick(function() {
                            var err = env.connect_callback.getCall(0).args[0];
                            expect(err).to.be.instanceOf(Error);
                            expect(err.message).to.equal("Unexpected reply");
                            done();
                        });
                    });
                });
            });

            suite("remote state change handler", function() {
                setup(function(done) {
                    exposeConnectionFunctionality(function() {
                        exposeResponseFunctionality(done);
                    });
                });

                test("should bind to all response data", function() {
                    expect(ikettle.connection.on).to.be.called;
                    expect(ikettle.connection.on.getCall(0).args[0]).to.equal("data");
                });

                suite("on response", function() {
                    setup(function() {
                        env.state_change = env.sb.stub();
                        ikettle.state.reset({ connected: true, available: true });
                        ikettle.state.on("change", env.state_change);
                    });

                    teardown(function() {
                        ikettle.state.destroy();
                    });

                    test("should do nothing on invalid response", function() {
                        env.response_handler(null);
                        expect(env.state_change).to.not.be.called;
                    });

                    test("should do nothing on unknown response", function() {
                        env.response_handler("foo");
                        expect(env.state_change).to.not.be.called;
                    });

                    suite("full state response", function() {
                        test("should set all state data", function() {
                            env.response_handler("sys status key=!\r");
                            expect(env.state_change).to.be.calledOnce;
                            expect(env.state_change.getCall(0).args[0].changed).to.deep.equal({
                                "100C": true,
                                on:     true
                            });
                        });
                    });

                    suite("new state response", function() {
                        test("should set temperature to 80C", function() {
                            env.response_handler("sys status 0x80\r");
                            expect(env.state_change.getCall(0).args[0].changed).to.deep.equal({
                                "80C": true
                            });
                        });
                    });
                });
            });

            suite("connection closed", function() {
                setup(function(done) {
                    exposeConnectionFunctionality(function() {
                        exposeResponseFunctionality(done);
                    });
                });

                test("should bind to close event", function() {
                    expect(ikettle.connection.on).to.be.called;
                    expect(ikettle.connection.on.getCall(1).args[0]).to.equal("close");
                });

                test("should destroy the state model", function() {
                    env.close_handler();
                });
            });

            suite("remote full state request", function() {
                setup(function(done) {
                    exposeConnectionFunctionality(function() {
                        exposeResponseFunctionality(function() {
                            env.state_change = env.sb.stub();
                            ikettle.state.reset({ connected: false });
                            ikettle.state.on("change", env.state_change);
                            done();
                        });
                    });
                });

                teardown(function() {
                    ikettle.state.destroy();
                });

                test("should request current state", function() {
                    expect(ikettle.connection.write).to.be.calledTwice;
                    expect(ikettle.connection.write.getCall(1).args[0]).to.equal("get sys status\n");
                });

                test("should trigger change for connected attribute", function() {
                    env.response_handler("sys status key=\u0000\r");
                    expect(env.state_change).to.be.calledOnce;
                    expect(env.state_change.getCall(0).args[0].changed.connected).to.be.true;
                });
            });

            suite("local state change handler", function() {
                setup(function(done) {
                    exposeConnectionFunctionality(function() {
                        exposeResponseFunctionality(function() {
                            exposeLocalStateFunctionality(function() {
                                ikettle.connection.write.reset();
                                done();
                            });
                        });
                    });
                });

                teardown(function() {
                    ikettle.state.destroy();
                });

                test("should ignore changes with kettle as source", function() {
                    env.local_change_handler({}, { source: "kettle" });
                    expect(ikettle.connection.write).to.not.be.called;
                });

                test("should trigger kettle when 'on' changes to true", function() {
                    ikettle.state.set("on", true);

                    expect(ikettle.connection.write).to.be.calledOnce;
                    expect(ikettle.connection.write.getCall(0).args[0]).to.equal("set sys output 0x4\n");
                });

                test("should trigger kettle when 'on' changes to false", function() {
                    ikettle.state.attributes.on = true;
                    ikettle.state.set("on", false);

                    expect(ikettle.connection.write).to.be.calledOnce;
                    expect(ikettle.connection.write.getCall(0).args[0]).to.equal("set sys output 0x0\n");
                });

                test("should trigger kettle when '100C' changes to true", function() {
                    ikettle.state.set("100C", true);

                    expect(ikettle.connection.write).to.be.calledOnce;
                    expect(ikettle.connection.write.getCall(0).args[0]).to.equal("set sys output 0x80\n");
                });

                test("should trigger kettle when '95C' changes to true", function() {
                    ikettle.state.set("95C", true);

                    expect(ikettle.connection.write).to.be.calledOnce;
                    expect(ikettle.connection.write.getCall(0).args[0]).to.equal("set sys output 0x2\n");
                });

                test("should trigger kettle when '80C' changes to true", function() {
                    ikettle.state.set("80C", true);

                    expect(ikettle.connection.write).to.be.calledOnce;
                    expect(ikettle.connection.write.getCall(0).args[0]).to.equal("set sys output 0x4000\n");
                });

                test("should trigger kettle when '65C' changes to true", function() {
                    ikettle.state.set("65C", true);

                    expect(ikettle.connection.write).to.be.calledOnce;
                    expect(ikettle.connection.write.getCall(0).args[0]).to.equal("set sys output 0x200\n");
                });

                test("should trigger kettle when 'warm' changes to true", function() {
                    ikettle.state.set("warm", true);

                    expect(ikettle.connection.write).to.be.calledOnce;
                    expect(ikettle.connection.write.getCall(0).args[0]).to.equal("set sys output 0x8\n");
                });

                test("should trigger kettle when 'warm' changes to false", function() {
                    ikettle.state.attributes.warm = true;
                    ikettle.state.set("warm", false);

                    expect(ikettle.connection.write).to.be.calledOnce;
                    expect(ikettle.connection.write.getCall(0).args[0]).to.equal("set sys output 0x8\n");
                });

                test("should trigger kettle when 'warm_time' changes to 5", function() {
                    ikettle.state.set("warm_time", 5);

                    expect(ikettle.connection.write).to.be.calledOnce;
                    expect(ikettle.connection.write.getCall(0).args[0]).to.equal("set sys output 0x8005\n");
                });

                test("should trigger kettle when 'warm_time' changes to 10", function() {
                    ikettle.state.set("warm_time", 10);

                    expect(ikettle.connection.write).to.be.calledOnce;
                    expect(ikettle.connection.write.getCall(0).args[0]).to.equal("set sys output 0x8010\n");
                });

                test("should trigger kettle when 'warm_time' changes to 20", function() {
                    ikettle.state.set("warm_time", 20);

                    expect(ikettle.connection.write).to.be.calledOnce;
                    expect(ikettle.connection.write.getCall(0).args[0]).to.equal("set sys output 0x8020\n");
                });
            });
        });

        suite("disconnect", function() {
            setup(function() {
                ikettle.connection.end.reset();
                env.sb.spy(ikettle.state, "destroy");
            });

            test("should exist", function() {
                expect(ikettle.disconnect).to.be.a("function");
            });

            test("should end the connection", function() {
                ikettle.disconnect();
                expect(ikettle.connection.end).to.be.calledOnce;
            });

            test("should destroy the model", function() {
                ikettle.disconnect();
                expect(ikettle.state.destroy).to.be.calledOnce;
            });
        });

        suite("state", function() {
            test("should be a Backbone model", function() {
                expect(ikettle.state).to.be.an.instanceOf(Backbone.Model);
            });
        });

        suite("connection", function() {
            test("should be a net socket instance", function() {
                expect(ikettle.connection).to.be.an.instanceOf(net_socket_mock);
            });
        });
    });

}());
