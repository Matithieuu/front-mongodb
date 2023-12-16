import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import Landing from './pages/landing';
import Modify from './pages/modify';
import AddCustomer from './pages/add';
import Page404 from './pages/notFound';
import Search from './pages/searchList';
import CustomerDetails from './pages/customerDetails';
import Layout from './layout/layout';

function App() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout >
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/modify" element={<Modify />} />
          <Route path="/add" element={<AddCustomer />} />
          <Route path="/search/*" element={<Search />} />
          <Route path="/customer/*" element={<CustomerDetails />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Layout>
    </Suspense>
  )
}

export default App
