"use strict";

const diff = require('./diff');

module.exports = ({ geoDistanceThreshold, percentSimilarThreshold }, location1, location2) => {

  const levensteinDistance = diff.levenshtein(location1.name, location2.name);

  const geoDistance = diff.distance(
    { latitude: location1.latitude, longitude: location1.longitude },
    { latitude: location2.latitude, longitude: location2.longitude }
  );

  const percentSimilar = 100 - levensteinDistance * 100 / Math.max(location1.name.length, location2.name.length);

  return geoDistance < geoDistanceThreshold && percentSimilar > percentSimilarThreshold;

}