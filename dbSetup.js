/* global Promise */
import r from 'rethinkdb';
import config from 'config';

const rethinkdb = config.get('rethinkdb');
const DATABASE = rethinkdb.db || 'carecru';
const TABLES = ['blogpost'];

r.connect(rethinkdb)
.then(conn => {
  console.log(' [-] Database Setup');
  return createDbIfNotExists(conn)
  .then(() => Promise.all(TABLES.map((table) => createTableIfNotExists(conn, table))))
  .then(() => closeConnection(conn));
});

const createDbIfNotExists = (conn) => {
  return getDbList(conn)
  .then((list) => {
    if(list.indexOf(DATABASE) === -1) {
      return createDatabase(conn);
    } else {
      console.log(' [!] Database already exists:', DATABASE);
      return Promise.resolve(true);
    }
  });
}

const createTableIfNotExists = (conn, table)  => {
  return getTableList(conn)
  .then((list) => {
    if(list.indexOf(table) === -1) {
      return createTable(conn, table);
    } else {
      console.log(' [!] Table already exists:', table);
      return Promise.resolve(true);
    }
  });
}

const getDbList = (conn)  => {
  return r.dbList().run(conn);
}

const getTableList = (conn)  => {
  return r.db(DATABASE).tableList().run(conn);
}

const createDatabase = (conn)  => {
  console.log(' [-] Create Database:', DATABASE);
  return r.dbCreate(DATABASE).run(conn);
}

const createTable = (conn, table)  => {
  console.log(' [-] Create Table:', table);
  return r.db(DATABASE).tableCreate(table).run(conn);
}

const closeConnection = (conn)  => {
  console.log(' [x] Close connection!');
  return conn.close();
}