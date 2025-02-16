import "./StartPage.css";
import kameleon from "../assets/logokameleonpravi.png";

type StartPageProp = { onStart: () => void };

export default function StartPage({ onStart }: StartPageProp) {
  return (
    <div className="start-page">
      <div className="start-message-frame">
        <header>
          <img src={kameleon} alt="Headline Picture" className="logo" />
        </header>
        <div className="quiz-start-action">
          <h1 className="welcome-message">Test your knowledge!</h1>
          <button className="start-button" onClick={onStart}>
            Start
          </button>
        </div>
      </div>
    </div>
  );
}
