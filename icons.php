<?php
    header("Content-Type: image/png");

    if(empty($_GET['status'])){
        $json = file_get_contents("https://www.githubstatus.com/api/v2/status.json");
        $json_data = json_decode($json);
        $status = $json_data->status->indicator;
    }else{
        $status = $_GET['status'];
    }

    function image($status){
        $image_width  = 1200;
        $image_height = 630;

        $im = @imagecreate($image_width, $image_height) or die("Cannot Initialize new GD image stream");

        // echo $json_data->status->indicator;

        if($status == "none") {
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

        $status = "GitHub Status";

        // if($status == "none") { $status = "good"; }

        putenv('GDFONTPATH=' . realpath('.'));

        $font_size = 95;
        $angle = 0;
        $font = 'Verdana Bold';
        $text = $status;
        $name = $text . ".png";

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

    function image_min($status){
        $image_width  = 300;
        $image_height = 300;

        $im = @imagecreate($image_width, $image_height) or die("Cannot Initialize new GD image stream");

        // echo $json_data->status->indicator;

        if($status == "none") {
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

        $status = "GH";

        // if($status == "none") { $status = "good"; }

        putenv('GDFONTPATH=' . realpath('.'));

        $font_size = 95;
        $angle = 0;
        $font = 'Verdana Bold';
        $text = $status;
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

    if(isset($_GET['min']) || (count($argv) >= 2 && ($argv[1] == "min" || $argv[1] == "--min"))) {
        image_min($status);
    }else{
        image($status);
    }

    ob_flush();
	flush();
?>
