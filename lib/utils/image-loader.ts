export const imageLoader = {
  getBlurDataURL: (width: number, height: number) => {
    return `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><filter id="b" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="20" /></filter><rect x="0" y="0" width="${width}" height="${height}" fill="#f0f9ff" filter="url(%23b)" /></svg>`;
  },

  getResponsiveSizes: () => ({
    mobile: 640,
    tablet: 1024,
    desktop: 1920,
  }),
};