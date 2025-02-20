import { Skeleton } from '../UI/skeleton/skeleton.component'

export const TransactionItemSkeleton = () => {
  return (
    <div className="w-full flex items-center justify-between py-5 border-b border-solid border-gray-1">
      <div>
        <Skeleton width={120} height={24} />
      </div>
      <div>
        <Skeleton width={100} height={24} />
      </div>
    </div>
  )
}
