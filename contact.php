<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = $_POST['message'];

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('Formato de correo inválido.'); window.history.back();</script>";
        exit;
    }

    $to = "contact@divstudio.net";
    $subject = "New message from $name";
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $email_body = "New message from your website contact form:\n\n";
    $email_body .= "Name: $name\n";
    $email_body .= "Email: $email\n\n";
    $email_body .= "Message:\n$message";

    if (mail($to, $subject, $email_body, $headers)) {
        echo "<script>alert('¡Tu mensaje fue enviado con éxito!'); window.location.href = 'success.html';</script>";
    } else {
        // Log the error for debugging (omitted for brevity)
        echo "<script>alert('No se pudo enviar tu mensaje. Inténtalo nuevamente.'); window.history.back();</script>"; 
    }
}
?>