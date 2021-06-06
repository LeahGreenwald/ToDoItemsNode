const sql = require('mssql/msnodesqlv8');

const sqlConfig = {
    database: 'ToDo',
    server: '.\\sqlexpress',
    driver: 'msnodesqlv8',
    options: {
        trustServerCertificate: true,
        trustedConnection: true
    }
}

const getToDoItems = async () => {
    await sql.connect(sqlConfig);
    const { recordset } = await sql.query('SELECT * FROM ToDoItems');
    return recordset;
}
module.exports = {
    getToDoItems
}