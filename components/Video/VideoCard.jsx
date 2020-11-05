import { useDispatch } from "react-redux";
import { updateCurrentVideo } from "../../store/store";

function VideoCard({ v }) {
  const dispatch = useDispatch();

  return (
    <li
      key={v.id}
      className="card video-card"
      onClick={() => dispatch(updateCurrentVideo(v))}
    >
      <div className="card-content columns">
        <div className="column is-4">
          <div className="video-thumbnail-container">
            <img
              src={v.snippet.thumbnails.default.url}
              alt="video thumbnail"
              className="video-thumbnail"
            />
          </div>
        </div>
        <div className="column">
          <div className="video-card-header">
            <h3 className="is-size-5" style={{ margin: ".5em 0em" }}>
              <b>{v.snippet.title}</b>
            </h3>
          </div>
        </div>
      </div>
    </li>
  );
}

export default VideoCard;
