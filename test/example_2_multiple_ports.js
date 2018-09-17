/**
 * Demo use case:
 *  We'll bind ports 3010, 4500 and 9921 with mockServer
 *  Since we have maxRetries = 0 now in 'yourConfig' no incrementation will be done ( see example 3 for multiple ports and maxRetries > 0 )
 *  the returning port will be the first encountered free port, that is 5195
 *  ( assuming you don't have that port bound by another application )
 *
 */

/**
 * EXAMPLE 2
 */

/**
 * Get a number of guaranteed free ports available for a host
 * @param {number} howMany
 * @param {string} host
 * @param {number[]} freePorts
 * @returns {Promise<number[]>}
 */
let {getFreePorts} = require('../lib/index.js'); // require('node-port-check');

getFreePorts(10, '0.0.0.0').then((freePortsList) => {

    console.log('Free ports:', freePortsList);

    process.exit(0);

});
