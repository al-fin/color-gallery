function extractHex(hex: string): RegExpExecArray {
    hex = hex.replace(/#/g, '');
    if (hex.length === 3) {
        hex = hex.split('').map(function (hex) {
            return hex + hex;
        }).join('');
    }
    
    const result: RegExpExecArray | null  = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})[\da-z]{0,0}$/i.exec(hex);
   
    if (result===null) {
        throw new Error("Invalid HEX Code!")
    }
    return result;
} 

function hexToRGB(hex: string) : {r: number, g: number, b: number} {
    var result = extractHex(hex);
   
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    };
  }

function hexToHSL(hex: string): {h: number, s: number, l: number} {
    let {r, g, b} = hexToRGB(hex)

    r /= 255;
    g /= 255;
    b /= 255;

    const max: number = Math.max(r, g, b)
    const min: number = Math.min(r, g, b);

    let h: number = ((max + min) / 2) || 0;
    let s: number = ((max + min) / 2) || 0;
    let l: number = ((max + min) / 2) || 0;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
        case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
        case g:
            h = (b - r) / d + 2;
            break;
        case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
    }
    s = s * 100;
    s = Math.round(s);
    l = l * 100;
    l = Math.round(l);
    h = Math.round(360 * h);

    return {
        h: h,
        s: s,
        l: l
    };
}

export {extractHex, hexToRGB, hexToHSL}