"use strict";

const levenshtein = require('fast-levenshtein');

const geolib = require('geolib');

module.exports.levenshtein = (s1, s2) => {

  try {
    return levenshtein.get(s1, s2);
  } catch (e) {
    console.log(l1, l2);
    throw e;
  }

}

module.exports.distance = (l1, l2) => {
  return geolib.getDistance({ latitude: l1.latitude, longitude: l1.longitude }, { latitude: l2.latitude, longitude: l2.longitude });
}
