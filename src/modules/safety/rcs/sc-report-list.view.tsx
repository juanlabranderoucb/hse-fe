import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScReportCard } from "./sc-report-card.view";
import { ScReport } from "./sc-report.type";
import { Plus } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { ScReportNew } from "./sc-report-new.view";
import { useQuery } from "@/hooks/fetch/fetch.hook";

export function ScReportList() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data, refetch } = useQuery<Array<ScReport>>('/screports', { method: 'GET' });

  const handleNew = () => setIsDialogOpen(true)
  const addNewReport = () => refetch()
  const reports: Array<ScReport> = data || []

  return (
    <>
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between p-4">
          <h4 className="text-l font-bold">Reporte de condiciones subestandar</h4>
          <Button 
            variant="default" 
            size="sm" 
            onClick={handleNew}
            className="rounded-full"
          >
            <Plus className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Nuevo reporte</span>
          </Button>
        </div>
        <Separator />
      </div>
      <div className="flex flex-col items-center">
        {reports.map((report) => (
          <ScReportCard key={report.id} report={report} />
        ))}
      </div>
      <ScReportNew
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={addNewReport}/>
    </>
  );
}
