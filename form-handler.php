<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $name = $_POST["name"];
  $email = $_POST["email"];
  $subject = $_POST["subject"];
  $message = $_POST["message"];

  $to = "cassiewis24@gmail.com"; 
  $headers = "From: $name <$email>";
  $mailBody = "Subject: $subject\n\n";
  $mailBody .= "From: $name\n";
  $mailBody .= "Email: $email\n";
  $mailBody .= "Message:\n$message";

  // Send the email
  if (mail($to, $subject, $mailBody, $headers)) {
    echo "Thank you! Your message has been sent.";
  } else {
    echo "Oops! Something went wrong. Please try again later.";
  }
}
?>