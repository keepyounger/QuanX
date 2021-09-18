/*
Last Modified time: 2021-9-18
心悦嘉年华
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
============Quantumultx===============
[task_local]
#心悦嘉年华
10 9 16-22 * * xinyueyueka.js, tag=心悦嘉年华, img-url=https://raw.githubusercontent.com/keepyounger/QuanX/main/Tasks/xinyue.png, enabled=true

================Loon==============
[Script]
cron "10 9 16-22 * *" script-path=xinyueyueka.js,tag=心悦嘉年华

===============Surge=================
心悦嘉年华 = type=cron,cronexp="10 9 16-22 * *",wake-system=1,timeout=3600,script-path=xinyueyueka.js

============小火箭=========
心悦嘉年华 = type=cron,script-path=xinyueyueka.js, cronexpr="10 9 16-22 * *", timeout=3600, enable=true

============青龙===========
cron: 10 9 16-22 * *
new Env('心悦嘉年华');
 */

const $ = API("心悦嘉年华", true); // API("APP") --> 无log输出

var times = 0;
var score = 0;

!(async () => {
    for (var i = 0; i < 369; i++) {
        await $.wait(3500).then(async() => {
            await jianianhua();
        });
    }
    $.msg("本次运行" + times + "次，得分" + score);
    await $.notify($.name, $.logs.join('\n'));
})().catch((e) => $.log(e + ""))
    .finally(() => $.done());

async function jianianhua() {
    await $.http.post({
        url: "https://act.game.qq.com/ams/ame/amesvr?ameVersion=0.3&sServiceType=tgclub&iActivityId=155525&sServiceDepartment=xinyue&sSDID=2d96e8f3974563e50703956d42514c4e&sMiloTag=AMS-MILO-155525-603340-7720CF4D27C3814FFAEC4C7292347609-1626827527477-AX84cZ&_=1626827527479",
        headers: {"Accept": "*/*","Accept-Language": "zh-cn","Connection": "keep-alive","Content-Type": "application/x-www-form-urlencoded","Cookie": "access_token=1C98366958A03BDEBC893514169AAEAC; acctype=qc; appid=101484782; ieg_ams_session_token=; ieg_ams_token=; ieg_ams_token_time=; openid=7720CF4D27C3814FFAEC4C7292347609; refresh_token=; xyapp_login_type=qc; pgv_info=ssid=s4643183028; pgv_pvid=1211201646; tokenParams=%3FADTAG%3Dad_app.gf.chanchu; xinyueqqcomrouteLine=a20180912tgclubcat_a20171031lclk_a20171031lclk_a20180912tgclubcat_a20210625jnh_a20210625jnh_a20180912tgclubcat; eas_sid=7116x2b6W7m9b6e6c8K9p5x8A6","Host": "act.game.qq.com","Origin": "https://xinyue.qq.com","Referer": "https://xinyue.qq.com/act/a20180906gifts/index.html","User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 tgclub/5.7.13 Scale/3.00"},
        body: "gameId=&sArea=&iSex=&sRoleId=&iGender=&extraStr=%252522mod1%252522%25253A%2525221%252522%25252C%252522mod2%252522%25253A%2525224%252522%25252C%252522mod3%252522%25253A%252522x48%252522&sServiceType=tgclub&objCustomMsg=&areaname=&roleid=&rolelevel=&rolename=&areaid=&iActivityId=155525&iFlowId=603340&g_tk=1842395457&e_code=0&g_code=0&eas_url=http%3A%2F%2Fxinyue.qq.com%2Fact%2Fa20180906gifts%2F&eas_refer=http%3A%2F%2Fxinyue.qq.com%2Fact%2Fa20180906gifts%2Fshare.html%3Freqid%3D7403326a-a8a8-484d-9f11-33480da59dd4%26version%3D24&sServiceDepartment=xinyue"
    }).then((res) => {
        times ++;
        var data = $.parse(res.body);
        if (data.ret == 0) {
            $.log("本次得分" + data.modRet.sPackageName);
            score += (parseInt(data.modRet.sPackageName) || 0);
        }
    });
}

// prettier-ignore
/*********************************** API *************************************/
function ENV(){const e="undefined"!=typeof $task,t="undefined"!=typeof $loon,s="undefined"!=typeof $httpClient&&!t,i="function"==typeof require&&"undefined"!=typeof $ui;return{isQX:e,isLoon:t,isSurge:s,isNode:"function"==typeof require&&!i,isJSBox:i}}function HTTP(e={baseURL:""}){const{isQX:t,isLoon:s,isSurge:i,isJSBox:n,isNode:o}=ENV(),r=/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/;const h={};return["GET","POST","PUT","DELETE","HEAD","OPTIONS","PATCH"].forEach(a=>h[a.toLowerCase()]=(h=>(function(h,a){a="string"==typeof a?{url:a}:a;const u=e.baseURL;u&&!r.test(a.url||"")&&(a.url=u?u+a.url:a.url),a.body&&a.headers&&!a.headers["Content-Type"]&&(a.headers["Content-Type"]="application/x-www-form-urlencoded");const c=(a={...e,...a}).timeout,l={onRequest:()=>{},onResponse:e=>e,onTimeout:()=>{},...a.events};let f,d;if(l.onRequest(h,a),t)f=$task.fetch({method:h,...a});else if(s||i||o)f=new Promise((e,t)=>{(o?require("request"):$httpClient)[h.toLowerCase()](a,(s,i,n)=>{s?t(s):e({statusCode:i.status||i.statusCode,headers:i.headers,body:n})})});else if(n){var p=a.url,y=a.headers,g=a.body;f=new Promise((e,t)=>{$http.request({method:h,url:p,header:y,body:g,handler:function(s){s.error?t(s.error):e({statusCode:s.response.statusCode,headers:s.response.headers,body:s.data})}})})}else if(o){const e=new Request(a.url);e.method=h,e.headers=a.headers,e.body=a.body,f=new Promise((t,s)=>{e.loadString().then(s=>{t({statusCode:e.response.statusCode,headers:e.response.headers,body:s})}).catch(e=>s(e))})}const $=c?new Promise((e,t)=>{d=setTimeout(()=>(l.onTimeout(),t(`${h} URL: ${a.url} exceeds the timeout ${c} ms`)),c)}):null;return($?Promise.race([$,f]).then(e=>(clearTimeout(d),e)):f).then(e=>l.onResponse(e))})(a,h))),h}function API(e="untitled",t=!1){const{isQX:s,isLoon:i,isSurge:n,isNode:o,isJSBox:r}=ENV();return new class{constructor(e,t){this.name=e,this.debug=t,this.logs=[],this.http=HTTP(),this.env=ENV(),this.node=(()=>{if(o){return{fs:require("fs")}}return null})(),this.initCache();Promise.prototype.delay=function(e){return this.then(function(t){return((e,t)=>new Promise(function(s){setTimeout(s.bind(null,t),e)}))(e,t)})}}initCache(){if(s&&(this.cache=JSON.parse($prefs.valueForKey(this.name)||"{}")),(i||n)&&(this.cache=JSON.parse($persistentStore.read(this.name)||"{}")),r&&(this.cache=JSON.parse($cache.get(this.name)||"{}")),o){let e="root.json";this.node.fs.existsSync(e)||this.node.fs.writeFileSync(e,JSON.stringify({}),{flag:"wx"},e=>console.log(e)),this.root={},e=`${this.name}.json`,this.node.fs.existsSync(e)?this.cache=JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)):(this.node.fs.writeFileSync(e,JSON.stringify({}),{flag:"wx"},e=>console.log(e)),this.cache={})}}persistCache(){const e=JSON.stringify(this.cache,null,2);s&&$prefs.setValueForKey(e,this.name),(i||n)&&$persistentStore.write(e,this.name),r&&$cache.set(this.name,e),o&&(this.node.fs.writeFileSync(`${this.name}.json`,e,{flag:"w"},e=>console.log(e)),this.node.fs.writeFileSync("root.json",JSON.stringify(this.root,null,2),{flag:"w"},e=>console.log(e)))}write(e,t){if(this.log(`SET ${t}`),-1!==t.indexOf("#")){if(t=t.substr(1),n||i)return $persistentStore.write(e,t);if(s)return $prefs.setValueForKey(e,t);o&&(this.root[t]=e),r&&$cache.set(t,e)}else this.cache[t]=e;this.persistCache()}read(e){return this.log(`READ ${e}`),-1===e.indexOf("#")?this.cache[e]:(e=e.substr(1),n||i?$persistentStore.read(e):s?$prefs.valueForKey(e):o?this.root[e]:r?$cache.get(e):void 0)}delete(e){if(this.log(`DELETE ${e}`),-1!==e.indexOf("#")){if(e=e.substr(1),n||i)return $persistentStore.write(null,e);if(s)return $prefs.removeValueForKey(e);o&&delete this.root[e],r&&$cache.remove(e)}else delete this.cache[e];this.persistCache()}notify(e,t="",h={}){const a=h["open-url"],u=h["media-url"];if(s&&$notify(e,"",t,h),n&&$notification.post(e,"",t+`${u?"\n多媒体:"+u:""}`,{url:a}),i){let s={};a&&(s.openUrl=a),u&&(s.mediaUrl=u),"{}"===JSON.stringify(s)?$notification.post(e,"",t):$notification.post(e,"",t,s)}if(r){const s=t+(a?`\n点击跳转: ${a}`:"")+(u?`\n多媒体: ${u}`:"");$push.schedule({title:e,body:""+s})}if(o){const s=""+(t+(a?`\n点击跳转: ${a}`:"")+(u?`\n多媒体: ${u}`:""));require("./sendNotify").sendNotify(e,s)}}msg(...e){e.length>0&&(this.logs=[...this.logs,...e]),this.log(e)}log(e){this.debug&&console.log(`[${this.name}] LOG: ${this.stringify(e)}`)}info(e){console.log(`[${this.name}] INFO: ${this.stringify(e)}`)}error(e){console.log(`[${this.name}] ERROR: ${this.stringify(e)}`)}wait(e){return new Promise(t=>setTimeout(t,e))}done(e={}){(s||i||n)&&$done(e)}parse(e){if("string"==typeof e||e instanceof String)try{return JSON.parse(e)}catch(e){this.msg("parse出错了")}else try{return JSON.parse(JSON.stringify(e))}catch(e){this.msg("parse出错了")}}stringify(e){if("string"==typeof e||e instanceof String)return e;try{return JSON.stringify(e,null,2)}catch(e){this.msg("stringify出错了")}}}(e,t)}
/*****************************************************************************/
