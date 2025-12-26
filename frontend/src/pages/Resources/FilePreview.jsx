import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Preview.css";

const FilePreview = () => {
  const { state } = useLocation();


  // Comment State
  const [comments, setComments] = useState([
    { id: 1, user: "Student A", text: "Great explanation on loops! Thanks." },
    { id: 2, user: "Student B", text: "Can you upload more examples?" }
  ]);
  const [newComment, setNewComment] = useState("");

  const handlePostComment = () => {
    if (newComment.trim() !== "") {
      const commentObj = {
        id: comments.length + 1,
        user: "You",
        text: newComment
      };
      setComments([...comments, commentObj]);
      setNewComment("");
    }
  };


  return (
    <div className="preview-page">
      <h2>{state?.title}</h2>
      <p>File: {state?.file}</p>

      <div className="preview-box">
        {state?.file?.endsWith(".mp4") ? (
          <video width="100%" height="400" controls>
            <source src={`/Lectires video/${state.file}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>📄 Preview Section (PDF/Image/Text Placeholder)</p>
        )}
      </div>



      {/* COMMENTS SECTION */}
      <div className="comments-section">
        <h3>Discussion</h3>

        <div className="comments-list">
          {comments.map((c) => (
            <div key={c.id} className="comment-item">
              <strong>{c.user}</strong>
              <p>{c.text}</p>
            </div>
          ))}
        </div>

        <div className="comment-input-box">
          <textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handlePostComment}>Post</button>
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
