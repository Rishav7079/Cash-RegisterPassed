const REGISTER_STATUS = { closed: "CLOSED", insufficientFund: "INSUFFICIENT_FUNDS", open: "OPEN" }
function checkCashRegister(price, cash, cid) {
  let cashRegister = { status: "", change: cid }
  var changeNeeded = parseFloat(cash - price).toFixed(2)
  var changeAvailable = getTotalCashRegisterChange(cid)
  // console.log(changeNeeded);
  cashRegister.status = getTotalCashRegisterStatus(changeNeeded, changeAvailable)
  // console.log(cashRegister.status);

  if (cashRegister.status === REGISTER_STATUS.insufficientFund) {
    cashRegister.change = []
    return cashRegister
  }

  cashRegister.change = getCustomerChange(changeNeeded, cid)
  // console.log(cashRegister);

  if(changeNeeded>getTotalCashRegisterChange(cashRegister.change)){
    cashRegister.status=REGISTER_STATUS.insufficientFund
    cashRegister.change=[]
  }
  if(cashRegister.status===REGISTER_STATUS.closed){
    cashRegister.change=[...cid]
  }
  return cashRegister

}

function getCustomerChange(changeNeeded, changeInDrawer) {
  var change = []
  const currencyDictonary = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1.00,
    "FIVE": 5.00,
    "TEN": 10.00,
    "TWENTY": 20.00,
    "ONE HUNDRED": 100.00
  }
  for (let i = changeInDrawer.length - 1; i >= 0; i--) {

    const coinName = changeInDrawer[i][0]
    const coinTotal = changeInDrawer[i][1]
    const coinValue = currencyDictonary[coinName]
    let coinAmount = (coinTotal / coinValue).toFixed(2)
    let coinToReturn = 0
    while (Number(changeNeeded) >= Number(coinValue) && coinAmount > 0) {
      changeNeeded -= coinValue
      changeNeeded = changeNeeded.toFixed(2)
      coinAmount--
      coinToReturn++
    }
     
     
    if (coinToReturn > 0) {
      change.push([coinName, coinToReturn * coinValue])
    }

  }
  return change

}
function getTotalCashRegisterStatus(changeNeeded, changeAvailable) {
  // console.log(Number(changeNeeded),Number(changeAvailable));
  if (Number(changeNeeded) > Number(changeAvailable)) {
    return REGISTER_STATUS.insufficientFund
  }
  if (Number(changeNeeded) < Number(changeAvailable)) {
    return REGISTER_STATUS.open
  }
  return REGISTER_STATUS.closed

}

function getTotalCashRegisterChange(changeInDrawer) {
  let total = 0
  for (let i = 0; i < changeInDrawer.length; i++) {
    total += changeInDrawer[i][1]

  }
  return total.toFixed(2)
}

 //test here
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
