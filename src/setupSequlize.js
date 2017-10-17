const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://giljquew:Vm-5zvhByXZjG7L2hk7KN4DSHn-TDswf@elmer.db.elephantsql.com:5432/giljquew', {
      define: {
        timestamps: false // true by default
      }
    });
    // sequelize.authenticate().then(() => {
    //   console.log('Connection has been established successfully.');
    // })
    // .catch(err => {
    //   console.error('Unable to connect to the database:', err);
    // });
    const TodoTest = sequelize.define('todo', {
        title: {
          type: Sequelize.STRING
        },
        completed: {
          type: Sequelize.BOOLEAN
        }
    });

TodoTest.sync();
module.exports = TodoTest;