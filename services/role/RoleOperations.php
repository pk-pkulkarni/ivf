<?php

include ("../config.php");
include ("../common.php");


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

function get($data){
	global $conn;
	$sql = "select * from role";

	$rows = $conn->query($sql);
						
	$result = [];
	while($res = mysqli_fetch_assoc($rows)) {		        
		$result[] = $res;	
	}

	echo json_encode($result);
}