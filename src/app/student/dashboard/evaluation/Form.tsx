'use client'
import { useState } from "react";

export const EvaluationForm = () => {
  const [formData, setFormData] = useState({
    question1: 0,
  question2: 0,
    question3: 0,
    question4: 0,
    question5: 0,
    question6: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: Number(value),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 w-full max-w-lg text-xs"
      >
        <h1 className="text-lg font-bold text-gray-700 mb-4">Evaluation Form</h1>

        {/* Question 1 */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">
            Question 1: How satisfied are you with the product?
          </label>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={`q1-${value}`} className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="question1"
                  value={value}
                  checked={formData.question1 === value}
                  onChange={handleChange}
                  className="form-radio text-blue-600 focus:ring focus:ring-blue-300"
                />
                <span>{value}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Question 2 */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">
            Question 2: How likely are you to recommend this product to others?
          </label>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={`q2-${value}`} className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="question2"
                  value={value}
                  checked={formData.question2 === value}
                  onChange={handleChange}
                  className="form-radio text-blue-600 focus:ring focus:ring-blue-300"
                />
                <span>{value}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Question 3 */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">
            Question 3: How would you rate our customer service?
          </label>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={`q3-${value}`} className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="question3"
                  value={value}
                  checked={formData.question3 === value}
                  onChange={handleChange}
                  className="form-radio text-blue-600 focus:ring focus:ring-blue-300"
                />
                <span>{value}</span>
              </label>
            ))}
          </div>
        </div>

         {/* Question 4 */}
         <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">
            Question 1: How satisfied are you with the product?
          </label>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={`q4-${value}`} className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="question4"
                  value={value}
                  checked={formData.question4 === value}
                  onChange={handleChange}
                  className="form-radio text-blue-600 focus:ring focus:ring-blue-300"
                />
                <span>{value}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Question 5 */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">
            Question 2: How likely are you to recommend this product to others?
          </label>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={`q5-${value}`} className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="question5"
                  value={value}
                  checked={formData.question5 === value}
                  onChange={handleChange}
                  className="form-radio text-blue-600 focus:ring focus:ring-blue-300"
                />
                <span>{value}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Question 6 */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">
            Question 3: How would you rate our customer service?
          </label>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={`q6-${value}`} className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="question6"
                  value={value}
                  checked={formData.question6 === value}
                  onChange={handleChange}
                  className="form-radio text-blue-600 focus:ring focus:ring-blue-300"
                />
                <span>{value}</span>
              </label>
            ))}
          </div>
        </div>

      
      </form>
    </div>
  );
};

export default EvaluationForm;
