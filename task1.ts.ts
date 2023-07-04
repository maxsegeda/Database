import { MongoClient, Db, Collection } from 'mongodb';

const connectToMongoDB = async (): Promise<{ client: MongoClient, db: Db, collection: Collection }> => {
  const uri = 'mongodb://localhost:27017/books_collection';
  const dbName = 'books_collection';
  const collectionName = 'books';

  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  return { client, db, collection };
};

const sumNumbersFromCollection = async (): Promise<number> => {
  try {
    const { collection } = await connectToMongoDB();

    const numbers = await collection.find().toArray();
    const sum = numbers.reduce((acc, num) => acc + num.value, 0);

    return sum;
  } catch (error) {
    console.error('Произошла ошибка', error);
    throw error;
  }
};

sumNumbersFromCollection()
  .then((result) => console.log('Сумма чисел:', result))
  .catch((error) => console.error('Произошла ошибка', error));







  