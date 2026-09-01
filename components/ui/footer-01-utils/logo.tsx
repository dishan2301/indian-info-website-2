import Image from "next/image"

export default function Logo() {
  return (
    <Image
      src="/indian-infotech-logo.png"
      alt="Indian Infotech"
      width={1030}
      height={242}
      className="h-auto w-[230px] max-w-full"
    />
  )
}
