import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IZWebApp, ZWebAppBuilder } from '@zthun/works.core';

@Controller()
/**
 * Represents a service that manages profiles and users.
 */
export class ZAppsService {
  // cspell:disable
  public static IconLearn =
    '<svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>';
  public static IconRoadblock =
    '<svg focusable="false" viewBox="0 0 24 24"><path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"></path></svg>';
  public static IconContact = '<svg focusable="false" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>';
  public static IconTerms = '<svg focusable="false" viewBox="0 0 24 24"><path d="M13 1.07V9h7c0-4.08-3.05-7.44-7-7.93zM4 15c0 4.42 3.58 8 8 8s8-3.58 8-8v-4H4v4zm7-13.93C7.05 1.56 4 4.92 4 9h7V1.07z"></path></svg>';
  public static IconPrivacy = '<svg focusable="false" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg>';
  // cspell:enable

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
   * Generates a list of all the web apps available.
   *
   * @returns A promise of all the available apps.
   */
  @MessagePattern({ cmd: 'listWebApps' })
  public async listWebApps(): Promise<IZWebApp[]> {
    const learnIcon = this._createIcon(ZAppsService.IconLearn);
    const roadblockIcon = this._createIcon(ZAppsService.IconRoadblock);
    const termsIcon = this._createIcon(ZAppsService.IconTerms);
    const privacyIcon = this._createIcon(ZAppsService.IconPrivacy);
    const contactIcon = this._createIcon(ZAppsService.IconContact);

    const webApps = [
      new ZWebAppBuilder().id('docs').name('Learn').icon(learnIcon).source('https://github.com/zthun/works').build(),
      new ZWebAppBuilder().id('roadblock').name('Roadblock').icon(roadblockIcon).source('https://github.com/zthun/roadblock').build(),
      new ZWebAppBuilder().id('terms').name('Terms').icon(termsIcon).build(),
      new ZWebAppBuilder().id('privacy').name('Privacy').icon(privacyIcon).build(),
      new ZWebAppBuilder().id('contact').name('Contact').icon(contactIcon).build()
    ];

    return Promise.resolve(webApps);
  }
}
