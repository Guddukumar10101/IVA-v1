<?php
include('../config/db.php'); // DB connection

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    $sql = "CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        fatherName VARCHAR(100),
        mobile VARCHAR(20) NOT NULL,
        email VARCHAR(100),
        schoolName VARCHAR(150),
        board VARCHAR(50) DEFAULT 'OTHER',
        class VARCHAR(50) NOT NULL,
        modeOfFee ENUM('monthly','quarterly','yearly') DEFAULT 'monthly',
        session VARCHAR(50),
        address TEXT,
        photo VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_student (name, mobile)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "✅ Students table created successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => $conn->error]);
    }
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}

$conn->close();
