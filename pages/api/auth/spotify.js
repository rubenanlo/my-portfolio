import { spotifyApi } from "library/spotify";

const handler = async (req, res) => {
  const { code } = req.query;
  const data = await spotifyApi.authorizationCodeGrant(code);
  res.json({
    accessToken: data.body["access_token"],
    refreshToken: data.body["refresh_token"],
    expiresIn: data.body["expires_in"],
  });
};

export default handler;
