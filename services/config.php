<?php
$servername = "127.0.0.1"; //Ip or HostName(localshost)
$username = "root"; //Database Username
$password = ""; //Database Pwd
$dbname = "ivf"; //Database Name
// Create connection
$conn = new mysqli($servername, $username, $password,$dbname);

// Check connection
/*if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
//echo "Connected successfully";
$sql = 'SELECT * from role';
$rows = array();
$result = $conn->query($sql);
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}
echo json_encode($rows);*/
?>