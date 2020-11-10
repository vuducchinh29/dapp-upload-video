import React, { Component } from 'react';
import DVideoABIs from '../abis/DVideo.json'
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3';
import './App.css';

//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    //Load accounts
    const accounts = await web3.eth.getAccounts()
    this.setState({
      account: accounts[0]
    })
    //Add first account the the state
    //Get network ID
    const networkId = await web3.eth.net.getId()
    //Get network data
    const networkData = DVideoABIs.networks[networkId]
    if (networkData) {
      const dvideo = new web3.eth.Contract(DVideoABIs.abi, networkData.address)
      this.setState({
        dvideo
      })
      const videosCount = await dvideo.methods.videoCount().call()
      this.setState({
        videosCount
      })
      //load videos, sort by newest
      for (let i = videosCount; i >= 1; i--) {
        const video = await dvideo.methods.videos().call()
        this.setState({
          videos: [...this.state.videos, video]
        })
      }
      //set lasted video with title to view as default
      const lasted = await dvideo.methods.videos(videosCount).call()
      this.setState({
        currentHash: lasted.videoHash,
        currentTitle: lasted.title
      })
      this.setState({loading: false})
    } else {
      console.error('Dvideo contract not deployed to detected network');
      window.alert('Dvideo contract not deployed to detected network');
    }
    //Check if net data exists, then
      //Assign dvideo contract to a variable
      //Add dvideo to the state

      //Check videoAmounts
      //Add videAmounts to the state

      //Iterate throught videos and add them to the state (by newest)


      //Set latest video and it's title to view as default 
      //Set loading state to false

      //If network data doesn't exisits, log error
  }

  //Get video
  captureFile = event => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      this.setState({
        buffer: Buffer.from(reader.result)
      })
    }
  }

  //Upload video
  uploadVideo = title => {

  }

  //Change Video
  changeVideo = (hash, title) => {

  }

  constructor(props) {
    super(props)
    this.state = {
      buffer: null,
      account: '',
      dvideo: null,
      videos: [],
      loading: true,
      currentHash: null,
      currentTitle: null
      //set states
    }

    //Bind functions
  }

  render() {
    const {account} = this.state
    return (
      <div>
        <Navbar 
          account = {account}
        />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
              captureFile = {this.captureFile}
            />
        }
      </div>
    );
  }
}

export default App;