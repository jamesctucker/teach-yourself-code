import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import NotesList from "../Notes/NotesList";
import { useSelector } from "react-redux";
import { addNewNote } from "../../lib/mutations";

function Video({ video }) {
  const ref = useRef(null);
  const router = useRouter();
  const user = useSelector((state) => state.user.currentUser);
  const userId = useSelector((state) => state.user.userId);

  const [currentNote, setNote] = useState("");
  const [timestamp, setTimestamp] = useState(null);

  const currentVideo = useSelector((state) => state.videos.currentVideo);
  const videoToShow = currentVideo != undefined ? currentVideo : video;

  const [addNote] = useMutation(addNewNote, {
    refetchQueries: [
      {
        query: gql`
          query fetchNotes($user_id: String, $video_id: String) {
            notes(
              where: {
                user_id: { _eq: $user_id }
                video_id: { _eq: $video_id }
              }
            ) {
              id
              note
              timestamp
            }
          }
        `,
        variables: {
          user_id: user ? user.sub : undefined,
          video_id: videoToShow.snippet.resourceId.videoId,
        },
      },
    ],
  });

  useEffect(() => {
    if (user) {
      setTimestamp(Math.round(ref.current.getCurrentTime()));
    }
  });

  const handleGetCurrentTime = () => {
    setTimestamp(Math.round(ref.current.getCurrentTime()));
    handleAddNote();
  };

  function handleAddNote() {
    addNote({
      variables: {
        note: currentNote,
        timestamp: timestamp,
        user_id: user.sub,
        video_id: videoToShow.snippet.resourceId.videoId,
      },
    });
    setNote("");
  }

  const handleSeekTo = (value) => {
    ref.current.seekTo(value);
  };

  return (
    <div
      className="columns"
      style={{ background: "lightgray", padding: "1em" }}
    >
      <div className="column">
        <div className="player-wrapper">
          <ReactPlayer
            ref={ref}
            url={
              "https://youtube.com/embed/" +
              videoToShow.snippet.resourceId.videoId
            }
            controls={true}
            className="react-player"
            width="100%"
            height="100%"
          />
        </div>
        {router.route == "/tutorial" ? (
          <div>
            <div className="columns">
              <div className="column">
                <input
                  type="textarea"
                  placeholder="Type something..."
                  value={currentNote}
                  onChange={(e) => setNote(e.target.value)}
                  className="note-input"
                />
              </div>
              <div className="column is-3 has-text-right">
                <button
                  className="save-note-btn button"
                  onClick={handleGetCurrentTime}
                  style={{ margin: "1em 0em" }}
                >
                  save note
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      {router.route == "/tutorial" ? (
        <div
          className="column is-5"
          style={{ maxHeight: "400px", overflow: "scroll" }}
        >
          <NotesList user={user} selection={videoToShow} seek={handleSeekTo} />
        </div>
      ) : null}
    </div>
  );
}

export default Video;
