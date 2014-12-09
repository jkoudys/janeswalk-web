// Translation functions - TODO build an object of the translateables, then get their translations from the server
module.exports = function(str) {
	var args = Array.prototype.slice.call(arguments);
	return args.shift().replace(/%(s|d)/g, function(){
		return args.shift();
	});
}

