/**
 * Demo use case:
 *  We'll bind ports 3010, 4500 and 9921 with mockServer
 *  We want 10 free ports and we want to reserve the ports 2018, 3010, 4500 and 9921
 *  This example will show you how to check if your ports are in use.
 *
 *  NOTE: When you reserve ports, "free ports" is not valid anymore because
 *        the reserved ports won't be checked if they are free or in use,
 *        only the ports that ARE NOT in your reserved list are the free ports.
 */

/**
 * EXAMPLE 4
 */
let mockServer = require('./mockServer.js'); // #4
mockServer(3010); // #4
mockServer(4500); // #4
mockServer(9921); // #4

/**
 * Get a number of guaranteed free ports available for a host
 * @param {number} howMany
 * @param {string} host
 * @param {number[]} freePorts
 * @returns {Promise<number[]>}
 */
let {getFreePorts, isFreePort} = require('../lib/index.js'); // require('node-port-check');

/**
 * Use the third parameter to reserve your port.
 */
getFreePorts(10, '0.0.0.0', [2018, 3010, 4500, 9921]).then((freePortsList) => {

    console.log('Free ports:', freePortsList);

    let checkPorts = freePortsList.map(item => isFreePort(item));

    Promise
        .all(checkPorts)
        .then(list => {

            list.forEach(portStatus => {

                let port = portStatus[0];
                let host = portStatus[1];
                let status = portStatus[2];

                console.log('Status ' + (status ? 'available' : 'unavailable') + ':', port, host, status);

            });

            process.exit(0);

        });

});