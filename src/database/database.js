import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  { name: 'items.db', location: 'default' },
  () => console.log('Database connected'),
  error => console.log(error)
);

export const setupDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT);',
      [],
      () => console.log('Table created'),
      error => console.log(error)
    );
  });
};


export const fetchItems = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM items ORDER BY id DESC;', 
      [],
      (_, results) => {
        let items = [];
        for (let i = 0; i < results.rows.length; i++) {
          items.push(results.rows.item(i));
        }
        callback(items);
      },
      error => console.log(error)
    );
  });
};





export const addItemToDB = (name, description, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO items (name, description) VALUES (?, ?);',
      [name, description],
      (_, result) => {
        console.log("Item Inserted:", result);
        if (result.insertId) {
          callback(result.insertId); 
        }
      },
      (_, error) => {
        console.log("Insert Failed:", error);
      }
    );
  });
};






export const updateItemInDB = (id, name, description, callback) => {
  // console.log("The  update Item with ID:", id);
  // console.log("New Name:", name);
  // console.log("New Description:", description);

  db.transaction(tx => {
    
    tx.executeSql(
      'SELECT * FROM items WHERE id = ?;',
      [id],
      (_, result) => {
        console.log("Existing Item Data:", result.rows.item(0));

        if (result.rows.length === 0) {
          console.log("No item found with this ID. Update will not work.");
          return;
        }

        
        tx.executeSql(
          'UPDATE items SET name = ?, description = ? WHERE id = ?;',
          [name, description, id],
          (_, result) => {
            console.log("Update Query Success:", result);
            if (result.rowsAffected > 0) {
              callback();
            } else {
              console.log("No rows were updated. Check if the ID exists.");
            }
          },
          (_, error) => {
            console.log("Update Failed:", error);
          }
        );
      },
      (_, error) => {
        console.log("Error fetching item before update:", error);
      }
    );
  });
};




export const deleteItemFromDB = (id, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM items WHERE id=?;',
      [id],
      () => fetchItems(callback), 
      error => console.log(error)
    );
  });
};
