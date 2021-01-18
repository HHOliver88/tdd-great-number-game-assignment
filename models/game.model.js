const Mysql                 = require('mysql');
const Model 				= require('./model');
const Constants 			= require('../config/constants');

class GameModel extends Model {
	constructor() {
		super();
	}

	async getSession() {}

	async createSession(){}

	// add the other necessary methods
}

module.exports = GameModel;