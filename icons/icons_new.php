<?php

function getStatus(){
    if(empty($_GET['status'])){
        $json = file_get_contents("https://www.githubstatus.com/api/v2/status.json");
        $json_data = json_decode($json);
        return $json_data->status->indicator;
    }
    return $_GET['status'];
}

function image_png($status, $name){
    $image_width  = 1200;
    $image_height = 630;

    if(isset($name)){
        $image_width  = 400;
        $image_height = 210;
    }

    $im = @imagecreate($image_width, $image_height) or die("Cannot Initialize new GD image stream");

    // echo $json_data->status->indicator;

    if($status == "none" || $status == "good") {
        $background_color = imagecolorallocate($im, 51, 153, 102);
    }elseif ($status == "minor") {
        $background_color = imagecolorallocate($im, 219, 171, 9);
    }elseif ($status == "major") {
        $background_color = imagecolorallocate($im, 226, 93, 16);
    }elseif ($status == "critical") {
        $background_color = imagecolorallocate($im, 220, 53, 69);
    }elseif ($status == "maintenance") {
        $background_color = imagecolorallocate($im, 3, 102, 214);
    }else {
        $background_color = imagecolorallocate($im, 79, 147, 189);
    }

    $text_color = imagecolorallocate($im, 255, 250, 250);

    // $status = "GitHub Status";
    if(isset($name)){
        if($status == "none") { $status = "good"; }

        $status = strtoupper($status);
    }else{
        $status = "GitHub Status";
    }

    putenv('GDFONTPATH=' . realpath('.'));

    $font_size = 95;
    $angle = 0;
    $font = 'Verdana Bold';
    $text = $status;
    $name = $text . ".png";

    if(isset($name)){
        $font_size = 45;
    }

    $text_box = imagettfbbox($font_size, $angle, $font, $text);

    $text_width = $text_box[2]-$text_box[0];
    $text_height = $text_box[7]-$text_box[1];

    $x = ($image_width/2) - ($text_width/2) - 5;
    $y = ($image_height/2) - ($text_height/2);

    imagettftext($im, $font_size, $angle, $x, $y, $text_color, $font, $text);

    // imagepng($im);
    imagepng($im, NULL, -1);
    imagedestroy($im);
}

function image_min_png($status, $txt_temp){
    $image_width  = 300;
    $image_height = 300;

    $im = @imagecreate($image_width, $image_height) or die("Cannot Initialize new GD image stream");

    // echo $json_data->status->indicator;

    if($status == "none" || $status == "good") {
        $background_color = imagecolorallocate($im, 51, 153, 102);
    }elseif ($status == "minor") {
        $background_color = imagecolorallocate($im, 219, 171, 9);
    }elseif ($status == "major") {
        $background_color = imagecolorallocate($im, 226, 93, 16);
    }elseif ($status == "critical") {
        $background_color = imagecolorallocate($im, 220, 53, 69);
    }else {
        $background_color = imagecolorallocate($im, 79, 147, 189);
    }

    $text_color = imagecolorallocate($im, 255, 250, 250);

    $txt = "GH";
    if(isset($txt_temp) && !empty($txt_temp)){
        $txt = $txt_temp;
    }

    // if($status == "none") { $status = "good"; }

    putenv('GDFONTPATH=' . realpath('.'));

    $font_size = 95;
    $angle = 0;
    $font = 'Verdana Bold';
    $text = $txt;
    $name = $text . ".png";

    $text_box = imagettfbbox($font_size, $angle, $font, $text);

    $text_width = $text_box[2]-$text_box[0];
    $text_height = $text_box[7]-$text_box[1];

    $x = ($image_width/2) - ($text_width/2) + 2;
    $y = ($image_height/2) - ($text_height/2);

    imagettftext($im, $font_size, $angle, $x, $y, $text_color, $font, $text);

    // imagepng($im);
    imagepng($im, NULL, -1);
    imagedestroy($im);
}

function make_png($status, $name, $isMin, $txt){
    header("Content-Type: image/png");

    if($isMin){
        image_min_png($status, $txt);
    }else{
        image_png($status, $name);
    }

	flush();
}

function main($argv){
    if(!isset($argv)){ $argv = []; }

    // echo php_sapi_name();

    if(php_sapi_name() == "cli"){
        $status = NULL;
        $name = NULL;
        $txt = NULL;
        $isMin = False;

        for($i = 1; $i < count($argv); $i++){
            if($argv[$i] == "-min" || $argv[$i] == "--min"){
                $isMin = True;
            }else{
                $temp = explode("=", $argv[$i]);
                if(count($temp) != 2){ exit("Incorrect Format for CLI Argument"); }
                if($temp[0] == "--name" && !isset($name)){
                    $name = $temp[1];
                }elseif($temp[0] == "--status" && !isset($status)){
                    $status = $temp[1];
                }elseif($temp[0] == "--txt" && !isset($txt)){
                    $txt = $temp[1];
                }
            }
        }

        if(!isset($status)){
            $status = getStatus();
        }

        make_png($status, $name, $isMin, $txt);
    }else{
        $status = getStatus();
        $name = NULL;
        $txt = NULL;
        $isMin = isset($_GET['min']);

        if(isset($_GET['txt'])){ $txt = $_GET['txt']; }
        if(isset($_GET['name'])){ $name = $_GET['name']; }

        make_png($status, $name, $isMin, $txt);
    }
}

if(!isset($argv)){
    main([]);
}else{
    main($argv);
}


?>
