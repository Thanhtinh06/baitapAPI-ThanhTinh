//call API
let callApi = new CallApi();
//create obj vali
const validation = new Validation();

function getEle(id) {
  return document.getElementById(id);
}

//Caculate Total Salary
function caculateTotalSalary(salary, hour) {
  return parseFloat(salary) * parseFloat(hour);
}
var arrCode = [];

//Raking of employees based on hours worked
function rankingEmployee(hour) {
  let hourNum = parseFloat(hour);
  if (hourNum >= CONDITON.hour.min && hourNum <= CONDITON.hour.rankAverage) {
    return RANKING.average;
  } else if (
    hourNum > CONDITON.hour.rankAverage &&
    hourNum <= CONDITON.hour.rankGood
  ) {
    return RANKING.good;
  } else if (hourNum > CONDITON.hour.rankGood && hourNum <= CONDITON.hour.max) {
    return RANKING.exellent;
  }
}

// get and check employee information from input => return Employee object
function getInformation(isNew=true) {
  let value = true;
  let maNhanVien
  if(!isNew){
    maNhanVien = getEle(ID_INPUT.code).value;
  }else{
    maNhanVien = getEle(ID_INPUT.code).value;
    value &= validation.checkValidCode(maNhanVien, ID_NOTI.code);
  }
  let tenNhanVien = getEle(ID_INPUT.name).value;
  value &= validation.checkVaidName(tenNhanVien, ID_NOTI.name);
  let chucVu = getEle(ID_INPUT.position).value;
  value &= validation.checkSeleteRadio(ID_NOTI.position);
  let luongCoBan = getEle(ID_INPUT.salary).value;
  value &= validation.checkRangeSalary(luongCoBan, ID_NOTI.salary);
  let soGioLamTrongThang = getEle(ID_INPUT.hour).value;
  value &= validation.checkWorkingHour(soGioLamTrongThang, ID_NOTI.hour);
  if (!value) {
    return null;
  }
  return new Employee(
    maNhanVien,
    tenNhanVien,
    chucVu,
    luongCoBan,
    soGioLamTrongThang
  );
}

//Prohibit reloading of the page once the form has been submitted
getEle("formEmployee").addEventListener("submit", function (event) {
  event.preventDefault();
});

//Render table list employee
function renderTable(data) {
  let contentHTML = "";
  data.forEach(function (employee) {
    contentHTML += `
    <tr class="text-center">
        <td>${employee.maNhanVien}</td>
        <td>${employee.tenNhanVien}</td>
        <td>${employee.chucVu}</td>
        <td>${employee.luongCoBan}</td>
        <td>${caculateTotalSalary(
          employee.luongCoBan,
          employee.soGioLamTrongThang
        )}</td>
        <td>${employee.soGioLamTrongThang}</td>
        <td>${rankingEmployee(employee.soGioLamTrongThang)}</td>
        <td>
          <button type="button" class="btn btn-success editEm"
            onclick="editEmployee(${employee.maNhanVien})">Sửa</button>
          <button type="button" class="btn btn-danger" onclick="deleteEmployee(${employee.maNhanVien})">Xóa</button>
        </td>
      </tr>
    `;
  });
  getEle("tblListEmployee").innerHTML = contentHTML;
}

//Get data list employee from API
function getListEmployee() {
  setDisplayEle("loader", DISPLAY.block);
  callApi
    .fetchListData()
    .then(function (result) {
      renderTable(result.data);
      setDisplayEle("loader", DISPLAY.none);
      let data = result.data;
      let listCode = []
      data.forEach(function(em){
        listCode.push(em.maNhanVien)
      });
      arrCode = listCode;
      console.log(arrCode);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// add new employee
function addNewEm(){
  let employee = getInformation();
  if (employee != null) {
    callApi
      .addEmployee(employee)
      .then(function () {
        getListEmployee();
        resetForm();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

// edit employee
function editEmployee(maNhanVien) {
  resetNoti();
  getEle("addEmployee").style.display = "none";
  changeButton(".editEm",true);
  
  let contentHTML = "";
  let btnUpdate = `<button type="submit" class="btn btn-outline-success float-right" id="update${maNhanVien}" onclick="update(${maNhanVien})">Cập nhật</button>`;
  let btnCancel = `<button type="submit" class="btn btn-outline-danger float-right" id="cancel${maNhanVien}" onclick="cancel(${maNhanVien})" >Hủy</button>`;
  contentHTML = btnUpdate + btnCancel 
  getEle("formEmployee").innerHTML += contentHTML;

  callApi
    .getDetailEmployee(maNhanVien)
    .then(function (result) {
      let detailEm = result.data;
      showDetailEmployee(detailEm);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// when user clicked button edit show detail information employee
function showDetailEmployee(employee) {
  getEle(ID_INPUT.code).value = employee.maNhanVien;
  getEle(ID_INPUT.code).disabled = true;
  getEle(ID_INPUT.name).value = employee.tenNhanVien;
  getEle(ID_INPUT.position).value = employee.chucVu;
  getEle(ID_INPUT.salary).value = employee.luongCoBan;
  getEle(ID_INPUT.hour).value = employee.soGioLamTrongThang;

}

//update Employee
function update(maNhanVien) {
  let employeeUpdate = getInformation(false);
  if (employeeUpdate != null) {
    callApi
      .updateEmployee(employeeUpdate)
      .then(function () {
        getListEmployee();
        resetNoti();
        resetformDefault(maNhanVien);
        changeButton(".editEm",false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}


// delete employee
function deleteEmployee(maNhanVien){
  setDisplayEle("loader", DISPLAY.block);
  callApi
    .deleteEmployee(maNhanVien)
    .then(function () {
      getListEmployee()
      setDisplayEle("loader", DISPLAY.none);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// return default form 
function resetformDefault(maNhanVien){
  setDisplayEle("addEmployee", DISPLAY.block);
  resetForm();
  getEle(`cancel${maNhanVien}`).remove();
  getEle(`update${maNhanVien}`).remove();
  changeButton(".editEm",false);
  getEle(ID_INPUT.code).disabled = false;
}


// click button => reset form => cancel edit
function cancel(maNhanVien){
  resetformDefault(maNhanVien);
}

// change disable button when click edit => just one employee edit
function changeButton(classButton,value){
  const elements = document.querySelectorAll(classButton);
  elements.forEach(function(element) {
    element.disabled = value;
  });
}

// reset form

function resetForm() {
  getEle("formEmployee").reset();
}

//reset noti 
function resetNoti(){
  hiddenNoti(ID_NOTI.code);
  hiddenNoti(ID_NOTI.name);
  hiddenNoti(ID_NOTI.position);
  hiddenNoti(ID_NOTI.salary);
  hiddenNoti(ID_NOTI.hour);
}

//Call function to run
getListEmployee();

