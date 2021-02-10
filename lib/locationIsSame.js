'use strict';

const _ = require('lodash');
const levenshtein = require('fast-levenshtein');

function getDistance(l1, l2) {
  const radlat1 = Math.PI * l1.latitude / 180;
  const radlat2 = Math.PI * l2.latitude / 180;
  const radtheta = Math.PI * (l1.longitude - l2.longitude) / 180;

  return 60 * 1.1515 * 1609.344 * 180 / Math.PI * Math.acos(Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta));
}

module.exports = ({ geoDistanceThreshold, percentSimilarThreshold }, location1, location2) => {
  const levensteinDistance = levenshtein.get(location1.name, location2.name);
  const geoDistance = getDistance(
    _.pick(location1, ['latitude', 'longitude']),
    _.pick(location2, ['latitude', 'longitude'])
  );

  const percentSimilar = 100 - levensteinDistance * 100 / Math.max(location1.name.length, location2.name.length);
  return geoDistance < geoDistanceThreshold && percentSimilar > percentSimilarThreshold;
};
