$phantom_path = 'C:\Users\user\Downloads\phantomjs-2.1.1-windows\phantomjs-2.1.1-windows\bin\phantomjs';
$get_data_path = 'C:\Users\user\Downloads\phantomjs-2.1.1-windows\phantomjs-2.1.1-windows\bin\getData.js';

$url_base = 'https://appexchange.salesforce.com';
$a = Get-Date
$new_file_path = 'C:\Users\user\Downloads\phantomjs-2.1.1-windows\phantomjs-2.1.1-windows\bin\csvAllApps_'+$a.Day+'-'+$a.Month+'-'+$a.Year+'-'+$a.Hour+'-'+$a.Minute+'-'+$a.Second;
$new_file_type = '.csv';
$get_sub_links_files = 'C:\Users\user\Downloads\phantomjs-2.1.1-windows\phantomjs-2.1.1-windows\bin\lastLinks.txt';
		

$categories_links = Get-Content $get_sub_links_files;

"Name `t Free `t LogoId `t Reviews `t Rating `t FilteringId `t Category `t Subcategory `t Description" > "$new_file_path$new_file_type" 						
foreach ($filter_links in $categories_links) {
	if($filter_links -ne ''){
		#$filter_links
		$params = $filter_links.split(', ');
		if($params[-1] -eq 'NoPages'){
			Invoke-Expression -Command:"$phantom_path $get_data_path $params[0] >> $new_file_path$new_file_type";
		}else{
			$url_parts = $params[0].split('=');
			$url_after_parts = $url_parts[1].split('&');
			
			$start_url = $url_parts[0];
			$middle_url = $url_after_parts[1];
			$last_url = $url_parts[2];	
			for($i = 1; $i -le [Math]::ceiling($params[-1]/ 30); $i++){	
				$full_url = "$url_base$start_url=$i'&'$middle_url=$last_url";
				Invoke-Expression -Command:"$phantom_path $get_data_path $full_url >> $new_file_path$new_file_type";
			} 
		}
	}
}
"Done"
exit