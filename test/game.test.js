process.env.NODE_ENV = 'test';

const chai                  = require('chai');
const expect                = chai.expect;
const Connection            = require('../config/database');
const GameModel             = require('../models/game.model');

describe("Game Model", function(){

    it('Should return expected data when a session is found.', async function(){
        let game = new GameModel();
        let random_num = 29;

        await game.createSession(
            random_num, 
            "none", 
            false
        );

        let session     = await game.getSession();

        expect(session.result.random_num).to.equal(random_num);

        expect(session.result.result).to.equal("none");

        expect(session.result.generate).to.equal(0);

        await game.truncateSessions();
    });

    after(function(){
        /* close DB connection */ 
        Connection.end();
    });

});