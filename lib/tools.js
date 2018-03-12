const chalk = require('chalk')

module.exports.isFunction = fn => typeof fn === 'function'

module.exports.debug = useDebug => {
    const baseDebugMeg = str => useDebug && console.log('[webpack-light-mock]', str)
    return {
        success: str => baseDebugMeg(chalk.green(str)),
        error: str => baseDebugMeg(chalk.red(str)),
        log: baseDebugMeg
    }
}

module.exports.reloading = path => {
    delete require.cache[path]
    return require(path)
}