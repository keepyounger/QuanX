/*
Last Modified time: 2021-9-22
VPN签到
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
============Quantumultx===============
[task_local]
#VPN签到
10 8 * * * vpnsign.js, tag=VPN签到, img-url=https://raw.githubusercontent.com/keepyounger/QuanX/main/Tasks/vpnsign.png, enabled=true

================Loon==============
[Script]
cron "10 8 * * *" script-path=vpnsign.js,tag=VPN签到

===============Surge=================
VPN签到 = type=cron,cronexp="10 8 * * *",wake-system=1,timeout=3600,script-path=vpnsign.js

============小火箭=========
VPN签到 = type=cron,script-path=vpnsign.js, cronexpr="10 8 * * *", timeout=3600, enable=true
 */

const $ = new Env("VPN签到");

var accounts = [
    {email: "jackie.ky@qq.com", password: "kyLxy0525."}, 
    {email: "ztyijia@163.com", password: "ZTyj2017."}
]

//juzi69.com必须付费 jacike.ky@qq.com
// var hosts = ["koozk.com","juzi69.com", "hxrtnt.com"]
var hosts = ["koozk.com", "hxrtnt.com"]

!(async () => {
    for (let i = 0; i < accounts.length; i++) {
    	let item = accounts[i];
    	$.msg("\n" + item.email);
        for (let j = 0; j < hosts.length; j++) {
            var host = hosts[j];
            $.msg("\n" + host);
            await login(item.email, item.password, host);
        }
    }
    $.msg("\nGLaDOS签到");
    await signGLaDOS();
})().catch((e) => $.msg(e + ""))
    .finally(() => {
        $.notify($.name, $.logs.join('\n'));
        $.done()
    });

async function login(email, password, host) {
    await $.http.post({
        url: "https://" + host + "/auth/login",
        headers: {
            "Cookie": "",
            "Accept":"application/json, text/javascript, */*; q=0.01",
            "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
        },
        body: {
            "email": email, 
            "passwd": password, 
            "code": ""
        }
    }).then(async (res) => {
        var headers = $.parse(res).headers;
        var setCookie = headers["Set-Cookie"] || headers["set-cookie"]
        setCookie = typeof(setCookie) == "object" ? setCookie.join() : (setCookie + "");
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
        await checkin(cookies, host);
    });
}

async function checkin(cookies, host) {
    await $.http.post({
        url: "https://" + host + "/user/checkin",
        headers: {
            "Cookie": cookies,
            "Accept":"application/json, text/javascript, */*; q=0.01",
            "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
        }
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
function Env(e="untitled"){const t="undefined"!=typeof $task,s="undefined"!=typeof $loon,i="undefined"!=typeof $httpClient&&!s,r="function"==typeof require&&"undefined"!=typeof $ui,n="function"==typeof require&&!r;function o(){const e={};return["GET","POST","PUT","DELETE","HEAD","OPTIONS","PATCH"].forEach(o=>e[o.toLowerCase()]=(e=>(function(e,o){if((o="string"==typeof o?{url:o}:o).body&&o.headers&&(o.headers["Content-Type"]||(o.headers["Content-Type"]="application/x-www-form-urlencoded"),"object"==typeof(p=o.body)||p instanceof Object)){var a=o.headers["Content-Type"];"application/x-www-form-urlencoded"==a?o.body=function(e){var t="";for(var s in e)t+=s+"="+e[s]+"&";return t}(p):"application/json"==a&&(o.body=JSON.stringify(p))}const h=o.timeout,c={onRequest:()=>{},onResponse:e=>e,onTimeout:()=>{},...o.events};let f,l;if(c.onRequest(e,o),t)f=$task.fetch({method:e,...o});else if(s||i||n)f=new Promise((t,s)=>{(n?require("request"):$httpClient)[e.toLowerCase()](o,(e,i,r)=>{e?s(e):t({statusCode:i.status||i.statusCode,headers:i.headers,body:r})})});else if(r){var u=o.url,d=o.headers,p=o.body;f=new Promise((t,s)=>{$http.request({method:e,url:u,header:d,body:p,handler:function(e){e.error?s(e.error):t({statusCode:e.response.statusCode,headers:e.response.headers,body:e.data})}})})}else if(n){const t=new Request(o.url);t.method=e,t.headers=o.headers,t.body=o.body,f=new Promise((e,s)=>{t.loadString().then(s=>{e({statusCode:t.response.statusCode,headers:t.response.headers,body:s})}).catch(e=>s(e))})}const y=h?new Promise((t,s)=>{l=setTimeout(()=>(c.onTimeout(),s(`${e} URL: ${o.url} exceeds the timeout ${h} ms`)),h)}):null;return(y?Promise.race([y,f]).then(e=>(clearTimeout(l),e)):f).then(e=>c.onResponse(e))})(o,e))),e}return new class{constructor(e){this.name=e,this.logs=[],this.http=o(),this.node=(()=>{if(n){return{fs:require("fs")}}return null})(),this.initCache();Promise.prototype.delay=function(e){return this.then(function(t){return((e,t)=>new Promise(function(s){setTimeout(s.bind(null,t),e)}))(e,t)})}}initCache(){if(t&&(this.cache=JSON.parse($prefs.valueForKey(this.name)||"{}")),(s||i)&&(this.cache=JSON.parse($persistentStore.read(this.name)||"{}")),r&&(this.cache=JSON.parse($cache.get(this.name)||"{}")),n){let e="root.json";this.node.fs.existsSync(e)||this.node.fs.writeFileSync(e,JSON.stringify({}),{flag:"wx"},e=>console.log(e)),this.root={},e=`${this.name}.json`,this.node.fs.existsSync(e)?this.cache=JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)):(this.node.fs.writeFileSync(e,JSON.stringify({}),{flag:"wx"},e=>console.log(e)),this.cache={})}}persistCache(){const e=JSON.stringify(this.cache,null,2);t&&$prefs.setValueForKey(e,this.name),(s||i)&&$persistentStore.write(e,this.name),r&&$cache.set(this.name,e),n&&(this.node.fs.writeFileSync(`${this.name}.json`,e,{flag:"w"},e=>console.log(e)),this.node.fs.writeFileSync("root.json",JSON.stringify(this.root,null,2),{flag:"w"},e=>console.log(e)))}write(e,o){if(this.log(`SET ${o}`),-1!==o.indexOf("#")){if(o=o.substr(1),i||s)return $persistentStore.write(e,o);if(t)return $prefs.setValueForKey(e,o);n&&(this.root[o]=e),r&&$cache.set(o,e)}else this.cache[o]=e;this.persistCache()}read(e){return this.log(`READ ${e}`),-1===e.indexOf("#")?this.cache[e]:(e=e.substr(1),i||s?$persistentStore.read(e):t?$prefs.valueForKey(e):n?this.root[e]:r?$cache.get(e):void 0)}delete(e){if(this.log(`DELETE ${e}`),-1!==e.indexOf("#")){if(e=e.substr(1),i||s)return $persistentStore.write(null,e);if(t)return $prefs.removeValueForKey(e);n&&delete this.root[e],r&&$cache.remove(e)}else delete this.cache[e];this.persistCache()}notify(e,o="",a={}){const h=a["open-url"],c=a["media-url"];if(t&&$notify(e,"",o,a),i&&$notification.post(e,"",o+`${c?"\n多媒体:"+c:""}`,{url:h}),s){let t={};h&&(t.openUrl=h),c&&(t.mediaUrl=c),"{}"===JSON.stringify(t)?$notification.post(e,"",o):$notification.post(e,"",o,t)}if(r&&$push.schedule({title:e,body:o}),n){require("./sendNotify").sendNotify(e,o)}}msg(...e){e.length>0&&(this.logs=[...this.logs,...e]),this.log(e)}log(e){console.log(`[${this.name}] LOG: ${this.stringify(e)}`)}info(e){console.log(`[${this.name}] INFO: ${this.stringify(e)}`)}error(e){console.log(`[${this.name}] ERROR: ${this.stringify(e)}`)}wait(e){return new Promise(t=>setTimeout(t,e))}done(e={}){(t||s||i)&&$done(e)}parse(e){if("string"==typeof e||e instanceof String)try{return JSON.parse(e)}catch(t){this.msg("parse error:"+e)}else try{return JSON.parse(JSON.stringify(e))}catch(t){this.msg("parse error:"+e)}}stringify(e){if("string"==typeof e||e instanceof String)return e;try{return JSON.stringify(e)}catch(t){this.msg("stringify error:"+e)}}}(e)}
/*****************************************************************************/
