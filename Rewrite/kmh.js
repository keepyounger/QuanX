var body = $response.body;
body = body.replace(/"price":\d+/g,"\"price\":0");
body = body.replace(/"download_price":\d+/g,"\"download_price\":0");
body = body.replace(/"isbuy":\d+/g,"\"isbuy\":0");
$done({body:body});
