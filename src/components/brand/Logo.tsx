import Image from "next/image";

export default function Logo({
  width = 140,
  className = "",
}: {
  width?: number;
  className?: string;
}) {
  return (
    <Image
      src="/logo-transparent.png"
      alt="MietGate"
      width={width}
      height={50}
      className={`object-contain ${className}`}
      priority
    />
  );
}


