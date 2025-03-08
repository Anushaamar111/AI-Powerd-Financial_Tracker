import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { DollarSign, PiggyBank, Brain } from "lucide-react";
import { ClipLoader } from "react-spinners";

const AISuggestion = () => {
  const [income, setIncome] = useState("");
  const [budget, setBudget] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [totalSpending, setTotalSpending] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchSpending = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/api/expenses/total`, {
          withCredentials: true,
        });
        setTotalSpending(response.data.totalSpending);
      } catch (error) {
        console.error("Error fetching total spending:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpending();
  }, [API_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/api/ai/suggestions`,
        { income, budget, totalSpending },
        { withCredentials: true }
      );
      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.error("Error getting suggestions:", error);
      setSuggestions("Failed to get suggestions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <h1 className="text-2xl font-bold">AI Suggestions</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className="border rounded-md text-gray-700 bg-white hover:bg-gray-50 px-4 py-2"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Income Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Monthly Income
                  </div>
                </label>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="Enter your monthly income"
                  required
                />
              </div>

              {/* Budget Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <PiggyBank className="w-4 h-4" />
                    Monthly Budget
                  </div>
                </label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="Enter your monthly budget"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <ClipLoader color="#ffffff" size={20} />
              ) : (
                <Brain className="w-5 h-5" />
              )}
              Get AI Suggestions
            </button>
          </form>
        </div>

        {/* AI Suggestions Output */}
        {suggestions && (
          <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-600" />
              AI Suggestions
            </h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="whitespace-pre-wrap font-sans text-gray-700">
                {suggestions}
              </pre>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AISuggestion;
