
// 与えられたDateオブジェクトのインスタンスの時刻が第n何曜日であるかを返す
function getDayCount(date) {
    return Math.floor((date.getDate() - 1) / 7) + 1;
}
// -> https://qiita.com/kanta_yamaoka/items/dd830cf23ff59353824d
// を参考

// 指定のごみ収集曜日の前日の通知のためにトリガーする関数
function notifyTheNightBefore() {
    // LINE Messaging APIの利用のための下準備
    var ACCESS_TOKEN = 'Your Access Token ';
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
        body += 'おはようございます☀️今日は可燃ゴミの収集日です！'
    } else if (day == '火') 
        body += 'おはようございます☀️今日は可燃ゴミの収集日です！'
    }
    //   水曜日 リサイクルプラ
    if (day == '水') {
        body += 'おはようございます☀️今日はのリサイクルプラの収集日です！';

    }

    //   1･3回目月曜日 その他プラ
    var is1stMon = (day == '月') && (getDayCount(date) == 1)
    var is3rdMon = (day == '月') && (getDayCount(date) == 3)
    if (is1stMon || is3rdMon) {
        body += 'おはようございます☀️今日はその他プラの収集日です！'
    }
    //   2･4回目月曜日 資源ごみ・有害ごみ
    var is2ndMon = (day == '月') && (getDayCount(date) == 2)
    var is4thMon = (day == '月') && (getDayCount(date) == 4)
    if (is2ndMon || is4thMon) {
        body += 'おはようございます☀️今日は資源ごみ・有害ごみの収集日です！'
    }

    //   1･3回目木曜日 大型ゴミ(要予約)
    var is1stThur = (day == '木') && (getDayCount(date) == 1)
    var is3rdThur = (day == '木') && (getDayCount(date) == 3)
    if (is1stThur || is3rdThur) {
        body += 'おはようございます☀️今日は大型ゴミ(要予約)の収集日です！'
    }
    //   2･4回目木曜日 不燃ゴミ
    var is2ndThur = (day == '木') && (getDayCount(date) == 2)
    var is4thThur = (day == '木') && (getDayCount(date) == 4)
    if (is2ndThur || is4thThur) {
        body += 'おはようございます☀️今日は不燃ゴミの収集日です！'
    }


    //LINE Messaging APIでの実際のグループへのメッセージ送信処理

    UrlFetchApp.fetch(url, {
        'headers': {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + ACCESS_TOKEN,
        },
        'method': 'POST',
        'payload': JSON.stringify({
            'messages': [{
                'type': 'text',
                'text': body,
            }]
        })
    })

