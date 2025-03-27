import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  MessageCircle,
  Share,
  MoreHorizontal,
  Dot,
  ThumbsUp
} from "lucide-react";
import { ScReport } from "./sc-report.type";

interface ScReportCardProps {
  report: ScReport;
}

export function ScReportCard({ report }: ScReportCardProps) {
  return (
    <Card className="max-w-xl w-full rounded-none border-x-0 border-t-0 shadow-none hover:bg-muted/50 transition-colors">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage/>
            <AvatarFallback>{report.user.userName[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center">
              <span className="font-semibold mr-1">{report.user.displayName || report.user.userName}</span>

              <span className="text-muted-foreground">@{report.user.userName}</span>
              <Dot className="text-muted-foreground h-4 w-4" />
              <span className="text-muted-foreground text-sm">{report.elapsed}</span>
            </div>
            
            <p className="mt-1 text-base">{report.description}</p>
          </div>
          
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
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
  );
}
