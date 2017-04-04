import socketClient from 'socket.io-client';

export function setupRealtime(store, actions) {
  const io = socketClient();

  io.on('entry-change', (change) => {
    let state = store.getState();
    if (!change.old_val) {
      store.dispatch(actions.addEntrySuccess(change.new_val));
    } else if (!change.new_val) {
      store.dispatch(actions.deleteEntrySuccess(change.old_val));
    } else {
      store.dispatch(actions.editEntrySuccess(change.new_val));
    }
  });

  return io;
}