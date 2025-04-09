import Loading from './Loading';

function AdminView({ feedbacks, loading }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loading size="lg" />
      </div>
    );
  }

  if (feedbacks.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center transition-all duration-300">
        <p className="text-gray-500 dark:text-gray-400">No feedback submissions yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Submitted Feedback</h2>
      
      {feedbacks.map((feedback, index) => (
        <div 
          key={index} 
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-all duration-300"
        >
          <div className="flex justify-between mb-2">
            <h3 className="font-medium dark:text-white">{feedback.name}</h3>
            {feedback.timestamp && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(feedback.timestamp)}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{feedback.email}</p>
          <p className="text-gray-700 dark:text-gray-300 border-t dark:border-gray-700 pt-2 mt-2">
            {feedback.message}
          </p>
        </div>
      ))}
    </div>
  );
}

export default AdminView;

