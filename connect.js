const mysql = require('mysql');

export const connect = (host, user, pwd) => {
  let con = mysql.createConnection({
    host: host,
    user: user,
    password: pwd
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected");
  });

  return con
};

