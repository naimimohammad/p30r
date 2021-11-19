
const Jimp = require('jimp') ;
var fs = require('fs')

module.exports = MCreateTest

function MCreateTest(information,fonts,testImage,mQrImage,qrImage,directory) {
    var indexHandler = function(){
        var number = fs.readFileSync('./indexNum')
        number = parseInt(number)
        number++
        number = number.toString()
        if (number.length == 4) number="0"+number
        fs.writeFileSync("./indexNum",number)
        return number
    }
this.directory = directory
this.testNo = indexHandler().toString()
this.testImage  = testImage   
this.qrImage = qrImage
this.mQrImage = mQrImage
this.fonts = fonts
this.firstName = information.firstName;
this.fotherName = information.fotherName;
this.lastName = information.lastName;
this.mTestNo  = information.mTestNo;
this.mAccount = information.mAccount
this.age = information.age;
this.sex = information.sex;
this.dob = information.dob;
this.phone = information.phone
this.passportNo = information.passportNo;
this.date = information.date

var textPosition = {
    testNo:715,
    fullName : 850,
    sexAge : 980,
    passportNo : 1110,
    date : 1230,
}

this.position = {
    mTestNo :{
        left: 2106,
        right: 2302,
        y: 375,
        margin :"right",
        font : this.fonts.testnumbertopright,
        value : this.mTestNo,
    },
    mAccount :{
        left: 845,
        right: 2308,
        y: 269,
        margin : "right",
        font : this.fonts.newFileBlue40,
        value : this.mAccount
    },
    mTitle :{
        left: 800,
        right: 2313,
        y: 432,
        margin :"right",
        font : this.fonts.newrighttopfullname,
        value : `${this.firstName} ${this.lastName} , ${this.fotherName}`
    },
    mfullName :{
        left: 400,
        right: 1213,
        y: 595,
        margin :"right",
        font : this.fonts.newlefttopfullname,
        value : `${this.firstName} ${this.lastName} , ${this.fotherName}`
    },
    mAge : {
        left: 1165,
        right: 1213,
        y: 678,
        margin : "right",
        font : this.fonts.newlefttopfullname,
        value : this.age.toString()
    },
    mSex : {
        left: 1070,
        right: 1213,
        y: 766,
        margin : "right",
        font : this.fonts.newlefttopfullname,
        value : this.sex
    },
    mDOB : {
        left: 2100,
        right: 2313,
        y: 600,
        margin :"right",
        font : this.fonts.newlefttopfullname,
        value : this.dob
    },
    mPassportNo : {
        left: 2090,
        right: 2313,
        y: 683,
        margin : "right",
        font : this.fonts.newlefttopfullname,
        value : this.passportNo
    },
    mPhone : {
        left: 1950,
        right: 2313,
        y: 766,
        margin : "right",
        font : this.fonts.newlefttopfullname,
        value : this.phone
    },
    testNo :{
        left: 800,
        right: 1640,
        y: 1305,
        margin : "center",
        font : this.fonts.inboxname,
        value : this.testNo
    },
    fullName : {
        left: 800,
        right: 1640,
        y: 1365,
        margin :"center",
        font : this.fonts.inboxname,
        value : `${this.firstName} ${this.fotherName} ${this.lastName}`
    },
    sexAge : {
        left: 800,
        right: 1640,
        y: 1432,
        margin : "center",
        font : this.fonts.inboxname,
        value : `${this.sex},${this.age}`
    },
    passportNo : {
        left: 800,
        right: 1640,
        y: 1497,
        margin : "center",
        font : this.fonts.inboxname,
        value : this.passportNo
    },
    date : {
        left: 800,
        right: 1640,
        y: 1558,
        margin : "center",
        font : this.fonts.inboxname,
        value : this.date
    },
}
// console.log(this)
this.process = async function(){
        for (var v in this.position){
            this.Text(this.position[v])
       }
       var w = this.testImage.bitmap.width
    
       await this.testImage.composite( this.qrImage.color([
           { apply: 'red', params: [92] },
           { apply: 'blue', params: [92] },
           { apply: 'green', params: [92] }]), w/2-this.qrImage.bitmap.width/2, 2135 );
        await this.testImage.composite(this.mQrImage.color([
            { apply: 'red', params: [69] },
            { apply: 'blue', params: [69] },
            { apply: 'green', params: [69] }]), 450-this.mQrImage.bitmap.width/2, 2760 )
       await this.testImage.writeAsync(`${this.directory}/${this.directory}.jpg`);
    
    
}



}


MCreateTest.prototype.Text = async function(txtObj){
    var w = this.testImage.bitmap.width
    
    var textWidth = Jimp.measureText(txtObj.font, txtObj.value);
    if (txtObj.margin == "center") {
       var x = (txtObj.right+txtObj.left)/2 - textWidth/2
       var alignmentX = Jimp.HORIZONTAL_ALIGN_CENTER
    }
    else if (txtObj.margin == "right") {
        var x = (textWidth>txtObj.right-txtObj.left)?txtObj.left:txtObj.right-textWidth
        var alignmentX = Jimp.HORIZONTAL_ALIGN_RIGHT
    }
    else if (txtObj.margin == "left") {
        var x = (textWidth>txtObj.right-txtObj.left)?txtObj.left:txtObj.right-textWidth
        var alignmentX = Jimp.HORIZONTAL_ALIGN_LEFT
    }
    this.testImage.print(txtObj.font, x , txtObj.y, {
        text: txtObj.value,
        alignmentX: alignmentX
        // alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
     }, textWidth , 0);
}



// MCreateTest.CopyTOWWW = function(){

// }