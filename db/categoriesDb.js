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

const getCategories = async () => {
    await sql.connect(sqlConfig);
    const { recordset } = await sql.query('SELECT * FROM Categories');
    return recordset;
}

const newCategory = async ({ name }) => {
    await sql.connect(sqlConfig);
   await sql.query`INSERT INTO Categories VALUES (${name})`;
}

const getCategoryName = async (id) => {
    await sql.connect(sqlConfig);
    const { recordset } = await sql.query`SELECT * from Categories WHERE Id = ${id}`;
    return recordset[0];
}

const updateCategory = async ({name, id}) => {
    await sql.connect(sqlConfig);
    await sql.query`UPDATE Categories SET Name = ${name} WHERE Id = ${id}`;
}

module.exports = {
    getCategories,
    newCategory,
    getCategoryName,
    updateCategory
}