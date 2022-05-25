
import {EVM_REVERT, tokens } from './helpers'
const { transferPromiseness } = require('chai-as-promised')

const token = artifacts.require('./token')
require('chai')
.use(require('chai-as-promised'))
.should()


contract('token',async ([deployer,receiver,exchange]) => {
    let Token
    const name = "Avinaash"
    const symbol = 'Avi'
    const totalSupply = tokens(7)
    const decimals = '18'

    beforeEach(async ()=> {
     Token = await token.new()

    })
    describe('deployment', ()=>{
        it('tracks the name',async ()=>{
          
           const result = await Token.name()
           //console.log(result)
            result.should.equal(name)
        })
        it('tracks the symbol', async()=>{
                const result = await Token.symbol()
                result.should.equal(symbol)
        })
        it('tracks the decimals', async()=>{
            const result = await Token.decimals()
                result.toString().should.equal(decimals)
        })
        it('tracks the total supply', async()=>{
            const result = await Token.totalSupply()
                result.toString().should.equal(totalSupply.toString())
        })
        it('Assigns the total supply to the deployer', async()=>{
            const result = await Token.balanceOf(deployer)
                result.toString().should.equal(totalSupply.toString())
        })
    })

    describe('Sending Tokens',() =>{
        let amount
        let result

        describe('success',async()=>{
            beforeEach(async ()=> {
                amount = tokens(3)
               result = await Token.transfer(receiver,amount, {from: deployer});
           
           })
            it('tranfers token balances',async()=>{
                let balanceOf
                balanceOf = await Token.balanceOf(deployer)
                balanceOf.toString().should.equal(tokens(4).toString())
                balanceOf = await Token.balanceOf(receiver)
                balanceOf.toString().should.equal(tokens(3).toString())
            })
    
            it('Triggers a Transfer Event',async()=>{
                    const log = result.logs[0]
                    log.event.should.equal('Transfer')
                    const event = log.args
                    event.from.toString().should.equal(deployer,'from is correct')
                    event.to.should.equal(receiver,'to is correct')
                    event.value.toString().should.equal(amount.toString(),'values is correct')
            })

        })

        describe('failure',async()=>{
        
            it('rejects insufficent balance', async() =>{
                let invalidAmount
                invalidAmount = tokens(8)
                await Token.transfer(receiver,invalidAmount,{from: deployer}).should.be.rejectedWith(EVM_REVERT)
                invalidAmount = tokens(1)
                await Token.transfer(deployer,invalidAmount,{from: receiver}).should.be.rejectedWith(EVM_REVERT)
            })

            it('rejects invalid recipients', async() =>{
              // await Token.transfer(0x0,tokens(1),{from: deployer}).should.be.rejectedWith(EVM_REVERT)
            })
   

        }) 


    })

    describe('approving tokens', async()=>{
            let result
            let amount
            
            beforeEach(async()=>{
                amount = tokens(2)
                result = await Token.approve(exchange,amount,{from: deployer})
            })
            
            describe('Success',async()=>{
                    it('allocated an allowance for delegated token spending on exchange',async()=>{
                        const allowance = await Token.allowance(deployer,exchange)
                        allowance.toString().should.equal(amount.toString())
                    })

                    it('emits an Approval Event',async()=>{
                        const log = result.logs[0]
                    log.event.should.equal('Approval')
                    const event = log.args
                    event.owner.toString().should.equal(deployer,'from is correct')
                    event.spender.should.equal(exchange,'spender is correct')
                    event.value.toString().should.equal(amount.toString(),'value is correct')
                    })
            })

            describe('Failure',async()=>{

                it('rejects invalid spender', async() =>{
                  //  await Token.approve(0x0,amount,{from : deployer}).should.be.rejectedWith(EVM_REVERT)
                })

            })
    })


    describe('Delegated token transfers',() =>{
        let amount
        let result
    
        beforeEach(async()=>{
            amount = tokens(5)
            await Token.approve(exchange,amount,{from: deployer})
        })
    
        describe('success',async()=>{
            beforeEach(async ()=> {
                amount = tokens(3)
               result = await Token.transferFrom(deployer,receiver,amount, {from: exchange});
           
           })
            it('tranfers token balances',async()=>{
                let balanceOf
                balanceOf = await Token.balanceOf(deployer)
                balanceOf.toString().should.equal(tokens(4).toString())
                balanceOf = await Token.balanceOf(receiver)
                balanceOf.toString().should.equal(tokens(3).toString())
            })

            it('resets the allowance',async()=>{
                const allowance = await Token.allowance(deployer,exchange)
                allowance.toString().should.equal(tokens(2).toString())
            })
    
            it('Triggers a Transfer Event',async()=>{
                    const log = result.logs[0]
                    log.event.should.equal('Transfer')
                    const event = log.args
                    event.from.toString().should.equal(deployer,'from is correct')
                    event.to.should.equal(receiver,'to is correct')
                    event.value.toString().should.equal(amount.toString(),'values is correct')
            })
    
        })
    
        describe('failure',async()=>{
        
            it('rejects insufficent balance', async() =>{
                let invalidAmount
                invalidAmount = tokens(6)
                await Token.transferFrom(deployer,receiver,invalidAmount,{from: exchange}).should.be.rejectedWith(EVM_REVERT)
           
            })
    
            it('rejects invalid recipients', async() =>{
              // await Token.transfer(0x0,tokens(1),{from: deployer}).should.be.rejectedWith(EVM_REVERT)
            })
    
    
        }) 
    
    
    })
    
    
    
})





