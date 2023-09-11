module.exports  = {
  apps: [
    {
      name: "BlogAPI-backend",
      script: "dist/server.js",
      instances: "max", 
      exec_mode: "cluster",
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 5000, 
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 5000, 
      },
    },
  ],
};


