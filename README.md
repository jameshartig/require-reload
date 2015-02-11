# require-reload #

require-reload facilitates hot-reloading files in node.js. Each call will re-fetch the file/module and `require` it.

```JS
var reload = require('require-reload'),
    api = reload('api.js');
//time passes and I change api
api = reload('api.js');
```
