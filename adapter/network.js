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

/**
 * getDevice
 */
Network.getDevice = function(address, port){
  return new Promise((resolve, reject) => {
    const device = new Network(address, port);
    device.open((err, socket) => {
      // 此Callback Function对应open的callback，如果有错误，引导到reject；如果连接，引导到resolve, 进而call 具体打印的内容
      // console.log('get device error', err, device)
      if(err) {
        console.log('network device open err');
        console.log(err);
        return reject(err);
      }
      resolve(device);
    });
  });
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
  this.device.on("error", (err) => {
    if (err) {
      console.log('Connection error:', err);
      callback && callback(err, self.device);  
    }
  }).connect(this.port, this.address, function(){
    console.log('device start to connect');
    console.log(callback);
    self.emit('connect', self.device);
    callback && callback(null, self.device);  
  });
  // console.log('ready to emiittttttt!!!!!');
  
  // if (callback && options) {
  //   callback(null, null, options);
  // }
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
 * @return {[type]}           [description]
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
