var fs = require('fs');
var http = require('http');


var flydb = {
	start: startdb,
	_data: {}
}

flydb.data = require('./proxy')(flydb._data, function(){
	_save();
});


if (typeof Proxy === 'undefined') {
	_requestProxy();
}

var keywords = Object.keys(flydb);


/*
 * Starts the db synchronously since boot performance is not important
 */
function startdb(){
	var data = fs.readFileSync('./data.fdb').toString();
	flydb._data = _parseString(data);
	return flydb.data;
}

/*
 * tries to turn string into object
 *
 * @param {string} data
 */
function _parseString(data){
	try{
		data = JSON.parse(data);
	} catch (err) {}
	return data;
}

/*
 * Creates a shallow copy of an object, required for Proxy
 */
function shallowCopy(src, dst) {
  if (src instanceof Array) {
    dst = dst || [];

    for (var i = 0, ii = src.length; i < ii; i++) {
      dst[i] = src[i];
    }
  } else if (typeof src === 'object') {
    dst = dst || {};

    for (var key in src) {
      if (!(key.charAt(0) === '$' && key.charAt(1) === '$')) {
        dst[key] = src[key];
      }
    }
  }

  return dst || src;
}

/*
 * Stringifies object
 */
function _stringify(data){
	var data = shallowCopy(data);
	try{
		data = JSON.stringify(data);
	} catch (err) {}
	return data;
}

/*
 * Checks if harmony proxies have been enabled
 */
function _requestProxy(){
	throw("Please use 'node --harmony-proxies <your commands>'");
}

/*
 * Saves data in db;
 */
function _save(){
	fs.writeFileSync('./data.fdb', _stringify(flydb.data));
}

module.exports = flydb.start();

flydb.data.asd = 'asdasd'
flydb.data.as = {}


