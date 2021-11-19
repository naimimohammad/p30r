
const Jimp = require('jimp') ;
var fs = require('fs')

module.exports = CreateTest

function CreateTest(fullName,sexAge,passportNo,date,font,testImage,qrImage,filename) {
    var indexHandler = function(){
        var number = fs.readFileSync('./index')
        number = parseInt(number)
        number++
        number = number.toString()
        if (number.length == 4) number="0"+number
        fs.writeFileSync("./index",number)
        return number
    }
this.testNo = indexHandler().toString()
this.testImage  = testImage   
this.font = font
this.qrImage = qrImage

this.fullName = fullName;
this.sexAge = sexAge;
this.passportNo = passportNo;
this.date = date
this.fileName = filename

var textPosition = {
    testNo:715,
    fullName : 850,
    sexAge : 980,
    passportNo : 1110,
    date : 1230,
}



this.process = async function(){
        for (var v in textPosition){
            this.Text(this[v],textPosition[v])
       }
       var w = this.testImage.bitmap.width
    
       await this.testImage.composite( this.qrImage, w/2-this.qrImage.bitmap.width/2, 2440 );
    
       await this.testImage.writeAsync('./sample2.jpg');
    
    
}



}


CreateTest.prototype.Text = async function(value,position){
    var w = this.testImage.bitmap.width
    var textWidth = Jimp.measureText(this.font, value);
    this.testImage.print(this.font, w/2 - textWidth/2 , position, {
        text: value,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        // alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
     }, textWidth , 0);
}



CreateTest.CopyTOWWW = function(){

}