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
	
	$result = array();

	// If Role is being added then write code in this method
	
	/*$sql = "insert into role(name) values ('$name')";

	if(mysqli_query($conn, $sql)){
		$result['success'] = "Record is Created Successfully";
	} else{
		$result['error'] = "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
	}*/

	echo json_encode($result);
}

function getById($data){
	global $conn;
	$id = (int)$data['role_id'];
	$sql = "select * from role where role_id = $id";

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
	$sql = "select * from role";

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