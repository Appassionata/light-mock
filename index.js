const chokidar = require('chokidar')
const path = require('path')
const { Router } = require('express')
const { debug, isFunction, reloading } = require('./lib/tools.js')
let config = require('./lib/config')

module.exports = options => {
    config = Object.assign(config, options)
    if (!config.useMock) {
        if (isFunction(config.originMid)) {
            return app => config.originMid(app)
        }
        return
    }

    const { success, error, log } = debug(config.debug)

    const baseMiddleware =
        fn => (req, res, next) => {
            let _next = arg => {
                _next.fired = true
                next(arg)
            }
            if (isFunction(config.baseHandler)) {
                config.baseHandler(req, res, _next)
            }
            if (!_next.fired) {
                success(`mocking data from ${req.originalUrl}`)
                fn(req, res, next)
            }
        }

    const parseRouter =
        (routers = {}) => {
            let router = new Router()
            let keyInfo, key, value, method, path, valueType
            for (key in routers) {
                if (!routers.hasOwnProperty(key)) {
                    continue
                }
                keyInfo = key.split(/\s+/)
                if (keyInfo.length > 1) {
                    method = keyInfo[0].toLowerCase()
                    path = keyInfo[1]
                } else {
                    path = keyInfo
                    method = 'get'
                }
                value = routers[key]
                valueType = typeof value
                switch (valueType) {
                    case 'function':
                        router[method](path, baseMiddleware(value))
                        break
                    case 'object':
                    case 'string':
                        router[method](path, baseMiddleware((req, res) => res.send(value)))
                }
            }
            return router
        }

    let routesPath = path.join(process.cwd(), config.routesPath || './routes.js')
    let router = parseRouter(require(routesPath))
    // watch routes file
    chokidar.watch(routesPath, {alwaysState: true, usePolling: true})
        .on('change', path => {
            log(`changed ${path}`)
            try {
                router = parseRouter(reloading(routesPath))
            } catch (e) {
                error(`error in reloading ${path}`)
            }
        })

    return app => {
        if (isFunction(config.originMid)) {
            config.originMid(app)
        }
        app.use((req, res, next) => {
            // closure for hot loading
            router.handle(req, res, next)
        })
    }
}
