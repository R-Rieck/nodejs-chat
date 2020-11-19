import React, { useState } from "react";
import { LoginView } from "../../components/login/loginView";
import anime from "animejs";

export const Login = () => {
  const [playing, setPlaying] = useState<boolean>(false);

  const handleSideSwitch = () => {
    if (playing) return;

    setPlaying(true);

    anime({
      targets: ".login-inputbox__inner",
      scale: [{ value: 1 }, { value: 1.4 }, { value: 1, delay: 250 }],
      rotateY: { value: "+=180", delay: 200 },
      easing: "easeInOutSine",
      duration: 400,
      complete: function (anim) {
        setPlaying(false);
      },
    });
  };

  return (
    <div className="login-container">
      <div className="login-inputbox-container">
        <div className="login-inputbox__inner" onClick={() => function () {}}>
          <div className="login-inputbox__front">
            <LoginView onClick={() => handleSideSwitch()} />
          </div>
          <div className="login-inputbox__back">
            <div>hallo</div>
          </div>
        </div>
      </div>
    </div>
  );
};
