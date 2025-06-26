const headers = ['Players', 'Result', 'Rounds', 'Score', 'Date', 'Status']

export default function GameTableHeader() {
  return (
    <thead>
      <tr className="bg-gray-50 border-b">
        {headers.map(header => (
          <th
            key={header}
            className="text-left py-3 px-4 font-semibold text-gray-700"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  )
}
