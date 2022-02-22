/*
Last Modified time: 2021-9-22
心悦俱乐部月卡领取
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
============Quantumultx===============
[task_local]
#心悦俱乐部月卡领取
15 8 * * * xinyueyueka.js, tag=心悦俱乐部月卡领取, img-url=https://raw.githubusercontent.com/keepyounger/QuanX/main/Tasks/xinyue.png, enabled=true

================Loon==============
[Script]
cron "15 8 * * *" script-path=xinyueyueka.js,tag=心悦俱乐部月卡领取

===============Surge=================
心悦俱乐部月卡领取 = type=cron,cronexp="15 8 * * *",wake-system=1,timeout=3600,script-path=xinyueyueka.js

============小火箭=========
心悦俱乐部月卡领取 = type=cron,script-path=xinyueyueka.js, cronexpr="15 8 * * *", timeout=3600, enable=true
 */

const $ = new Env("心悦俱乐部月卡领取");

!(async () => {
    await chekin();
    await yueka();
})().catch((e) => $.msg(e + ""))
    .finally(() => {
        $.notify($.name, $.logs.join('\n'));
        $.done()
    });

var Cookie2 = "access_token=07C5B5D2B2308065FEFFE002CB67CD27; acctype=qc; appid=101484782; openid=7720CF4D27C3814FFAEC4C7292347609; refresh_token=; ams_qqopenid_101484782=7720CF4D27C3814FFAEC4C7292347609%7C992282588%7C33e12d720ff722ab7f08e0e5210219de; xyapp_login_type=qc; app_device_id=XYNO-E741E3C74CC040905D87CF03F4C23DA2; app_sessionid_app=d5c9c5926192147e1244fee590d26def; app_via=open; eas_sid=y1T614r545g054X603T6X4h0Y1; pgv_info=ssid=s6043324885; pgv_pvid=1211201646; xinyueqqcomrouteLine=a20180912tgclubcat"
async function chekin() {
    await $.http.post({
        url: "https://act.game.qq.com/ams/ame/amesvr?ameVersion=0.3&sServiceType=tgclub&iActivityId=141920&sServiceDepartment=xinyue&sSDID=ceb8ee081f8c6aa533d70b8887367d03&sMiloTag=AMS-MILO-141920-497774-7720CF4D27C3814FFAEC4C7292347609-1637225082509-25JLO0&_=1637225082509",
        headers: {
            "Host": "act.game.qq.com",
            "Accept": "*/*",
            "X-Proxyman-Repeated-ID": "B02F54B7",
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "Origin": "https://xinyue.qq.com",
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 tgclub/5.8.4.79(Scale/3.00 Channel/AppStore)",
            "Connection": "close",
            "Referer": "https://xinyue.qq.com/",
            "Cookie": "access_token=07C5B5D2B2308065FEFFE002CB67CD27; acctype=qc; appid=101484782; openid=7720CF4D27C3814FFAEC4C7292347609; refresh_token=; xyapp_login_type=qc; pgv_info=ssid=s1400322075; pgv_pvid=1211201646; tokenParams=%3FADTAG%3Dad_app.gf.chanchu; xinyueqqcomrouteLine=a20171031lclk_a20180912tgclubcat_a20171031lclk_a20180912tgclubcat_a20180912tgclubcat; ieg_ams_session_token=; ieg_ams_token=; ieg_ams_token_time=; ams_qqopenid_101484782=7720CF4D27C3814FFAEC4C7292347609%7C992282588%7C33e12d720ff722ab7f08e0e5210219de; _qz_referrer=qzs.qq.com; eas_sid=X1P6S3m762q2k3h9q7I1i1t1F3"
        },
        body: {
            "extraStr": "%252522mod1%252522%25253A%2525221%252522%25252C%252522mod2%252522%25253A%2525220%252522%25252C%252522mod3%252522%25253A%252522x42%252522",
            "iActivityId": "141920",
            "iFlowId": "497774",
            "g_tk": "1842395457",
            "e_code": "0",
            "g_code": "0",
            "eas_url": "http%3A%2F%2Fxinyue.qq.com%2Fact%2Fa20180912tgclubcat%2F",
            "eas_refer": "http%3A%2F%2Fnoreferrer%2F%3Freqid%3D923de8f2-316c-410a-89d3-40ebbf55baff%26version%3D24",
            "sServiceDepartment": "xinyue",
            "sServiceType": "tgclub"
      }
    }).then((res) => {
        var data = $.parse(res.body);
        if (data.ret == 0) {
            $.msg("签到结果:" + "签到完成");
        } else {
            $.msg("签到结果:" + data.msg);
        }
    });
}


async function yueka() {
    await $.http.post({
        url: "https://comm.ams.game.qq.com/ams/ame/amesvr?ameVersion=0.3&sServiceType=tgclub&iActivityId=126962&sServiceDepartment=xinyue&sSDID=5986d5dd84ba8854aaa7b8c1f8be1b23&sMiloTag=AMS-MILO-126962-507443-7720CF4D27C3814FFAEC4C7292347609-1631501316930-BSikZh&_=1631501316931",
        headers: {
            "Host": "comm.ams.game.qq.com",
            "Cookie": Cookie2,
            "Accept": "*/*",
            "Content-Type": "application/x-www-form-urlencoded",
            "Origin": "https://xinyue.qq.com",
            "Accept-Language": "zh-cn",
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 tgclub/5.7.14 Scale/3.00",
            "Referer": "https://xinyue.qq.com/act/app/xyjf/a20171031lclk/index1.shtml?ADTAG=ad_app.gf.chanchu"
        },
        body: {
            "gameId": "",
            "sArea": "",
            "iSex": "",
            "sRoleId": "",
            "iGender": "",
            "plat": "2",
            "extraStr": "%2522mod1%2522%253A%25221%2522%252C%2522mod2%2522%253A%25220%2522%252C%2522mod3%2522%253A%2522x27%2522",
            "sServiceType": "tgclub",
            "objCustomMsg": "",
            "areaname": "",
            "roleid": "",
            "rolelevel": "",
            "rolename": "",
            "areaid": "",
            "iActivityId": "126962",
            "iFlowId": "507443",
            "g_tk": "1842395457",
            "e_code": "0",
            "g_code": "0",
            "eas_url": "http://xinyue.qq.com/act/app/xyjf/a20171031lclk/index1.shtml",
            "eas_refer": "http://noreferrer/?reqid=684e6831-b790-4c08-821f-058da9330a24&version=24",
            "sServiceDepartment": "xinyue"
        }
    }).then((res) => {
        var data =$.parse(res.body);
        if (data.ret == 0) {
            $.msg("月卡1结果" + data.modRet.sMsg);
        } else {
            $.msg("月卡1结果" + data.msg);
        }
    });

    await $.http.post({
        url: "https://comm.ams.game.qq.com/ams/ame/amesvr?ameVersion=0.3&sServiceType=tgclub&iActivityId=126962&sServiceDepartment=xinyue&sSDID=5986d5dd84ba8854aaa7b8c1f8be1b23&sMiloTag=AMS-MILO-126962-507444-7720CF4D27C3814FFAEC4C7292347609-1631501536730-Qro3X6&_=1631501536730",
        headers: {
            "Host": "comm.ams.game.qq.com",
            "Cookie": Cookie2,
            "Accept": "*/*",
            "Content-Type": "application/x-www-form-urlencoded",
            "Origin": "https://xinyue.qq.com",
            "Accept-Language": "zh-cn",
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 tgclub/5.7.14 Scale/3.00",
            "Referer": "https://xinyue.qq.com/act/app/xyjf/a20171031lclk/index1.shtml?ADTAG=ad_app.gf.chanchu"
        },
        body: {
            "gameId": "",
            "sArea": "",
            "iSex": "",
            "sRoleId": "",
            "iGender": "",
            "plat": "2",
            "extraStr": "%2522mod1%2522%253A%25221%2522%252C%2522mod2%2522%253A%25220%2522%252C%2522mod3%2522%253A%2522x27%2522",
            "sServiceType": "tgclub",
            "objCustomMsg": "",
            "areaname": "",
            "roleid": "",
            "rolelevel": "",
            "rolename": "",
            "areaid": "",
            "iActivityId": "126962",
            "iFlowId": "507444",
            "g_tk": "1842395457",
            "e_code": "0",
            "g_code": "0",
            "eas_url": "http://xinyue.qq.com/act/app/xyjf/a20171031lclk/index1.shtml",
            "eas_refer": "http://noreferrer/?reqid=23b8b961-fb2e-477a-94c4-8406ca448d72&version=24",
            "sServiceDepartment": "xinyue"
        }
    }).then((res) => {
        var data = $.parse(res.body);
        if (data.ret == 0) {
            $.msg("月卡2结果" + data.modRet.sMsg);
        } else {
            $.msg("月卡2结果" + data.msg);
        }
    });
}


// prettier-ignore
/*********************************** API *************************************/
function Env(e="untitled"){const t="undefined"!=typeof $task,s="undefined"!=typeof $loon,i="undefined"!=typeof $httpClient&&!s,r="function"==typeof require&&"undefined"!=typeof $ui,n="function"==typeof require&&!r;function o(){const e={};return["GET","POST","PUT","DELETE","HEAD","OPTIONS","PATCH"].forEach(o=>e[o.toLowerCase()]=(e=>(function(e,o){if((o="string"==typeof o?{url:o}:o).body&&o.headers&&(o.headers["Content-Type"]||(o.headers["Content-Type"]="application/x-www-form-urlencoded"),"object"==typeof(p=o.body)||p instanceof Object)){var a=o.headers["Content-Type"];"application/x-www-form-urlencoded"==a?o.body=function(e){var t="";for(var s in e)t+=s+"="+e[s]+"&";return t}(p):"application/json"==a&&(o.body=JSON.stringify(p))}const h=o.timeout,c={onRequest:()=>{},onResponse:e=>e,onTimeout:()=>{},...o.events};let f,l;if(c.onRequest(e,o),t)f=$task.fetch({method:e,...o});else if(s||i||n)f=new Promise((t,s)=>{(n?require("request"):$httpClient)[e.toLowerCase()](o,(e,i,r)=>{e?s(e):t({statusCode:i.status||i.statusCode,headers:i.headers,body:r})})});else if(r){var u=o.url,d=o.headers,p=o.body;f=new Promise((t,s)=>{$http.request({method:e,url:u,header:d,body:p,handler:function(e){e.error?s(e.error):t({statusCode:e.response.statusCode,headers:e.response.headers,body:e.data})}})})}else if(n){const t=new Request(o.url);t.method=e,t.headers=o.headers,t.body=o.body,f=new Promise((e,s)=>{t.loadString().then(s=>{e({statusCode:t.response.statusCode,headers:t.response.headers,body:s})}).catch(e=>s(e))})}const y=h?new Promise((t,s)=>{l=setTimeout(()=>(c.onTimeout(),s(`${e} URL: ${o.url} exceeds the timeout ${h} ms`)),h)}):null;return(y?Promise.race([y,f]).then(e=>(clearTimeout(l),e)):f).then(e=>c.onResponse(e))})(o,e))),e}return new class{constructor(e){this.name=e,this.logs=[],this.http=o(),this.node=(()=>{if(n){return{fs:require("fs")}}return null})(),this.initCache();Promise.prototype.delay=function(e){return this.then(function(t){return((e,t)=>new Promise(function(s){setTimeout(s.bind(null,t),e)}))(e,t)})}}initCache(){if(t&&(this.cache=JSON.parse($prefs.valueForKey(this.name)||"{}")),(s||i)&&(this.cache=JSON.parse($persistentStore.read(this.name)||"{}")),r&&(this.cache=JSON.parse($cache.get(this.name)||"{}")),n){let e="root.json";this.node.fs.existsSync(e)||this.node.fs.writeFileSync(e,JSON.stringify({}),{flag:"wx"},e=>console.log(e)),this.root={},e=`${this.name}.json`,this.node.fs.existsSync(e)?this.cache=JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)):(this.node.fs.writeFileSync(e,JSON.stringify({}),{flag:"wx"},e=>console.log(e)),this.cache={})}}persistCache(){const e=JSON.stringify(this.cache,null,2);t&&$prefs.setValueForKey(e,this.name),(s||i)&&$persistentStore.write(e,this.name),r&&$cache.set(this.name,e),n&&(this.node.fs.writeFileSync(`${this.name}.json`,e,{flag:"w"},e=>console.log(e)),this.node.fs.writeFileSync("root.json",JSON.stringify(this.root,null,2),{flag:"w"},e=>console.log(e)))}write(e,o){if(this.log(`SET ${o}`),-1!==o.indexOf("#")){if(o=o.substr(1),i||s)return $persistentStore.write(e,o);if(t)return $prefs.setValueForKey(e,o);n&&(this.root[o]=e),r&&$cache.set(o,e)}else this.cache[o]=e;this.persistCache()}read(e){return this.log(`READ ${e}`),-1===e.indexOf("#")?this.cache[e]:(e=e.substr(1),i||s?$persistentStore.read(e):t?$prefs.valueForKey(e):n?this.root[e]:r?$cache.get(e):void 0)}delete(e){if(this.log(`DELETE ${e}`),-1!==e.indexOf("#")){if(e=e.substr(1),i||s)return $persistentStore.write(null,e);if(t)return $prefs.removeValueForKey(e);n&&delete this.root[e],r&&$cache.remove(e)}else delete this.cache[e];this.persistCache()}notify(e,o="",a={}){const h=a["open-url"],c=a["media-url"];if(t&&$notify(e,"",o,a),i&&$notification.post(e,"",o+`${c?"\n多媒体:"+c:""}`,{url:h}),s){let t={};h&&(t.openUrl=h),c&&(t.mediaUrl=c),"{}"===JSON.stringify(t)?$notification.post(e,"",o):$notification.post(e,"",o,t)}if(r&&$push.schedule({title:e,body:o}),n){require("./sendNotify").sendNotify(e,o)}}msg(...e){e.length>0&&(this.logs=[...this.logs,...e]),this.log(e)}log(e){console.log(`[${this.name}] LOG: ${this.stringify(e)}`)}info(e){console.log(`[${this.name}] INFO: ${this.stringify(e)}`)}error(e){console.log(`[${this.name}] ERROR: ${this.stringify(e)}`)}wait(e){return new Promise(t=>setTimeout(t,e))}done(e={}){(t||s||i)&&$done(e)}parse(e){if("string"==typeof e||e instanceof String)try{return JSON.parse(e)}catch(t){this.msg("parse error:"+e)}else try{return JSON.parse(JSON.stringify(e))}catch(t){this.msg("parse error:"+e)}}stringify(e){if("string"==typeof e||e instanceof String)return e;try{return JSON.stringify(e)}catch(t){this.msg("stringify error:"+e)}}}(e)}
/*****************************************************************************/
