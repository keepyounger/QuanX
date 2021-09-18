/*
Last Modified time: 2021-9-18
心悦猫咪
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
============Quantumultx===============
[task_local]
#心悦猫咪
0 10,15,20 * * * xinyuemaomi.js, tag=心悦猫咪, img-url=https://raw.githubusercontent.com/keepyounger/QuanX/main/Tasks/xinyue.png, enabled=true

================Loon==============
[Script]
cron "0 10,15,20 * * *" script-path=xinyuemaomi.js,tag=心悦猫咪

===============Surge=================
心悦猫咪 = type=cron,cronexp="0 10,15,20 * * *",wake-system=1,timeout=3600,script-path=xinyuemaomi.js

============小火箭=========
心悦猫咪 = type=cron,script-path=xinyuemaomi.js, cronexpr="0 10,15,20 * * *", timeout=3600, enable=true

============青龙===========
cron: 0 10,15,20 * * *
new Env('心悦猫咪');
 */

const $ = API("心悦猫咪", true); // API("APP") --> 无log输出

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

function objectBodyToString(object) {
    var str = ""
    for (var i in object) {
        var key = i;
        var value = object[key];
        str += key + "=" + value + "&"
    }
    return str
}

var power = 0;
var score = 0;

!(async () => {
    await maomiStatus();
    await $.notify($.name, $.logs.join('\n'));
})().catch((e) => $.log(e + ""))
    .finally(() => $.done());

async function maomiStatus() {
    await $.http.get({
        url: "https://apps.xinyue.qq.com/maomi/pet_api_info/get_user?callback=cb29edd8&acctype=qc&access_token=1C98366958A03BDEBC893514169AAEAC&appid=101484782&openid=7720CF4D27C3814FFAEC4C7292347609",
        headers: {
            "Host":"apps.xinyue.qq.com",
            "Accept":"*/*",
            "Connection":"keep-alive",
            "Cookie":"access_token=1C98366958A03BDEBC893514169AAEAC; appid=101484782; openid=7720CF4D27C3814FFAEC4C7292347609; IED_LOG_INFO2_QC=userUin%3D%26uin%3D%26nickName%3DJackie%26nickname%3DJackie%26userLoginTime%3D1631502468%26openid%3D7720CF4D27C3814FFAEC4C7292347609%26logtype%3Dqc%26loginType%3Dqc%26face%3Dhttp%253A%252F%252Fthirdqq.qlogo.cn%252Fg%253Fb%253Doidb%2526k%253DIfDYIr1o2gyuttLIdIqEqA%2526s%253D40%2526t%253D1554181098; pgv_info=ssid=s7615486425; pgv_pvid=1211201646; tokenParams=%3FADTAG%3Dad_app.gf.chanchu; xinyueqqcomrouteLine=a20180912tgclubcat_a20171031lclk_a20180912tgclubcat_a20180912tgclubcat; access_token=1C98366958A03BDEBC893514169AAEAC; acctype=qc; appid=101484782; openid=7720CF4D27C3814FFAEC4C7292347609; ts_last=xinyue.qq.com/act/a20180912tgclubcat/index.html; ts_uid=1320046576; xyapp_login_type=qc; xyapp_login_type=qc; eas_sid=u1F6P3q1s550T1L2W6X423u9k8; PTTuserFirstTime=1631491200000; d85299007cc23878d82126f18b8020a3=1; isHostDate=18883; ts_refer=ADTAGad_app.gf.chanchu; weekloop=0-0-0-38",
            "User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 tgclub/5.7.14 Scale/3.00",
            "Accept-Language":"zh-cn",
            "Referer":"https://xinyue.qq.com/act/a20180912tgclubcat/index.html"
        }
    }).then(async (res) => {
        var data = res.body;
        var json = JSON.parse(data.match(/^cb29edd8\((.*)\)$/)[1]);
       
        var pet = json.data.pet;
        var status = pet.status;
        var remain_time = pet.remain_time;
 
        if (status == 0) {
            $.msg("历练未开始, 尝试进入关卡4")
            await lilianStart(4);
        } else if (status == 1) {
            $.msg("正在历练, 剩余时间" + (remain_time/60).toFixed(0) + "分" + remain_time%60 +"秒")
        } else if (status == 2) {
            $.msg("历练已结束")
            await lilianEnd();
        }
    });
}

async function lilianStart(num) {
    var level = num || 2;
    await $.http.get({
        url: "https://apps.xinyue.qq.com/maomi/pet_api_info/make_money_new?uin=992282588&adLevel="+level+"&adPower=238&callback=cbec1c4&acctype=qc&access_token=1C98366958A03BDEBC893514169AAEAC&appid=101484782&openid=7720CF4D27C3814FFAEC4C7292347609",
        headers: {
            "Host":"apps.xinyue.qq.com",
            "Accept":"*/*",
            "Connection":"keep-alive",
            "Cookie":"access_token=1C98366958A03BDEBC893514169AAEAC; appid=101484782; openid=7720CF4D27C3814FFAEC4C7292347609; xyapp_login_type=qc; IED_LOG_INFO2_QC=userUin%3D%26uin%3D%26nickName%3DJackie%26nickname%3DJackie%26userLoginTime%3D1631501690%26openid%3D7720CF4D27C3814FFAEC4C7292347609%26logtype%3Dqc%26loginType%3Dqc%26face%3Dhttp%253A%252F%252Fthirdqq.qlogo.cn%252Fg%253Fb%253Doidb%2526k%253DIfDYIr1o2gyuttLIdIqEqA%2526s%253D40%2526t%253D1554181098; pgv_info=ssid=s7615486425; pgv_pvid=1211201646; tokenParams=%3FADTAG%3Dad_app.gf.chanchu; xinyueqqcomrouteLine=a20180912tgclubcat_a20171031lclk_a20180912tgclubcat; access_token=1C98366958A03BDEBC893514169AAEAC; acctype=qc; appid=101484782; openid=7720CF4D27C3814FFAEC4C7292347609; ts_last=xinyue.qq.com/act/a20180912tgclubcat/index.html; ts_uid=1320046576; xyapp_login_type=qc; eas_sid=u1F6P3q1s550T1L2W6X423u9k8; PTTuserFirstTime=1631491200000; d85299007cc23878d82126f18b8020a3=1; isHostDate=18883; ts_refer=ADTAGad_app.gf.chanchu; weekloop=0-0-0-38",
            "User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 tgclub/5.7.14 Scale/3.00",
            "Accept-Language":"zh-cn",
            "Referer":"https://xinyue.qq.com/act/a20180912tgclubcat/index.html"
        }
    }).then(async (res) => {
        var data = res.body;
        var json = JSON.parse(data.match(/^cbec1c4\((.*)\)$/)[1]);
        var resStatus = json.status
        if (resStatus == 1) {
            var pet = json.data
            var status = pet.status;
            var remain_time = pet.remain_time;
            //历练成功
            if (status == 1 && remain_time > 0) {
                $.msg("开始历练，关卡" + level)
            }
        } else {
            if (level > 2) {
                $.msg("历练错误, 历练未开始, 尝试进入关卡3")
                await $.wait(timeout(3000)).then(async () => {
                    await lilianStart(level - 1);
                });
            } else {
                $.msg("历练错误，请手动处理")
            }
        }
    });
}

async function lilianEnd() {
    await $.http.post({
        url: "https://act.game.qq.com/ams/ame/amesvr?ameVersion=0.3&sServiceType=tgclub&iActivityId=141920&sServiceDepartment=xinyue&sSDID=ceb8ee081f8c6aa533d70b8887367d03&sMiloTag=AMS-MILO-141920-532968-7720CF4D27C3814FFAEC4C7292347609-1627960622476-Qsz22c&_=1627960622476",
        headers: {
            "Accept":"*/*",
            "Origin":"https://xinyue.qq.com",
            "Cookie":"access_token=1C98366958A03BDEBC893514169AAEAC; acctype=qc; appid=101484782; openid=7720CF4D27C3814FFAEC4C7292347609; refresh_token=; xyapp_login_type=qc; eas_sid=B176C2f7L9k559S6y6G0t5q7c7; pgv_info=ssid=s4121196540; pgv_pvid=1211201646; xinyueqqcomrouteLine=a20180912tgclubcat",
            "Content-Type":"application/x-www-form-urlencoded",
            "Host":"act.game.qq.com",
            "Connection":"keep-alive",
            "User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 tgclub/5.7.13 Scale/3.00",
            "Referer":"https://xinyue.qq.com/act/a20180912tgclubcat/index.html",
            "Accept-Language":"zh-cn"
        },
        body: objectBodyToString({
            "gameId":"",
            "sArea":"",
            "iSex":"",
            "sRoleId":"",
            "iGender":"",
            "extraStr":"%2522mod1%2522%253A%25221%2522%252C%2522mod2%2522%253A%25220%2522%252C%2522mod3%2522%253A%2522x42%2522",
            "sServiceType":"tgclub",
            "objCustomMsg":"",
            "areaname":"",
            "roleid":"",
            "rolelevel":"",
            "rolename":"",
            "areaid":"",
            "iActivityId":"141920",
            "iFlowId":"532968",
            "g_tk":"1842395457",
            "e_code":"0",
            "g_code":"0",
            "eas_url":"http://xinyue.qq.com/act/a20180912tgclubcat/",
            "eas_refer":"http://noreferrer/?reqid=b12de3eb-920f-43c6-adfe-1c5d8bb51c94&version=24",
            "sServiceDepartment":"xinyue"
        })
    }).then(async (res) => {
        $.msg("结束历练");
        await checkScore();
    });
}

async function checkScore() {
    await $.http.post({
        url: "https://act.game.qq.com/ams/ame/amesvr?ameVersion=0.3&sServiceType=tgclub&iActivityId=141920&sServiceDepartment=xinyue&sSDID=ceb8ee081f8c6aa533d70b8887367d03&sMiloTag=AMS-MILO-141920-532974-7720CF4D27C3814FFAEC4C7292347609-1627959664505-GyKw5u&_=1627959664505",
        headers: {
            "Accept":"*/*",
            "Origin":"https://xinyue.qq.com",
            "Cookie":"access_token=1C98366958A03BDEBC893514169AAEAC; acctype=qc; appid=101484782; openid=7720CF4D27C3814FFAEC4C7292347609; refresh_token=; xyapp_login_type=qc; eas_sid=B176C2f7L9k559S6y6G0t5q7c7; pgv_info=ssid=s4121196540; pgv_pvid=1211201646; xinyueqqcomrouteLine=a20180912tgclubcat",
            "Content-Type":"application/x-www-form-urlencoded",
            "Host":"act.game.qq.com",
            "Connection":"keep-alive",
            "User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 tgclub/5.7.13 Scale/3.00",
            "Referer":"https://xinyue.qq.com/act/a20180912tgclubcat/index.html",
            "Accept-Language":"zh-cn"
        },
        body: objectBodyToString({
            "extraStr":"%2522mod1%2522%253A%25221%2522%252C%2522mod2%2522%253A%25220%2522%252C%2522mod3%2522%253A%2522x42%2522",
            "iActivityId":"141920",
            "iFlowId":"532974",
            "g_tk":"1842395457",
            "e_code":"0",
            "g_code":"0",
            "eas_url":"http://xinyue.qq.com/act/a20180912tgclubcat/",
            "eas_refer":"http://noreferrer/?reqid=4ea7cad5-0d68-4f80-8ad6-863040661aba&version=24",
            "sServiceDepartment":"xinyue",
            "sServiceType":"tgclub"
        })
    }).then(async (res) => {
        var data = $.parse(res.body);
        power = data.modRet.sOutValue1
        score = data.modRet.sOutValue2
        $.msg("战力" + power + "，体力" + score)
        if (score >= 20) {
            await pairs();
        } else {
            $.msg("体力不足");
            await maomiStatus();
        }
    });
}

async function pairs() {
    await $.http.post({
        url: "https://act.game.qq.com/ams/ame/amesvr?ameVersion=0.3&sServiceType=tgclub&iActivityId=141920&sServiceDepartment=xinyue&sSDID=ceb8ee081f8c6aa533d70b8887367d03&sMiloTag=AMS-MILO-141920-471145-7720CF4D27C3814FFAEC4C7292347609-1626865949978-aaOrrD&_=1626865949978",
        headers: {
            "Accept-Encoding":"gzip, deflate, br",
            "Origin":"https://xinyue.qq.com",
            "Connection":"keep-alive",
            "Cookie":"access_token=1C98366958A03BDEBC893514169AAEAC; acctype=qc; appid=101484782; openid=7720CF4D27C3814FFAEC4C7292347609; refresh_token=; xyapp_login_type=qc; pgv_info=ssid=s4643183028; pgv_pvid=1211201646; tokenParams=%3FADTAG%3Dad_app.gf.chanchu; ieg_ams_session_token=; ieg_ams_token=; ieg_ams_token_time=; xinyueqqcomrouteLine=a20180912tgclubcat_a20171031lclk_a20171031lclk_a20180912tgclubcat_a20210625jnh_a20210625jnh_a20180912tgclubcat; eas_sid=7116x2b6W7m9b6e6c8K9p5x8A6",
            "Content-Type":"application/x-www-form-urlencoded",
            "Host":"act.game.qq.com",
            "Accept":"*/*",
            "User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 14_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 tgclub/5.7.13 Scale/3.00",
            "Referer":"https://xinyue.qq.com/act/a20180912tgclubcat/index.html",
            "Accept-Language":"zh-cn"
        },
        body: objectBodyToString({
            "extraStr":"%2522mod1%2522%253A%25221%2522%252C%2522mod2%2522%253A%25220%2522%252C%2522mod3%2522%253A%2522x42%2522",
            "iActivityId":"141920",
            "iFlowId":"471145",
            "g_tk":"1842395457",
            "e_code":"0",
            "g_code":"0",
            "eas_url":"http://xinyue.qq.com/act/a20180912tgclubcat/",
            "eas_refer":"http://noreferrer/?reqid=508eace6-bfe0-4118-bcef-a7274569f726&version=24",
            "sServiceDepartment":"xinyue",
            "sServiceType":"tgclub"
        })
    }).then(async (res) => {
        var data = $.parse(res.body);
        var match = data.modRet.jData.matchPower;
        if (match > power) {
            $.msg("匹配战力: " + match + ", 战力太高重新匹配")
            await $.wait(timeout()).then(async() => {
                await pairs();
            });
        } else {
            $.msg("匹配战力: " + match + ", 开始战斗")
            await $.wait(timeout()).then(async() => {
                await fightting();
            });
        }
    });
}

async function fightting() {
    await $.http.post({
        url: "https://act.game.qq.com/ams/ame/amesvr?ameVersion=0.3&sServiceType=tgclub&iActivityId=141920&sServiceDepartment=xinyue&sSDID=ceb8ee081f8c6aa533d70b8887367d03&sMiloTag=AMS-MILO-141920-508006-7720CF4D27C3814FFAEC4C7292347609-1626865953838-2W8CSK&_=1626865953838",
        headers: {
            "Accept-Encoding":"gzip, deflate, br",
            "Origin":"https://xinyue.qq.com",
            "Connection":"keep-alive",
            "Cookie":"access_token=1C98366958A03BDEBC893514169AAEAC; acctype=qc; appid=101484782; openid=7720CF4D27C3814FFAEC4C7292347609; refresh_token=; xyapp_login_type=qc; pgv_info=ssid=s4643183028; pgv_pvid=1211201646; tokenParams=%3FADTAG%3Dad_app.gf.chanchu; ieg_ams_session_token=; ieg_ams_token=; ieg_ams_token_time=; xinyueqqcomrouteLine=a20180912tgclubcat_a20171031lclk_a20171031lclk_a20180912tgclubcat_a20210625jnh_a20210625jnh_a20180912tgclubcat; eas_sid=7116x2b6W7m9b6e6c8K9p5x8A6",
            "Content-Type":"application/x-www-form-urlencoded",
            "Host":"act.game.qq.com",
            "Accept":"*/*",
            "User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 14_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 tgclub/5.7.13 Scale/3.00",
            "Referer":"https://xinyue.qq.com/act/a20180912tgclubcat/index.html",
            "Accept-Language":"zh-cn"
        },
        body: objectBodyToString({
            "gameId":"",
            "sArea":"",
            "iSex":"",
            "sRoleId":"",
            "iGender":"",
            "username":"Jackie",
            "extraStr":"%2522mod1%2522%253A%25221%2522%252C%2522mod2%2522%253A%25220%2522%252C%2522mod3%2522%253A%2522x42%2522",
            "sServiceType":"tgclub",
            "objCustomMsg":"",
            "areaname":"",
            "roleid":"",
            "rolelevel":"",
            "rolename":"",
            "areaid":"",
            "iActivityId":"141920",
            "iFlowId":"508006",
            "g_tk":"1842395457",
            "e_code":"0",
            "g_code":"0",
            "eas_url":"http://xinyue.qq.com/act/a20180912tgclubcat/",
            "eas_refer":"http://noreferrer/?reqid=9fa57d7b-ad38-4ee0-80bd-2af191675caf&version=24",
            "sServiceDepartment":"xinyue"
        })
    }).then(async (res) => {
        var data = $.parse(res.body);
        if (data.ret == 0) {
            $.msg(data.modRet.sMsg);
        } else {
            $.msg(data.msg);
        }
        await checkScore();
    });
}

// prettier-ignore
/*********************************** API *************************************/
function ENV(){const e="undefined"!=typeof $task,t="undefined"!=typeof $loon,s="undefined"!=typeof $httpClient&&!t,i="function"==typeof require&&"undefined"!=typeof $ui;return{isQX:e,isLoon:t,isSurge:s,isNode:"function"==typeof require&&!i,isJSBox:i}}function HTTP(e={baseURL:""}){const{isQX:t,isLoon:s,isSurge:i,isJSBox:n,isNode:o}=ENV(),r=/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/;const h={};return["GET","POST","PUT","DELETE","HEAD","OPTIONS","PATCH"].forEach(a=>h[a.toLowerCase()]=(h=>(function(h,a){a="string"==typeof a?{url:a}:a;const u=e.baseURL;u&&!r.test(a.url||"")&&(a.url=u?u+a.url:a.url),a.body&&a.headers&&!a.headers["Content-Type"]&&(a.headers["Content-Type"]="application/x-www-form-urlencoded");const c=(a={...e,...a}).timeout,l={onRequest:()=>{},onResponse:e=>e,onTimeout:()=>{},...a.events};let f,d;if(l.onRequest(h,a),t)f=$task.fetch({method:h,...a});else if(s||i||o)f=new Promise((e,t)=>{(o?require("request"):$httpClient)[h.toLowerCase()](a,(s,i,n)=>{s?t(s):e({statusCode:i.status||i.statusCode,headers:i.headers,body:n})})});else if(n){var p=a.url,y=a.headers,g=a.body;f=new Promise((e,t)=>{$http.request({method:h,url:p,header:y,body:g,handler:function(s){s.error?t(s.error):e({statusCode:s.response.statusCode,headers:s.response.headers,body:s.data})}})})}else if(o){const e=new Request(a.url);e.method=h,e.headers=a.headers,e.body=a.body,f=new Promise((t,s)=>{e.loadString().then(s=>{t({statusCode:e.response.statusCode,headers:e.response.headers,body:s})}).catch(e=>s(e))})}const $=c?new Promise((e,t)=>{d=setTimeout(()=>(l.onTimeout(),t(`${h} URL: ${a.url} exceeds the timeout ${c} ms`)),c)}):null;return($?Promise.race([$,f]).then(e=>(clearTimeout(d),e)):f).then(e=>l.onResponse(e))})(a,h))),h}function API(e="untitled",t=!1){const{isQX:s,isLoon:i,isSurge:n,isNode:o,isJSBox:r}=ENV();return new class{constructor(e,t){this.name=e,this.debug=t,this.logs=[],this.http=HTTP(),this.env=ENV(),this.node=(()=>{if(o){return{fs:require("fs")}}return null})(),this.initCache();Promise.prototype.delay=function(e){return this.then(function(t){return((e,t)=>new Promise(function(s){setTimeout(s.bind(null,t),e)}))(e,t)})}}initCache(){if(s&&(this.cache=JSON.parse($prefs.valueForKey(this.name)||"{}")),(i||n)&&(this.cache=JSON.parse($persistentStore.read(this.name)||"{}")),r&&(this.cache=JSON.parse($cache.get(this.name)||"{}")),o){let e="root.json";this.node.fs.existsSync(e)||this.node.fs.writeFileSync(e,JSON.stringify({}),{flag:"wx"},e=>console.log(e)),this.root={},e=`${this.name}.json`,this.node.fs.existsSync(e)?this.cache=JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)):(this.node.fs.writeFileSync(e,JSON.stringify({}),{flag:"wx"},e=>console.log(e)),this.cache={})}}persistCache(){const e=JSON.stringify(this.cache,null,2);s&&$prefs.setValueForKey(e,this.name),(i||n)&&$persistentStore.write(e,this.name),r&&$cache.set(this.name,e),o&&(this.node.fs.writeFileSync(`${this.name}.json`,e,{flag:"w"},e=>console.log(e)),this.node.fs.writeFileSync("root.json",JSON.stringify(this.root,null,2),{flag:"w"},e=>console.log(e)))}write(e,t){if(this.log(`SET ${t}`),-1!==t.indexOf("#")){if(t=t.substr(1),n||i)return $persistentStore.write(e,t);if(s)return $prefs.setValueForKey(e,t);o&&(this.root[t]=e),r&&$cache.set(t,e)}else this.cache[t]=e;this.persistCache()}read(e){return this.log(`READ ${e}`),-1===e.indexOf("#")?this.cache[e]:(e=e.substr(1),n||i?$persistentStore.read(e):s?$prefs.valueForKey(e):o?this.root[e]:r?$cache.get(e):void 0)}delete(e){if(this.log(`DELETE ${e}`),-1!==e.indexOf("#")){if(e=e.substr(1),n||i)return $persistentStore.write(null,e);if(s)return $prefs.removeValueForKey(e);o&&delete this.root[e],r&&$cache.remove(e)}else delete this.cache[e];this.persistCache()}notify(e,t="",h="",a={}){const u=a["open-url"],c=a["media-url"];if(s&&$notify(e,t,h,a),n&&$notification.post(e,t,h+`${c?"\n多媒体:"+c:""}`,{url:u}),i){let s={};u&&(s.openUrl=u),c&&(s.mediaUrl=c),"{}"===JSON.stringify(s)?$notification.post(e,t,h):$notification.post(e,t,h,s)}if(r){const s=h+(u?`\n点击跳转: ${u}`:"")+(c?`\n多媒体: ${c}`:"");$push.schedule({title:e,body:t+s})}if(o){const s=t+(h+(u?`\n点击跳转: ${u}`:"")+(c?`\n多媒体: ${c}`:""));require("./sendNotify").sendNotify(e,s)}}msg(...e){e.length>0&&(this.logs=[...this.logs,...e]),this.log(e)}log(e){this.debug&&console.log(`[${this.name}] LOG: ${this.stringify(e)}`)}info(e){console.log(`[${this.name}] INFO: ${this.stringify(e)}`)}error(e){console.log(`[${this.name}] ERROR: ${this.stringify(e)}`)}wait(e){return new Promise(t=>setTimeout(t,e))}done(e={}){(s||i||n)&&$done(e)}parse(e){if("string"==typeof e||e instanceof String)try{return JSON.parse(e)}catch(e){this.msg("parse出错了")}else try{return JSON.parse(JSON.stringify(e))}catch(e){this.msg("parse出错了")}}stringify(e){if("string"==typeof e||e instanceof String)return e;try{return JSON.stringify(e,null,2)}catch(e){this.msg("stringify出错了")}}}(e,t)}
/*****************************************************************************/
