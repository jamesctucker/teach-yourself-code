import VideoCard from "./VideoCard";

function VideoList({ videos }) {
  // loop through videos to create the table of contents located under the main video
  // we start at index 1 because we don't want the first video to part of the list
  const videoList = videos.slice(1).map((v) => <VideoCard key={v.id} v={v} />);
  return (
    <div>
      <ul className="tutorial-playlist">{videoList}</ul>
    </div>
  );
}

export default VideoList;
