<?php
include ("../config.php");
include ("../common.php");

//mysqli_real_escape_string =  Escapes special characters in a string for use in an SQL statement.

$firstname = mysqli_real_escape_string($conn, $_REQUEST['firstname']);
$lastname = mysqli_real_escape_string($conn, $_REQUEST['lastname']);
$email = $_REQUEST['email'];
$contact =  $_REQUEST['contact'];
$password = $_REQUEST['password'];
$center_id = $_REQUEST['center_id'];
$role_id = $_REQUEST['role_id'];

$result = array();

$sql = "insert into user(firstname,lastname,email,contact,password,center_id,role_id) values ('$firstname','$lastname','$email','$contact','$password','$center_id','$role_id')";

if(mysqli_query($conn, $sql)){
    $result['success'] = "Record is Created Successfully";
} else{
	$result['error'] = "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
}

echo json_encode($result);