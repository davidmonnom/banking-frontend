module.exports = {
  apps: [
    {
      name: "cedav-nextjs",
      instances: "1",
      script: "./node_modules/next/dist/bin/next",
      args: "start -p 1998",
      env: {
        DATABASE_URL: "",
      },
      exp_backoff_restart_delay: 100,
      watch: true,
      max_memory_restart: "400M",
    },
  ],
  deploy: {
    production: {
      key: "~/.ssh/kadiix_vps",
      user: "kadiix",
      host: [""],
      ref: "origin/main",
      repo: "git@deployment:davidmonnom/cedav-nextjs.git",
      path: "/home/kadiix/applications/cedav/cedav-nextjs",
      "post-deploy":
        "npm install && npm run build && pm2 startOrRestart ecosystem.config.js -p 1998",
    },
  },
};
