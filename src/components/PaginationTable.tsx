import { Pagination } from '@nextui-org/react';

type Props = {
  numberOfPages: number;
  onChangePage: (p: number) => void;
};

function PaginationTable({ numberOfPages, onChangePage }: Props) {
  return numberOfPages > 1 ? (
    <div className="my-1 flex justify-center gap-x-2">
      <Pagination
        showShadow
        isCompact
        showControls
        color="secondary"
        total={numberOfPages}
        onChange={(p) => onChangePage(p - 1)}
      />
    </div>
  ) : null;
}
export default PaginationTable;
