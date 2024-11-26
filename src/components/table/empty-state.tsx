interface Props {
  title?: string;
  description?: string;
}

export const EmptyState = ({
  title = 'Oops! Nothing to show',
  description = 'There are no results to display.',
}: Props) => {
  return (
    <div className="flex flex-col justify-center items-center h-[600px] w-[100%]">
      <div className="font-inter font-[600] text-[144px] leading-[208.8px]">👀</div>
      <div className="flex flex-col gap-1 max-w-[342px] items-center">
        <div className="text-center font-inter font-[600] text-[24px] leading-[34.8px] text-[#D1D1D6]">
          {title}
        </div>
        <div className="text-center font-[400] text-base text-[#8E8E93]">{description}</div>
      </div>
    </div>
  );
};
