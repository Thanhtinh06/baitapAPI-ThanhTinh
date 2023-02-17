//set display 
function setDisplayEle(id, value) {
  return (getEle(id).style.display = value);
}

//hidden span noti input
function hiddenNoti(id) {
  getEle(id).innerHTML = "";
  setDisplayEle(id,DISPLAY.none);
}
//open span noti input

function openNoti(id, messenge) {
  getEle(id).innerHTML = messenge;
  setDisplayEle(id, DISPLAY.block);
}


class Validation {
  //check hollow input
  checkHollow(value, idNoti) {
    if (value == "") {
      return false;
    }
    hiddenNoti(idNoti);
    return true;
  }
  //check length code
  checkLengthCode(code, idNoti) {
    if (
      code.length < CONDITON.length.min ||
      code.length > CONDITON.length.max
    ) {
      return false;
    }
    hiddenNoti(idNoti);
    return true;
  }

  checkIsNumber(code, idNoti) {
    if (!code.match(CONDITON.codeValid)) {
      return false;
    }
    hiddenNoti(idNoti);
    return true;
  };

 checkDuplicate(code,idNoti) {
    let codeNum = parseInt(code)
    if(arrCode.includes(codeNum)){
      return false
    }
    return true
  }

  checkValidCode(code,idNoti){
    let notHollow = this.checkHollow(code,idNoti);
    let isNumber = this.checkIsNumber(code,idNoti);
    let checkLength = this.checkLengthCode(code,idNoti);
    let checkDuplicate = this.checkDuplicate(code,idNoti);
    if(notHollow) {
      if(isNumber == true && checkLength== false){
        openNoti(idNoti, NOTI.notValid.codeLength);
      } else if (isNumber == false && checkLength == true){
        openNoti(idNoti, NOTI.notValid.codeNumber);
      } else if (isNumber == false && checkLength == false){
        openNoti(idNoti,NOTI.notValid.twoCondition)
      } else if (checkDuplicate==false){
        openNoti(idNoti, NOTI.notValid.codeExits)
      } else {
        hiddenNoti(idNoti);
        return true;
        }
      }else{
      openNoti(idNoti, NOTI.inputHollow);
      return false
    }
  };
  checkVaidName(value,idNoti){
    let notHollow = this.checkHollow(value,idNoti);
    if(notHollow){
      if(!value.match(CONDITON.nameValid)){
        openNoti(idNoti,NOTI.notValid.nameWrong);
        return false
      }else{
        hiddenNoti(idNoti);
        return true;
      }
    }else{
      openNoti(idNoti, NOTI.inputHollow);
      return false;
    }
  };
  checkSeleteRadio(idNoti){
    let chucVu = getEle(ID_INPUT.position);
    if (chucVu.selectedIndex == 0){
      openNoti(idNoti,NOTI.notValid.position);
      return false
    }
    hiddenNoti(idNoti);
    return true
  }
  checkRangeSalary(value,idNoti){
    let notHollow = this.checkHollow(value,idNoti);
    if(notHollow){
      if(! (CONDITON.salary.min < value && value < CONDITON.salary.max)){
        openNoti(idNoti,NOTI.notValid.rangeSalary);
        return false;
      }
      hiddenNoti(idNoti);
      return true;
    }else{
      openNoti(idNoti,NOTI.inputHollow);
      return false;
    }
  }
  checkWorkingHour(value,idNoti){
    let notHollow = this.checkHollow(value,idNoti);
    if(notHollow){
      if(! (CONDITON.hour.min <= value && value <= CONDITON.hour.max)){
        openNoti(idNoti,NOTI.notValid.rangeHours);
        return false;
      }
      hiddenNoti(idNoti);
      return true;
    }else{
      openNoti(idNoti,NOTI.inputHollow);
      return false;
    }
  }
}