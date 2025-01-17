import { Gradient } from '@svgdotjs/svg.js';
import 'mocha';
import { CanvasType, DataPattern, EyeBallShape, EyeFrameShape, GradientType, QRCodeFrame, QRErrorCorrectLevel } from '../Enums';
import { QRCodeBuilder } from '../index';
import { QRCode } from '../Models';

// tslint:disable-next-line:no-var-requires
const fs =  require('fs');

const vCardSampleData = `BEGIN:VCARD
VERSION:3.0
N:fgdgdfg;dfdagfsg;;
FN:dfdagfsg fgdgdfg
ORG:fgfdgdfgdf;
TITLE:fdgdfg
TEL;TYPE=work:213213
TEL;TYPE=mobile:523355
TEL;TYPE=home:342524
EMAIL:demo@mobstac.com
ADR;TYPE=WORK:;;eafe, thgsh;Bangalore;KA;560008;India
URL:mobstac.com
REV:2008-04-24T19:52:43Z
END:VCARD`;

const config = {
    // text: vCardSampleData,
    text: "www.beaconstac.com",
    logoBackground: true,
    canvasType: CanvasType.SVG,
    dataPattern: DataPattern.SQUARE,
    dotScale: 1,
    colorDark: "#13544A",
    eyeBallShape: EyeBallShape.LEFT_DIAMOND,
    eyeFrameShape: EyeFrameShape.CIRCLE,
    frameStyle: QRCodeFrame.FOCUS,
    frameText: "QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ",
    frameColor: "#0E9E88",
    frameTextColor: "#0E9E88",
    gradientType: GradientType.NONE,
    logoScale: 1,
    size:512,
    margin: 40,
    // isVCard: true

};

function prepareImageBuffer(qrCode: QRCode, name: string) {
    const dataUrl = qrCode.canvas.toDataURL('image/png');
    const matches: any = dataUrl.match(
        /^data:([A-Za-z-+\/]+);base64,(.+)$/
        ),
        response: any  ={};
    response.type = matches[1];
    response.data = Buffer.from(matches[2], "base64");
    const decodedImg = response;
    const imageBuffer = decodedImg.data;
    const extension ='png';
    const fileName = `/${name}` + "." + extension;

    return {
        name: fileName,
        buffer: imageBuffer
    };

}

describe('QR code main tests', () => {
    it('QR main test PNG', done => {
        const qrCodeGenerator = new QRCodeBuilder(config);
        qrCodeGenerator.build(CanvasType.PNG).then(qrCode => {
            const bufferObject = prepareImageBuffer(qrCode, 'test');
            fs.writeFileSync(__dirname + bufferObject.name, bufferObject.buffer);
            done();
        }).catch(err => {
            console.error(err);
            done();
        });
    });
    it('QR main test SVG', done => {
        const qrCodeGenerator = new QRCodeBuilder(config);

        qrCodeGenerator.build(CanvasType.SVG).then(qrCode => {
            fs.writeFileSync(__dirname + '/test.' + CanvasType.SVG.toLowerCase(), qrCode.toBuffer());
            done();
        }).catch(err => {
            console.error(err);
            done();
        });
    });
});
