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

    switch ($method) {
        // INSERT
        case 'POST':
            $input = $_POST;
            $name       = trim($input['name'] ?? '');
            $fatherName = trim($input['fatherName'] ?? '');
            $mobile     = trim($input['mobile'] ?? '');
            $email      = trim($input['email'] ?? '');
            $schoolName = trim($input['schoolName'] ?? '');
            $board      = trim($input['board'] ?? 'OTHER');
            $class      = trim($input['class'] ?? '');
            $modeOfFee  = trim($input['modeOfFee'] ?? 'monthly');
            $session    = trim($input['session'] ?? '');
            $address    = trim($input['address'] ?? '');

            if (empty($name) || empty($mobile)) {
                echo json_encode(["status" => "error", "message" => "Name and Mobile required"]);
                exit;
            }

            $photo = '';
            if (!empty($_FILES['photo']['name'])) {
                $targetDir = "../uploads/";
                if (!is_dir($targetDir)) mkdir($targetDir, 0777, true);
                $photo = $targetDir . basename($_FILES["photo"]["name"]);
                move_uploaded_file($_FILES["photo"]["tmp_name"], $photo);
            }

            $stmt = $conn->prepare("INSERT INTO students 
                (name, fatherName, mobile, email, schoolName, board, class, modeOfFee, session, address, photo) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("sssssssssss", $name, $fatherName, $mobile, $email, $schoolName, $board, $class, $modeOfFee, $session, $address, $photo);
            $stmt->execute();
            echo json_encode(["status" => "success", "message" => "Student added"]);
            $stmt->close();
            break;

        // READ
        case 'GET':
            if (isset($_GET['id'])) {
                $id = intval($_GET['id']);
                $result = $conn->query("SELECT * FROM students WHERE id = $id");
                echo json_encode($result->fetch_assoc());
            } else {
                $result = $conn->query("SELECT * FROM students ORDER BY createdAt DESC");
                $students = [];
                while ($row = $result->fetch_assoc()) $students[] = $row;
                echo json_encode($students);
            }
            break;

        // UPDATE
        case 'PUT':
            parse_str(file_get_contents("php://input"), $data);
            $id = intval($data['id'] ?? 0);
            if ($id <= 0) {
                echo json_encode(["status" => "error", "message" => "Invalid ID"]);
                exit;
            }
            $stmt = $conn->prepare("UPDATE students SET name=?, fatherName=?, mobile=?, email=?, schoolName=?, board=?, class=?, modeOfFee=?, session=?, address=? WHERE id=?");
            $stmt->bind_param("ssssssssssi", $data['name'], $data['fatherName'], $data['mobile'], $data['email'], $data['schoolName'], $data['board'], $data['class'], $data['modeOfFee'], $data['session'], $data['address'], $id);
            if ($stmt->execute()) {
                echo json_encode(["status" => "success", "message" => "Student updated"]);
            } else {
                echo json_encode(["status" => "error", "message" => $stmt->error]);
            }
            $stmt->close();
            break;

        // DELETE
        case 'DELETE':
            parse_str(file_get_contents("php://input"), $data);
            $id = intval($data['id'] ?? 0);
            if ($id > 0 && $conn->query("DELETE FROM students WHERE id=$id")) {
                echo json_encode(["status" => "success", "message" => "Deleted"]);
            } else {
                echo json_encode(["status" => "error", "message" => "Delete failed"]);
            }
            break;

        default:
            echo json_encode(["status" => "error", "message" => "Invalid method"]);
    }

    $conn->close();
    ?>
