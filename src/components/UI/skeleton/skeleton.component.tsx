interface ISkeleton {
  width: string | number
  height: string | number
  rounded?: string | number
  className?: string
}

export const Skeleton: React.FC<ISkeleton> = (props) => {
  const { height, width, rounded, className } = props

  return (
    <div className={`${className} bg-gray-2 animate-pulse`}
      style={{
        height,
        width,
        borderRadius: rounded ?? '4px'
      }}
    ></div>
  )
}
