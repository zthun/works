import { Injectable } from '@nestjs/common';
import { IZWebApp, ZWebAppBuilder } from '@zthun/works.core';
import { ZCommonConfigService } from '../vault/common-config.service';
import { ZUrlBuilder } from '@zthun/works.url';

@Injectable()
/**
 * Represents a service that manages profiles and users.
 */
export class ZAppsService {
  /**
   * Initializes a new instance of this object.
   *
   * @param _vault The service used to retrieve the domain configuration.
   */
  public constructor(private _common: ZCommonConfigService) {}

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
    const privacyUrl = new ZUrlBuilder().parse(rootDomain).hash('privacy').build();
    const contactUrl = 'mailto:support@zthunworks.com';

    const webApps = [
      new ZWebAppBuilder().id('portal').name('Portal').domain(portalUrl).source('https://github.com/zthun/works').build(),
      new ZWebAppBuilder().id('roadblock').name('Roadblock').domain(roadblockUrl).source('https://github.com/zthun/roadblock').build(),
      new ZWebAppBuilder().id('terms').name('Terms').domain(termsUrl).build(),
      new ZWebAppBuilder().id('privacy').name('Privacy').domain(privacyUrl).build(),
      new ZWebAppBuilder().id('contact').name('Contact').domain(contactUrl).build()
    ];

    return Promise.resolve(webApps);
  }
}
