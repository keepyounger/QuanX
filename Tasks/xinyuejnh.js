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
        var data = JSON.parse($.stringify(res.body));
        if (data.ret == 0) {
            $.msg("本次得分" + data.modRet.sPackageName);
            score += (parseInt(data.modRet.sPackageName) || 0);
        }
    });
}

// prettier-ignore
/*********************************** API *************************************/
function ENV(){const e="undefined"!=typeof $task,t="undefined"!=typeof $loon,s="undefined"!=typeof $httpClient&&!t,i="function"==typeof require&&"undefined"!=typeof $jsbox;return{isQX:e,isLoon:t,isSurge:s,isNode:"function"==typeof require&&!i,isJSBox:i,isRequest:"undefined"!=typeof $request,isScriptable:"undefined"!=typeof importModule}}function HTTP(e={baseURL:""}){const{isQX:t,isLoon:s,isSurge:i,isScriptable:o,isNode:n}=ENV(),r=/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/;const u={};return["GET","POST","PUT","DELETE","HEAD","OPTIONS","PATCH"].forEach(h=>u[h.toLowerCase()]=(u=>(function(u,h){h="string"==typeof h?{url:h}:h;const l=e.baseURL;l&&!r.test(h.url||"")&&(h.url=l?l+h.url:h.url),h.body&&h.headers&&!h.headers["Content-Type"]&&(h.headers["Content-Type"]="application/x-www-form-urlencoded");const a=(h={...e,...h}).timeout,f={onRequest:()=>{},onResponse:e=>e,onTimeout:()=>{},...h.events};let c,d;if(f.onRequest(u,h),t)c=$task.fetch({method:u,...h});else if(s||i||n)c=new Promise((e,t)=>{(n?require("request"):$httpClient)[u.toLowerCase()](h,(s,i,o)=>{s?t(s):e({statusCode:i.status||i.statusCode,headers:i.headers,body:o})})});else if(o){const e=new Request(h.url);e.method=u,e.headers=h.headers,e.body=h.body,c=new Promise((t,s)=>{e.loadString().then(s=>{t({statusCode:e.response.statusCode,headers:e.response.headers,body:s})}).catch(e=>s(e))})}const p=a?new Promise((e,t)=>{d=setTimeout(()=>(f.onTimeout(),t(`${u} URL: ${h.url} exceeds the timeout ${a} ms`)),a)}):null;return(p?Promise.race([p,c]).then(e=>(clearTimeout(d),e)):c).then(e=>f.onResponse(e))})(h,u))),u}function API(e="untitled",t=!1){const{isQX:s,isLoon:i,isSurge:o,isNode:n,isJSBox:r,isScriptable:u}=ENV();return new class{constructor(e,t){this.name=e,this.debug=t,this.logs=[],this.http=HTTP(),this.env=ENV(),this.node=(()=>{if(n){return{fs:require("fs")}}return null})(),this.initCache();Promise.prototype.delay=function(e){return this.then(function(t){return((e,t)=>new Promise(function(s){setTimeout(s.bind(null,t),e)}))(e,t)})}}initCache(){if(s&&(this.cache=JSON.parse($prefs.valueForKey(this.name)||"{}")),(i||o)&&(this.cache=JSON.parse($persistentStore.read(this.name)||"{}")),n){let e="root.json";this.node.fs.existsSync(e)||this.node.fs.writeFileSync(e,JSON.stringify({}),{flag:"wx"},e=>console.log(e)),this.root={},e=`${this.name}.json`,this.node.fs.existsSync(e)?this.cache=JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)):(this.node.fs.writeFileSync(e,JSON.stringify({}),{flag:"wx"},e=>console.log(e)),this.cache={})}}persistCache(){const e=JSON.stringify(this.cache,null,2);s&&$prefs.setValueForKey(e,this.name),(i||o)&&$persistentStore.write(e,this.name),n&&(this.node.fs.writeFileSync(`${this.name}.json`,e,{flag:"w"},e=>console.log(e)),this.node.fs.writeFileSync("root.json",JSON.stringify(this.root,null,2),{flag:"w"},e=>console.log(e)))}write(e,t){if(this.log(`SET ${t}`),-1!==t.indexOf("#")){if(t=t.substr(1),o||i)return $persistentStore.write(e,t);if(s)return $prefs.setValueForKey(e,t);n&&(this.root[t]=e)}else this.cache[t]=e;this.persistCache()}read(e){return this.log(`READ ${e}`),-1===e.indexOf("#")?this.cache[e]:(e=e.substr(1),o||i?$persistentStore.read(e):s?$prefs.valueForKey(e):n?this.root[e]:void 0)}delete(e){if(this.log(`DELETE ${e}`),-1!==e.indexOf("#")){if(e=e.substr(1),o||i)return $persistentStore.write(null,e);if(s)return $prefs.removeValueForKey(e);n&&delete this.root[e]}else delete this.cache[e];this.persistCache()}notify(e,t="",h="",l={}){const a=l["open-url"],f=l["media-url"];if(s&&$notify(e,t,h,l),o&&$notification.post(e,t,h+`${f?"\n多媒体:"+f:""}`,{url:a}),i){let s={};a&&(s.openUrl=a),f&&(s.mediaUrl=f),"{}"===JSON.stringify(s)?$notification.post(e,t,h):$notification.post(e,t,h,s)}if(n||u){const s=h+(a?`\n点击跳转: ${a}`:"")+(f?`\n多媒体: ${f}`:"");if(r){require("push").schedule({title:e,body:(t?t+"\n":"")+s})}else{const s=t+h;require("./sendNotify").sendNotify(e,s)}}}msg(...e){e.length>0&&(this.logs=[...this.logs,...e]),this.log(e)}log(e){this.debug&&console.log(`[${this.name}] LOG: ${this.stringify(e)}`)}info(e){console.log(`[${this.name}] INFO: ${this.stringify(e)}`)}error(e){console.log(`[${this.name}] ERROR: ${this.stringify(e)}`)}wait(e){return new Promise(t=>setTimeout(t,e))}done(e={}){s||i||o?$done(e):n&&!r&&"undefined"!=typeof $context&&($context.headers=e.headers,$context.statusCode=e.statusCode,$context.body=e.body)}stringify(e){if("string"==typeof e||e instanceof String)return e;try{return JSON.stringify(e,null,2)}catch(e){return"[object Object]"}}}(e,t)}
/*****************************************************************************/
