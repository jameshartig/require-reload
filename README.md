# require-reload #

require-reload facilitates hot-reloading files in node.js. Each call will re-fetch the file/module and `require` it.

```JS
var reload = require('require-reload'),
    api = reload('api.js');
//sometime later if you make changes to api.js, you can hot-reload it by calling
try {
    api = reload('api.js');
} catch (e) {
    //if this threw an error, the api variable is still set to the old, working version
    console.error("Failed to reload api.js! Error: ", e);
}
```

Note: This is using internal methods to the module system. These APIs may change at any time. I will keep this
maintained to support all version of Node.js >=0.6 and io.js >1.0.4. Version management will be handled through npm.
