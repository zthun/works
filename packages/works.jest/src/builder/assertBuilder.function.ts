/**
 * Asserts that a builder object sets a specific property on the built object after the built object is returned.
 *
 * @param expected The expected value.
 * @param createTestTarget The method that constructs the target to test.
 * @param buildFn The method that builds upon the constructed target.
 * @param getFn The method that retrieves the actual property to be compared against.
 */
export function assertBuilderSetsProperty<TExpected, TBuilt, TBuilder extends { build: () => TBuilt }>(expected: TExpected, createTestTarget: () => TBuilder, buildFn: (t: TBuilder, v: TExpected) => TBuilder, getFn: (b: TBuilt) => TExpected | undefined) {
  // Arrange
  const target = createTestTarget();
  // Act
  const built = buildFn(target, expected).build();
  const actual = getFn(built);
  // Assert
  expect(actual).toEqual(expected);
}

/**
 * Asserts that a builder that can copy another object correct copies that object.
 *
 * @param expected A fully built object to be copied.
 * @param createTestTarget The method that constructs an empty target to copy the expected and compare the built object with.
 */
export function assertBuilderCopiesObject<TBuilt, TBuilder extends { build: () => TBuilt; copy: (other: TBuilt) => TBuilder }>(expected: TBuilt, createTestTarget: () => TBuilder) {
  // Arrange
  const target = createTestTarget();
  // Act
  const actual = target.copy(expected).build();
  // Assert
  expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
}

/**
 * Asserts that a builder can assign a partial object and correctly copies the fields.
 *
 * @param expected The final expected output object to compare against.
 * @param createTestTarget The method that constructs an empty target.
 * @param partial A partial object to assign.  This assigned to the empty target should equal the expected target.
 */
export function assertBuilderAssignsObject<TBuilt, TBuilder extends { build: () => TBuilt; assign: (other: Partial<TBuilt>) => TBuilder }>(expected: TBuilt, createTestTarget: () => TBuilder, partial: Partial<TBuilt>) {
  // Arrange
  const target = createTestTarget();
  // Act
  const actual = target.assign(partial).build();
  // Assert
  expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
}
