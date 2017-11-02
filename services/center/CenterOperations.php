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
	default:
        get($data);
}

	
function add($data){
	global $conn;
	//mysqli_real_escape_string =  Escapes special characters in a string for use in an SQL statement.

	$center_name = mysqli_real_escape_string($conn, $_REQUEST['center_name']);
	$center_address = $_REQUEST['center_address'];
	$doctor_id = (int)$_REQUEST['doctor_id'];
	
	$result = array();

	$sql = "insert into center(center_name,center_address,doctor_id) values ('$center_name','$center_address','$doctor_id')";

	if(mysqli_query($conn, $sql)){
		$result['success'] = "Record is Created Successfully";
	} else{
		$result['error'] = "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
	}

	echo json_encode($result);
}

function update($data){
	global $conn;
	$center_name = mysqli_real_escape_string($conn, $_REQUEST['center_name']);
	$center_address = $_REQUEST['center_address'];
	$doctor_id = (int)$_REQUEST['doctor_id'];
	$center_id = (int)$_REQUEST['center_id'];
	
	$result = array();

	$sql = "update center set center_name='$center_name',center_address='$center_address',doctor_id = $doctor_id where center_id = $center_id";

	if(mysqli_query($conn, $sql)){
		$result['success'] = "Record is Updated Successfully";
	} else{
		$result['error'] = "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
	}

	echo json_encode($result);
}

function get($data){
	global $conn;
	$sql = "select * from center";

	$rows = $conn->query($sql);
						
	$result = [];
	while($res = mysqli_fetch_assoc($rows)) {		        
		$result[] = $res;	
	}

	echo json_encode($result);
}



