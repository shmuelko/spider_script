$phantom_path = 'C:\Users\user\Downloads\phantomjs-2.1.1-windows\phantomjs-2.1.1-windows\bin\phantomjs';
$get_categories = 'C:\Users\user\Downloads\phantomjs-2.1.1-windows\phantomjs-2.1.1-windows\bin\getAllCategories.js';

$url_base = 'https://appexchange.salesforce.com';
$a = Get-Date
$new_file_path = 'C:\Users\user\Downloads\phantomjs-2.1.1-windows\phantomjs-2.1.1-windows\bin\firstLayoutCategories';
$new_file_type = '.txt';
 
"New-Item $new_file_path$new_file_type -type file -force";
Invoke-Expression -Command:"$phantom_path $get_categories $url_base >> $new_file_path$new_file_type";

exit