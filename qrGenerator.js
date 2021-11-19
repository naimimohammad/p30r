const fs = require('fs');
var qr = require('qr-image');
var uuid =require('uuid-random');

exports.generateUrl =async function(fileName) {
    return new Promise (async resolve => {
    // var fileName = uuid()
    var qrImage = await qr.image(`http://iraqairport.covid19resultvalidation.com/storage/reports/${fileName}.pdf`, { type: 'png',size:4 });
    qrImage.pipe(require('fs').createWriteStream(`${fileName}.png`));
    qrImage.on('end', async ()=>{
        fs.renameSync(`${fileName}.png`,`./${fileName}/${fileName}.png`)
        resolve({path:`${fileName}/${fileName}.png`,name:fileName})
    })
    })
}

exports.generateJson = async function(directory) {
    return new Promise (async resolve => {
        var fileName = directory
        var account_id = testIdandAcountGenerator()
        var test_id = indexHandler()
        var qrImage = await qr.image(`{"account_id":"${account_id}","test_id":"${test_id}"}`, { type: 'png',size:8 });
        qrImage.pipe(require('fs').createWriteStream(`${test_id}.png`));
        qrImage.on('end', async ()=>{
            fs.renameSync(`${test_id}.png`,`./${fileName}/${test_id}.png`)
            resolve({path:`${fileName}/${test_id}.png`,name:test_id,
                    account_id:account_id,test_id:test_id})
        })
        })
}

var testIdandAcountGenerator = ()=>{
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 56; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}
var indexHandler = function(){
    var number = fs.readFileSync('./indexNum')
    number = parseInt(number)
    number++
    number = number.toString()
    if (number.length == 4) number="0"+number
    fs.writeFileSync("./indexNum",number)
    return number
}