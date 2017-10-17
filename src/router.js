const todoListApi = require('../src/api/todoListApi');
module.exports = (app) => {
  app.use('/api', todoListApi);
};