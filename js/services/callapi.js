function CallApi() {
  this.fetchListData = function () {
    /**
     * call axios, agrument: object 
     * return: Promise: 
                  - Pending (cho) -> luc nao cung chay
                  - Resolve (thanh cong) 
                  - Reject (that bai)
    */
    return axios({
      url: "https://63df6ffb59bccf35dab3447e.mockapi.io/api/employee",
      method: "GET",
    });
  };
  this.getDetailEmployee = function(id) {
    return axios({
        url: `https://63df6ffb59bccf35dab3447e.mockapi.io/api/employee/${id}`,
        method: "GET"
    });
  };

  this.addEmployee = function(employee) {
    return axios({
        url: "https://63df6ffb59bccf35dab3447e.mockapi.io/api/employee",
        method: "POST",
        data:employee,
    });
  };

  this.updateEmployee = function(employee,id) {
    return axios({
        url: `https://63df6ffb59bccf35dab3447e.mockapi.io/api/employee/${id}`,
        method: "PUT",
        data: employee,
    });
  };

  this.deleteEmployee = function(id) {
    return axios({
        url:`https://63df6ffb59bccf35dab3447e.mockapi.io/api/employee/${id}`,
        method: "DELETE",
    });
  };
}
