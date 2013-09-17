<?php

$c = Page::getByID(138);
//$c->setAttribute("scheduled", array("type" => "all", "open" => true, "slots" => array(array("date" => "September 19, 2013", "duration" => "30 Minutes"), array("date" => "September 30, 2013", "time" => "01:30 AM", "duration" => "1 Hour, 30 Minutes"))));
$arr = $c->getAttribute("scheduled");
echo json_encode($arr);

//echo date("Y-m-d H:i:s", strtotime("September 30, 2013 01:30 AM"));

