import Layout from "../components/Layout";
import BackButton from "../components/BackButton";

export default function About() {
  return (
    <Layout>
      <div
        className="about-view"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <BackButton />
        <div className="text-container">
          <h3 className="title" style={{ margin: "1em .25em" }}>
            About
          </h3>
          <p className="is-block" style={{ margin: ".75em" }}>
            👋 Hi, I'm James!
          </p>
          <p className="is-block" style={{ margin: ".75em" }}>
            If you've ever tried watching a coding tutorial on YouTube, chances
            are you eventually found yourself watching something totally
            unrelated. Or, you've wanted to watch solid tuts on React, but
            couldn't decide among the hundreds of playlists or instructors
            available!
          </p>
          <p className="is-block" style={{ margin: ".75em" }}>
            These are the <b>two main reasons</b> why Teach Yourself Code is
            being built (yes, it's a work in progress!). One, to give users a
            place where they can <i>focus entirely</i> on the video at hand, and
            two, to <i>eliminate decision paralysis</i> by providing a curation
            of videos by reputable instructors.
          </p>
          <p className="is-block" style={{ margin: ".75em" }}>
            Teach Yourself Code is built on React and GraphQL. I'm way more
            familiar with Vue, so I decided to use React to become more familiar
            with it. As such, the code is messy. Tests are almost non-existent
            as this point. And best practices aren't always followed. You can
            view the source code &nbsp;
            <a
              href="https://github.com/jamesctucker/teach-yourself-code"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "underline" }}
            >
              here
            </a>
            , and I welcome PRs and issue reports!
          </p>
          <p className="is-block" style={{ margin: ".75em" }}>
            For updates on other things I'm working on, you can follow me on
            &nbsp;
            <a
              href="https://twitter.com/tucker_dev"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "underline" }}
            >
              Twitter
            </a>
            !
          </p>
        </div>
      </div>
    </Layout>
  );
}
