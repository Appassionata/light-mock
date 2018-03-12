# webpack-light-mock
webpack-light-mock is a light middleware support Hot loading

inspired by [leeluolee/puer](https://github.com/leeluolee/puer) and [jaywcjlove/webpack-api-mocker](https://github.com/jaywcjlove/webpack-api-mocker)

Usage
---
webpack config
```javascript
const mock = require('webpack-light-mock')

module.exports = {
    //...
    devServer: {
        before: mock({routesPath: 'routes.js'}),
        hot: true
    }
}

```
routes config
```javascript

module.exports = {
    'get /api': {username: 'dio'}
}

```
options
---
* `routesPath` (string). Paths to routes config file, dirs to be watched

* `originMid` (function). Origin before options in devServer config

* `baseHandler` (function). If provided, all request matched routes config will pass through this function

* `useMock` (default: true). Set false to turn off mock

* `debug` (default: true). Set false to turn off console