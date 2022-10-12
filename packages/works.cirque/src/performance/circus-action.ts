export enum ZCircusActionType {
  MoveTo = 'move-to',
  LeftMouseDown = 'left-mouse-down',
  LeftMouseUp = 'left-mouse-up',
  Magic = 'magic'
}

export interface IZCircusAction {
  name: ZCircusActionType;
  context?: any;
}
