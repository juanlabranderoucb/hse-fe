import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  MessageCircle,
  Share,
  Dot,
  ThumbsUp,
  Plus,
  Pencil,
  Trash
} from "lucide-react";
import { ScReport, ScReportImpact } from "./sc-report.type";
import { ScReportNewImpact } from "./sc-report-new-impact.view";

interface ScReportCardProps {
  report: ScReport;
  updateHandler: () => void;
  updateImpact: (impact: ScReportImpact) => void
  deleteImpact: (impact: ScReportImpact) => void
}

export function ScReportCard({ report, updateHandler, updateImpact, deleteImpact }: ScReportCardProps) {
  const [isImpactDialogOpen, setIsImpactDialogOpen] = useState(false);

  return (
    <>
      <Card className="max-w-xl w-full rounded-none border-x-0 border-t-0 shadow-none hover:bg-muted/50 transition-colors">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-start space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage/>
              <AvatarFallback>{`${report.user.userName[0]}${report.user.userName[1]}`.toUpperCase()}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center">
                <span className="font-semibold mr-1">{report.user.displayName || report.user.userName}</span>

                <span className="text-muted-foreground">@{report.user.userName}</span>
                <Dot className="text-muted-foreground h-4 w-4" />
                <span className="text-muted-foreground text-sm">{report.elapsed}</span>
              </div>

              <p className="mt-1 text-base">{report.description}</p>

              <h2 className="mt-3 font-semibold text-sm">Ubicación:</h2>
              <p className="mt-1 text-base">{report.location}</p>

              <h2 className="mt-3 font-semibold text-sm">Posibles Consecuencias:</h2>
              <div className="p-1">
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-800">
                {
                  report.impacts.map((impact) => (
                  <li key={impact.id} className="flex items-center justify-between group">
                    {impact.description}
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => updateImpact(impact)}
                        className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                      >
                        <Pencil size={16} />
                      </button>
                      <button 
                        onClick={() => deleteImpact(impact)}
                        className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </li>))
                }
                </ul>
                <Button size="icon" className="h-8 w-8 rounded-full" onClick={() => setIsImpactDialogOpen(true)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <h2 className="mt-3 font-semibold text-sm">Acciones Correctivas Sugeridas:</h2>
              <div className="p-1">
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-800">
                {
                  report.suggestedFixes.map((fix) => (
                  <li key={fix.id} className="flex items-center justify-between">
                    <span>{fix.description}</span>
                  </li>
                ))
                }
                </ul>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">

        </CardContent>

        <CardFooter className="p-4 pt-2 flex justify-between">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <MessageCircle className="mr-2 h-4 w-4" />
            <span>{report.replies}</span>
          </Button>

          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <ThumbsUp className="mr-2 h-4 w-4" />
            <span>{report.likes}</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Share className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      <ScReportNewImpact
        report={report}
        open={isImpactDialogOpen}
        onOpenChange={setIsImpactDialogOpen}
        onSubmit={updateHandler}/>

      
    </>
  );
}
