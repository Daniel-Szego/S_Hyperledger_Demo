/**
 * Sequence business and transaction logic
 */


let namespace = "org.sequence.model";

/**
 * Issunance transaction.
 * @param {org.sequence.model.Issue} tx The sample transaction instance.
 * @transaction
 */
async function IssueTransaction(tx) {  // eslint-disable-line no-unused-vars
  let flavorId = tx.flavorId;
  let amount = tx.amount;
  let destinationAccountId = tx.destinationAccountId;
  let actionTags = tx.actionTags; 
  let tokenTags = tx.tokenTags; 
  let transactionTags = tx.transactionTags; 
  
  // getting factory
  const factory = getFactory(); 

  // Call issue action
  let newAction = await IssueAction(flavorId,amount, destinationAccountId, actionTags, tokenTags, transactionTags);
    
  // Create transaction
  const transctionReg = await getAssetRegistry(namespace + '.Transaction'); 

  // getting next id
  let existingTransactions = await transctionReg.getAll();
  let existingTransactionNum = 0;
  
  await existingTransactions.forEach(function (transaction) {
    existingTransactionNum ++;
  });
  existingTransactionNum ++; 	
  
  const newTransaction = await factory.newResource(namespace, 'Transaction', existingTransactionNum.toString());

  newTransaction.timestamp =  Date.now().toString();
  newTransaction.sequenceNumber = existingTransactionNum;
  newTransaction.actions = new Array();
  newTransaction.actions.push(newAction);
  newTransaction.tags = transactionTags;
 
  transctionReg.add(newTransaction);

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
    const keyReg = await getParticipantRegistry(namespace + '.Key');   
    const key1 = await factory.newResource(namespace, 'Key', "1");
    await keyReg.add(key1);       

    // adding key 2 
    const key2 = await factory.newResource(namespace, 'Key', "2");
    await keyReg.add(key2);       

    // adding key 3
    const key3 = await factory.newResource(namespace, 'Key', "3"); 
    await keyReg.add(key3);       

    // adding Flavors 1
    const flavorsReg = await getAssetRegistry(namespace + '.Flavor');   
    const flavors1 = await factory.newResource(namespace, 'Flavor', "1"); 
    flavors1.keyIds = new Array();
    flavors1.keyIds.push(key1);
    flavors1.quorum  = 1;
    await flavorsReg.add(flavors1);       

    // adding Flavors 2
    const flavors2 = await factory.newResource(namespace, 'Flavor', "2"); 
    flavors2.keyIds = new Array();
    flavors2.keyIds.push(key2);
    flavors2.keyIds.push(key3);  
    flavors2.quorum  = 1;
    await flavorsReg.add(flavors2);       

    // adding Account 1
    const accountReg = await getParticipantRegistry(namespace + '.Account');     
    const account1 = await factory.newResource(namespace, 'Account', "1"); 
    account1.keyIds = new Array();
    account1.keyIds.push(key1);
    account1.quorum  = 1;
    await accountReg.add(account1);       
  
    // adding Account 2
    const account2 = await factory.newResource(namespace, 'Account', "2"); 
    account2.keyIds = new Array();
    account2.keyIds.push(key2);
    account2.keyIds.push(key3);  
    account2.quorum  = 1;
    await accountReg.add(account2);       
  
  
}

/**
 * DELETE THIS FUNCTION IN PRODUCTION
 * Deleting all data.
 * @param {org.sequence.model.DeleteAllData} tx The sample transaction instance.
 * @transaction
 */
async function DeleteAllDataTransaction(tx) {  // eslint-disable-line no-unused-vars
    console.log('clearing test data');
  
    // deleting assets -  Flavour
    const flavourRegistry = await getAssetRegistry(namespace + '.Flavor'); 
    let flavour = await flavourRegistry.getAll();
    await flavourRegistry.removeAll(flavour);

    // deleting assets -  Tokens
    const tokenRegistry = await getAssetRegistry(namespace + '.Token'); 
    let tokens = await tokenRegistry.getAll();
    await tokenRegistry.removeAll(tokens);
  
    // deleting assets -  Actions
    const actionsRegistry = await getAssetRegistry(namespace + '.Action'); 
    let actions = await actionsRegistry.getAll();
    await actionsRegistry.removeAll(actions);
  
    // deleting assets -  Transactions
    const transactionsRegistry = await getAssetRegistry(namespace + '.Transaction'); 
    let transactions = await transactionsRegistry.getAll();
    await transactionsRegistry.removeAll(transactions);
 
  	// deleting participants
  
    // deleting participants -  keys
    const keysRegistry = await getAssetRegistry(namespace + '.Key'); 
    let keys = await keysRegistry.getAll();
    await keysRegistry.removeAll(keys);

    // deleting participants -  Account  
    const accountRegistry = await getParticipantRegistry(namespace + '.Account');
    let accounts = await accountRegistry.getAll();
    await accountRegistry.removeAll(accounts);
      
    console.log('clearing all data finished');  
  
}

/**
 * Creating a multiaction transaction.
 * @param {org.sequence.model.STransaction} tx The sample transaction instance.
 * @transaction
 */
async function MultiActionTransaction(tx) {  // eslint-disable-line no-unused-vars
	
}





// SERVICE FUNCTIONS - ACTIONS
// ISSUE TOKEN ACTION

async function IssueAction (flavorId, 
                       amount,
                       destinationAccountId,
                       actionTags,
                       tokenTags,
                       transactionTags) {

  // INITIAL ERROR HANDLING
  if (amount < 1) {
  	throw("Amount of a newly created transaction must be bigger than zero");
  }
    
  console.log("Issue transaction action started");
  
  const factory = getFactory(); 
  
  const tokenReg = await getAssetRegistry(namespace + '.Token'); 
  
  // LOGIC DIFFERENTIATION IF TOKEN IS FUNGIBLE OR NON-FUNGIBLE ?
   
  // getting next id
  let existingTokens = await tokenReg.getAll();
  let numberOfTokens = 0;
  let existingToken;
  
  await existingTokens.forEach(function (token) {
    
    if (token.flavorID.getIdentifier() == flavorId.getIdentifier()) {  
        if ((!token.tags && !tokenTags) || (token.tags === tokenTags)) {
            if (token.accountId.getIdentifier() == destinationAccountId.getIdentifier()) {
    	  		existingToken = token;
        		}
            }
    } 
    numberOfTokens ++;
  });
  
  // create new token for the flavor
  if (!existingToken) {
	  numberOfTokens ++; 	

      const newToken = await factory.newResource(namespace, 'Token', numberOfTokens.toString());

  	  newToken.amount = amount;
  	  newToken.tags = tokenTags;
  	  newToken.flavorID  = flavorId;
  	  newToken.accountId = destinationAccountId;
  
	  await tokenReg.add(newToken);     
    
      // RAISE EVENT
      let TokenIssuedEvent = factory.newEvent(namespace, 'TokenIssued');
  	  TokenIssuedEvent.token = newToken;
  	  await emit(TokenIssuedEvent);       
  }
  // update existing token 
  else{
    
	  existingToken.amount = existingToken.amount + amount;
	  await tokenReg.update(existingToken);      
    
      // RAISE EVENT
      let TokenIssuedEvent = factory.newEvent(namespace, 'TokenIssued');
  	  TokenIssuedEvent.token = existingToken;
  	  await emit(TokenIssuedEvent);       
  }  
  
  // CREATE ISSUE ACTION
  
  const actionReg = await getAssetRegistry(namespace + '.Action'); 

  // getting next id
  let existingActions = await actionReg.getAll();
  let existingActionsNum = 0;
  
  await existingActions.forEach(function (action) {
    existingActionsNum ++;
  });
  existingActionsNum ++; 	
  
  const newAction = await factory.newResource(namespace, 'Action', existingActionsNum.toString());

  newAction.timestamp =  Date.now().toString();
  newAction.type = "Issue";
  newAction.amount = amount;
  newAction.flavorId = flavorId;
  // newAction.sourceAccountId = 0;
  newAction.filter = "";
  newAction.filterParams = new Array();
  newAction.filterParams.push("-");  
  newAction.destinationAccountId = destinationAccountId;
  
  const newSnaphot = await factory.newConcept(namespace,'Snapshot');
  newSnaphot.actionTags = new Array();
  newSnaphot.flavourTags = new Array();
  newSnaphot.sourceAccountTags = new Array();
  newSnaphot.destinationAccountTags = new Array();
  newSnaphot.tokenTags = new Array();
  newSnaphot.transactionTags = new Array();
  
  newAction.snapshot = newSnaphot;
  newAction.tags = "-";
  
  await actionReg.add(newAction);    
  
  console.log("Issue transaction action finished");
  
  return newAction;
}






