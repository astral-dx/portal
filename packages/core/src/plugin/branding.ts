export interface Brand {
  logoSrc: string;
  faviconHref: string;
  primaryColor: string;
  secondaryColor: string;
  title: string;
  subtitle?: string;
}

export interface BrandingPlugin {
  getBrand: () => Promise<Brand>;
}
