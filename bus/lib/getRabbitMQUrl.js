var util = require('util'),
    log = require('debug')('servicebus')

module.exports = function getRabbitMQUrl (options) {
    var rabbitUrl = options.url || process.env.RABBITMQ_URL;
    if (!rabbitUrl) {
      // see if url can be built with user and password
      if (options.user && options.password) {
        var auth = util.format('%s:%s', options.user, options.password);
        var host = options.host || 'localhost';
        var port = options.port || 5672;
        log('Creating RabbitMQ URL %s@%s:%s', options.user, host, port)
        rabbitUrl = util.format('amqp://%s@%s:%s', auth, host, port);
      } else {
        log('RabbitMQ URL could not be determined. Using default amqp://localhost');
        rabbitUrl = 'amqp://localhost';
      }
    }
    return rabbitUrl;
}