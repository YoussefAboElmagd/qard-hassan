import Link from "next/link";

interface LandingHeroProps {
  mainText: string;
  textOne: string;
  textTwo: string;
  linkOne: string;
  linkTwo: string;
}

export default function Landing_Hero({
  mainText,
  textOne,
  textTwo,
  linkOne,
  linkTwo,
}: LandingHeroProps) {
  return (
    <div className="text-white">
      <h3 className="leading-tight text-center text-4xl lg:text-5xl font-semibold mb-7 ">
        {mainText}
      </h3>
      <div className="flex items-center gap-x-4">
        <Link href={linkOne}>{textOne}</Link>
        <p>|</p>
        <Link className="font-bold text-lg" href={linkTwo}>{textTwo} </Link>
      </div>
    </div>
  );
}
