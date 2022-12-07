exports.allAccess = (req, res) => {
  return res.status(200).json({
    msg: "Public stuff",
  });
};

exports.customerStuff = (req, res) => {
  return res.status(200).json({
    msg: "Customer stuff",
  });
};

exports.adminStuff = (req, res) => {
  return res.status(200).json({
    msg: "Admin stuff",
  });
};

exports.employeeStuff = (req, res) => {
  return res.status(200).json({
    msg: "Employee stuff",
  });
};
