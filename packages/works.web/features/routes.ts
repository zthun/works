const Home = '/home';
const WebApps = '/web-apps';
const Components = `${WebApps}/components`;

/**
 * The routes for the ZLearn application
 */
export abstract class ZLearnRoute {
  public static readonly home = Home;
  public static readonly webApps = Object.freeze({
    root: WebApps,
    components: {
      root: Components,
      alerts: `${Components}/alerts`,
      boolean: `${Components}/boolean`,
      button: `${Components}/button`,
      choice: `${Components}/choice`,
      drawer: `${Components}/drawer`,
      fashion: `${Components}/fashion`,
      list: `${Components}/list`,
      number: `${Components}/number`,
      popup: `${Components}/popup`,
      suspense: `${Components}/suspense`,
      text: `${Components}/text`,
      typography: `${Components}/typography`
    }
  });
}
