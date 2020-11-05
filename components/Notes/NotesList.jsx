import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { fetchNotes } from "../../lib/queries";

export default function NotesList({ user, selection, seek }) {
  const { loading, error, data, refetch } = useQuery(fetchNotes, {
    variables: {
      user_id: user.sub,
      video_id: selection.snippet.resourceId.videoId,
    },
  });

  const formatTimestamp = (s) => {
    let ms = s * 1000;
    let seconds = Math.floor((ms / 1000) % 60),
      minutes = Math.floor((ms / (1000 * 60)) % 60),
      hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    let time = hours + ":" + minutes + ":" + seconds;
    return time;
  };

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <div>
      <div className="notes-title has-text-left">
        <h3>
          <b>Your Notes</b>
        </h3>
      </div>
      <div className="notes-container ">
        <ul className="notes-list has-text-left">
          {data.notes.map((note) => (
            <li key={note.id} className="note">
              {/* Clicking accesses handleSeekTo in parent; causes video to jump to specific point in video */}
              <a onClick={() => seek(note.timestamp)}>
                {formatTimestamp(note.timestamp)}
              </a>
              - {note.note}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
