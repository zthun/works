import { ConflictException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { IZGroup, ZGroupBuilder } from '@zthun/auth.core';
import { IZDatabase, ZDatabaseMemory, ZDatabaseOptionsBuilder } from '@zthun/dal';
import { v4 } from 'uuid';
import { Collections } from '../common/collections.enum';
import { ZGroupsController } from './groups.controller';

describe('ZGroupsController', () => {
  let dc: IZGroup;
  let marvel: IZGroup;
  let image: IZGroup;
  let dal: IZDatabase;

  function createTestTarget() {
    return new ZGroupsController(dal);
  }

  beforeAll(() => {
    dal = ZDatabaseMemory.connect(new ZDatabaseOptionsBuilder().database('group-controller-test').timeout(1000).build());
  });

  beforeEach(async () => {
    marvel = new ZGroupBuilder().name('Marvel').build();
    dc = new ZGroupBuilder().name('DC').build();

    image = new ZGroupBuilder().id(v4()).name('Image').system().build();
    await dal.create(Collections.Groups, [image]).run();
  });

  afterEach(async () => {
    await dal.delete(Collections.Groups).run();
  });

  describe('List', () => {
    beforeEach(async () => {
      [marvel, dc] = await dal.create(Collections.Groups, [marvel, dc]).run();
    });

    it('returns the items.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.list();
      // Assert
      expect(actual).toEqual([image, marvel, dc]);
    });
  });

  describe('Create', () => {
    it('creates the item.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const created = await target.create(dc);
      const [actual] = await dal.read(Collections.Groups).filter({ _id: created._id }).run();
      // Assert
      expect(actual).toEqual(created);
    });

    it('throws a ConflictException if the name exists.', async () => {
      // Arrange
      const target = createTestTarget();
      await target.create(dc);
      // Act
      const promise = target.create(dc);
      // Assert
      await expect(promise).rejects.toBeInstanceOf(ConflictException);
    });
  });

  describe('Read', () => {
    it('reads an item.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.read({ _id: image._id });
      // Assert
      expect(actual).toEqual(image);
    });

    it('throws a NotFoundException if the item does not exist.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const promise = target.read({ _id: 'not-a-valid-id' });
      // Assert
      await expect(promise).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('Update', () => {
    it('updates an item.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = Object.assign({}, image, { name: 'Image Comics' });
      // Act
      const actual = await target.update({ _id: image._id }, { name: 'Image Comics' });
      // Assert
      expect(actual).toEqual(expected);
    });

    it('updates an item with itself (identity).', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = image;
      // Act
      const actual = await target.update({ _id: image._id }, { name: image.name });
      // Assert
      expect(actual).toEqual(expected);
    });

    it('throws a NotFoundException if the item does not exist.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const promise = target.update({ _id: 'not-an-item' }, { name: 'What?' });
      // Assert
      await expect(promise).rejects.toBeInstanceOf(NotFoundException);
    });

    it('throws a ConflictException if the update name conflicts with another item.', async () => {
      // Arrange
      const target = createTestTarget();
      await dal.create(Collections.Groups, [dc]).run();
      // Act
      const promise = target.update({ _id: image._id }, { name: dc.name });
      // Assert
      await expect(promise).rejects.toBeInstanceOf(ConflictException);
    });
  });

  describe('Delete', () => {
    beforeEach(async () => {
      [dc] = await dal.create(Collections.Groups, [dc]).run();
    });

    it('deletes the item.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.remove({ _id: dc._id });
      // Assert
      expect(actual).toEqual(dc);
    });

    it('throws a NotFouncException if the item does not exist.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const promise = target.remove({ _id: marvel._id });
      // Assert
      await expect(promise).rejects.toBeInstanceOf(NotFoundException);
    });

    it('throws a ForbiddenException if the group is a system group.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const promise = target.remove({ _id: image._id });
      // Assert
      await expect(promise).rejects.toBeInstanceOf(ForbiddenException);
    });
  });
});
