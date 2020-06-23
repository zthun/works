export function assertBuilderSetsProperty<TExpected, TBuilt, TBuilder extends { build: () => TBuilt }>(expected: TExpected, createTestTarget: () => TBuilder, buildFn: (t: TBuilder, v: TExpected) => TBuilder, getFn: (b: TBuilt) => TExpected) {
  // Arrange
  const target = createTestTarget();
  // Act
  const built = buildFn(target, expected).build();
  const actual = getFn(built);
  // Assert
  expect(actual).toEqual(expected);
}

export function assertBuilderCopiesObject<TBuilt, TBuilder extends { build: () => TBuilt; copy: (other: TBuilt) => TBuilder }>(expected: TBuilt, createTestTarget: () => TBuilder) {
  // Arrange
  const target = createTestTarget();
  // Act
  const actual = target.copy(expected).build();
  // Assert
  expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
}

export function assertBuilderAssignsObject<TBuilt, TBuilder extends { build: () => TBuilt; assign: (other: Partial<TBuilt>) => TBuilder }>(expected: TBuilt, createTestTarget: () => TBuilder, partial: Partial<TBuilt>) {
  // Arrange
  const target = createTestTarget();
  // Act
  const actual = target.assign(partial).build();
  // Assert
  expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
}
