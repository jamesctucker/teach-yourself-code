import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const ADD_NOTE = gql`
  mutation MyMutation($note: String, $user_id: String, $video_id: String) {
    insert_notes(
      objects: { note: $note, user_id: $user_id, video_id: $video_id }
    ) {
      returning {
        id
        note
        video_id
        user_id
      }
    }
  }
`;

function CreateNote({ video, user }) {
  const [note, setNote] = useState("");
  const [addNote] = useMutation(ADD_NOTE, {
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
              note
            }
          }
        `,
        variables: {
          user_id: user.sub,
          video_id: video.snippet.resourceId.videoId
        }
      }
    ]
  });

  return (
    <div className="columns">
      <div className="column">
        <input
          type="textarea"
          onChange={e => setNote(e.target.value)}
          className="note-input"
        />
      </div>
      <div className="column is-3 has-text-right">
        <button
          className="add-note-btn button"
          onClick={() =>
            addNote({
              variables: {
                note: note,
                user_id: user.sub,
                video_id: video.snippet.resourceId.videoId
              }
            })
          }
        >
          save note
        </button>
      </div>
    </div>
  );
}

export default CreateNote;