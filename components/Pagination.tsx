import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  startIndex: number;
  endIndex: number;
  totalPlayers: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  rowsPerPage,
  startIndex,
  endIndex,
  totalPlayers,
  onPageChange,
  onRowsPerPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between p-3 bg-[#262626] overflow-hidden rounded-b-lg">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">Page</span>
          <Select value={currentPage.toString()} onValueChange={(value) => onPageChange(Number.parseInt(value))}>
            <SelectTrigger className="bg-dark-gray border-dark-gray">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: totalPages }, (_, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()}>
                  {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm">Rows per page</span>
          <Select value={rowsPerPage.toString()} onValueChange={(value) => onRowsPerPageChange(Number.parseInt(value))}>
            <SelectTrigger className="bg-dark-gray border-dark-gray">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="8">8</SelectItem>
              <SelectItem value="16">16</SelectItem>
              <SelectItem value="24">24</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm">
          {startIndex + 1} - {Math.min(endIndex, totalPlayers)} of {totalPlayers}
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
