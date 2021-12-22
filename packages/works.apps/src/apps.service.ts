import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IZWebApp, ZWebAppBuilder } from '@zthun/works.core';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

@Controller()
/**
 * Represents a service that manages profiles and users.
 */
export class ZAppsService {
  // cspell:disable
  public static IconLearn = 'learn.svg';
  public static IconRoadblock = 'roadblock.svg';
  public static IconSupport = 'support.svg';
  public static IconTerms = 'terms.svg';
  public static IconPrivacy = 'privacy.svg';
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
   * Loads an svg from the assets directory.
   *
   * @param name The name of the svg to load.
   */
  private async _loadSvg(name: string) {
    const path = resolve(__dirname, '../assets/svg', name);
    const svg = await readFile(path, { encoding: 'binary' });
    return this._createIcon(svg);
  }

  /**
   * Generates a list of all the web apps available.
   *
   * @returns A promise of all the available apps.
   */
  @MessagePattern({ cmd: 'listWebApps' })
  public async listWebApps(): Promise<IZWebApp[]> {
    const learnIcon = await this._loadSvg(ZAppsService.IconLearn);
    const roadblockIcon = await this._loadSvg(ZAppsService.IconRoadblock);
    const termsIcon = await this._loadSvg(ZAppsService.IconTerms);
    const privacyIcon = await this._loadSvg(ZAppsService.IconPrivacy);
    const supportIcon = await this._loadSvg(ZAppsService.IconSupport);

    const webApps = [
      new ZWebAppBuilder().id('learn').name('Learn').icon(learnIcon).short('What is Zthunworks?').source('https://github.com/zthun/works').build(),
      new ZWebAppBuilder().id('roadblock').name('Roadblock').icon(roadblockIcon).short('Who are you?').source('https://github.com/zthun/roadblock').build(),
      new ZWebAppBuilder().id('terms').name('Terms').icon(termsIcon).short('What is your right to reject?').source('https://github.com/zthun/legal').build(),
      new ZWebAppBuilder().id('privacy').name('Privacy').icon(privacyIcon).short('What information do we collect?').source('https://github.com/zthun/legal').build(),
      new ZWebAppBuilder().id('support').name('Support').icon(supportIcon).short('What do you need help with?').source('https://github.com/zthun/support').build()
    ];

    return Promise.resolve(webApps);
  }
}
