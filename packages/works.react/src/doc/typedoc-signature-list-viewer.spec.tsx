/* eslint-disable require-jsdoc */
import { act, fireEvent, render } from '@testing-library/react';
import { IZTypedocEntity, ZTypedocKind, ZTypedocTypeKind } from '@zthun/works.core';
import { first, last } from 'lodash';
import React from 'react';
import { ZTypedocSignatureListViewer } from './typedoc-signature-list-viewer';

describe('ZTypedocSignatureListViewer', () => {
  let signatures: IZTypedocEntity[];

  function createTestTarget() {
    return render(<ZTypedocSignatureListViewer signatures={signatures} />);
  }

  function assertRendersSignature(expected: string) {
    // Arrange
    const target = createTestTarget();
    // Act
    const all = target.getByTestId('ZTypedocSignatureListViewer-root').querySelectorAll('.ZTypedocSignatureListViewer-signature');
    const actual = Array.from(all)
      .map((e) => e.textContent)
      .join(';');
    // Assert
    expect(actual).toEqual(expected);
  }

  describe('No signatures', () => {
    describe('Falsy', () => {
      it('should not render anything.', () => {
        // Arrange
        const target = createTestTarget();
        // Act
        const actual = target.queryByTestId('ZTypedocSignatureListViewer-root');
        // Assert
        expect(actual).toBeFalsy();
      });
    });

    describe('Empty', () => {
      beforeEach(() => {
        signatures = [];
      });

      it('should not render anything.', () => {
        // Arrange
        const target = createTestTarget();
        // Act
        const actual = target.queryByTestId('ZTypedocSignatureListViewer-root');
        // Assert
        expect(actual).toBeFalsy();
      });
    });
  });

  describe('Functional Signatures', () => {
    let getSignature: IZTypedocEntity;
    let setSignature: IZTypedocEntity;
    let callSignature: IZTypedocEntity;
    let constructorSignature: IZTypedocEntity;
    let func: IZTypedocEntity;
    let method: IZTypedocEntity;
    let constructor: IZTypedocEntity;
    let accessor: IZTypedocEntity;

    beforeEach(() => {
      getSignature = {
        id: 600,
        name: 'list',
        kind: ZTypedocKind.GetSignature,
        comment: {
          shortText: 'Returns a copy of the current list.',
          returns: 'A copy of the current list.\n'
        },
        type: {
          type: ZTypedocTypeKind.Array,
          elementType: {
            type: ZTypedocTypeKind.Reference,
            id: 69,
            name: 'MyArrayType'
          }
        }
      };

      setSignature = {
        id: 601,
        name: 'amount',
        kind: ZTypedocKind.SetSignature,
        comment: {
          shortText: 'The amount to set.'
        },
        parameters: [
          {
            id: 700,
            name: 'val',
            kind: ZTypedocKind.Parameter,
            comment: {
              text: 'The value to set.\n'
            },
            type: {
              type: ZTypedocTypeKind.Intrinsic,
              name: 'number'
            }
          }
        ]
      };

      callSignature = {
        id: 602,
        name: 'calling',
        kind: ZTypedocKind.CallSignature,
        comment: {
          shortText: 'Returns some value.',
          text: 'Yes it does!',
          returns: 'Return value.\n'
        },
        parameters: [
          {
            id: 701,
            name: 'a',
            kind: ZTypedocKind.Parameter,
            comment: {
              text: 'The field to sort by.'
            },
            type: {
              type: ZTypedocTypeKind.Reference,
              name: 'T'
            }
          },
          {
            id: 702,
            name: 'b',
            kind: ZTypedocKind.Parameter,
            comment: {
              shortText: 'The rest of it.'
            },
            flags: {
              isRest: true
            },
            type: {
              type: ZTypedocTypeKind.Array,
              elementType: {
                type: ZTypedocTypeKind.Reference,
                name: 'T2'
              }
            }
          }
        ],
        typeParameter: [
          {
            id: 999,
            name: 'T',
            kind: ZTypedocKind.TypeParameter,
            type: {
              type: ZTypedocTypeKind.Reference,
              id: 2000,
              name: 'ExtensionType'
            }
          },
          {
            id: 998,
            name: 'T2',
            kind: ZTypedocKind.TypeParameter
          }
        ],
        type: {
          type: ZTypedocTypeKind.Reference,
          id: 5000,
          name: 'MyReference'
        },
        implementationOf: {
          type: ZTypedocTypeKind.Reference,
          name: 'IZCalling.calling'
        },
        inheritedFrom: {
          type: ZTypedocTypeKind.Reference,
          name: 'ZCalling.calling'
        }
      };

      constructorSignature = {
        id: 3001,
        name: 'new MyClass',
        kind: ZTypedocKind.ConstructorSignature,
        comment: {
          shortText: 'Initializes a new instance of this object.'
        },
        parameters: [
          {
            id: 4444,
            name: 'a',
            kind: ZTypedocKind.Parameter,
            type: {
              type: ZTypedocTypeKind.Intrinsic,
              name: 'number'
            },
            defaultValue: '2'
          },
          {
            id: 4445,
            name: 'b',
            kind: ZTypedocKind.Parameter,
            flags: {
              isOptional: true
            },
            type: {
              type: ZTypedocTypeKind.Intrinsic,
              name: 'number'
            }
          }
        ],
        type: {
          type: ZTypedocTypeKind.Reference,
          id: 8222,
          name: 'MyClass'
        }
      };

      func = {
        id: 607,
        kind: ZTypedocKind.Function,
        name: 'calling',
        signatures: [callSignature]
      };

      method = {
        id: 607,
        kind: ZTypedocKind.Method,
        name: 'calling',
        signatures: [callSignature]
      };

      constructor = {
        id: 608,
        kind: ZTypedocKind.Constructor,
        name: 'constructor',
        signatures: [constructorSignature]
      };

      accessor = {
        id: 608,
        kind: ZTypedocKind.Accessor,
        name: 'list',
        getSignature: [getSignature],
        setSignature: [setSignature]
      };
    });

    describe('Multiple', () => {
      beforeEach(() => {
        signatures = [callSignature, constructorSignature, null, setSignature, getSignature, undefined];
      });

      it('should render all truthy, signatures', () => {
        // Arrange
        const target = createTestTarget();
        // Act
        const actual = target.baseElement.querySelectorAll('.ZTypedocSignatureListViewer-signature');
        // Assert
        expect(actual.length).toEqual(signatures.filter((sig) => !!sig).length);
      });

      it('should render the first item as active if there is no active item.', () => {
        // Arrange
        const target = createTestTarget();
        // Act
        const active = target.baseElement.querySelector('.ZTypedocSignatureListViewer-signature-active');
        const actual = +active.getAttribute('data-signature-index');
        // Assert
        expect(actual).toEqual(0);
      });

      it('should set the active signature when clicking on the signature.', async () => {
        // Arrange
        const target = createTestTarget();
        const wanted = target.baseElement.querySelector('.ZTypedocSignatureListViewer-signature-inactive');
        const expected = +wanted.getAttribute('data-signature-index');
        // Act
        await act(async () => {
          fireEvent.click(wanted);
        });
        const active = target.baseElement.querySelector('.ZTypedocSignatureListViewer-signature-active');
        const actual = +active.getAttribute('data-signature-index');
        // Assert
        expect(actual).toEqual(expected);
      });

      it('should render the active signature parameter list.', () => {
        // Arrange
        const target = createTestTarget();
        const expected = first(signatures).parameters;
        // Act
        const active = target.baseElement.querySelectorAll('.ZTypedocSignatureListViewer-signature-parameter');
        // Assert
        expect(active.length).toEqual(expected.length);
      });

      it('should render the active signature comment as the first comment.', () => {
        // Arrange
        const target = createTestTarget();
        const active = first(signatures);
        const expected = `${active.comment.shortText}${active.comment.text}`;
        // Act
        const actual = first(target.queryAllByTestId('ZTypedocCommentViewer-root')).textContent;
        // Assert
        expect(actual).toEqual(expected);
      });

      it('should render the active signature return statement as the last comment.', () => {
        // Arrange
        const target = createTestTarget();
        const active = first(signatures);
        const expected = active.comment.returns;
        // Act
        const actual = last(target.queryAllByTestId('ZTypedocCommentViewer-root')).textContent;
        // Assert
        expect(actual).toEqual(expected);
      });

      it('should render the active signature inheritance information.', () => {
        // Arrange
        const target = createTestTarget();
        const expected = 2;
        // Act
        const actual = target.container.querySelectorAll('.ZTypedocSignatureListViewer-signature-inherits').length;
        // Assert
        expect(actual).toEqual(expected);
      });
    });
    describe('Accessor', () => {
      beforeEach(() => {
        signatures = [accessor];
      });

      it('should render the get signature.', () => {
        delete accessor.setSignature;
        assertRendersSignature('get list(): MyArrayType[]');
      });

      it('should render the set signature.', () => {
        delete accessor.getSignature;
        assertRendersSignature('set amount(val: number)');
      });

      it('should render both signatures.', () => {
        assertRendersSignature('get list(): MyArrayType[];set amount(val: number)');
      });
    });

    describe('Function', () => {
      beforeEach(() => {
        signatures = [func];
      });

      it('should render the child signature with the function keyword.', () => {
        assertRendersSignature('function calling<T extends ExtensionType, T2>(a: T, ...b: T2[]): MyReference');
      });
    });

    describe('Method', () => {
      beforeEach(() => {
        signatures = [method];
      });

      it('should render the child signatures.', () => {
        assertRendersSignature('calling<T extends ExtensionType, T2>(a: T, ...b: T2[]): MyReference');
      });
    });

    describe('Constructor', () => {
      beforeEach(() => {
        signatures = [constructor];
      });

      it('should render the signature.', () => {
        assertRendersSignature('new MyClass(a: number = 2, b?: number): MyClass');
      });
    });

    describe('Get signature', () => {
      beforeEach(() => {
        signatures = [getSignature];
      });

      it('should render the signature', () => {
        assertRendersSignature('get list(): MyArrayType[]');
      });
    });

    describe('Set signature', () => {
      beforeEach(() => {
        signatures = [setSignature];
      });

      it('should render the signature.', () => {
        assertRendersSignature('set amount(val: number)');
      });
    });

    describe('Call signature', () => {
      beforeEach(() => {
        signatures = [callSignature];
      });

      it('should render the signature.', () => {
        assertRendersSignature('calling<T extends ExtensionType, T2>(a: T, ...b: T2[]): MyReference');
      });
    });

    describe('Constructor signature', () => {
      beforeEach(() => {
        signatures = [constructorSignature];
      });

      it('should render the signature.', () => {
        assertRendersSignature('new MyClass(a: number = 2, b?: number): MyClass');
      });
    });
  });

  describe('Assignment Signatures', () => {
    let property: IZTypedocEntity;
    let enumMember: IZTypedocEntity;
    let variable: IZTypedocEntity;
    let typeAlias: IZTypedocEntity;

    beforeEach(() => {
      property = {
        id: 679,
        name: 'confirm',
        kind: ZTypedocKind.Property,
        type: {
          type: ZTypedocTypeKind.Intrinsic,
          name: 'boolean'
        },
        defaultValue: 'true'
      };

      enumMember = {
        id: 632,
        name: 'Equal',
        kind: ZTypedocKind.EnumMember,
        defaultValue: '"eq"'
      };

      variable = {
        id: 746,
        name: 'Maximum',
        kind: ZTypedocKind.Variable,
        flags: {
          isConst: true
        },
        type: {
          type: ZTypedocTypeKind.Literal,
          value: 131072
        },
        defaultValue: '131072'
      };

      typeAlias = {
        id: 487,
        name: 'Identifier',
        kind: ZTypedocKind.TypeAlias,
        type: {
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
        }
      };
    });

    describe('Property', () => {
      beforeEach(() => {
        signatures = [property];
      });

      it('should render the signature.', () => {
        assertRendersSignature('confirm: boolean = true');
      });
    });

    describe('Enum Member', () => {
      beforeEach(() => {
        signatures = [enumMember];
      });

      it('should render the signature.', () => {
        assertRendersSignature('Equal = "eq"');
      });
    });

    describe('Variable', () => {
      beforeEach(() => {
        signatures = [variable];
      });

      it('should render the signature.', () => {
        assertRendersSignature('var Maximum: 131072 = 131072');
      });
    });

    describe('Type Alias', () => {
      beforeEach(() => {
        signatures = [typeAlias];
      });

      it('should render the signature.', () => {
        assertRendersSignature('type Identifier = string | number');
      });
    });
  });

  describe('Group Signatures', () => {
    let clasz: IZTypedocEntity;
    let enumeration: IZTypedocEntity;
    let namespace: IZTypedocEntity;
    let contract: IZTypedocEntity;

    beforeEach(() => {
      clasz = {
        id: 207,
        name: 'Dog',
        kind: ZTypedocKind.Class,
        extendedTypes: [
          {
            type: ZTypedocTypeKind.Reference,
            name: 'Animal'
          }
        ],
        implementedTypes: [
          {
            type: ZTypedocTypeKind.Reference,
            name: 'IFourLegs'
          },
          {
            type: ZTypedocTypeKind.Reference,
            name: 'ICreature'
          }
        ]
      };

      namespace = {
        id: 200,
        name: 'Kingdoms',
        kind: ZTypedocKind.Namespace
      };

      contract = {
        id: 210,
        name: 'IDataQuery',
        kind: ZTypedocKind.Interface,
        typeParameter: [
          {
            id: 321,
            name: 'T1',
            kind: ZTypedocKind.TypeParameter
          },
          {
            id: 322,
            name: 'T2',
            kind: ZTypedocKind.TypeParameter
          }
        ]
      };

      enumeration = {
        id: 450,
        name: 'Operator',
        kind: ZTypedocKind.Enum
      };
    });

    describe('Class', () => {
      beforeEach(() => {
        signatures = [clasz];
      });

      it('should render the signature.', () => {
        assertRendersSignature('class Dog extends Animal implements IFourLegs, ICreature');
      });
    });

    describe('Enumeration', () => {
      beforeEach(() => {
        signatures = [enumeration];
      });

      it('should render the signature.', () => {
        assertRendersSignature('enum Operator');
      });
    });

    describe('Namespace', () => {
      beforeEach(() => {
        signatures = [namespace];
      });

      it('should render the signature.', () => {
        assertRendersSignature('namespace Kingdoms');
      });
    });

    describe('Interface', () => {
      beforeEach(() => {
        signatures = [contract];
      });

      it('should render the signature.', () => {
        assertRendersSignature('interface IDataQuery<T1, T2>');
      });
    });
  });

  describe('Unsupported Signatures', () => {
    let unsupported: IZTypedocEntity;

    beforeEach(() => {
      unsupported = {
        id: 0,
        kind: ZTypedocKind.Global,
        kindString: 'Project',
        name: '@zthun/works.core'
      };

      signatures = [unsupported];
    });

    it('should render the signature', () => {
      assertRendersSignature('[Project] @zthun/works.core');
    });
  });
});
