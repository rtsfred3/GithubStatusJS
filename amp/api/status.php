<?php
    header("AMP-Same-Origin: true");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Origin: https://do-githubstat-us.cdn.ampproject.org");
    header("Access-Control-Allow-Source-Origin: https://do.githubstat.us/");
    header("Cache-Control: no-cache, must-revalidate");

    header("content-type: application/json; charset=utf-8");

    $file_status = "status.json";
    $current_time = time();
    $max_age = 30;

    if(file_exists($file_status)){
        $age = $current_time - filemtime($file_status);
        header("age: " . $age);
        header("x-cache: HIT");

        $json = file_get_contents($file_status);
        echo json_decode($json);
    }else{
        header("age: 0");
        header("x-cache: MISS");

        $json = file_get_contents("https://www.githubstatus.com/api/v2/status.json");
        $json_data = json_encode($json);
        file_put_contents($file_status, $json_data);
        echo $json;
    }

?>
