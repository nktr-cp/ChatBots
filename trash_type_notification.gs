// @ts-nocheck

// 与えられたDateオブジェクトのインスタンスの時刻が第n何曜日であるかを返す
function getDayCount(date) {
    return Math.floor((date.getDate() - 1) / 7) + 1;
}

// 指定のごみ収集曜日の前日の通知のためにトリガーする関数
function notifyInTheMorning() {
    // LINE Messaging APIの利用のための下準備
    var ACCESS_TOKEN = 'ipapptbrGbWEmnR1lvfU1XV0DWSktzXPR+dUMtI7Wj1j3Ea/0L/6CKmAl5bKtu3/N4m8M3lWfyDmCyGrfiJd8NSVnOjyXFwVvljS3IKb9ARVbtmrnAtrF3y8rVKVYMNl4itOsaqX8wUukyqadYzn/AdB04t89/1O/w1cDnyilFU=';

    var url = 'https://api.line.me/v2/bot/message/push';
    // メッセージ本文を格納する変数
    var body = '';

    // Dateオブジェクト関連の処理の準備
    var date = new Date();
    date.setDate(date.getDate());
    var dayIndex = date.getDay()
    var day = ["日", "月", "火", "水", "木", "金", "土"][dayIndex];


    //--ゴミ出しの曜日のパターンと前日に送信するメッセージの定義--//
    //   火曜日・金曜日 可燃ゴミ
    if (day == '金') {
        body += 'おはようございます☀️' + '\n' + '今日は金曜日！' + '\n' + '可燃ゴミの収集日です😃'
    } else if (day == '火')  {
        body += 'おはようございます☀️' + '\n' + '今日は火曜日！' + '\n' + '可燃ゴミの収集日です😃'
    }
    //   水曜日 リサイクルプラ
    if (day == '水') {
        body += 'おはようございます☀️' + '\n' + '今日は水曜日！' + '\n' + 'リサイクルプラの収集日です😃';
    }

    //   1･3回目月曜日 その他プラ
    var is1stMon = (day == '月') && (getDayCount(date) == 1)
    var is3rdMon = (day == '月') && (getDayCount(date) == 3)
    if (is1stMon || is3rdMon) {
        body += 'おはようございます☀️' + '\n' + '今日は月曜日！' + '\n' + 'その他プラの収集日です😃'
    }
    //   2･4回目月曜日 資源ごみ・有害ごみ
    var is2ndMon = (day == '月') && (getDayCount(date) == 2)
    var is4thMon = (day == '月') && (getDayCount(date) == 4)
    if (is2ndMon || is4thMon) {
        body += 'おはようございます☀️' + '\n' + '今日は月曜日！' + '\n' + '資源ごみ・有害ごみの収集日です😃'
    }

    //   1･3回目木曜日 大型ゴミ(要予約)
    var is1stThur = (day == '木') && (getDayCount(date) == 1)
    var is3rdThur = (day == '木') && (getDayCount(date) == 3)
    if (is1stThur || is3rdThur) {
        body += 'おはようございます☀️' + '\n' + '今日は木曜日！' + '\n' + '大型ゴミ(要予約)の収集日です😃'
    }
    //   2･4回目木曜日 不燃ゴミ
    var is2ndThur = (day == '木') && (getDayCount(date) == 2)
    var is4thThur = (day == '木') && (getDayCount(date) == 4)
    if (is2ndThur || is4thThur) {
        body += 'おはようございます☀️' + '\n' + '今日は木曜日！' + '\n' + '不燃ゴミの収集日です😃'
    }


    //LINE Messaging APIでの実際のグループへのメッセージ送信処理

    UrlFetchApp.fetch(url, {
        'headers': {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + ACCESS_TOKEN,
        },
        'method': 'POST',
        'payload': JSON.stringify({
            'to': 'Ua78b8082c04492c129ce4c25b07a58be',
            'messages': [{
                'type': 'text',
                'text': body,
            }]
        })
    })
}
