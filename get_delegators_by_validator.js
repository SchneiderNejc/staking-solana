const { Connection, clusterApiUrl, Keypair, LAMPORTS_PER_SOL, StakeProgram, Authorized, Lockup, sendAndConfirmTransaction, PublicKey } = require("@solana/web3.js");

const main = async () => {
    const connection = new Connection(
        clusterApiUrl("devnet"), "processed");
    /* @note To get delegators for a specific validator is a bit tricky,
             since stake program class in @solana/web3.js doesen't
             yet have a method to do this. So we have to do it manually. */

    
    const STAKE_PROGRAM_ID = new PublicKey(
        "Stake11111111111111111111111111111111111111" // From https://docs.solanalabs.com/runtime/programs
    );
    
    // @todo paste validator's address
    const VOTE_PUB_KEY;

    const accounts = await connection.getParsedProgramAccounts(STAKE_PROGRAM_ID, {
        filters: [
            {dataSize: 200},
            {
                memcmp: {
                    offset: 124,
                    bytes: VOTE_PUB_KEY,
                },
            },
        ],
    });

    console.log(`Total number of delegators found for ${VOTE_PUB_KEY} is ${accounts.length}`)
    if (accounts.length) {
        console.log(`Sample delegator: ${JSON.stringify(accounts[0])}`);
    }
};



const runMain = async () => {
    try {
        await main();
    } catch (error) {
        console.error(error);
    }

};
runMain();