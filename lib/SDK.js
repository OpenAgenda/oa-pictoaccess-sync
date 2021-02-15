'use strict';

const axios = require('axios');

const baseURL = 'https://api.openagenda.com/v2';

const getLocationResByIdentifier = (agendaUid, {
  uid,
  extId
}) => extId ? `${baseURL}/agendas/${agendaUid}/locations/ext/${extId}` : `${baseURL}/agendas/${agendaUid}/locations/${uid}`;

function generateNonceGetter() {
  const used = [];

  return () => {
    const iterations = 0;
    let nonce;
    while (iterations < 10000) {
      nonce = Math.ceil(Math.random() * 10000000000);
      if (!used.includes(nonce)) {
        used.push(nonce);
        return nonce;
      }
    }
    return nonce;
  };
}

async function updateLocation(config, agendaUid, identifiers, data) {
  const {
    getAccessToken,
    getNonce
  } = config;

  const response = await axios({
    method: 'patch',
    url: getLocationResByIdentifier(agendaUid, identifiers),
    headers: {
      nonce: getNonce(),
      'access-token': await getAccessToken(),
      'content-type': 'application/json'
    },
    data
  });

  return response.data.location;
}

function generateAccessTokenGetter(secret) {
  let accessToken;

  return async () => {
    if (accessToken) {
      return accessToken;
    }

    // console.log('generating new access token');
    const { data: response } = await axios({
      method: 'post',
      url: `${baseURL}/requestAccessToken`,
      data: {
        code: secret
      },
      headers: {
        'content-type': 'application/json'
      }
    });

    accessToken = response['access_token'];

    const lifespan = Math.max(parseInt(/* response['expires_in'] */3600)*1000 - 2000, 0);
    // console.log('token will expire in %s seconds', lifespan/1000);

    setTimeout(() => {
      // console.log('resetting accessToken');
      accessToken = null;
    }, lifespan);
    console.log('generated new access token');

    return accessToken;
  };
}

module.exports = async ({ key, secret }) => {
  const internals = {
    getAccessToken: generateAccessTokenGetter(secret),
    getNonce: generateNonceGetter()
  };

  return {
    agendas: agendaUid => ({
      locations: {
        update: updateLocation.bind(null, internals, agendaUid)
      }
    })
  };
};
