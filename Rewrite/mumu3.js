var body = $response.body;
body = {
    "code": 0,
    "msg": "ok",
    "data": {
        "user_id": "1",
        "nickname": "xx",
        "member_expired_at": 1,
        "member_status": 1,
        "enabled_device_count": 1,
        "current_device_status": 1,
        "current_device": {
            "device_id": "1",
            "alias": "MacBook Pro",
            "last_binded_at": 1710413040,
            "trial_end_at": 1710950399,
            "trial_status": 1
        }
    }
}
$done({body:body});
