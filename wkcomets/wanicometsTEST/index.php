<?php
	$json = json_encode($_POST["hsList"]);
	$fileName = "highscores.json";
	//$file = fopen($fileName, 'w');
	//fwrite($file, $json);
	//fclose($file);
	file_put_contents($fileName, $json);
	
	
	//if(is_writable($fileName)){
	//	if(!$file = fopen($fileName, 'w')){
	//		echo "Cant open file " . $fileName ;
	//		exit;
	//	}
	//	if(fwrite($file, $json) === FALSE){
	//		echo "Cant write to file " . $fileName ;
	//		exit;
	//	}
	//	echo "Success, wrote ($json) to file " . $fileName ;
	//	fclose($file);
	//}
	//else{
	//	echo "The file ". $fileName ." is not writable, yo" ;
	//}
?>