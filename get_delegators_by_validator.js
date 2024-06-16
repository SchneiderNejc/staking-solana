const { Connection, clusterApiUrl, Keypair, LAMPORTS_PER_SOL, StakeProgram, Authorized, Lockup, sendAndConfirmTransaction, PublicKey } = require("@solana/web3.js");

const main = async () => {
    const connection = new Connection(
        clusterApiUrl("devnet"), "processed");
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