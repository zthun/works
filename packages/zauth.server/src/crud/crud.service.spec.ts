import { BadRequestException, NotFoundException } from '@nestjs/common';
import { IZDatabase, ZDatabaseMemory } from '@zthun/dal';
import { createSpyObj } from 'jest-createspyobj';
import { identityAsync } from '../common/identity-async.function';
import { noopAsync } from '../common/noop-async.function';
import { IZCrudFlow } from './crud-flow.interface';
import { ZCrudService } from './crud.service';

describe('ZCrudService', () => {
  const collection = 'Identifiers';
  let dal: IZDatabase;
  let red: { _id: string, name?: string };
  let green: { _id: string, name?: string };
  let flow: jest.Mocked<IZCrudFlow<any>>;

  beforeAll(() => {
    dal = ZDatabaseMemory.connect('crud-service-test');
  });

  beforeEach(async () => {
    red = { _id: 'red' };
    green = { _id: 'green' };

    flow = createSpyObj('flow', ['collection', 'validateCreate', 'validateUpdate', 'validateRemove', 'sanitize']) as unknown as jest.Mocked<IZCrudFlow<any>>;
    flow.collection.mockReturnValue(collection);
    flow.validateCreate.mockImplementation(identityAsync);
    flow.validateUpdate.mockImplementation((o, t) => Object.assign({}, o, t));
    flow.validateRemove.mockImplementation(noopAsync);
    flow.sanitize.mockImplementation(identityAsync);
  });

  afterEach(async () => {
    await dal.delete(collection).run();
  });

  function createTestTarget() {
    return new ZCrudService(dal);
  }

  describe('List', () => {
    beforeEach(async () => {
      await dal.create(collection, [red, green]).run();
    });

    it('returns all items.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = [red, green];
      // Act
      const actual = await target.list(flow);
      // Assert
      expect(actual).toEqual(expected);
    });
  });

  describe('Create', () => {
    it('creates an item.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const created = await target.create(red, flow);
      const blobs = await dal.read<{ _id: string, name?: string }>(collection).filter({ _id: created._id }).run();
      const actual = blobs[0];
      // Assert
      expect(actual._id).toEqual(red._id);
    });

    it('throws the exception from validateCreate.', async () => {
      // Arrange
      const target = createTestTarget();
      flow.validateCreate.mockRejectedValue(new BadRequestException());
      // Act
      // Assert
      await expect(target.create(red, flow)).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('Read', () => {
    beforeEach(async () => {
      await dal.create(collection, [red, green]).run();
    });

    it('reads an item.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.read(red._id, flow);
      // Assert
      expect(actual._id).toEqual(red._id);
    });

    it('throws a NotFoundException if no such item exists.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      // Assert
      await expect(target.read('blue', flow)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('sanitizes the item.', async () => {
      // Arrange
      const target = createTestTarget();
      flow.sanitize.mockImplementation((i: { _id: string, name?: string }) => Promise.resolve({ _id: i._id, name: 'sanitized' }));
      // Act
      const actual = await target.read(red._id, flow);
      // Assert
      expect(actual.name).toEqual('sanitized');
    });
  });

  describe('Update', () => {
    beforeEach(async () => {
      await dal.create(collection, [red, green]).run();
    });

    it('updates the item.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = { _id: red._id, name: 'Red' };
      // Act
      await target.update(red._id, { name: 'Red' }, flow);
      const blobs = await dal.read<{ _id: string, name?: string }>(collection).filter({ _id: red._id }).run();
      const actual = blobs[0];
      // Assert
      expect(actual).toEqual(expected);
    });

    it('throws a NotFoundException if the item does not exist.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      // Assert
      await expect(target.update('blue', {}, flow)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('throws an HttpException if the validation fails.', async () => {
      // Arrange
      const target = createTestTarget();
      flow.validateUpdate.mockRejectedValue(new BadRequestException());
      // Act
      // Assert
      await expect(target.update(red._id, red, flow)).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('Delete', () => {
    beforeEach(async () => {
      await dal.create(collection, [red]).run();
    });

    it('deletes the item.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.remove(red._id, flow);
      const blobs = await dal.read(collection).filter({ _id: red._id }).run();
      // Assert
      expect(blobs.length).toEqual(0);
    });

    it('throws a NotFoundException if there is no item.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      // Assert
      await expect(target.remove('n/a', flow)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('throws an HttpException if the validation fails.', async () => {
      // Arrange
      const target = createTestTarget();
      flow.validateRemove.mockRejectedValue(new BadRequestException());
      // Act
      // Assert
      await expect(target.remove(red._id, flow)).rejects.toBeInstanceOf(BadRequestException);
    });
  });
});
