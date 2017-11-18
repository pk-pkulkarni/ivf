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
	$doctor_id = (int)$data['doctor_id'];
	
	$result = array();

	$sql = "insert into center(center_name,center_address,doctor_id) values ('$center_name','$center_address','$doctor_id')";

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
	$doctor_id = (int)$data['doctor_id'];
	$center_id = (int)$data['center_id'];
	
	$result = array();

	$sql = "update center set center_name='$center_name',center_address='$center_address',doctor_id = $doctor_id where center_id = $center_id";

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
	$sql = "select * from center";

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



