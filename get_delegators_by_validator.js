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
    });

    stakeStatus = await connection.getStakeActivation(stakeAccount.publicKey);
    console.log(`Stake account status: ${stakeStatus.state}`);
};


const runMain = async () => {
    try {
        await main();
    } catch (error) {
        console.error(error);
    }

};
runMain();