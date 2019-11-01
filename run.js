'use strict';

// npm imports
const _ = require('lodash');
const sa = require('superagent');

// local imports
const SDK = require('./lib/SDK');
const csv = require('./lib/loadCSVData');
const listOALocations = require('./lib/listOALocations');

const config = Object.assign({
  csvUrl: null, // required
  oa: { public: null, secret: null },
  targetAgendas: [],
  locationCompare: {
    geoDistanceThreshold: 100, // Distance from which consider that 2 locations are close enough
    percentSimilarThreshold: 70 // Percentage form which we consider that 2 names are similar enough
  },
  forceUpdate: false,
}, JSON.parse(process.env.APP_CONFIG));

const locationIsSame = require('./lib/locationIsSame').bind(null, config.locationCompare);

(async () => {

  console.log(`\nStarting Sync`)
  console.log(`Parsing CSV file at: ${config.csvUrl}`)

  const res = await sa.get(config.csvUrl);
  const entries = await csv(res.text);

  console.log(`Parsed CSV has ${entries.length} entries`)

  try {

    const client = await SDK(_.pick(config.oa, ['secret']));

    // Loop over all agendas

    for (const agenda of config.targetAgendas) {

      let matchedCount = 0;
      let updatedCount = 0;

      // Get all locations for an agenda
      console.log(`Fetching all locations for agenda: ${agenda.slug} (${agenda.uid})`)
      const OALocations = await listOALocations(agenda.uid);

      console.log(`Fetched ${OALocations.length} locations`);

      for (let location of OALocations) {

        console.log(`\nProcessing ${location.name}`)

        const matchingEntry = _.first(entries.filter(entry => locationIsSame(
          { name: entry.page, latitude: entry.latitude, longitude: entry.longitude },
          { name: location.name, latitude: location.latitude, longitude: location.longitude }
        )));

        if (!matchingEntry) {
          console.log('No matches found in CSV. Skipping to next location');
          continue;
        };

        matchedCount++;
        console.log(`Matched location: ${location.name} == ${matchingEntry.page}`);

        if (!config.forceUpdate && location.extId) {
          console.log('Attribute extId already set. Skipping to next location');
          continue;
        }

        if (config.forceUpdate) {
          console.log('Forcing update')
        }

        let newLinks = location.links.indexOf(matchingEntry.widget_link) == -1 ? [...location.links, matchingEntry.widget_link] : location.links;

        console.log(`Sending post request to /locations/${location.uid}`);
        const res = await client.v1('post', `/locations/${location.uid}`, {
          data: {
            agenda_uid: agenda.uid,
            extId: matchingEntry.uid,
            links: newLinks
          }
        });

        updatedCount++;
      }

      console.log(`\nSync completed`)
      console.log(`${matchedCount} total matched locations for agenda: ${agenda.slug} (${agenda.uid})`);
      console.log(`${updatedCount} updated locations for agenda: ${agenda.slug} (${agenda.uid})`);

    }

  } catch (e) {
    console.log(e);
  }

  process.exit();
})();
