
import {ethers,EVM_REVERT, tokens, ETHER_ADDRESS } from './helpers'
const { transferPromiseness } = require('chai-as-promised')

const Token = artifacts.require('./token')
const Exchange = artifacts.require('./Exchange')

require('chai')
.use(require('chai-as-promised'))
.should()


contract('Exchange',async ([deployer,feeAccount, user1, user2]) => {
    let token 
    let exchange
    const feePercent = 10
    beforeEach(async ()=> {
        token = await Token.new()
        exchange = await Exchange.new(feeAccount,feePercent)
        token.transfer(user1,tokens(5),{from: deployer})

    })
    
    // describe('deployment', ()=>{
    //     it('tracks the fee account',async ()=>{
          
    //        const result = await exchange.feeAccount()
    //        //console.log(result)
    //         result.should.equal(feeAccount)
    //     })
    //     it('tracks the fee percent',async ()=>{
          
    //         const result = await exchange.feePercent()
    //         //console.log(result)
    //          result.toString().should.equal(feePercent.toString())
    //      })
      
    // })

    // describe('fallback', ()=>{
    //     it('reverts when Ether is sent',async()=>{
    //         await exchange.sendTransaction({value: 1, from: user1}).should.be.rejectedWith(EVM_REVERT)
    //     })
    // })


    // describe('depositing Ether',async()=>{
    //     let result
    //     let amount
    //     beforeEach(async()=>{
    //         amount = ethers(1)
    //         result = await exchange.depositEther({from: user1,value : amount})
    //     })
    //     it('Tracks the Ether Deposit', async()=>{
    //         const balance = await exchange.tokens(ETHER_ADDRESS, user1)
    //         balance.toString().should.equal(amount.toString())
    //     })

    //     it('emits an Deposit Event',async()=>{
    //     const log = result.logs[0]
    //     log.event.should.equal('Deposit')
    //     const event = log.args
    //     event.token.toString().should.equal(ETHER_ADDRESS,'Token address is correct')
    //     event.user.should.equal(user1,'user address is correct')
    //     event.amount.toString().should.equal(amount.toString(),'amount is correct')
    //     event.balance.toString().should.equal(amount.toString(),'balance is correct')
    //     })
    // })

    // describe('depositing tokens', ()=>{
    //     let result 
    //     let amount

    //     beforeEach(async () => {
    //             amount = tokens(1) 
    //             await token.approve(exchange.address, amount ,{from : user1})
    //             result = await exchange.depositToken(token.address, amount , {from: user1})
    //     })

    //     describe('success',() => {
    //             it('tracks the token deposit', async()=>{

    //                 let balance
    //                 balance = await token.balanceOf(exchange.address)
    //                 balance.toString().should.equal(amount.toString())
    //                 // Chek tokens on exchange
    //                 balance = await exchange.tokens(token.address, user1)
    //                 balance.toString().should.equal(amount.toString())
    //             })

    //             it('emits an Deposit Event',async()=>{
    //                 const log = result.logs[0]
    //             log.event.should.equal('Deposit')
    //             const event = log.args
    //             event.token.toString().should.equal(token.address,'Token address is correct')
    //             event.user.should.equal(user1,'user address is correct')
    //             event.amount.toString().should.equal(amount.toString(),'amount is correct')
    //             event.balance.toString().should.equal(amount.toString(),'balance is correct')
    //             })
    //     })

    //     describe('failure', ()=>{
    //         it('rejects Ether deposits',async()=>{
                    
    //         await exchange.depositToken(ETHER_ADDRESS,tokens(1),{from : user1}).should.be.rejectedWith(EVM_REVERT)
    //         })
    //         it('Fails when no tokens are approved',async()=>{
    //             //Dont approve tokens before depositing
    //             await exchange.depositToken(token.address,tokens(1),{from : user1}).should.be.rejectedWith(EVM_REVERT)
                
    //         })


    //     })
      
    // })

    // describe('Withdrawing Ether',async()=>{
    //     let result
    //     let amount
        
    //     beforeEach(async()=>{
    //         //Deposit Ether first
    //         amount = ethers(1)
    //         await exchange.depositEther({from: user1,value : ethers(1)})
    //     })

    //     describe('Success',async()=>{
    //         beforeEach(async()=>{
    //             result = await exchange.withdrawEther(amount,{from:user1})
    //         })

    //         it('Withdraws Ether Funds',async()=>{
    //             const balance = await exchange.tokens(ETHER_ADDRESS,user1)
    //             balance.toString().should.equal('0')
    //         })

            
    //         it('emits an Withdraw Event',async()=>{
    //             const log = result.logs[0]
    //         log.event.should.equal('Withdraw')
    //         const event = log.args
    //         event.token.should.equal(ETHER_ADDRESS)
    //         event.user.should.equal(user1)
    //         event.amount.toString().should.equal(amount.toString())
    //         event.balance.toString().should.equal('0')
    //         })
    //     })

        
    //     describe('Failure',async()=>{

    //         it('Rejects withdraws for insufficient balances',async()=>{
    //             await exchange.withdrawEther(ethers(20),{from:user1}).should.be.rejectedWith(EVM_REVERT)
    //         })
          
    //     })
       

    
    // })

    // describe('Making Orders',async()=>{
    //     let result
        
    //     beforeEach(async()=>{
    //         result = await exchange.makeOrder(token.address, tokens(1), ETHER_ADDRESS, ethers(1), {from: user1})
    //     })

    //     it('Tracks newly created orders',async()=>{
    //            const orderCount = await exchange.orderCount()
    //            orderCount.toString().should.equal('1')
    //         })
    
    // })

    // describe('Order Actions',async()=>{

    //     beforeEach(async ()=>{
             
    //          await exchange.depositEther({from: user1, value: ethers(1)})
    //          await token.transfer(user2, tokens(5),{from: deployer})
    //          await token.approve(exchange.address,tokens(2), {from: user2})
    //          await exchange.depositToken(token.address, tokens(2),{from: user2})
    //          await exchange.makeOrder(token.address,tokens(1), ETHER_ADDRESS,ethers(1),{from:user1})
             
        
    //     })

    //     describe('Filling orders', async ()=>{
    //         let result
            
    //         describe('Success', async ()=>{
                
    //             beforeEach(async ()=>{
    //                 result = await exchange.fillOrder('1', {from: user2})
    //             })

    //             it('Executes the trade & charge fees', async()=>{
    //               let balance
    //               balance = await exchange.balanceOf(token.address, user1)
    //               balance.toString().should.equal(tokens(1).toString(), 'user1 received tokens')
    //               balance = await exchange.balanceOf(ETHER_ADDRESS, user2)
    //               balance.toString().should.equal(ethers(1).toString(), 'user2 received Ether')
    //               balance = await exchange.balanceOf(ETHER_ADDRESS, user1)
    //               balance.toString().should.equal('0', 'user1 Ether deducted')
    //               balance = await exchange.balanceOf(token.address, user2)
    //               balance.toString().should.equal(tokens(0.9).toString(), 'user2 tokens deducted with fee applied')
    //               const feeAccount = await exchange.feeAccount()
    //               balance = await exchange.balanceOf(token.address, feeAccount)
    //               balance.toString().should.equal(tokens(0.1).toString(), 'feeAccount received fee')

    //             })

    //             it('updates filled orders', async() =>{
    //                 const orderFilled = await exchange.orderFilled(1)
    //                 orderFilled.should.equal(true)
    //             })
                
    //             it('emits a "Trade" event', () => {
    //                 const log = result.logs[0]
    //                 log.event.should.equal('Trade')
    //                 const event = log.args
    //                 event.id.toString().should.equal('1', 'id is correct')
    //                 event.user.should.equal(user1, 'user is correct')
    //                 event.tokenGet.should.equal(token.address, 'tokenGet is correct')
    //                 event.amountGet.toString().should.equal(tokens(1).toString(), 'amountGet is correct')
    //                 event.tokenGive.should.equal(ETHER_ADDRESS, 'tokenGive is correct')
    //                 event.amountGive.toString().should.equal(ethers(1).toString(), 'amountGive is correct')
    //                 event.userFill.should.equal(user2, 'userFill is correct')
    //                 event.timestamp.toString().length.should.be.at.least(1, 'timestamp is present')
    //               })
    
    //         })

    //         describe('failure', () => {

    //             it('rejects invalid order ids', () => {
    //               const invalidOrderId = 99999
    //               exchange.fillOrder(invalidOrderId, { from: user2 }).should.be.rejectedWith(EVM_REVERT)
    //             })
        
    //             it('rejects already-filled orders', () => {
    //               // Fill the order
    //               exchange.fillOrder('1', { from: user2 }).should.be.fulfilled
    //               // Try to fill it again
    //               exchange.fillOrder('1', { from: user2 }).should.be.rejectedWith(EVM_REVERT)
    //             })
        
    //             it('rejects cancelled orders', () => {
    //               // Cancel the order
    //               exchange.cancelOrder('1', { from: user1 }).should.be.fulfilled
    //               // Try to fill the order
    //               exchange.fillOrder('1', { from: user2 }).should.be.rejectedWith(EVM_REVERT)
    //             })
    //           })


    //     })

    //     describe('cancelling orders', () => {
    //         let result
      
    //         describe('success', async () => {
    //           beforeEach(async () => {
    //             result = await exchange.cancelOrder('1', { from: user1 })
    //           })
      
    //           it('updates cancelled orders', async () => {
    //             const orderCancelled = await exchange.orderCancelled(1)
    //             orderCancelled.should.equal(true)
    //           })
      
    //           it('emits a "Cancel" event', () => {
    //             const log = result.logs[0]
    //             log.event.should.eq('Cancel')
    //             const event = log.args
    //             event.id.toString().should.equal('1', 'id is correct')
    //             event.user.should.equal(user1, 'user is correct')
    //             event.tokenGet.should.equal(token.address, 'tokenGet is correct')
    //             event.amountGet.toString().should.equal(tokens(1).toString(), 'amountGet is correct')
    //             event.tokenGive.should.equal(ETHER_ADDRESS, 'tokenGive is correct')
    //             event.amountGive.toString().should.equal(ethers(1).toString(), 'amountGive is correct')
    //             event.timestamp.toString().length.should.be.at.least(1, 'timestamp is present')
    //           })
    //         })
      
    //         describe('failure', () => {
    //           it('rejects invalid order ids', () => {
    //             const invalidOrderId = 99999
    //             exchange.cancelOrder(invalidOrderId, { from: user1 }).should.be.rejectedWith(EVM_REVERT)
    //           })
      
    //           it('rejects unauthorized cancelations', async () => {
    //             // Try to cancel the order from another user
    //             await exchange.cancelOrder('1', { from: user2 }).should.be.rejectedWith(EVM_REVERT)
    //           })
    //         })
    //       })
        
    
    // })

    describe('fillOrder()', () => {
        describe('Check balances after filling user1 buy Tokens order', () => {
          beforeEach(async () => {
            // user1 deposit 1 ETHER to the exchange
            await exchange.depositEther({from: user1, value: ethers(1)})
            // user1 create order to buy 10 tokens for 1 ETHER
            await exchange.makeOrder(token.address, tokens(4), ETHER_ADDRESS, ethers(1), {from: user1})
            // user2 gets tokens
            await token.transfer(user2, tokens(4.4), {from: deployer})
            // user2 approve exchange to spend his tokens
            await token.approve(exchange.address, tokens(4.4), {from: user2})
            // user2 deposit tokens + fee cost (1 token) to the exchange
            await exchange.depositToken(token.address, tokens(4.4), {from: user2})
            // user2 fills the order
            await exchange.fillOrder('1', {from: user2})
          })
    
          it('user1 tokens balance on exchange should eq. 8', async () => {
            await (await exchange.balanceOf(token.address, user1)).toString().should.eq(tokens(4).toString())
          })
    
          it('user1 ether balance on exchange should eq. 0', async () => {
            await (await exchange.balanceOf(ETHER_ADDRESS, user1)).toString().should.eq('0')
          })
    
          it('user2 tokens balance on exchange should eq. 0', async () => {
            await (await exchange.balanceOf(token.address, user2)).toString().should.eq('0')
          })
    
          it('user2 ether balance on exchange should eq. 1', async () => {
            await (await exchange.balanceOf(ETHER_ADDRESS, user2)).toString().should.eq(ethers(1).toString())
          })
        })
    
        describe('Check balances after filling user1 buy Ether order', () => {
          beforeEach(async () => {
            // Uuser1 Gets the 10 tokens
            await token.transfer(user1, tokens(4), {from: deployer})
            // user1 approve exchange to spend his tokens
            await token.approve(exchange.address, tokens(4), {from: user1})
            // user1 approve send tokens to the exchange 
            await exchange.depositToken(token.address, tokens(4), {from: user1})
            // user1 create order to buy 1 Ether for 10 tokens
            await exchange.makeOrder(ETHER_ADDRESS, ethers(1), token.address, tokens(4), {from: user1})
            // user2 deposit 1 ETHER + fee cost (.1 ETH) to the exchange
            await exchange.depositEther({from: user2, value: ethers(1.1)})
            // user2 fills the order
            await exchange.fillOrder('1', {from: user2})
          })
    
          it('user1 tokens balance on exchange should eq. 0', async () => {
            await (await exchange.balanceOf(token.address, user1)).toString().should.eq('0')
          })
    
          it('user1 Ether balance on exchange should eq. 1', async () => {
            await (await exchange.balanceOf(ETHER_ADDRESS, user1)).toString().should.eq(ethers(1).toString())
          })
    
          it('user2 tokens balance on exchange should eq. 10', async () => {
            await (await exchange.balanceOf(token.address, user2)).toString().should.eq(tokens(4).toString())
          })
    
          it('user2 ether balance on exchange should eq. 0', async () => {
            await (await exchange.balanceOf(ETHER_ADDRESS, user2)).toString().should.eq('0')
          })
        })
      })
    
    
})




