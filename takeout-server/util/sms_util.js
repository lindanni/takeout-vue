var moment = require('moment');
var md5 = require('blueimp-md5');
var Base64 = require('js-base64').Base64;
var request = require('request');
function randomCode(length) {
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var result = '';
    for (var i= 0; i < length; i++) {
        var index = Math.ceil(Math.random()*9);
        result += chars[index];
    }
    return result;
}
exports.randomCode = randomCode

function sendCode (phone, code, callback) {
    var ACCOUNT_SID = '8a216da86d05dc0b016d111eecd1036c';
    var AUTH_TOKEN = '9cf477790eaf41199a5826d5cf45f6fa';
    var REST_URL = 'https://app.cloopen.com:8883';
    var APPID = '8aaf07086f9cc5c9016fe4f2eef70c1b';
    var sigParameter = '';
    var time = moment().format('YYYYMMDDHHmmss')
    sigParameter = md5(ACCOUNT_SID + AUTH_TOKEN+ time);
    var url = REST_URL + '/2013-12-26/Accounts/'+ACCOUNT_SID+'/SMS/TemplateSMS?sig='+sigParameter;
    var body = {
        to: phone,
        appId: APPID,
        templateId: '1',
        datas: [code, '1']
    }
    var authorization = ACCOUNT_SID+ ':' + time;
    authorization = Base64.encode(authorization)
    var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        'Content-Length': JSON.stringify(body).length+'',
        'Authorization': authorization
    }
    request({
        method: 'POST',
        url: url,
        headers: headers,
        body: body,
        json: true
    },function(error ,response, body){
        callback(body.statusCode === '000000');
    })
}
exports.sendCode = sendCode;