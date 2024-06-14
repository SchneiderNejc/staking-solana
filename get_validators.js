const { Connection, clusterApiUrl } = require("@solana/web3.js");

const main = async() => {
    const connection = new Connection(
        clusterApiUrl("devnet"), "processed");
    const { current, delinquent } = await connection.getVoteAccounts();
const runMain = async() => {
    try {
        await main();
    } catch (error) {
        console.error(error);
    }

};
runMain();