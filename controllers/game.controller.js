const Controller        = require('./controller');
const GameModel         = require('../models/game.model');

class GameController extends Controller {

    constructor() {
        super();
    }
    
    async index(req, res) {
        let gameModel   = new GameModel();
        let session     = await gameModel.getSession();

        if(session.status == false || session.result.generate == true) {
            this.page_params.DATA.random_num    = Math.floor((Math.random() * 100) + 1);
            this.page_params.DATA.result        = "none";
            this.page_params.DATA.generate      = false;

            await gameModel.clearSession();

            await gameModel.createSession(
                this.page_params.DATA.random_num, 
                this.page_params.DATA.result, 
                this.page_params.DATA.generate
            );
        }
        else {
            this.page_params.DATA.random_num    = session.result.random_num;
            this.page_params.DATA.result        = session.result.result;
            this.page_params.DATA.generate      = session.result.generate;
            this.page_params.DATA.guess_num     = session.result.guess_num;
        }

		this.page_params.PAGE.title = "Great Number Game";
        this.page_params.PAGE.view = "index";

        res.render("layouts/game.layout.ejs", this.page_params);
    }

    async reset(req, res) {
        let gameModel               = new GameModel();
        let update_session_result   = await gameModel.updateSessionStatus();

        res.redirect(update_session_result.redirect_url);
    }

    async process(req, res) {
        let gameModel   = new GameModel();
        let session     = await gameModel.getSession();
        let result      = "";
        if(req.body.guess_num == session.result.random_num) {
            result = "correct";
        }
        else if(req.body.guess_num > session.result.random_num) {
            result = "higher";
        } 
        else {
            result = "lower";
        }

        let update_session_result = await gameModel.updateSessionResult(result, req.body.guess_num);

        res.redirect(update_session_result.redirect_url);        
    }
}
module.exports = GameController;