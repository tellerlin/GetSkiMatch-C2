// 图片加载优化工具
export const imageLoader = {
  // 生成渐进式加载的模糊占位图URL
  getBlurDataURL: (width: number, height: number) => {
    return `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><filter id="b" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="20" /></filter><rect x="0" y="0" width="${width}" height="${height}" fill="#f0f9ff" filter="url(%23b)" /></svg>`;
  },

  // 根据设备宽度生成响应式图片尺寸
  getResponsiveSizes: () => ({
    mobile: 640,
    tablet: 1024,
    desktop: 1920,
  }),
};