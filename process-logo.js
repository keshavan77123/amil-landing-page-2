import sharp from 'sharp';

async function processLogo() {
  const image = sharp('./public/images/brand/hotel-amil-original.jpg');
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  
  const width = info.width;
  const height = info.height;
  const channels = info.channels;
  
  // Cutoff at y=695 to completely exclude RAJAPALAYAM
  const maxY = 696;
  const minY = 225;
  
  // Find minX and maxX for the region between minY and maxY
  let minX = width;
  let maxX = 0;
  
  for (let y = minY; y <= maxY; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      
      if (r < 240 || g < 240 || b < 240) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
      }
    }
  }
  
  console.log(`Region without RAJAPALAYAM: x=${minX}..${maxX}, y=${minY}..${maxY}`);
  
  // Add a small padding
  const pad = 10;
  const cropLeft = Math.max(0, minX - pad);
  const cropTop = Math.max(0, minY - pad);
  const cropWidth = Math.min(width - cropLeft, (maxX - minX) + pad * 2);
  const cropHeight = Math.min(height - cropTop, (maxY - minY) + pad * 2);
  
  console.log(`Cropped dimensions: ${cropWidth} x ${cropHeight}`);
  
  // 1. Extract the cropped buffer (without RAJAPALAYAM)
  const cropped = await sharp('./public/images/brand/hotel-amil-original.jpg')
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  const cData = cropped.data;
  const cWidth = cropped.info.width;
  const cHeight = cropped.info.height;
  
  // 2. Create Red transparent PNG
  // The original has white background (#FFFFFF) and red foreground (#B32B2B or similar red)
  // Let's create an RGBA buffer:
  const redRgba = Buffer.alloc(cWidth * cHeight * 4);
  const reversedRgba = Buffer.alloc(cWidth * cHeight * 4);
  
  for (let i = 0; i < cWidth * cHeight; i++) {
    const r = cData[i * 3];
    const g = cData[i * 3 + 1];
    const b = cData[i * 3 + 2];
    
    // Luminance calculation
    // Background is white (255, 255, 255). Text/Lines are dark red.
    // Darkness / opacity:
    const darkness = 255 - ((r + g + b) / 3);
    
    // Smooth threshold
    let alpha = 0;
    if (darkness > 8) {
      alpha = Math.min(255, Math.round((darkness / 160) * 255));
    }
    
    // Amil Red: #B32B2B -> r:179, g:43, b:43
    redRgba[i * 4] = 179;
    redRgba[i * 4 + 1] = 43;
    redRgba[i * 4 + 2] = 43;
    redRgba[i * 4 + 3] = alpha;
    
    // Reversed: Warm Ivory #F6F1E9 -> r:246, g:241, b:233
    reversedRgba[i * 4] = 246;
    reversedRgba[i * 4 + 1] = 241;
    reversedRgba[i * 4 + 2] = 233;
    reversedRgba[i * 4 + 3] = alpha;
  }
  
  await sharp(redRgba, { raw: { width: cWidth, height: cHeight, channels: 4 } })
    .png()
    .toFile('./public/images/brand/hotel-amil-logo-red.png');
    
  await sharp(reversedRgba, { raw: { width: cWidth, height: cHeight, channels: 4 } })
    .png()
    .toFile('./public/images/brand/hotel-amil-logo-reversed.png');
    
  console.log('Saved hotel-amil-logo-red.png and hotel-amil-logo-reversed.png');
}

processLogo();
