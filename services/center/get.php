<?php
include ("../config.php");
include ("../common.php");

//mysqli_real_escape_string =  Escapes special characters in a string for use in an SQL statement.

$result = array();

$sql = "select * from center";

$rows = $conn->query($sql);
while($r = mysqli_fetch_assoc($rows)) {
    $result[] = $r;
}

echo json_encode($result);