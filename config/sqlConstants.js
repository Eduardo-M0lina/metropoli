const SQL = {
    LOGING:
        `SELECT o.document, o.document_type, o.name, o.last_name, o.municipality, o.neighborhood, o.address, o.complement_address, o.phone1, o.phone2, o.email, o.role_id, r.name AS 'roleName', o.status, o.customer_id ` +
        `FROM officials o ` +
        `JOIN roles r ON r.id = o.role_id ` +
        `WHERE o.document = :document AND o.document_type = ':document_type' AND o.password = ':password' `,
    ROLES_OPTIONS:
        `SELECT m.id AS module_id, m.name AS module_name, o.id AS option_id, o.name AS option_name 
        FROM roles r
        JOIN roles_options ro ON ro.role_id = r.id
        JOIN options o ON o.id = ro.option_id
        JOIN modules m ON m.id = o.module_id
        WHERE r.id = :role_id
        ORDER BY m.id, o.id`,
    INSERT_OFFICIAL:
        `INSERT INTO officials (document, document_type, name, last_name, municipality, neighborhood, address, complement_address, phone1, phone2, email, password, customer_id, role_id) 
         VALUES (':document', ':document_type', ':name', ':last_name', ':municipality', ':neighborhood', ':address', ':complement_address', ':phone1', ':phone2', ':email', ':password', ':customer_id', ':role_id')`,
    UPDATE_OFFICIAL:
        `UPDATE officials SET name=':name', last_name=':last_name', municipality=':municipality', neighborhood=':neighborhood', address=':address', 
                complement_address=':complement_address', phone1=':phone1', phone2=':phone2', email=':email', role_id=':role_id', status=':status' 
        WHERE  document=:document AND document_type=':document_type'`,
    UPDATE_PASSWORD:
        `UPDATE officials SET password=':password'
        WHERE  document=:document AND document_type=':document_type'`,
    LIST_OFFICIALS:
        `SELECT document, document_type, name, last_name, municipality, neighborhood, address, complement_address, phone1, phone2, email, role_id, status 
        FROM officials
        WHERE customer_id = ':customer_id'`,
    LIST_CUSTOMERS:
        `SELECT * FROM customers`,
    INSERT_CUSTOMER:
        `INSERT INTO customers (document, document_type, business_name, deparment, municipality, address, complement_address, email, phone1, phone2) 
        VALUES (':document', ':document_type', ':business_name', ':department', ':municipality', ':address', ':complement_address', ':email', ':phone1', ':phone2')`,
    UPDATE_CUSTOMER:
        `UPDATE customers SET document=':document', document_type=':document_type', business_name=':business_name', deparment=':deparment', municipality=':municipality', 
                address=':address', complement_address=':complement_address', email=':email', phone1=':phone1', phone2=':phone2', status=':status' 
        WHERE  id=:id`,
    LIST_USERS:
        `SELECT * FROM users`,
    INSERT_USER:
        `INSERT INTO users (document, document_type, name, last_name, email, phone, password, role_id) 
        VALUES (':document', ':document_type', ':name', ':last_name', ':email', ':phone', ':password', ':role_id')`,
    UPDATE_USER:
        `UPDATE users SET document=':document', document_type=':document_type', name=':name', last_name=':last_name', email=':email', phone=':phone', password=':password', role_id=':role_id', status=':status'  
        WHERE  document=:document AND document_type=':document_type'`,
    LOGING_USER:
        `SELECT u.document, u.document_type, u.name, u.last_name, u.email, u.phone, u.password, u.role_id, r.name AS 'roleName', u.status ` +
        `FROM users u ` +
        `JOIN roles r ON r.id = u.role_id ` +
        `WHERE u.document = :document AND u.document_type = ':document_type' AND u.password = ':password' `,
    UPDATE_PASSWORD_USER:
        `UPDATE officials SET password=':password'
        WHERE  document=:document AND document_type=':document_type'`,
}

module.exports = {
    SQL,
};