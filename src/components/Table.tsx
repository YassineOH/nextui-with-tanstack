import { useAppContext } from '../hooks/context';

function Table() {
  const { state } = useAppContext()!;
  return <div>{JSON.stringify(state.users)}</div>;
}
export default Table;
