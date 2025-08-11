import React from "react";
import teamMembers from "../data/teamMembers";
import TeamOrbit from "../components/TeamLopper";
import AstroCenter from "../components/LopperCenter";

export default function MeetTeam() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
      <AstroCenter size={200} />
      <TeamOrbit members={teamMembers} containerSize={500} />
    </div>
  );
}
