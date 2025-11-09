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
    $sql = "CREATE TABLE IF NOT EXISTS fee_structure (
        id INT AUTO_INCREMENT PRIMARY KEY,
        class VARCHAR(50) NOT NULL,          -- eg: '10th', '12th'
        board VARCHAR(50) DEFAULT 'OTHER',   -- CBSE, ICSE, OTHER
        modeOfFee ENUM('monthly','quarterly','halfyearly','yearly') DEFAULT 'monthly',
        amount DECIMAL(10,2) NOT NULL,
        session VARCHAR(50),                 -- academic session
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

    if ($conn->query($sql) === TRUE) {
        echo json_encode([
            "status" => "success",
            "message" => "✅ Fee Structure table created successfully"
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => $conn->error
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}

$conn->close();
