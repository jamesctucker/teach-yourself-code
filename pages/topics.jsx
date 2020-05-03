import Layout from "../components/Layout/index";
import Link from "next/link";
import SignUpCTA from "../components/SignUpCTA";
import { useSelector } from "react-redux";

function Topics() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Layout>
      <div className="topic-view">
        <h3 className="title topic-header has-text-centered">
          <b>What do you want to learn?</b>
        </h3>
        {!user ? <SignUpCTA /> : null}

        <div className="topics-container">
          <Link href="tutorials?topic=HTML5">
            <img
              src="/static/images/html5.png"
              alt="html graphic"
              className="topic-graphic"
            />
          </Link>
          <Link href="tutorials?topic=CSS3">
            <img
              src="/static/images/css3.png"
              alt="css graphic"
              className="topic-graphic"
            />
          </Link>
          <Link href="tutorials?topic=JavaScript">
            <img
              src="/static/images/js.png"
              alt="javascript graphic"
              className="topic-graphic"
            />
          </Link>
          <Link href="tutorials?topic=React">
            <img
              src="/static/images/react.png"
              alt="react graphic"
              className="topic-graphic"
            />
          </Link>
          <Link href="tutorials?topic=Vue">
            <img
              src="/static/images/vue.png"
              alt="vue graphic"
              className="topic-graphic"
            />
          </Link>
          <Link href="tutorials?topic=Svelte">
            <img
              src="/static/images/svelte.png"
              alt="svelte graphic"
              className="topic-graphic"
              style={{ border: "1px solid lightgray" }}
            />
          </Link>
          <Link href="tutorials?topic=Node">
            <img
              src="/static/images/node.png"
              alt="node graphic"
              className="topic-graphic"
            />
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Topics;
