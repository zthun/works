import { code, ZCircusKey } from './circus-key';

/**
 * All keys that conform to the QWERTY layout.
 *
 * Note that these keys conform to the chrome standard since Node itself
 * uses the Chrome JavaScript engine.
 */
export const ZCircusKeyboardQwerty: Record<string, ZCircusKey> = Object.freeze({
  // Short side
  escape: code('Escape', 'Escape'),
  f1: code('F1', 'F1'),
  f2: code('F2', 'F2'),
  f3: code('F3', 'F3'),
  f4: code('F4', 'F4'),
  f5: code('F5', 'F5'),
  f6: code('F6', 'F6'),
  f7: code('F7', 'F7'),
  f8: code('F8', 'F8'),
  f9: code('F9', 'F9'),
  f10: code('F10', 'F10'),
  f11: code('F11', 'F11'),
  f12: code('F12', 'F12'),

  backquote: code('`', 'Backquote', '~'),
  digit1: code('1', 'Digit1', '!'),
  digit2: code('2', 'Digit2', '@'),
  digit3: code('3', 'Digit3', '#'),
  digit4: code('4', 'Digit4', '$'),
  digit5: code('5', 'Digit5', '%'),
  digit6: code('6', 'Digit6', '^'),
  digit7: code('7', 'Digit7', '&'),
  digit8: code('8', 'Digit8', '*'),
  digit9: code('9', 'Digit9', '('),
  digit0: code('0', 'Digit0', ')'),
  backspace: code('BackSpace', 'Backspace'),

  tab: code('Tab', 'Tab'),
  keyQ: code('q', 'KeyQ', 'Q'),
  keyW: code('w', 'KeyW', 'W'),
  keyE: code('e', 'KeyE', 'E'),
  keyR: code('r', 'KeyR', 'R'),
  keyT: code('t', 'KeyT', 'T'),
  keyY: code('y', 'KeyY', 'Y'),
  keyU: code('u', 'KeyU', 'U'),
  keyI: code('i', 'KeyI', 'I'),
  keyO: code('o', 'KeyO', 'O'),
  keyP: code('p', 'KeyP', 'P'),
  bracketLeft: code('[', 'BracketLeft', '{'),
  bracketRight: code(']', 'BracketRight', '}'),
  backslash: code('\\', 'Backslash', '|'),

  capsLock: code('CapsLock', 'CapsLock'),
  keyA: code('a', 'KeyA', 'A'),
  keyS: code('s', 'KeyS', 'S'),
  keyD: code('d', 'KeyD', 'D'),
  keyF: code('f', 'KeyF', 'F'),
  keyG: code('g', 'KeyG', 'G'),
  keyH: code('h', 'KeyH', 'H'),
  keyJ: code('j', 'KeyJ', 'J'),
  keyK: code('k', 'KeyK', 'K'),
  keyL: code('l', 'KeyL', 'L'),
  semiColon: code(';', 'Semicolon', ':'),
  quote: code("'", 'Quote', '"'),
  enter: code('Enter', 'Enter'),

  shiftLeft: code('Shift', 'ShiftLeft'),
  keyZ: code('z', 'KeyZ', 'Z'),
  keyX: code('x', 'KeyX', 'X'),
  keyC: code('c', 'KeyC', 'C'),
  keyV: code('v', 'KeyV', 'V'),
  keyB: code('b', 'KeyB', 'B'),
  keyN: code('n', 'KeyN', 'N'),
  keyM: code('m', 'KeyM', 'M'),
  comma: code(',', 'Comma', '<'),
  period: code('.', 'Period', '>'),
  slash: code('/', 'Slash', '?'),
  shiftRight: code('Shift', 'ShiftRight'),

  controlLeft: code('Control', 'ControlLeft'),
  metaLeft: code('Meta', 'MetaLeft'),
  altLeft: code('Alt', 'AltLeft'),
  space: code(' ', 'Space'),
  altRight: code('Alt', 'AltRight'),
  contextMenu: code('ContextMenu', 'ContextMenu'),
  controlRight: code('Control', 'ControlRight'),

  // Extended Keys
  printScreen: code('F13', 'F13'),
  scrollLock: code('F14', 'F14'),
  pause: code('F15', 'F15'),

  insert: code('Help', 'Insert'),
  home: code('Home', 'Home'),
  pageUp: code('PageUp', 'PageUp'),

  delete: code('Delete', 'Delete'),
  end: code('End', 'End'),
  pageDown: code('PageDown', 'PageDown'),

  upArrow: code('ArrowUp', 'ArrowUp'),
  leftArrow: code('ArrowLeft', 'ArrowLeft'),
  downArrow: code('ArrowDown', 'ArrowDown'),
  rightArrow: code('ArrowRight', 'ArrowRight'),

  // Numpad
  numLock: code('Clear', 'NumLock'),
  numpadDivide: code('/', 'NumpadDivide'),
  numpadMultiply: code('*', 'NumpadMultiply'),
  numpadSubtract: code('-', 'NumpadSubtract'),

  numpad7: code('7', 'Numpad7'),
  numpad8: code('8', 'Numpad8'),
  numpad9: code('9', 'Numpad9'),

  numpad4: code('4', 'Numpad4'),
  numpad5: code('5', 'Numpad5'),
  numpad6: code('6', 'Numpad6'),
  numpadAdd: code('+', 'NumpadAdd'),

  numpad1: code('1', 'Numpad1'),
  numpad2: code('2', 'Numpad2'),
  numpad3: code('3', 'Numpad3'),

  numpad0: code('0', 'Numpad0'),
  numpadDecimal: code('.', 'NumpadDecimal'),
  numpadEnter: code('Enter', 'NumpadEnter')
});
