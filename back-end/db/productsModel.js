const config = require('./server/config.js');
const { Client } = require('pg')
const client = new Client({
  user: config.POSTGRES_USER,
  host: '127.0.0.1',
  database: 'products',
  password: config.POSTGRES_PASSWORD,
  port: 5432,
});


client.connect()
const sql =

client.query(sql, (err, res) => {
  console.log(res.rows[0]);
  client.end();
});