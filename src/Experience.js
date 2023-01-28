// import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import React from "react";
import Effects from "./Effects";
import { Level } from "./Level";
import Lights from "./Lights";
import Player from "./Player";
import useGame from "./stores/useGame";

function Experience() {
  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);
  return (
    <>
      <color args={["#252771"]} attach="background" />
      <Physics>
        <Lights />
        <Level count={blocksCount} seed={blocksSeed} />
        <Player />
      </Physics>
      <Effects />
    </>
  );
}

export default Experience;
