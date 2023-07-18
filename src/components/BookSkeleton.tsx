import { Skeleton } from "antd";

const BookSkeleton = () => {
  return (
    <div className="p-3 rounded-md bg-slate-50 relative flex gap-3 max-h-fit w-full">
      <Skeleton.Image
        className="w-32 min-h-full object-cover rounded-md"
        active
      />
      <div className="rounded-md flex flex-col gap-2 w-fit relative leading-5 whitespace-nowrap">
        <Skeleton.Input active size="small" />
        <Skeleton.Input active size="small" />
        <Skeleton.Input active size="small" />
        <Skeleton.Input active size="small" />
      </div>
    </div>
  );
};

export default BookSkeleton;
