# require-reload #

require-reload facilitates hot-reloading files in node.js. Each call will re-fetch the file/module and `require` it.

## Example ##
```JS
var reload = require('require-reload'),
    api = reload('api.js');
//sometime later if you make changes to api.js, you can hot-reload it by calling
//this could also just be in a setInterval
try {
    api = reload('api.js');
} catch (e) {
    //if this threw an error, the api variable is still set to the old, working version
    console.error("Failed to reload api.js! Error: ", e);
}
```


## Advanced Usage ##

### reload([context]) ###
If you want to run reload in the context of another module/file then pass in the `require` variable into `reload` to get an
instance that is bound to that context. The other module must return its require context to use this.
```JS
var otherModule = require('other-module'),
    reloadInContext = require('require-reload')(otherModule.requireCtx);
/*
 * other-module would need to do:
 * exports.requireCtx = require;
 */
```

### emptyCache([context]) ###
Empties the whole cache. Useful if you want to reload a file/module AND reload its dependencies. Optionally accepts a context
to clear another context's cache.

Note: This is using internal methods to the module system. These APIs may change at any time. I will keep this
maintained to support all version of Node.js >=0.6 and io.js >1.0.4. Version management will be handled through npm.
