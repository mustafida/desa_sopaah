module.exports = {
  apps: [
    {
      name: 'desa-sopaah',
      script: 'build/index.js',
      env: {
        PORT: 8915,
        BODY_SIZE_LIMIT: 20971520 // 20 MB (minimal 15 MB)
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 8915,
        BODY_SIZE_LIMIT: 20971520 // 20 MB
      }
    }
  ]
};
