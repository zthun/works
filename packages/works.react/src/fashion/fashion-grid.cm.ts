import { ZCircusActBuilder, ZCircusComponentModel, ZCircusKeyboardQwerty } from '@zthun/cirque';
import { IZFashion, ZHue, ZShade } from '@zthun/works.fashion';
import { ZFashionBlockComponentModel } from './fashion-block.cm';

/**
 * Represents a component model for the fashion grid.
 */
export class ZFashionGridComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZFashionGrid-root';

  /**
   * Gets the selected fashion.
   *
   * @returns
   *        The selected fashion.  Returns null if there is no selection.
   */
  public async selected(): Promise<ZFashionBlockComponentModel | null> {
    const [selected] = await this.driver.query('[data-selected="true"]');
    return selected ? new ZFashionBlockComponentModel(selected) : null;
  }

  /**
   * Gets the focused fashion.
   *
   * @returns
   *        The focused fashion.  Returns null if there is no focus.
   */
  public async focused(): Promise<ZFashionBlockComponentModel | null> {
    const focused = await this.driver.focused();
    const classes = await focused?.classes([ZFashionBlockComponentModel.Class]);
    return classes?.length ? new ZFashionBlockComponentModel(focused!) : null;
  }

  /**
   * Gets the fashion square for the specified hue/shade combo.
   *
   * @param hue
   *        The hue value of the block to query.
   * @param shade
   *        The shade value of the block to query.
   *
   * @returns
   *        The fashion block associated with the hue/shade combo or null
   *        if the combo does not exist in the grid (transparent, black, white).
   */
  public get(hue: ZHue, shade: ZShade): Promise<ZFashionBlockComponentModel | null>;

  /**
   * Gets the fashion square for the specified fashion.
   *
   * @param fashion
   *        The fashion object that contains the hue/shade combo to query.
   *
   * @returns
   *        The fashion block associated with the hue/shade combo or null
   *        if the combo does not exist in the grid (transparent, black, white).
   */
  public get(fashion: IZFashion): Promise<ZFashionBlockComponentModel | null>;

  /**
   * Gets the fashion square for the specified fashion or hue/shade combo.
   *
   * @param hueOrFashion
   *        The hue or fashion that contains the hue/shade combo to retrieve.
   * @param shade
   *        The shade value.  If this is truthy, but hueOrFashion is a fashion object, then
   *        the fashion shade takes precedence.
   *
   * @returns
   *        The fashion square for the given fashion or hue/shade combo.  If the grid is not
   *        rendering the specified square, then this method returns null.
   */
  public async get(hueOrFashion: ZHue | IZFashion, shade?: ZShade): Promise<ZFashionBlockComponentModel | null> {
    const _hue = typeof hueOrFashion === 'object' ? hueOrFashion.hue : hueOrFashion;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const _shade = typeof hueOrFashion === 'object' ? hueOrFashion.shade : shade!;

    const [square] = await this.driver.query(`[data-hue="${_hue}"][data-shade="${_shade}"]`);
    return square ? new ZFashionBlockComponentModel(square) : null;
  }

  /**
   * Attempts to tab to the next block.
   *
   * This does not actually select the block.  It simply selects the focus
   * to that specific block.
   *
   * @returns
   *        The currently focused block.  Returns null if a block is not
   *        focused.
   */
  public async next() {
    await this.driver.perform(new ZCircusActBuilder().press(ZCircusKeyboardQwerty.tab).build());
    return this.focused();
  }

  /**
   * Attempts to shift tab to the previous block.
   *
   * @returns
   *        The currently focused block.  Returns null if no block is focused.
   */
  public async prev() {
    const keys = new ZCircusActBuilder()
      .keyDown(ZCircusKeyboardQwerty.shiftLeft)
      .press(ZCircusKeyboardQwerty.tab)
      .keyUp(ZCircusKeyboardQwerty.shiftLeft)
      .build();

    await this.driver.perform(keys);
    return this.focused();
  }
}
