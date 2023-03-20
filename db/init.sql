-- SCRIPT para crear la B.D (si es que no existe) --
SELECT 'CREATE DATABASE codrr_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'codrr_db')\gexec