import { ZColorHue } from './color-hue';
import { ZColorNone } from './color-none';
import { ZColorPriority } from './color-priority';
import { ZColorSeverity } from './color-severity';
import { ZColorShade } from './color-shade';

export type ZColor = ZColorSeverity | ZColorPriority | ZColorHue | ZColorShade | ZColorNone;
