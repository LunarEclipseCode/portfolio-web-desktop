import { useEffect, useRef, useState } from "react";

export interface HTMLAudioState {
  volume: number;
  playing: boolean;
}

export interface HTMLAudioProps {
  src: string;
  autoReplay?: boolean;
}

export function useAudio(props: HTMLAudioProps) {
  const [state, setState] = useState<HTMLAudioState>({
    volume: 1,
    playing: false
  });

  const ref = useRef<HTMLAudioElement>(new Audio(props.src));

  const controls = {
    play: (): Promise<void> | void => {
      const el = ref.current;
      if (el) {
        setState({ ...state, playing: true });
        return el.play();
      }
    },

    pause: (): Promise<void> | void => {
      const el = ref.current;
      if (el) {
        setState({ ...state, playing: false });
        return el.pause();
      }
    },

    toggle: (): Promise<void> | void => {
      const el = ref.current;
      if (el) {
        const promise = state.playing ? el.pause() : el.play();
        setState({ ...state, playing: !state.playing });
        return promise;
      }
    },

    volume: (value: number): void => {
      const el = ref.current;
      if (el) {
        value = Math.min(1, Math.max(0, value));
        el.volume = value;
        setState({ ...state, volume: value });
      }
    }
  };

  useEffect(() => {
    const el = ref.current;
    const handler = () => {
      setState({ ...state, playing: false });
      if (props.autoReplay) controls.play();
    };

    el.addEventListener("ended", handler);
    return () => {
      el.removeEventListener("ended", handler);
    };
  }, [props.autoReplay]);

  useEffect(() => {
    const el = ref.current;
    el.src = props.src;

    setState({
      volume: el.volume,
      playing: !el.paused
    });
  }, [props.src]);

  return [ref.current, state, controls, ref] as const;
}
