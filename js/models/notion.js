const NOTI = {
  inputHollow : "Please enter content",
  notValid : {
    codeExist: "The code had existed",
    codeLength: "The length of code from 4 to 6 digits",
    codeNumber: "The code had digits",
    nameWrong: "The name must be characters",
    rangeSalary: "The salary from 1.000.000 to 20.000.000",
    rangeHours: "The hours from 50 to 100 hours",
    twoCondition : "The code must be digits and the length from 4 to 6 digits",
    position: "Please select the position",
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
  exellent : "Exelent employee",
  good : "Good employee",
  average : "Average employee",
}