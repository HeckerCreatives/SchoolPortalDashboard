'use client'
import React, { useState } from 'react';

export const TeacherEvaluation = () => {
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});

  const handleRatingChange = (questionId: string, rating: number) => {
    setRatings((prev) => ({ ...prev, [questionId]: rating }));
  };

  const evaluationData = [
    {
      category: 'I. INSTRUCTIONAL COMPETENCE (70%)',
      weightage: 0.7,
      subCategory: 'A. Lesson Planning and Delivery (.45% for Teachers, 40% for Master Teachers)',
      questions: [
        { id: '1', text: 'Formulated-accepts objectives of lesson plan' },
        { id: '2', text: 'Selects content and prepares appropriate instructional materials/teaching aids' },
        { id: '3', text: 'Selects teaching methods/strategies' },
      ],
    },
    {
      category: 'II. TECHNICAL ASSISTANCE (For Master Teachers only - 15%)',
      weightage: 0.15,
      questions: [
        { id: '4', text: 'Provides assistance to teachers in improving their teaching competence' },
        { id: '5', text: 'Progress providing instructional materials to use' },
      ],
    },
    {
      category: 'C. LEARNER’S ACHIEVEMENT (.20% for Teachers, 10% for Master Teachers)',
      weightage: 0.1,
      questions: [
        { id: '6', text: 'Improves learners achievement level over pretest' },
      ],
    },
    {
      category: 'D. SCHOOL, HOME, AND COMMUNITY INVOLVEMENT (5%)',
      weightage: 0.05,
      questions: [
        { id: '7', text: 'Organizes and maintains functions/homeroom PTCA' },
        { id: '8', text: 'Conducts homeroom PTCA meeting to report learner’s progress' },
      ],
    },
  ];

  const calculateOverallRating = () => {
    let totalWeightedScore = 0;
  
    evaluationData.forEach((section) => {
      // Ensure there are questions in the category
      if (section.questions.length === 0) {
        console.log(`Category: ${section.category} has no questions. Skipping.`);
        return; // Skip this category if it has no questions
      }
  
      // Get ratings for all questions in this category
      const questionRatings = section.questions.map((question) => ratings[question.id] || 0);
  
      // Calculate the average rating for this category
      const averageRating =
        questionRatings.reduce((sum, rating) => sum + rating, 0) / questionRatings.length;
  
      // Calculate the weighted score for this category
      const weightedScore = averageRating * section.weightage;
  
      // Add the weighted score to the total
      totalWeightedScore += weightedScore;
  
      // Log details for debugging
      console.log(`Category: ${section.category}`);
      console.log(`Question Ratings: ${questionRatings.join(', ')}`);
      console.log(`Average Rating: ${averageRating.toFixed(2)}`);
      console.log(`Weighted Score: ${weightedScore.toFixed(2)}`);
      console.log('-----------------------------');
    });
  
    // Log and return the overall rating
    console.log(`Overall Rating: ${totalWeightedScore.toFixed(2)}`);
    return totalWeightedScore.toFixed(2); // Round to 2 decimal places
  };

  return (
    <div className="w-full h-full p-4">
      <table className="w-full max-w-[1240px] bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2" colSpan={6}>PERFORMANCE INDICATOR</th>
          </tr>
          <tr>
            <th className="border border-gray-300 p-2">Question</th>
            <th className="border border-gray-300 p-2">1</th>
            <th className="border border-gray-300 p-2">2</th>
            <th className="border border-gray-300 p-2">3</th>
            <th className="border border-gray-300 p-2">4</th>
            <th className="border border-gray-300 p-2">5</th>
          </tr>
        </thead>
        <tbody>
          {evaluationData.map((section, sectionIndex) => (
            <React.Fragment key={sectionIndex}>
              <tr>
                <td className="border border-gray-300 p-2 font-bold" colSpan={6}>{section.category}</td>
              </tr>
              {section.subCategory && (
                <tr>
                  <td className="border border-gray-300 p-2" colSpan={6}>{section.subCategory}</td>
                </tr>
              )}
              {section.questions.map((question) => (
                <tr key={question.id}>
                  <td className="border border-gray-300 p-2">{question.text}</td>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <td key={rating} className="border border-gray-300 p-2">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={rating}
                        checked={ratings[question.id] === rating}
                        onChange={() => handleRatingChange(question.id, rating)}
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <button
          onClick={() => {
            const overallRating = calculateOverallRating();
            alert(`Overall Rating: ${overallRating}`);
          }}
          className=" action-btn text-xs"
        >
          Submit Evaluation
        </button>
      </div>
    </div>
  );
};
