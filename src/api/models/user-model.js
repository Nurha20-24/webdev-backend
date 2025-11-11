import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
  // ruma mutta simppeli
  const [rows] = await promisePool.query('SELECT * FROM wsk_users');
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE user_id = ?',
    [id]
  );
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const findUserByUsername = async (username) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE username = ?',
    [username]
  );
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addUser = async (user) => {
  const {name, username, email, password, role} = user;
  const sql = `INSERT INTO wsk_users (name, username, email, password, role)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [name, username, email, password, role];
  const result = await promisePool.execute(sql, params);
  console.log('result', result);
  if (result[0].affectedRows === 0) {
    return false;
  }
  return {user_id: result[0].insertId};
};

const removeUser = async (userId) => {
  const connection = await promisePool.getConnection();

  try {
    await connection.beginTransaction();

    await connection.execute('DELETE FROM wsk_cats WHERE owner = ?', [userId]);

    const [result] = await connection.execute(
      'DELETE FROM wsk_users WHERE user_id = ?',
      [userId]
    );

    if (result.affectedRows === 0) {
      return {
        message: 'User not deleted.',
      };
    }

    await connection.commit();
    return {
      message: 'User deleted and their cats deleted.',
    };
  } catch (error) {
    await connection.rollback();
    console.error('error', error.message);
    return {
      message: error.message,
    };
  } finally {
    connection.release();
  }
};

const modifyUser = async (user, id) => {
  const {...updateData} = user;
  const sql = promisePool.format(`UPDATE wsk_users SET ? WHERE user_id = ?`, [
    updateData,
    id,
  ]);

  const [result] = await promisePool.execute(sql);
  console.log('modifyUser result', result);

  if (result.affectedRows === 0) {
    return false;
  }
  return {message: 'User updated successfully'};
};

export {listAllUsers, findUserById, addUser, modifyUser, removeUser};
