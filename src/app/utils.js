function hexToRgb(hex) {
    // Remove the hash (#) if present
    hex = hex.replace(/^#/, '');
    
    // Convert 3-digit hex to 6-digit hex
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }

    // Convert hex to RGB values
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    return { r, g, b };
}

function rgbToHsl({ r, g, b }) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return { h, s, l };
}

function calculateBrightness({ r, g, b }) {
    return 0.299 * r + 0.587 * g + 0.114 * b;
}

function findLightestColor(hexCodes) {
    let lightestColor = hexCodes[0];
    let maxLightness = 0;

    hexCodes.forEach(hex => {
        const rgb = hexToRgb(hex);
        const { l } = rgbToHsl(rgb);

        if (l > maxLightness) {
            maxLightness = l;
            lightestColor = hex;
        }
    });

    return lightestColor;
}

function findBrightestColor(hexCodes) {
    let brightestColor = hexCodes[0];
    let maxBrightness = 0;

    hexCodes.forEach(hex => {
        const rgb = hexToRgb(hex);
        const brightness = calculateBrightness(rgb);

        if (brightness > maxBrightness) {
            maxBrightness = brightness;
            brightestColor = hex;
        }
    });

    return brightestColor;
}

function brightestandlightest(hexCodes) {
    
    return {
        brightest: findBrightestColor(hexCodes),
        lightest: findLightestColor(hexCodes)
    };
}

export { brightestandlightest };

