import Layout from "../components/Layout";
import Link from "next/link";
import TutorialCard from "../components/Tutorial/TutorialCard";
import BackButton from "../components/BackButton";
import { useQuery } from "@apollo/react-hooks";
import { fetchUserPlaylists } from "../lib/queries";
import { useSelector } from "react-redux";

function Subscriptions() {
  const user = useSelector((state) => state.user.currentUser);
  const userId = useSelector((state) => state.user.userId);
  const { loading, error, data } = useQuery(fetchUserPlaylists, {
    variables: { user_id: userId ? userId : null },
  });

  return (
    <Layout className="is-flex">
      <div
        className="subscriptions-view is-flex"
        style={{ flexDirection: "column" }}
      >
        <BackButton />
        {user ? (
          <h3 className="subscriptions-header title is-size-3 is-size-5-touch has-text-centered">
            Here are your tutorials!
          </h3>
        ) : (
          "Error retrieving user!"
        )}
        <br />

        {loading ? (
          "Loading your library"
        ) : data.user_playlists.length == 0 ? (
          <div>
            <h3 className="page-header is-size-3">
              Add your first <Link href="/topics">tutorial!</Link>
            </h3>
          </div>
        ) : (
          <ul className="subscriptions-list">
            {data.user_playlists.map((up) => (
              <li key={up.playlist.id}>
                <TutorialCard tutorial={up} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}

export default Subscriptions;
