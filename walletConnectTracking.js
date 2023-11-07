/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2023-11-07
 * Time: 14:22
 * Ver: 0.0.1
 * About: ethereum wallet connection tracking
 * 
 *  3 options:
 *      1. monitoring localStorage
 *      2. listening for web3.js actions: "accountsChanged" !returns only the first connection
 *      3. waiting for global variables     
 */


 /*
  How to use:
  
   1. use one (or all) of the global variables
       window.mrZLab630.ethWalletConnectTracking.localStorage()
       window.mrZLab630.ethWalletConnectTracking.eth()
       window.mrZLab630.ethWalletConnectTracking.interval()
  
    2. the result will be in window.mrZLab630.ethWalletConnectTracking.wallet
  
    3. example of result tracking:
           let getWallet = window.setInterval(() =>{
                const wallet = window.mrZLab630.ethWalletConnectTracking.wallet

                    if(wallet?.value){
                    console.log('gotcha!', wallet)
                    if (getW !== undefined) {
                        clearInterval(getWallet)
                        }
                    }
            }, 1000)

 */



            window.mrZLab630 = {
                ethWalletConnectTracking: {
                  action: null,//'eth', //'localStorage' // 'interval'
                    wallet:{
                        type:null,
                        value:null
                      },
                
                      //tracking changes to localStorage
                      localStorage: function(){
                    
                        const isJsonString = function(str) {
                                try {
                                    JSON.parse(str)
                                } catch (e) {
                                    return false
                                }
                                return true
                              }
                    
                          const changed = (key,localStorage) =>{
                    
                            const itm = localStorage.getItem(key)
                            const newData = isJsonString(itm) ? JSON.parse(itm) : itm
                    
                            if(!newData){
                              return
                            }
                    
                            let wallet = null
                    
                            switch(key){
                              case '-walletlink:https://www.walletlink.org:Addresses':
                              wallet = newData
                              break
                    
                              case 'walletconnect':
                              wallet = newData?.accounts[0]
                              break
                    
                              case 'wagmi.store':
                    
                              const {data} = newData?.state
                              if(data?.account){
                                wallet = data?.account
                              }
                              break
                            }
                    
                            if(wallet){
                              window.mrZLab630.ethWalletConnectTracking.wallet = {
                                                                  type:'localStorage',
                                                                  value:wallet
                                                                }
                            }
                    
                        }
                    
                    
                    
                        const localStorageMethods = ['setItem']
                        localStorageMethods.forEach((method) => {
                          const original = localStorage[method]
                         
                          localStorage[method] = function(key, value) {
                            const result = original.apply(this, arguments)
                            changed(key, this)
                            return result
                          }
                        })
                    
                    
                    
                      },
                      
                      //ethereum wallet connection tracking with web3
                      //to track only the first connection
                      eth: function () {
                              try{
                    
                                if(!window?.ethereum){           
                                    throw new Error("Ethereum provider (e.g., MetaMask) not detected.")
                                }
                    
                                  window.ethereum.on('accountsChanged', accounts => {
                        
                                  let wallet = Array.isArray(accounts) ? accounts[0] : null
                    
                                  if (wallet) {
                                    window.mrZLab630.ethWalletConnectTracking.wallet  = {
                                                                  type:'eth',
                                                                  value:wallet
                                                                }
                                  }
                                })
                    
                              }catch(e){
                                const error = e.message
                    
                                console.error({error})
                              }
                    },
                      
                    //checking by interval
                    interval:function(){
                    
                      const check = () =>{   
                    
                        const walletList = {
                          ethereum: window?.ethereum?.selectedAddress,
                          web3: window?.web3?.currentProvider?.selectedProvider?._addresses[0] || window?._web3?.currentProvider?.accounts[0],
                          okxwallet: window?.okxwallet?.selectedAddress,
                          coinbaseWallet: window?.coinbaseWalletExtension?._addresses[0] || window?.walletLinkExtension?._addresses[0],
                          bitkeepWallet: window?.bitkeep?.ethereum?.selectedAddress || 
                                         window?.bitkeep?.ethereum?.currentIdentity?.address || 
                                         window?.bitkeep?.otherEthereum?.selectedProvider?._addresses[0],
                    
                        }
                    
                        const wallets = [...new Set(Object.values(walletList))]
                    
                        const wallet = Array.isArray(wallets) ? wallets.filter(itm => itm)?.pop() : null
                    
                        if(wallet){
                          window.mrZLab630.ethWalletConnectTracking.wallet = {
                                                                  type:'interval',
                                                                  value:wallet
                                                                }
                    
                    
                          if (intervalId !== undefined) {
                            clearInterval(intervalId)
                          }
                        }
                    
                      }
                    
                      let intervalId = window.setInterval(check, 1000)
                    }    
                }
                        }
  
  
  
  
  
  const action = function(){
  
    switch(window.mrZLab630.ethWalletConnectTracking.action || 'null'){
    
      case 'eth':
          //ethereum wallet connection tracking with web3
        //to track only the first connection
        window.mrZLab630.ethWalletConnectTracking.eth()
      break
  
  
      case 'localStorage':
          //tracking changes to localStorage
        window.mrZLab630.ethWalletConnectTracking.localStorage()
      break
  
      case 'interval':
       //checking by interval
        window.mrZLab630.ethWalletConnectTracking.interval()
      break
  }
  
  }     
  
  
  action()
  
  
      // //track the result
      // let getWallet = window.setInterval(() =>{
  
      //   const wallet = window.mrZLab630.ethWalletConnectTracking.wallet
      
      //     if(wallet?.value){    
      //       console.log('gotcha!', wallet)
      
      //     if (getWallet !== undefined) {
      //           clearInterval(getWallet)
      //         }
      //     }
      // }, 1000)
            
            