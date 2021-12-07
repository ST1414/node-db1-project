const router = require('express').Router()
const Account = require('./accounts-model')
const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
  // returns an array of accounts (or an empty array if there aren't any).
  try {
    const all = await Account.getAll();
    res.json(all);
  } catch (error) {
    next(error);
  }
})


// ######## WORKING #############
router.get('/:id', checkAccountId, async (req, res, next) => {
  // returns an account by the given id.
  try {
    const account = await Account.getById(req.params.id);
    res.json(account);
  } catch (error) {
    next(error);
  }
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  // returns the created account. 
  // Leading or trailing whitespace on budget name should be trimmed
  try {
    console.log('ROUTER')
    const newAccount = await Account.create(req.body);
    res.status(201).json(newAccount);
  } catch (error) {
    next(error);
  }

})


router.put('/:id', async (req, res, next) => {
  // returns the updated account
  // trim white space before sending
  try {
    const updatedAccount = await Account.updateById(req.params.id, req.body);
    res.status(200).json(updatedAccount);
  } catch (error) {
    next(error);
  }
});


router.delete('/:id', async (req, res, next) => {
  // returns the deleted account
  try {
    const deletedAccount = await Account.deleteById(req.params.id);
    res.status(204).json(deletedAccount);
  } catch (error) {
    next(error);
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  console.log('ERROR HANDLING')
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})


module.exports = router;
