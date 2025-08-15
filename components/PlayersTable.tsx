import Pagination from "./Pagination";
import { Player } from "@/lib/types";

interface PlayersTableProps {
  players: Player[];
  selectedPlayer: Player | null;
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  startIndex: number;
  endIndex: number;
  totalPlayers: number;
  onPlayerClick: (player: Player) => void;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

export default function PlayersTable({
  players,
  selectedPlayer,
  currentPage,
  totalPages,
  rowsPerPage,
  startIndex,
  endIndex,
  totalPlayers,
  onPlayerClick,
  onPageChange,
  onRowsPerPageChange,
}: PlayersTableProps) {
  return (
    <div className="rounded-lg overflow-hidden flex-4 text-sm">
      <table className="w-full">
        <thead>
          <tr className="bg-dark-gray">
            <th className="text-left p-3 font-medium">Name</th>
            <th className="text-left p-3 font-medium">Team</th>
            <th className="text-left p-3 font-medium">Position</th>
            <th className="text-left p-3 font-medium">Salary</th>
            <th className="text-left p-3 font-medium">Points</th>
          </tr>
        </thead>
        <tbody className="bg-[#2F2F2F]">
          {players.map((player) => (
            <tr
              key={player.slatePlayerId}
              className={`cursor-pointer hover:bg-[#807B0F] transition-colors ${
                selectedPlayer?.slatePlayerId === player.slatePlayerId ? "bg-[#807B0F]" : ""
              }`}
              onClick={() => onPlayerClick(player)}
            >
              <td className="p-3 font-medium">{player.operatorPlayerName}</td>
              <td className="p-3">{player.team}</td>
              <td className="p-3">{player.operatorPosition}</td>
              <td className="p-3">${player.operatorSalary.toLocaleString()}</td>
              <td className="p-3">{player.fantasyPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        startIndex={startIndex}
        endIndex={endIndex}
        totalPlayers={totalPlayers}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </div>
  );
}
