/* eslint-disable require-jsdoc */
import { render } from '@testing-library/react';
import { IZTypedocComment, IZTypedocEntity, IZTypedocGroup, ZTypedocKind, ZTypedocTypeKind } from '@zthun/works.core';
import { keyBy } from 'lodash';
import React from 'react';
import { ZTypedocGroupListViewer } from './typedoc-group-list-viewer';

describe('ZTypedocGroupListViewer', () => {
  let constructor: IZTypedocEntity;
  let method: IZTypedocEntity;
  let accessor: IZTypedocEntity;
  let property: IZTypedocEntity;
  let enumMember: IZTypedocEntity;
  let namespace: IZTypedocEntity;
  let constructors: IZTypedocGroup;
  let methods: IZTypedocGroup;
  let accessors: IZTypedocGroup;
  let properties: IZTypedocGroup;
  let enumMembers: IZTypedocGroup;
  let namespaces: IZTypedocGroup;
  let comment: IZTypedocComment;

  let groups: IZTypedocGroup[];
  let dictionary: { [id: number]: IZTypedocEntity };

  beforeEach(() => {
    comment = {
      shortText: 'Some comment'
    };

    constructor = {
      id: 1,
      name: 'constructor',
      kind: ZTypedocKind.Constructor,
      comment,
      signatures: [
        {
          id: 700,
          kind: ZTypedocKind.ConstructorSignature,
          name: 'new constructor',
          type: {
            type: ZTypedocTypeKind.Reference,
            id: 1,
            name: 'constructor'
          }
        }
      ]
    };

    method = {
      id: 2,
      name: 'method',
      kind: ZTypedocKind.Method,
      signatures: [
        {
          id: 701,
          kind: ZTypedocKind.CallSignature,
          name: 'method',
          comment,
          type: {
            type: ZTypedocTypeKind.Intrinsic,
            name: 'void'
          }
        },
        {
          id: 702,
          kind: ZTypedocKind.CallSignature,
          name: 'method',
          comment,
          type: {
            type: ZTypedocTypeKind.Intrinsic,
            name: 'void'
          },
          parameters: [
            {
              id: 999,
              kind: ZTypedocKind.Parameter,
              name: 'foo',
              type: {
                type: ZTypedocTypeKind.Intrinsic,
                name: 'string'
              }
            }
          ]
        },
        {
          id: 703,
          kind: ZTypedocKind.CallSignature,
          name: 'method',
          comment,
          type: {
            type: ZTypedocTypeKind.Intrinsic,
            name: 'void'
          },
          parameters: [
            {
              id: 998,
              kind: ZTypedocKind.Parameter,
              name: 'foo',
              type: {
                type: ZTypedocTypeKind.Intrinsic,
                name: 'string'
              }
            },
            {
              id: 997,
              kind: ZTypedocKind.Parameter,
              name: 'bar',
              type: {
                type: ZTypedocTypeKind.Intrinsic,
                name: 'string'
              }
            }
          ]
        }
      ]
    };

    accessor = {
      id: 3,
      name: 'accessor',
      kind: ZTypedocKind.Accessor,
      getSignature: [
        {
          id: 801,
          kind: ZTypedocKind.GetSignature,
          name: 'accessor',
          type: {
            type: ZTypedocTypeKind.Intrinsic,
            name: 'string'
          },
          comment
        }
      ],
      setSignature: [
        {
          id: 802,
          kind: ZTypedocKind.SetSignature,
          name: 'accessor',
          comment,
          parameters: [
            {
              id: 5001,
              name: 'val',
              kind: ZTypedocKind.Parameter,
              type: {
                type: ZTypedocTypeKind.Intrinsic,
                name: 'string'
              }
            }
          ],
          type: {
            type: ZTypedocTypeKind.Intrinsic,
            name: 'void'
          }
        }
      ]
    };

    property = {
      id: 4,
      name: 'property',
      kind: ZTypedocKind.Property,
      comment
    };

    enumMember = {
      id: 5,
      name: 'Enum',
      kind: ZTypedocKind.EnumMember,
      comment
    };

    namespace = {
      id: 1000,
      name: 'namespace',
      kind: ZTypedocKind.Namespace,
      comment
    };

    dictionary = keyBy([constructor, method, accessor, property, enumMember, namespace], (en) => en.id);

    constructors = {
      kind: constructor.kind,
      title: 'Constructors',
      children: [constructor.id]
    };

    methods = {
      kind: method.kind,
      title: 'Methods',
      children: [method.id]
    };

    accessors = {
      kind: accessor.kind,
      title: 'Accessors',
      children: [accessor.id]
    };

    properties = {
      kind: property.kind,
      title: 'Properties',
      children: [property.id]
    };

    enumMembers = {
      kind: enumMember.kind,
      title: 'Enum Members',
      children: [enumMember.id]
    };

    namespaces = {
      kind: namespace.kind,
      title: 'Namespaces',
      children: [namespace.id]
    };
  });

  function createTestTarget() {
    return render(<ZTypedocGroupListViewer groups={groups} dictionary={dictionary} />);
  }

  function createRootTarget() {
    return createTestTarget().getByTestId('ZTypedocGroupListViewer-root');
  }

  describe('Invalid', () => {
    it('should not render the root if the groups are falsy.', () => {
      // Arrange
      groups = null;
      const target = createTestTarget();
      // Act
      const actual = target.queryByTestId('ZTypedocGroupListViewer-root');
      // Assert
      expect(actual).toBeFalsy();
    });

    it('should render an empty group list if the groups are empty.', () => {
      // Arrange
      groups = [];
      const target = createRootTarget();
      // Act
      const actual = target.querySelectorAll('.ZTypedocGroupListViewer-group');
      // Assert
      expect(actual.length).toEqual(0);
    });

    it('should not render any group entities where they are not located in the dictionary.', () => {
      // Arrange
      groups = [constructors, namespaces, methods, properties];
      dictionary = {};
      dictionary[constructor.id] = constructor;
      const target = createRootTarget();
      // Act
      const actual = target.querySelectorAll('.ZTypedocGroupListViewer-group-entity');
      // Assert
      expect(actual.length).toEqual(1);
    });

    it('should not render anything if the dictionary is falsy.', () => {
      // Arrange
      groups = [methods, properties];
      dictionary = null;
      const target = createRootTarget();
      // Act
      const actual = target.querySelectorAll('.ZTypedocGroupListViewer-group-entity');
      // Assert
      expect(actual.length).toEqual(0);
    });
  });

  describe('Multiple', () => {
    beforeEach(() => {
      groups = [constructors, methods, properties, accessors, enumMembers, namespaces];
    });
    it('renders the group titles.', () => {
      // Arrange
      const target = createRootTarget();
      const expected = groups.map((gr) => gr.title).join(',');
      // Act
      const headers = target.querySelectorAll('.ZTypedocGroupListViewer-group-header');
      const actual = Array.from(headers)
        .map((hr) => hr.textContent.trim())
        .join(',');
      // Assert
      expect(actual).toEqual(expected);
    });
  });

  describe('Constructor', () => {
    beforeEach(() => {
      groups = [constructors];
    });

    it('renders the group as a list of signatures.', () => {
      // Arrange
      const target = createRootTarget();
      // Act
      const actual = target.querySelectorAll('.ZTypedocSignatureListViewer-signature');
      // Assert
      expect(actual.length).toEqual(constructor.signatures.length);
    });
  });

  describe('Methods', () => {
    beforeEach(() => {
      groups = [methods];
    });

    it('renders the group as a list of signatures.', () => {
      // Arrange
      const target = createRootTarget();
      // Act
      const actual = target.querySelectorAll('.ZTypedocSignatureListViewer-signature');
      // Assert
      expect(actual.length).toEqual(method.signatures.length);
    });
  });

  describe('Accessors', () => {
    beforeEach(() => {
      groups = [accessors];
    });

    it('renders the group as a list of all get and set signatures.', () => {
      // Arrange
      const target = createRootTarget();
      // Act
      const actual = target.querySelectorAll('.ZTypedocSignatureListViewer-signature');
      // Assert
      expect(actual.length).toEqual(accessor.getSignature.length + accessor.setSignature.length);
    });

    it('renders the group with only a getter.', () => {
      // Arrange
      delete accessor.setSignature;
      const target = createRootTarget();
      // Act
      const actual = target.querySelectorAll('.ZTypedocSignatureListViewer-signature');
      // Assert
      expect(actual.length).toEqual(accessor.getSignature.length);
    });

    it('renders the group with only a setter.', () => {
      // Arrange
      delete accessor.getSignature;
      const target = createRootTarget();
      // Act
      const actual = target.querySelectorAll('.ZTypedocSignatureListViewer-signature');
      // Assert
      expect(actual.length).toEqual(accessor.setSignature.length);
    });
  });

  describe('Properties', () => {
    beforeEach(() => {
      groups = [properties];
    });

    it('renders the group as a list of properties.', () => {
      // Arrange
      const target = createRootTarget();
      // Act
      const actual = target.querySelector('.ZTypedocPropertyViewer-signature');
      // Assert
      expect(actual).toBeTruthy();
    });
  });

  describe('Enum Members', () => {
    beforeEach(() => {
      groups = [enumMembers];
    });

    it('renders the group as a list of properties.', () => {
      // Arrange
      const target = createRootTarget();
      // Act
      const actual = target.querySelector('.ZTypedocPropertyViewer-signature');
      // Assert
      expect(actual).toBeTruthy();
    });
  });

  describe('Other', () => {
    beforeEach(() => {
      groups = [namespaces];
    });

    it('renders just the comments.', () => {
      // Arrange
      const target = createRootTarget();
      // Act
      const actual = target.querySelector('.ZTypedocCommentViewer-root').textContent;
      // Assert
      expect(actual).toEqual(comment.shortText);
    });
  });
});
