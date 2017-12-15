<?php

include ("../config.php");
//include ("../common.php");


$key = "aGGroCreeps!%#!`";
$data = (json_decode(file_get_contents("php://input"),true)); // Data will come in JSON format from angular
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
	$wife_name = $data['wife_name'];
	$wife_blood_group = $data['wife_blood_group'];
	$wife_height = $data['wife_height'];
	$wife_weight = $data['wife_weight'];
	$wife_age = $data['wife_age'];
	$wife_dob = $data['wife_dob'];
	$wife_phone = $data['wife_phone'];
	$wife_email = $data['wife_email'];
	$wife_bmi = $data['wife_bmi'];
	$husband_name = $data['husband_name'];
	$husband_blood_group = $data['husband_blood_group'];
	$husband_height = $data['husband_height'];
	$husband_weight = $data['husband_weight'];
	$husband_age = $data['husband_age'];
	$husband_dob = $data['husband_dob'];
	$husband_phone = $data['husband_phone'];
	$husband_email = $data['husband_email'];
	$husband_bmi = $data['husband_bmi'];
	$address = $data['address'];
	$marridge_date = $data['marridge_date'];
	$marridge_since = $data['marridge_since'];
	
	$result = array();

	$sql = "insert into patient(wife_name,wife_blood_group,wife_height,wife_weight,wife_age,wife_dob,wife_phone,wife_email,wife_bmi,husband_name,husband_blood_group,husband_height,husband_weight,husband_age,husband_dob,husband_phone,husband_email,husband_bmi,address,marridge_date,marridge_since) values ('$wife_name','$wife_blood_group',$wife_height,$wife_weight,$wife_age,'$wife_dob','$wife_phone','$wife_email',$wife_bmi,'$husband_name','$husband_blood_group',$husband_height,$husband_weight,$husband_age,'$husband_dob','$husband_phone','$husband_email',$husband_bmi,'$address','$marridge_date','$marridge_since')";

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
	$wife_name = $data['wife_name'];
	$wife_blood_group = $data['wife_blood_group'];
	$wife_height = $data['wife_height'];
	$wife_weight = $data['wife_weight'];
	$wife_age = $data['wife_age'];
	$wife_dob = $data['wife_dob'];
	$wife_phone = $data['wife_phone'];
	$wife_email = $data['wife_email'];
	$wife_bmi = $data['wife_bmi'];
	$husband_name = $data['husband_name'];
	$husband_blood_group = $data['husband_blood_group'];
	$husband_height = $data['husband_height'];
	$husband_weight = $data['husband_weight'];
	$husband_age = $data['husband_age'];
	$husband_dob = $data['husband_dob'];
	$husband_phone = $data['husband_phone'];
	$husband_email = $data['husband_email'];
	$husband_bmi = $data['husband_bmi'];
	$address = $data['address'];
	$marridge_date = $data['marridge_date'];
	$marridge_since = $data['marridge_since'];
	$updated_at =  date('Y-m-d');
	$patient_id = $data['patient_id'];
	
	$result = array();

	$sql = "update patient set wife_name = '$wife_name',wife_blood_group = '$wife_blood_group',wife_height = $wife_height,wife_weight = $wife_weight,wife_age = $wife_age,wife_dob = '$wife_dob',wife_phone = '$wife_phone',wife_email = '$wife_email',wife_bmi = $wife_bmi,husband_name = '$husband_name',husband_blood_group = '$husband_blood_group',husband_height = $husband_height,husband_weight = $husband_weight,husband_age = $husband_age,husband_dob = '$husband_dob',husband_phone = '$husband_phone',husband_email = '$husband_email',husband_bmi = $husband_bmi,address = '$address',marridge_date = '$marridge_date',marridge_since = '$marridge_since' where patient_id = $patient_id";

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
	$id = (int)$data['patient_id'];
	global $conn;
	$sql = "select * from patient where patient_id = $id";

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
	$sql = "select * from patient";

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



