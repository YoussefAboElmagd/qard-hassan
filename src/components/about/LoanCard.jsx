import Image from "next/image";

export default function LoanCard({ title, text, refe }) {
  return (
    <div className="px-5 lg:px-10 mt-5">
      <div className="mb-5 relative w-[60px] h-[60px]">
        <Image alt="title" src={refe} fill />
      </div>
      <p className="font-semibold text-xl mb-3">{title}</p>
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
