<?php

include ("../config.php");
include ("../common.php");

$userData = ($_REQUEST);
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
		
		$payload = [      
			"user_id" => $fetchedUserData['user_id'],
			"email" => $fetchedUserData['email']
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
		
		
		$returnData['success'] = true;
		$returnData['token'] = $token;
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
