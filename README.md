[![Build status](https://ci.appveyor.com/api/projects/status/ph54iicf29ipy8wm?svg=true)](https://ci.appveyor.com/project/WilixLead/iohook)
[![Build Status](https://travis-ci.org/WilixLead/iohook.svg?branch=master)](https://travis-ci.org/WilixLead/iohook)

# iohook
Node.js global native keyboard and mouse listener.  
This module can handle keyboard and mouse events via native hooks.  

If you like this module or are interested in updates, follow me on Twitter [https://twitter.com/wilixlead](https://twitter.com/wilixlead)

## OS Support
Already tested in:
- Ubuntu 16.04
- macOS High Sierra 10.13.1
- Windows 7 SP1

## Installation
This module use native library libuiohook and require some installed packages.  
I really hope find way for use build systems for online build or download prebuild packages.

`npm i git+https://github.com:renjfk/iohook.git`

### Electron users [optional]
Before install this module, you need specify build runtime.
Just add following to your package.json file
(if you use two-package-json structure, add to app's package.json, not to build).  
Checkout your ABI for [node.js](https://nodejs.org/en/download/releases/) or [electron](https://www.npmjs.com/package/electron-abi)
```json
"iohook": {
  "targets": [
    "node-51",
    "electron-53"
  ],
  "platforms": [
    "win32",
    "darwin",
    "linux"
  ],
  "arches": [
    "x64",
    "ia32"
  ]
}
```
**NOTE: Please remember, when you install iohook, it try to use current node environment NOT ELECTRON OR NW.js**

### Prebuild support  
iohook support prebuilded binaries for next environment versions:  
- electron:
  - [47] 1.0.2
  - [48] 1.2.8
  - [49] 1.3.13
  - [50] 1.4.15
  - [51] 1.5.0
  - [53] 1.6.0

- node:
  - [46] 4.6.1
  - [47] 5.12.0
  - [48] 6.9.4
  - [51] 7.4.0

Support for node.js v0.12, io.js, nw.js is planed.

## Manual compilation for your version of environment  
iohook have prebuild binaries, it downloads when you try to install it.  
But if you use specified version of node.js/nw.js/io.js/electron/etc. you can try compile it.  
All what you need install os dependencies and start compilation:

### Ubuntu 16
- `sudo apt install libx11-dev libxtst-dev libxt-dev libx11-xcb-dev`
- `sudo apt install libxkbcommon-dev libxkbcommon-x11-dev`
- `cd node_modules/iohook`
- `npm run build`

### macOS
- `brew install cmake automake libtool pkg-config`
- `cd node_modules/iohook`
- `npm run build`

### Windows
- for Node.js usage just make sure that you have installed following components
  - [![](https://cmake.org/wp-content/uploads/2014/06/favicon.png) CMake](https://cmake.org)
  - [![](http://landinghub.visualstudio.com/favicon.ico) Visual C++ Build Tools](http://landinghub.visualstudio.com/visual-cpp-build-tools)
  - [CMake.js](https://www.npmjs.com/package/cmake-js)
  and it will be built by install script
- for Electron go to installation dir (node_modules/iohook) and recompile it according to your Electron version. e.g. `cmake-js compile -r electron -v 1.7.1`

## Usage
Module is pretty simple for use. There is example:  

```javascript
'use strict';
const ioHook = require('iohook');

ioHook.on("mousemove", event => {
  console.log(event);
  /* You get object like this
    {
      type: 'mousemove',
      x: 700,
      y: 400
    }
   */
});

//Register and start hook
ioHook.start();
```
If type ```ioHook.start(true);``` you can enable debug logger in native lib. Use it if you have troubles with this module


### Available events

### keypress (NOT WORKING AT THIS MOMENT, USE keydown/keyup)
Calls when user press and release a key. Event contain next object:  
`{keychar: 'f', keycode: 19, rawcode: 15, type: 'keypress'}`

### keydown
Calls when user press a key. Event contain next object:  
`{ keychar: 'd', keycode: 46, rawcode: 8, type: 'keydown' }`

### keyup
Calls when user release a key. Event contain next object:  
`{keychar: 'f', keycode: 19, rawcode: 15, type: 'keup'}`

### mouseclick
Calls when user click mouse button. Event contain next object:  
`{ button: 1, clicks: 1, x: 545, y: 696, type: 'mouseclick' }`

### mousedown
Calls when user press and release a key. Event contain next object:  
`{ button: 1, clicks: 1, x: 545, y: 696, type: 'mousedown' }`

### mouseup
Calls when user press and release a key. Event contain next object:  
`{ button: 1, clicks: 1, x: 545, y: 696, type: 'mouseup' }`

### mousemove
Calls when user press and release a key. Event contain next object:  
`{ button: 0, clicks: 0, x: 521, y: 737, type: 'mousemove' }`

### mousedrag
Calls when user press and release a key. Event contain next object:  
`{ button: 0, clicks: 0, x: 373, y: 683, type: 'mousedrag' }`

### mousewheel
Calls when user press and release a key. Event contain next object:  
`{ amount: 3, clicks: 1, direction: 3, rotation: 1, type: 'mousewheel', x: 466, y: 683 }`

## Known issues
In some cases, most often when you make mouse moves or keyboard events very fast,
module crash with "Segmentation fault: 11". Looks like it is problem in my native implementation,
but I still can't find a problem. Will be happy if somebody helps with it.

## Credits
Thanks for [libuiohook](https://github.com/kwhat/libuiohook) project!    
Thank you [ayoubserti](https://github.com/ayoubserti) for first iohook prototype  
Thank you [vespakoen](https://github.com/vespakoen) for prebuild system implementation
