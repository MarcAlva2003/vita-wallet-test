import Image from "next/image"

interface IIconComponent {
  icon: string, size?: number
}

export const IconComponent: React.FC<IIconComponent> = (props) => {
  return (
    <Image src={props.icon} height={props.size  ?? 24} width={props.size ?? 24} alt={``} />
  )
}