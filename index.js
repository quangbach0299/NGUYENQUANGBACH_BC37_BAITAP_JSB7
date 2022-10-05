var staffList = [];

function creatStaff() {
  var isFormValid = validateForm();
  if (!isFormValid) return;
  // 1. Lấy input
  var username = document.getElementById("tknv").value;
  var fullname = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var dayOfWork = document.getElementById("datepicker").value;
  var basicSalary = +document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var totalHour = +document.getElementById("gioLam").value;

  // 2. Check username
  for (var i = 0; i < staffList.length; i++) {
    if (staffList[i].username === username) {
      alert("Tài khoản đã tồn tại vui lòng nhập username khác");
      return;
    }
  }

  //3. Tạo object nhân viên
  var newStaff = new Staff(
    username,
    fullname,
    email,
    password,
    dayOfWork,
    basicSalary,
    position,
    totalHour
  );
  //4. Push object vào mảng
  staffList.push(newStaff);

  //5. In danh sách nhân viên ra màn hình
  renderStaff();
  //6. Lưu dữ liệu vào local
  setStaffList();
  //7. Clear input
  document.getElementById("tknv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("datepicker").value = "";
  document.getElementById("luongCB").value = "";
  document.getElementById("chucvu").value = "";
  document.getElementById("gioLam").value = "";
}

function renderStaff(data) {
  if (!data) data = staffList;
  var tableHTML = "";
  for (var i = 0; i < data.length; i++) {
    var currentStaff = data[i];
    tableHTML += `<tr>
    <td>${currentStaff.username}</td>
    <td>${currentStaff.fullname}</td>
    <td>${currentStaff.email}</td>
    <td>${currentStaff.dayOfWork}</td>
    <td>${currentStaff.position}</td>
    <td>${currentStaff.totalIncome()}</td>
    <td>${currentStaff.classification()}</td>
    <td>
    <button class="btn btn-danger mb-2" onclick="deleteStaff('${
      currentStaff.username
    }')">Xóa</button>
    <button class="btn btn-info"  data-toggle="modal"
    data-target="#myModal" onclick="getUpdateStaff('${
      currentStaff.username
    }')">Sửa</button>
    </td>
  </tr>`;
  }
  document.getElementById("tableDanhSach").innerHTML = tableHTML;
}

function setStaffList() {
  //dữ liệu này được lưu theo domain và phải convert object thành chuỗi JSON
  // dữ liệu sau khi convert sẽ bỏ đi phương thức
  var staffListJSON = JSON.stringify(staffList);
  localStorage.setItem("SL", staffListJSON);
}

function getStaffList() {
  var staffListJSON = localStorage.getItem("SL");
  if (!staffListJSON) return;
  // Chuyển từ mảng có chuỗi JSON sang mảng chứa object
  // Sau đó dùng mapData để thêm phương thức
  staffList = mapData(JSON.parse(staffListJSON));
  renderStaff();
  document.getElementById("btnCapNhat").style.display = "none";
}

window.onload = function () {
  console.log("window load");
  getStaffList();
};

function mapData(staffListLocal) {
  var result = [];
  for (var i = 0; i < staffListLocal.length; i++) {
    var oldStaff = staffListLocal[i];
    var newStaff = new Staff(
      oldStaff.username,
      oldStaff.fullname,
      oldStaff.email,
      oldStaff.password,
      oldStaff.dayOfWork,
      oldStaff.basicSalary,
      oldStaff.position,
      oldStaff.totalHour
    );
    result.push(newStaff);
  }
  return result;
}

function findByUsername(id) {
  for (var i = 0; i < staffList.length; i++) {
    if (staffList[i].username === id) return i;
  }
  return -1;
}

function deleteStaff(staffUserName) {
  var index = findByUsername(staffUserName);
  if (index == -1) {
    alert("Không tồn tại username như vậy!!!");
    return;
  }
  staffList.splice(index, 1);
  renderStaff();
  setStaffList();
}

//Tìm kiếm staff
function searchStaff() {
  var keyword = document
    .querySelector("#searchName")
    .value.toLowerCase()
    .trim();
  var result = [];
  for (var i = 0; i < staffList.length; i++) {
    // var username = staffList[i].username.toLowerCase();
    // var fullname = staffList[i].fullname.toLowerCase();
    var evaluate = staffList[i].classification().toLowerCase();
    // if (username === keyword || fullname.includes(keyword)) {
    //   result.push(staffList[i]);
    // }
    if (evaluate.includes(keyword)) {
      result.push(staffList[i]);
    }
  }
  console.log(result);
  renderStaff(result);
}

//Sửa Staff lấy thông tin show lên form
function getUpdateStaff(username) {
  var index = findByUsername(username);
  if (index === -1) {
    return alert("Username không tồn tại !!!");
  }
  var staff = staffList[index];
  //Đổ thông tin lên input
  document.getElementById("tknv").value = staff.username;
  document.getElementById("name").value = staff.fullname;
  document.getElementById("email").value = staff.email;
  document.getElementById("password").value = staff.password;
  document.getElementById("datepicker").value = staff.dayOfWork;
  document.getElementById("luongCB").value = staff.basicSalary;
  document.getElementById("chucvu").value = staff.position;
  document.getElementById("gioLam").value = staff.totalHour;

  // Ẩn nút thêm
  document.getElementById("btnThemNV").style.display = "none";
  document.getElementById("btnCapNhat").style.display = "inline-block";
  // Disable thẻ username
  document.querySelector("#tknv").disabled = true;
}

function updateStaff() {
  var isFormValid = validateForm();
  if (!isFormValid) return;

  var username = document.getElementById("tknv").value;
  var fullname = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var dayOfWork = document.getElementById("datepicker").value;
  var basicSalary = +document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var totalHour = +document.getElementById("gioLam").value;

  var index = findByUsername(username);
  var staff = staffList[index];

  staff.fullname = fullname;
  staff.email = email;
  staff.password = password;
  staff.dayOfWork = dayOfWork;
  staff.basicSalary = basicSalary;
  staff.position = position;
  staff.totalHour = totalHour;

  renderStaff();
  setStaffList();
  //Làm sao để đóng mà clear luôn cái input
  document.getElementById("btnDong").click();
}

//Validate Form

function required(val, spanID) {
  if (val.length === 0 || val === 0) {
    document.getElementById(spanID).style.display = "inline-block";
    document.getElementById(spanID).innerHTML = "*Trường này bắt buộc nhập";
    return false;
  }
  document.getElementById(spanID).innerHTML = "";
  document.getElementById(spanID).style.display = "none";
  return true;
}

//min max length
function length(val, spanID, min, max) {
  if (val.length < min || val.length > max) {
    document.getElementById(spanID).style.display = "inline-block";
    document.getElementById(
      spanID
    ).innerHTML = `Vui lòng nhập username từ ${min} đến ${max} ký tự`;
    return false;
  }
  document.getElementById(spanID).innerHTML = "";
  document.getElementById(spanID).style.display = "none";
  return true;
}
//pattern username
function string(pattern, val, spanID, text) {
  // var pattern = /^[A-z]+$/g;

  if (pattern.test(val)) {
    document.getElementById(spanID).style.display = "none";
    document.getElementById(spanID).innerHTML = "";
    return true;
  }
  document.getElementById(spanID).style.display = "inline-block";
  document.getElementById(spanID).innerHTML = text;
  return false;
}
// pattern salary
function number(val, spanID, min, max, text) {
  if (val === 0) {
    document.getElementById(spanID).style.display = "inline-block";
    document.getElementById(spanID).innerHTML = "*Trường này bắt buộc nhập";
    return false;
  }
  if (val > min && val < max) {
    document.getElementById(spanID).innerHTML = "";
    document.getElementById(spanID).style.display = "none";
    return true;
  } else {
    document.getElementById(spanID).style.display = "inline-block";
    document.getElementById(spanID).innerHTML = text;

    return false;
  }
}

function validateForm() {
  var username = document.getElementById("tknv").value;
  var fullname = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var dayOfWork = document.getElementById("datepicker").value;
  var basicSalary = +document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var totalHour = +document.getElementById("gioLam").value;
  var pUserName = /^[A-z0-9]{4,6}$/g;
  var isValid = true;

  var pFullName =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;
  var pEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var pPassWord =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/;
  var pHour = /^(8[0-9]|9[0-9]|1[0-9]{2}|200)$/g;
  var pSalaray = /^([1-9][0-9]{6}|1[0-9]{7}|20000000)$/;
  var pDate =
    /^(?:(?:(?:0[1-9]|1[0-2]|[1-9])\/(?:0[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])\/(?:29|30)|(?:0[13578]|1[02])\/31)\/[1-9]\d{3}|02\/29(?:\/[1-9]\d(?:0[48]|[2468][048]|[13579][26])|(?:[2468][048]|[13579][26])00))$/g;

  isValid &=
    required(username, "tbTKNV") &&
    string(
      pUserName,
      username,
      "tbTKNV",
      "Vui lòng nhập username từ 4-6 chữ số"
    ) &&
    length(username, "tbTKNV", 4, 9);
  isValid &=
    required(fullname, "tbTen") &&
    string(pFullName, fullname, "tbTen", "Vui lòng nhập họ và tên bằng chữ");

  isValid &=
    required(email, "tbEmail") &&
    string(pEmail, email, "tbEmail", "Vui lòng nhập đúng định dạng email");

  isValid &=
    required(password, "tbMatKhau") &&
    string(
      pPassWord,
      password,
      "tbMatKhau",
      "Vui lòng nhập mật khẩu chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt  "
    );

  isValid &=
    required(dayOfWork, "tbNgay") &&
    string(
      pDate,
      dayOfWork,
      "tbNgay",
      "Vui lòng nhập theo định dạng mm/dd/yyyy"
    );

  isValid &=
    required(basicSalary, "tbLuongCB") &&
    string(
      pSalaray,
      basicSalary,
      "tbLuongCB",
      "Lương cơ bản phải từ 1 000 000 đến 20 000 000"
    );

  isValid &= required(position, "tbChucVu");

  isValid &=
    required(totalHour, "tbGiolam") &&
    string(pHour, totalHour, "tbGiolam", "Số giờ làm phải từ 80-200 giờ");

  return isValid;
}
