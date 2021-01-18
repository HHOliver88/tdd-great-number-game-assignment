const Controller        = require('./controller');
const GameModel         = require('../models/game.model');

class GameController extends Controller {

    constructor() {
        super();
    }
    
    async index(req, res) {}

    async reset(req, res) {}

    async process(req, res) {}
}
module.exports = GameController;