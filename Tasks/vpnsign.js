/*
Last Modified time: 2021-9-18
VPN签到
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
============Quantumultx===============
[task_local]
#VPN签到
40 8 * * * xinyueyueka.js, tag=VPN签到, img-url=https://raw.githubusercontent.com/keepyounger/QuanX/main/Tasks/xinyue.png, enabled=true

================Loon==============
[Script]
cron "40 8 * * *" script-path=xinyueyueka.js,tag=VPN签到

===============Surge=================
VPN签到 = type=cron,cronexp="40 8 * * *",wake-system=1,timeout=3600,script-path=xinyueyueka.js

============小火箭=========
VPN签到 = type=cron,script-path=xinyueyueka.js, cronexpr="40 8 * * *", timeout=3600, enable=true
 */

const $ = API("VPN签到", true); // API("APP") --> 无log输出

var accounts = [
    {email: "jackie.ky@qq.com", password: "kyLxy0525."}, 
    {email: "ztyijia@163.com", password: "ZTyj2017."}
]

function objectBodyToString(object) {
    var str = ""
    for (var i in object) {
        var key = i;
        var value = object[key];
        str += key + "=" + value + "&"
    }
    return str
}

!(async () => {
    for (let i = 0; i < accounts.length; i++) {
    	let item = accounts[i];
    	$.msg("\n" + item.email);
    	await login(item.email, item.password);
    }
    $.msg("\nGLaDOS签到");
    await signGLaDOS();
    await $.notify($.name, $.logs.join('\n'));
})().catch((e) => $.log(e + ""))
    .finally(() => $.done());

async function login(email, password) {
    await $.http.post({
        url: "https://koozk.com/auth/login",
        headers: {
            "Cookie": "",
            "Accept":"application/json, text/javascript, */*; q=0.01",
            "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
        },
        body: objectBodyToString({
            "email": email, 
            "passwd": password, 
            "code": ""
        })
    }).then(async (res) => {
        var headers = $.parse(res).headers;
        var setCookie = headers["Set-Cookie"] || headers["set-cookie"].join();
        var cookies = ""
        
        var ca = setCookie.split(';');
        for(var i=0; i<ca.length; i++) 
        {
            var c = ca[i].trim();
            var d = c.split(',');
            var e = d[d.length-1].trim();
            if (e.indexOf("=") > 0) {
                cookies += e + "; ";
            }
        }
        
        await checkin(cookies);
    });
}

async function checkin(cookies) {
    await $.http.post({
        url: "https://koozk.com/user/checkin",
        headers: {
            "Cookie": cookies,
            "Accept":"application/json, text/javascript, */*; q=0.01",
            "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
        },
        body: ""
    }).then((res) => {
        var data = res.body;
        $.msg($.parse(data).msg);
    });
}

async function signGLaDOS() {
    await $.http.post({
        url: "https://glados.rocks/api/user/checkin",
        headers: {
            "Cookie": "_ga=GA1.2.1980445613.1621920417; _gid=GA1.2.2106139592.1624354270; koa:sess=eyJjb2RlIjoiVE5MOVYtRkRSQkwtQk03TDAtWlROM1ciLCJ1c2VySWQiOjg3OTY2LCJfZXhwaXJlIjoxNjUwMjc0NTY2Mzc0LCJfbWF4QWdlIjoyNTkyMDAwMDAwMH0=; koa:sess.sig=qxST-J1RzAZ2IHahBfMTg3DaSnk; _gat_gtag_UA_104464600_2=1"
        },
        body: "token=glados_network"
    }).then((res) => {
        var data = res.body;
        $.msg($.parse(data).message);
    });
}

// prettier-ignore
/*********************************** API *************************************/
function ENV(){const e="undefined"!=typeof $task,t="undefined"!=typeof $loon,s="undefined"!=typeof $httpClient&&!t,i="function"==typeof require&&"undefined"!=typeof $ui;return{isQX:e,isLoon:t,isSurge:s,isNode:"function"==typeof require&&!i,isJSBox:i}}function HTTP(e={baseURL:""}){const{isQX:t,isLoon:s,isSurge:i,isJSBox:n,isNode:o}=ENV(),r=/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/;const h={};return["GET","POST","PUT","DELETE","HEAD","OPTIONS","PATCH"].forEach(a=>h[a.toLowerCase()]=(h=>(function(h,a){a="string"==typeof a?{url:a}:a;const u=e.baseURL;u&&!r.test(a.url||"")&&(a.url=u?u+a.url:a.url),a.body&&a.headers&&!a.headers["Content-Type"]&&(a.headers["Content-Type"]="application/x-www-form-urlencoded");const c=(a={...e,...a}).timeout,l={onRequest:()=>{},onResponse:e=>e,onTimeout:()=>{},...a.events};let f,d;if(l.onRequest(h,a),t)f=$task.fetch({method:h,...a});else if(s||i||o)f=new Promise((e,t)=>{(o?require("request"):$httpClient)[h.toLowerCase()](a,(s,i,n)=>{s?t(s):e({statusCode:i.status||i.statusCode,headers:i.headers,body:n})})});else if(n){var p=a.url,y=a.headers,g=a.body;f=new Promise((e,t)=>{$http.request({method:h,url:p,header:y,body:g,handler:function(s){s.error?t(s.error):e({statusCode:s.response.statusCode,headers:s.response.headers,body:s.data})}})})}else if(o){const e=new Request(a.url);e.method=h,e.headers=a.headers,e.body=a.body,f=new Promise((t,s)=>{e.loadString().then(s=>{t({statusCode:e.response.statusCode,headers:e.response.headers,body:s})}).catch(e=>s(e))})}const $=c?new Promise((e,t)=>{d=setTimeout(()=>(l.onTimeout(),t(`${h} URL: ${a.url} exceeds the timeout ${c} ms`)),c)}):null;return($?Promise.race([$,f]).then(e=>(clearTimeout(d),e)):f).then(e=>l.onResponse(e))})(a,h))),h}function API(e="untitled",t=!1){const{isQX:s,isLoon:i,isSurge:n,isNode:o,isJSBox:r}=ENV();return new class{constructor(e,t){this.name=e,this.debug=t,this.logs=[],this.http=HTTP(),this.env=ENV(),this.node=(()=>{if(o){return{fs:require("fs")}}return null})(),this.initCache();Promise.prototype.delay=function(e){return this.then(function(t){return((e,t)=>new Promise(function(s){setTimeout(s.bind(null,t),e)}))(e,t)})}}initCache(){if(s&&(this.cache=JSON.parse($prefs.valueForKey(this.name)||"{}")),(i||n)&&(this.cache=JSON.parse($persistentStore.read(this.name)||"{}")),r&&(this.cache=JSON.parse($cache.get(this.name)||"{}")),o){let e="root.json";this.node.fs.existsSync(e)||this.node.fs.writeFileSync(e,JSON.stringify({}),{flag:"wx"},e=>console.log(e)),this.root={},e=`${this.name}.json`,this.node.fs.existsSync(e)?this.cache=JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)):(this.node.fs.writeFileSync(e,JSON.stringify({}),{flag:"wx"},e=>console.log(e)),this.cache={})}}persistCache(){const e=JSON.stringify(this.cache,null,2);s&&$prefs.setValueForKey(e,this.name),(i||n)&&$persistentStore.write(e,this.name),r&&$cache.set(this.name,e),o&&(this.node.fs.writeFileSync(`${this.name}.json`,e,{flag:"w"},e=>console.log(e)),this.node.fs.writeFileSync("root.json",JSON.stringify(this.root,null,2),{flag:"w"},e=>console.log(e)))}write(e,t){if(this.log(`SET ${t}`),-1!==t.indexOf("#")){if(t=t.substr(1),n||i)return $persistentStore.write(e,t);if(s)return $prefs.setValueForKey(e,t);o&&(this.root[t]=e),r&&$cache.set(t,e)}else this.cache[t]=e;this.persistCache()}read(e){return this.log(`READ ${e}`),-1===e.indexOf("#")?this.cache[e]:(e=e.substr(1),n||i?$persistentStore.read(e):s?$prefs.valueForKey(e):o?this.root[e]:r?$cache.get(e):void 0)}delete(e){if(this.log(`DELETE ${e}`),-1!==e.indexOf("#")){if(e=e.substr(1),n||i)return $persistentStore.write(null,e);if(s)return $prefs.removeValueForKey(e);o&&delete this.root[e],r&&$cache.remove(e)}else delete this.cache[e];this.persistCache()}notify(e,t="",h="",a={}){const u=a["open-url"],c=a["media-url"];if(s&&$notify(e,t,h,a),n&&$notification.post(e,t,h+`${c?"\n多媒体:"+c:""}`,{url:u}),i){let s={};u&&(s.openUrl=u),c&&(s.mediaUrl=c),"{}"===JSON.stringify(s)?$notification.post(e,t,h):$notification.post(e,t,h,s)}if(r){const s=h+(u?`\n点击跳转: ${u}`:"")+(c?`\n多媒体: ${c}`:"");$push.schedule({title:e,body:t+s})}if(o){const s=t+(h+(u?`\n点击跳转: ${u}`:"")+(c?`\n多媒体: ${c}`:""));require("./sendNotify").sendNotify(e,s)}}msg(...e){e.length>0&&(this.logs=[...this.logs,...e]),this.log(e)}log(e){this.debug&&console.log(`[${this.name}] LOG: ${this.stringify(e)}`)}info(e){console.log(`[${this.name}] INFO: ${this.stringify(e)}`)}error(e){console.log(`[${this.name}] ERROR: ${this.stringify(e)}`)}wait(e){return new Promise(t=>setTimeout(t,e))}done(e={}){(s||i||n)&&$done(e)}parse(e){if("string"==typeof e||e instanceof String)try{return JSON.parse(e)}catch(e){this.msg("parse出错了")}else try{return JSON.parse(JSON.stringify(e))}catch(e){this.msg("parse出错了")}}stringify(e){if("string"==typeof e||e instanceof String)return e;try{return JSON.stringify(e,null,2)}catch(e){this.msg("stringify出错了")}}}(e,t)}
/*****************************************************************************/
