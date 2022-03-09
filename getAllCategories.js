var page = require('webpage').create(),
  system = require('system'),
  t, address;
var globalData = '';
if (system.args.length === 1) {
  console.log('Usage: loadspeed.js <some URL>');
  phantom.exit();
}

address = system.args[1];

page.onResourceError = function(resourceError) {
    console.log('= onResourceError()');
    console.log('  - unable to load url: "' + resourceError.url + '"');
    console.log('  - error code: ' + resourceError.errorCode + ', description: ' + resourceError.errorString );
};

page.onLoadFinished = function(status) {
    if (status !== 'success') {
	console.log('status: ' + status);
    console.log('FAIL to load the address');
	phantom.exit();
  } else {
	page.includeJs("https://code.jquery.com/jquery-3.1.1.min.js", function() {
		globalData = page.evaluate(function() {
			var innerData = '';
			$('#leftNavCategories').next().find('.link-txt').each(
				function(){
					innerData += $(this).parent().attr('href') +
								'\n';
			});
			return innerData;
		});
		globalData = unescape(encodeURIComponent(globalData.slice(0, -('\n'.length))));
		console.log(globalData);
		phantom.exit();
	}); 
  }
};

page.openUrl(address, {operation: 'post', encoding: "utf-8"}, page.settings);
