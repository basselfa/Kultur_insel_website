<?php
// Prevent direct access to this file
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(403);
    exit('Direct access forbidden');
}

// Get form data
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_STRING);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

// Validate inputs
if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Alle Felder müssen ausgefüllt werden.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Bitte geben Sie eine gültige E-Mail-Adresse ein.']);
    exit;
}

$to = 'ba.f.prosoft@gmail.com';

// Set email headers
$headers = "From: $name <$email>" . "\r\n";
$headers .= "Reply-To: $email" . "\r\n";
$headers .= "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";

// Prepare email body
$email_body = "
<html>
<head>
    <title>Neue Kontaktanfrage</title>
</head>
<body>
    <h2>Neue Kontaktanfrage von der Website</h2>
    <p><strong>Name:</strong> $name</p>
    <p><strong>E-Mail:</strong> $email</p>
    <p><strong>Betreff:</strong> $subject</p>
    <p><strong>Nachricht:</strong></p>
    <p>" . nl2br($message) . "</p>
</body>
</html>
";

// Send email
$mail_sent = mail($to, "Kontaktformular: $subject", $email_body, $headers);

// Return response
if ($mail_sent) {
    echo json_encode(['success' => true, 'message' => 'Vielen Dank für Ihre Nachricht! Wir werden uns so schnell wie möglich bei Ihnen melden.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Es gab einen Fehler beim Senden Ihrer Nachricht. Bitte versuchen Sie es später noch einmal.']);
}
?>