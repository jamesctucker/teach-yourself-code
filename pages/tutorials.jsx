import React, { useEffect } from "react";
import Layout from "../components/Layout/index";
import Loader from "../components/Loader";
import BackButton from "../components/BackButton";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";
import { fetchPlaylists } from "../lib/queries";
import { useDispatch } from "react-redux";
import { resetVideo } from "../store/store";

function Tutorials(user) {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetVideo());
  });

  const { loading, error, data } = useQuery(fetchPlaylists, {
    variables: { topic: router.query.topic },
  });

  return (
    <Layout>
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="tutorials-view">
          <BackButton />
          <h3 className="title has-text-centered">Tutorials</h3>
          <ul className="playlists-list">
            {data.playlists.map((playlist) => (
              <li key={playlist.id}>
                <Link
                  href={`/preview?playlist=${playlist.playlist_id}&id=${playlist.id}`}
                >
                  <div className="card tutorial-card">
                    <div className="card-image">
                      <img src={playlist.thumbnail} alt="video thumbnail" />
                    </div>
                    <div className="card-content">
                      <div className="content">
                        <h3 className="title">{playlist.title}</h3>
                        <p>by {playlist.channel}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Layout>
  );
}

export default Tutorials;
