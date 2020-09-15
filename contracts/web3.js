import Web3 from 'web3'
import swal from 'sweetalert'

if (window.ethereum) {
  window.web3 = new Web3(ethereum)
  try {
    // Request account access if needed
    ethereum.enable();
  } catch (error) {
    // User denied account access...
  }
} else if (window.web3) {
  // Legacy dapp browsers...
  window.web3 = new Web3(web3.currentProvider);
} else {
  // Non-dapp browsers...
  console.log(
    'Non-Ethereum browser detected. You should consider trying MetaMask!'
  )
  //Swal with a google search of Metamask
  let el = document.createElement('div')
  el.innerHTML = "You should consider trying <a href='https://www.google.com/search?q=metamask'>Metamask</a>!"
  swal({
    title: "Non-Ethereum browser detected",
    icon:'error',
    content: el,
  })
}
console.log(web3)
export default web3
