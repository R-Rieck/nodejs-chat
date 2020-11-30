import React, { useState } from "react";
import { LoginView } from "../../components/login/loginView";
import { RegistrationView } from "../../components/login/registrationView";
import anime from "animejs";

type LoginPropType = {
  isLoggedIn: (state: boolean) => void;
};

export const Login = (props: LoginPropType) => {
  const { isLoggedIn } = props;

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
            <LoginView
              onClick={() => handleSideSwitch()}
              isLoggedIn={(state: boolean) => isLoggedIn(state)}
            />
          </div>
          <div className="login-inputbox__back">
            <RegistrationView
              onClick={() => handleSideSwitch()}
              isLoggedIn={(state: boolean) => isLoggedIn(state)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
