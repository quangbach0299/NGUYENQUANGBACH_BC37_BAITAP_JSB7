function Staff(
  username,
  fullname,
  email,
  password,
  dayOfWork,
  basicSalary,
  position,
  totalHour
) {
  this.username = username;
  this.fullname = fullname;
  this.email = email;
  this.password = password;
  this.dayOfWork = dayOfWork;
  this.basicSalary = basicSalary;
  this.position = position;
  this.totalHour = totalHour;
  this.totalIncome = function () {
    if (this.position == "Sếp") {
      return this.basicSalary * 3;
    } else if (this.position == "Trưởng phòng") {
      return this.basicSalary * 2;
    } else {
      return this.basicSalary;
    }
  };
  this.classification = function () {
    var best = "Xuất Sắc";
    var good = "Giỏi";
    var better = "Khá";
    var medium = "Trung Bình";
    if (this.totalHour >= 192) {
      return best;
    } else if (this.totalHour >= 176) {
      return good;
    } else if (this.totalHour >= 160) {
      return better;
    } else {
      return medium;
    }
  };
}
// totalIncome, classification;
