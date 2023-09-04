const { expect } = require("chai");
const { ethers } = require("hardhat")

describe("FactoryYourCoin contract", () => {
    const fakeData = {
        name: "TestCoin",
        symbol: "TC"
    };

    const fakeTotalTokenAllowSecondAccount = "5000000000000000000000"

    async function deployContract(from) {
        const [owner, anotherAccount] = await ethers.getSigners();
        const FactoryYourCoin = await ethers.getContractFactory("FactoryYourCoin")
        const factoryYourCoin = await FactoryYourCoin.deploy({
            from: from || owner.address
        })
        return { contract: factoryYourCoin, owner, anotherAccount }
    }


    function getCoinContractByAddress(address) {
        return ethers.getContractAt(
            "YourCustomCoin", address
        )
    }

    it("Should be crate your custom token when call createCoin", async function () {
        const { contract } = await deployContract()
        await contract
            .createCoin(
                fakeData.name,
                fakeData.symbol
            )

        const coinsDeployed = await contract.getCoinsDeployed();
        expect(coinsDeployed.length).to.equal(1)
    });

    it("Should be return address last coin created when call getLastCoinDeployed method", async function () {
        const { contract } = await deployContract()
        await contract
            .createCoin(
                fakeData.name,
                fakeData.symbol
            )

        const [coinsDeployed, lastCoinDeployed] = await Promise.all([
            contract.getCoinsDeployed(),
            contract.getLastCoinDeployed()
        ])

        expect(coinsDeployed.length).to.equal(1)
        expect(coinsDeployed[0]).to.equal(lastCoinDeployed)
    });


    it("Should be crate has 2 coins after call createCoin 2 times", async function () {
        const { contract } = await deployContract()
        await contract
            .createCoin(
                fakeData.name,
                fakeData.symbol
            )
        await contract
            .createCoin(
                fakeData.name,
                fakeData.symbol
            )

        const coinsDeployed = await contract.getCoinsDeployed();
        expect(coinsDeployed.length).to.equal(2)
    });

    it("Should be check if create coin with name and symbol corretly", async function () {
        const { contract } = await deployContract();
       
        await contract
            .createCoin(
                fakeData.name,
                fakeData.symbol
            )

        const coinsDeployed = await contract.getCoinsDeployed();
        const contractAddress = coinsDeployed[0];

        const yourCustomCoin = await getCoinContractByAddress(contractAddress)
        
        expect(await yourCustomCoin.name()).to.equal(fakeData.name);
        expect(await yourCustomCoin.symbol()).to.equal(fakeData.symbol);
    });


    it("Should be check if create owner is correctly after create your custom coin", async function () {
        const [owner] = await ethers.getSigners();
        const { contract } = await deployContract(owner.address)

        await contract
            .createCoin(
                fakeData.name,
                fakeData.symbol
            )

        const coinsDeployed = await contract.getCoinsDeployed();
        const contractAddress = coinsDeployed[0];

        const yourCustomCoin = await getCoinContractByAddress(contractAddress)

        expect(await yourCustomCoin.symbol()).to.equal(fakeData.symbol);
    });

    it("Should be check if owner has your custom coin", async function () {
        const [owner] = await ethers.getSigners();
        const { contract } = await deployContract(owner.address)
        await contract
            .createCoin(
                fakeData.name,
                fakeData.symbol
            )

        const coinsDeployed = await contract.getCoinsDeployed();
        const contractAddress = coinsDeployed[0];

        const yourCustomCoin = await getCoinContractByAddress(contractAddress)
        const totalTokens = await yourCustomCoin.balanceOf(owner.address)
        expect(parseInt(totalTokens)).to.equal(parseInt('10000000000000000000000'));
    });


    it("Should be return 1 token to another accounts because owner send 1 coin", async function () {
        const [owner, anotherAccount] = await ethers.getSigners();
        const { contract } = await deployContract(owner.address)
        await contract
            .createCoin(
                fakeData.name,
                fakeData.symbol
            )

        const coinsDeployed = await contract.getCoinsDeployed();
        const contractAddress = coinsDeployed[0];

        const yourCustomCoin = await getCoinContractByAddress(contractAddress)
        await yourCustomCoin.transfer(anotherAccount.address, "1000000000000000000")
        const totalTokens = await yourCustomCoin.balanceOf(anotherAccount.address)
        expect(parseInt(totalTokens)).to.equal(1000000000000000000);
    });

    it("Should be return 0 to another accounts because dont have coin created per another account", async function () {
        const [owner, anotherAccount] = await ethers.getSigners();
        const { contract } = await deployContract(owner.address)
        await contract
            .createCoin(
                fakeData.name,
                fakeData.symbol
            )

        const coinsDeployed = await contract.getCoinsDeployed();
        const contractAddress = coinsDeployed[0];

        const yourCustomCoin = await getCoinContractByAddress(contractAddress)
        const totalTokens = await yourCustomCoin.balanceOf(anotherAccount.address)
        expect(parseInt(totalTokens)).to.equal(0);
    });

    it("Should be approve 5000 tokens to another account", async function () {
        const [owner, anotherAccount] = await ethers.getSigners();
        const { contract } = await deployContract(owner.address)
        await contract
            .createCoin(
                fakeData.name,
                fakeData.symbol
            )

        const coinsDeployed = await contract.getCoinsDeployed();
        const contractAddress = coinsDeployed[0];

        const yourCustomCoin = await getCoinContractByAddress(contractAddress)
        
        await yourCustomCoin.approve(
            anotherAccount.address, fakeTotalTokenAllowSecondAccount
        )

        const totalTokensApproved = await yourCustomCoin.allowance(
            owner.address, anotherAccount.address
        )

        expect(parseInt(totalTokensApproved)).to.equal(parseInt(fakeTotalTokenAllowSecondAccount));
    });


    it("Should be account approved transform  1 tokens to another account", async function () {
        const [owner, anotherAccount, thirdAccount] = await ethers.getSigners();
        const { contract } = await deployContract(owner.address)
        await contract
            .createCoin(
                fakeData.name,
                fakeData.symbol
            )

        const coinsDeployed = await contract.getCoinsDeployed();
        const contractAddress = coinsDeployed[0];

        let yourCustomCoin = await getCoinContractByAddress(contractAddress)

        await yourCustomCoin.approve(
            anotherAccount.address, fakeTotalTokenAllowSecondAccount
        )

        yourCustomCoin = await ethers.getContractAt(
            "YourCustomCoin", contractAddress, anotherAccount
        )

        await yourCustomCoin.transferFrom(
            owner.address, thirdAccount.address, "1000000000000000000"
        )

        const totalTokens = await yourCustomCoin.balanceOf(thirdAccount.address)
        expect(parseInt(totalTokens)).to.equal(parseInt("1000000000000000000"));
        
        yourCustomCoin = await getCoinContractByAddress(contractAddress)
        const totalTokensCanGive = await yourCustomCoin.allowance(owner.address, anotherAccount.address)
        expect(parseInt(totalTokensCanGive)).to.equal(parseInt("4999000000000000000000"))

    });
})