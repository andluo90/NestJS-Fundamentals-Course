module.exports = {
    apps: [
      {
        name: 'nest-app',
        script: 'dist/src/main.js',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '512M',
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  