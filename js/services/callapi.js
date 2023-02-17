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
      url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien",
      method: "GET",
    });
  };
  this.getDetailEmployee = function(maNhanVien) {
    return axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${maNhanVien}`,
        method: "GET"
    });
  };

  this.addEmployee = function(employee) {
    return axios({
        url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien",
        method: "POST",
        data:employee,
    });
  };

  this.updateEmployee = function(employee) {
    return axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${employee.maNhanVien}`,
        method: "PUT",
        data: employee,
    });
  };

  this.deleteEmployee = function(maNhanVien) {
    return axios({
        url:`http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${maNhanVien}`,
        method: "DELETE",
    });
  };
}
