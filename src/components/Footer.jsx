function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
      <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400 py-4 border-t dark:border-gray-800">
        <p>© {currentYear} Feedback Collector</p>
        <p className="mt-1">Created by <span className="font-medium">Ayan Sharma</span></p>
      </footer>
    );
  }
  
  export default Footer;