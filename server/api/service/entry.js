import r from 'rethinkdb';
import config from 'config';
import xss from 'xss';

function connect() {
  return r.connect(config.get('rethinkdb'));
}

export function liveUpdates(io) {
  console.log('Setting up listener...');
  connect()
  .then(conn => {
    r
    .table('entries')
    .changes().run(conn, (err, cursor) => {
      console.log('Listening for changes...');
      cursor.each((err, change) => {
        console.log('Change detected', change);
        io.emit('entry-change', change);
      });
    });
  });
}

export function getEntries() {
  return connect()
  .then(conn => {
    return r
    .table('entries')
    .orderBy(r.desc('created')).run(conn)
    .then(cursor => cursor.toArray());
  });
}

export function addEntry(entry) {
  return connect()
  .then(conn => {
    entry.created = new Date();
    entry.text = xss(entry.text);
    return r
    .table('entries')
    .insert(entry).run(conn)
    .then(response => {
      return Object.assign({}, entry, {id: response.generated_keys[0]});
    });
  });
}

export function editEntry(id, entry) {
  entry.updated = new Date();
  entry.text = xss(entry.text);
  return connect()
  .then(conn => {
    return r
    .table('entries')
    .get(id).update(entry).run(conn)
    .then(() => entry);
  });
}

export function deleteEntry(id) {
  return connect()
  .then(conn => {
    return r
    .table('entries')
    .get(id).delete().run(conn)
    .then(() => ({id: id, deleted: true}));
  });
}