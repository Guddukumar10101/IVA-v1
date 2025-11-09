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
    $sql = "CREATE TABLE IF NOT EXISTS student_fee_details (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT NOT NULL,
        session VARCHAR(20) NOT NULL,
        month VARCHAR(20) NOT NULL,
        total_fee DECIMAL(10,2) NOT NULL,
        paid_amount DECIMAL(10,2) DEFAULT 0,
        due_amount DECIMAL(10,2) DEFAULT 0,
        payment_mode ENUM('monthly','quarterly','halfyearly','yearly') DEFAULT 'monthly',
        payment_type ENUM('offline','online') DEFAULT 'offline',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

    if ($conn->query($sql) === TRUE) {
        echo json_encode([
            "status" => "success",
            "message" => "✅ Student Fee Details table created successfully"
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
