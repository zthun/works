/* eslint-disable require-jsdoc */
import { act, fireEvent, render } from '@testing-library/react';
import { IZTypedocEntity, ZTypedocKind, ZTypedocTypeKind } from '@zthun/works.core';
import { first, last } from 'lodash';
import React from 'react';
import { ZTypedocSignatureListViewer } from './typedoc-signature-list-viewer';

describe('ZTypedocSignatureListViewer', () => {
  let getSignature: IZTypedocEntity;
  let setSignature: IZTypedocEntity;
  let callSignature: IZTypedocEntity;
  let constructorSignature: IZTypedocEntity;
  let treatCallSignatureAsFunction: boolean;
  let signatures: IZTypedocEntity[];

  beforeEach(() => {
    treatCallSignatureAsFunction = false;
    signatures = null;

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
  });

  function createTestTarget() {
    return render(<ZTypedocSignatureListViewer signatures={signatures} treatCallSignatureAsFunction={treatCallSignatureAsFunction} />);
  }

  function assertRendersSignature(expected: string) {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.getByTestId('ZTypedocSignatureListViewer-root').querySelector('.ZTypedocSignatureListViewer-signature').textContent;
    // Assert
    expect(actual).toEqual(expected);
  }

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

    it('should render the signature with the keyword function if the signature is being treated as such.', () => {
      treatCallSignatureAsFunction = true;
      assertRendersSignature('function calling<T extends ExtensionType, T2>(a: T, ...b: T2[]): MyReference');
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
