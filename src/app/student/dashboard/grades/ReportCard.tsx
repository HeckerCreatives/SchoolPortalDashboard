import React from 'react'

export default function ReportCard() {
  return (
    <div className="p-6">
    {/* Header */}
    <h2 className="text-center text-lg font-semibold mb-6">PERIODIC RATING</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Column */}
      <div>
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">LEARNING AREAS</th>
              <th className="border border-gray-300 p-2">1</th>
              <th className="border border-gray-300 p-2">2</th>
              <th className="border border-gray-300 p-2">3</th>
              <th className="border border-gray-300 p-2">4</th>
              <th className="border border-gray-300 p-2">FINAL RATING</th>
            </tr>
          </thead>
          <tbody>
            {[
              'Filipino',
              'English',
              'Mathematics',
              'Science and Health',
              'HEKASI',
              'EPP',
              'MSEP',
              'Character Education',
            ].map((subject, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2 font-semibold">
                  {subject}
                </td>
                {[...Array(5)].map((_, i) => (
                  <td key={i} className="border border-gray-300 p-2"></td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">AVERAGE</td>
              {[...Array(5)].map((_, i) => (
                <td key={i} className="border border-gray-300 p-2"></td>
              ))}
            </tr>
          </tbody>
        </table>

        {/* Attendance Record */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">ATTENDANCE RECORD</h3>
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">MONTH</th>
                {[
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sept',
                  'Oct',
                  'Nov',
                  'Dec',
                  'Jan',
                  'Feb',
                  'Mar',
                  'Apr',
                  'Total',
                ].map((month, index) => (
                  <th key={index} className="border border-gray-300 p-2">
                    {month}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {['School Days', 'Days Present', 'Times Tardy'].map((row, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2 font-semibold">
                    {row}
                  </td>
                  {[...Array(12)].map((_, i) => (
                    <td key={i} className="border border-gray-300 p-2"></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Column */}
      <div>
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">CHARACTER TRAITS</th>
              <th className="border border-gray-300 p-2">1</th>
              <th className="border border-gray-300 p-2">2</th>
              <th className="border border-gray-300 p-2">3</th>
              <th className="border border-gray-300 p-2">4</th>
              <th className="border border-gray-300 p-2">Ave</th>
            </tr>
          </thead>
          <tbody>
            {[
              'Honesty',
              'Courtesy',
              'Helpfulness and Cooperation',
              'Resourcefulness and Creativity',
              'Consideration for Others',
              'Sportsmanship',
              'Obedience',
              'Self-Reliance',
              'Industry',
              'Cleanliness and Orderliness',
              'Promptness and Punctuality',
              'Sense of Responsibility',
              'Love of God',
              'Patriotism/Love of Country',
            ].map((trait, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2 font-semibold">
                  {trait}
                </td>
                {[...Array(5)].map((_, i) => (
                  <td key={i} className="border border-gray-300 p-2"></td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">Average</td>
              {[...Array(5)].map((_, i) => (
                <td key={i} className="border border-gray-300 p-2"></td>
              ))}
            </tr>
          </tbody>
        </table>

        {/* Guide for Rating */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Guide for Rating</h3>
          <ul className="list-disc ml-6 text-sm">
            <li>A - Outstanding</li>
            <li>B - Very Good</li>
            <li>C - Good</li>
            <li>D - Fair</li>
            <li>E - Poor</li>
          </ul>
        </div>
      </div>
    </div>
      </div>
  )
}
