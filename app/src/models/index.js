"use strict";

import cellModel from './cellModel'
import gameModel from './gameModel'

export default app => {
    app.factory('Cell', cellModel);
    app.factory('Game', gameModel);
}

