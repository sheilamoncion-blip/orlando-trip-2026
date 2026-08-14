/** Resizes/compresses an uploaded photo before storing it in localStorage. Phone camera
 * photos are often 3-8 MB — a handful of those blow past the ~5-10 MB localStorage quota,
 * which makes uploads silently fail (the write throws and nothing gets saved, with no
 * visible error). Downscaling to a reasonable max dimension + re-encoding as JPEG keeps
 * each photo in the tens-of-KB range so many can be stored safely. */
export function resizeImage(dataUrl: string, maxDim = 1280, quality = 0.8): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      try {
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(dataUrl);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      } catch {
        resolve(dataUrl);
      }
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

/** Background removal via flood-fill from the image borders: starts at every edge
 * pixel and spreads inward through connected pixels that are close in color to their
 * neighbors, treating only that connected region as background. Unlike a naive global
 * chroma-key, this won't punch holes in the subject just because part of it (skin,
 * light clothing) happens to be a similar color to the background — it only removes
 * background that's actually touching the edges. Not a real ML segmentation model,
 * but works well for renders/photos on a plain, mostly-uniform background. */
export function removeBackground(dataUrl: string, threshold = 28): Promise<string> {
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
        const n = width * height;

        const isBg = new Uint8Array(n);
        const visited = new Uint8Array(n);
        const stack: number[] = [];

        const pushIfUnvisited = (idx: number) => {
          if (!visited[idx]) { visited[idx] = 1; stack.push(idx); }
        };

        for (let x = 0; x < width; x++) { pushIfUnvisited(x); pushIfUnvisited((height - 1) * width + x); }
        for (let y = 0; y < height; y++) { pushIfUnvisited(y * width); pushIfUnvisited(y * width + (width - 1)); }
        stack.forEach(idx => { isBg[idx] = 1; });

        const colorAt = (idx: number) => {
          const i = idx * 4;
          return [data[i], data[i + 1], data[i + 2]];
        };

        while (stack.length > 0) {
          const idx = stack.pop()!;
          const [r, g, b] = colorAt(idx);
          const x = idx % width, y = (idx / width) | 0;
          const neighbors = [
            x > 0 ? idx - 1 : -1,
            x < width - 1 ? idx + 1 : -1,
            y > 0 ? idx - width : -1,
            y < height - 1 ? idx + width : -1,
          ];
          for (const nIdx of neighbors) {
            if (nIdx < 0 || visited[nIdx]) continue;
            const [nr, ng, nb] = colorAt(nIdx);
            const dist = Math.sqrt((r - nr) ** 2 + (g - ng) ** 2 + (b - nb) ** 2);
            visited[nIdx] = 1;
            if (dist < threshold) { isBg[nIdx] = 1; stack.push(nIdx); }
          }
        }

        for (let idx = 0; idx < n; idx++) {
          if (isBg[idx]) data[idx * 4 + 3] = 0;
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
