$phantom_path = 'C:\Users\user\Downloads\phantomjs-2.1.1-windows\phantomjs-2.1.1-windows\bin\phantomjs';
$get_sub_categories = 'C:\Users\user\Downloads\phantomjs-2.1.1-windows\phantomjs-2.1.1-windows\bin\getAllSubCategories.js';

$url_base = 'https://appexchange.salesforce.com';
$a = Get-Date
$new_file_path = 'C:\Users\user\Downloads\phantomjs-2.1.1-windows\phantomjs-2.1.1-windows\bin\allSubLinks';
$new_file_type = '.txt';

$new_file_path = 'C:\Users\user\Downloads\phantomjs-2.1.1-windows\phantomjs-2.1.1-windows\bin\firstLayoutCategories.txt';

$categories_links = Get-Content $new_file_path;
						
""> "$new_file_path$new_file_type";
foreach ($filter_links in $categories_links) {
	Invoke-Expression -Command:"$phantom_path $get_sub_categories $filter_links >> $new_file_path$new_file_type";
}

exit