var modifiedStatus = 'HTTP/1.1 200 OK';
var body = {
    "code": 0,
    "msg": "ok",
    "data": {
        "user_id": "1",
        "nickname": "xx",
        "member_expired_at": 1742486399,
        "member_status": 1,
        "enabled_device_count": 1,
        "current_device_status": 1,
        "current_device": {
            "device_id": "aeawlzvg6eaabd4e",
            "alias": "MacBook Pro",
            "last_binded_at": 1710413039,
            "trial_end_at": 1742486399,
            "trial_status": 1
        },
        "token": "D15747D3-9465-53DD-8ACF-C015D9CF57F6"
    }
}
$done({status: modifiedStatus, body: JSON.stringify(body)});
