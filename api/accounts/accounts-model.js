const db = require('../../data/db-config');

const getAll = async () => {
  const getAll = await db('accounts');
  return getAll;
}

const getById = async id => {
  const account = await db('accounts')
    .where('id', id);
  return (account);
}

const create = async account => {
  console.log('CREATE');
  const newAccountId = await db('accounts')
    .insert(account);
  return newAccountId;
}

const updateById = async (id, account) => {
  console.log('UPDATE');
  return ({ message: 'UPDATE'});
  
}

const deleteById = async id => {
  console.log('DELETE');
  return ({ message: 'DELETE'});
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
