<?php 
header('Content-Type: text/xml');
sleep(3);
//suma un día y un segundo
//$segundos = time() + 86401;
$segundos = time();
echo "<?xml version=\"1.0\"?><clock1><hora>". $segundos ."</hora></clock1>";
//SE retrasa de la hora real lo quie tarde en llegar la respuesta desde el servidor al cliente//
//sleep(4);
?>





