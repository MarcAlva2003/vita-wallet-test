import Image from "next/image"

interface IIconComponent {
  icon: string, size?: number, className?: string
}

export const IconComponent: React.FC<IIconComponent> = (props) => {
  return (
    <Image src={props.icon} height={props.size  ?? 24} className="bg-red" width={props.size ?? 24} alt={``} />
  )
}