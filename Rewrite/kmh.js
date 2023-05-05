var body = $response.body;
body = body.replace(/"price":\d+/g,"\"price\":0");
body = body.replace(/"download_price":\d+/g,"\"download_price\":0");
body = body.replace(/"isbuy":\d+/g,"\"isbuy\":0");
body = body.replace(/"level_detail":\d+/g,"\"level_detail\":2945569034000");
$done({body:body});
