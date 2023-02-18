import { RGBColor } from 'react-color';

export const transformObjectToRGB = (color: RGBColor): string => {
  const { r, g, b } = color;
  return `rgb(${r}, ${g}, ${b})`;
};
