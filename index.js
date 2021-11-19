
const Jimp = require('jimp') ;
var qr = require('qr-image');


async function textOverlay() {
   // Reading image

 
   var qr_svg = qr.image('http://iraqairport.covid19resultvalidation.com/storage/reports/018172d2-266f-4e08-acc0-82900040783b.pdf', { type: 'png',size:7 });
   qr_svg.pipe(require('fs').createWriteStream('i_love_qr.png'));




   const image = await Jimp.read('./iraqnew.jpg');
   var w = image.bitmap.width
   // Defining the text font
   const font = await Jimp.loadFont("./fonts/inboxname.fnt");
//    console.log(font)
// var textFullName = "MOHAMMAD KHALIL NAIMI"
// textWidth = Jimp.measureText(font, textFullName);
//  image.print(font, w/2 - textWidth/2 , 850, {
//     text: text,
// 	alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
// 	// alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
//  }, textWidth , 0);
  const qri = await Jimp.read("./i_love_qr.png")
  image.composite( qri, w/2-qri.bitmap.width/2, 2440 );
  // var fullName = new Text("SEYEDMohammadALI NIAKIANITEHRANI SEYEDREZA","fullName",font,image)
  var fullName = new Text("SABBASS","fullName",font,image)
  var sex = new Text("male,32","sex",font,image)
  var passportNo = new Text("J33424322","passportNo",font,image)
  var date = new Text("2021-11-16","date",font,image)
   fullName.newReplace()
//  sex.replace()
//    passportNo.replace()
//   date.replace()
   // Writing image after processing
   await image.writeAsync('./sample2.jpg');
}

function Text(value,type,font,image) {
    //// 1
    // this.positions = {
    //   fullName : {
    //     left: 900,
    //     right: 1700,
    //     y: 325,
    //     margin : Jimp.HORIZONTAL_ALIGN_RIGHT
    //   }
    // } 
    //// 3
    // this.positions = {
    //   fullName : {
    //     left: 700,
    //     right: 1500,
    //     y: 432,
    //     margin : Jimp.HORIZONTAL_ALIGN_RIGHT
    //   }
    // } 
    //4
    //    this.positions = {
    //   fullName : {
    //     left: 1800,
    //     right: 2090,
    //     y: 373,
    //     margin : Jimp.HORIZONTAL_ALIGN_LEFT
    //   }
    // } 
    //5
    this.positions = {
      fullName : {
        left: 750,
        right: 950,
        y: 1366,
        margin : Jimp.HORIZONTAL_ALIGN_LEFT
      }
    } 
    // this.positions = {
    //   fullName : {
    //     left: 400,
    //     right: 1200,
    //     y: 595,
    //     margin : Jimp.HORIZONTAL_ALIGN_RIGHT
    //   }
    // } 
    this._value = value
    this._type = type
    this._font = font
    this._image = image
    var positiony = (type) =>{
        if (type == "fullName") return 595
        else if (type == "sex") return 980
        else if (type == "passportNo") return 1110
        else if (type == "date") return 1230  
    }
    this.replace = function(){
        var w = this._image.bitmap.width
        var textWidth = Jimp.measureText(this._font, this._value);
        console.log(textWidth)//(textWidth>800)?400:1200-textWidth
        this._image.print(font, (textWidth>800)?400:1200-textWidth , positiony(this._type), {
            text: this._value,
            alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
            // alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
         }, 800 , 0);
    } 
    this.newReplace=function(){
      var w = this._image.bitmap.width
      var textWidth = Jimp.measureText(this._font, this._value);
      
    
      this._image.print(font, (textWidth>this.positions.fullName.right-this.positions.fullName.left)?this.positions.fullName.left:this.positions.fullName.right-textWidth ,
       this.positions.fullName.y, {
        text: this._value,
        alignmentX: this.positions.fullName.margin ,
        // alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
     }, 800 , 0);
    }
}



/*  full name mother
this.replace = function(){
        var w = this._image.bitmap.width
        var textWidth = Jimp.measureText(this._font, this._value);
        console.log(textWidth)//(textWidth>800)?400:1200-textWidth
        this._image.print(font, (textWidth>800)?400:1200-textWidth , positiony(this._type), {
            text: this._value,
            alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
            // alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
         }, 800 , 0);
    } 
*/
textOverlay();
console.log("Image is processed succesfully");