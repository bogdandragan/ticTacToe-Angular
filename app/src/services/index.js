"use strict";

import gameService from './gameService'

export default app => {
    app.factory('gameService', gameService);
}

