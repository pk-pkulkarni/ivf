<?php

include ("../config.php");
//include ("../common.php");
$data = (json_decode(file_get_contents("php://input"),true));
$user_id = $data['user_id'];
$result = array();
// Validate email
if (empty($user_id)) {
	$result['error'] = true;
	$result['msg'] = "Invalid User";
}
else{
	$sqlUpdate = "update user set token = '' where user_id = $user_id";
	$updatedRow = $conn->query($sqlUpdate);
	$result['success'] = true;
	$result['msg'] = "User is logged out and token is set to blank";
	echo json_encode($result);
}
	