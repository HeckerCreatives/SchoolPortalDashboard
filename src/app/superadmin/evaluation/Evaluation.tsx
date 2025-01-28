'use client';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';

export const TeacherEvaluation = () => {
  const [evaluationData, setEvaluationData] = useState<
    Array<{
      category: string;
      weightage: number;
      subCategory?: string;
      questions: Array<{ id: string; text: string }>;
    }>
  >([]);
  const [newCategory, setNewCategory] = useState<string>('');
  const [newWeightage, setNewWeightage] = useState<number>(0);
  const [newQuestion, setNewQuestion] = useState<string>('');

  const addCategory = () => {
    if (newCategory && newWeightage > 0) {
      setEvaluationData((prev) => [
        ...prev,
        {
          category: newCategory,
          weightage: newWeightage / 100, // Convert percentage to decimal
          questions: [],
        },
      ]);
      setNewCategory('');
      setNewWeightage(0);
    }
  };

  const addQuestion = (categoryIndex: number) => {
    if (newQuestion) {
      setEvaluationData((prev) =>
        prev.map((section, index) =>
          index === categoryIndex
            ? {
                ...section,
                questions: [
                  ...section.questions,
                  { id: `${categoryIndex}-${section.questions.length + 1}`, text: newQuestion },
                ],
              }
            : section
        )
      );
      setNewQuestion('');
    }
  };

  return (
    <div className="w-full h-full p-4 text-xs">
      {/* Add Category Section */}
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Add Category</h2>
        <div className="flex items-end gap-2">

            <div className=' flex flex-col'>
                <label htmlFor="">Category Description</label>
                <input
                    type="text"
                    placeholder="Category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-[350px]"
                />
            </div>

            <div className=' flex flex-col'>
                <label htmlFor="">Weighted Percentage</label>
                <input
                    type="number"
                    placeholder="Weightage (%)"
                    value={newWeightage}
                    onChange={(e) => setNewWeightage(Number(e.target.value))}
                    className="border border-gray-300 p-2 rounded w-[150px]"
                />
            </div>
            
          
          <button
            onClick={addCategory}
            className=" action-btn h-fit"
          >
            <Plus size={12}/>Add Category
          </button>
        </div>
      </div>

      {/* Evaluation Table */}
      <table className="w-full max-w-[1240px] bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2" colSpan={2}>
              Teacher Evaluation
            </th>
          </tr>
        </thead>
        <tbody>
          {evaluationData.map((section, sectionIndex) => (
            <React.Fragment key={sectionIndex}>
              <tr>
                <td className="border border-gray-300 p-2 font-bold" colSpan={2}>
                  {section.category} ({section.weightage * 100}%)
                </td>
              </tr>
              {section.subCategory && (
                <tr>
                  <td className="border border-gray-300 p-2" colSpan={2}>
                    {section.subCategory}
                  </td>
                </tr>
              )}
              {section.questions.map((question) => (
                <tr key={question.id}>
                  <td className="border border-gray-300 p-2 pl-6">{question.text}</td>
                </tr>
              ))}
              {/* Add Question Section */}
              <tr>
                <td colSpan={2} className="p-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="New Question"
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      className="border border-gray-300 p-2 rounded"
                    />
                    <button
                      onClick={() => addQuestion(sectionIndex)}
                      className="action-btn"
                    >
                     <Plus size={12}/> Add
                    </button>
                  </div>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};