/*
Last Modified time: 2021-10-8
腾讯视频
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
============Quantumultx===============
[task_local]
#腾讯视频
30 23 * * * tvideo.js, tag=腾讯视频, img-url=https://raw.githubusercontent.com/keepyounger/QuanX/main/Tasks/tvideo.png, enabled=true

================Loon==============
[Script]
cron "30 23 * * *" script-path=tvideo.js,tag=腾讯视频

===============Surge=================
腾讯视频 = type=cron,cronexp="30 23 * * *",wake-system=1,timeout=3600,script-path=tvideo.js

============小火箭=========
腾讯视频 = type=cron,script-path=tvideo.js, cronexpr="30 23 * * *", timeout=3600, enable=true
 */

const $ = new Env("腾讯视频");

var _cookie = "pgv_pvid=8456411088; pac_uid=0_35ec3afa0dff1; RK=rXAoOmF/T8; ptcz=216b9e5fd6bd0f6cdbeb4c843a1b0c6a68f7644d908a571414465710a2c170c4; _ga=GA1.2.1640746519.1622449886; tvfe_boss_uuid=623a359793788bbb; video_guid=75e4dd5060adf8d4; video_platform=2; sd_userid=7091624877004830; sd_cookie_crttime=1624877004830; OUTFOX_SEARCH_USER_ID_NCOO=254054208.5993758; eas_sid=21C6b2B9B2x8m2G36636B138B6; pgv_info=ssid=s5599680304; main_login=qq; vqq_access_token=CEAA29C7038C66B7D3E3A0CE9581717F; vqq_appid=101483052; vqq_openid=34981A2F675AF936A40E35FD43112581; vqq_vuserid=174859465; vqq_vusession=jx36eZ7978rq5J0v9Dtzvg..; vqq_refresh_token=2B29C5829660344054287D4F2A76C9F8; vqq_next_refresh_time=6600; vqq_login_time_init=1637223616; login_time_init=2021-11-18 16:20:16"
var headers = {}
var headers2 = {}

!(async () => {
    headers = {"Referer": "https://v.qq.com",
                   "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.204 Safari/537.36",
                   "Cookie": _cookie}
    await sign();
    
})().catch((e) => $.msg(e + ""))
    .finally(() => {
        $.notify($.name, $.logs.join('\n'));
        $.done()
    });
    
async function sign() {
    var cookie = await login();
    if (!cookie) {
        $.msg("cookie无效");
        return;
    }
    
    var cookies = cookie.split(";");
    var vqq_vusession = "";
    for (var i = 0; i < cookies.length; i++) {
        var item = cookies[i];
        if (item.indexOf("vqq_vusession") != -1 ) {
            vqq_vusession = item.split("=")[item.split("=").length-1];
        }
    }
        
    var sign_cookie = "";
    cookies = _cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var item = cookies[i];
        if (item.indexOf("vqq_vusession") == -1 ) {
            sign_cookie = sign_cookie + item + ";";
        }
    }
    
    sign_cookie = sign_cookie + "vqq_vusession=" + vqq_vusession + ";";
    headers2 = {
        "Cookie": sign_cookie,
        "Referer": "https://m.v.qq.com",
        };
    await sign1();
    await $.wait(3000);
    await otherSign(1);
    await $.wait(3000);
    await otherSign(7);
    await $.wait(3000);
    await otherSign(6);
    await $.wait(3000);
    await otherSign(3);
    await $.wait(3000);
    await sign2();
}

async function sign1() {
    var url = "https://vip.video.qq.com/fcgi-bin/comm_cgi?name=hierarchical_task_system&cmd=2&_=" + parseInt(Math.random() * 1000);
    await $.http.get({
        url: url,
        headers: headers2
    }).then((res) => {
        var data = res.body;
        var json = JSON.parse(data.match(/^QZOutputJson\=\((.*)\);$/)[1]);
        if (json.ret == 0) {
            if (json.checkin_score == 0) {
                $.msg("签到结果：重复签到");
            } else {
                $.msg("签到分数" + json.checkin_score);
            }
        } else {
            $.msg("签到结果：" + json.msg);
        }
    });
}

async function sign2() {
    let url = "https://v.qq.com/x/bu/mobile_checkin?hidetitlebar=1&hidestatusbar=0&iOSUseWKWebView=1&ovscroll=0"
    await $.http.get({
        url: url,
        headers: headers2
    }).then((res) => {
        var data = res.body;
        $.msg(data);
    });
}

async function otherSign(type) {
    var url = {
        1:"https://vip.video.qq.com/fcgi-bin/comm_cgi?name=spp_MissionFaHuo&cmd=4&task_id=1",
        7:"https://vip.video.qq.com/fcgi-bin/comm_cgi?name=spp_MissionFaHuo&cmd=4&task_id=7",
        6:"https://vip.video.qq.com/fcgi-bin/comm_cgi?name=spp_MissionFaHuo&cmd=4&task_id=6",
        3:"https://vip.video.qq.com/fcgi-bin/comm_cgi?name=spp_MissionFaHuo&cmd=4&task_id=3"
        }[type]
    var types = {1:"观看60分钟", 7: "下载", 6: "赠送", 3: "弹幕"}[type]

    await $.http.get({
        url: url,
        headers: headers2
    }).then((res) => {
        var data = res.body;
        var json = JSON.parse(data.match(/^QZOutputJson\=\((.*)\);$/)[1]);
        if (json.ret == 0) {
            $.msg(types + "：" + json.score);
        } else {
            $.msg(types + "：" + json.msg);
        }
    });
}

async function login() {
    var cookie = null;
    var url = "https://access.video.qq.com/user/auth_refresh?vappid=11059694&vsecret=fdf61a6be0aad57132bc5cdf78ac30145b6cd2c1470b0cfe&type=qq&g_tk=&g_vstk=1834945498&g_actk=1877842683&callback=jQuery19107624304897504095_1637223616527&_=1637223616528"
    await $.http.get({
        url: url,
        headers: headers
    }).then((res) => {
        var body = $.parse(res).body;
        if (body.indexOf("nick") != -1) {
            $.msg("验证成功，执行主程序")
            var headers = $.parse(res).headers;
            cookie = headers["Set-Cookie"] || headers["set-cookie"].join();
        } else {
            $.msg("验证ref_url失败" + body)
        }
    });
    return cookie;
}

// prettier-ignore
/*********************************** API *************************************/
function Env(e="untitled"){const t="undefined"!=typeof $task,s="undefined"!=typeof $loon,i="undefined"!=typeof $httpClient&&!s,r="function"==typeof require&&"undefined"!=typeof $ui,n="function"==typeof require&&!r;function o(){const e={};return["GET","POST","PUT","DELETE","HEAD","OPTIONS","PATCH"].forEach(o=>e[o.toLowerCase()]=(e=>(function(e,o){if((o="string"==typeof o?{url:o}:o).body&&o.headers&&(o.headers["Content-Type"]||(o.headers["Content-Type"]="application/x-www-form-urlencoded"),"object"==typeof(p=o.body)||p instanceof Object)){var a=o.headers["Content-Type"];"application/x-www-form-urlencoded"==a?o.body=function(e){var t="";for(var s in e)t+=s+"="+e[s]+"&";return t}(p):"application/json"==a&&(o.body=JSON.stringify(p))}const h=o.timeout,c={onRequest:()=>{},onResponse:e=>e,onTimeout:()=>{},...o.events};let f,u;if(c.onRequest(e,o),t)f=$task.fetch({method:e,...o});else if(s||i||n)f=new Promise((t,s)=>{(n?require("request"):$httpClient)[e.toLowerCase()](o,(e,i,r)=>{e?s(e):t({statusCode:i.status||i.statusCode,headers:i.headers,body:r})})});else if(r){var l=o.url,d=o.headers,p=o.body;f=new Promise((t,s)=>{$http.request({method:e,url:l,header:d,body:p,handler:function(e){e.error?s(e.error):t({statusCode:e.response.statusCode,headers:e.response.headers,body:e.data})}})})}else if(n){const t=new Request(o.url);t.method=e,t.headers=o.headers,t.body=o.body,f=new Promise((e,s)=>{t.loadString().then(s=>{e({statusCode:t.response.statusCode,headers:t.response.headers,body:s})}).catch(e=>s(e))})}const y=h?new Promise((t,s)=>{u=setTimeout(()=>(c.onTimeout(),s(`${e} URL: ${o.url} exceeds the timeout ${h} ms`)),h)}):null;return(y?Promise.race([y,f]).then(e=>(clearTimeout(u),e)):f).then(e=>c.onResponse(e))})(o,e))),e}return new class{constructor(e){this.name=e,this.logs=[],this.http=o(),this.node=(()=>{if(n){return{fs:require("fs")}}return null})(),this.initCache();Promise.prototype.delay=function(e){return this.then(function(t){return((e,t)=>new Promise(function(s){setTimeout(s.bind(null,t),e)}))(e,t)})}}initCache(){if(t&&(this.cache=JSON.parse($prefs.valueForKey(this.name)||"{}")),(s||i)&&(this.cache=JSON.parse($persistentStore.read(this.name)||"{}")),r&&(this.cache=JSON.parse($cache.get(this.name)||"{}")),n){let e="root.json";this.node.fs.existsSync(e)||this.node.fs.writeFileSync(e,JSON.stringify({}),{flag:"wx"},e=>console.log(e)),this.root={},e=`${this.name}.json`,this.node.fs.existsSync(e)?this.cache=JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)):(this.node.fs.writeFileSync(e,JSON.stringify({}),{flag:"wx"},e=>console.log(e)),this.cache={})}}persistCache(){const e=JSON.stringify(this.cache,null,2);t&&$prefs.setValueForKey(e,this.name),(s||i)&&$persistentStore.write(e,this.name),r&&$cache.set(this.name,e),n&&(this.node.fs.writeFileSync(`${this.name}.json`,e,{flag:"w"},e=>console.log(e)),this.node.fs.writeFileSync("root.json",JSON.stringify(this.root,null,2),{flag:"w"},e=>console.log(e)))}write(e,o){if(this.log(`SET ${o}`),-1!==o.indexOf("#")){if(o=o.substr(1),i||s)return $persistentStore.write(e,o);if(t)return $prefs.setValueForKey(e,o);n&&(this.root[o]=e),r&&$cache.set(o,e)}else this.cache[o]=e;this.persistCache()}read(e){return this.log(`READ ${e}`),-1===e.indexOf("#")?this.cache[e]:(e=e.substr(1),i||s?$persistentStore.read(e):t?$prefs.valueForKey(e):n?this.root[e]:r?$cache.get(e):void 0)}delete(e){if(this.log(`DELETE ${e}`),-1!==e.indexOf("#")){if(e=e.substr(1),i||s)return $persistentStore.write(null,e);if(t)return $prefs.removeValueForKey(e);n&&delete this.root[e],r&&$cache.remove(e)}else delete this.cache[e];this.persistCache()}notify(e,o="",a={}){const h=a["open-url"],c=a["media-url"];if(t&&$notify(e,"",o,a),i&&$notification.post(e,"",o+`${c?"\n多媒体:"+c:""}`,{url:h}),s){let t={};h&&(t.openUrl=h),c&&(t.mediaUrl=c),"{}"===JSON.stringify(t)?$notification.post(e,"",o):$notification.post(e,"",o,t)}if(r&&$push.schedule({title:e,body:o}),n){require("./sendNotify").sendNotify(e,o)}}msg(...e){e.length>0&&(this.logs=[...this.logs,...e]),this.log(e)}log(e){console.log(`[${this.name}] LOG: ${this.stringify(e)}`)}info(e){console.log(`[${this.name}] INFO: ${this.stringify(e)}`)}error(e){console.log(`[${this.name}] ERROR: ${this.stringify(e)}`)}timeout(e){var t=e;return e||(t=parseInt(8e3*Math.random()))<5e3&&(t=5e3),$.msg("延迟"+t+"ms"),t}wait(e){return new Promise(t=>setTimeout(t,this.timeout(e)))}done(e={}){(t||s||i)&&$done(e)}parse(e){if("string"==typeof e||e instanceof String)try{return JSON.parse(e)}catch(t){this.msg("parse error:"+e)}else try{return JSON.parse(JSON.stringify(e))}catch(t){this.msg("parse error:"+e)}}stringify(e){if("string"==typeof e||e instanceof String)return e;try{return JSON.stringify(e)}catch(t){this.msg("stringify error:"+e)}}}(e)}
/*****************************************************************************/
