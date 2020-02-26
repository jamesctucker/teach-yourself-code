import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Sidebar({ user, loading }) {
  return (
    <div
      className="sidebar is-flex"
      style={{
        flexDirection: "column",
        height: "100%",
        margin: "8em 1em"
      }}
    >
      <div
        className="brand-name is-flex"
        style={{
          alignItems: "center",
          marginBottom: "7em",
          marginLeft: ".25em"
        }}
      >
        <div
          className="logo-bg is-flex"
          style={{
            backgroundColor: "#00BB61",
            height: "36px",
            width: "36px",
            borderRadius: "7px",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "0.75em"
          }}
        >
          <h3 className="has-text-white is-size-6">T</h3>
        </div>
        <Link href="/">
          <h3 className="has-text-white is-size-6">Teach Yourself Code</h3>
        </Link>
      </div>
      <div className="nav-item">
        <FontAwesomeIcon icon="home" className="nav-icon" />
        <Link href="/">
          <a
            className="has-text-white is-size-6"
            style={{ margin: ".5em 0em" }}
          >
            Home
          </a>
        </Link>
      </div>
      <div className="nav-item">
        <FontAwesomeIcon icon="info-circle" className="nav-icon" />

        <Link href="/about">
          <a
            className="has-text-white is-size-6"
            style={{ margin: ".5em 0em" }}
          >
            About
          </a>
        </Link>
      </div>
      <div className="nav-item">
        <FontAwesomeIcon icon={["fab", "youtube"]} className="nav-icon" />
        <Link href="/topics">
          <a
            className="has-text-white is-size-6"
            style={{ margin: ".5em 0em" }}
          >
            Topics
          </a>
        </Link>
      </div>
      {user ? (
        <div className="nav-item">
          <FontAwesomeIcon icon="bookmark" className="nav-icon" />
          <Link href="/subscriptions">
            <a
              className="has-text-white is-size-6"
              style={{ margin: ".5em 0em" }}
            >
              Your Courses
            </a>
          </Link>
        </div>
      ) : null}

      {!loading &&
        (user ? (
          <>
            <div className="nav-item">
              <FontAwesomeIcon icon="user" className="nav-icon" />
              <Link href="/profile">
                <a
                  className="has-text-white is-size-6"
                  style={{ margin: ".5em 0em" }}
                >
                  Profile
                </a>
              </Link>
            </div>
            <div className="nav-item">
              <FontAwesomeIcon icon="sign-out-alt" className="nav-icon" />
              <Link href="/api/logout">
                <a
                  className="has-text-white is-size-6"
                  style={{ margin: ".5em 0em" }}
                >
                  Logout
                </a>
              </Link>
            </div>
          </>
        ) : (
          <div className="nav-item">
            <FontAwesomeIcon icon="user" className="nav-icon" />
            <Link href="/api/login">
              <a
                className="has-text-white is-size-6"
                style={{ margin: ".5em 0em" }}
              >
                Login
              </a>
            </Link>
          </div>
        ))}
    </div>
  );
}

export default Sidebar;
