/*
 * Node JS SDK for Jingtum network； Operation
 * @version 1.0.0
 * Copyright (C) 2016 by Jingtum Inc.
 * or its affiliates. All rights reserved.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * ---------------------------------------------------------------  
 * Operation   
 *   OrderOperation
 */
const stringformat   = require('stringformat');
const RELATIONS      = '/accounts/{0}/relations';
const Operation      = require('./Operation');
const ParamException = require('./Error').ParamException;
const base           = require('jingtum-base-lib').Wallet;
const isAmount       = require('./DataCheck').isAmount;

/*
 * Class to remove Relation for one account
 * This should contain 
 */
function RemoveRelationOperation(wallet) {
  try{
    if (!wallet || typeof wallet !== 'object' || !wallet.secret)
      throw new ParamException("Invalid wallet");
  }catch(e){console.log(e);return;}

  Operation.call(this,wallet);
  this._method = 'DELETE';
  this._url = stringformat(RELATIONS, this._wallet.address);
  this.AUTHORIZE = 'authorize';
  this.FRIEND = 'friend';
}
RemoveRelationOperation.prototype = new Operation();

RemoveRelationOperation.prototype.setType = function(type) {
  try{
    if ( type === this.AUTHORIZE ||  type === this.FRIEND)
      this._type = type;
    else
      throw new ParamException("Invalid relation type!");
  }catch(e){console.log(e);}
};

RemoveRelationOperation.prototype.setCounterparty = function(counterparty) {
  try{
    if (base.isValidAddress(counterparty))
      this._counterparty = counterparty;
    else
      throw new ParamException("Invalid relation type!");
  }catch(e){console.log(e);}
};

RemoveRelationOperation.prototype.setAmount = function(amount) {
  try{
    if (!isAmount(amount))
      throw new ParamException("Invalid amount!");
    this._amount = amount;
  }catch(e){console.log(e);}
};

RemoveRelationOperation.prototype._payload = function() {
  //Just check if the required parameters are empty
  try{
    if (!this._type || !this._counterparty || !this._amount)
      throw new ParamException("Please set params first!");
  }catch(e){console.log(e);return;}

  var _data ={
    secret: this._wallet.secret,
    type: this._type,
    counterparty: this._counterparty,
    amount: {
      limit: this._amount.value,
      currency: this._amount.currency,
      issuer: this._amount.issuer
    }
  };
  return _data;
};

/*
* For batch operation parameters
*/
RemoveRelationOperation.prototype._getOperation = function() {
  //Not supported in 1.0.2
  return null;
};


module.exports = RemoveRelationOperation;

