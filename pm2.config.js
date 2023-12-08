module.exports = {
    apps: [
        {
            name: "BounsBot.com",
            script: "serve",
            args: ["-s", "build"],
            watch: true,
            env: {
                PORT: 3000,
                NODE_ENV: "production",
            },
        },
    ],
};
