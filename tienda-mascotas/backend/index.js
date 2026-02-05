const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 4000;
const SECRET_KEY = 'tu_clave_secreta_super_segura';

app.use(cors());
app.use(express.json());

// Configuración conexión MySQL
const db = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1234',
  database: 'virtual_pet_shop',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

// Middleware para autenticar token JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Rutas para productos
app.get('/products', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM product');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

app.get('/products/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await db.query('SELECT * FROM product WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener producto' });
  }
});

// Rutas para blog posts
app.get('/blog-posts', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM blog_post');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener posts' });
  }
});

// Registro de usuario
app.post('/register', async (req, res) => {
  const { email, password, name, phone, address } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  try {
    const [existing] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO user (email, password, name, phone, address) VALUES (?, ?, ?, ?, ?)',
      [email, hashedPassword, name, phone || null, address || null]
    );

    res.status(201).json({ message: 'Usuario creado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Login de usuario
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  try {
    const [users] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    res.json({
      message: 'Login exitoso',
      token,
      user: { id: user.id, email: user.email, name: user.name, phone: user.phone, address: user.address },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Ruta protegida para obtener perfil de usuario
app.get('/profile', authenticateToken, async (req, res) => {
  try {
    const [users] = await db.query(
      'SELECT id, email, name, phone, address FROM user WHERE id = ?',
      [req.user.id]
    );
    if (users.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(users[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Ruta para actualizar perfil de usuario
app.put('/profile', authenticateToken, async (req, res) => {
  const { name, phone, address } = req.body;

  try {
    await db.query(
      'UPDATE user SET name = ?, phone = ?, address = ? WHERE id = ?',
      [name, phone, address, req.user.id]
    );
    res.json({ message: 'Perfil actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar perfil' });
  }
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});