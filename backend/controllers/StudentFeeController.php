<?php
include('../config/db.php'); // 🧩 DB connection

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

// 🧮 Helper: Calculate due
if (!function_exists('calculateDue')) {
    function calculateDue($totalFee, $paid) {
        $totalFee = floatval($totalFee ?? 0);
        $paid = floatval($paid ?? 0);
        return max(0, $totalFee - $paid);
    }
}

// 📩 Helper: Send SMS using Fast2SMS (with logging)
if (!function_exists('sendSMS')) {
    function sendSMS($mobile, $message) {
        $apiKey = "ANU1Y5irDT03hWZE9SHz8bRve4LlBOtFwPVd7gMKyux6XCao2ktLZjlMXh5iV9gRCUKvqx8Ta2oeHr4D"; // 🔑 Replace with your real API key
        $senderId = "FSTSMS"; // Default Fast2SMS sender ID (6 letters)
        $url = "https://www.fast2sms.com/dev/bulkV2";

        $data = [
            "route" => "q",
            "sender_id" => $senderId,
            "message" => $message,
            "language" => "english",
            "flash" => 0,
            "numbers" => $mobile
        ];

        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => http_build_query($data),
            CURLOPT_HTTPHEADER => [
                "authorization: $apiKey",
                "cache-control: no-cache",
                "content-type: application/x-www-form-urlencoded"
            ],
        ]);

        $response = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);

        // 🧾 Log SMS response for debugging
        $log = "To: $mobile | Message: $message | Response: $response | Error: $err" . PHP_EOL;
        file_put_contents(__DIR__ . "/sms_log.txt", $log, FILE_APPEND);

        return $response ?: $err;
    }
}

// 🎯 Main API logic
switch($method) {

    // 📘 Fetch all fee records for a student
    case 'GET':
        if(isset($_GET['student_id'])) {
            $student_id = intval($_GET['student_id']);
            $sql = "SELECT * FROM student_fee_details 
                    WHERE student_id = ? 
                    ORDER BY FIELD(month,'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec')";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $student_id);
            $stmt->execute();
            $result = $stmt->get_result();
            $data = $result->fetch_all(MYSQLI_ASSOC);

            echo json_encode(["status" => "success", "data" => $data]);
        } else {
            echo json_encode(["status" => "error", "message" => "student_id missing"]);
        }
        break;


    // ➕ Add new fee record
    case 'POST':
        $input = json_decode(file_get_contents("php://input"), true);
        if (!$input) {
            echo json_encode(["status" => "error", "message" => "Invalid JSON"]);
            exit;
        }

        $student_id   = intval($input['student_id']);
        $session      = $input['session'] ?? '';
        $month        = $input['month'] ?? '';
        $paid_amount  = floatval($input['paid_amount'] ?? 0);
        $payment_mode = $input['payment_mode'] ?? 'monthly';
        $payment_type = $input['payment_type'] ?? 'offline';
        $total_fee    = floatval($input['total_fee'] ?? 0);

        $due_amount = calculateDue($total_fee, $paid_amount);

        $sql = "INSERT INTO student_fee_details 
                (student_id, session, month, total_fee, paid_amount, due_amount, payment_mode, payment_type) 
                VALUES (?,?,?,?,?,?,?,?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("issdddss", $student_id, $session, $month, $total_fee, $paid_amount, $due_amount, $payment_mode, $payment_type);

        if($stmt->execute()){

            // ✅ Fetch student's name & mobile for SMS
            $sRes = $conn->query("SELECT name, mobile FROM students WHERE id = $student_id LIMIT 1");
            if ($sRes && $sRes->num_rows > 0) {
                $student = $sRes->fetch_assoc();
                $name = $student['name'] ?? 'Student';
                $mobile = trim($student['mobile'] ?? '');

                if (!empty($mobile)) {
                    $message = "Hi $name, your fee for $month has been received. Paid ₹$paid_amount, Due ₹$due_amount. - IVWorld Coaching";
                    sendSMS($mobile, $message);
                }
            }

            echo json_encode([
                "status" => "success",
                "message" => "Fee record added successfully and SMS sent.",
                "due" => $due_amount
            ]);
        } else {
            echo json_encode(["status" => "error", "message" => $conn->error]);
        }
        break;


    // ✏️ Update payment
    case 'PUT':
        $input = json_decode(file_get_contents("php://input"), true);
        $id          = intval($input['id']);
        $paid_amount = floatval($input['paid_amount'] ?? 0);
        $total_fee   = floatval($input['total_fee'] ?? 0);

        $due_amount = calculateDue($total_fee, $paid_amount);

        $sql = "UPDATE student_fee_details 
                SET paid_amount=?, due_amount=?, updated_at=CURRENT_TIMESTAMP 
                WHERE id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ddi", $paid_amount, $due_amount, $id);

        if($stmt->execute()){
            echo json_encode(["status" => "success", "message" => "Fee record updated", "due" => $due_amount]);
        } else {
            echo json_encode(["status" => "error", "message" => $conn->error]);
        }
        break;


    // 🗑️ Delete record
    case 'DELETE':
        $input = json_decode(file_get_contents("php://input"), true);
        $id = intval($input['id']);

        $sql = "DELETE FROM student_fee_details WHERE id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);

        if($stmt->execute()){
            echo json_encode(["status" => "success", "message" => "Fee record deleted"]);
        } else {
            echo json_encode(["status" => "error", "message" => $conn->error]);
        }
        break;

    default:
        echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}

$conn->close();
?>
