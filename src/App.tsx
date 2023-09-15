import Form from './components/Form';
import BasicTable from './components/BasicTable';

function App() {
  return (
    <main className="container mx-auto py-12">
      <h1 className="mb-8 text-center text-2xl font-semibold text-teal-600">
        Next UI, Tanstack React Table and more..
      </h1>
      <div className="mx-auto w-full lg:w-4/5 xl:w-2/3">
        <Form />
        <BasicTable />
      </div>
    </main>
  );
}

export default App;
