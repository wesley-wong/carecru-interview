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
    .table('blogpost')
    .changes().run(conn, (err, cursor) => {
      console.log('Listening for changes...');
      cursor.each((err, change) => {
        console.log('Change detected', change);
        io.emit('event-change', change);
      });
    });
  });
}

export function getEvents() {
  return connect()
  .then(conn => {
    return r
    .table('blogpost')
    .orderBy(r.desc('created')).run(conn)
    .then(cursor => cursor.toArray());
  });
}

export function addEvent(event) {
  return connect()
  .then(conn => {
    event.created = new Date();
    event.text = xss(event.text);
    return r
    .table('blogpost')
    .insert(event).run(conn)
    .then(response => {
      return Object.assign({}, event, {id: response.generated_keys[0]});
    });
  });
}

export function editEvent(id, event) {
  event.updated = new Date();
  event.text = xss(event.text);
  return connect()
  .then(conn => {
    return r
    .table('blogpost')
    .get(id).update(event).run(conn)
    .then(() => event);
  });
}

export function deleteEvent(id) {
  return connect()
  .then(conn => {
    return r
    .table('blogpost')
    .get(id).delete().run(conn)
    .then(() => ({id: id, deleted: true}));
  });
}