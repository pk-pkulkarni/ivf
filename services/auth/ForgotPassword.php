<?php

include ("../config.php");
//include ("../common.php");
$key = "aGGroCreeps!%#!`";
$data = (json_decode(file_get_contents("php://input"),true));
$email = $data['email'];
$result = array();
// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
	$result['error'] = true;
	$result['msg'] = "Given email is invalid";
}
else{
	$sqlu = "select * from user where email = '$email' limi 1";

	$rowsu = $conn->query($sqlu);
						
	$resultu = [];
	while($resu = mysqli_fetch_assoc($rowsu)) {		        
		$resultu[] = $resu;	
	}
	if(count($resultu) > 0){
		$password = $resultu['password'];
		$decryptedPassword = base64_decode($password);
		$decryptedPassword = str_replace($key, "", $decryptedPassword);
		// Email Script
		$to = $email;
		$subject = "Recovery of password";
		$txt = "Your Password is ".$decryptedPassword;
		$headers = "From: ivf@noReply.com" . "\r\n";
		
		$retval = mail($to,$subject,$txt,$headers);
		if( $retval == true ) {
			$result['success'] = true;
			$result['msg'] = "Password is sent to the user";
		}else {
			$result['error'] = true;
			$result['msg'] = "There was some problem while retrieving password and sending an email , please contact your Administrator to get your password!";
		}
		//Email Script ends//
	}
	else{
		$result['error'] = true;
		$result['msg'] = "This email is not registerd with us";
	}
}