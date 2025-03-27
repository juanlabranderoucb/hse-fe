import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ScReportImpact } from "./sc-report.type";
import { useDelete } from "@/hooks/fetch/fetch.hook";


interface ScReportUpdateImpactProps {
  impact: ScReportImpact;
  open: boolean;
  onClose: () => void;
  onSubmit: (report: Omit<ScReportImpact, "id">) => void;
}

export function ScReportDeleteImpact({ impact, open, onClose, onSubmit }: ScReportUpdateImpactProps) {
  const form = useForm({});
  const onCompleted = (data: ScReportImpact) => {
    onClose();
    form.reset();
    onSubmit(data);
  }
  const { call: del } = useDelete(`/screports/impacts/${impact.id}`, { onCompleted });
  const handleSubmit = () => del()

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Eliminar posible consecuencia</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <p>¿Desea eliminar "{impact.description}"?</p>
          <div className="flex justify-end ">
            <Button className="bg-red-500" type="submit" disabled={!form.formState.isValid}>
              Eliminar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
