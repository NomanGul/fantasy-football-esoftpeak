"use client";

import { useState, useMemo, useEffect } from "react";
import Header from "@/components/Header";
import FilterControls from "@/components/FilterControls";
import PlayersTable from "@/components/PlayersTable";
import PlayerCard from "@/components/PlayerCard";
import LoadingState from "@/components/LoadingState";
import { Player, SlateData } from "@/lib/types";

export default function FantasyFootballApp() {
  const [data, setData] = useState<SlateData[]>([]);
  const [selectedOperator, setSelectedOperator] = useState<string>("");
  const [selectedGameType, setSelectedGameType] = useState<string>("");
  const [selectedSlateName, setSelectedSlateName] = useState<string>("");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [loading, setLoading] = useState(true);

  // Load data from data.json
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error(`Failed to load data: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Get unique operators
  const operators = useMemo(() => {
    const uniqueOperators = [...new Set(data.map((slate) => slate.operator))];
    return uniqueOperators.map((op) => ({ id: op, name: op }));
  }, [data]);

  // Get available game types based on selected operator
  const availableGameTypes = useMemo(() => {
    if (!selectedOperator) return [];
    const uniqueGameTypes = [
      ...new Set(data.filter((slate) => slate.operator === selectedOperator).map((slate) => slate.operatorGameType)),
    ];
    return uniqueGameTypes.map((gt) => ({ id: gt, name: gt }));
  }, [data, selectedOperator]);

  // Get available slate names based on selected game type
  const availableSlateNames = useMemo(() => {
    if (!selectedGameType) return [];
    const uniqueSlateNames = [
      ...new Set(
        data
          .filter((slate) => slate.operator === selectedOperator && slate.operatorGameType === selectedGameType)
          .map((slate) => slate.operatorName)
      ),
    ];
    return uniqueSlateNames.map((sn) => ({ id: sn, name: sn }));
  }, [data, selectedOperator, selectedGameType]);

  // Get players for selected slate
  const availablePlayers = useMemo(() => {
    if (!selectedSlateName) return [];
    const selectedSlate = data.find(
      (slate) =>
        slate.operator === selectedOperator &&
        slate.operatorGameType === selectedGameType &&
        slate.operatorName === selectedSlateName
    );
    return selectedSlate?.dfsSlatePlayers || [];
  }, [data, selectedOperator, selectedGameType, selectedSlateName]);

  // Show players when game type is selected
  const showPlayers = selectedGameType !== "";

  // Pagination logic
  const totalPlayers = availablePlayers.length;
  const totalPages = Math.ceil(totalPlayers / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentPlayers = availablePlayers.slice(startIndex, endIndex);

  // Set first player as selected when slate name changes
  useEffect(() => {
    if (availablePlayers.length > 0 && !selectedPlayer) {
      setSelectedPlayer(availablePlayers[0]);
    }
  }, [availablePlayers, selectedPlayer]);

  const handleOperatorChange = (value: string) => {
    setSelectedOperator(value);
    setSelectedGameType("");
    setSelectedSlateName("");
    setSelectedPlayer(null);
  };

  const handleGameTypeChange = (value: string) => {
    setSelectedGameType(value);
    setSelectedSlateName("");
    setSelectedPlayer(null);
    setCurrentPage(1);
  };

  const handleSlateNameChange = (value: string) => {
    setSelectedSlateName(value);
    setSelectedPlayer(null);
    setCurrentPage(1);
  };

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player);
  };

  return (
    <div className="min-h-screen text-white">
      <LoadingState loading={loading} />

      <Header />

      <div className="p-6">
        <FilterControls
          operators={operators}
          availableGameTypes={availableGameTypes}
          availableSlateNames={availableSlateNames}
          selectedOperator={selectedOperator}
          selectedGameType={selectedGameType}
          selectedSlateName={selectedSlateName}
          onOperatorChange={handleOperatorChange}
          onGameTypeChange={handleGameTypeChange}
          onSlateNameChange={handleSlateNameChange}
        />

        {showPlayers && availablePlayers.length > 0 && (
          <div className="flex gap-6 flex-wrap">
            <PlayersTable
              players={currentPlayers}
              selectedPlayer={selectedPlayer}
              currentPage={currentPage}
              totalPages={totalPages}
              rowsPerPage={rowsPerPage}
              startIndex={startIndex}
              endIndex={endIndex}
              totalPlayers={totalPlayers}
              onPlayerClick={handlePlayerClick}
              onPageChange={setCurrentPage}
              onRowsPerPageChange={(newRowsPerPage) => {
                setRowsPerPage(newRowsPerPage);
                setCurrentPage(1);
              }}
            />

            {selectedPlayer && <PlayerCard player={selectedPlayer} />}
          </div>
        )}
      </div>
    </div>
  );
}
