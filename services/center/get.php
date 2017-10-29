<?php
include ("../config.php");
include ("../common.php");

$sql = "select * from center";
$rows = $conn->query($sql);
$result = [];
while($res = mysqli_fetch_assoc($rows)) {		        
	$result[] = $res;	
}

echo json_encode($result);