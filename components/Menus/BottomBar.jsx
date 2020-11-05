import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

function BottomBar() {
  const router = useRouter();
  const user = useSelector((state) => state.user.currentUser);

  return (
    <div className="bottom-bar-container">
      {user ? (
        <div className="bottom-nav-link">
          <Link href="/dashboard">
            <FontAwesomeIcon icon="home" className="nav-icon" />
          </Link>
        </div>
      ) : (
        <div className="bottom-nav-link">
          <Link href="/">
            <FontAwesomeIcon icon="home" className="nav-icon" />
          </Link>
        </div>
      )}
      <div className="bottom-nav-link">
        <Link href="/about">
          <FontAwesomeIcon icon="info-circle" className="nav-icon" />
        </Link>
      </div>
      <div className="bottom-nav-link">
        <Link href="/topics">
          <FontAwesomeIcon icon={["fab", "youtube"]} className="nav-icon" />
        </Link>
      </div>

      {user ? (
        <div className="bottom-nav-link">
          <Link href="/subscriptions">
            <FontAwesomeIcon icon="bookmark" className="nav-icon" />
          </Link>
        </div>
      ) : null}

      {user ? (
        <>
          <div className="bottom-nav-link">
            <Link href="/api/logout">
              <FontAwesomeIcon icon="sign-out-alt" className="nav-icon" />
            </Link>
          </div>
        </>
      ) : (
        <div className="bottom-nav-link">
          <Link href="/api/login">
            <FontAwesomeIcon icon="user" className="nav-icon" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default BottomBar;
