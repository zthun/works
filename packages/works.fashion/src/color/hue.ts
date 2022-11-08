/**
 * Represents a supported color on the color wheel.
 *
 * Note that white and black are supported here and
 * get represented by the value #FFFFFF and #000000
 * respectively.
 */
export enum ZHue {
  /**
   * A crayon color that should always represent "all light".
   *
   * Adding black to this color should not change
   * the value.
   */
  White = 'white',
  /**
   * ![red](https://mui.com/static/colors-preview/red-400-24x24.png)
   */
  Red = 'red',
  /**
   * ![pink](https://mui.com/static/colors-preview/pink-400-24x24.png)
   */
  Pink = 'pink',
  /**
   * ![purple](https://mui.com/static/colors-preview/purple-400-24x24.png)
   */
  Purple = 'purple',
  /**
   * ![violet](https://mui.com/static/colors-preview/deepPurple-400-24x24.png)
   */
  Violet = 'violet',
  /**
   * ![indigo](https://mui.com/static/colors-preview/indigo-400-24x24.png)
   */
  Indigo = 'indigo',
  /**
   * ![blue](https://mui.com/static/colors-preview/blue-400-24x24.png)
   */
  Blue = 'blue',
  /**
   * ![sky](https://mui.com/static/colors-preview/lightBlue-200-24x24.png)
   */
  Sky = 'sky',
  /**
   * ![cyan](https://mui.com/static/colors-preview/cyan-400-24x24.png)
   */
  Cyan = 'cyan',
  /**
   * ![teal](https://mui.com/static/colors-preview/teal-400-24x24.png)
   */
  Teal = 'teal',
  /**
   * ![green](https://mui.com/static/colors-preview/green-400-24x24.png)
   */
  Green = 'green',
  /**
   * ![olive](https://mui.com/static/colors-preview/lightGreen-400-24x24.png)
   */
  Olive = 'olive',
  /**
   * ![lime](https://mui.com/static/colors-preview/lime-400-24x24.png)
   */
  Lime = 'lime',
  /**
   * ![yellow](https://mui.com/static/colors-preview/yellow-400-24x24.png)
   */
  Yellow = 'yellow',
  /**
   * ![amber](https://mui.com/static/colors-preview/amber-400-24x24.png)
   */
  Amber = 'amber',
  /**
   * ![orange](https://mui.com/static/colors-preview/orange-400-24x24.png)
   */
  Orange = 'orange',
  /**
   * ![persimmon](https://mui.com/static/colors-preview/deepOrange-400-24x24.png)
   */
  Persimmon = 'persimmon',
  /**
   * ![brown](https://mui.com/static/colors-preview/brown-400-24x24.png)
   */
  Brown = 'brown',
  /**
   * ![grey](https://mui.com/static/colors-preview/grey-400-24x24.png)
   */
  Grey = 'grey',
  /**
   * A crayon color that should always represent "no-light".
   *
   * Adding black to this color still results in black.
   */
  Black = 'black'
}
