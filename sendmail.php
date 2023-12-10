<?php
  require 'phpmailer/src/Exception.php';
  require 'phpmailer/src/PHPMailer.php';
  require 'phpmailer/src/SMTP.php';

  $title = "Тема письма: Zatoplenie Test";
  echo "Hello!";

  foreach ( $_POST as $key => $value ) {
    if ( $value != "") {
      $body .= "
      " . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
        <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
        <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
      </tr>
      ";
    }
  }

  $body = "<table style='width: 100%;'>$body</table>";


  $mail = new PHPMailer\PHPMailer\PHPMailer();
  echo "test 2";

  try {
    $mail->isSMTP();
    $mail->SMTPDebug = 1;
    $mail->CharSet = 'UTF-8';
    $mail->SMTPAuth   = true;

    $mail->Host = 'tls://smtp.gmail.com:587';
    $mail->Username   = 'advokat.nkl@gmail.com';
    $mail->Password   = 'mrfwpocbnzpcsvje';
    $mail->SMPTSecure = 'ssl';

    $mail->setFrom('tselm.nkl@gmail.com', 'Заявка с вашего сайта');
    // $mail->setFrom('advokat.nkl@gmail.com', 'Заявка с вашего сайта');
    $mail->addAddress('tselm.nkl@gmail.com');
    // $mail->addAddress('advokat.nkl@gmail.com');

    $mail->IsHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;

    $mail->send();
    echo "in try";
  } catch (Exception $e) {
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
    echo $status;
    echo $e;
  }
?>