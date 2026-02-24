module.exports = {
    apps: [
        {
            name: 'dashboard-api',
            script: 'dist/src/main.js',
            instances: 'max',
            exec_mode: 'cluster',
            env: {
                NODE_ENV: 'production',
                PORT: 3000
            },
        },
    ],
};