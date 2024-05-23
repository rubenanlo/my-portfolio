const SpotifyWebApi = require("spotify-web-api-node");

const scope = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-modify-private",
  "user-library-read",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-follow-read",
  "streaming",
  "user-read-private",
].join(",");

const params = {
  scope,
};

const queryParamString = new URLSearchParams(params);

export const LOGIN_URL = `https://accounts.spotify.com/authorize?client_id=${
  process.env.SPOTIFY_CLIENT_ID
}&response_type=token&redirect_uri=${process.env.SPOTIFY_URI}&
${queryParamString.toString()}`;

export const spotifyApi = new SpotifyWebApi({
  clientId: `${process.env.SPOTIFY_CLIENT_ID}`,
  clientSecret: `${process.env.SPOTIFY_CLIENT_SECRET}`,
  redirectUri: `${process.env.SPOTIFY_URI}`,
});
