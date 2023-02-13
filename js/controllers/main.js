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
function getInformation() {
  let value = true;
  let maNhanVien = getEle(ID_INPUT.code).value;
  value &= validation.checkValidCode(maNhanVien, ID_NOTI.code);
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
          employee.soGioLamViecTrongThang
        )}</td>
        <td>${employee.soGioLamViecTrongThang}</td>
        <td>${rankingEmployee(employee.soGioLamViecTrongThang)}</td>
        <td>
          <button type="button" class="btn btn-success"
            onclick="editEmployee(${employee.id})">Edit</button>
          <button type="button" class="btn btn-danger" onclick="deleteEmployee(${employee.id})">Delete</button>
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
    })
    .catch(function (error) {
      console.log(error);
    });
}

// add new employee
getEle("addEmployee").addEventListener("click", function () {
  let employee = getInformation();
  if (employee != null) {
    callApi
      .addEmployee(employee)
      .then(function () {
        getListEmployee();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
});

// edit employee
function editEmployee(id) {
  resetNoti();
  getEle("addEmployee").style.display = "none";
  let contentHTML = "";
  let btnUpdate = `<button type="submit" class="btn btn-outline-success float-right updateEmployee" onclick="update(${id})">Update Employee</button>`;
  let btnCancel = `<button type="submit" class="btn btn-outline-danger float-right cancelUpdate" onclick="cancel()" >Cancel</button>`;
  contentHTML = btnUpdate + btnCancel 
  getEle("formEmployee").innerHTML += contentHTML;

  callApi
    .getDetailEmployee(id)
    .then(function (result) {
      let detailEm = result.data;
      showDetailEmployee(detailEm);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function showDetailEmployee(employee) {
  getEle(ID_INPUT.code).value = employee.maNhanVien;
  getEle(ID_INPUT.name).value = employee.tenNhanVien;
  getEle(ID_INPUT.position).value = employee.chucVu;
  getEle(ID_INPUT.salary).value = employee.luongCoBan;
  getEle(ID_INPUT.hour).value = employee.soGioLamViecTrongThang;
 
}

function update(id) {
  let employeeUpdate = getInformation();
  if (employeeUpdate != null) {
    callApi
      .updateEmployee(employeeUpdate,id)
      .then(function () {
        getListEmployee();
        resetNoti();
        resetformDefault();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

function deleteEmployee(id){
  setDisplayEle("loader", DISPLAY.block);
  callApi
    .deleteEmployee(id)
    .then(function () {
      getListEmployee()
      setDisplayEle("loader", DISPLAY.none);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function resetformDefault(){
  getEle("addEmployee").style.display = "block";
  resetForm();
  document.getElementsByClassName("updateEmployee")[0].style.display = "none";
  document.getElementsByClassName("cancelUpdate")[0].style.display = "none";
}

function cancel(){
  resetformDefault()
}

// reset form

function resetForm() {
  getEle("formEmployee").reset;
}

function resetNoti(){
  hiddenNoti(ID_NOTI.code);
  hiddenNoti(ID_NOTI.name);
  hiddenNoti(ID_NOTI.position);
  hiddenNoti(ID_NOTI.salary);
  hiddenNoti(ID_NOTI.hour);
}

//Call function to run
getListEmployee();

// function getListCode(){
//   callApi.fetchListData()
//     .then(function(result){
//       result.data.forEach(function(employee){
//         listCode.push(employee.maNhanVien);

//       })
//     })
//     .catch( function(error){
//       console.log(error);
//     })
// }

// //getLocalStage list code employee

// function getLocalStage(){
//   const dataString = localStorage.getItem("ListCodeEmployee");
//   listCode = JSON.parse(dataString) || [];

// }

// //setLocalStage list code employee
// function setLocalStage(){
//   localStorage.setItem("ListCodeEmployee",JSON.stringify(listCode))
// }
