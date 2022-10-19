export enum ZSeverityColor {
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Info = 'info'
}

export enum ZColorless {
  Inherit = 'inherit',
  Transparent = 'transparent'
}

export enum ZHueColor {
  Red = 'red',
  Pink = 'pink',
  Purple = 'purple',
  Violet = 'violet',
  Indigo = 'indigo',
  Blue = 'blue',
  Sky = 'sky',
  Cyan = 'cyan',
  Teal = 'teal',
  Green = 'green',
  Olive = 'olive',
  Lime = 'lime',
  Yellow = 'yellow',
  Amber = 'amber',
  Orange = 'orange',
  Persimmon = 'persimmon',
  Brown = 'brown'
}

export enum ZShadeColor {
  Grey = 'grey',
  Black = 'black',
  White = 'white'
}

export enum ZColorTint {
  T50 = '50',
  T100 = '100',
  T200 = '200',
  T300 = '300',
  T400 = '400',
  T500 = '500',
  T600 = '600',
  T700 = '700',
  T800 = '800',
  T900 = '900',
  A100 = 'A100',
  A200 = 'A200',
  A400 = 'A400',
  A700 = 'A700',
  Dark = 'dark',
  Main = 'main',
  Light = 'light'
}

export type ZStateColor = ZSeverityColor | ZHueColor | ZShadeColor | ZColorless;
