export enum ZCircusActionType {
  // Mouse Actions
  MoveTo = 'move-to',
  LeftMouseDown = 'left-mouse-down',
  LeftMouseUp = 'left-mouse-up',
  // Keyboard Actions
  KeysClick = 'keys-click',
  KeysPress = 'keys-press',
  KeysRelease = 'keys-release',
  // Custom Actions
  Magic = 'magic'
}

export interface IZCircusAction {
  name: ZCircusActionType;
  context?: any;
}
