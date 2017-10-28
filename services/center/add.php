<?php
include ("../config.php");
include ("../common.php");

//mysqli_real_escape_string =  Escapes special characters in a string for use in an SQL statement.

$center_name = mysqli_real_escape_string($conn, $_REQUEST['center_name']);
$center_address = $_REQUEST['center_address'];

$result = array();

$sql = "insert into center(center_name,center_address) values ('$center_name','$center_address')";

if(mysqli_query($conn, $sql)){
    $result['success'] = "Record is Created Successfully";
} else{
	$result['error'] = "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
}

echo json_encode($result);