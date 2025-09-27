import { Plus } from "lucide-react";

export default function Card({ num , title, k = false, isLast = false }: { num: string, title: string, k: boolean, isLast: boolean }) {
  return (
    <div className={`text-center py-3 px-4 my-2 ${!isLast ? 'border-e-[1px] border-e-primary' : ''}`}>
      <p className="flex  justify-center  items-center flex-row-reverse text-primary mb-3 font-semibold">
        <span className="text-5xl">{num}</span>
        {k && <span className="text-4xl mt-[4.9px]">K</span>}
        <span className="me-3 mt-[6.9px]">
          <Plus size={24} />
        </span>
      </p>
      <p className="text-xs text-gray-600">{title}</p>
    </div>
  );
}
