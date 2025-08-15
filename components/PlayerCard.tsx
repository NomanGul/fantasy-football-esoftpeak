import Image from "next/image";
import tom_brady from "@/public/tom_brady.png";
import { Player } from "@/lib/types";

interface PlayerCardProps {
  player: Player;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  return (
    <div className="bg-dark-gray rounded-lg text-center flex-1 flex flex-col items-center max-h-96 lg:max-h-[495px]">
      <div className="flex-1 flex flex-col justify-end">
        <Image
          src={tom_brady}
          alt={player.operatorPlayerName}
          className="mx-auto object-cover"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </div>
      <div className="flex-1 bg-[#2F2F2F] text-[#FFFFFFCC] rounded-lg w-full py-4 px-2 space-y-2">
        <h3 className="lg:text-3xl text-2xl">{player.operatorPlayerName}</h3>
        <div className="lg:text-9xl text-7xl">{player.fantasyPoints || 0}</div>
        <div>Points</div>
      </div>
    </div>
  );
}
