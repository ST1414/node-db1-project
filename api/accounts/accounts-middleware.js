const Account = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  console.log('*** Check Acct Payload ***')
  
  if (req.body.name === undefined || req.body.budget === undefined){
    res.status(400).json({ message: 'name and budget are required'});
  }
  else if (typeof req.body.name !== 'string'){
    res.status(400).json({ message: 'name of account must be a string'});
  }
  else if (typeof req.body.budget !== 'number'){
    res.status(400).json({ message: 'budget of account must be a number'});
  }
  else if (req.body.budget < 0 || req.body.budget > 1000000){
    res.status(400).json({ message: 'budget of account is too large or too small'});
  } 
  else {
    req.body.name = req.body.name.trim();
    if (req.body.name.length < 3 || req.body.name.length > 100){
      res.status(400).json({ message: 'name of account must be between 3 and 100'});
    } else {
      next();
    }
  }

}

exports.checkAccountNameUnique = (req, res, next) => {

  // checkAccountNameUnique returns a status 400 
  // with a { message: "that name is taken" } 
  // if the trimmed req.body.name already exists in the database

  Account.getByName(req.body.name)
    .then( response => {
      // Model returns an array (of one object) so we can check the length to see if the record exists
      if (response.length === 0) {
        next();
      } else {
        res.status(400).json({ message: 'that name is taken'})
      }
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    })
    
  }
  
  exports.checkAccountId = (req, res, next) => {
    
    Account.getById(req.params.id)
    .then( response => {
      // Model will only return the first record, so we are not checking an array 
      // length this time. If a record is not found, 'undefined' is returned
      console.log('Check By Id: ', response)
      if (response){ 
        next();
      } else {
        res.status(404).json({ message: 'account not found'})
      }
    })
    .catch( error => {
      res.status(500).json({ message: error.message });
    })
}
