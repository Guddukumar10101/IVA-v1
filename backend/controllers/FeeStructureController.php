<?php
include('../config/db.php'); // DB connection

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents("php://input"), true);

try {
    switch ($method) {

        // ========== CREATE ==========
        case 'POST':
            $class     = $input['class'] ?? '';
            $board     = $input['board'] ?? 'OTHER';
            $modeOfFee = $input['modeOfFee'] ?? 'monthly';
            $amount    = isset($input['amount']) ? (float)$input['amount'] : 0;
            $session   = $input['session'] ?? '';

            if (empty($class) || empty($amount) || empty($session)) {
                echo json_encode(["status" => "error", "message" => "Class, session and amount are required"]);
                exit();
            }

            // Duplicate check
            $check = $conn->prepare("SELECT id FROM fee_structure WHERE class=? AND board=? AND session=? AND modeOfFee=?");
            $check->bind_param("ssss", $class, $board, $session, $modeOfFee);
            $check->execute();
            $check->store_result();

            if ($check->num_rows > 0) {
                echo json_encode(["status" => "error", "message" => "Fee structure already exists for this class/board/session/mode"]);
            } else {
                $stmt = $conn->prepare("INSERT INTO fee_structure (class, board, modeOfFee, amount, session) VALUES (?, ?, ?, ?, ?)");
                $stmt->bind_param("sssds", $class, $board, $modeOfFee, $amount, $session);
                if ($stmt->execute()) {
                    echo json_encode(["status" => "success", "message" => "Fee structure added successfully"]);
                } else {
                    echo json_encode(["status" => "error", "message" => $stmt->error]);
                }
                $stmt->close();
            }
            $check->close();
            break;

        // ========== READ ==========
        case 'GET':
            $result = $conn->query("SELECT * FROM fee_structure ORDER BY createdAt DESC");
            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = [
                    "id" => $row["id"],
                    "class" => $row["class"],
                    "board" => $row["board"],
                    "modeOfFee" => $row["modeOfFee"],
                    "amount" => $row["amount"],
                    "session" => $row["session"],
                    "createdAt" => $row["createdAt"],
                    "updatedAt" => $row["updatedAt"]
                ];
            }
            echo json_encode(["status" => "success", "data" => $data]);
            break;

        // ========== UPDATE ==========
        case 'PUT':
            if (!$input || !isset($input['id'])) {
                echo json_encode(["status"=>"error","message"=>"ID required"]);
                exit();
            }

            $id        = $input['id'];
            $class     = $input['class'] ?? '';
            $board     = $input['board'] ?? 'OTHER';
            $modeOfFee = $input['modeOfFee'] ?? 'monthly';
            $amount    = isset($input['amount']) ? (float)$input['amount'] : 0;
            $session   = $input['session'] ?? '';

            if (empty($class) || empty($amount) || empty($session)) {
                echo json_encode(["status" => "error", "message" => "Class, session and amount are required"]);
                exit();
            }

            // Duplicate check excluding current id
            $check = $conn->prepare("SELECT id FROM fee_structure WHERE class=? AND board=? AND session=? AND modeOfFee=? AND id != ?");
            $check->bind_param("ssssi", $class, $board, $session, $modeOfFee, $id);
            $check->execute();
            $check->store_result();

            if ($check->num_rows > 0) {
                echo json_encode(["status"=>"error","message"=>"Duplicate fee structure exists"]);
            } else {
                $stmt = $conn->prepare("UPDATE fee_structure SET class=?, board=?, modeOfFee=?, amount=?, session=? WHERE id=?");
                $stmt->bind_param("sssdsd",$class,$board,$modeOfFee,$amount,$session,$id);
                if ($stmt->execute()) {
                    echo json_encode(["status"=>"success","message"=>"Fee structure updated successfully"]);
                } else {
                    echo json_encode(["status"=>"error","message"=>$stmt->error]);
                }
                $stmt->close();
            }
            $check->close();
            break;

        // ========== DELETE ==========
        case 'DELETE':
            if (!$input || !isset($input['id'])) {
                echo json_encode(["status"=>"error","message"=>"ID required"]);
                exit();
            }

            $id = $input['id'];
            $stmt = $conn->prepare("DELETE FROM fee_structure WHERE id=?");
            $stmt->bind_param("i",$id);
            if($stmt->execute()) {
                echo json_encode(["status"=>"success","message"=>"Fee structure deleted successfully"]);
            } else {
                echo json_encode(["status"=>"error","message"=>$stmt->error]);
            }
            $stmt->close();
            break;

        default:
            echo json_encode(["status"=>"error","message"=>"Invalid request"]);
            break;
    }
} catch(Exception $e){
    echo json_encode(["status"=>"error","message"=>$e->getMessage()]);
}

$conn->close();
