module.exports = {
    channels: {
        GET_CLIENT: 'client-info',
    },

    httpHeaders: {
        JSON: "application/json",
    },

    methods: {
        POST: 'post',
        GET: 'get',
        DELETE: 'delete'
    },

    plugins: {
      SUMMONER: "/lol-summoner/v1/current-summoner"
    }
};