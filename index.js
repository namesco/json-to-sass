var _ = require('lodash');

module.exports = function(data, options) {
	var scss = '';

	if (!data) {
		return;
	}
	
	data = JSON.parse(data);

	function toCamelCase(str) {
		return str.replace(/(?!^)[_|-]([a-z])/g, function(matches) {
			return matches[1].toUpperCase();
		});
	}

	function toKebab(str) {
		return str.replace(/(?!^)[_A-Z]/g, function(matches) {
			if(matches[0] == '_') {
			  return '-';
			}
			return '-' + matches.toLowerCase();
		});
	}

	_.mapKeys(data, function(value, key) {

		if (options.convertTo) {

			if (options.convertTo == 'camel') {
				key = toCamelCase(key);
			}

			if (options.convertTo == 'kebab') {
				key = toKebab(key);
			}
		}

		scss+= '$' + key + ': ' + value + ';\r\n'
	});

	return scss;
}