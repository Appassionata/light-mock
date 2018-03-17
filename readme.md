# webpack-light-mock
webpack-light-mock is a light middleware which supports Hot loading

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
* `routesPath` (string). Path to routes config file, dir to be watched

* `originMid` (function). Original ``before`` option in devServer config

* `baseHandler` (function). If it is provided, all request matched routes config will go through this function

* `useMock` (default: true). Set false to turn off console

* `debug` (default: true). Set false to turn off console