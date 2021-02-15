'use strict';

const _ = require('lodash');
const writeCSVFile = require('./writeCSVFile');

const defaults = {
  agenda: '',
  name: '',
  address: '',
  latitude: '',
  longitude: '',
  extId: '',
  result: ''
};

const codes = {
  noMatch: 'No matches found in CSV. Skipping to next location',
  oldMatch: 'Pre-existing match',
  newMatch: 'New match'
};

function _agenda(agenda) {
  return _.get(agenda, 'slug', _.get(agenda, 'uid'));
}

function _filename(dir) {
  const now = new Date();
  const _fZ = n => (n < 10 ? '0' : '') + n;
  return `${dir}/../../home/jelastic/ROOT/logs/oa-pictoaccess-sync-${now.getFullYear()}-${_fZ(now.getMonth() + 1)}-${_fZ(now.getDate())}T${_fZ(now.getHours())}:${_fZ(now.getMinutes())}.csv`;
}

module.exports = outputDir => {
  const out = [];
  // log a line for a csv file
  return Object.assign((agenda, location, code, extId) => {
    console.log(agenda.uid, location.name, codes[code]);
    out.push({
      ...defaults,
      ..._.pick(location, Object.keys(defaults)),
      agenda: _agenda(agenda),
      result: code,
      ...(extId ? { extId } : {})
    });
  }, {
    generateCSV: () => writeCSVFile(_filename(outputDir), out)
  });
};
