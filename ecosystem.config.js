module.exports = {
  apps: [
    {
      name: 'FreeDrive',
      script: 'index.js',
      instances: 2,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
