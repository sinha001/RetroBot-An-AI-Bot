import ReactMarkdown from 'react-markdown';

export default function Answer({ answer }) {
  if (!answer) return <p className="text-gray-500">No answer yet.</p>;

  return (
    <div className="prose w-fit text-left overflow-auto text-gray-900 bg-white p-4 rounded shadow-md border border-black rounded-tl-3xl rounded-tr-3xl rounded-br-3xl">
      <ReactMarkdown
        components={{
          h3: ({ node, ...props }) => (
            <h3
              className="font-semibold italic mb-2 mt-4 text-indigo-700 text-lg"
              {...props}
            />
          ),
          ul: ({ node, ...props }) => (
            <ul
              className="list-disc list-inside mb-4 text-gray-700"
              {...props}
            />
          ),
          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          p: ({ node, ...props }) => <p className="mb-3" {...props} />,
          em: ({ node, ...props }) => (
            <em className="italic text-gray-700" {...props} />
          ),
          strong: ({ node, ...props }) => <strong {...props} />,
          code: ({ node, inline, className, children, ...props }) => (
            <code
              className={`bg-gray-100 p-1 rounded font-mono text-sm ${
                inline ? '' : 'block my-2 overflow-x-auto'
              }`}
              {...props}
            >
              {children}
            </code>
          ),
          pre: ({ node, ...props }) => (
            <pre
              className="bg-gray-100 p-3 rounded my-3 overflow-x-auto"
              {...props}
            />
          ),
        }}
      >
        {answer}
      </ReactMarkdown>
    </div>
  );
}
