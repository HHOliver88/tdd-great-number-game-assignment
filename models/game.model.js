const Mysql                 = require('mysql');
const Model 				= require('./model');
const Constants 			= require('../config/constants');

class GameModel extends Model {
	constructor() {
		super();
	}

	async getSession() {
	
	}

	async createSession(random_num, result, generate){
		let response_data 	    = {status: false, result: [], err: null, redirect_url: null};
		let redirect_url 		= Constants.FRONTEND_URL + ':' + Constants.PORT + '/';
		
		try{
			let insert_session_query  	= Mysql.format(`INSERT INTO sessions(random_num, result, generate) VALUES (?, ?, ?);`, [random_num, result, generate]);
			let insert_session_result 	= await this.executeQuery(insert_session_query);

			if(insert_session_result){
				response_data.status 		= true;
				response_data.redirect_url 	= redirect_url;
			}else{
				response_data.message 	= "Something went wrong";
			}
		}catch(err){
			response_data.err 			= err;
			response_data.message 		= "Something went wrong";
		};

		return response_data;		
	}

	async updateSessionStatus() {
		// updates sessions.generate where generate = 0;
	}

	async updateSessionResult(result, guess_num) {
		// updates session.result and session.guess_num where generate = 0;
	}

	async clearSession() {
		// deletes sessions where generate = 1;
	}

	// used only by test. Do not remove this.
	async truncateSessions() {
		let response_data 	    = {status: false, result: [], err: null, redirect_url: null};
		try{
			let truncate_sessions_query		= Mysql.format(`truncate sessions;`);
			let truncate_sessions_result 	= await this.executeQuery(truncate_sessions_query);

			if(truncate_sessions_result){
				response_data.status 		= true;
			}else{
				response_data.message 	= "Something went wrong";
			}
		}catch(err){
			response_data.err 			= err;
			response_data.message 		= "Something went wrong";
		};		
	}
}

module.exports = GameModel;