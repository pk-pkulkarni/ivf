<?php		
	if( isset($_POST['type']) && !empty($_POST['type'] ) ){
		$type = $_POST['type'];

	switch ($type)
	 {
			case "get":
				get();
				break;
			case 'insert':
				insert();
				break;			
				
			default:
			break;
	}
	}
	else
	{
		invalidRequest();
	}

	function get(){
		require 'config.php';

		$sql = "SELECT * FROM student";
		$result = $conn->query($sql);		
		if ($result->num_rows > 0) {		    	    
		    $data = [];
		    while($res = mysqli_fetch_assoc($result)) {		        
		        $row = [];		
				$row['firstName'] =$res["firstName"];									
				$row['lastName'] =$res["lastName"];
				$row['address'] =$res["address"];
				$data[] = $row;				
		    }
		} else {
			$data['success'] = false;
		    echo json_encode($data);
		}		
		$conn->close();		
		echo json_encode($data);
 	}

 	function insert(){
 		$data = $_POST['data']; 			
 		require 'config.php';		
		// prepare and bind
		if(!($stmt = $conn->prepare("INSERT INTO student (firstName, lastName, address) VALUES (?, ?, ?)"))){
			echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
			exit;
		}

		echo $firstName = $_POST['data']['firstName'];
 		echo $lastName = $_POST['data']['lastName'];
 		echo $address = $_POST['data']['address']; exit;
		
		if (!$stmt->bind_param("sss", $firstName, $lastName, $address)) {
		    echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
		    exit;
		}
		// set parameters and execute	
		if (!$stmt->execute()) {
		    echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
		    exit;
		}
		$data['success'] = true;			

		$conn->close();
		echo json_encode($data);
 	}	
?>