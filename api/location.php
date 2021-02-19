<?php

include ("login.php");


// GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    // /locations/location_id
    if (isset($_GET['location_id'])) {

        $query = "SELECT * FROM location  WHERE location.location_id = ".$_GET['location_id'];
        $result = $mysqli->query($query) OR DIE($mysqli->error);

        $data = array();

        $row = $result->fetch_assoc();
        $data['id'] = $row['location_id'];
        $data['name'] = $row['location_name'];
        
        $data['nests'] = [];
        $query = "SELECT * FROM nest WHERE location_id = ".$_GET['location_id'];
        $result = $mysqli->query($query) OR DIE($mysqli->error);
        while ($row = $result->fetch_assoc()) {
            $data['nests'][] = ["id" => $row['nest_id'], "name" => $row['nest_name']];
        }
    }

    // /locations
    else {

        $query = "SELECT * FROM location";
        $result = $mysqli->query($query) OR DIE($mysqli->error);
        $data = array();

        while ($row = $result->fetch_assoc()) {
            $data[] = ["id" => $row['location_id'], "name" => $row['location_name']];
        }

    }

    header('Content-type: application/json');
    echo json_encode($data);

}



// DELETE 
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    
    // /location/location_id
    if (isset($_GET['location_id'])) {

        $deleteQuery = "DELETE FROM location WHERE location_id = ".$_GET['location_id'];
        $result = $mysqli->query($deleteQuery); // OR DIE($mysqli->error);
        $success = $result == 1;

        $data = array('success' => $success);
        header('Content-type: application/json');
        echo json_encode($data);

    }

}

// POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Accepts object with fomrat: {location_name: string}

    $data = json_decode(file_get_contents('php://input'), true);



    $name = $mysqli->real_escape_string($data['name']);
    $query = "INSERT INTO location (location_name) VALUES ('$name')";

    $logResult = $mysqli->query($query) OR DIE($mysqli->error);
    $log_id = $mysqli->insert_id;

    $returnData = array('logId' => $log_id);
    
    header('Content-type: application/json');
    echo json_encode($returnData);

}

// PATCH
if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {

    if (isset($_GET['location_id'])) {
        $data = json_decode(file_get_contents('php://input'), true);

        $updates = array();

        if ($data['name']) {
            $name = $mysqli->real_escape_string($data['name']);
            $updates[] = "location_name = '".$name."'";
        }

        $query = "UPDATE location SET ".implode(",",$updates)." WHERE location_id = ".$_GET['location_id'];
        $result = $mysqli->query($query) OR DIE($mysqli->error);
        $success = $result == 1;

        $returnData = array('success' => $success);
        $returnData['query'] = $query;

    }

    header('Content-type: application/json');
    echo json_encode($returnData);
}

?>