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
 * DELETE THIS FUNCTION IN PRODUCTION
 * Creating test - demo data for the application.
 * @param {org.sequence.model.CreateTestData} tx The sample transaction instance.
 * @transaction
 */
async function CreateTestDataTransaction(tx) {  // eslint-disable-line no-unused-vars
  
    console.log('create test data'); 
    const factory = getFactory(); 

  
    console.log('Creating a Key 1');  
	
  	// adding key 1 
    const keyReg = await getParticipantRegistry(namespace + '.Keys');   
    const key1 = await factory.newResource(namespace, 'Keys', "1");
    await keyReg.add(key1);       

    // adding key 2 
    const key2 = await factory.newResource(namespace, 'Keys', "2");
    await keyReg.add(key2);       

    // adding key 3
    const key3 = await factory.newResource(namespace, 'Keys', "3"); 
    await keyReg.add(key3);       

  
  
}

/**
 * DELETE THIS FUNCTION IN PRODUCTION
 * Deleting all data.
 * @param {org.sequence.model.DeleteAllData} tx The sample transaction instance.
 * @transaction
 */
async function DeleteAllDataTransaction(tx) {  // eslint-disable-line no-unused-vars
    console.log('clearing test data');

    // deleting assets -  keys
    const keysRegistry = await getAssetRegistry(namespace + '.Keys'); 
    let keys = await keysRegistry.getAll();
    await keysRegistry.removeAll(keys);
  
    // deleting assets -  Flavour
    const flavourRegistry = await getAssetRegistry(namespace + '.Flavour'); 
    let flavour = await flavourRegistry.getAll();
    await flavourRegistry.removeAll(flavour);

    // deleting assets -  Tokens
    const tokenRegistry = await getAssetRegistry(namespace + '.Tokens'); 
    let tokens = await tokenRegistry.getAll();
    await tokenRegistry.removeAll(tokens);
  
    // deleting assets -  Actions
    const actionsRegistry = await getAssetRegistry(namespace + '.Actions'); 
    let actions = await actionsRegistry.getAll();
    await actionsRegistry.removeAll(actions);
  
    // deleting assets -  Transactions
    const transactionsRegistry = await getAssetRegistry(namespace + '.Transactions'); 
    let transactions = await transactionsRegistry.getAll();
    await transactionsRegistry.removeAll(transactions);
 
  	// deleting participants
    const accountRegistry = await getParticipantRegistry(namespace + '.Account');
    let accounts = await accountRegistry.getAll();
    await accountRegistry.removeAll(accounts);
      
    console.log('clearing all data finished');  
  
}


