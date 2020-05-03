import Layout from "../components/Layout/index";
import BackButton from "../components/BackButton";

function Roadmap() {
  return (
    <Layout>
      <div className="roadmap-container">
        <BackButton />
        <h3 className="title">Roadmap</h3>
        <p className="subtitle">
          A list of update releases and planned improvements
        </p>
        <div className="columns">
          <div className="column">
            <div className="roadmap-section">
              <h2 className="title is-size-5 roadmap-header">Recent Updates</h2>
              <ul>
                <li>n/a</li>
              </ul>
            </div>
          </div>
          <div className="column is-centered is-vcentered">
            <div className="roadmap-section">
              <h2 className="title is-size-5 roadmap-header">
                Planned Features
              </h2>
              <ul>
                <li>- Save user progress for each tutorial</li>
                <li>- Add most recently-watched video to dashboard</li>
                <li>- Show tutorial progress indicator</li>
                <li>- Filter subscriptions by topic</li>
                <li>- Users can edit and delete notes</li>
                <li>- Users can add custom tutorials</li>
                <li>- Add single videos for topics</li>
                <li>
                  <s>- User can add note to specific video</s>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Roadmap;
