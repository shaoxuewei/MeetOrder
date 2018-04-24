// import { GetAccessTokenApi, GetTicketApi } from "./api/api";
window.onload = function () {
    document.body.ontouchmove = function (e) {
        e.preventDefault();
    };
}

function GetQueryString(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}

if (sessionStorage.getItem('openid') == null) {
    var access_code;
    if (sessionStorage.getItem('code') == null || sessionStorage.getItem('code') == "") {
        access_code = GetQueryString('code');
        sessionStorage.setItem('code', access_code)
        var stateObject = {};
        var title = '';
        var newUrl = '/WeiXin/?#' + window.location.href.split('#')[1];
        history.pushState(stateObject, title, newUrl)
    } else {
        access_code = sessionStorage.getItem('code')
    }
    if (sessionStorage.getItem('code') == null || sessionStorage.getItem('code') == "") {
        // 改appid和uri地址
        var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx965f031c1746f165&redirect_uri=http%3a%2f%2ftest.heiniaozhi.cn%2fWeiXin%2f%23%2f&response_type=code&scope=snsapi_userinfo#wechat_redirect';
        location.href = url;
    } else {
        GetAccessTokenApi(access_code).then(res => {
            sessionStorage.setItem('openid', res.Data.OpenIdNow)
        })
    }
}

//随机数生成算法
// function getRandomString() {
//     let base = "abcdefghijklmnopqrstuvwxyz0123456789";
//     let sb = '';
//     for (let i = 0; i < 16; i++) {
//         let number = Math.round(Math.random() * 36)
//         sb += base[number];
//     }
//     return sb;
// }

// function getSignature(noncestr, timestamp) {
//     GetTicketApi().then(res => {
//         let jsapi_ticket = res.Data.ticket
//         let url = window.location.href.split('#')[0]
//         let str = "jsapi_ticket=" + jsapi_ticket + "&noncestr=" + noncestr + "&timestamp=" + timestamp + "&url=" + url
//         wxConfig(noncestr, timestamp, hex_sha1(str))
//     }).catch(err => {
//         alert(err)
//     })
// }
// let noncestr = getRandomString()//随机字符串  
// let timestamp = Date.parse(new Date()) / 1000//时间戳  
// getSignature(noncestr, timestamp)
// function wxConfig(noncestr, timestamp, signature) {
//     wx.config({
//         'debug': false, //调试阶段建议开启  
//         'appId': "wx965f031c1746f165",//APPID  
//         'timestamp': timestamp,//上面main方法中拿到的时间戳timestamp  
//         'nonceStr': noncestr,//上面main方法中拿到的随机数nonceStr  
//         'signature': signature,//上面main方法中拿到的签名signature  
//         'jsApiList': ["checkJsApi", "scanQRCode"]
//     });
//     wx.ready(function () {
//         wx.checkJsApi({
//             jsApiList: ["checkJsApi", 'scanQRCode'],
//             success: function (res) {
//                 if (res.checkResult.getLocation == false) {
//                     alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
//                     return;
//                 }
//             }
//         });

//     })
// }

// sessionStorage.setItem('openid', 'oBjaPuN8LE370imQ2HP2RKnZ_df0')

