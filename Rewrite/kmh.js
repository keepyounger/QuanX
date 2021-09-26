var body = $response.body;
body = body.replace(/"price":\d+/g,"\"price\":0");
$done({body:body});