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
        `SELECT document, document_type, o.name, last_name, municipality, neighborhood, address, complement_address, phone1, phone2, email, role_id, status, r.name AS 'roleName'
        FROM officials o
        JOIN roles r ON r.id = o.role_id
        WHERE customer_id = ':customer_id' ORDER BY o.status DESC`,
    LIST_ROLES_OFFICIALS:
        `SELECT * FROM roles where id in (3,4,5,6)`,
    LIST_CUSTOMERS:
        `SELECT * FROM customers ORDER BY status DESC`,
    INSERT_CUSTOMER:
        `INSERT INTO customers (document, document_type, business_name, department, municipality, address, complement_address, email, phone1, phone2) 
        VALUES (':document', ':document_type', ':business_name', ':department', ':municipality', ':address', ':complement_address', ':email', ':phone1', ':phone2')`,
    UPDATE_CUSTOMER:
        `UPDATE customers SET document=':document', document_type=':document_type', business_name=':business_name', department=':department', municipality=':municipality', 
                address=':address', complement_address=':complement_address', email=':email', phone1=':phone1', phone2=':phone2', status=':status' 
        WHERE  id=:id`,
    LIST_USERS:
        `SELECT u.*, r.name AS 'roleName'
        FROM users u
        JOIN roles r ON r.id = u.role_id
        ORDER BY status DESC`,
    INSERT_USER:
        `INSERT INTO users (document, document_type, name, last_name, email, phone, password, role_id) 
        VALUES (':document', ':document_type', ':name', ':last_name', ':email', ':phone', ':password', ':role_id')`,
    UPDATE_USER:
        `UPDATE users SET name=':name', last_name=':last_name', email=':email', phone=':phone', password=':password', role_id=':role_id', status=':status'   
        WHERE document=:document AND document_type=':document_type'`,
    LOGING_USER:
        `SELECT u.document, u.document_type, u.name, u.last_name, u.email, u.phone, u.password, u.role_id, r.name AS 'roleName', u.status ` +
        `FROM users u ` +
        `JOIN roles r ON r.id = u.role_id ` +
        `WHERE u.document = :document AND u.document_type = ':document_type' AND u.password = ':password' `,
    UPDATE_PASSWORD_USER:
        `UPDATE users SET password=':password' 
        WHERE document=:document AND document_type=':document_type'`,
    LIST_ROLES_USERS:
        `SELECT * FROM roles where id in (2)`,
    LIST_ALL_OFFICIALS:
        `SELECT o.*, c.business_name FROM officials o
        JOIN customers c ON o.customer_id = c.id
        ORDER BY o.status DESC`,
    INSERT_PQR:
        `INSERT INTO pqr (customer_id, create_document, create_document_type, description, location, create_date) 
        VALUES (':customer_id', ':create_document', ':create_document_type', ':description', ':location', SYSDATE())`,
    UPDATE_PQR:
        `UPDATE pqr SET status='0', update_document=':update_document', update_document_type=':update_document_type', observation=':observation', update_date=SYSDATE() 
        WHERE  id=:id`,
    LIST_ALL_PQRS:
        `SELECT  pqr.id,  pqr.customer_id, c.business_name,  
        pqr.create_document,  pqr.create_document_type, o1.name AS create_name, o1.last_name AS create_last_name, o1.phone1 AS create_phone1, r.name AS create_roleName, 
        pqr.description,  pqr.location,  pqr.create_date,  pqr.status,  
        pqr.update_document,  pqr.update_document_type, o2.name AS update_name, o2.last_name AS update_last_name, o2.phone1 AS update_phone1,  r2.name AS update_roleName, 
        pqr.observation, pqr.update_date 
        FROM pqr pqr
        JOIN customers c on c.id = pqr.customer_id
        JOIN officials o1 ON o1.document = pqr.create_document AND o1.document_type = pqr.create_document_type
        LEFT JOIN officials o2 ON o2.document = pqr.update_document AND o2.document_type = pqr.update_document_type
        JOIN roles r ON r.id = o1.role_id 
        LEFT JOIN roles r2 ON r2.id = o2.role_id 
        ORDER BY STATUS DESC`,
    LIST_PQRS:
        `SELECT  pqr.id,  pqr.customer_id, c.business_name,  
        pqr.create_document,  pqr.create_document_type, o1.name AS create_name, o1.last_name AS create_last_name, o1.phone1 AS create_phone1, r.name AS create_roleName, 
        pqr.description,  pqr.location,  pqr.create_date,  pqr.status,  
        pqr.update_document,  pqr.update_document_type, o2.name AS update_name, o2.last_name AS update_last_name, o2.phone1 AS update_phone1,  r2.name AS update_roleName, 
        pqr.observation, pqr.update_date 
        FROM pqr pqr
        JOIN customers c on c.id = pqr.customer_id
        JOIN officials o1 ON o1.document = pqr.create_document AND o1.document_type = pqr.create_document_type
        LEFT JOIN officials o2 ON o2.document = pqr.update_document AND o2.document_type = pqr.update_document_type
        JOIN roles r ON r.id = o1.role_id 
        LEFT JOIN roles r2 ON r2.id = o2.role_id 
        WHERE pqr.customer_id = ':customer_id'
        ORDER BY STATUS DESC`,
    LIST_PQRS_BY_CREATOR:
        `SELECT  pqr.id,  pqr.customer_id, c.business_name,  
        pqr.create_document,  pqr.create_document_type, o1.name AS create_name, o1.last_name AS create_last_name, o1.phone1 AS create_phone1, r.name AS create_roleName, 
        pqr.description,  pqr.location,  pqr.create_date,  pqr.status,  
        pqr.update_document,  pqr.update_document_type, o2.name AS update_name, o2.last_name AS update_last_name, o2.phone1 AS update_phone1,  r2.name AS update_roleName, 
        pqr.observation, pqr.update_date 
        FROM pqr pqr
        JOIN customers c on c.id = pqr.customer_id
        JOIN officials o1 ON o1.document = pqr.create_document AND o1.document_type = pqr.create_document_type
        LEFT JOIN officials o2 ON o2.document = pqr.update_document AND o2.document_type = pqr.update_document_type
        JOIN roles r ON r.id = o1.role_id 
        LEFT JOIN roles r2 ON r2.id = o2.role_id 
        WHERE pqr.customer_id = ':customer_id' AND pqr.create_document = :create_document AND pqr.create_document_type = ':create_document_type'
        ORDER BY STATUS DESC`,
    INSERT_INVENTORY:
        `INSERT INTO inventory (name, description, location, zone, provider, buy_date, value, observation, customer_id) 
        VALUES (':name', ':description', ':location', ':zone', ':provider', ':buy_date', ':value', ':observation', ':customer_id')`,
    UPDATE_INVENTORY:
        `UPDATE inventory SET name=':name', description=':description', location=':location ', zone=':zone ', provider=':provider', buy_date=':buy_date', value=':value', observation=':observation', status=':status' 
        WHERE  id=:id`,
    LIST_INVENTORY:
        `SELECT i.*
        FROM inventory i
        WHERE customer_id = ':customer_id' ORDER BY i.status DESC`,
    LIST_ALL_INVENTORY:
        `SELECT i.*, c.business_name
        FROM inventory i
        JOIN customers c on c.id = i.customer_id
        ORDER BY i.status DESC`,

}

module.exports = {
    SQL,
};