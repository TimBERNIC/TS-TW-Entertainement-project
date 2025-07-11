import React from "react";
import { useState, useEffect } from "react";
import Button from "../components/Button";

interface TimerState {
  isRunning: boolean;
  timeLeft: number;
  mode: "work" | "break" | "longBreak";
}

const formatTimeFull = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return [
    hours.toString().padStart(2, "0"),
    mins.toString().padStart(2, "0"),
    secs.toString().padStart(2, "0"),
  ].join(":");
};

const PomodoroTimer = () => {
  const [timerState, setsTimerstate] = useState<TimerState>({
    isRunning: false,
    timeLeft: 25 * 60,
    mode: "longBreak",
  });

  const [modal, setModal] = useState<boolean>(false);
  const [newSeconds, setNewSeconds] = useState<number>(0);
  const [newMinutes, setNewMinutes] = useState<number>(0);
  const [newHours, setNewHours] = useState<number>(0);
  useEffect(() => {
    if (timerState.timeLeft === 0) {
      setsTimerstate((prev) => ({
        ...prev,
        isRunning: false,
        mode: "longBreak",
      }));
      return;
    }
    if (timerState.isRunning) {
      const interval = setInterval(() => {
        setsTimerstate((prev) => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
        }));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timerState.isRunning]);

  const startTimer = () => {
    setsTimerstate((prev) => ({
      ...prev,
      isRunning: true,
      mode: "work",
    }));
  };

  const stopTimer = () => {
    if (timerState.isRunning) {
      setsTimerstate((prev) => ({
        ...prev,
        isRunning: false,
        mode: "break",
      }));
    } else {
      setsTimerstate((prev) => ({
        ...prev,
        isRunning: true,
        mode: "work",
      }));
    }
  };

  const resetTimer = () => {
    setsTimerstate({
      isRunning: false,
      timeLeft: 25 * 60,
      mode: "longBreak",
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTimer = newHours * 3600 + newMinutes * 60 + newSeconds;
    setsTimerstate({
      isRunning: false,
      timeLeft: newTimer,
      mode: "longBreak",
    });
    setModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">🕰️Timer</h1>
        <div className="flex justify-center items-center gap-12 my-12">
          <Button
            title="Start"
            btnFunction={() => {
              startTimer();
            }}
          />
          <Button
            title={timerState.isRunning ? "Pause" : "Restart"}
            btnFunction={() => {
              stopTimer();
            }}
          />
          <Button title="Reset" btnFunction={resetTimer} />
        </div>
        <div className="text-center text-4xl font-bold">
          <p>{formatTimeFull(timerState.timeLeft)}</p>
        </div>
        {!modal ? (
          <div className="text-center text-2xl font-bold">
            <Button
              title="Change Time Setter"
              btnFunction={() => {
                setModal(true);
              }}
            />
          </div>
        ) : (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <form className="bg-white p-4 rounded-lg" onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold">
                Incrivez un nouveau temps de départ
              </h2>
              <div className="flex justify-between text-black items-center gap-4">
                <h3>Heures</h3>
                <input
                  type="number"
                  value={newHours}
                  onChange={(event) => setNewHours(Number(event.target.value))}
                  className="border-2 border-grey rounded-md p-2"
                />
              </div>
              <div className="flex justify-between text-black items-center gap-4">
                <h3>Minutes</h3>
                <input
                  type="number"
                  value={newMinutes}
                  onChange={(event) =>
                    setNewMinutes(Number(event.target.value))
                  }
                  className="border-2 border-grey rounded-md p-2"
                />
              </div>
              <div className="flex justify-between text-black items-center gap-4">
                <h3>Secondes</h3>
                <input
                  type="number"
                  value={newSeconds}
                  onChange={(event) =>
                    setNewSeconds(Number(event.target.value))
                  }
                  className="border-2 border-grey rounded-md p-2"
                />
              </div>
              <Button title="Valider" btnFunction={() => {}} />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PomodoroTimer;
