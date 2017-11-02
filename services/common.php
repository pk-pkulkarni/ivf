<?php
/*

All common contents like , JWT authentication and other common things goes here

*/

$key = "aGGroCreeps!%#!`";
/* This is JWT token matching , this will be called before all the serivices
If token matches then application will call required service else it will throw an error message
*/
$returnData = [];
global $conn;
$receivedToken = "";
$requestedData = (json_decode(file_get_contents("php://input"),true));
if(isset($_REQUEST['token'])){
	$receivedToken = $_REQUEST['token'];
}
if(!isset($_REQUEST['token']) || empty($_REQUEST['token'])){
	$returnData['error'] = true;
	$returnData['msg'] = "Token is missing , Authentication Failed!";
	echo json_encode($returnData);
	exit;
}
else{
	$sql = "select * from user where token = '$receivedToken'";
	$rows = $conn->query($sql);
						
	$result = [];
	while($res = mysqli_fetch_assoc($rows)) {		        
		$result[] = $res;	
	}
	
	if(count($result) > 0){
		/*
		Do something if required
		$returnData['success'] = true;
		$returnData['msg'] = "Valid User";
		*/
	}
	else{
		$returnData['error'] = true;
		$returnData['msg'] = "Token is missing , Authentication Failed!";
		echo json_encode($returnData);
		exit;
	}
}

