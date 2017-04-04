import * as service from './service/entry';

export function getEntries(req, res) {
  service.getEntries()
  .then((entries) => res.json(entries))
  .catch(err => {
    res.status(400);
    res.json({error: err});
  });
}

export function addEntry(req, res) {
  service.addEntry(req.body)
  .then((entry) => res.json(entry))
  .catch(err => {
    res.status(400);
    res.json({error: err, entry: req.body});
  });
}

export function editEntry(req, res) {
  service.editEntry(req.params.id, req.body)
  .then((entry) => res.json(entry))
  .catch(err => {
    res.status(400);
    res.json({error: err, entry: req.body});
  });
}

export function deleteEntry(req, res) {
  service.deleteEntry(req.params.id)
  .then((entry) => res.json(entry))
  .catch(err => {
    res.status(400);
    res.json({error: err, entry: req.body});
  });
}

