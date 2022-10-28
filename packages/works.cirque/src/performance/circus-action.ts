export enum ZCircusActionType {
  // Mouse Actions
  MouseLeftDown = 'mouse-left-down',
  MouseLeftUp = 'mouse-left-up',
  MouseRightDown = 'mouse-right-down',
  MouseRightUp = 'mouse-right-up',
  // Keyboard Actions
  KeyDown = 'key-down',
  KeyUp = 'key-up',
  // Custom Actions
  Magic = 'magic'
}

export interface IZCircusAction<TContext = any> {
  name: ZCircusActionType;
  context: TContext;
}
