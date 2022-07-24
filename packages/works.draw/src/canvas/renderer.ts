/**
 * Returns the 2d renderer from the canvas context.
 *
 * @param canvas The canvas to retrieve the 2d renderer from.
 *
 * @returns The 2d renderer.
 */
export function get2d(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  return canvas.getContext('2d') as CanvasRenderingContext2D;
}
