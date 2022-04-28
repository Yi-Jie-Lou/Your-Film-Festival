import React from "react";
import ReactJoyride, { EVENTS, STATUS } from "react-joyride";

const steps = [
  {
    title: "Step1",
    content: "Target: body, Placement: center",
    target: "body",
    placement: "center"
  },
  {
    title: "Step2",
    content: "Target: body, Placement: center",
    target: "#h1",
    placement: "top"
  },
];

export const Joyride = (props) => {
  const { setRun, run, stepIndexState, setStepIndexState } = props;

  const handleJoyrideCallback = (data) => {
    const { status, type } = data;
    console.log({ type, status, action: data.action, data });
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      setRun(false);
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      setStepIndexState((prev) => prev + 1);
    }
  };

  return (
    <ReactJoyride
      run={run}
      steps={steps}
      stepIndex={stepIndexState}
      debug
      continuous
      showSkipButton
      showProgress
      callback={handleJoyrideCallback}
      styles={{
        options: {
          zIndex: 10000
        }
      }}
    />
  );
};
