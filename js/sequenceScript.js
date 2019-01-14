/**
 * New script file
 */


let namespace = "org.sequence.model";

/**
 * Issunance transaction.
 * @param {org.sequence.model.Issue} tx The sample transaction instance.
 * @transaction
 */
async function IssueTransaction(tx) {  // eslint-disable-line no-unused-vars
  let flavourId = tx.flavourId
  let amount = tx.amount
  let destinationAccountId = tx.destinationAccountId
  let actionTags = tx.actionTags 
  let tokenTags = tx.tokenTags 
  let transactionTags = tx.transactionTags 

  const factory = getFactory(); 
  
  const tokenReg = await getAssetRegistry(namespace + '.Tokens'); 
  
  // getting next id
  let existingTokens = await tokenReg.getAll();
  let numberOfTokens = 0;
  
  await existingTokens.forEach(function (token) {
    numberOfTokens ++;
  });
  numberOfTokens ++; 	

  const token = await factory.newResource(namespace, 'Tokens', numberOfTokens.toString());
  token.amount = amount;
  token.tags = tokenTags;
  token.flavorID  = flavourId;
  token.accountId = destinationAccountId;
  
  await tokenReg.add(token);      
  
  // RAISE EVENT
  
  
}

/**
 * Transfer transaction.
 * @param {org.sequence.model.Transfer} tx The sample transaction instance.
 * @transaction
 */
async function TransferTransaction(tx) {  // eslint-disable-line no-unused-vars
  let flavourId = tx.flavourId
  let amount = tx.amount
  let sourceAccountId = tx.sourceAccountId
  let destinationAccountId = tx.destinationAccountId
  let actionTags = tx.actionTags 
  let tokenTags = tx.tokenTags 
  let transactionTags = tx.transactionTags 

  
}

/**
 * Transfer transaction.
 * @param {org.sequence.model.Retire} tx The sample transaction instance.
 * @transaction
 */
async function RetireTransaction(tx) {  // eslint-disable-line no-unused-vars
  let flavourId = tx.flavourId
  let amount = tx.amount
  let sourceAccountId = tx.sourceAccountId
  let tokenTags = tx.tokenTags 
  let transactionTags = tx.transactionTags 


  
  
}



/**
 * Retire transaction.
 * @param {org.sequence.model.CreateTestData} tx The sample transaction instance.
 * @transaction
 */
async function CreateTestDataTransaction(tx) {  // eslint-disable-line no-unused-vars
  
}

/**
 * Retire transaction.
 * @param {org.sequence.model.DeleteAllData} tx The sample transaction instance.
 * @transaction
 */
async function DeleteAllDataTransaction(tx) {  // eslint-disable-line no-unused-vars

  
}

