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
    const { recordset } = await sql.query(`SELECT tdi.*, c.Name as CategoryName FROM Categories c 
    JOIN ToDoItems tdi 
    ON c.Id = tdi.CategoryId 
    WHERE tdi.CompletedDate IS NULL`);
    return recordset;
}

const getCompletedToDoItems = async () => {
    await sql.connect(sqlConfig);
    const { recordset } = await sql.query('SELECT tdi.*, c.Name as CategoryName FROM Categories c JOIN ToDoItems tdi ON c.Id = tdi.CategoryId WHERE tdi.CompletedDate IS NOT NULL');
    return recordset;
}

const addToDoItem = async ({ title, dueDate, categoryid }) => {
    await sql.connect(sqlConfig);
    await sql.query`INSERT INTO ToDoItems (Title, DueDate, CategoryId)
    VALUES (${title}, ${dueDate}, ${categoryid})`;
}

const markAsCompleted = async ({ categoryId }) => {
    await sql.connect(sqlConfig);
    await sql.query(`UPDATE ToDoItems SET CompletedDate = getdate() WHERE Id = ${categoryId}`);
}

const getByCategory = async (categoryId) => {
    await sql.connect(sqlConfig);
    const { recordset } = await sql.query(`SELECT tdi.*, c.Name as CategoryName FROM Categories c 
    JOIN ToDoItems tdi 
    ON c.Id = tdi.CategoryId 
    WHERE categoryId = ${categoryId}`);
    return recordset;
}

module.exports = {
    getToDoItems,
    addToDoItem,
    markAsCompleted,
    getCompletedToDoItems,
    getByCategory
}