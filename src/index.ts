
let showOutput: boolean = false;

const output = (...input: any[])=>{

    if (showOutput === true) {

        console.log.apply(console.log, input);

    }

};
/**
 * Get a number from within a range
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
const randomFromRange = (min: number = 1, max: number = 65535): number =>{
    return +Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Get a range of unique numbers
 * @param {number} howMany
 * @param {number[]} notIn
 * @returns {number[]}
 */
const getUniqueNumbers =(howMany: number = 1, notIn: number[] = []): number[] => {

    let storeNumbers: number[] = [];
    let min: number = 1;
    let max: number = 65535;
    let randomNr: number = randomFromRange(min, max);

    if (howMany > max - min) {
        return storeNumbers;
    }

    if (
        storeNumbers.length < howMany &&
        storeNumbers.indexOf(randomNr) === -1 &&
        notIn.indexOf(randomNr) === -1
    ) {

        storeNumbers.push(randomNr);

    }

    if (storeNumbers.length < howMany) {

        storeNumbers = [...storeNumbers, ...getUniqueNumbers(howMany - storeNumbers.length, [...storeNumbers, ...notIn])];

    }

    return storeNumbers.sort((a: number, b: number) => a - b);

};

/**
 * Returns the current port if available or the next one available by incrementing the port
 * @param {number} port
 * @param {string} host
 * @returns {Promise<number>}
 */
const nextAvailable= (port: number = 80, host: string = '0.0.0.0'): Promise<number> => {

    return new Promise((resolve) => {

        isFreePort(port, host)
            .then(portStatus => {

                let [port, , status] = portStatus;

                if (status) {

                    resolve(port);

                } else {

                    resolve(nextAvailable(++port, host));

                }

            }).catch(output);

    })

};

/**
 * Get a number of guaranteed free ports available for a host
 * @param {number} howMany
 * @param {string} host
 * @param {number[]} freePorts
 * @returns {Promise<number[]>}
 */
const getFreePorts = (howMany: number = 1, host: string = "0.0.0.0", freePorts: number[] = []): Promise<number[]> => {

    return new Promise((resolve) => {

        let uniqueNumbers: number[] = getUniqueNumbers(howMany);
        let storeFreePorts: number[] = [...freePorts];

        let stackPromises: Promise<[number, string, boolean]>[] = [];

        uniqueNumbers.forEach(port => {

            stackPromises.push(isFreePort(port, host));

        });

        Promise
            .all(stackPromises)
            .then(listStatus => {

                let filteredArrays: number[] = listStatus.filter(item => item[2] !== false).map(item => item[0]);

                filteredArrays.forEach(item => {

                    if (
                        storeFreePorts.length < howMany &&
                        storeFreePorts.indexOf(item) === -1 &&
                        freePorts.indexOf(item) === -1
                    ) {

                        storeFreePorts.push(item);

                    }

                });

                if (storeFreePorts.length < howMany) {


                    resolve([...storeFreePorts, ...getUniqueNumbers(howMany - storeFreePorts.length, [...storeFreePorts, ...freePorts])]);

                } else {

                    resolve(storeFreePorts);

                }

            }).catch(output);

    })

};

/**
 * Check if a port is free on a certain host
 * @param {number} port
 * @param {string} host
 * @returns {Promise<[number , string , boolean]>}
 */
const isFreePort = (port: number = 80, host: string = '0.0.0.0'): Promise<[number, string, boolean]> => {

    return new Promise((resolve) => {

        const net = require('net');

        if (!net.isIPv4(host) || port < 0 || port > 65535) {

            resolve([port, host, false]);

        } else {

            let server = net.createServer();

            server.on('error', () => resolve([port, host, false]));
            server.listen(port, host);

            server.on('listening', () => {

                server.close();
                server.unref();

            });

            server.on('close', () => resolve([port, host, true]));

        }

    });


};

exports.isFreePort = isFreePort;
exports.getFreePorts = getFreePorts;
exports.nextAvailable = nextAvailable;