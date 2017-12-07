<?php

include ("../config.php");
include ("../common.php");



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
	$patient_id = $data['patient_id'];
	$process_id = $data['process_id'];
	$weight = $data['weight'];
	$embryologist_id = $data['embryologist_id'];
	$batch_no = $data['batch_no'];
	
	$result = array();

	$sql = "insert into patient_to_process(patient_id,process_id,weight,embryologist_id,batch_no) VALUES ($patient_id,$process_id,$weight,$embryologist_id,'$batch_no')";

	if(mysqli_query($conn, $sql)){
		$result['success'] = true;
		$result['msg'] = "Process is attached to user Successfully";
	} else{
		$result['error'] = true;
		$result['msg'] = "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
	}

	echo json_encode($result);
}

function update($data){
	global $conn;
	
	$patientId = $data['patient_id'];
	$weight = $data['weight'];
	$updated_by = $data['user_id'];
	$updated_at = $date = date('Y-m-d');
	
	$result = array();

	$sql = "update patient_to_process set weight = $weight,updated_at = '$updated_at', updated_by = $updated_by where patient_id = $patientId";

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
	$patient_id = (int)$data['patient_id'];
	global $conn;
	$sql = "select ptp.weight,ptp.embryologist_id , ptp.batch_no , ptp.created_at as process_created_on,pr.*,p.*,u.firstname as embryologist_firstname , u.lastname as embryologist_lastname
			from patient_to_process ptp
			join process pr on pr.process_id = ptp.process_id
			join patient p on p.patient_id = ptp.patient_id
			join user u on u.user_id = ptp.embryologist_id 
			where ptp.patient_id = $patient_id";

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

function deactivate($data){
	$resultData['error'] = true;
	$result['msg'] = "Currently you can not delete/deactivate this";
	echo json_encode($resultData);
}

function get($data){
	$resultData['error'] = true;
	$result['msg'] = "No operation Provided";
	echo json_encode($resultData);
}



