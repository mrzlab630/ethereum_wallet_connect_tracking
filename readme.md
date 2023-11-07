## ethereum wallet connection tracking


### 3 options:

- 1. monitoring localStorage
- 2. listening for web3.js actions: "accountsChanged" !returns only the first connection
- 3. waiting for global variables    


## How to use:
  
- 1. use one (or all) of the global variables

```
window.mrZLab630.ethWalletConnectTracking.localStorage()
window.mrZLab630.ethWalletConnectTracking.eth()
window.mrZLab630.ethWalletConnectTracking.interval()
```       
  
- 2. the result will be in 

```
window.mrZLab630.ethWalletConnectTracking.wallet
```
  
- 3. example of result tracking:

```
           let getWallet = window.setInterval(() =>{
                const wallet = window.mrZLab630.ethWalletConnectTracking.wallet

                    if(wallet?.value){
                        
                    console.log('gotcha!', wallet)

                    if (getW !== undefined) {
                        clearInterval(getWallet)
                        }
                    }
            }, 1000) 
```