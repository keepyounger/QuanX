var header = $request.header;
if (header["User-Agent"].indexOf("Paste") > -1) {
    $done({body:""});
} else {
    $done({});
}
