export default function Cite({ n, references = [] }) {
  if (!n) return null;
  
  // Handle comma-separated values like "1,2,3"
  const nums = typeof n === 'string' && n.includes(',')
    ? n.split(',').map(s => parseInt(s.trim(), 10))
    : [parseInt(n, 10)];
  
  // Filter out NaN values
  const validNums = nums.filter(num => !isNaN(num));
  
  if (validNums.length === 0) return null;
  
  return (
    <>
      {validNums.map((num, idx) => (
        <span key={num}>
          <a 
            href={`#ref-${num}`}
            className="text-blue-400 hover:text-blue-300 text-xs align-super no-underline"
            title={references[num - 1]?.label || `Reference ${num}`}
          >
            [{num}]
          </a>
          {idx < validNums.length - 1 && <span className="text-white/40">, </span>}
        </span>
      ))}
    </>
  );
}
