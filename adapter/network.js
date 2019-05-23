'use strict';
const net           = require('net');
const util          = require('util');
const EventEmitter  = require('events');
/**
 * Network Adapter
 * @param {[type]} address
 * @param {[type]} port
 */
function Network(address, port){
  EventEmitter.call(this);
  this.address = address;
  this.port = port || 9100;
  this.device = new net.Socket();
  return this;
};

util.inherits(Network, EventEmitter);

/**
 * connect to remote device
 * @praram {[type]} callback
 * @return
 */
Network.prototype.open = function(callback, options){
  var self = this;
  //connect to net printer by socket (port,ip)
  this.device.connect(this.port, this.address, function(err){
    console.log('netwrok.js debug 2: err2');
    console.log(err);
    callback && callback(err, self.device);
  });
  console.log('ready to emiittttttt!!!!!');
  self.emit('connect', self.device);
  if (callback && options) {
    callback(null, null, options);
  }
  return this;
};

/**
 * write data to printer
 * @param {[type]} data -- byte data
 * @return 
 */
Network.prototype.write = function(data, callback){
  this.device.write(data, callback);
  return this;
};

/**
 * [close description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Network.prototype.close = function(callback, options){
  if(this.device){
    this.device.destroy();
    this.device = null;
  }
  this.emit('disconnect', this.device);
  if (callback && options) {
    callback(options);
  } else {
    callback(null, this.device);
  }
  return this;
}

module.exports = Network;
