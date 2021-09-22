/*
Last Modified time: 2021-9-22
心悦嘉年华
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
============Quantumultx===============
[task_local]
#心悦嘉年华
20 8 * * * xinyuejnh.js, tag=心悦嘉年华, img-url=https://raw.githubusercontent.com/keepyounger/QuanX/main/Tasks/xinyue.png, enabled=true

================Loon==============
[Script]
cron "20 8 * * *" script-path=xinyuejnh.js,tag=心悦嘉年华

===============Surge=================
心悦嘉年华 = type=cron,cronexp="20 8 * * *",wake-system=1,timeout=3600,script-path=xinyuejnh.js

============小火箭=========
心悦嘉年华 = type=cron,script-path=xinyuejnh.js, cronexpr="20 8 * * *", timeout=3600, enable=true
 */

const $ = Env("心悦嘉年华"); // API("APP") --> 无log输出

var times = 0;
var score = 0;

!(async () => {
    for (var i = 0; i < 2; i++) {
        await $.wait(3500).then(async() => {
            await jianianhua();
        });
    }
})().catch((e) => $.msg(e + ""))
    .finally(() => {
        $.msg("本次运行" + times + "次，得分" + score);
        $.notify($.name, $.logs.join('\n'));
        $.done()
    });

async function jianianhua() {
    await $.http.post({
        url: "https://act.game.qq.com/ams/ame/amesvr?ameVersion=0.3&sServiceType=tgclub&iActivityId=155525&sServiceDepartment=xinyue&sSDID=2d96e8f3974563e50703956d42514c4e&sMiloTag=AMS-MILO-155525-603340-7720CF4D27C3814FFAEC4C7292347609-1626827527477-AX84cZ&_=1626827527479",
        headers: {"Accept": "*/*","Accept-Language": "zh-cn","Connection": "keep-alive","Content-Type": "application/x-www-form-urlencoded","Cookie": "access_token=1C98366958A03BDEBC893514169AAEAC; acctype=qc; appid=101484782; ieg_ams_session_token=; ieg_ams_token=; ieg_ams_token_time=; openid=7720CF4D27C3814FFAEC4C7292347609; refresh_token=; xyapp_login_type=qc; pgv_info=ssid=s4643183028; pgv_pvid=1211201646; tokenParams=%3FADTAG%3Dad_app.gf.chanchu; xinyueqqcomrouteLine=a20180912tgclubcat_a20171031lclk_a20171031lclk_a20180912tgclubcat_a20210625jnh_a20210625jnh_a20180912tgclubcat; eas_sid=7116x2b6W7m9b6e6c8K9p5x8A6","Host": "act.game.qq.com","Origin": "https://xinyue.qq.com","Referer": "https://xinyue.qq.com/act/a20180906gifts/index.html","User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 tgclub/5.7.13 Scale/3.00"},
        body: "gameId=&sArea=&iSex=&sRoleId=&iGender=&extraStr=%252522mod1%252522%25253A%2525221%252522%25252C%252522mod2%252522%25253A%2525224%252522%25252C%252522mod3%252522%25253A%252522x48%252522&sServiceType=tgclub&objCustomMsg=&areaname=&roleid=&rolelevel=&rolename=&areaid=&iActivityId=155525&iFlowId=603340&g_tk=1842395457&e_code=0&g_code=0&eas_url=http%3A%2F%2Fxinyue.qq.com%2Fact%2Fa20180906gifts%2F&eas_refer=http%3A%2F%2Fxinyue.qq.com%2Fact%2Fa20180906gifts%2Fshare.html%3Freqid%3D7403326a-a8a8-484d-9f11-33480da59dd4%26version%3D24&sServiceDepartment=xinyue"
    }).then((res) => {
        var data = $.parse(res.body);
        if (data.ret == 0) {
            times ++;
            $.log("本次得分" + data.modRet.sPackageName);
            score += (parseInt(data.modRet.sPackageName) || 0);
        }
    });
}

// prettier-ignore
/*********************************** API *************************************/
function Env(e="untitled"){const t="undefined"!=typeof $task,s="undefined"!=typeof $loon,i="undefined"!=typeof $httpClient&&!s,r="function"==typeof require&&"undefined"!=typeof $ui,n="function"==typeof require&&!r;function o(){const e={};return["GET","POST","PUT","DELETE","HEAD","OPTIONS","PATCH"].forEach(o=>e[o.toLowerCase()]=(e=>(function(e,o){if((o="string"==typeof o?{url:o}:o).body&&o.headers&&(o.headers["Content-Type"]||(o.headers["Content-Type"]="application/x-www-form-urlencoded"),"object"==typeof(p=o.body)||p instanceof Object)){var a=o.headers["Content-Type"];"application/x-www-form-urlencoded"==a?o.body=function(e){var t="";for(var s in e)t+=s+"="+e[s]+"&";return t}(p):"application/json"==a&&(o.body=JSON.stringify(p))}const h=o.timeout,c={onRequest:()=>{},onResponse:e=>e,onTimeout:()=>{},...o.events};let f,l;if(c.onRequest(e,o),t)f=$task.fetch({method:e,...o});else if(s||i||n)f=new Promise((t,s)=>{(n?require("request"):$httpClient)[e.toLowerCase()](o,(e,i,r)=>{e?s(e):t({statusCode:i.status||i.statusCode,headers:i.headers,body:r})})});else if(r){var u=o.url,d=o.headers,p=o.body;f=new Promise((t,s)=>{$http.request({method:e,url:u,header:d,body:p,handler:function(e){e.error?s(e.error):t({statusCode:e.response.statusCode,headers:e.response.headers,body:e.data})}})})}else if(n){const t=new Request(o.url);t.method=e,t.headers=o.headers,t.body=o.body,f=new Promise((e,s)=>{t.loadString().then(s=>{e({statusCode:t.response.statusCode,headers:t.response.headers,body:s})}).catch(e=>s(e))})}const y=h?new Promise((t,s)=>{l=setTimeout(()=>(c.onTimeout(),s(`${e} URL: ${o.url} exceeds the timeout ${h} ms`)),h)}):null;return(y?Promise.race([y,f]).then(e=>(clearTimeout(l),e)):f).then(e=>c.onResponse(e))})(o,e))),e}return new class{constructor(e){this.name=e,this.logs=[],this.http=o(),this.node=(()=>{if(n){return{fs:require("fs")}}return null})(),this.initCache();Promise.prototype.delay=function(e){return this.then(function(t){return((e,t)=>new Promise(function(s){setTimeout(s.bind(null,t),e)}))(e,t)})}}initCache(){if(t&&(this.cache=JSON.parse($prefs.valueForKey(this.name)||"{}")),(s||i)&&(this.cache=JSON.parse($persistentStore.read(this.name)||"{}")),r&&(this.cache=JSON.parse($cache.get(this.name)||"{}")),n){let e="root.json";this.node.fs.existsSync(e)||this.node.fs.writeFileSync(e,JSON.stringify({}),{flag:"wx"},e=>console.log(e)),this.root={},e=`${this.name}.json`,this.node.fs.existsSync(e)?this.cache=JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)):(this.node.fs.writeFileSync(e,JSON.stringify({}),{flag:"wx"},e=>console.log(e)),this.cache={})}}persistCache(){const e=JSON.stringify(this.cache,null,2);t&&$prefs.setValueForKey(e,this.name),(s||i)&&$persistentStore.write(e,this.name),r&&$cache.set(this.name,e),n&&(this.node.fs.writeFileSync(`${this.name}.json`,e,{flag:"w"},e=>console.log(e)),this.node.fs.writeFileSync("root.json",JSON.stringify(this.root,null,2),{flag:"w"},e=>console.log(e)))}write(e,o){if(this.log(`SET ${o}`),-1!==o.indexOf("#")){if(o=o.substr(1),i||s)return $persistentStore.write(e,o);if(t)return $prefs.setValueForKey(e,o);n&&(this.root[o]=e),r&&$cache.set(o,e)}else this.cache[o]=e;this.persistCache()}read(e){return this.log(`READ ${e}`),-1===e.indexOf("#")?this.cache[e]:(e=e.substr(1),i||s?$persistentStore.read(e):t?$prefs.valueForKey(e):n?this.root[e]:r?$cache.get(e):void 0)}delete(e){if(this.log(`DELETE ${e}`),-1!==e.indexOf("#")){if(e=e.substr(1),i||s)return $persistentStore.write(null,e);if(t)return $prefs.removeValueForKey(e);n&&delete this.root[e],r&&$cache.remove(e)}else delete this.cache[e];this.persistCache()}notify(e,o="",a={}){const h=a["open-url"],c=a["media-url"];if(t&&$notify(e,"",o,a),i&&$notification.post(e,"",o+`${c?"\n多媒体:"+c:""}`,{url:h}),s){let t={};h&&(t.openUrl=h),c&&(t.mediaUrl=c),"{}"===JSON.stringify(t)?$notification.post(e,"",o):$notification.post(e,"",o,t)}if(r&&$push.schedule({title:e,body:o}),n){require("./sendNotify").sendNotify(e,o)}}msg(...e){e.length>0&&(this.logs=[...this.logs,...e]),this.log(e)}log(e){console.log(`[${this.name}] LOG: ${this.stringify(e)}`)}info(e){console.log(`[${this.name}] INFO: ${this.stringify(e)}`)}error(e){console.log(`[${this.name}] ERROR: ${this.stringify(e)}`)}wait(e){return new Promise(t=>setTimeout(t,e))}done(e={}){(t||s||i)&&$done(e)}parse(e){if("string"==typeof e||e instanceof String)try{return JSON.parse(e)}catch(t){this.msg("parse error:"+e)}else try{return JSON.parse(JSON.stringify(e))}catch(t){this.msg("parse error:"+e)}}stringify(e){if("string"==typeof e||e instanceof String)return e;try{return JSON.stringify(e)}catch(t){this.msg("stringify error:"+e)}}}(e)}
/*****************************************************************************/
