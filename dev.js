'use strict';

process.env.APP_CONFIG = JSON.stringify({
  csvUrl: 'https://drive.google.com/uc?authuser=0&id=1VcxgAmLPOZ2isUGN6DlcMfbZeIaeY7rW',
  locationCompare: {
    geoDistanceThreshold: 100, // Distance from which consider that 2 locations are close enough
    percentSimilarThreshold: 70 // Percentage form which we consider that 2 names are similar enough
  },
  forceUpdate: false,
  oa: {
    public: '7b96f05f6cca4cd1acf1e509201c95e0',
    secret: '937510b490e842babb1a6454512464e7'
  },
  targetAgendas: [
    { "slug": "test-synchro-pictoaccess", "uid": "59503740", "title": "Test Synchro PictoAccess" }
  ]
});

require('./run');