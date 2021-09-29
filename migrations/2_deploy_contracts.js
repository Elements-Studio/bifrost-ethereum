const stc_token = artifacts.require("STC");

const stc_token_eth_mainnet = "0xEe9801669C6138E84bD50dEB500827b776777d28";
const stc_token_eth_ropsten = "0x7994De3d469715DF27DF8B0E5f614762d68A846c";

const stc_token_bsc_mainnet = "0xEe9801669C6138E84bD50dEB500827b776777d28";
const stc_token_bsc_testnet = "0x59923DBa13e99f2ac6E2376eC322Fe49EC003C1C";

const stc_token_heco_mainnet = "0xEe9801669C6138E84bD50dEB500827b776777d28";
const stc_token_heco_testnet = "0x6D2c5B89EB052c07940BA91dF6E2de8C1508E659";

module.exports = function (deployer, network, accounts) {
    switch (network) {
        /* Mainnet Deployer */
        case "eth_mainnet_bifrost":
            deploySTCTokenMainnet(deployer, network); break;
        case "heco_mainnet_bifrost":
            deploySTCTokenMainnet(deployer, network); break;
        case "bsc_mainnet_bifrost":
            deploySTCTokenMainnet(deployer, network); break;

        /* Testnet Deployer */
        case "eth_ropsten_bifrost":
            deploySTCTokenTestnet(deployer, network); break;
        case "heco_testnet_bifrost":
            deploySTCTokenTestnet(deployer, network); break;
        case "bsc_testnet_bifrost":
            deploySTCTokenTestnet(deployer, network); break;
    }
};

/* ------------------------------
        Mainnet Deployer
------------------------------ */

function deploySTCTokenMainnet(deployer, network) {
    ensureMainnet(network);
    deployer.deploy(stc_token);
}

/* ------------------------------
        Testnet Deployer
------------------------------ */

function deploySTCTokenTestnet(deployer, network) {
    ensureNotMainnet(network);
    deployer.deploy(stc_token);
}

/* ------------------------------
            Utilities
------------------------------ */

function ensureMainnet(network) {
    if (!network.includes("mainnet")) {
        console.log(`ERROR!!! You're deploying contracts into non-mainnet network. Current network = ${network}`);
        process.exit(1);
    }
}

function ensureNotMainnet(network) {
    if (network.includes("mainnet")) {
        console.log(`ERROR!!! You're deploying contracts into mainnet. Current network = ${network}`);
        process.exit(1);
    }
}
