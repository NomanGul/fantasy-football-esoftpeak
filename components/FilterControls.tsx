import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FilterOption } from "@/lib/types";

interface FilterControlsProps {
  operators: FilterOption[];
  availableGameTypes: FilterOption[];
  availableSlateNames: FilterOption[];
  selectedOperator: string;
  selectedGameType: string;
  selectedSlateName: string;
  onOperatorChange: (value: string) => void;
  onGameTypeChange: (value: string) => void;
  onSlateNameChange: (value: string) => void;
}

export default function FilterControls({
  operators,
  availableGameTypes,
  availableSlateNames,
  selectedOperator,
  selectedGameType,
  selectedSlateName,
  onOperatorChange,
  onGameTypeChange,
  onSlateNameChange,
}: FilterControlsProps) {
  return (
    <div className="bg-[#FFFFFF1A] flex justify-between justify-self-center rounded-lg p-6 mb-6 w-full max-w-3xl">
      <Select value={selectedOperator} onValueChange={onOperatorChange}>
        <SelectTrigger className="bg-dark-gray border-dark-gray">
          <SelectValue placeholder="Select Operator" />
        </SelectTrigger>
        <SelectContent>
          {operators.map((operator) => (
            <SelectItem key={operator.id} value={operator.id}>
              {operator.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedGameType} onValueChange={onGameTypeChange} disabled={!selectedOperator}>
        <SelectTrigger className="bg-dark-gray border-dark-gray">
          <SelectValue placeholder="Select Game Type" />
        </SelectTrigger>
        <SelectContent>
          {availableGameTypes.map((gameType) => (
            <SelectItem key={gameType.id} value={gameType.id}>
              {gameType.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedSlateName} onValueChange={onSlateNameChange} disabled={!selectedGameType}>
        <SelectTrigger className="bg-dark-gray border-dark-gray">
          <SelectValue placeholder="Select Slate Name" />
        </SelectTrigger>
        <SelectContent>
          {availableSlateNames.map((slateName) => (
            <SelectItem key={slateName.id} value={slateName.id}>
              {slateName.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
