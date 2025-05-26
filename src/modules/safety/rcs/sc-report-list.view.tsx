import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScReportCard } from "./sc-report-card.view";
import { ScReport, ScReportImpact } from "./sc-report.type";
import { Plus } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { ScReportNew } from "./sc-report-new.view";
import { useQuery } from "@/hooks/fetch/fetch.hook";
import { ScReportDeleteImpact } from "./sc-report-delete-impact.view";
import { ScReportUpdateImpact } from "./sc-report-update-impact.view";

export function ScReportList() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updateImpact, setUpdateImpact] = useState<ScReportImpact | null>(null);
  const [deleteImpact, setDeleteImpact] = useState<ScReportImpact | null>(null);
  const { data, refetch } = useQuery<Array<ScReport>>('/substandard-conditions', { method: 'GET' });

  const handleNew = () => setIsDialogOpen(true)
  const updateHandler = () => refetch()
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
          <ScReportCard key={report.id} report={report}
            updateHandler={updateHandler} updateImpact={setUpdateImpact} deleteImpact={setDeleteImpact}/>
        ))}
      </div>
      <ScReportNew
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={updateHandler}/>

      {
        updateImpact && <ScReportUpdateImpact
          impact={updateImpact}
          open={true}
          onClose={() => setUpdateImpact(null)}
          onSubmit={updateHandler}
        />
      }
      {
        deleteImpact && <ScReportDeleteImpact
          impact={deleteImpact}
          open={true}
          onClose={() => setDeleteImpact(null)}
          onSubmit={updateHandler}
        />
      }
    </>
  );
}
