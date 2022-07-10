module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME' ,'strapi-cms'),
      user: env('DATABASE_USER' ,'postgres'),
      password: env('DATABASE_PASSWORD' ,'jenengmu'),
      ssl: false,
      timezone: 'Asia/Jakarta'
    },
  },
});
