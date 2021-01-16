/* eslint-disable require-jsdoc */
import { fireEvent, render } from '@testing-library/react';
import { IZTypedocType, ZTypedocKind, ZTypedocTypeKind } from '@zthun/works.core';
import React from 'react';
import { ZTypedocTypeViewer } from './typedoc-type-viewer';

describe('ZTypedocTypeViewer', () => {
  let type: IZTypedocType;
  let prefix: string;
  let suffix: string;
  let onReference: jest.Mock;

  function createTestTarget() {
    return render(<ZTypedocTypeViewer type={type} onReference={onReference} prefix={prefix} suffix={suffix} />);
  }

  beforeEach(() => {
    type = {
      type: ZTypedocTypeKind.Unknown
    };
    prefix = null;
    suffix = null;
    onReference = jest.fn();
  });

  function assertRendersText(expected: string) {
    // Arrange
    const target = createTestTarget();
    // Act
    const root = target.container;
    const text = root.textContent;
    // Assert
    expect(text).toEqual(expected);
  }

  describe('Prefix/Suffix', () => {
    it('should render the prefix and suffix.', () => {
      prefix = 'foo';
      suffix = 'bar';
      assertRendersText('foobar');
    });
  });

  describe('Nothing', () => {
    it('should not render anything for a null type.', () => {
      // Arrange
      type = null;
      const target = createTestTarget();
      // Act
      const actual = target.container.childNodes.length;
      // Assert
      expect(actual).toBeFalsy();
    });
  });

  describe('Generics', () => {
    beforeEach(() => {
      type = {
        type: ZTypedocTypeKind.Reference,
        name: 'IZGenericRef',
        typeArguments: [
          {
            type: ZTypedocTypeKind.Intrinsic,
            name: 'string'
          },
          {
            type: ZTypedocTypeKind.Intrinsic,
            name: 'number'
          }
        ]
      };
    });

    it('renders the type.', () => {
      assertRendersText('IZGenericRef<string, number>');
    });
  });

  describe('Array', () => {
    beforeEach(() => {
      type = {
        type: ZTypedocTypeKind.Array,
        elementType: {
          type: ZTypedocTypeKind.Intrinsic,
          name: 'string'
        }
      };
    });

    it('should render the type.', () => {
      assertRendersText('string[]');
    });
  });

  describe('Conditional', () => {
    beforeEach(() => {
      type = {
        type: ZTypedocTypeKind.Conditional,
        checkType: {
          type: ZTypedocTypeKind.Reference,
          name: 'T'
        },
        extendsType: {
          type: ZTypedocTypeKind.Intrinsic,
          name: 'string'
        },
        trueType: {
          type: ZTypedocTypeKind.Intrinsic,
          name: 'string'
        },
        falseType: {
          type: ZTypedocTypeKind.Intrinsic,
          name: 'number'
        }
      };
    });

    it('should render the type.', () => {
      assertRendersText('T extends string ? string : number');
    });
  });

  describe('IndexAccess', () => {
    beforeEach(() => {
      type = {
        type: ZTypedocTypeKind.IndexedAccess,
        indexType: {
          type: ZTypedocTypeKind.Reference,
          name: 'P'
        },
        objectType: {
          type: ZTypedocTypeKind.Reference,
          name: 'T'
        }
      };
    });

    it('should render the type.', () => {
      assertRendersText('T[P]');
    });
  });

  describe('Inferred', () => {
    beforeEach(() => {
      type = {
        type: ZTypedocTypeKind.Inferred,
        name: 'string'
      };
    });

    it('should render the type.', () => {
      assertRendersText('infer string');
    });
  });

  describe('Intersection', () => {
    beforeEach(() => {
      type = {
        type: ZTypedocTypeKind.Intersection,
        types: [
          {
            type: ZTypedocTypeKind.Reference,
            name: 'IStr'
          },
          {
            type: ZTypedocTypeKind.Reference,
            name: 'INum'
          }
        ]
      };
    });

    it('should render the type.', () => {
      assertRendersText('IStr & INum');
    });
  });

  describe('Intrinsic', () => {
    beforeEach(() => {
      type = {
        type: ZTypedocTypeKind.Intrinsic,
        name: 'string'
      };
    });

    it('should render the type.', () => {
      assertRendersText('string');
    });
  });

  describe('Literal', () => {
    beforeEach(() => {
      type = {
        type: ZTypedocTypeKind.Literal,
        value: 200
      };
    });

    it('should render the type.', () => {
      assertRendersText('200');
    });

    it('should add quotes around strings.', () => {
      type.value = '200';
      assertRendersText('"200"');
    });
  });

  describe('Mapped', () => {
    beforeEach(() => {
      type = {
        type: ZTypedocTypeKind.Mapped,
        parameter: 'P',
        parameterType: {
          type: ZTypedocTypeKind.Intrinsic,
          name: 'string'
        },
        templateType: {
          type: ZTypedocTypeKind.IndexedAccess,
          indexType: {
            type: ZTypedocTypeKind.Reference,
            name: 'P'
          },
          objectType: {
            type: ZTypedocTypeKind.Reference,
            name: 'T'
          }
        }
      };
    });

    it('should render the type.', () => {
      assertRendersText('{[P in string]: T[P]}');
    });

    it('should render the addition of a readonly modifier.', () => {
      type.readonlyModifier = '+';
      assertRendersText('{readonly [P in string]: T[P]}');
    });

    it('should render the removal of a readonly modifier.', () => {
      type.readonlyModifier = '-';
      assertRendersText('{-readonly [P in string]: T[P]}');
    });

    it('should render the addition of an optional modifier.', () => {
      type.optionalModifier = '+';
      assertRendersText('{[P in string]?: T[P]}');
    });

    it('should render the removal of an optional modifier.', () => {
      type.optionalModifier = '-';
      assertRendersText('{[P in string]-?: T[P]}');
    });

    it('should render the alias if the name type is set.', () => {
      type.nameType = {
        type: ZTypedocTypeKind.Reference,
        name: 'IZRef'
      };
      assertRendersText('{[P in string as IZRef]: T[P]}');
    });
  });

  describe('Optional', () => {
    beforeEach(() => {
      type = {
        type: ZTypedocTypeKind.Optional,
        elementType: {
          type: ZTypedocTypeKind.Intrinsic,
          name: 'number'
        }
      };
    });

    it('should render the type.', () => {
      assertRendersText('number?');
    });
  });

  describe('Predicate', () => {
    beforeEach(() => {
      type = {
        type: ZTypedocTypeKind.Predicate,
        name: 'type',
        asserts: false,
        targetType: {
          type: ZTypedocTypeKind.Intrinsic,
          name: 'string'
        }
      };
    });

    it('should render the type.', () => {
      assertRendersText('type is string');
    });

    it('should render with assertion .', () => {
      type.asserts = true;
      assertRendersText('asserts type is string');
    });

    it('should render only the assertion.', () => {
      type.asserts = true;
      delete type.targetType;
      assertRendersText('asserts type');
    });
  });

  describe('Query', () => {
    beforeEach(() => {
      type = {
        type: ZTypedocTypeKind.Query,
        queryType: {
          type: ZTypedocTypeKind.Reference,
          name: 'IZRef'
        }
      };
    });

    it('should render the type.', () => {
      assertRendersText('typeof IZRef');
    });
  });

  describe('Reference', () => {
    beforeEach(() => {
      type = {
        type: ZTypedocTypeKind.Reference,
        name: 'IZRef'
      };
    });

    it('should render the type.', () => {
      assertRendersText('IZRef');
    });

    it('should allow the user to click on the reference if the id is set.', () => {
      // Arrange
      type.id = 256;
      const target = createTestTarget();
      // Act
      fireEvent.click(target.container.getElementsByTagName('a').item(0));
      // Assert
      expect(onReference).toHaveBeenCalledWith(type.id);
    });
  });

  describe('Reflection', () => {
    beforeEach(() => {
      type = {
        type: ZTypedocTypeKind.Reflection,
        declaration: {
          id: 800,
          name: '__call',
          kind: ZTypedocKind.Function,
          signatures: []
        }
      };
    });

    it('should render as a function if the declaration is a function.', () => {
      assertRendersText('function');
    });

    it('should render as an object if the declaration is an object.', () => {
      delete type.declaration.signatures;
      type.declaration.children = [];
      assertRendersText('object');
    });

    it('should render as an object if there are no signatures or children.', () => {
      delete type.declaration.signatures;
      assertRendersText('object');
    });
  });

  describe('Rest', () => {
    beforeEach(() => {
      type = {
        type: ZTypedocTypeKind.Rest,
        elementType: {
          type: ZTypedocTypeKind.Intrinsic,
          name: 'string'
        }
      };
    });

    it('should render the type.', () => {
      assertRendersText('...string');
    });
  });

  describe('Tuple', () => {
    beforeEach(() => {
      type = {
        type: ZTypedocTypeKind.Tuple,
        elements: [
          {
            type: ZTypedocTypeKind.Intrinsic,
            name: 'string'
          },
          {
            type: ZTypedocTypeKind.Intrinsic,
            name: 'number'
          }
        ]
      };
    });

    it('should render the type.', () => {
      assertRendersText('[string, number]');
    });
  });

  describe('TypeOperator', () => {
    beforeEach(() => {
      type = {
        type: ZTypedocTypeKind.TypeOperator,
        operator: 'readonly',
        target: {
          type: ZTypedocTypeKind.Intrinsic,
          name: 'string'
        }
      };
    });

    it('should render the type.', () => {
      assertRendersText('readonly string');
    });
  });

  describe('TypeParameter', () => {
    beforeEach(() => {
      type = {
        type: ZTypedocTypeKind.TypeParameter,
        name: 'T'
      };
    });

    it('should render the type.', () => {
      assertRendersText('T');
    });
  });

  describe('Union', () => {
    beforeEach(() => {
      type = {
        type: ZTypedocTypeKind.Union,
        types: [
          {
            type: ZTypedocTypeKind.Intrinsic,
            name: 'string'
          },
          {
            type: ZTypedocTypeKind.Intrinsic,
            name: 'number'
          }
        ]
      };
    });

    it('should render the type.', () => {
      assertRendersText('string | number');
    });
  });

  describe('Unknown', () => {
    it('should render the type.', () => {
      type.name = 'should-not-be-rendered';
      assertRendersText('');
    });
  });
});
