import { MongoHelper as sut } from './mongoHelper';

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await sut.diconnect();
  });

  test('Should reconnect if mongodb is down', async () => {
    let accountCollection = await sut.getCollection('accounts');
    expect(accountCollection).toBeTruthy();
    await sut.diconnect();
    accountCollection = await sut.getCollection('accounts');
    expect(accountCollection).toBeTruthy();
  });
});
