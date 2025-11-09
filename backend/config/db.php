
<?php
$servername = "srv1192.hstgr.io";
$username   = "u681718804_Guddu";
$password   = "Guddu950258";
$dbname     = "u681718804_iva_db";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    // JSON-safe error
    echo json_encode([
        "status" => "error",
        "message" => "DB Connection Failed: " . $conn->connect_error
    ]);
    exit;
}

// ✅ Success: कोई echo/print नहीं
?>
