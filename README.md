# Node iKettle

[![Build
Status](https://travis-ci.org/alistairjcbrown/node_ikettle.svg?branch=master)](https://travis-ci.org/alistairjcbrown/node_ikettle)
[![GitHub version](https://badge.fury.io/gh/alistairjcbrown%2Fnode_ikettle.svg)](http://badge.fury.io/gh/alistairjcbrown%2Fnode_ikettle)
[![Dependency Status](https://david-dm.org/alistairjcbrown/node_ikettle.svg?theme=shields.io)](https://david-dm.org/alistairjcbrown/node_ikettle)
[![devDependency Status](https://david-dm.org/alistairjcbrown/node_ikettle/dev-status.svg?theme=shields.io)](https://david-dm.org/alistairjcbrown/node_ikettle#info=devDependencies)

---

This library enables easy access to an iKettle. Much of the knowledge for interacting with the iKettle was from [Mark Cox](https://github.com/iamamoose)'s blog article, "[Hacking a Wifi Kettle](http://www.awe.com/mark/blog/20140223.html)".

```js
var iKettle = require("ikettle");
```

Currently the functionality is read-only, ie. iKettle state can be read and is updated as the kettle state changes. If it on roadmap to provide write access to kettle state.

Please see the scripts in the [examples](examples) directory for ways in which this library can be used.

### Connecting to your iKettle

```js
iKettle.connect(port, host, function(err, state) {
  if (err) {
    return;
  }
  // Use state model here
});
```

The default port for the iKettle is `2000` and does not need to be provided if using the default port.

Calling `connect` will confirm that the host is an iKettle and will retrieve the current state which is used to populate the model.

The callback function follows the nodejs convention, If an error has occurred, the first parameter `err` will be an `Error` object and `model` will be `undefined`. If an error has not occurred, `err` will be `null` and `state` will be a `Backbone` model.


### iKettle state

This state model is held in a `Backbone` model. It is provided as a parameter to the `connect` callback, or via `iKettle.state`.

In depth information on using Backbone models can be found in the [Backbone documentation](http://backbonejs.org/#Model), but basic usecase for using the model:

#### Checking if the kettle is on

```js
var is_kettle_on = state.get("on");
```

#### Monitoring kettle state changes

```js
state.on("change", function(details) {
  var what_changed = details.changes;
});
```


### Closing the connection

```js
iKettle.destroy();
```

This will close the connection to the iKettle and destroy the state model.

### Upcoming

1. Sync changes to state model back to the iKettle
   - Partially complete. Further work required to support the order of changes,
     eg. setting temp then turning on
2. Have periodic sync with iKettle to confirm state model holds correct state
3. Auto detect iKettle on local network

---

## Contact

Twitter @alistairjcbrown

Code signed using keybase as alistairjcbrown. Verify with `keybase dir verify`
