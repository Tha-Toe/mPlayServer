

const express = require("express");
const app = express();

const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");
const bodyParser = require("body-parser");


app.use(cors());
app.use(bodyParser.json());

app.post("/refresh", (req,res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000",
        clientId: "2614e21fa9364cc690d8562664d222b3",
        clientSecret: "9168c24ab74e48cc89fe652d0967d896",
        refreshToken
    })

    spotifyApi.refreshAccessToken()
    .then(data => {
        console.log(data.body)
        res.json({
            accessToken: data.body.accessToken,
            expiresIn: data.body.expiresIn
        });
        })
        .catch((err) => {
            console.log(err)
            res.sendStatus(400)
        })
})

app.post('/login',(req,res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000",
        clientId: "2614e21fa9364cc690d8562664d222b3",
        clientSecret: "9168c24ab74e48cc89fe652d0967d896"
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch((err) => {
        console.log(err)
        res.sendStatus(400)
    })
})

app.listen(3001)