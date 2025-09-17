import Link from "next/link";

export default function Landing_Hero({
  mainText,
  textOne,
  textTwo,
  linkOne,
  linkTwo,
}) {
  return (
    <div className="text-white mt-10">
      <h3 className="leading-tight text-center text-4xl lg:text-5xl font-semibold mb-7 ">
        {mainText}
      </h3>
      <div className="flex items-center gap-x-4">
        <Link href={linkOne}>{textOne}</Link>
        <p>|</p>
        <Link href={linkTwo}>{textTwo}</Link>
      </div>
    </div>
  );
}
