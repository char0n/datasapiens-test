const Q = require('q');
const path = require('path');
const sqlFixtures = require('sql-fixtures');
const postgresConfig = require(path.join('..', 'postgres-config.json'));

const dbConfig = {
  client: 'pg',
  connection: {
    host: postgresConfig.host,
    user: postgresConfig.user,
    password: postgresConfig.password,
    database: postgresConfig.database,
    port: postgresConfig.port
  }
};

/*eslint-disable */
const dataSpec = {
  categories: [
    {name: 'Food'},
    {name: 'Accommodation'},
    {name: 'Transportation'},
    {name: 'Children'}
  ],
  users: [
    {first_name: 'Vladimir', last_name: 'Gorej'},
    {first_name: 'Miroslav', last_name: 'Gorej'},
    {first_name: 'Alena', last_name: 'Gorej'},
    {first_name: 'Jozef', last_name: 'Sotak'},
    {first_name: 'Peter', last_name: 'Sotak'},
    {first_name: 'Magda', last_name: 'Sotak'}
  ],
  entries: [
    {name: 'Rent', type: 'expense', amount: 12, created: new Date('2016-06-06T13:55:00'), category_id: 'categories:1', user_id: 'users:0'},
    {name: 'Water Bill', type: 'expense', amount: 14.2, created: new Date('2016-06-18T13:55:00'), category_id: 'categories:1', user_id: 'users:0'},
    {name: 'Electricity Bill', type: 'expense', amount: 1, created: new Date('2016-07-01T13:55:00'), category_id: 'categories:1', user_id: 'users:0'},
    {name: 'Salary', type: 'income', amount: 56, created: new Date('2016-07-06T13:55:00'), category_id: null, user_id: 'users:0'},

    {name: 'Bus fares', type: 'expense', amount: 43, created: new Date('2016-06-01T13:55:00'), category_id: 'categories:2', user_id: 'users:2'},
    {name: 'Salary', type: 'income', amount: 22, created: new Date('2016-06-16T13:55:00'), category_id: null, user_id: 'users:1'},
    {name: 'Bicycle', type: 'expense', amount: 12, created: new Date('2016-06-25T13:55:00'), category_id: 'categories:3', user_id: 'users:1'},

    {name: 'Rent', type: 'expense', amount: 14.3, created: new Date('2016-06-01T13:55:00'), category_id: 'categories:1', user_id: 'users:3'},
    {name: 'Water Bill', type: 'expense', amount: 18.3, created: new Date('2016-06-16T13:55:00'), category_id: 'categories:1', user_id: 'users:4'},
    {name: 'Electricity Bill', type: 'expense', amount: 7, created: new Date('2016-06-25T13:55:00'), category_id: 'categories:1', user_id: 'users:5'},
  ]
};
/*eslint-enable */

const createFixtures = Q.async(function * () {
  return new Promise((resolve, reject) => {
    sqlFixtures.create(dbConfig, dataSpec, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
});

Q.spawn(function * () {
  try {
    const fixtures = yield createFixtures();
    console.info('Fixtures loaded successfully\n', fixtures);
  } catch (e) {
    console.error('Error while loading fixtures', e);
  }
  sqlFixtures.disconnect();
});
