<?php

include ("../config.php");
//include ("../common.php");
$data = (json_decode(file_get_contents("php://input"),true));
$token = $data['token'];
$result = array();

if (empty($token)) {
	$result['error'] = true;
	$result['msg'] = "User is not logged in and need to enter Username and Password";
}
else{
	$sql = "select * from user where token = '$token' limit 1";

	$rows = $conn->query($sql);
						
	$resultData = [];
	while($res = mysqli_fetch_assoc($rows)) {		        
		$resultData[] = $res;	
	}
	if(count($resultData) > 0){
		$result['success'] = true;
		$result['msg'] = "User is already logged in";
	}
}
echo json_encode($result);