import {
  ZComponentAlerts,
  ZComponentBoolean,
  ZComponentButton,
  ZComponentChoice,
  ZComponentDrawer,
  ZComponentFashion,
  ZComponentList,
  ZComponentNumber,
  ZComponentPopup,
  ZComponents,
  ZComponentSuspense,
  ZComponentText,
  ZComponentTypography
} from './web-apps/web-apps-components';

const Home = '/home';
const WebApps = '/web-apps';
const Microservices = '/microservices';
const Components = `${WebApps}/${ZComponents.path}`;

/**
 * Gets a route that has child routes.
 *
 * @param route
 *        The route to append the star to.
 *
 * @returns
 *        "route/*"
 */
export function withChildren(route: string) {
  return `${route}/*`;
}

/**
 * The full paths for the ZLearn application
 */
export abstract class ZLearnPath {
  public static readonly home = Home;
  public static readonly microservices = Object.freeze({
    root: Microservices
  });
  public static readonly webApps = Object.freeze({
    root: WebApps,
    components: {
      root: Components,
      alerts: `${Components}/${ZComponentAlerts.path}`,
      boolean: `${Components}/${ZComponentBoolean.path}`,
      button: `${Components}/${ZComponentButton.path}`,
      choice: `${Components}/${ZComponentChoice.path}`,
      drawer: `${Components}/${ZComponentDrawer.path}`,
      fashion: `${Components}/${ZComponentFashion.path}`,
      list: `${Components}/${ZComponentList.path}`,
      number: `${Components}/${ZComponentNumber.path}`,
      popup: `${Components}/${ZComponentPopup.path}`,
      suspense: `${Components}/${ZComponentSuspense.path}`,
      text: `${Components}/${ZComponentText.path}`,
      typography: `${Components}/${ZComponentTypography.path}`
    }
  });
}
