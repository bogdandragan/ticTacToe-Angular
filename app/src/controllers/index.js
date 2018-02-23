"use strict";

import gameCtrl from './gameCtrl'
import homeCtrl from './homeCtrl'

export default app => {
    app.controller('homeCtrl', homeCtrl);
    app.controller('gameCtrl', gameCtrl);
}