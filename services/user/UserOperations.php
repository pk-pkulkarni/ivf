<?php

include ("../config.php");
include ("../common.php");

$data = (json_decode(file_get_contents("php://input"),true)); // Data will come in JSON format from angular
//$data = $_REQUEST;

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
	case "getById":
		getById($data);
		break;	
	default:
        get($data);
}

	
function add($data){
	global $conn;
	global $key;
	//Generate Random key as a password
	$str = "";
	$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	$charactersLength = strlen($characters);
	$length = 8;
	for ($i = 0; $i < $length; $i++) {
		$str .= $characters[rand(0, $charactersLength - 1)];
	}
	// Random key/password generation ends//
	
	//$encryptedPass = base64_encode($key.$data['password']);
	$encryptedPass = base64_encode($key.$str);
	$firstname = mysqli_real_escape_string($conn, $data['firstname']);
	$lastname = mysqli_real_escape_string($conn, $data['lastname']);
	$email = $data['email'];
	$contact =  $data['contact'];
	$password = $encryptedPass;
	$center_id = $data['center_id'];
	$role_id = $data['role_id'];
	$status_id = 1; // 1 is for Active
	$is_doctor = 'N';
	$is_embryologist = 'N';
	if(isset($data['is_doctor'])){
		$is_doctor = $data['is_doctor'];
	}
	if(isset($data['is_embryologist'])){
		$is_embryologist = $data['is_embryologist'];
	}
	
	$result = array();
	
	$sqlu = "select * from user where email = '$email'";

	$rowsu = $conn->query($sqlu);
						
	$resultu = [];
	while($resu = mysqli_fetch_assoc($rowsu)) {		        
		$resultu[] = $resu;	
	}
	if(count($resultu) > 0){
		$result['error'] = true;
		$result['msg'] = "User with this email is already exist";
		echo json_encode($result);
		exit;
	}
	

	$sql = "insert into user(firstname,lastname,email,contact,password,center_id,role_id,status_id,token,is_doctor,is_embryologist) values ('$firstname','$lastname','$email','$contact','$password','$center_id','$role_id','$status_id','','$is_doctor','$is_embryologist')";

	if(mysqli_query($conn, $sql)){
		// Send email to user who is just added
		$to = $email; // Enter email id which is taken as input
		$subject = "Your acoount with this email is created in IVF";
		$txt = "Your Password is ".$str;
		$headers = "From: ivf@noReply.com" . "\r\n";

		$retval = mail($to,$subject,$txt,$headers);
		if( $retval == true ) {
			//
		}else {
			$result['success'] = true;
			$result['msg'] = "Record is Created Successfully but Mail is not sent to the user!";
		}
		//
		$result['success'] = true;
		$result['msg'] = "Record is Created Successfully";
	} else{
		$result['error'] = true;
		$result['msg'] = "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
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
		$result['success'] = true;
		$result['msg'] = "Record is Updated Successfully";
	} else{
		$result['error'] = true;
		$result['msg'] = "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
	}

	echo json_encode($result);
}

function getById($data){
	global $conn;
	$id = (int)$data['user_id'];
	$sql = "select * from user where user_id = $id";

	$rows = $conn->query($sql);
						
	$result = [];
	$resultData = array();
	while($res = mysqli_fetch_assoc($rows)) {		        
		$result[] = $res;	
	}
	if(count($result) > 0){
		$resultData['success'] = true;
		$resultData['data'] = $result;
	}
	else{
		$result['error'] = true;
		$result['msg'] = "No data found";
	}
	echo json_encode($resultData);
}

function get($data){
	global $conn;
	$sql = "select * from user";

	$rows = $conn->query($sql);
						
	$result = [];
	$resultData = array();
	while($res = mysqli_fetch_assoc($rows)) {		        
		$result[] = $res;	
	}
	
	$resultData['success'] = true;
	$resultData['data'] = $result;
	echo json_encode($resultData);
}



