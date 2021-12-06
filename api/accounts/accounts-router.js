const router = require('express').Router()
const Account = require('./accounts-model')

router.get('/', async (req, res, next) => {
  try {
    const all = await Account.getAll();
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})


router.get('/:id', async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id);
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


router.post('/', async (req, res, next) => {
  
  // trim white space before sending - do in middleware???

  try {
    const newAccountId = await Account.create(req.body);
    const newAccount = await Account.getById(newAccountId);
    res.status(201).json(newAccount);

  } catch (error) {
    res.status(500).json({ error: error.message})
  }
})


router.put('/:id', async (req, res, next) => {
    // trim white space before sending - do in middleware???

  try {
    const what = await Account.updateById(req.params.id, req.body);
    res.status(200).json(what); // UPDATE STATUS
  } catch (error) {
    res.status(500).json({ error: error.message})
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const what = await Account.deleteById(req.params.id);
    res.status(200).json(what); // UPDATE STATUS
  } catch (error) {
    res.status(500).json({ error: error.message})  
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
