"use client"

import type React from "react"
import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import { Copy, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card"

interface AnswerProps {
  answer: string
}

interface CodeBlockProps {
  inline?: boolean
  className?: string
  children?: React.ReactNode
}

export default function Answer({ answer }: AnswerProps) {

  const [copiedCode, setCopiedCode] = useState<string | null>(null)


  if (!answer) {
    return (
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="p-4">
          <p className="text-gray-500">No answer yet.</p>
        </CardContent>
      </Card>
    );
  }

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(code)
      setTimeout(() => setCopiedCode(null), 2000)
    }
    catch (err) {
      console.error("Failed to copy code: ", err)
    }
  }

  const highlightCode = (code: string, language: string) => {
    const patterns = {
      javascript: [
        {
          pattern: /\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await)\b/g,
          className: "text-purple-600 font-semibold",
        },
        { pattern: /\b(true|false|null|undefined)\b/g, className: "text-blue-600" },
        { pattern: /"([^"\\]|\\.)*"/g, className: "text-green-600" },
        { pattern: /'([^'\\]|\\.)*'/g, className: "text-green-600" },
        { pattern: /\/\/.*$/gm, className: "text-gray-500 italic" },
        { pattern: /\/\*[\s\S]*?\*\//g, className: "text-gray-500 italic" },
        { pattern: /\b\d+\b/g, className: "text-orange-600" },
      ],
      python: [
        {
          pattern: /\b(def|class|import|from|return|if|elif|else|for|while|try|except|with|as|pass|break|continue)\b/g,
          className: "text-purple-600 font-semibold",
        },
        { pattern: /\b(True|False|None)\b/g, className: "text-blue-600" },
        { pattern: /"([^"\\]|\\.)*"/g, className: "text-green-600" },
        { pattern: /'([^'\\]|\\.)*'/g, className: "text-green-600" },
        { pattern: /#.*$/gm, className: "text-gray-500 italic" },
        { pattern: /\b\d+\b/g, className: "text-orange-600" },
      ],
      html: [
        { pattern: /&lt;\/?\w+[^&gt;]*&gt;/g, className: "text-blue-600" },
        { pattern: /\w+=/g, className: "text-purple-600" },
        { pattern: /"([^"\\]|\\.)*"/g, className: "text-green-600" },
        { pattern: /&lt;!--[\s\S]*?--&gt;/g, className: "text-gray-500 italic" },
      ],
      css: [
        { pattern: /[.#]?[\w-]+(?=\s*{)/g, className: "text-blue-600" },
        { pattern: /[\w-]+(?=\s*:)/g, className: "text-purple-600" },
        { pattern: /"([^"\\]|\\.)*"/g, className: "text-green-600" },
        { pattern: /'([^'\\]|\\.)*'/g, className: "text-green-600" },
        { pattern: /\/\*[\s\S]*?\*\//g, className: "text-gray-500 italic" },
      ],
    }

    const langPatterns = patterns[language as keyof typeof patterns] || patterns.javascript
    let highlightedCode = code

    highlightedCode = highlightedCode.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

    langPatterns.forEach(({ pattern, className }) => {
      highlightedCode = highlightedCode.replace(pattern, (match) => `<span class="${className}">${match}</span>`)
    })

    return highlightedCode
  }

  const CodeBlock = ({ inline, className, children, ...props }: CodeBlockProps) => {
    const match = /language-(\w+)/.exec(className || "")
    const language = match ? match[1] : "text"
    const codeString = String(children).replace(/\n$/, "")

    if (!inline && codeString.length > 0) {
      const highlightedCode = highlightCode(codeString, language)

      return (
        <div className="relative group my-4">
          <div className="flex items-center justify-between bg-gray-100 px-4 rounded-t-lg border-b border-gray-200">
            <span className="text-sm font-medium text-gray-600 capitalize">
              {language}
            </span>
            <Button variant="ghost" size="sm" onClick={() => copyCode(codeString)} className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0">
              {copiedCode === codeString ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-gray-500" />
              )}
            </Button>
          </div>
          <pre className="bg-gray-50 p-4 rounded-b-lg overflow-x-auto border border-gray-200 border-t-0">
            <code className="text-sm leading-relaxed font-mono" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
          </pre>
        </div>
      )
    }

    return (
      <code className="bg-gray-100 text-red-600 px-2 py-1 rounded text-sm font-mono" {...props}>
        {children}
      </code>
    )
  }



  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <div className="prose prose-gray max-w-none">
          <ReactMarkdown
            components={{
              // Headings
              h1: ({ children, ...props }) => (
                <h1
                  className="text-2xl font-bold text-gray-900 mb-4 mt-6 first:mt-0 pb-2 border-b border-gray-200"
                  {...props}
                >
                  {children}
                </h1>
              ),
              h2: ({ children, ...props }) => (
                <h2 className="text-xl font-bold text-gray-900 mb-3 mt-6 first:mt-0" {...props}>
                  {children}
                </h2>
              ),
              h3: ({ children, ...props }) => (
                <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-5 first:mt-0" {...props}>
                  {children}
                </h3>
              ),
              h4: ({ children, ...props }) => (
                <h4 className="text-base font-semibold text-gray-900 mb-2 mt-4 first:mt-0" {...props}>
                  {children}
                </h4>
              ),

              // Paragraphs
              p: ({ children, ...props }) => (
                <p className="text-gray-700 leading-relaxed mb-4 last:mb-0" {...props}>
                  {children}
                </p>
              ),

              // Lists
              ul: ({ children, ...props }) => (
                <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700" {...props}>
                  {children}
                </ul>
              ),
              ol: ({ children, ...props }) => (
                <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700" {...props}>
                  {children}
                </ol>
              ),
              li: ({ children, ...props }) => (
                <li className="text-gray-700 leading-relaxed" {...props}>
                  {children}
                </li>
              ),

              // Links
              a: ({ children, href, ...props }) => (
                <a
                  href={href}
                  className="text-blue-600 hover:text-blue-800 underline decoration-blue-600/30 hover:decoration-blue-800/50 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                >
                  {children}
                </a>
              ),

              // Emphasis
              strong: ({ children, ...props }) => (
                <strong className="font-semibold text-gray-900" {...props}>
                  {children}
                </strong>
              ),
              em: ({ children, ...props }) => (
                <em className="italic text-gray-700" {...props}>
                  {children}
                </em>
              ),

              // Blockquotes
              blockquote: ({ children, ...props }) => (
                <blockquote
                  className="border-l-4 border-blue-200 pl-4 py-2 my-4 bg-blue-50 text-gray-700 italic"
                  {...props}
                >
                  {children}
                </blockquote>
              ),

              // Tables
              table: ({ children, ...props }) => (
                <div className="overflow-x-auto my-4">
                  <table className="min-w-full border border-gray-200 rounded-lg" {...props}>
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children, ...props }) => (
                <thead className="bg-gray-50" {...props}>
                  {children}
                </thead>
              ),
              tbody: ({ children, ...props }) => (
                <tbody className="divide-y divide-gray-200" {...props}>
                  {children}
                </tbody>
              ),
              tr: ({ children, ...props }) => (
                <tr className="hover:bg-gray-50" {...props}>
                  {children}
                </tr>
              ),
              th: ({ children, ...props }) => (
                <th
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-200"
                  {...props}
                >
                  {children}
                </th>
              ),
              td: ({ children, ...props }) => (
                <td className="px-4 py-3 text-sm text-gray-700" {...props}>
                  {children}
                </td>
              ),

              // Horizontal rule
              hr: ({ ...props }) => <hr className="my-6 border-t border-gray-200" {...props} />,

              // Code blocks and inline code
              code: CodeBlock,
              pre: ({ children, ...props }) => <div {...props}>{children}</div>,
            }}
          >
            {answer}
          </ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  );
}
