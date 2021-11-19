var test = require("./mTestGenerator")
const Jimp = require('jimp') ;
var QR = require('./qrGenerator')
var uuid =require('uuid-random');
var fs = require('fs');
// const imagesToPdf = require("images-to-pdf")


exports.run = async (information) =>{
     return new Promise (async resolve => {

    // QR.generate().then(async r=>{
    //     const font = await Jimp.loadFont("./OpenSans-Bold.ttf.fnt");
    //     const image = await Jimp.read('./yes.jpg');
    //     const qrImage =  await Jimp.read(r.path)
    //     test1=new test(fullName,sexAge,passportNo,date,font,image,qrImage,r.name)
    //     await test1.process()
    //     resolve(test1)
    // })
    // })
    var fileName = uuid()
    if (!fs.existsSync(fileName)){
        fs.mkdirSync(fileName);
    }
    Promise.all([
        QR.generateUrl(fileName),
        QR.generateJson(fileName)
    ])
    .then(async r=>{
console.log(r)
    
        
    var fonts = {
        inboxname : await Jimp.loadFont("./fonts/inboxname.fnt") ,
        newlefttopfullname: await Jimp.loadFont("./fonts/newlefttopfullname.fnt"),
        newrighttopfullname : await Jimp.loadFont("./fonts/newrighttopfullname.fnt"),
        testnumbertopright: await Jimp.loadFont("./fonts/testnumbertopright.fnt"),
        newFileBlue40 : await Jimp.loadFont("./fonts/newBlue40/newFileblue40.fnt"),

    }
    const qrImage =  await Jimp.read('./'+r[0].path)
    const mQrImage = await Jimp.read('./'+r[1].path)
    const image = await Jimp.read('./iraqnew1.jpg');
    information.mTestNo=r[1].test_id
    information.mAccount = r[1].account_id
    // var information = {
    //     mTestNo:r[1].test_id,
    //     mAccount : r[1].account_id,
    //     firstName : "MOHAMMAD",
    //     lastName: "NAEIMI",
    //     fotherName : "KHALIL",
    //     sex : "male",
    //     age:32,
    //     passportNo:"J2342342",
    //     date : "2021 - 11 - 21",
    //     phone:"00989394025769",
    //     dob:"1989 2 12"
    // }
    var fn = r[0].name
    test1 = new test(information,fonts,image,mQrImage,qrImage,fileName)
    await test1.process()
    // await imagesToPdf([`${fileName}/${fileName}.jpg`], `${fileName}/${fileName}.pdf`)
    resolve(test1)
    })
    .catch(e=>{
        console.error("e:",e)
    })
})
}

// this.run()