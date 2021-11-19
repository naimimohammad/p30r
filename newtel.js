const TeleBot = require('telebot');
var I = require('./newIndex')
var fs = require('fs')
const bot = new TeleBot("2130601326:AAEIWV8GpARSxxl1GSFuPz2T6_verCenVSc");
bot.on('text', (msg) => msg.reply.text(msg.text));
bot.on('callbackQuery', function (msg) {
    var data = JSON.parse(msg.data);
})

bot.on(['/start', ], msg => {

    let replyMarkup = bot.keyboard([
        ['/start'],
        ['/help'],
        ['/sample'],
    ], {resize: true});
    var t = `برای درست کردن تست شما باید یک پیام شبیه پیام زیر ارسال نمایید 
    که خط اول ترکیبی از نام کوچک شما نام کوچک پدر بزرگوارتان و در اخر فامیلی .در خط دوم شما جنسیت خودتان با علامت , و سنتان را قرار میدهید و در خط سوم شماره پاسپورت را و در خط اخر تاریخی که تست برای ان چاپ شود`
    console.log(replyMarkup)
    return bot.sendMessage(msg.from.id,  t, {replyMarkup});

});

// Buttons
bot.on(['/sample'], msg => {
    
    console.log(msg)
    var t = `110121\nMOHAMMAD\nMOSTAFAVI\nJALIL\nJ12345677\n1980-12-6\nmale\n34\n+9893012345678\n2022-12-4\n`

    return bot.sendMessage(msg.from.id, t);

});
bot.on(['/help'], msg => {

    t = `کد معرف\nنام کوچک\nنام خانوادگی\nنام پدر\nشماره پاسپورت\nتاریخ تولد به میلادی\nجنسیت(مرد=male,زن=female)\nسن\nشماره تلفن(بجای 00 علامت +بگذارید)\nتاریخ تست به میلادی\n`

    return bot.sendMessage(msg.from.id, t);

});
bot.on('text', (msg) => {
    var keyboard = ["/start","/sample","/help"]
    if (!keyboard.includes(msg.text) ){
        msgArr = msg.text.split('\n')
        if (msgArr.length == 10){
            if (msgArr[0]=="110121"){
                var information = {
                   
                    firstName : msgArr[1],
                    lastName: msgArr[2],
                    fotherName : msgArr[3],
                    sex : msgArr[6],
                    age:msgArr[7],
                    passportNo:msgArr[4],
                    date : msgArr[9],
                    phone:msgArr[8],
                    dob:msgArr[5]
                }

                I.run(information).then(r=>{
                    bot.sendPhoto(msg.chat.id, fs.createReadStream(`${r.directory}/${r.directory}.jpg`), {caption:`${r.firstName} ${r.lastName}`})
                })
                .catch(e=>{
                    console.log(e)
                    msg.reply.text("تولید تست به مشکل خورد دوباره سعی کنید")
                })
                msg.reply.text("در حال ساخت تست لدفن صبر کنید")
                
            }
            else {
                msg.reply.text("کد معرف را درست وارد کنید")
            }
        }
        else {
            msg.reply.text("لدفا اطلاعات را درست وارد کنید برای اطلاعات بیشتر از دستور /help یا /sample استفاده کنید")
        }
        }
    
    msg.reply.text(msg.text)});
bot.start();

