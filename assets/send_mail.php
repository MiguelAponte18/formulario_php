<?php


if(isset($_POST)){
    error_reporting(0);//ppara que no envie errores al front
    $name = $_POST["nombre"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $comments = $_POST["commments"];
    $domain = $_SERVER["HTTP_HOST"]; //la varible server y el atributo  http-host obtienen el dominio desde donde se esta ejecutando la pagina
    
    $to = "miguelrafaellso081@gmail.com";//$to es a donde va dirigido el correo
    $subject_mail = "Cotacto desde el formulario del sitio $domain";
    $message = "
    <p>Datos enviados desde el formulario del sitio <b>$domain</b></p>
    <ul>
    <li>Nombre:<b>$name</b></li>
    <li>Email:<b>$email</b></li>
    <li>Asunto:<b>$subject</b></li>
    <li>Mensaje:<b>$comments</b></li>
    </ul>";

    $headers = "MIME-version: 1.0\r\n"."Content-type: text/html; charset=uft-8\r\n"."From: Envio Automático No Responder <no-reply@$domain>";//En phpse usa el punto para concatenar
    //si no se le espeifica la cabecera manda texto plano por defecto,los mimes son los tipos de contenido que se envian en la cabecera
   $send_mail= mail($to,$subject_mail,$message,$headers); //devuelve booleano

   if($send_mail){
    $res =[
        "err"=>false,
        "message"=>"Tus datos han sido enviados correctamente."
    ];
   }else{
    $res =[
        "err"=>true,
        "message"=>"Error al enviar tus datos, intente nuevamente."
    ];
   };
   //para el envio del correo se necesita un servidor que ppermita la codificacion para emails, por lo tanto el servidor local desde apache nose puede, se necesita un programa especial
   //se tiene que poner que se permite cors tanto en el backend como en el front para que permita acceder
   header("Access-Control-Allow-Origin: *");//al poner el * cualquier dominio podria hacer peticiones a este script, entonces se puede pponer directamnete el dominio al que se le ppermite acceder
   header("Content-type: application/json");
   echo json_encode($res);
   exit;
}