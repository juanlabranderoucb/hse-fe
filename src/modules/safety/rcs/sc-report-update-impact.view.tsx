import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScReportImpact } from "./sc-report.type";
import { usePut } from "@/hooks/fetch/fetch.hook";

const scReportImpactSchema = z.object({
  description: z.string().min(16),
});

interface ScReportUpdateImpactProps {
  impact: ScReportImpact;
  open: boolean;
  onClose: () => void;
  onSubmit: (report: Omit<ScReportImpact, "id">) => void;
}

export function ScReportUpdateImpact({ impact, open, onClose, onSubmit }: ScReportUpdateImpactProps) {
  const form = useForm({
    resolver: zodResolver(scReportImpactSchema),
    defaultValues: {
      description: impact.description,
    },
  });
  const onCompleted = (data: ScReportImpact) => {
    onClose();
    form.reset();
    onSubmit(data);
  }
  const { call: post } = usePut(`/screports/impacts/${impact.id}`, { onCompleted });

  const handleSubmit = (data: { description: string }) => post({ body: data })

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar posible consecuencia</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <Input
            placeholder="Describe la posible consecuencia de la condición subestandar encontrada"
            type="text"
            {...form.register("description")}
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={!form.formState.isValid}>
              Guardar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
