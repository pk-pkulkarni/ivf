<?php

include ("../config.php");
include ("../common.php");


$data = (json_decode(file_get_contents("php://input"),true));
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
	//mysqli_real_escape_string =  Escapes special characters in a string for use in an SQL statement.

	$center_name = mysqli_real_escape_string($conn, $data['center_name']);
	$center_address = $data['center_address'];
	//$doctor_id = (int)$data['doctor_id'];
	
	$result = array();

	$sql = "insert into center(center_name,center_address) values ('$center_name','$center_address')";

	if(mysqli_query($conn, $sql)){
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
	$center_name = mysqli_real_escape_string($conn, $data['center_name']);
	$center_address = $data['center_address'];
	//$doctor_id = (int)$data['doctor_id'];
	$center_id = (int)$data['center_id'];
	
	$result = array();

	$sql = "update center set center_name='$center_name',center_address='$center_address' where center_id = $center_id";

	if(mysqli_query($conn, $sql)){
		$result['success'] = true;
		$result['msg'] = "Record is Updated Successfully";
	} else{
		$result['error'] = true;
		$result['msg'] = "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
	}

	echo json_encode($result);
}

function deactivate($data){
	global $conn;
	global $token_center_id;
	$center_id = (int)$data['center_id'];
	$resultData = array();
	
	if($token_center_id == $center_id){
		$resultData['error'] = true;
		$resultData['msg'] = "You can not delete/deactivate this center";
	}
	else{
		$sql = "select user_id from user_to_center where center_id = $center_id";
		$rows = $conn->query($sql);
							
		$result = [];
		
		while($res = mysqli_fetch_assoc($rows)) {		        
			$result[] = $res;	
		}
		if(count($result) > 0){
			$userIdArray = array();
			$userIdArray = $result[0];
		}
		$sql = "update user set status_id= 2 where user_id IN (".implode(',',$userIdArray).")"; //Deactivating all the users belong to this center
		$updatedRow = $conn->query($sql);
		
		$sqlUpdateCenter = "update center set status_id= 2 where center_id = $center_id"; //Deactivating all the users belong to this center
		$updatedRow = $conn->query($sqlUpdateCenter);
		
		$result['success'] = true;
		$result['msg'] = "Ceneter and it's user are deactivated successfully";
	}
}

function getById($data){
	$id = (int)$data['center_id'];
	global $conn;
	$sql = "select * from center where center_id = $id";

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
	global $token_role_name;
	
	if($token_role_name == "Super Admin"){
		$sql = "select * from center";
	
		$rows = $conn->query($sql);
							
		$result = [];
		$resultData = array();
		while($res = mysqli_fetch_assoc($rows)) {		        
			$result[] = $res;	
		}

		$resultData['success'] = true;
		$resultData['data'] = $result;
	}
	else{
		$resultData['error'] = true;
		$resultData['data'] = "You are not authorized to access this service";
	}
	
	echo json_encode($resultData);
}



