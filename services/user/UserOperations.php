<?php

include ("../config.php");
include ("../common.php");

$key = "aGGroCreeps!%#!`";

$data = ($_REQUEST);
$operation = "";
if(isset($data['operation'])){
	$operation = $data['operation'];
}

switch ($operation) {
	case "add":
        add($data);
        break;
    case "update":
        update($data);
        break;
	case "delete":
        deactivate($data);
        break;
	default:
        get($data);
}

	
function add($data){
	global $conn;
	global $key;
	$encryptedPass = base64_encode($key.$data['password']);
	$firstname = mysqli_real_escape_string($conn, $data['firstname']);
	$lastname = mysqli_real_escape_string($conn, $data['lastname']);
	$email = $data['email'];
	$contact =  $data['contact'];
	$password = $encryptedPass;
	$center_id = $data['center_id'];
	$role_id = $data['role_id'];
	$status_id = 1; // 1 is for Active
	
	$result = array();

	$sql = "insert into user(firstname,lastname,email,contact,password,center_id,role_id,status_id) values ('$firstname','$lastname','$email','$contact','$password','$center_id','$role_id','$status_id')";

	if(mysqli_query($conn, $sql)){
		$result['success'] = "Record is Created Successfully";
	} else{
		$result['error'] = "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
	}

	echo json_encode($result);
}

function update($data){
	global $conn;
	$firstname = mysqli_real_escape_string($conn, $data['firstname']);
	$lastname = mysqli_real_escape_string($conn, $data['lastname']);
	//$email = $data['email'];
	$contact =  $data['contact'];
	$center_id = $data['center_id'];
	$role_id = $data['role_id'];
	$user_id = $data['user_id'];
	
	$result = array();

	$sql = "update user set firstname = '$firstname',lastname = '$lastname',contact = $contact,center_id = $center_id,role_id = $role_id where user_id = $user_id";

	if(mysqli_query($conn, $sql)){
		$result['success'] = "Record is Updated Successfully";
	} else{
		$result['error'] = "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
	}

	echo json_encode($result);
}

function get($data){
	global $conn;
	$sql = "select * from user";

	$rows = $conn->query($sql);
						
	$result = [];
	while($res = mysqli_fetch_assoc($rows)) {		        
		$result[] = $res;	
	}

	echo json_encode($result);
}



