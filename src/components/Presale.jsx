import bcplogo from '../assets/images/BCP.png';
import bnblogo from '../assets/images/bnb.png'
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Badge, Button } from 'react-bootstrap';
import {ethers} from 'ethers';
import { useState,useEffect,useContext } from 'react';
import {BiWalletAlt} from 'react-icons/bi'
import { IconContext } from 'react-icons/lib';
import {SiBinance} from 'react-icons/si'
import {FaArrowDown} from 'react-icons/fa'
import { AppContext } from '../App';

const Presale = () =>{
    
    const [show,setShow,success,setSuccess,message,setMessage] = useContext(AppContext)
    const [connected,setConnected] = useState(false)
    const [account,setAccount] = useState()
    const [conversion,setConversion] = useState("...")
    const [tokenBalance,setTokenBalance] = useState("...")
    const [provider,setProvider] = useState(null)
    const [balance,setBalance] = useState(0.0)
    const totalPresaleSupply = 10 * (Math.pow(10,9))
    const presaleWalletAddress = '0x396E1d4d0Dc9e86Eff33f2cF9fe4F6F2f2FB1164'
    const presaleContractAddress = '0x5066f8C5F7964065f1eC8b0Fdd53d30e50c6676c'
    const presaleContractABI = JSON.parse("[\n\t{\n\t\t\"anonymous\": false,\n\t\t\"inputs\": [\n\t\t\t{\n\t\t\t\t\"indexed\": true,\n\t\t\t\t\"internalType\": \"address\",\n\t\t\t\t\"name\": \"previousOwner\",\n\t\t\t\t\"type\": \"address\"\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"indexed\": true,\n\t\t\t\t\"internalType\": \"address\",\n\t\t\t\t\"name\": \"newOwner\",\n\t\t\t\t\"type\": \"address\"\n\t\t\t}\n\t\t],\n\t\t\"name\": \"OwnershipTransferred\",\n\t\t\"type\": \"event\"\n\t},\n\t{\n\t\t\"anonymous\": false,\n\t\t\"inputs\": [\n\t\t\t{\n\t\t\t\t\"indexed\": false,\n\t\t\t\t\"internalType\": \"address\",\n\t\t\t\t\"name\": \"_tokenAddress\",\n\t\t\t\t\"type\": \"address\"\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"indexed\": false,\n\t\t\t\t\"internalType\": \"uint256\",\n\t\t\t\t\"name\": \"_tokenValue\",\n\t\t\t\t\"type\": \"uint256\"\n\t\t\t}\n\t\t],\n\t\t\"name\": \"soldEvent\",\n\t\t\"type\": \"event\"\n\t},\n\t{\n\t\t\"anonymous\": false,\n\t\t\"inputs\": [\n\t\t\t{\n\t\t\t\t\"indexed\": false,\n\t\t\t\t\"internalType\": \"uint256\",\n\t\t\t\t\"name\": \"_amount\",\n\t\t\t\t\"type\": \"uint256\"\n\t\t\t}\n\t\t],\n\t\t\"name\": \"withdrawEvent\",\n\t\t\"type\": \"event\"\n\t},\n\t{\n\t\t\"inputs\": [],\n\t\t\"name\": \"buyTokens\",\n\t\t\"outputs\": [],\n\t\t\"stateMutability\": \"payable\",\n\t\t\"type\": \"function\"\n\t},\n\t{\n\t\t\"inputs\": [],\n\t\t\"name\": \"clearanceBuy\",\n\t\t\"outputs\": [],\n\t\t\"stateMutability\": \"payable\",\n\t\t\"type\": \"function\"\n\t},\n\t{\n\t\t\"inputs\": [],\n\t\t\"name\": \"clearanceSupplyPrice\",\n\t\t\"outputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"uint256\",\n\t\t\t\t\"name\": \"\",\n\t\t\t\t\"type\": \"uint256\"\n\t\t\t}\n\t\t],\n\t\t\"stateMutability\": \"view\",\n\t\t\"type\": \"function\"\n\t},\n\t{\n\t\t\"inputs\": [],\n\t\t\"name\": \"isSupplyClearanceRequired\",\n\t\t\"outputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"bool\",\n\t\t\t\t\"name\": \"\",\n\t\t\t\t\"type\": \"bool\"\n\t\t\t}\n\t\t],\n\t\t\"stateMutability\": \"view\",\n\t\t\"type\": \"function\"\n\t},\n\t{\n\t\t\"inputs\": [],\n\t\t\"name\": \"owner\",\n\t\t\"outputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"address\",\n\t\t\t\t\"name\": \"\",\n\t\t\t\t\"type\": \"address\"\n\t\t\t}\n\t\t],\n\t\t\"stateMutability\": \"view\",\n\t\t\"type\": \"function\"\n\t},\n\t{\n\t\t\"inputs\": [],\n\t\t\"name\": \"presaleComplete\",\n\t\t\"outputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"bool\",\n\t\t\t\t\"name\": \"\",\n\t\t\t\t\"type\": \"bool\"\n\t\t\t}\n\t\t],\n\t\t\"stateMutability\": \"view\",\n\t\t\"type\": \"function\"\n\t},\n\t{\n\t\t\"inputs\": [],\n\t\t\"name\": \"presalePaused\",\n\t\t\"outputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"bool\",\n\t\t\t\t\"name\": \"\",\n\t\t\t\t\"type\": \"bool\"\n\t\t\t}\n\t\t],\n\t\t\"stateMutability\": \"view\",\n\t\t\"type\": \"function\"\n\t},\n\t{\n\t\t\"inputs\": [],\n\t\t\"name\": \"presaleWallet\",\n\t\t\"outputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"address\",\n\t\t\t\t\"name\": \"\",\n\t\t\t\t\"type\": \"address\"\n\t\t\t}\n\t\t],\n\t\t\"stateMutability\": \"view\",\n\t\t\"type\": \"function\"\n\t},\n\t{\n\t\t\"inputs\": [],\n\t\t\"name\": \"renounceOwnership\",\n\t\t\"outputs\": [],\n\t\t\"stateMutability\": \"nonpayable\",\n\t\t\"type\": \"function\"\n\t},\n\t{\n\t\t\"inputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"bool\",\n\t\t\t\t\"name\": \"value\",\n\t\t\t\t\"type\": \"bool\"\n\t\t\t}\n\t\t],\n\t\t\"name\": \"setPause\",\n\t\t\"outputs\": [],\n\t\t\"stateMutability\": \"nonpayable\",\n\t\t\"type\": \"function\"\n\t},\n\t{\n\t\t\"inputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"uint256\",\n\t\t\t\t\"name\": \"price\",\n\t\t\t\t\"type\": \"uint256\"\n\t\t\t}\n\t\t],\n\t\t\"name\": \"setTokenPrice\",\n\t\t\"outputs\": [],\n\t\t\"stateMutability\": \"nonpayable\",\n\t\t\"type\": \"function\"\n\t},\n\t{\n\t\t\"inputs\": [],\n\t\t\"name\": \"taxWallet\",\n\t\t\"outputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"address\",\n\t\t\t\t\"name\": \"\",\n\t\t\t\t\"type\": \"address\"\n\t\t\t}\n\t\t],\n\t\t\"stateMutability\": \"view\",\n\t\t\"type\": \"function\"\n\t},\n\t{\n\t\t\"inputs\": [],\n\t\t\"name\": \"token\",\n\t\t\"outputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"contract ERC20\",\n\t\t\t\t\"name\": \"\",\n\t\t\t\t\"type\": \"address\"\n\t\t\t}\n\t\t],\n\t\t\"stateMutability\": \"view\",\n\t\t\"type\": \"function\"\n\t},\n\t{\n\t\t\"inputs\": [],\n\t\t\"name\": \"tokenPrice\",\n\t\t\"outputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"uint256\",\n\t\t\t\t\"name\": \"\",\n\t\t\t\t\"type\": \"uint256\"\n\t\t\t}\n\t\t],\n\t\t\"stateMutability\": \"view\",\n\t\t\"type\": \"function\"\n\t},\n\t{\n\t\t\"inputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"address\",\n\t\t\t\t\"name\": \"newOwner\",\n\t\t\t\t\"type\": \"address\"\n\t\t\t}\n\t\t],\n\t\t\"name\": \"transferOwnership\",\n\t\t\"outputs\": [],\n\t\t\"stateMutability\": \"nonpayable\",\n\t\t\"type\": \"function\"\n\t},\n\t{\n\t\t\"inputs\": [],\n\t\t\"name\": \"withdraw\",\n\t\t\"outputs\": [],\n\t\t\"stateMutability\": \"nonpayable\",\n\t\t\"type\": \"function\"\n\t}\n]")
    const tokenContractAddress = '0xEf7C26AA63d47b790E08F31240c049526cD29cD7'
    const tokenContractABI = JSON.parse("[\n\t{\n\t\t\"inputs\": [],\n\t\t\"stateMutability\": \"nonpayable\",\n\t\t\"type\": \"constructor\"\n\t},\n\t{\n\t\t\"anonymous\": false,\n\t\t\"inputs\": [\n\t\t\t{\n\t\t\t\t\"indexed\": true,\n\t\t\t\t\"internalType\": \"address\",\n\t\t\t\t\"name\": \"owner\",\n\t\t\t\t\"type\": \"address\"\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"indexed\": true,\n\t\t\t\t\"internalType\": \"address\",\n\t\t\t\t\"name\": \"spender\",\n\t\t\t\t\"type\": \"address\"\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"indexed\": false,\n\t\t\t\t\"internalType\": \"uint256\",\n\t\t\t\t\"name\": \"value\",\n\t\t\t\t\"type\": \"uint256\"\n\t\t\t}\n\t\t],\n\t\t\"name\": \"Approval\",\n\t\t\"type\": \"event\"\n\t},\n\t{\n\t\t\"anonymous\": false,\n\t\t\"inputs\": [\n\t\t\t{\n\t\t\t\t\"indexed\": true,\n\t\t\t\t\"internalType\": \"address\",\n\t\t\t\t\"name\": \"from\",\n\t\t\t\t\"type\": \"address\"\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"indexed\": true,\n\t\t\t\t\"internalType\": \"address\",\n\t\t\t\t\"name\": \"to\",\n\t\t\t\t\"type\": \"address\"\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"indexed\": false,\n\t\t\t\t\"internalType\": \"uint256\",\n\t\t\t\t\"name\": \"value\",\n\t\t\t\t\"type\": \"uint256\"\n\t\t\t}\n\t\t],\n\t\t\"name\": \"Transfer\",\n\t\t\"type\": \"event\"\n\t},\n\t{\n\t\t\"inputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"address\",\n\t\t\t\t\"name\": \"owner\",\n\t\t\t\t\"type\": \"address\"\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"internalType\": \"address\",\n\t\t\t\t\"name\": \"spender\",\n\t\t\t\t\"type\": \"address\"\n\t\t\t}\n\t\t],\n\t\t\"name\": \"allowance\",\n\t\t\"outputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"uint256\",\n\t\t\t\t\"name\": \"\",\n\t\t\t\t\"type\": \"uint256\"\n\t\t\t}\n\t\t],\n\t\t\"stateMutability\": \"view\",\n\t\t\"type\": \"function\"\n\t},\n\t{\n\t\t\"inputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"address\",\n\t\t\t\t\"name\": \"spender\",\n\t\t\t\t\"type\": \"address\"\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"internalType\": \"uint256\",\n\t\t\t\t\"name\": \"amount\",\n\t\t\t\t\"type\": \"uint256\"\n\t\t\t}\n\t\t],\n\t\t\"name\": \"approve\",\n\t\t\"outputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"bool\",\n\t\t\t\t\"name\": \"\",\n\t\t\t\t\"type\": \"bool\"\n\t\t\t}\n\t\t],\n\t\t\"stateMutability\": \"nonpayable\",\n\t\t\"type\": \"function\"\n\t},\n\t{\n\t\t\"inputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"address\",\n\t\t\t\t\"name\": \"account\",\n\t\t\t\t\"type\": \"address\"\n\t\t\t}\n\t\t],\n\t\t\"name\": \"balanceOf\",\n\t\t\"outputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"uint256\",\n\t\t\t\t\"name\": \"\",\n\t\t\t\t\"type\": \"uint256\"\n\t\t\t}\n\t\t],\n\t\t\"stateMutability\": \"view\",\n\t\t\"type\": \"function\"\n\t},\n\t{\n\t\t\"inputs\": [],\n\t\t\"name\": \"decimals\",\n\t\t\"outputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"uint8\",\n\t\t\t\t\"name\": \"\",\n\t\t\t\t\"type\": \"uint8\"\n\t\t\t}\n\t\t],\n\t\t\"stateMutability\": \"view\",\n\t\t\"type\": \"function\"\n\t},\n\t{\n\t\t\"inputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"address\",\n\t\t\t\t\"name\": \"spender\",\n\t\t\t\t\"type\": \"address\"\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"internalType\": \"uint256\",\n\t\t\t\t\"name\": \"subtractedValue\",\n\t\t\t\t\"type\": \"uint256\"\n\t\t\t}\n\t\t],\n\t\t\"name\": \"decreaseAllowance\",\n\t\t\"outputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"bool\",\n\t\t\t\t\"name\": \"\",\n\t\t\t\t\"type\": \"bool\"\n\t\t\t}\n\t\t],\n\t\t\"stateMutability\": \"nonpayable\",\n\t\t\"type\": \"function\"\n\t},\n\t{\n\t\t\"inputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"address\",\n\t\t\t\t\"name\": \"spender\",\n\t\t\t\t\"type\": \"address\"\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"internalType\": \"uint256\",\n\t\t\t\t\"name\": \"addedValue\",\n\t\t\t\t\"type\": \"uint256\"\n\t\t\t}\n\t\t],\n\t\t\"name\": \"increaseAllowance\",\n\t\t\"outputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"bool\",\n\t\t\t\t\"name\": \"\",\n\t\t\t\t\"type\": \"bool\"\n\t\t\t}\n\t\t],\n\t\t\"stateMutability\": \"nonpayable\",\n\t\t\"type\": \"function\"\n\t},\n\t{\n\t\t\"inputs\": [],\n\t\t\"name\": \"name\",\n\t\t\"outputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"string\",\n\t\t\t\t\"name\": \"\",\n\t\t\t\t\"type\": \"string\"\n\t\t\t}\n\t\t],\n\t\t\"stateMutability\": \"view\",\n\t\t\"type\": \"function\"\n\t},\n\t{\n\t\t\"inputs\": [],\n\t\t\"name\": \"symbol\",\n\t\t\"outputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"string\",\n\t\t\t\t\"name\": \"\",\n\t\t\t\t\"type\": \"string\"\n\t\t\t}\n\t\t],\n\t\t\"stateMutability\": \"view\",\n\t\t\"type\": \"function\"\n\t},\n\t{\n\t\t\"inputs\": [],\n\t\t\"name\": \"totalSupply\",\n\t\t\"outputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"uint256\",\n\t\t\t\t\"name\": \"\",\n\t\t\t\t\"type\": \"uint256\"\n\t\t\t}\n\t\t],\n\t\t\"stateMutability\": \"view\",\n\t\t\"type\": \"function\"\n\t},\n\t{\n\t\t\"inputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"address\",\n\t\t\t\t\"name\": \"to\",\n\t\t\t\t\"type\": \"address\"\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"internalType\": \"uint256\",\n\t\t\t\t\"name\": \"amount\",\n\t\t\t\t\"type\": \"uint256\"\n\t\t\t}\n\t\t],\n\t\t\"name\": \"transfer\",\n\t\t\"outputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"bool\",\n\t\t\t\t\"name\": \"\",\n\t\t\t\t\"type\": \"bool\"\n\t\t\t}\n\t\t],\n\t\t\"stateMutability\": \"nonpayable\",\n\t\t\"type\": \"function\"\n\t},\n\t{\n\t\t\"inputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"address\",\n\t\t\t\t\"name\": \"from\",\n\t\t\t\t\"type\": \"address\"\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"internalType\": \"address\",\n\t\t\t\t\"name\": \"to\",\n\t\t\t\t\"type\": \"address\"\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"internalType\": \"uint256\",\n\t\t\t\t\"name\": \"amount\",\n\t\t\t\t\"type\": \"uint256\"\n\t\t\t}\n\t\t],\n\t\t\"name\": \"transferFrom\",\n\t\t\"outputs\": [\n\t\t\t{\n\t\t\t\t\"internalType\": \"bool\",\n\t\t\t\t\"name\": \"\",\n\t\t\t\t\"type\": \"bool\"\n\t\t\t}\n\t\t],\n\t\t\"stateMutability\": \"nonpayable\",\n\t\t\"type\": \"function\"\n\t}\n]")
    const [lowBalance,setLowBalance] = useState(0)
    const [sold,setSold] = useState('...')
    const chainID = '97'
    const [correctChain,setCorrectChain] = useState(null)


    useEffect(() => {
        if(!connected){
            getSold()
            if(!window.ethereum){
                document.getElementById('loginBtn').innerHTML = "Install Metamask to Proceed!"
                document.getElementById('loginBtn').disabled = true
            }
        }
        if(window.ethereum){
            window.ethereum.on('accountsChanged',(accounts)=>{
                console.log(accounts)
            })
            window.ethereum.on('disconnect',()=>{
                window.location.reload()
            })
            window.ethereum.on('chainChanged',(chainId)=>{
                setCorrectChain(chainId===chainID)
            })
        }
        return()=>{
            window.ethereum.removeListener('accountsChanged',()=>{})
            window.ethereum.removeListener('disconnect',()=>{});
            window.ethereum.removeListener('chainChanged',()=>{})
        }
    }, []);

    async function getSold(){
        var contract = new ethers.Contract(tokenContractAddress,tokenContractABI,new ethers.providers.getDefaultProvider('https://data-seed-prebsc-1-s1.binance.org:8545/'))
        var result = await contract.balanceOf(presaleWalletAddress)
        result = ethers.utils.formatEther(result)
        console.log(result)
        formatSupply((totalPresaleSupply - parseFloat(result)))

    }

    function formatSupply(supply){
        var supplyString = supply.toString()
        //console.log(supply)
        if(supply.length<0||supply===0){
            setSold(0)
        }
        if(supplyString.length>=7 && supplyString.length<10){
            console.log(supply)
            //round to 2 decimals
            supply = Math.round(supply/Math.pow(10,6-2))/100
            console.log(supply) 
            setSold(supply+' Million')
        }
        if(supplyString.length>=10 && supplyString.length<13){
            console.log(supply)
            //round to 2 decimals
            supply = Math.round(supply/Math.pow(10,9-2))/100
            console.log(supply) 
            setSold(supply+' Billion')
        }
    }

    async function connect(){
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const account = await provider.send("eth_requestAccounts",[])
        if (account.length !==0){
            setConnected(true)
            console.log("Umar :"+window.ethereum.networkVersion)
            setCorrectChain(window.ethereum.networkVersion === chainID)
            setAccount(account[0])
            setProvider(provider)
            getAccountBalance(provider,account[0])
            getTokenBalance(account[0],provider)
        }
    }

    async function getAccountBalance(provider,account){
        var balance = ethers.utils.formatEther((await provider.getBalance(account)).toString())
        setBalance(balance)
        var btn = document.getElementById('buyBtn')
        if(parseFloat(balance)<=0.1){
            btn.innerHTML = "Insufficient Funds!"
            btn.style.backgroundColor = 'grey'
            btn.style.borderColor = 'grey'
            btn.disabled = true
            setLowBalance(true)
        }
        else{
            setLowBalance(false)
        }
    }

    async function getTokenBalance(account,provider){
        var contract = new ethers.Contract(tokenContractAddress,tokenContractABI,provider)
        var result = await contract.balanceOf(account)
        setTokenBalance(Math.round(ethers.utils.formatEther(result.toString())))
    }

    async function buy(){
        console.log("wow")
        var btn = document.getElementById('buyBtn')
        var contract = new ethers.Contract(presaleContractAddress,presaleContractABI,provider.getSigner())
        var value = document.getElementById('valueBNB').value

        var options = {value:ethers.utils.parseEther(value)}
        try{
            btn.disabled=true
            btn.innerHTML = "Sending...."
            var tx = await contract.buyTokens(options)
            btn.innerHTML = "Waiting Confirmaton...."
            var result = await tx.wait() 
            if(result['status']===1){
                btn.innerHTML = "Success!"
                getAccountBalance(account,provider)
                getTokenBalance(account,provider)
                setMessage("Tokens Transferred!")
                setSuccess(true)
                setShow(true)
            }
            else{
                btn.innerHTML = "Failed!"
                setMessage("Transfer Failed!")
                setSuccess(false)
                setShow(true)
            }
        }
        catch{
            btn.innerHTML = 'Failed!'
            setMessage("Transaction cancelled by user!")
            setSuccess(false)
            setShow(true)
        }
        resetBtn()
    }

    async function resetBtn(){
        setTimeout(() => {
            var btn = document.getElementById('buyBtn')
            btn.innerHTML = '<h4>Buy!</h4>'
            btn.disabled = false
            btn.onclick = () => {
                buy()
            }
        }, 3000);
    }

    function onChange(e){
        var value = e.target.value
        try{
            value = parseFloat(value)
            console.log(value)
            if(!isNaN(value)){
                setConversion(Math.round(value/0.0000000038))
            }
            else{
                setConversion('...')
            }
        }
        catch{
            setConversion('...')
        }
        var btn = document.getElementById('buyBtn')
        if(value>=0.1 && !lowBalance){
            btn.innerHTML = "Buy!"
            btn.disabled = false
            btn.onclick = ()=>{
                buy()
            }
        }
        else if(!lowBalance){
            btn.innerHTML = "Minimum Buy 0.1 <img width='15px' src='"+bnblogo+"'/>"
            btn.disabled = true
        }
    }

    return(
        <div className='presaleDiv text'>
            <img className="logo" src={bcplogo}/>
            {connected?
                <div className='walletIndicator'>
                    <BiWalletAlt style={{width:'75px',height:'30px'}}/>
                    <text style={{marginLeft:"5px",overflow:"hidden",textOverflow: 'ellipsis',fontFamily:'Helv'}}>{account}</text>
                </div>
                :
                <></>
            }
            <h1 className='presaleTxt'>PRESALE</h1>
               
            {!connected?
            <div style={{marginTop:"20px"}}>
                <h1 style={{marginTop:'130px'}}>{sold} out of 10 Billion BCP Tokens Sold!</h1>
                <Button id='loginBtn' onClick={connect} className='walletBtn'>Connect Wallet to Buy!</Button>
            </div>
            :
            <>
            {correctChain?
            <div style={{marginTop:'80px'}}>
                <Badge style={{color:'black',fontFamily:'arial'}} bg='warning'>Minimum Buy 0.1 <SiBinance/></Badge>
            <div style={{marginTop:"20px"}}>
                <div className='inputDiv'>
                    <>Balance: {balance}</>
                    <div className='flex'>
                        <input id='valueBNB' type='number' placeholder='0.0' className='input' onChange={(e)=>{onChange(e)}}></input>
                        <div style={{marginLeft:'auto',marginRight:'10px'}}>
                            <SiBinance style={{width:'20px',height:'20px',color:"#ffb300",marginRight:'4px'}}/>
                            <>BNB</>
                        </div>
                    </div>
                </div>
                <IconContext.Provider value={{size:'30px'}}>
                <FaArrowDown style={{margin:'10px'}}/>
                </IconContext.Provider>
                <div className='inputDiv'>
                    <>Balance: {tokenBalance}</>
                    <div className='flex'>
                        <input readOnly placeholder='0.0' className='input' value={conversion}></input>
                        <div style={{marginLeft:'auto',marginRight:'10px'}}>
                            <img style={{width:'40px'}} src={bcplogo}/>
                            <>BCP</>
                        </div>
                    </div>
                </div>
                <Button id='buyBtn' style={{marginTop:'30px',borderRadius:'20px'}} variant='success' onClick={buy} disabled>Minimum Buy 0.1 <img style={{width:'15px'}} src={bnblogo}/></Button>
            </div>
            </div>
            :
            <h1 style={{marginTop:'80px'}}>
                Switch to the Correct Chain
            </h1>
            }
            </>
            }
        </div>
    );
}
export default Presale;