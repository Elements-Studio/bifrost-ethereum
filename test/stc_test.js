const STCToken = artifacts.require("STC");

contract("STCToken-ERC20-Test", accounts => {

    const [sender, owner, to, , acc1, acc2, acc3] = accounts;
    const MAGNITUDE = 10 ** 9;
    let stc;

    beforeEach(async() => {
        stc = await STCToken.new({from: owner});
        // stc = await STCToken.new("Starcoin Token", "STC", 9);
    });

    it("should have name STC Token", async() => {
        assert.equal(await stc.name.call(), "Starcoin Token");
    });

    it("should have symbol STC", async() => {
        assert.equal(await stc.symbol.call(), "STC");
    });

    it("should have decimals 9", async() => {
        assert.equal(await stc.decimals.call(), 9);
    });

    it("total supply should be 0 ", async() => {
        // assert.equal(await stc.totalSupply.call(), 1000000000 * MAGNITUDE);
        assert.equal(await stc.totalSupply.call(), 0);
    })

    it("balance of account should be right", async() => {
        // assert.equal(await stc.balanceOf.call(owner), 1000000000 * MAGNITUDE);
        assert.equal(await stc.balanceOf.call(acc1), 0);
        assert.equal(await stc.balanceOf.call(acc2), 0);
        assert.equal(await stc.balanceOf.call(acc3), 0);
    })

    it("deposit tokens from starcoin chain should be successful", async() => {
        await stc.depositFromStarcoinChain(acc1, 100 * MAGNITUDE, {from: owner});
        assert.equal(await stc.balanceOf.call(owner), 0);
        assert.equal(await stc.balanceOf.call(acc1), 100 * MAGNITUDE);
    })

    it("withdraw tokens to starcoin chain should be successful", async() => {
        const toStcAddress = "0x1656458E740A96c7aC84eA5D39F89829"; //starcoin address，最长16个字节
        await stc.depositFromStarcoinChain(acc1, 100 * MAGNITUDE, {from: owner});
        assert.equal(await stc.balanceOf.call(acc1), 100 * MAGNITUDE);
        await stc.withdrawToStarcoinChain(toStcAddress, 100 * MAGNITUDE, {from: acc1});
        assert.equal(await stc.balanceOf.call(owner), 0);
        assert.equal(await stc.balanceOf.call(acc1), 0);
    })

    // it("transfer 100 tokens should be successful", async() => {
    //     await stc.transfer(acc1, 100 * MAGNITUDE, {from: owner});
    //     assert.equal(await stc.balanceOf.call(owner), (1000000000 - 100) * MAGNITUDE);
    //     assert.equal(await stc.balanceOf.call(acc1), 100 * MAGNITUDE);
    // })

    // it("approve 100 tokens should be successful", async() => {
    //     await stc.approve(acc1, 100 * MAGNITUDE, {from: owner});
    //     assert.equal(await stc.allowance(owner, acc1), 100 * MAGNITUDE);
    // })

    // // same to approve
    // it("allowance of account should be successful", async() => {
    //     await stc.approve(acc1, 100 * MAGNITUDE, {from: owner});
    //     assert.equal(await stc.allowance(owner, acc1), 100 * MAGNITUDE);
    // })
    //
    // it("increase apporval 100 tokens should be successful", async() => {
    //     await stc.increaseApproval(acc1, 100 * MAGNITUDE, {from: owner});
    //     assert.equal(await stc.allowance(owner, acc1), 100 * MAGNITUDE);
    // })
    //
    // it("decrease approval 100 tokens should be successful", async() => {
    //     await stc.approve(acc1, 100 * MAGNITUDE, {from: owner});
    //     await stc.decreaseApproval(acc1, 100 * MAGNITUDE, {from: owner});
    //     assert.equal(await stc.allowance(owner, acc1), 0);
    // })
    //
    // it("transfer from 100 tokens should be successful", async() => {
    //     await stc.approve(acc1, 100 * MAGNITUDE, {from: owner});
    //     await stc.transferFrom(owner, acc2, 100*MAGNITUDE, {from: acc1});
    //     assert.equal(await stc.allowance(owner, acc1), 0 * MAGNITUDE);
    //     assert.equal(await stc.balanceOf.call(acc1), 0);
    //     assert.equal(await stc.balanceOf.call(owner), (1000000000 - 100) * MAGNITUDE);
    //     assert.equal(await stc.balanceOf.call(acc2), 100 * MAGNITUDE);
    // })
})
