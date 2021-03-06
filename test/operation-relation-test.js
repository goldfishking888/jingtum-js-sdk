/**
 * Test Relation and remove Relation operations
*/
const expect         = require('chai').expect;
const Wallet         = require('../lib/Wallet');
const RelationOperation = require('../lib/RelationOperation');
const RemoveRelationOperation = require('../lib/RemoveRelationOperation');
const config         = require('../config.json');
const fingate        = require('../lib/FinGate');
const tdat           = require('./test_data.json');

fingate.setMode(fingate.DEVELOPEMENT);

describe('Test relation operation and remove relation operation', function() {

	describe('test normal create relation', function() {
		it('change environment', function () {
			var wallet = new Wallet(tdat.DEV.wallet1.secret);

			fingate.setMode(fingate.PRODUCTION);
			var relation1 = new RelationOperation(wallet);
			expect(relation1._server._serverURL).to.equal(config.server);

			fingate.setMode(fingate.DEVELOPEMENT);
			var relation2 = new RelationOperation(wallet);
			expect(relation2._server._serverURL).to.equal(config.test_server);
		});

		it('sync swt/usd relation', function(done) {
			var wallet = new Wallet(tdat.DEV.wallet2.secret);
			var relation = new RelationOperation(wallet);
			relation.setValidate(true);
			relation.setCounterparty(tdat.DEV.wallet1.address);
			relation.setType(relation.AUTHORIZE);
			relation.setAmount(tdat.DEV.CNYAmount1);
			relation.submit(function (err, data) {
				expect(err).to.be.null;
				expect(data.success).to.be.equal(true);
				expect(data.state).to.be.equal('validated');
				done();
			});
			this.timeout(15000);
		});
		it('async swt/usd relation', function(done) {
			var wallet = new Wallet(tdat.DEV.wallet2.secret);
			var relation = new RelationOperation(wallet);
			relation.setValidate(false);
			relation.setCounterparty(tdat.DEV.wallet1.address);
			relation.setType(relation.AUTHORIZE);
			relation.setAmount(tdat.DEV.CNYAmount1);
			relation.submit(function (err, data) {
				expect(err).to.be.null;
				expect(data.success).to.be.equal(true);
				expect(data.state).to.be.equal('pending');
				done();
			});
		});
	});

	describe('test normal remove relation', function() {
		it('change environment', function () {
			var wallet = new Wallet(tdat.DEV.wallet1.secret);

			fingate.setMode(fingate.PRODUCTION);
			var relation1 = new RemoveRelationOperation(wallet);
			expect(relation1._server._serverURL).to.equal(config.server);

			fingate.setMode(fingate.DEVELOPEMENT);
			var relation2 = new RemoveRelationOperation(wallet);
			expect(relation2._server._serverURL).to.equal(config.test_server);
		});

		it('sync swt/usd relation', function(done) {
			var wallet = new Wallet(tdat.DEV.wallet2.secret);
			var relation = new RemoveRelationOperation(wallet);
			relation.setValidate(true);
			relation.setCounterparty(tdat.DEV.wallet1.address);
			relation.setType(relation.AUTHORIZE);
			relation.setAmount(tdat.DEV.CNYAmount1);
			relation.submit(function (err, data) {
				expect(err).to.be.null;
				expect(data.success).to.be.equal(true);
				expect(data.state).to.be.equal('validated');
				done();
			});
			this.timeout(15000);
		});
		it('async swt/usd relation', function(done) {
			var wallet = new Wallet(tdat.DEV.wallet2.secret);
			var relation = new RemoveRelationOperation(wallet);
			relation.setValidate(false);
			relation.setCounterparty(tdat.DEV.wallet1.address);
			relation.setType(relation.AUTHORIZE);
			relation.setAmount(tdat.DEV.CNYAmount1);
			relation.submit(function (err, data) {
				expect(err).to.be.null;
				expect(data.success).to.be.equal(true);
				expect(data.state).to.be.equal('pending');
				done();
			});
		});
	});
});

