<?php

include ("login.php");


// GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    // /locations/location_id/nests/nest_id
    if ($_GET['location_id'] && $_GET['nest_id']) {

        $query = "SELECT * FROM nest  WHERE nest.nest_id = ".$_GET['nest_id'];
        $result = $mysqli->query($query) OR DIE($mysqli->error);

        $row = $result->fetch_assoc();
        $data = ["id" => $row['nest_id'], "locationId" => $row['location_id'], "name" => $row['nest_name']];

    }

    // /locations/location_id/nests
    else if ($_GET['location_id']) {
        
        $query = "SELECT * FROM nest WHERE location_id = ".$_GET['location_id'];
        $result = $mysqli->query($query) OR DIE($mysqli->error);
        $data = array();

        while ($row = $result->fetch_assoc()) {
            $data[] = ["nestId" => $row['nest_id'], "locationId" => $row['location_id'], "nestName" => $row['nest_name']];
        }
    }

    // /nest/nest_id
    else if ($_GET['nest_id']) {

        $query = "SELECT * FROM nest  WHERE nest.nest_id = ".$_GET['nest_id'];
        $result = $mysqli->query($query) OR DIE($mysqli->error);

        $row = $result->fetch_assoc();
        $data = ["id" => $row['nest_id'], "locationId" => $row['location_id'], "name" => $row['nest_name']];
    }

    // /nests
    else {

        $query = "SELECT * FROM nest";
        $result = $mysqli->query($query) OR DIE($mysqli->error);
        $data = array();

        while ($row = $result->fetch_assoc()) {
            $data[] = ["nestId" => $row['nest_id'], "locationId" => $row['location_id'], "nestName" => $row['nest_name']];
        }

    }

    header('Content-type: application/json');
    echo json_encode($data);

}

// DELETE 
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    
    // /location/location_id
    if ($_GET['nest_id']) {

        $deleteQuery = "DELETE FROM nest WHERE nest_id = ".$_GET['nest_id'];
        $result = $mysqli->query($deleteQuery); // OR DIE($mysqli->error);
        $success = $result == 1;

        $data = array('success' => $success);
        header('Content-type: application/json');
        echo json_encode($data);

    }

}

// POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Accepts object with format: {name: string, location_id: number}

    $data = json_decode(file_get_contents('php://input'), true);

    if ($_GET['location_id']) {
        $data['location_id'] = $_GET['location_id'];
    }

    // Only proceed if the location ID is valid
    $query = "SELECT * FROM location  WHERE location.location_id = $data[location_id]";
    $result = $mysqli->query($query) OR DIE($mysqli->error);


    if ($result->num_rows > 0) {

        $nest_name = $mysqli->real_escape_string($data['name']);
        $query = "INSERT INTO nest (location_id, nest_name) VALUES ('$data[location_id]', '$nest_name')";

        $logResult = $mysqli->query($query) OR DIE($mysqli->error);
        $log_id = $mysqli->insert_id;

        $returnData = array('logId' => $log_id);

    }


    header('Content-type: application/json');
    echo json_encode($returnData);

}

// PATCH
if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {

    if (isset($_GET['nest_id'])) {
        $data = json_decode(file_get_contents('php://input'), true);

        $updates = array();

        if ($data['name']) {
            $name = $mysqli->real_escape_string($data['name']);
            $updates[] = "nest_name = '".$name."'";
        }

        $query = "UPDATE nest SET ".implode(",",$updates)." WHERE nest_id = ".$_GET['nest_id'];
        $result = $mysqli->query($query) OR DIE($mysqli->error);
        $success = $result == 1;

        $returnData = array('success' => $success);
        $returnData['query'] = $query;

    }

    header('Content-type: application/json');
    echo json_encode($returnData);
}

?>