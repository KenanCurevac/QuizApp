import "./StartPage.css";

import kameleon from "../assets/logokameleonpravi.png";

export default function StartPage({ onStart }) {
  return (
    <div className="start-site">
      <div className="start-message-frame">
        <header>
          <img
            src={kameleon}
            alt="Headline Picture"
            className="headline-image"
          />
        </header>
        <div className="quiz-starter">
          <h1 className="welcome-message">Test your knowledge!</h1>
          <button className="start-button" onClick={onStart}>
            Start
          </button>
        </div>
      </div>
    </div>
  );
}
