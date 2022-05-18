import { PluginComponent } from "../index";

export interface Brand {
  logoSrc: string;
  faviconHref: string;
  primaryColor: string;
  secondaryColor: string;
  title: string;
  subtitle?: string;
}

export interface BrandingPlugin extends PluginComponent {
  getBrand: () => Promise<Brand>;
}

export * from './theme';
export * from './useBrand';