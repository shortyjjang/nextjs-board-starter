import IndexedDb from "../indexDB";

export default function useIndexDB(
  INDEXEDDB_KEY: string,
  INDEXEDDB_STORE_KEY: string
) {
  const setIndexedDb = async (
    INDEXEDB_STORE_VALUE_KEY: string,
    values: any
  ) => {
    const indexedDb = new IndexedDb(INDEXEDDB_KEY);
    await indexedDb.createObjectStore([INDEXEDDB_STORE_KEY]);
    await indexedDb.putValue(
      INDEXEDDB_STORE_KEY,
      values,
      INDEXEDB_STORE_VALUE_KEY
    );
  };

  const getAllIndexedDb = async () => {
    const indexedDb = new IndexedDb(INDEXEDDB_KEY);
    await indexedDb.createObjectStore([INDEXEDDB_STORE_KEY]);
    const savedDBnLists = await indexedDb.getAllValue(INDEXEDDB_STORE_KEY);
    return savedDBnLists;
  };
  const getIndexDbByKey = async (INDEXEDB_STORE_VALUE_KEY: string) => {
    const indexedDb = new IndexedDb(INDEXEDDB_KEY);
    await indexedDb.createObjectStore([INDEXEDDB_STORE_KEY]);
    const savedDBnLists = await indexedDb.getValue(
      INDEXEDDB_STORE_KEY,
      INDEXEDB_STORE_VALUE_KEY
    );
    return savedDBnLists;
  };

  const deleteIndexDbByKey = async () => {
    const indexedDb = new IndexedDb(INDEXEDDB_KEY);
    await indexedDb.createObjectStore([INDEXEDDB_STORE_KEY]);
    await indexedDb.deleteAllValue(INDEXEDDB_STORE_KEY);
  };
  return { setIndexedDb, getAllIndexedDb, getIndexDbByKey, deleteIndexDbByKey };
}
