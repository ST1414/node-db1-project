const db = require('../../data/db-config');

const getAll = async () => {
  const getAll = await db('accounts');
  return getAll;
}

const getById = async id => {
  // select * from accounts where id = 1;
  // The query eturns an array of matches, by adding first() the query
  // returns only one value without the array. If no value found, it will
  // return undefined
  const account = await db('accounts')
    .where('id', id)
    .first(); // <<<
  return (account);
}

const create = async account => {
  // insert into accounts (name, budget) values ('terry', '100');
  const newAccountId = await db('accounts')
    .insert(account);
  const newAccount = await getById(newAccountId);
  return newAccount;
}

const updateById = async (id, account) => {
  // update accounts set name = 'hugh', budget = 1919 where id = 15;
  await db('accounts')
    .update(account)
    .where('id', id);
  const updatedAccount = getById(id);
  return updatedAccount;
  
}

const deleteById = async id => {
  // delete from accounts where id = 17;
  const deletedAccount = getById(id);
  await db('accounts')
    .delete()
    .where('id', id);
  return deletedAccount;
}

const getByName = async name => {
  const account = await db('accounts')
    .where('name', name);
  return account;

}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getByName,
}
