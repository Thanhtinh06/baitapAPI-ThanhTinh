const NOTI = {
  inputHollow : "Vui lòng nhập nội dung",
  notValid : {
    codeExits : "Mã nhân viên đã tồn tại",
    codeLength: "Độ dài của mã từ 4-6 kí tự",
    codeNumber: "Mã nhân viên phải là số",
    nameWrong: "Tên phải là kí từ",
    rangeSalary: "Lương cơ bản từ 1.000.000 đến 20.000.000",
    rangeHours: "Giờ làm việc từ 50 đến 100 giờ",
    twoCondition : "Mã phải là số và có độ dài 4-6 kí tự",
    position: "Vui lòng chọn vị trí",
  }
}

const CONDITON = {
  length : {
    min : 4,
    max : 6,
  },
  salary : {
    min : 1000000,
    max: 20000000,
  },
  hour : {
    min: 50,
    max: 150,
    rankAverage: 90,
    rankGood: 130,
  },
  nameValid : /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/,
  codeValid : /^[0-9]+$/,
}

const ID_NOTI = {
  code: "notiCode",
  name: "notiName",
  position : "notiPosition",
  salary: "notiSalary",
  hour : "notiHour"
}

const ID_INPUT = {
  code: "inputCode",
  name: "inputName",
  position : "inputPosition",
  salary: "inputSalary",
  hour : "inputHours"
}

const DISPLAY = {
  none: "none",
  block: "block"
}

const RANKING = {
  exellent : "Xuất sắc",
  good : "Giỏi",
  average : "Trung Bình",
}