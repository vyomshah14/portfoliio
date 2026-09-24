export const heroSceneConfig = {
  coreRadius: 4, // Doubled from 2
  coreDetail: 2,
  ringCount: 4,
  nodeCount: 16,
  connectionCount: 20,
  particleCount: 150,
  baseColor: '#00E5FF',
  accentColor: '#00FFA3',
  cameraZ: 12,
  maxDpr: 2,
  responsive: {
    mobile: {
      scale: 0.6,
      nodeCount: 6,
      connectionCount: 8,
      particleCount: 40,
    },
    desktop: {
      scale: 1,
    }
  }
};
