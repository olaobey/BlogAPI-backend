module.exports  = {
  apps: [
    {
      name: "BlogAPI-backend",
      script: "build server.js",
      args: "server.ts",
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
      },
    },
  ],
};


