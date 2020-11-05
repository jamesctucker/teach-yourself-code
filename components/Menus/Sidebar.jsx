import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

function Sidebar() {
  const router = useRouter();
  const user = useSelector((state) => state.user.currentUser);

  return (
    <div className="sidebar is-flex">
      <div className="brand-name">
        {user ? (
          <Link href="/dashboard">
            <img
              src="/static/images/main-logo.png"
              alt="logo"
              className="logo"
            />
          </Link>
        ) : (
          <Link href="/">
            <img
              src="/static/images/main-logo.png"
              alt="logo"
              className="logo"
            />
          </Link>
        )}
      </div>
      {user ? (
        <div
          className={
            router.route == "/dashboard" ? "nav-item-current" : "nav-item"
          }
        >
          <Link href="/dashboard">
            <FontAwesomeIcon icon="home" className="nav-icon" />
          </Link>
          <Link href="/dashboard">
            <a
              className={
                router.route == "/dashboard"
                  ? "nav-text-current is-size-6"
                  : "nav-text is-size-6"
              }
              style={{ margin: ".5em 0em" }}
            >
              Home
            </a>
          </Link>
        </div>
      ) : (
        <div className={router.route == "/" ? "nav-item-current" : "nav-item"}>
          <Link href="/">
            <FontAwesomeIcon icon="home" className="nav-icon" />
          </Link>
          <Link href="/">
            <a
              className={
                router.route == "/"
                  ? "nav-text-current is-size-6"
                  : "nav-text is-size-6"
              }
              style={{ margin: ".5em 0em" }}
            >
              Home
            </a>
          </Link>
        </div>
      )}

      <div
        className={router.route == "/about" ? "nav-item-current" : "nav-item"}
      >
        <Link href="/about">
          <FontAwesomeIcon icon="info-circle" className="nav-icon" />
        </Link>

        <Link href="/about">
          <a
            className={
              router.route == "/about"
                ? "nav-text-current is-size-6"
                : "nav-text is-size-6"
            }
            style={{ margin: ".5em 0em" }}
          >
            About
          </a>
        </Link>
      </div>
      <div
        className={router.route == "/topics" ? "nav-item-current" : "nav-item"}
      >
        <Link href="/topics">
          <FontAwesomeIcon icon={["fab", "youtube"]} className="nav-icon" />
        </Link>
        <Link href="/topics">
          <a
            className={
              router.route == "/topics"
                ? "nav-text-current is-size-6"
                : "nav-text is-size-6"
            }
            style={{ margin: ".5em 0em" }}
          >
            Topics
          </a>
        </Link>
      </div>

      {user ? (
        <div
          className={
            router.route == "/subscriptions" ? "nav-item-current" : "nav-item"
          }
        >
          <Link href="/subscriptions">
            <FontAwesomeIcon icon="bookmark" className="nav-icon" />
          </Link>
          <Link href="/subscriptions">
            <a
              className={
                router.route == "/subscriptions"
                  ? "nav-text-current is-size-6"
                  : "nav-text is-size-6"
              }
              style={{ margin: ".5em 0em" }}
            >
              Your Courses
            </a>
          </Link>
        </div>
      ) : null}
      {user ? (
        <>
          <div className="nav-item">
            <Link href="/api/logout">
              <FontAwesomeIcon icon="sign-out-alt" className="nav-icon" />
            </Link>
            <Link href="/api/logout">
              <a
                className="nav-text has-text-white is-size-6"
                style={{ margin: ".5em 0em" }}
              >
                Logout
              </a>
            </Link>
          </div>
        </>
      ) : (
        <div className="nav-item">
          <Link href="/api/login">
            <FontAwesomeIcon icon="user" className="nav-icon" />
          </Link>
          <Link href="/api/login">
            <a
              className="nav-text has-text-white is-size-6"
              style={{ margin: ".5em 0em" }}
            >
              Login
            </a>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
