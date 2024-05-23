import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import { LOGIN_URL, spotifyApi } from "../../library/spotify";

const Music = () =>
  // { playlists }
  {
    return <div>Music</div>;
  };

export default Music;

export const getStaticProps = async (props) => {
  // const { accessToken } = params;
  // const response = await fetch(`/api/auth/spotify`, {
  //   method: "POST",
  //   body: JSON.stringify({ accessToken }),
  // });

  //   const playlists = await spotifyApi.getUserPlaylists();
  //   console.log("🚀 ~ getStaticProps ~ playlists:", playlists);
  return {
    // playlists,
    props: {
      ...(await serverSideTranslations(props.locale, ["navLinks", "blog"])),
    },
  };
};
