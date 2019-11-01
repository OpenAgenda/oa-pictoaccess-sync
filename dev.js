'use strict';

const config = require('./config.dev');

process.env.APP_CONFIG = JSON.stringify({
  csvUrl: config.csvPath,
  locationCompare: {
    geoDistanceThreshold: 100, // Distance from which consider that 2 locations are close enough
    percentSimilarThreshold: 70 // Percentage form which we consider that 2 names are similar enough
  },
  forceUpdate: config.forceUpdate,
  oa: {
    secret: config.secretKey
  },
  targetAgendas: [
    { "slug": "test-synchro-pictoaccess", "uid": "59503740", "title": "Test Synchro PictoAccess" }
  ]
});

require('./run');
