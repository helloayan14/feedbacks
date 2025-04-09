

import { useState, useEffect } from 'react';
import FeedbackForm from './components/FeedbackForm';
import AdminView from './components/AdminView';
import ThemeToggle from './components/ThemeToggle';
import Footer from './components/Footer';
import { useTheme } from './hooks/useTheme';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const fetchFeedbacks = async () => {
    if (showAdmin) {
      setLoading(true);
      try {
        const response = await fetch('/.netlify/functions/get-feedbacks');
        const data = await response.json();
        setFeedbacks(data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [showAdmin]);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-8 max-w-lg">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Feedback Collector</h1>
          <ThemeToggle />
        </header>

        <main>
          <button
            onClick={() => setShowAdmin(!showAdmin)}
            className={`mb-6 px-4 py-2 rounded-md ${
              theme === 'dark' 
                ? 'bg-indigo-600 hover:bg-indigo-700' 
                : 'bg-indigo-500 hover:bg-indigo-600'
            } text-white transition-colors duration-300`}
          >
            {showAdmin ? '← Back to Form' : 'View Submitted Feedback'}
          </button>

          {showAdmin ? (
            <AdminView feedbacks={feedbacks} loading={loading} />
          ) : (
            <FeedbackForm onSuccess={fetchFeedbacks} />
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
