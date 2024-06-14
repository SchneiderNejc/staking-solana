const { Connection, clusterApiUrl } = require("@solana/web3.js");

const main = async() => {
    const connection = new Connection(
        clusterApiUrl("devnet"), "processed");
    const wallet = Keypair.generate();
    const airdropSignature = await connection.requestAirdrop(
        wallet.publicKey, 1* LAMPORTS_PER_SOL);
    await connection.confirmTransaction(airdropSignature);

    // Verify balance
    const balance = await connection.getBalance(wallet.publicKey);
    console.log(balance);

    // Create stake account
    const stakeAccount = Keypair.generate();
    const minimumRent = await connection.getMinimumBalanceForRentExemption(
        StakeProgram.space);
};


const runMain = async() => {
    try {
        await main();
    } catch (error) {
        console.error(error);
    }

};
runMain();