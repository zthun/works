export enum ZCircusActionType {
  // Mouse Actions
  Click = 'click',
  // Keyboard Actions
  KeysClick = 'keys-click',
  // Custom Actions
  Magic = 'magic'
}

export interface IZCircusAction {
  name: ZCircusActionType;
  context?: any;
}
