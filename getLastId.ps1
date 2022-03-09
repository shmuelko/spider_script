$phantom_path = 'C:\Users\user\Downloads\phantomjs-2.1.1-windows\phantomjs-2.1.1-windows\bin\phantomjs';
$get_last_categories = 'C:\Users\user\Downloads\phantomjs-2.1.1-windows\phantomjs-2.1.1-windows\bin\getLastURLVersion.js';

$url_base = 'https://appexchange.salesforce.com';
$a = Get-Date
$new_file_path = 'C:\Users\user\Downloads\phantomjs-2.1.1-windows\phantomjs-2.1.1-windows\bin\lastLinks';
$new_file_type = '.txt';

$get_sub_links_files = 'C:\Users\user\Downloads\phantomjs-2.1.1-windows\phantomjs-2.1.1-windows\bin\allSubLinks.txt';

$categories_links = Get-Content $get_sub_links_files;
		
Invoke-Expression -Command:"New-Item $new_file_path$new_file_type -type file -force";
#"" > "$new_file_path$new_file_type";
foreach ($filter_links in $categories_links) {
	if($filter_links -ne ''){
		#$filter_links
		Invoke-Expression -Command:"$phantom_path $get_last_categories $filter_links >> $new_file_path$new_file_type";
		
	}
}

exit