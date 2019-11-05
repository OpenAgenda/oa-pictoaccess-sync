const sa = require('superagent');

module.exports = async function listOALocations(agendaUid) {
  let result = [];

  let locations;
  let offset = 0;
  const limit = 100;

  while (({ items: locations } = await listLocations(agendaUid, offset, limit)) && locations && locations.length) {
    result = [...result, ...locations];
    offset += limit;
  }

  return result;
};

async function listLocations(agendaUid, offset, limit) {
  const res = await sa.get(`https://openagenda.com/agendas/${agendaUid}/locations.json?offset=${offset}&limit=${limit}`);
  return res.body;
}
