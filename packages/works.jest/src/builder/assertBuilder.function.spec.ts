import { assertBuilderAssignsObject, assertBuilderCopiesObject, assertBuilderSetsProperty } from './assertBuilder.function';

describe('Builder', () => {
  interface IBuilt {
    first: string;
    second: number;
    third: boolean;
  }

  class Builder {
    private _build: IBuilt;

    public constructor() {
      this._build = {
        first: null,
        second: null,
        third: null
      };
    }

    public first(val: string): this {
      this._build.first = val;
      return this;
    }

    public second(val: number): this {
      this._build.second = val;
      return this;
    }

    public third(): this {
      this._build.third = true;
      return this;
    }

    public assign(other: Partial<IBuilt>): this {
      this._build = Object.assign({}, this._build, other);
      return this;
    }

    public copy(other: IBuilt): this {
      this._build = Object.assign(this._build, other);
      return this;
    }

    public build(): IBuilt {
      return { ...this._build };
    }
  }

  function createTestTarget() {
    return new Builder();
  }

  describe('assertBuilderSetsProperty', () => {
    it('should pass if the builder sets the property.', () => {
      assertBuilderSetsProperty(
        1,
        createTestTarget,
        (t, v) => t.second(v),
        (b: IBuilt) => b.second
      );
    });
  });

  describe('assertBuilderCopiesObject', () => {
    it('should pass if the builder successfully copies another object.', () => {
      assertBuilderCopiesObject(new Builder().first('first').second(2).third().build(), createTestTarget);
    });
  });

  describe('assertBuilderAssignsObject', () => {
    it('should pass if the builder successfully assigns all properties from the other object.', () => {
      assertBuilderAssignsObject(new Builder().first('first').third().build(), createTestTarget, { first: 'first', third: true });
    });
  });
});
