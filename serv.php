<?php

require 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer; 
use PHPMailer\PHPMailer\SMTP; 
use PHPMailer\PHPMailer\Exception;

include('Database.php');


if (isset($_FILES)) {
    foreach ($_FILES as $file)
        saveFiles($file);
}



define('CLIENTS', __DIR__ . '/clients.txt');
session_start();

$pdo = new Database; //создание бд
$pdo->connect(); //создание соединения с бд
$pdo->createTable(); //создание таблицы в бд
$pdo->createTableLog();
$pdo->createTableTime();






// if (checkSessione($_SESSION)) {
//         $client = new Client;
//         $client->checkDate($_POST);
//         // $client->saveToFile();
//     header('location: /?error_form=Вы отправляли форму,не нужно делать это сново');
// } else {
$client = new Client;

$errors = validate($_POST); //проверка формы есть ли имя

if ($errors) { 
    //echo 'неправильное имя';
    echo json_encode($errors);
} else {
   
    //если проверка прошла 
    $client = new Client;//создаем клиента
    $client->checkDate($_POST); //задаем ему параметры
    // $client->saveToFile();//старое сохранение в файл

    $oldPhone = $pdo->getPhoneFromeTable($_POST['phone']);
  

    setcookie('name', $_POST['name']); //записывыем кук
    setcookie('phone', $_POST['phone']);
    $cookieId = setcookie('id', time());

    $_SESSION['id'] = time();
    $_SESSION['name'] = $_POST['name']; // записываем в сессию
    $_SESSION['phone'] = $_POST['phone'];
    $userData['name'] = $_POST['name'];
    $userData['phone'] = $_POST['phone'];
    $userData['myId'] = $_COOKIE['id'];
    $userData['upload_file'] = $GLOBALS['upload_file'];

  

   if( $_POST['phone']== $oldPhone){
    sendMailRepeat($client);
    exit;
   }else{
       $pdo->createRecord($userData);
   }

    // //уведомление на почту 

  $result = sendMail($client,$_FILES);
   
    $data=[];
    $dataOne=[];
    $dataOne['dateAdmin']=date('d M Y H:i:s');
    $data['order_id'] = $_COOKIE['id'];


    $result = [
        'name' => $_POST['name'],
    ];
    
   echo json_encode($result);
  // echo 'неправильное имя';
  
    if( $result) {
        $data['result']= 'succes';
        $resultUser = sendMailUsers($client);
        $dataOne['dateUser']=date('d M Y H:i:s');

        $pdo->createRecordLog($data);
        $dataOne['result']= 'succes';
        
        if( $resultUser) {
        $dataOne['resultUser']= 'succesSendUser';
        }else{
        $dataOne['resultUser']= 'errorSendUser';
        }

        $pdo->createRecordTime($dataOne);
        $pdo->createRecordTime($data);

    }else{
        $data['result']= 'error';
        // не получилась отправка письма администратору ?>
        <script>
            let nextTry = document.getElementById(`nextTry`);
            nextTry.style.display = `block`;
            nextTry.onclick = function () {
            <?php 
             sendMail($client,$_FILES);
             sendMailUsers($client);
              ?>
            modalPresentWindow.style.display = `none`
            }
        </script>
        <?php 
    }
   

     

     header('location: /thanks.php?name=' . $_POST['name']); // переход если форма правильно заполнена 
  
}
//повторная отправка  запроса 

function sendMailRepeat($client){

    $mail=new PHPMailer();
    try {
    // $mail->SMTPDebug = SMTP::DEBUG_SERVER;   
    $mail->isSMTP();                                            
    $mail->Host       = 'smtp.yandex.ru'; // берем у яндекса                   
    $mail->SMTPAuth   = true;                                   
    $mail->Username   = 'izalia.bidonova@yandex.ru';// адрес с которого слаться будут ?                     
    $mail->Password   = 'ilovemy777';  // пароль от него                           
    $mail->SMTPSecure ='ssl';    
    $mail->SMTPOptions =  array(
     'ssl'=>array(
         'verify_peer'=>false,
         'verify_peer_name'=>false,
         'allow_self_signed'=>true
     )
    )   ;  
    $mail->Port       = 465; // берем у яндекса  
    $mail->setFrom('izalia.bidonova@yandex.ru', 'Mailer');
    $mail->addAddress('bidonovy@mail.ru');         

    $mail->addAttachment( $GLOBALS['upload_file']);   //для загрузки файла в письмо           
    $mail->isHTML(true);    

    //тема
    $mail->Subject = ' Request from site';

    //сообщение

    $message = '<body>
    <p>User <b>' . $client->name . '</b> put request repeatedly </p>' . "\r\n";
    $message .='<p> Phone: <b style:"color:green">' . $client->phone . '</b></p>';
    $message .='</body>';
    $mail->Body = $message;

    return $mail->send();

} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

}
//функция отправки писем
function sendMail($client,$file){

    $mail=new PHPMailer();///
    try {
    // $mail->SMTPDebug = SMTP::DEBUG_SERVER;   
    $mail->isSMTP();                                            
    $mail->Host       = 'smtp.yandex.ru'; // берем у яндекса                   
    $mail->SMTPAuth   = true;                                   
    $mail->Username   = 'izalia.bidonova@yandex.ru';// адрес с которого слаться будут ?                     
    $mail->Password   = 'ilovemy777';  // пароль от него                           
    $mail->SMTPSecure ='ssl';         
    $mail->Port       = 465; // берем у яндекса  
    $mail->setFrom('izalia.bidonova@yandex.ru', 'Mailer');
    $mail->addAddress('bidonovy@mail.ru');         

    $mail->addAttachment( $GLOBALS['upload_file']);   //для загрузки файла в письмо           
    $mail->isHTML(true);    //

    //тема
    $mail->Subject = ' Request from site';

    //сообщение

    $message = '<body>
    <p>User <b>' . $client->name . '</b> put request </p>' . "\r\n";
    $message .='<p> Phone: <b style:"color:green">' . $client->phone . '</b></p>';
    $message .='</body>';
    $mail->Body = $message;

    return $mail->send();

} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

}

// письмо пользователю
function sendMailUsers($client){

    $mail=new PHPMailer();
    try {
   //$mail->SMTPDebug = SMTP::DEBUG_SERVER;   
    $mail->isSMTP();                                            
    $mail->Host       = 'smtp.yandex.ru'; // берем у яндекса                   
    $mail->SMTPAuth   = true;                                   
    $mail->Username   = 'izalia.bidonova@yandex.ru';// адрес с которого слаться будут ?                     
    $mail->Password   = 'ilovemy777';  // пароль от него                           
    $mail->SMTPSecure ='ssl';         
    $mail->Port       = 465; // берем у яндекса  
    $mail->setFrom('izalia.bidonova@yandex.ru', 'Mailer');
    $mail->addAddress($client->email);         

    $mail->addAttachment( $GLOBALS['upload_file']);   //для загрузки файла в письмо           
    $mail->isHTML(true);    

    //тема
    $mail->Subject = ' Request from site';

    //сообщение

    $message = '<body>
    <p>Hello, <b>' . $client->name . '</b>. Your application is accepted. </p>' . "\r\n";
    $message .='</body>';
    $mail->Body = $message;

    return $mail->send();

} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

}

// письмо при ошибке на сервере 
function sendErrorServer($client,$dataServer,$browser){

    $mail=new PHPMailer();
    try {
    // $mail->SMTPDebug = SMTP::DEBUG_SERVER;   
    $mail->isSMTP();                                            
    $mail->Host       = 'smtp.yandex.ru'; // берем у яндекса                   
    $mail->SMTPAuth   = true;                                   
    $mail->Username   = 'izalia.bidonova@yandex.ru';// адрес с которого слаться будут ?                     
    $mail->Password   = 'ilovemy777';  // пароль от него                           
    $mail->SMTPSecure ='ssl';         
    $mail->Port       = 465; // берем у яндекса  
    $mail->setFrom('izalia.bidonova@yandex.ru', 'Mailer');
    $mail->addAddress('bidonovy@mail.ru');         

    $mail->addAttachment( $GLOBALS['upload_file']);   //для загрузки файла в письмо           
    $mail->isHTML(true);     

    //тема
    $mail->Subject = ' Request from site';

    //сообщение
    
    $message = '<body>
    <p>Problems on the server, from client  <b>' . $client->name . '</b> </p>' . "\r\n";
    $message .='<p> Time: <b style:"color:green">' . $dataServer . '</b></p>';
    $message .='<p> Browser: <b style:"color:green">' . $browser . '</b></p>';
    $message .='</body>';
    $mail->Body = $message;

    return $mail->send();

} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

}



function saveFiles($file) // куда сохранять файлы и под каким именем 
{
    
    $temp_data = explode('.', $file['name']); // берем имя файла и делим его после точки
    $extenssion = $temp_data[count($temp_data) - 1]; // берем последний элемент массива его тип
    $name = time() . '.' . $extenssion; //задаем новое имя состоит из даты + расширения
    $dir = __DIR__ . '/uploads/'; //директория куда загружаются данные, (_DIR_-текущий каталог скрипта)
    $GLOBALS['upload_file'] = $dir . $name; // место + имя 
    move_uploaded_file($file['tmp_name'],  $GLOBALS['upload_file']); //перемещаем временый файл в постояноое хранилище 

}




// function checkSessione($_SESSION)//проверка на наличие телефона для сессиии
// {
//     if (isset($_SESSION['phone']) && $_SESSION['phone']) {
//         return true;
//     }
//     return false;
// }



function validate($data) //проверка на наличие имени
{ $return =[];
    if (!isset($data['name']) || !$data['name']) {
        $return ['error_name']='Не заполнено имя';
    }
    return $return;
}




class Client //создание класса клиент 
{
    public $name,
        $present,
        $phone,
        $popcorn,
        $agree,
        $email;
    public function checkDate($data) //присвоение параметров  классу из поста
    {
        $this->name = $data['name'];

        if (isset($data['phone']) && $data['phone']) {
            $this->phone = $data['phone'];
        }
        if (isset($data['email']) && $data['email']) {
            $this->email = $data['email'];
        }
        if (isset($data['present']) && $data['present']) {
            $this->present = $data['present'];
        }
        if (isset($data['popcorn']) && $data['popcorn']) {
            $this->popcorn = $data['popcorn'];
        }
        if (isset($data['agree']) && $data['agree']) {
            $this->agree = $data['agree'];
        }
    }


    // public function saveToFile()
    // {
    //     $data = file_get_contents(CLIENTS); 
    //     $new_data = '';
    //     $new_data .= "\r\n" .'Имя пользователя' . $this->name . ';'."\r\n";
    //     if ($this->present) {
    //         $new_data .= 'Выбранный подарок: ' . $this->present .';'. "\r\n";
    //     }
    //     if ($this->phone) {
    //         $new_data .= 'Телефон пользователя: ' . $this->phone .';'. "\r\n";
    //     }
    //     if ($this->popcorn) {
    //         $new_data .= $this->popcorn .';'. "\r\n";
    //     }
    //     if ($this->agree) {
    //         $new_data .= $this->agree .';'. "\r\n";
    //     }
    //     if ($this->email) {
    //         $new_data .= 'Почта пользователя: ' . $this->email .';'. "\r\n";
    //     }
    //     $new_data.= 'Time: '.date("d.m.Y").' '. date("H:i")."\r\n";
    //     $new_data.='____________';
    //    file_put_contents(CLIENTS, $data . $new_data); 
    // }
}
  //  if (validate($_POST)) {
    //     $client = new Client;
    //     $client->checkDate($_POST);
    //     // $client->saveToFile();

    //     //Проверка  телефона 
    //     $wrongPhone = ['-', '(', ')', ' '];
    //     $ourPhone = str_split($_POST['phone']);
    //     $result = array_diff($ourPhone, $wrongPhone);
    //     if ($result[0] === '8') {
    //         $result[0] = '+7';
    //     }
    //     $_POST['phone'] = implode('', $result);

    //     setcookie('name', $_POST['name']);
    //     setcookie('phone', $_POST['phone']);
    //     setcookie('email', $_POST['email']);
    //     setcookie('id', time());

    //     $_SESSION['name'] = $_POST['name'];
    //     $_SESSION['phone'] = $_POST['phone'];
    //     $_SESSION['id'] = time();

    //     // Проверка  email 
    //     $b = explode('.', $_POST['email']);
    //     for ($i = 0; $i < count($b); $i++) {
    //         if ($b[1] === 'com' || $b[1] === 'org') {
    //             header('location: /thanks.php?name=' . $_POST['name']);
    //         } else {
    //             header('location: /?error_email=Неверный домен');
    //         }
    //     }
    // } else {
    //     header('location: /?error_name=Не заполнено имя');
    // }
