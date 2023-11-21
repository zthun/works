export enum ZProjectKind {
  Other = 'other',
  Library = 'library',
  Web = 'web',
  Desktop = 'desktop',
  Console = 'console'
}

export const ZProjectKindFontAwesomeIconMap: Record<ZProjectKind, [string, ('classic' | 'sharp' | 'brands')?]> = {
  [ZProjectKind.Console]: ['terminal'],
  [ZProjectKind.Desktop]: ['desktop'],
  [ZProjectKind.Library]: ['book'],
  [ZProjectKind.Other]: ['question'],
  [ZProjectKind.Web]: ['earth-americas']
};

export const ZProjectKindDisplayMap: Record<ZProjectKind, string> = {
  [ZProjectKind.Console]: 'Console Application',
  [ZProjectKind.Desktop]: 'Desktop Application',
  [ZProjectKind.Library]: 'Project Library',
  [ZProjectKind.Other]: 'Other',
  [ZProjectKind.Web]: 'Website'
};
