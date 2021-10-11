const authRoute = require('./auth');
const notifyRoute = require('./notify');
const productRoute = require('./product');
const categoryRoute = require('./category');
const cartRoute = require('./cart');
const messageRoute = require('./message');

function route(app) {
    app.use('/auth', authRoute);
    app.use('/api', notifyRoute);
    app.use('/api', productRoute);
    app.use('/api', categoryRoute);
    app.use('/api', cartRoute);
    app.use('/api', messageRoute);
}

module.exports = route;