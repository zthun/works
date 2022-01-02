# Description

The draw package allows a developer to manipulate a canvas object similar to how applications such as The Gimp and Photoshop structure their drawings.

## Installation

```sh
# NPM
npm install rxjs @zthun/works.draw
# Yarn
yarn add rxjs @zthun/works.draw
```

## Introduction

Draw is structured with the root item being of type ZPrintableDrawing. A printable drawing is a model representation of how to render to an HTML Canvas drawing context and is structured in three stacked layers, the background, the middleground, and the foreground.

All of the layers have the same structure; the only difference between the layers is that any transformations that occur in each of the layers do not affect the other layers. For example, lets say the entire middleground has a scaling transformation of 200%. When the middleground is drawn, it will draw at 200% of its size, but when the foreground is drawn after it, it will reset the transformation.

## Printable

Currently, the following printable objects are available to you and each printable object implements the IZPrintable interface.

```ts
/**
 * The root printable.  You will always create one of these.
 */
export class ZPrintableDrawing {}

/**
 * A printable that fills the canvas with a color.  Useful for the background.
 */
export class ZPrintableColor {}

/**
 * A grouping of printable objects that will print on top of each other.
 */
export class ZPrintableGroup {}

/**
 * A printable object that can load an image and print that image to the canvas.
 */
export class ZPrintableImage {}

/**
 * A printable that does nothing.
 *
 * Useful for unit testing.
 */
export class ZPrintableNothing {}

/**
 * A printable that applies a world transform to the canvas.
 */
export class ZPrintableTransform {}
```

```ts
import { ZPrintableDrawing, ZPrintableImage, ZPrintableGroup, ZPrintableTransform, ZPrintableColor } from '@zthun/works.draw';

async function draw(canvas: HTMLCanvasElement) {
  const url = 'https://images.to.draw/my-image.jpg';
  const drawing = new ZPrintableDrawing();
  const image = new ZPrintableImage();
  await image.import(url);

  drawing.background = new ZPrintableColor('white');
  drawing.foreground = new ZPrintableNothing();
  drawing.midground = new ZPrintableGroup([new ZPrintableTransform().scale(2.0, 2.0).translate(10, 10), image]);

  drawing.print(canvas.getContext('2d'));
}
```

## Tools

Tools are a concept that help with implementing user actions against a canvas and all tools implement the IZTooling interface. The following tools are currently available:

```ts
/**
 * A tool that attaches to a click and drag event to move canvas layers.
 */
export class ZToolingPan {}
```

```ts
import { ZToolingPan, IZPrintable, IZTransformTranslate } from '@zthun/works.draw';

function start(canvas: HTMLCanvasElement, drawing: IZPrintable, transform: IZTransformTranslate) {
  const tool = new ZToolingPan();
  tool.init(canvas, canvas.getContext('2d'), drawing, transform);
}

function stop(tool: IZTooling) {
  tool.destroy();
}
```
