import React from "react";
import Layout from "../components/Layout";
import Router, { useRouter } from "next/router";
import Video from "../components/Video/Video";
import Description from "../components/Tutorial/Description";
import SignUpCTA from "../components/SignUpCTA";
import BackButton from "../components/BackButton";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useSelector } from "react-redux";
import { addUserPlaylist } from "../lib/mutations";
import gql from "graphql-tag";

const apiKey = process.env.YOUTUBE_API_KEY;

Preview.getInitialProps = async (ctx) => {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=id%2C%20snippet&maxResults=50&playlistId=${ctx.query.playlist}&key=${apiKey}`
  );
  const json = await res.json();
  return { video: json.items[0], videos: json.items };
};

function Preview({ video, videos }) {
  const router = useRouter();
  const user = useSelector((state) => state.user.currentUser);
  const userId = useSelector((state) => state.user.userId);

  const [addPlaylist] = useMutation(addUserPlaylist, {
    refetchQueries: [
      {
        query: gql`
          query GetUserPlaylists($user_id: Int) {
            user_playlists(where: { user_id: { _eq: $user_id } }) {
              playlist {
                id
                title
                description
                thumbnail
                playlist_id
                channel
              }
            }
          }
        `,
        variables: {
          user_id: userId ? userId : undefined,
        },
      },
    ],
  });

  const videoList = videos.slice(1).map((v) => (
    <li key={v.id} className="video-list-description-row">
      <div className="columns">
        <div className="column is-4">
          <img
            src={v.snippet.thumbnails ? v.snippet.thumbnails.default.url : null}
            alt="video thumbnail"
          />
        </div>
        <div className="column video-list-description">
          <h3 className="is-size-5">
            <b>{v.snippet.title}</b>
          </h3>
        </div>
      </div>
    </li>
  ));

  return (
    <Layout>
      <div className="preview-container">
        <BackButton />
        <div>
          <h3 className="is-size-4">
            <b>Preview of {video.snippet.title}</b>
          </h3>
        </div>
        <div className="columns top-preview-row">
          <div className="column video-column is-7">
            <Video video={video} className="preview-video" />
            {!user ? <SignUpCTA /> : null}
          </div>
          <div className="column description-column is-5">
            <Description video={video} />
          </div>
        </div>
        {user ? (
          <button
            onClick={() =>
              addPlaylist({
                variables: {
                  playlist_id: router.query.id,
                  user_id: userId,
                },
              }).then(() =>
                Router.push(
                  `/tutorial?playlist=${router.query.playlist}&id=${router.query.id}`
                )
              )
            }
            className="button add-course-btn"
          >
            Add Course
          </button>
        ) : null}

        <br />
        <br />
        <div className="tutorial-playlist-container">
          <h3
            className="is-size-5 has-text-centered"
            style={{ margin: ".5em 0em" }}
          >
            <b>Additional Videos in Tutorial</b>
          </h3>
          <ul className="tutorial-playlist">{videoList}</ul>
        </div>
      </div>
    </Layout>
  );
}

export default Preview;
