const PusherServer = require("pusher");

const pusherServer = new PusherServer({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_PUBLIC_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: 'us2',
    useTLS: true
})

module.exports = { pusherServer }