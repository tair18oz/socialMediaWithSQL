/*
//to create the db:
con.query("CREATE DATABASE project7", function (err, result) {


// buil tables:
let tableFiles = ["comment", "ident", "post", "todo", "user"];

async function createTables(fileArr) {
  for (let i = 0; i < fileArr.length; i++) {
    let route = `./entities/${fileArr[i]}.json`;
    try {
      const res = await fsPromise.readFile(route, "utf8");
      let tableRows = JSON.parse(res);
      let s = "";
      for (let key in tableRows) {
        s += `${key} ${tableRows[key]},`;
      }
      s = s.slice(0, -1);

      let sql = `CREATE TABLE ${fileArr[i]} (${s})`;
      console.log("sql: ", sql);

      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
      });
    } catch (error) {
      console.error(error);
    }
  }
}

createTables(tableFiles);
*/
