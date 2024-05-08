var modifiedStatus = 'HTTP/1.1 200 OK';
var body = {
    "msg" : "ok",
    "data" : {
        "trial_status" : 1,
        "alias" : "MacBook Pro",
        "device_id" : "aeawlzvg6eaabd4e",
        "last_binded_at" : 1710413039,
        "trial_end_at" : 1742486399
    },
    "code" : 0
}
$done({status: modifiedStatus, body: JSON.stringify(body)});