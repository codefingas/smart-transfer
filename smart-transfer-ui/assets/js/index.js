const contractAddress = "0x55e212bec74e4d224fc45e51a9bec243aeb93ca2";
const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:9545/");

const senderAddy = document.getElementById("sender-address");
const receiverAddy = document.getElementById("receiver-address");
const ethAmount = document.getElementById("eth-amount");
const submitBtn = document.getElementById("submit-btn");
const getBalanceBtn = document.getElementById("get-balance");
const getApproverBtn = document.getElementById("get-approver");
const approveTransBtn = document.getElementById("approve-transactions");
const currBalance = document.getElementById("current-balance");
const depositResult = document.getElementById("deposit-status");

// const contractAddress = web3.utils.toChecksumAddress(0x55e212bec74e4d224fc45e51a9bec243aeb93ca2);
console.log(JSON.parse("../../../build/contracts/ApprovalContract.json"));
const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    const { abi } = JSON.parse(this.responseText);
    const ApprovalContract = new web3.eth.Contract(abi, contractAddress);

    submitBtn.addEventListener("click", async () => {
      //submit deposit address
      if (ethAmount.value <= 0) {
        alert("input valid amount");
        return;
      }

      if (!web3.utils.isAddress(senderAddy.value)) {
        alert("please enter a valid ethereum address for sender address");
        return;
      }

      if (!web3.utils.isAddress(receiverAddy.value)) {
        alert("please enter a valid ethereum address for reciever address");
        return;
      }

      let sendAddy = web3.utils.toChecksumAddress(senderAddy.value),
        receiveAddy = web3.utils.toChecksumAddress(receiverAddy.value);

      console.log("ran here");
      await ApprovalContract.methods
        .deposit(receiveAddy)
        .send({
          from: sendAddy,
          value: web3.utils.toWei(ethAmount.value, "ether"),
        })
        .then((result) => {
          console.log("succeeded in making deposit -", result);
          depositResult.textContent = result;
        })
        .catch((err) => {
          console.log("error in making deposit -", err);
          depositResult.textContent = `Deposit Error: ${err.message}`;
        });
    });

    //get balance
    getBalanceBtn.addEventListener("click", () => {
      web3.eth.getBalance(contractAddress, (err, result) => {
        if (err) {
          console.log(`Error when fetching Contract address balance -`, err);
        } else {
          currBalance.textContent = web3.utils.fromWei(result);
        }
      });
    });

    getApproverBtn.addEventListener("click", () => {});
  }
};

xhttp.open("GET", "../../../build/contracts/ApprovalContract.json", true);
xhttp.send();
