import { PluginComponent, PortalRequestContext } from "../index";

export interface Brand {
  logoSrc: string;
  faviconHref: string;
  primaryColor: string;
  secondaryColor: string;
  title: string;
  subtitle?: string;
}

export interface BrandingPlugin extends PluginComponent {
  getBrand: (opts: { ctx: PortalRequestContext }) => Promise<Brand>;
}

export * from './theme';
export * from './useBrand';