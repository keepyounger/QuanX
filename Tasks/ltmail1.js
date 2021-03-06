/*
Last Modified time: 2021-9-26
联通邮箱签到
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
============Quantumultx===============
[task_local]
#联通邮箱签到
50 7 * * * ltmail.js, tag=联通邮箱签到, img-url=https://raw.githubusercontent.com/keepyounger/QuanX/main/Tasks/lt.png, enabled=true

================Loon==============
[Script]
cron "50 7 * * *" script-path=ltmail.js,tag=联通邮箱签到

===============Surge=================
联通邮箱签到 = type=cron,cronexp="50 7 * * *",wake-system=1,timeout=3600,script-path=ltmail.js

============小火箭=========
联通邮箱签到 = type=cron,script-path=ltmail.js, cronexpr="50 7 * * *", timeout=3600, enable=true
 */

const $ = new Env("联通邮箱签到1");

var accounts = [
    {phone: "18519117375", url: "https://nyan.mail.wo.cn/cn/sign/index/index?mobile=5w%2BQGZoP6xAwPvISpNzO2Q%3D%3D&userName=&openId=gaNAqo%2BybNFuba0NXG0MWvsrNuiolGhjqxTij3ORb4A%3D"}, 
    // {phone: "13240350760", url: "https://nyan.mail.wo.cn/cn/sign/index/index?mobile=weMpIcC8fQCbB%2BQOsPKs6Q%3D%3D&userName=&openId=8e1Ex6y3sBN2FiSGxTGJS47K8zN1bOu76XNaoNAWQ3k%3D"}, 
    // {phone: "13283086073", url: "https://nyan.mail.wo.cn/cn/sign/index/index?mobile=ODxtWZXX4md3D6qxAOyvxQ%3D%3D&userName=&openId=7aRqE%2B5s%2F5QFdUIYCxoWPO7345NLc9dvYhoSAXdfsk8%3D"}, 
    // {phone: "15583378691", url: "https://nyan.mail.wo.cn/cn/sign/index/index?mobile=KhopAMqulyO5ewIqXbQt8w%3D%3D&userName=&openId=cDLLCi%2Fpd1X%2FPlojRDBS60acPScKSirXYqtrfoJtTZ8%3D"}, 
]

var headers = {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Language": "zh-CN,zh-Hans;q=0.9",
    "Connection": "keep-alive",
    "Host": "nyan.mail.wo.cn",
    "Origin": "https://nyan.mail.wo.cn",
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
    "X-Requested-With": "XMLHttpRequest"
};

//超时函数
function timeout(t) {
    var time = t;
    if (!t) {
        time = parseInt(Math.random() * 8000);
        if (time < 5000) {
            time = 5000;
        }
    }
    $.msg("延迟" + time + "ms");
    return time
}

!(async () => {
    for (let i = 0; i < accounts.length; i++) {
    	let item = accounts[i];
    	$.msg("\n" + item.phone);
    	await login(item.url);
        await login2(item.phone);
    }
})().catch((e) => $.msg(e + ""))
    .finally(() => {
        $.notify($.name, $.logs.join('\n'));
        $.done()
    });
    
async function login2(phone) {
    var url = "https://account.bol.wo.cn/cuuser/cuauth/accountLogin?username=" + phone + "&password=kCNBeRRruKyYVBqd8vpiww%3D%3D&clientId=userclub&redirectUrl=https%3A%2F%2Fclub.mail.wo.cn%2Fclubwebservice%2Fclub-index%2Fhome-page&appType=2&state="
    await $.http.post({
        url: url,
        headers: {
            "Host": "account.bol.wo.cn",
            "Connection": "keep-alive",
            "Content-Length": "2",
            "Accept": "application/json, text/plain, */*",
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
            "Content-Type": "application/json;charset=UTF-8",
            "Origin": "https://account.bol.wo.cn",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Dest": "empty",
            "Referer": "https://account.bol.wo.cn/accountlogin?clientId=userclub&redirectUrl=https%3A%2F%2Fclub.mail.wo.cn%2Fclubwebservice%2Fclub-index%2Fhome-page",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
            "Cookie": "OUTFOX_SEARCH_USER_ID_NCOO=444763728.3156945; pgv_pvid=7685035992; __qc_wId=47; ___rl__test__cookies=1633746932829"
        }
    }).then(async (res) => {
        var body =$.parse(res.body);
        await sign2(body.data);
    });
}

async function sign2(redirctUrl) {
    var hh = {
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Connection": "keep-alive",
        "Host": "club.mail.wo.cn",
        "Referer": "https://club.mail.wo.cn/clubwebservice/club-index/home-page",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.14(0x18000e2a) NetType/WIFI Language/zh_CN",
        "X-Requested-With": "XMLHttpRequest"};
  
    await $.http.get({
        url: redirctUrl
    }).then(async (res) => {
        //不是 quanx
        if (typeof $task === "undefined") {
            var resHeaders = $.parse(res).headers;
            var setCookie = resHeaders["Set-Cookie"] || resHeaders["set-cookie"].join();
            hh.Cookie = setCookie;
        }
    });
    
    await $.wait(timeout())
    
    await $.http.get({
        url: "https://club.mail.wo.cn/clubwebservice/club-user/user-sign/create?channelId=",
        headers: hh
    }).then(async (res) => {
        var body =$.parse(res.body);
        $.msg("沃邮箱俱乐部 签到：" + body.description);
    });
    
    await $.wait(timeout())
    
    await $.http.get({
        url: "https://club.mail.wo.cn/clubwebservice/growth/addIntegral?resourceType=Web_jifenduihuan%2B2jifen",
        headers: hh
    }).then(async (res) => {
        var body =$.parse(res.body);
        $.msg("沃邮箱俱乐部 浏览积分兑换：" + body.description);
    });
    
    await $.wait(timeout())
    
    await $.http.get({
        url: "https://club.mail.wo.cn/clubwebservice/growth/addIntegral?resourceType=Web_canyujulebuhuodong%2B2jifen",
        headers: hh
    }).then(async (res) => {
        var body =$.parse(res.body);
        $.msg("沃邮箱俱乐部 参与活动：" + body.description);
    });
    
    
}

async function login(url) {
    await $.http.get({
        url: url
    }).then(async (res) => {
        headers.Referer = "https://nyan.mail.wo.cn/cn/sign/wap/index.html?time=" + (new Date().getTime()-1000);
        //不是 quanx
        if (typeof $task === "undefined") {
            var resHeaders = $.parse(res).headers;
            var setCookie = resHeaders["Set-Cookie"] || resHeaders["set-cookie"].join();
            var cookies = setCookie.split(';')[0];
            headers.Cookie = cookies;
        }
        await $.wait(timeout(3000)).then(async () => {
                await checkNum();
                await checkTasks();
            });
    });
}

async function checkNum(tag) {
    var signUrl = "https://nyan.mail.wo.cn/cn/sign/index/userinfo.do?rand=" + Math.random();
    await $.http.post({
        url: signUrl,
        headers: headers
    }).then(async (res) => {
        var data =$.parse(res.body);
        var score = data.result.clubScore;
        var num = data.result.keepSign;
        
        $.msg("已签到" + num + "天，当前分数" + score);
        if (tag) {
            return;
        }
        
        var lastday = data.result.lastDay + "";
        var date = new Date();
        var Y = date.getFullYear() + "";
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + "";
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + "";
        
        if (lastday == (Y + M + D)) {
            $.msg("今日已签到，跳过签到")
        } else if (num >= 21) {
            $.msg("签到大于等于21天，跳过签到")
        } else {
            await $.wait(timeout(5000)).then(async () => {
                    await checkin();
                });
        }
    });
}

async function checkin() {
    var signUrl = "https://nyan.mail.wo.cn/cn/sign/user/checkin.do?rand=" + Math.random();
    await $.http.get({
        url: signUrl,
        headers: headers
    }).then((res) => {
        var data =$.parse(res.body);
        var num = data.result;
        if (num > 0) {
            $.msg("签到成功" + num + "天");
        } else if (num == -2) {
            $.msg("重复签到");
        } else {
            $.msg(data.result);
        }
    });
}

async function checkTasks() {
    // var tasks = ["download", "loginmail", "treasure", "club", "answer", "clubactivity", "invite"];
    var tasks = ["loginmail", "club", "clubactivity"];
    var tasksStatus = {};
    var signUrl = "https://nyan.mail.wo.cn/cn/sign/user/overtask.do?rand=" + Math.random();
    await $.http.post({
        url: signUrl,
        headers: headers,
        body: "taskLevel=2"
    }).then(async (res) => {
        var data =$.parse(res.body);        
        for (let i = 0; i < data.result.length; i++) {
        	let item = data.result[i];
            $.msg(item.taskName + "已完成");
            tasksStatus[item.taskName] = 1;
        }
        var flag = false;
        for (let i = 0; i < tasks.length; i++) {
            let item = tasks[i];
            if (!tasksStatus[item]) {
                flag = true;
                await $.wait(timeout()).then(async () => {
                    await checkInTasks(item);
                });
            }
        }
        flag && await checkNum(1);
    });
}

async function checkInTasks(task) {
    var signUrl = "https://nyan.mail.wo.cn/cn/sign/user/doTask.do";
    await $.http.post({
        url: signUrl,
        headers: headers,
        body: "taskName=" + task
    }).then(async (res) => {
        var data =$.parse(res.body);
        var num = data.result;
        if (num > 0) {
            $.msg(task + "任务完成");
        } else if (num == -1) {
            $.msg(task + "重复任务");
        } else {
            $.msg(task + data.result);
        }
    });
}

// prettier-ignore
/*********************************** API *************************************/
function Env(e="untitled"){const t="undefined"!=typeof $task,s="undefined"!=typeof $loon,i="undefined"!=typeof $httpClient&&!s,r="function"==typeof require&&"undefined"!=typeof $ui,n="function"==typeof require&&!r;function o(){const e={};return["GET","POST","PUT","DELETE","HEAD","OPTIONS","PATCH"].forEach(o=>e[o.toLowerCase()]=(e=>(function(e,o){if((o="string"==typeof o?{url:o}:o).body&&o.headers&&(o.headers["Content-Type"]||(o.headers["Content-Type"]="application/x-www-form-urlencoded"),"object"==typeof(p=o.body)||p instanceof Object)){var a=o.headers["Content-Type"];"application/x-www-form-urlencoded"==a?o.body=function(e){var t="";for(var s in e)t+=s+"="+e[s]+"&";return t}(p):"application/json"==a&&(o.body=JSON.stringify(p))}const h=o.timeout,c={onRequest:()=>{},onResponse:e=>e,onTimeout:()=>{},...o.events};let f,l;if(c.onRequest(e,o),t)f=$task.fetch({method:e,...o});else if(s||i||n)f=new Promise((t,s)=>{(n?require("request"):$httpClient)[e.toLowerCase()](o,(e,i,r)=>{e?s(e):t({statusCode:i.status||i.statusCode,headers:i.headers,body:r})})});else if(r){var u=o.url,d=o.headers,p=o.body;f=new Promise((t,s)=>{$http.request({method:e,url:u,header:d,body:p,handler:function(e){e.error?s(e.error):t({statusCode:e.response.statusCode,headers:e.response.headers,body:e.data})}})})}else if(n){const t=new Request(o.url);t.method=e,t.headers=o.headers,t.body=o.body,f=new Promise((e,s)=>{t.loadString().then(s=>{e({statusCode:t.response.statusCode,headers:t.response.headers,body:s})}).catch(e=>s(e))})}const y=h?new Promise((t,s)=>{l=setTimeout(()=>(c.onTimeout(),s(`${e} URL: ${o.url} exceeds the timeout ${h} ms`)),h)}):null;return(y?Promise.race([y,f]).then(e=>(clearTimeout(l),e)):f).then(e=>c.onResponse(e))})(o,e))),e}return new class{constructor(e){this.name=e,this.logs=[],this.http=o(),this.node=(()=>{if(n){return{fs:require("fs")}}return null})(),this.initCache();Promise.prototype.delay=function(e){return this.then(function(t){return((e,t)=>new Promise(function(s){setTimeout(s.bind(null,t),e)}))(e,t)})}}initCache(){if(t&&(this.cache=JSON.parse($prefs.valueForKey(this.name)||"{}")),(s||i)&&(this.cache=JSON.parse($persistentStore.read(this.name)||"{}")),r&&(this.cache=JSON.parse($cache.get(this.name)||"{}")),n){let e="root.json";this.node.fs.existsSync(e)||this.node.fs.writeFileSync(e,JSON.stringify({}),{flag:"wx"},e=>console.log(e)),this.root={},e=`${this.name}.json`,this.node.fs.existsSync(e)?this.cache=JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)):(this.node.fs.writeFileSync(e,JSON.stringify({}),{flag:"wx"},e=>console.log(e)),this.cache={})}}persistCache(){const e=JSON.stringify(this.cache,null,2);t&&$prefs.setValueForKey(e,this.name),(s||i)&&$persistentStore.write(e,this.name),r&&$cache.set(this.name,e),n&&(this.node.fs.writeFileSync(`${this.name}.json`,e,{flag:"w"},e=>console.log(e)),this.node.fs.writeFileSync("root.json",JSON.stringify(this.root,null,2),{flag:"w"},e=>console.log(e)))}write(e,o){if(this.log(`SET ${o}`),-1!==o.indexOf("#")){if(o=o.substr(1),i||s)return $persistentStore.write(e,o);if(t)return $prefs.setValueForKey(e,o);n&&(this.root[o]=e),r&&$cache.set(o,e)}else this.cache[o]=e;this.persistCache()}read(e){return this.log(`READ ${e}`),-1===e.indexOf("#")?this.cache[e]:(e=e.substr(1),i||s?$persistentStore.read(e):t?$prefs.valueForKey(e):n?this.root[e]:r?$cache.get(e):void 0)}delete(e){if(this.log(`DELETE ${e}`),-1!==e.indexOf("#")){if(e=e.substr(1),i||s)return $persistentStore.write(null,e);if(t)return $prefs.removeValueForKey(e);n&&delete this.root[e],r&&$cache.remove(e)}else delete this.cache[e];this.persistCache()}notify(e,o="",a={}){const h=a["open-url"],c=a["media-url"];if(t&&$notify(e,"",o,a),i&&$notification.post(e,"",o+`${c?"\n多媒体:"+c:""}`,{url:h}),s){let t={};h&&(t.openUrl=h),c&&(t.mediaUrl=c),"{}"===JSON.stringify(t)?$notification.post(e,"",o):$notification.post(e,"",o,t)}if(r&&$push.schedule({title:e,body:o}),n){require("./sendNotify").sendNotify(e,o)}}msg(...e){e.length>0&&(this.logs=[...this.logs,...e]),this.log(e)}log(e){console.log(`[${this.name}] LOG: ${this.stringify(e)}`)}info(e){console.log(`[${this.name}] INFO: ${this.stringify(e)}`)}error(e){console.log(`[${this.name}] ERROR: ${this.stringify(e)}`)}wait(e){return new Promise(t=>setTimeout(t,e))}done(e={}){(t||s||i)&&$done(e)}parse(e){if("string"==typeof e||e instanceof String)try{return JSON.parse(e)}catch(t){this.msg("parse error:"+e)}else try{return JSON.parse(JSON.stringify(e))}catch(t){this.msg("parse error:"+e)}}stringify(e){if("string"==typeof e||e instanceof String)return e;try{return JSON.stringify(e)}catch(t){this.msg("stringify error:"+e)}}}(e)}
/*****************************************************************************/
