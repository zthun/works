import { Injectable } from '@nestjs/common';
import { IZWebApp, ZWebAppBuilder } from '@zthun/works.core';
import { ZUrlBuilder } from '@zthun/works.url';
import { ZWorksConfigService } from '../config/works-config.service';

@Injectable()
/**
 * Represents a service that manages profiles and users.
 */
export class ZAppsService {
  // cspell:disable
  public static IconContact = '<svg focusable="false" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>';
  public static IconTerms = '<svg focusable="false" viewBox="0 0 24 24"><path d="M13 1.07V9h7c0-4.08-3.05-7.44-7-7.93zM4 15c0 4.42 3.58 8 8 8s8-3.58 8-8v-4H4v4zm7-13.93C7.05 1.56 4 4.92 4 9h7V1.07z"></path></svg>';
  public static IconPrivacy = '<svg focusable="false" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg>';
  // cspell:enable

  /**
   * Initializes a new instance of this object.
   *
   * @param _vault The service used to retrieve the domain configuration.
   */
  public constructor(private _common: ZWorksConfigService) {}

  /**
   * Creates an ico file from an svg stream.
   *
   * @param svg The raw string of the icon.
   *
   * @returns The raw buffer as a base64 encoded data url.
   */
  private _createIcon(svg: string) {
    const raw = Buffer.from(svg, 'ascii');
    const base64 = raw.toString('base64');
    return `data:image/svg+xml;base64,${base64}`;
  }

  /**
   * Generates a list of all the apps available.
   *
   * @returns A promise of all the available apps.
   */
  public async listWebApps(): Promise<IZWebApp[]> {
    const hostConfig = await this._common.domain();
    const rootDomain = new ZUrlBuilder().protocol('https').hostname(hostConfig.value).build();

    const portalUrl = new ZUrlBuilder().parse(rootDomain).build();
    const roadblockUrl = new ZUrlBuilder().parse(rootDomain).hash('login').build();

    const termsUrl = new ZUrlBuilder().parse(rootDomain).hash('terms').build();
    const termsIcon = this._createIcon(ZAppsService.IconTerms);

    const privacyUrl = new ZUrlBuilder().parse(rootDomain).hash('privacy').build();
    const privacyIcon = this._createIcon(ZAppsService.IconPrivacy);

    const contactUrl = 'mailto:support@zthunworks.com';
    const contactIcon = this._createIcon(ZAppsService.IconContact);

    const webApps = [
      new ZWebAppBuilder().id('portal').name('Portal').domain(portalUrl).source('https://github.com/zthun/works').build(),
      new ZWebAppBuilder().id('roadblock').name('Roadblock').domain(roadblockUrl).source('https://github.com/zthun/roadblock').build(),
      new ZWebAppBuilder().id('terms').name('Terms').domain(termsUrl).icon(termsIcon).build(),
      new ZWebAppBuilder().id('privacy').name('Privacy').domain(privacyUrl).icon(privacyIcon).build(),
      new ZWebAppBuilder().id('contact').name('Contact').domain(contactUrl).icon(contactIcon).build()
    ];

    return Promise.resolve(webApps);
  }
}
