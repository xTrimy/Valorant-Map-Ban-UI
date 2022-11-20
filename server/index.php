<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS, post, get');
header("Access-Control-Max-Age", "3600");
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header("Access-Control-Allow-Credentials", "true");

if(!isset($_GET['log_id'])) {
    echo json_encode(array('error' => 'No log_id specified'));
    exit;
}

$log_id = $_GET['log_id'];

// scrape the log url from link https://www.mapban.gg/en/ban/log/{log_id}

$url = 'https://www.mapban.gg/en/ban/log/' . $log_id;

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.0');
curl_setopt($ch, CURLOPT_REFERER, 'https://www.mapban.gg/en/ban/log/' . $log_id);

$html = curl_exec($ch);
curl_close($ch);

// parse html

$dom = new DOMDocument();

@$dom->loadHTML($html);

$xpath = new DOMXPath($dom);

// id = logdata

$nodes = $xpath->query('//*[@id="logdata"]');

if($nodes->length == 0) {
    echo json_encode(array('error' => 'No logdata found'));
    exit;
}

$node = $nodes->item(0);
// print to array
$nodes = explode('!',$node->nodeValue);
// text example =  19. Nov.2022 17:54:57 UTC: Team 1 (test) bans Map "Breeze"
// text example 2 = 19. Nov.2022 19:04:40 UTC: Map "Pearl" will be decider!

// get map name and team name

$actions = [];
foreach($nodes as $node) {
    $map = explode('"', $node)[1];
    // if team name is in the text
    if(strpos($node, 'Team') !== false && strpos($node, 'bans') !== false) {
        $team = explode('(', $node)[1];
        $team = explode(')', $team)[0];
        $actions[] = array(
            'action'=>"ban",
            'map' => $map, 
            'team' => $team
        );
    }
    if(strpos($node, 'Team') !== false && strpos($node, 'picks') !== false) {
        $team = explode('(', $node)[1];
        $team = explode(')', $team)[0];
        $actions[] = array( 
            "action" => "pick",
            'map' => $map,
            'team' => $team
        );
    }
    if(strpos($node, 'decider') !== false) {
        $actions[] = array(
            "action" => "decider",
            'map' => $map
        );
    }
}

echo json_encode($actions);



