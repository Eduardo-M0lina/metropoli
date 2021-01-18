const SQL = {
    LOGING:
        `SELECT document, document_type, name, last_name, municipality, neighborhood, address, complement_address, phone1, phone2, email, role_id, status ` +
        `FROM OFFICIALS ` +
        `WHERE document = :document AND document_type = :document_type AND password = :password `,
    ROLES_OPTIONS:
        `SELECT m.id AS module_id, m.name AS module_name, o.id AS option_id, o.name AS option_name 
        FROM roles r
        JOIN roles_options ro ON ro.role_id = r.id
        JOIN options o ON o.id = ro.option_id
        JOIN modules m ON m.id = o.module_id
        WHERE r.id = :role_id
        ORDER BY m.id, o.id`
}

module.exports = {
    SQL,
};