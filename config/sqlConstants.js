const SQL = {
    LOGING:
        `SELECT document, document_type, name, last_name, municipality, neighborhood, address, complement_address, phone1, phone2, email, role_id, status ` +
        `FROM OFFICIALS ` +
        `WHERE document = :document AND document_type = ':document_type' AND password = ':password' `,
    ROLES_OPTIONS:
        `SELECT m.id AS module_id, m.name AS module_name, o.id AS option_id, o.name AS option_name 
        FROM roles r
        JOIN roles_options ro ON ro.role_id = r.id
        JOIN options o ON o.id = ro.option_id
        JOIN modules m ON m.id = o.module_id
        WHERE r.id = :role_id
        ORDER BY m.id, o.id`,
    INSERT_OFFICIALS:
        `INSERT INTO officials (document, document_type, name, last_name, municipality, neighborhood, address, complement_address, phone1, phone2, email, password, customer_id, role_id) 
         VALUES (':document', ':document_type', ':name', ':last_name', ':municipality', ':neighborhood', ':address', ':complement_address', ':phone1', ':phone2', ':email', ':password', ':customer_id', ':role_id')`,
    UPDATE_OFFICIALS:
        `UPDATE officials SET name=':name', last_name=':last_name', municipality=':municipality', neighborhood=':neighborhood', address=':address', 
                complement_address=':complement_address', phone1=':phone1', phone2=':phone2', email=':email', role_id=':role_id', status=':status' 
        WHERE  document=:document AND document_type=':document_type'`,
    UPDATE_PASSWORD:
        `UPDATE officials SET password=':password'
        WHERE  document=:document AND document_type=':document_type'`,
    LIST_OFFICIALS:
        `SELECT document, document_type, name, last_name, municipality, neighborhood, address, complement_address, phone1, phone2, email, role_id, status 
        FROM officials
        WHERE customer_id = ':customer_id'`
}

module.exports = {
    SQL,
};