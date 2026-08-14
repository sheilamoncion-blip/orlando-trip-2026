/** Naive chroma-key background removal: samples the 4 corner pixels, treats
 * anything close to that color as background and makes it transparent.
 * Works well for character renders on a solid white/plain background —
 * turns them into "sticker" cutouts. Not a real subject-detection model. */
export function removeBackground(dataUrl: string, threshold = 42): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(dataUrl);
        ctx.drawImage(img, 0, 0);

        const { width, height } = canvas;
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;

        const corners = [
          [0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1],
        ];
        let r = 0, g = 0, b = 0;
        corners.forEach(([x, y]) => {
          const i = (y * width + x) * 4;
          r += data[i]; g += data[i + 1]; b += data[i + 2];
        });
        r /= 4; g /= 4; b /= 4;

        for (let i = 0; i < data.length; i += 4) {
          const dr = data[i] - r, dg = data[i + 1] - g, db = data[i + 2] - b;
          const dist = Math.sqrt(dr * dr + dg * dg + db * db);
          if (dist < threshold) data[i + 3] = 0;
        }

        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } catch {
        resolve(dataUrl);
      }
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}
