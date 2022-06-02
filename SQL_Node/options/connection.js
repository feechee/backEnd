export default  {
sqlDb: {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "federico",
    password: "fede0097",
    database: "mibase",
  }
},
sqlite3: {
  client: "sqlite3",
    connection: {
      filename: "./mydb.sqlite"
    },
  UseNullAsDefault: true
}

}
