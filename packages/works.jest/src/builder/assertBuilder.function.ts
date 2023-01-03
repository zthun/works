/**
 * Asserts that a builder object sets a specific property on the built object after the built object is returned.
 *
 * @param expected The expected value.
 * @param createTestTarget The method that constructs the target to test.
 * @param buildFn The method that builds upon the constructed target.
 * @param getFn The method that retrieves the actual property to be compared against.
 */
export function assertBuilderSetsProperty<TExpected, TBuilt, TBuilder extends { build: () => TBuilt }>(
  expected: TExpected,
  createTestTarget: () => TBuilder,
  buildFn: (t: TBuilder, v: TExpected) => TBuilder,
  getFn: (b: TBuilt) => TExpected | undefined
) {
  // Arrange
  const target = createTestTarget();
  // Act
  const built = buildFn(target, expected).build();
  const actual = getFn(built);
  // Assert
  expect(actual).toEqual(expected);
}
