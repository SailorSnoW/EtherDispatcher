const Dispatch = artifacts.require("Dispatcher");

contract("Dispatcher Test", accounts => {
    let address1 = accounts[1];
    let address2 = accounts[2];
    let address3 = accounts[3];
    let pool = accounts[9];
    let owner = accounts[0];

    before(async () => {
        this.dispatch = await Dispatch.new(address1, address2, address3, {from: owner});
    })

    context("Dispatching tests", () => {
        it("should correctly dispatch with the right fees", async () => {
            let amountToDispatch = '96';
            let expectedRewardsAddr1 = (100 + (parseInt(amountToDispatch) * 9650 / 10000)).toString();
            let expectedRewardsAddr2 = (100 + (parseInt(amountToDispatch) * 200 / 10000)).toString();
            let expectedRewardsAddr3 = (100 + (parseInt(amountToDispatch) * 150 / 10000)).toString();

            await web3.eth.sendTransaction({ from: pool, to: this.dispatch.address, value: web3.utils.toWei(amountToDispatch, 'ether')});

            let address1Balance = await web3.eth.getBalance(address1);
            let address2Balance = await web3.eth.getBalance(address2);
            let Address3Balance = await web3.eth.getBalance(address3);

            expect(address1Balance).to.be.equal(web3.utils.toWei(expectedRewardsAddr1, 'ether'));
            expect(address2Balance).to.be.equal(web3.utils.toWei(expectedRewardsAddr2, 'ether'));
            expect(Address3Balance).to.be.equal(web3.utils.toWei(expectedRewardsAddr3, 'ether'));
        })
    })
})