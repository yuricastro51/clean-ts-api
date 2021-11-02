import { Collection } from 'mongodb';
import { MongoHelper } from '../helpers/mongoHelper';
import { LogMongoRepository } from './log';

interface SutTypes {
  sut: LogMongoRepository
}

const makeSut = (): SutTypes => {
  const sut = new LogMongoRepository();
  return { sut };
};

describe('Log Mongo Repository', () => {
  let errorCollection: Collection;
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await MongoHelper.diconnect();
  });

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors');
    await errorCollection.deleteMany({});
  });

  test('Should create an error log on success', async () => {
    const { sut } = makeSut();
    await sut.logError('any_error');
    const count = await errorCollection.countDocuments();
    expect(count).toBe(1);
  });
});
