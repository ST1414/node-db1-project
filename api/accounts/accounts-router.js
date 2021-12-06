const router = require('express').Router()
const Account = require('./accounts-model')

router.get('/', async (req, res, next) => {
  // returns an array of accounts (or an empty array if there aren't any).
  try {
    const all = await Account.getAll();
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})


router.get('/:id', async (req, res, next) => {
  // returns an account by the given id.
  try {
    const account = await Account.getById(req.params.id);
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


router.post('/', async (req, res, next) => {
  // returns the created account. 
  // Leading or trailing whitespace on budget name should be trimmed
  try {
    const newAccount = await Account.create(req.body);
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ error: error.message})
  }

})


router.put('/:id', async (req, res, next) => {
  // returns the updated account
  // trim white space before sending
  try {
    const updatedAccount = await Account.updateById(req.params.id, req.body);
    res.status(200).json(updatedAccount);
  } catch (error) {
    res.status(500).json({ error: error.message})
  }
});


router.delete('/:id', async (req, res, next) => {
  // returns the deleted account
  try {
    const deletedAccount = await Account.deleteById(req.params.id);
    res.status(204).json(deletedAccount);
  } catch (error) {
    res.status(500).json({ error: error.message})  
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
