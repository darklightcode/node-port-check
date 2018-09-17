/**
 * Demo use case:
 *  We'll bind ports 3010 and 3011 with mockServer
 *  It will check the availability for ports 3010, 3011 and 3012
 *  The returning port will be 3012 ( assuming you don't have that port bound by another application
 *  or else a higher port will be returned )
 *
 *  #1 - this lines won't exist in your code, their purpose it's just for testing
 */
let mockServer = require('./mockServer.js'); // #1
mockServer(3010); // #1
mockServer(3011); // #1

/**
 * EXAMPLE 1
 */
/**
 * Returns the current port if available or the next one available by incrementing the port
 * @param {number} port
 * @param {string} host
 * @returns {Promise<number>}
 */
let {nextAvailable} = require('../lib/index.js'); // require('node-port-check');

nextAvailable(3010, '0.0.0.0').then((nextAvailablePort) => {

    console.log('Available port:', nextAvailablePort);

    process.exit(0);

});
