const SQL = {
    LOGING:
        `SELECT o.document, o.document_type, o.name, o.last_name, o.municipality, o.neighborhood, o.address, 
        o.complement_address, o.phone1, o.phone2, o.email, o.role_id, r.name AS 'roleName', o.status, o.customer_id 
        FROM officials o 
        JOIN roles r ON r.id = o.role_id 
        WHERE o.document = :document AND o.document_type = ':document_type' AND o.password = ':password' `,
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
        `SELECT document, document_type, o.name, last_name, municipality, neighborhood, address, complement_address, 
        phone1, phone2, email, role_id, status, r.name AS 'roleName'
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
        `UPDATE customers SET document=':document', document_type=':document_type', business_name=':business_name', 
                department=':department', municipality=':municipality', address=':address', complement_address=':complement_address', 
                email=':email', phone1=':phone1', phone2=':phone2', status=':status' 
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
        `UPDATE users SET name=':name', last_name=':last_name', email=':email', phone=':phone', password=':password', 
                role_id=':role_id', status=':status'   
        WHERE document=:document AND document_type=':document_type'`,
    LOGING_USER:
        `SELECT u.document, u.document_type, u.name, u.last_name, u.email, u.phone, u.password, u.role_id, r.name AS 'roleName', u.status 
        FROM users u 
        JOIN roles r ON r.id = u.role_id 
        WHERE u.document = :document AND u.document_type = ':document_type' AND u.password = ':password' `,
    UPDATE_PASSWORD_USER:
        `UPDATE users SET password=':password' 
        WHERE document=:document AND document_type=':document_type'`,
    LIST_ROLES_USERS:
        `SELECT * FROM roles where id in (2)`,
    LIST_ALL_OFFICIALS:
        `SELECT o.*, c.business_name, r.name AS 'roleName'
        FROM officials o
        JOIN customers c ON o.customer_id = c.id
        JOIN roles r ON r.id = o.role_id
        ORDER BY o.status DESC`,
    INSERT_PQR:
        `INSERT INTO pqr (customer_id, type, create_document, create_document_type, description, location, create_date) 
        VALUES (':customer_id', ':type', ':create_document', ':create_document_type', ':description', ':location', SYSDATE())`,
    UPDATE_PQR:
        `UPDATE pqr SET type=':type', description=':description', location=':location', status=':status' 
        WHERE  id=:id`,
    CLOSE_PQR:
        `UPDATE pqr SET status=':status', type=':type',update_document=':update_document', 
                    update_document_type=':update_document_type', observation=':observation', update_date=SYSDATE() 
        WHERE  id=:id`,
    LIST_ALL_PQRS:
        `SELECT  pqr.id,  pqr.type, pqr.customer_id, c.business_name,  
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
        `SELECT  pqr.id, pqr.type, pqr.customer_id, c.business_name,  
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
        `SELECT  pqr.id, pqr.type, pqr.customer_id, c.business_name,  
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
        `INSERT INTO inventory (name, description, location, zone, provider, buy_date, value, observation, customer_id, category) 
        VALUES (':name', ':description', ':location', ':zone', ':provider', ':buy_date', ':value', ':observation', ':customer_id', ':category')`,
    UPDATE_INVENTORY:
        `UPDATE inventory SET name=':name', description=':description', location=':location ', zone=':zone ', 
                              provider=':provider', buy_date=':buy_date', value=':value', observation=':observation', 
                              status=':status', category=':category' 
        WHERE  id=:id`,
    LIST_INVENTORY:
        `SELECT i.*, z.name AS zone_name, p.name AS provider_name, ic.name AS category_name
        FROM inventory i
        JOIN zones z on z.id = i.zone
        JOIN providers p on p.id = i.provider
        JOIN inventory_category ic on ic.id = i.category
        WHERE i.customer_id = ':customer_id' ORDER BY i.status DESC`,
    LIST_ALL_INVENTORY:
        `SELECT i.*, c.business_name, z.name AS zone_name, p.name AS provider_name, ic.name AS category_name
        FROM inventory i
        JOIN zones z on z.id = i.zone
        JOIN providers p on p.id = i.provider
        JOIN inventory_category ic on ic.id = i.category
        JOIN customers c on c.id = i.customer_id
        ORDER BY i.status DESC`,
    INSERT_OBLIGATION:
        `INSERT INTO obligations (reference, description, customer_id) VALUES (':reference', ':description', ':customer_id')`,
    UPDATE_OBLIGATION:
        `UPDATE obligations SET reference=':reference', description=':description', status=':status' 
        WHERE  id=:id`,
    LIST_OBLIGATIONS:
        `SELECT * FROM obligations o
        WHERE customer_id = ':customer_id' ORDER BY o.status DESC`,
    LIST_ALL_OBLIGATIONS:
        `SELECT o.*, c.business_name
        FROM obligations o
        JOIN customers c on c.id = o.customer_id
        ORDER BY o.status DESC`,
    INSERT_ALERT:
        `INSERT INTO scheduling_alerts (type, item, cycle, day, previous_days, month, create_date, customer_id) 
        VALUES (':type', ':item', ':cycle', ':day', ':previous_days', ':month', SYSDATE(), ':customer_id')`,
    UPDATE_ALERT:
        `UPDATE scheduling_alerts SET cycle=':cycle', day=':day', previous_days=':previous_days', month=':month', status=':status' 
        WHERE  id=:id`,
    LIST_ALERTS:
        `SELECT *, CASE WHEN sa.type = 1 THEN (SELECT i.name FROM inventory i WHERE i.id = sa.item) 
                   ELSE (SELECT o.description FROM obligations o WHERE o.id = sa.item) END AS item_name
        FROM scheduling_alerts sa
        WHERE customer_id = ':customer_id' AND type = :type ORDER BY sa.status DESC`,
    LIST_ALL_ALERTS:
        `SELECT sa.*, c.business_name, 
            CASE WHEN sa.type = 1 THEN (SELECT i.name FROM inventory i WHERE i.id = sa.item) 
            ELSE (SELECT o.description FROM obligations o WHERE o.id = sa.item) END AS item_name
        FROM scheduling_alerts sa
        JOIN customers c on c.id = sa.customer_id
        ORDER BY sa.status DESC`,
    ACTIVE_ALERTS:
        `SELECT q.* 
        FROM (
            SELECT sa.type, 
                CASE WHEN sa.day < WEEKDAY(NOW()) THEN 
                    DATE_ADD(STR_TO_DATE(CONCAT((DAY(NOW())), ",", MONTH (NOW()), ",", YEAR(NOW())),'%d,%m,%Y'), INTERVAL (7-WEEKDAY(NOW())+sa.day) DAY)
                ELSE
                    STR_TO_DATE(CONCAT((DAY(NOW())+sa.day - WEEKDAY(NOW())), ",", MONTH (NOW()), ",", YEAR(NOW())),'%d,%m,%Y')
                END AS deadline,
                CASE WHEN sa.day < WEEKDAY(NOW()) THEN sa.day + 7 - WEEKDAY(NOW()) ELSE sa.day - WEEKDAY(NOW()) END AS remaining_days,
                CASE WHEN sa.type = 1 THEN (SELECT i.id FROM inventory i WHERE i.id = sa.item) 
                                            ELSE (SELECT o.id FROM obligations o WHERE o.id = sa.item) END AS item_id,
                CASE WHEN sa.type = 1 THEN (SELECT i.name FROM inventory i WHERE i.id = sa.item) 
                                            ELSE (SELECT o.description FROM obligations o WHERE o.id = sa.item) END AS item,
                CASE WHEN sa.type = 1 THEN (SELECT i.status FROM inventory i WHERE i.id = sa.item) 
                                        ELSE (SELECT o.status FROM obligations o WHERE o.id = sa.item) END AS item_status
            FROM scheduling_alerts sa
            WHERE sa.previous_days >= (sa.day - WEEKDAY(NOW())) 
            AND sa.cycle = 1 AND sa.status = 1 AND sa.customer_id = :customer_id 
            UNION ALL
            SELECT sa.type, STR_TO_DATE(CONCAT(sa.day, ",", MONTH (NOW()), ",", YEAR(NOW())),'%d,%m,%Y') AS deadline,
                DATEDIFF(STR_TO_DATE(CONCAT(sa.day, ",", MONTH (NOW()), ",", YEAR(NOW())),'%d,%m,%Y'),NOW()) AS remaining_days,
                CASE WHEN sa.type = 1 THEN (SELECT i.id FROM inventory i WHERE i.id = sa.item) 
                                            ELSE (SELECT o.id FROM obligations o WHERE o.id = sa.item) END AS item_id,
                CASE WHEN sa.type = 1 THEN (SELECT i.name FROM inventory i WHERE i.id = sa.item) 
                                            ELSE (SELECT o.description FROM obligations o WHERE o.id = sa.item) END AS item,
                CASE WHEN sa.type = 1 THEN (SELECT i.status FROM inventory i WHERE i.id = sa.item) 
                                        ELSE (SELECT o.status FROM obligations o WHERE o.id = sa.item) END AS item_status
            FROM scheduling_alerts sa
            WHERE CURDATE() <= STR_TO_DATE(CONCAT(sa.day-sa.previous_days, ",", MONTH (NOW()), ",", YEAR(NOW())),'%d,%m,%Y')
            AND sa.cycle = 2 AND sa.status = 1 AND sa.customer_id = :customer_id 
            UNION ALL
            SELECT sa.type, STR_TO_DATE(CONCAT(sa.day, ",", sa.month, ",", YEAR(NOW())),'%d,%m,%Y') AS deadline,
                DATEDIFF(STR_TO_DATE(CONCAT(sa.day, ",", sa.month, ",", YEAR(NOW())),'%d,%m,%Y'),NOW()) AS remaining_days,
                CASE WHEN sa.type = 1 THEN (SELECT i.id FROM inventory i WHERE i.id = sa.item) 
                                            ELSE (SELECT o.id FROM obligations o WHERE o.id = sa.item) END AS item_id,
                CASE WHEN sa.type = 1 THEN (SELECT i.name FROM inventory i WHERE i.id = sa.item) 
                                            ELSE (SELECT o.description FROM obligations o WHERE o.id = sa.item) END AS item,
                CASE WHEN sa.type = 1 THEN (SELECT i.status FROM inventory i WHERE i.id = sa.item) 
                                        ELSE (SELECT o.status FROM obligations o WHERE o.id = sa.item) END AS item_status
            FROM scheduling_alerts sa
            WHERE CURDATE() >= DATE_SUB(STR_TO_DATE(CONCAT(sa.day, ",", sa.month, ",", YEAR(NOW())),'%d,%m,%Y'),INTERVAL sa.previous_days DAY)
            AND sa.cycle = 3 AND sa.status = 1 AND sa.customer_id = :customer_id
        ) AS q
        WHERE item_status = 1
        ORDER BY q.deadline asc`,
    PENDING_PQRS:
        `SELECT COUNT(*) pendingPqr
        FROM pqr
        WHERE customer_id = :customer_id AND STATUS = 1`,
    INSERT_ZONE:
        `INSERT INTO zones (name, customer_id) VALUES (':name',:customer_id)`,
    UPDATE_ZONE:
        `UPDATE zones SET name=':name', status=':status' WHERE  id=:id`,
    LIST_ZONES:
        `SELECT * FROM zones z
        WHERE customer_id = ':customer_id' ORDER BY z.status DESC`,
    INSERT_PROVIDER:
        `INSERT INTO providers (name, customer_id) VALUES (':name',:customer_id)`,
    UPDATE_PROVIDER:
        `UPDATE providers SET name=':name', status=':status' WHERE  id=:id`,
    LIST_PROVIDERS:
        `SELECT * FROM providers z
        WHERE customer_id = ':customer_id' ORDER BY z.status DESC`,
    INSERT_INVCATEGORY:
        `INSERT INTO inventory_category (name, customer_id) VALUES (':name',:customer_id)`,
    UPDATE_INVCATEGORY:
        `UPDATE inventory_category SET name=':name', status=':status' WHERE  id=:id`,
    LIST_INVCATEGORYS:
        `SELECT * FROM inventory_category z
        WHERE customer_id = ':customer_id' ORDER BY z.status DESC`,
    GET_ALERT:
        `SELECT *
        FROM scheduling_alerts sa
        WHERE sa.type = :type AND item = :item AND customer_id = ':customer_id' ORDER BY sa.status DESC`,
    INSERT_MAINTENANCE_LOG:
        `INSERT INTO maintenance_log (inventory_id, title, description, observation, date, customer_id) 
        VALUES (':inventory_id', ':title', ':description', ':observation', ':date', ':customer_id')`,
    UPDATE_MAINTENANCE_LOG:
        `UPDATE maintenance_log SET inventory_id=':inventory_id', title=':title', description=':description', 
        observation=':observation', date=':date' WHERE  id=:id`,
    LIST_MAINTENANCE_LOGS:
        `SELECT ml.*, i.name
        FROM maintenance_log ml
        JOIN inventory i ON i.id = ml.inventory_id
        WHERE ml.customer_id = ':customer_id' ORDER BY ml.date DESC`,
    INSERT_PAYMENT:
        `INSERT INTO payments (obligation_id, value, date, customer_id) 
        VALUES (':obligation_id', ':value', ':date', ':customer_id')`,
    UPDATE_PAYMENT:
        `UPDATE payments SET obligation_id=':obligation_id', value=':value', date=':date' WHERE  id=:id`,
    LIST_PAYMENTS:
        `SELECT p.*, o.description, o.reference
        FROM payments p
        JOIN obligations o ON o.id = p.obligation_id
        WHERE p.customer_id = ':customer_id' ORDER BY p.date DESC`,
    REPORT_INVENTORY:
        `SELECT i.id, i.name, i.description, z.name AS zone_name, i.location, ic.name AS category_name, 
            p.name AS provider_name, ic.name AS category_name, i.buy_date, i.value, i.observation,
            CASE WHEN i.status = 1 THEN 'ACTIVO' ELSE 'INACTIVO' END status
        FROM inventory i
        JOIN zones z on z.id = i.zone
        JOIN providers p on p.id = i.provider
        JOIN inventory_category ic on ic.id = i.category
        :where ORDER BY i.status DESC`,
    REPORT_MAINTENANCE_LOG:
        `SELECT ml.*, i.name, CASE WHEN i.status = 1 THEN 'ACTIVO' ELSE 'INACTIVO' END status
        FROM maintenance_log ml
        JOIN inventory i ON i.id = ml.inventory_id
        :where ORDER BY ml.date DESC`,
    REPORT_OBLIGATIONS:
        `SELECT p.*, o.description, o.reference
        FROM payments p
        JOIN obligations o ON o.id = p.obligation_id
        :where ORDER BY p.date DESC`,
    REPORT_OFFICIALS:
        `SELECT document, document_type, o.name, last_name, municipality, neighborhood, address, complement_address, 
        phone1, phone2, email, role_id, r.name AS 'roleName', 
        CASE WHEN o.status = 1 THEN 'ACTIVO' ELSE 'INACTIVO' END status
        FROM officials o
        JOIN roles r ON r.id = o.role_id
        :where ORDER BY o.status DESC`,
    REPORT_PQR:
        `SELECT  pqr.id, pqr.type, pqr.customer_id, c.business_name,  
        pqr.create_document,  pqr.create_document_type, o1.name AS create_name, o1.last_name AS create_last_name, o1.phone1 AS create_phone1, r.name AS create_roleName, 
        pqr.description,  pqr.location,  pqr.create_date,  
        CASE WHEN pqr.status = 1 THEN 'ABIERTA' ELSE 'CERRADA' END status,  
        pqr.update_document,  pqr.update_document_type, o2.name AS update_name, o2.last_name AS update_last_name, o2.phone1 AS update_phone1,  r2.name AS update_roleName, 
        pqr.observation, pqr.update_date, DATEDIFF(pqr.update_date,pqr.create_date) AS responseTime_days, TIMESTAMPDIFF(HOUR, pqr.create_date, pqr.update_date) AS responseTime_hours
        FROM pqr pqr
        JOIN customers c on c.id = pqr.customer_id
        JOIN officials o1 ON o1.document = pqr.create_document AND o1.document_type = pqr.create_document_type
        LEFT JOIN officials o2 ON o2.document = pqr.update_document AND o2.document_type = pqr.update_document_type
        JOIN roles r ON r.id = o1.role_id 
        LEFT JOIN roles r2 ON r2.id = o2.role_id 
        :where
        ORDER BY STATUS DESC`,
    REPORT_RESUME:
        `SELECT p.*, o.description, o.reference
        FROM payments p
        JOIN obligations o ON o.id = p.obligation_id
        :where ORDER BY p.date DESC`,

}

module.exports = {
    SQL,
};