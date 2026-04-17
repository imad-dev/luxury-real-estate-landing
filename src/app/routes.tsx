import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import HomePage from './pages/HomePage';
import PropertyListingPage from './pages/PropertyListingPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: 'properties', Component: PropertyListingPage },
      { path: 'property/:id', Component: PropertyDetailPage },
      { path: '*', Component: NotFound }
    ]
  }
]);
