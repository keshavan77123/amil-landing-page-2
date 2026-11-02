import sharp from 'sharp';
import fs from 'fs';

async function generateSvgWrappers() {
  // Read the generated PNG files as base64
  const redPng = fs.readFileSync('./public/images/brand/hotel-amil-logo-red.png');
  const reversedPng = fs.readFileSync('./public/images/brand/hotel-amil-logo-reversed.png');
  
  const redBase64 = `data:image/png;base64,${redPng.toString('base64')}`;
  const reversedBase64 = `data:image/png;base64,${reversedPng.toString('base64')}`;
  
  // 1. hotel-amil-logo-red.svg
  const redSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 777 491" width="777" height="491">
  <image href="${redBase64}" width="777" height="491" />
</svg>`;
  fs.writeFileSync('./public/images/brand/hotel-amil-logo-red.svg', redSvg);

  // 2. hotel-amil-logo-reversed.svg
  const reversedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 777 491" width="777" height="491">
  <image href="${reversedBase64}" width="777" height="491" />
</svg>`;
  fs.writeFileSync('./public/images/brand/hotel-amil-logo-reversed.svg', reversedSvg);

  // 3. Extract just the Building Crest for the watermark
  // In the original 1024x1024, building is x=141..898, y=225..465
  // In the 777x491 cropped image, building is top 0 to roughly 240
  const buildingCrest = await sharp(reversedPng)
    .extract({ left: 0, top: 0, width: 777, height: 245 })
    .png()
    .toBuffer();
    
  const buildingBase64 = `data:image/png;base64,${buildingCrest.toString('base64')}`;
  
  const watermarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 777 245" width="777" height="245">
  <image href="${buildingBase64}" width="777" height="245" opacity="0.08" />
</svg>`;
  fs.writeFileSync('./public/images/brand/crest-watermark.svg', watermarkSvg);

  console.log('SVG wrappers and crest watermark successfully generated.');
}

generateSvgWrappers();
