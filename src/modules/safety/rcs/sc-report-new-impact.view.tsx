import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScReport } from "./sc-report.type";
import { usePost } from "@/hooks/fetch/fetch.hook";

const scReportImpactSchema = z.object({
  description: z.string().min(16),
});

interface ScReportNewImpactProps {
  report: ScReport;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (report: Omit<ScReport, "id">) => void;
}

export function ScReportNewImpact({ report, open, onOpenChange, onSubmit }: ScReportNewImpactProps) {
  const form = useForm({
    resolver: zodResolver(scReportImpactSchema),
    defaultValues: {
      description: "",
    },
  });
  const onCompleted = (data: ScReport) => {
    onOpenChange(false);
    form.reset();
    onSubmit(data);
  }
  const { call: post } = usePost('/screports/impacts', { onCompleted });

  const handleSubmit = (data: { description: string }) => post({ body: { substandardConditionReportId: report.id, ...data} })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar posible consecuencia</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <Input
            placeholder="Describe la posible consecuencia de la condición subestandar encontrada"
            type="text"
            {...form.register("description")}
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={!form.formState.isValid}>
              Agregar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
