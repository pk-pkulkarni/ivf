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
if(isset($requestedData['token'])){
	$receivedToken = $requestedData['token'];
}
if(!isset($requestedData['token']) || empty($requestedData['token'])){
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
		$recievedJwt = $receivedToken;

		// Split a string by '.' 
		$jwt_values = explode('.', $recievedJwt);

		$payloadData = $jwt_values[1]; // Payload Data
		$payloadData = base64_decode($payloadData);
		$payloadData = json_decode($payloadData,true); // This is Payload Data Array
		
		$tokenDecodedData = array();
		$tokenDecodedData = $payloadData;
		
		$token_user_id = $payloadData['user_id'];
		$token_email = $payloadData['email'];
		$token_role_id = $payloadData['role_id'];
		$token_role_name = $payloadData['role_name'];
		$token_center_id = $payloadData['center_id'];
		$token_center_name = $payloadData['user_id'];
		$token_status_id = $payloadData['status_id'];
		$token_is_doctor = $payloadData['is_doctor'];
		$token_is_embryologist = $payloadData['user_id'];
		$token_currentDate = $payloadData['currentDate'];
	}
	else{
		$returnData['error'] = true;
		$returnData['msg'] = "Token is missing , Authentication Failed!";
		echo json_encode($returnData);
		exit;
	}
}

