--
-- Users
--
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  pass VARCHAR(100) NOT NULL,
  registration_date DATE DEFAULT CURRENT_DATE
);

INSERT INTO
  users (id, email, name, pass)
VALUES
  (
    1,
    'alexisleite.uy@gmail.com',
    'Alexis',
    'Alexis123'
  ),
  (2, 'aline6656@gmail.com', 'Aline', 'Aline123');

--
-- Groups
--
CREATE TABLE groups (
  id SERIAL PRIMARY KEY,
  founder_id INTEGER NOT NULL,
  name VARCHAR(100),
  description VARCHAR(255),
  public BOOLEAN,
  CONSTRAINT group__founder FOREIGN KEY (founder_id) REFERENCES users (id)
);

INSERT INTO
  groups (founder_id, name, description, public)
VALUES
  (
    1,
    'Casita',
    'Grupo destinado a administrar la economía de nuestra casita.',
    TRUE
  );

--
-- An user belongs to n groups, a group have n users
--
CREATE TABLE users_groups (
  user_id INTEGER NOT NULL,
  group_id INTEGER NOT NULL,
  CONSTRAINT user_group__user FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT user_group__group FOREIGN KEY (group_id) REFERENCES groups (id),
  PRIMARY KEY (user_id, group_id)
);

INSERT INTO
  users_groups (user_id, group_id)
VALUES
  (1, 1),
  (2, 1);

--
-- A category belongs to a group, inside the group is determined by its label.
--
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  description VARCHAR(255) NOT NULL,
  label VARCHAR(100) NOT NULL,
  group_id INTEGER NOT NULL,
  CONSTRAINT category__group FOREIGN KEY (group_id) REFERENCES groups (id)
);

INSERT INTO
  categories (description, label, group_id)
VALUES
  (
    'Detectar automáticamente el tipo de categoría',
    'Autodetectar',
    1
  ),
  (
    'Gastos relacionados con alimentos y bebidas',
    'Comida',
    1
  ),
  (
    'Gastos en transporte público, combustible, etc.',
    'Transporte',
    1
  ),
  (
    'Gastos relacionados con la vivienda, alquiler, hipoteca',
    'Vivienda',
    1
  ),
  (
    'Pago de servicios como electricidad, agua, gas, internet',
    'Servicios Públicos',
    1
  ),
  (
    'Gastos en actividades recreativas, películas, juegos, etc.',
    'Entretenimiento',
    1
  ),
  (
    'Gastos médicos, seguros de salud, medicamentos',
    'Salud',
    1
  ),
  (
    'Gastos personales como ropa, accesorios, etc.',
    'Personal',
    1
  ),
  (
    'Gastos que no se ajustan a ninguna categoría específica',
    'Otro',
    1
  );

--
-- Each expense is made by a person inside a group.
--
CREATE TABLE expenses (
  user_id INTEGER NOT NULL,
  group_id INTEGER NOT NULL,
  concept VARCHAR(255) NOT NULL,
  amount INTEGER NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  category INTEGER NOT NULL,
  PRIMARY KEY (user_id, group_id, date),
  CONSTRAINT expenses__author FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT expenses__category FOREIGN KEY (category) REFERENCES categories (id)
);

INSERT INTO
  expenses (
    user_id,
    group_id,
    concept,
    amount,
    date,
    category
  )
VALUES
  (
    1,
    1,
    'Cena de asado',
    2200,
    '2024-12-06 00:00:00',
    2
  ),
  (1, 1, 'Tributos', 1497, '2024-12-05 00:00:03', 5),
  (
    1,
    1,
    'Vacaciones',
    5940,
    '2024-12-03 00:00:01',
    6
  ),
  (
    1,
    1,
    'Piriapolis',
    660,
    '2024-12-03 00:00:02',
    6
  ),
  (2, 1, 'Internet', 2273, '2024-11-28 00:00:04', 5),
  (2, 1, 'CGN', 18952, '2024-11-28 00:00:05', 4);

--
-- Invitation links
--
CREATE TABLE invitation_links (
  user_id INTEGER NOT NULL,
  group_id INTEGER NOT NULL,
  hash VARCHAR(64) NOT NULL,
  destinatary_email VARCHAR(255) NOT NULL,
  message VARCHAR(255),
  CONSTRAINT user_group__user FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT user_group__group FOREIGN KEY (group_id) REFERENCES groups (id)
);