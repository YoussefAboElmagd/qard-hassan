import { Plus } from "lucide-react";

export default function Card({ num, title, k = false }) {
  return (
    <div className="border-e-[1px] border-e-primary text-center py-3 px-4 my-2">
      <p className="flex  justify-center  items-center flex-row-reverse text-chart-3 mb-3 font-semibold">
        <span className="text-5xl">{num}</span>
        {k && <span className="text-4xl mt-[4.9px]">k</span>}
        <span className="me-3 mt-[6.9px]">
          <Plus size={24} />
        </span>
      </p>
      <p className="text-xs text-muted-foreground">{title}</p>
    </div>
  );
}
