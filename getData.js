var page = require('webpage').create(),
  system = require('system'),
  t, address;
var globalData = '';
if (system.args.length === 1) {
  console.log('Usage: loadspeed.js <some URL>');
  phantom.exit();
}

/*function handle_page(address){
	var n = address.lastIndexOf('pageNo=');
	var nextPage = parseInt(address.substring(n+'pageNo='.length, address.length)) + 1;
	address = address.substring(0,n) + address.substring(n, address.length-1) + nextPage;
	console.log(address + '\n');
	
    page.open(address, function(status) {
		var data = '';
		if (status !== 'success') {
			console.log('FAIL to load the address');
		} else {
			page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
				data = page.evaluate(function() {
					var innerData = '';
					$('.tile-small').each(
						function(){
							innerData += 'id=' +$(this).attr('id').substring(5, 23) + ',' + 'name=' + $(this).find('.tile-title').attr('title') + ',' + 'Free='+ ( ($(this).find('.free').text() != '')?'true':'false') + ';\n'
					});
					console.log('IN: ' +innerData);
					return innerData;
				});
				console.log('1:' + data);
				//phantom.exit();
			}); 
		}
		console.log('2:' +data);
		//if(nextPage < 3){
			//setTimeout(handle_page(address),2000);			
		//}
		//else{
		phantom.exit(0)
		//}
		
	});
}*/
address = system.args[1];

//handle_page(address);
page.onResourceError = function(resourceError) {
    console.log('= onResourceError()');
    console.log('  - unable to load url: "' + resourceError.url + '"');
    console.log('  - error code: ' + resourceError.errorCode + ', description: ' + resourceError.errorString );
};

/*page.onError = function(msg, trace){
	var msgStack = ['PHANTOM ERROR: ' + msg];
	if(stace && trace.length){
		msgStack.push('TRACE:');
		trace.forEach(t){
			msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line);
		}
		console.log(msgStack.join('\n'));
		phantom.exit(1);
	}
}*/

//'id=' +$(this).attr('id').substring(5, 23) + ',' + 

page.onLoadFinished = function(status) {
    if (status !== 'success') {
	console.log('status: ' + status);
    console.log('FAIL to load the address');
	phantom.exit();
  } else {
	page.includeJs("https://code.jquery.com/jquery-3.1.1.min.js", function() {
		globalData = page.evaluate(function() {
			var innerData = '';
			$('.tile-small').each(
				function(){
					var ratingComp = $(this).find('.rating-stars');
					var stars = 0;
					for(var i = 0; i <= 50; i += 5)
					{
						if(ratingComp.hasClass('rating-stars-0'+i) || ratingComp.hasClass('rating-stars-'+i))
						{
							stars = i/10;
						}	
					}
					var subCatg;
					var catg;
					// The parent of category is a link and not a span
					if($('.selected .link-replace').closest('.ul-reset').parent().closest('.ul-reset').hasClass('ul-nav2-top')){
						subCatg = 'No Subcategory';
						catg = $('.selected .link-txt').text();
					}
					else
					{
						subCatg = $('.selected .link-txt').text();
						catg = $('.selected').closest('.ul-nav2').parent().find('.link-txt:first').text()
					}
					innerData += $(this).find('.tile-title').attr('title') +
								'\t '+ ( ($(this).find('.free').text() != '')?'true':'false') +
								'\t ' + $(this).find('.listing-logo').attr('src').substring($(this).find('.listing-logo').attr('src').lastIndexOf('file=') +'file='.length, $(this).find('.listing-logo').attr('src').length) +
								'\t ' + $(this).find('.rating-amount').text().trim().slice(1, -1) +
								'\t ' + stars +								
								'\t ' + $(this).attr('id').substring(5, 23) +
								'\t ' + catg +
								'\t ' + subCatg +
								'\t ' + $(this).find('.tile-descr').text().trim().replace(/\r?\n|\r/g, '') +
								'\n'
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


//'\t ' + 'https://appexchange.salesforce.com/listingDetail?listingId='+$(this).attr('id').substring(5, 23) +

//page.open(address, settings, function(status) {
  
//});
//console.log('globalData');
//phantom.exit();


/*function handle_page(file){
    page.open(file,function(){
        ...
        page.evaluate(function(){
            ...do stuff...
        });
        page.render(...);
        setTimeout(next_page,100);
    });
}

function next_page(){
    var file=args.shift();
    if(!file){phantom.exit(0);}
    handle_page(file);
}

next_page();*/


