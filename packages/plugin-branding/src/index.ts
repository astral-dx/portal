import {
  Brand,
  BrandingPlugin
} from "@astral-dx/core";

export const initBrand = (brand: Brand): BrandingPlugin => {
  return {
    packageName: '@astral-dx/plugin-branding',
    getBrand: async () => brand,
  }
};