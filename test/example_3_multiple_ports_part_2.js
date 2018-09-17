/**
 * Demo use case:
 *  These demo will generate 10 ports.
 *  If you use the third parameter the returned free ports will contain the reserved list of ports.
 *
 *  NOTE: When you reserve ports, "free ports" is not valid anymore because
 *        the reserved ports won't be checked if they are free or in use,
 *        only the ports that ARE NOT in your reserved list are the free ports.
 */

/**
 * EXAMPLE 3
 */

/**
 * Get a number of guaranteed free ports available for a host
 * @param {number} howMany
 * @param {string} host
 * @param {number[]} freePorts
 * @returns {Promise<number[]>}
 */
let {getFreePorts} = require('../lib/index.js'); // require('node-port-check');

/**
 * Use the third parameter to reserve your port.
 */
getFreePorts(10, '0.0.0.0', [3000, 3001, 3002, 3003, 3009]).then((freePortsList) => {

    console.log('Free ports:', freePortsList);

    process.exit(0);

});