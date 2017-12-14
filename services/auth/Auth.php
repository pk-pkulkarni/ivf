<?php

include ("../config.php");
//include ("../common.php");// Common file is containing JWT script which is not needed while doing an authentication
$key = "aGGroCreeps!%#!`";
$userData = (json_decode(file_get_contents("php://input"),true));
$result = array();
$username = $userData['username'];
$password = base64_encode($key.$userData['password']);

$returnData = [];
$sql = "select * from user where email = '$username'";

$rows = $conn->query($sql);
					
$result = [];
$fetchedUserData = [];
while($res = mysqli_fetch_assoc($rows)) {		        
	$result[] = $res;	
}

if(count($result) > 0){
	$sql = "select * from user where email = '$username' and password='$password'";

	$rows = $conn->query($sql);
						
	$result = [];
	while($res = mysqli_fetch_assoc($rows)) {		        
		$result[] = $res;	
	}
	if(count($result) > 0){
		$fetchedUserData = $result[0];
		
		/*Implementation of JWT*/
		$header = [
           'typ' => 'JWT',
		   'alg' => 'HS256'
		  ];
		
		$header = json_encode($header);		
		$header = base64_encode($header);
		
		date_default_timezone_set('Asia/Kolkata');
		$currentDate =  date('Y-m-d H:i:s');
		
		$payload = [      
			"user_id" => $fetchedUserData['user_id'],
			"email" => $fetchedUserData['email'],
			"currentDate" => $currentDate
		];
		
		$payload = json_encode($payload);
		$payload = base64_encode($payload);

		$hP = $header.".".$payload;
		
		// Generates a keyed hash value using the HMAC method
		$signature = hash_hmac('sha256',$hP, $key, true);

		//base64 encode the signature
		$signature = base64_encode($signature);

		//concatenating the header, the payload and the signature to obtain the JWT token
		$token = "$hP.$signature";
		/*JWT end*/
		
		// Updating token when user is authenticated
		$user_id = $fetchedUserData['user_id'];
		$sqlUpdate = "update user set token = '$token' where user_id = $user_id";
		$updatedRow = $conn->query($sqlUpdate);
		
		$sqlGet = "SELECT u.*, r.name as role_name ,c.center_name,c.center_id  FROM user u  LEFT JOIN role r on u.role_id = r.role_id LEFT JOIN user_to_center uc on u.user_id = uc.user_id LEFT JOIN center c on uc.center_id = c.center_id where u.user_id = $user_id";

		$rowsGet = $conn->query($sqlGet);
							
		$resultGet = [];
		while($resGet = mysqli_fetch_assoc($rowsGet)) {		        
			$resultGet[] = $resGet;	
		}
		
		$returnData['success'] = true;
		$returnData['token'] = $token;
		$returnData['data'] = $resultGet;
		$returnData['msg'] = "User is authenticated";
	}
	else{
		$returnData['error'] = true;
		$returnData['msg'] = "Invalid Password";
	}
}
else{
	$returnData['error'] = true;
	$returnData['msg'] = "Invalid Username";
}
echo json_encode($returnData);
