const { Connection, clusterApiUrl, Keypair, LAMPORTS_PER_SOL, StakeProgram, Authorized, Lockup, sendAndConfirmTransaction } = require("@solana/web3.js");

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
    const amountToStake = minimumRent * (0.5 * LAMPORTS_PER_SOL);
    const createStakeAccountTx = StakeProgram.createAccount({
        authorized: new Authorized(wallet.publicKey, wallet.publicKey),
        fromPubkey: wallet.publicKey,
        lamports: amountToStake,
        lockup: new Lockup(0, 0, wallet.publicKey), // 0 = already expired.
        stakePubkey: stakeAccount.publicKey
    });
    const createStakeAccountTxId = await sendAndConfirmTransaction(
        connection, createStakeAccountTx, [wallet, stakeAccount]
    ); // Should return tx id.
};


const runMain = async() => {
    try {
        await main();
    } catch (error) {
        console.error(error);
    }

};
runMain();