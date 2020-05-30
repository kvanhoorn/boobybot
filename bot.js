var TelegramBot = require('node-telegram-bot-api');
var request = require('request');
var moment = require('moment');
var fs = require('fs');

var token = fs.readFileSync('telegram-token', 'utf8').trim();
var bot = new TelegramBot(token, {polling: true});

bot.onText(/\/(start|help)/, function(msg, match) {

    var text = 'This bot can give you random boobs and butts.';

    bot.sendMessage(msg.from.id, text);

});

bot.onText(/\/(butts)/, function(msg, match) {

    console.log(msg.from.first_name, msg.from.last_name, "-", match[0]);

    butts_call(function(url) {

        bot.sendPhoto(msg.chat.id, url, {
            caption: 'You can use /butts or /boobs'
        });

    });

});

bot.onText(/\/(boobs)/, function(msg, match) {

    console.log(msg.from.first_name, msg.from.last_name, "-", match[0]);

    boobs_call(function(url) {

        bot.sendPhoto(msg.chat.id, url, {
            caption: 'You can use /butts or /boobs'
        });

    });

});

function butts_call(callback) {

    base_search_url = 'http://api.obutts.ru/noise/1'
    base_media_url = 'http://media.obutts.ru/'

    options = {
        url: base_search_url,
        headers : {}
    }

    request(options, function(error, resp, body) {

        try {
            d = JSON.parse(body);
        } catch(err) {
            console.log('error butts_call', q, err);
            callback(undefined);
            return;
        }

        if (d.length == 0) {
            callback(undefined);
            return;
        }

        options = {
            url: base_media_url + d[0].preview
        }

        request(options)
            .pipe(fs.createWriteStream('/tmp/butts.png'))
            .on('close', function() {
                callback('/tmp/butts.png')
            });

    });

}

function boobs_call(callback) {

    base_search_url = 'http://api.oboobs.ru/noise/1'
    base_media_url = 'http://media.oboobs.ru/'

    options = {
        url: base_search_url,
        headers : {}
    }

    request(options, function(error, resp, body) {

        try {
            d = JSON.parse(body);
        } catch(err) {
            console.log('error boobs_call', q, err);
            callback(undefined);
            return;
        }

        if (d.length == 0) {
            callback(undefined);
            return;
        }

        options = {
            url: base_media_url + d[0].preview
        }

        request(options)
            .pipe(fs.createWriteStream('/tmp/boobs.png'))
            .on('close', function() {
                callback('/tmp/boobs.png')
            });

    });

}
