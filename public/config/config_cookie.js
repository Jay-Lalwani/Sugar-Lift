var cookieSession = require('cookie-session')
var cookieParser = require('cookie-parser');


module.exports = function(app) {
    app.set('trust proxy', 1) // trust first proxy
    
    app.use(cookieParser())
    
    app.use(cookieSession({
      name: 'potato',
      keys: ['super', 'secret']
    }))
}