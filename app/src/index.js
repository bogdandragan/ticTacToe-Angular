const angular = require('angular');
const uirouter = require('angular-ui-router');
const localStorage = require('angular-local-storage');

global.jQuery = require('jquery');
require('bootstrap');
require('bootstrap/dist/css/bootstrap.css');
require('./styles/font-awesome/css/font-awesome.min.css');
require('./styles/styles.css');

const app = angular.module('app',[uirouter, localStorage]);

require('./models').default(app);
require('./directives').default(app);
require('./services').default(app);
require('./config')(app);
require('./controllers').default(app);

