import { LogErrorRepository } from '../../../../data/protocols/logErrorRepository';
import { MongoHelper } from '../helpers/mongoHelper';

export class LogMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorsCollection = await MongoHelper.getCollection('errors');
    await errorsCollection.insertOne({
      stack,
      date: new Date()
    });
  }
}
