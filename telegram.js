const TG = require('telegram-bot-api')
var index = require("./newIndex")
const fs = require('fs')

const api = new TG({
    token: "2130601326:AAEIWV8GpARSxxl1GSFuPz2T6_verCenVSc"
})

// Define your message provider
const mp = new TG.GetUpdateMessageProvider()

// Set message provider and start API
api.setMessageProvider(mp)
api.start()
.then(() => {
    console.log('API is started')
})
.catch(console.err)

// Receive messages via event callback
api.on('update', update => {

    // update object is defined at
    // https://core.telegram.org/bots/api#update
    console.log(update)
    var chat_id = update.message.chat.id
    
    var i =update.message.text.split('\n')
    index.run(i[0],i[1],i[2],i[3]).then(rr=>{
        console.log(rr)
        // Send text message
    api.sendPhoto({
        chat_id: chat_id,
        caption: i[0],
        parse_mode: 'Markdown',
        photo: fs.createReadStream("./sample2.jpg")
    })
    })
   
})