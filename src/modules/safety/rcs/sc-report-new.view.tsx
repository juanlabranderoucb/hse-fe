import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ScReport } from "./sc-report.type";
import { usePost } from "@/hooks/fetch/fetch.hook";

const scReportSchema = z.object({
  description: z.string().min(1).max(280),
});

interface ScReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (report: Omit<ScReport, "id">) => void;
}

export function ScReportNew({ open, onOpenChange, onSubmit }: ScReportDialogProps) {
  const form = useForm({
    resolver: zodResolver(scReportSchema),
    defaultValues: {
      description: "",
    },
  });
  const onCompleted = (data: ScReport) => {
    onOpenChange(false);
    form.reset();
    onSubmit(data);
  }
  const { call: post } = usePost('/screports', { onCompleted });

  const handleSubmit = (data: { description: string }) => post({ body: data })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Crear nuevo reporte</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <Textarea
            placeholder="Describe la condición subestandar encontrada"
            className="min-h-[100px]"
            {...form.register("description")}
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={!form.formState.isValid}>
              Reportar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}