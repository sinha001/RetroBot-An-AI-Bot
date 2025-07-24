"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Menu, X, Clock, Copy, Trash2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AnswerComponent from "./components/Answer"
import { URL } from "./custom"


interface Message {
  type: "q" | "a"
  text: string
  timestamp: Date
  id: string
}

export default function App() {
  const [question, setQuestion] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [history, setHistory] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedHistory = localStorage.getItem("retrobot-history")
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const askQuestion = async () => {
    if (!question.trim() || isLoading) return

    setIsLoading(true)
    const userMessage: Message = {
      type: "q",
      text: question,
      timestamp: new Date(),
      id: Date.now().toString(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Update history
    const newHistory = [question, ...history.slice(0, 19)]
    setHistory(newHistory)
    localStorage.setItem("retrobot-history", JSON.stringify(newHistory))

    try {
      const payload = {
        contents: [{ parts: [{ text: question }] }],
      }

      const res = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      const answer = data.candidates[0].content.parts[0].text

      const aiMessage: Message = {
        type: "a",
        text: answer,
        timestamp: new Date(),
        id: (Date.now() + 1).toString(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      const errorMessage: Message = {
        type: "a",
        text: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
        id: (Date.now() + 1).toString(),
      }
      setMessages((prev) => [...prev, errorMessage])
    }

    setQuestion("")
    setIsLoading(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      askQuestion()
    }
  }

  const clearChat = () => {
    setMessages([])
  }

  const copyMessage = async (text: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedMessageId(messageId)
      setTimeout(() => setCopiedMessageId(null), 2000)
    } catch (error) {
      console.error("Failed to copy text:", error)
    }
  }

  const selectHistoryItem = (item: string) => {
    setQuestion(item)
    setShowHistory(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Sidebar */}
      <div
        className={`${showHistory ? "w-80" : "w-0"} transition-all duration-300 overflow-hidden bg-white border-r border-gray-200 shadow-sm`}
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Chat History</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowHistory(false)} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-4 space-y-2">
            {history.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-8">No conversations yet</p>
            ) : (
              history.map((item, index) => (
                <div
                  key={index}
                  onClick={() => selectHistoryItem(item)}
                  className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-transparent hover:border-gray-200"
                >
                  <p className="text-sm text-gray-700 truncate">
                    {item.length > 50 ? `${item.substring(0, 50)}...` : item}
                  </p>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setShowHistory(!showHistory)} className="h-10 w-10 p-0">
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">RetroBot</h1>
                  <p className="text-sm text-gray-500">AI Assistant</p>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={clearChat}
              className="text-gray-600 hover:text-red-600 bg-transparent"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <Bot className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">How can I help you today?</h2>
                  <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                    I'm here to assist you with any questions or tasks you might have.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto">
                    {[
                      "What can you help me with?",
                      "Explain a complex topic",
                      "Help me write some code",
                      "Brainstorm ideas",
                    ].map((prompt, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 hover:border-gray-300 transition-all duration-200"
                        onClick={() => setQuestion(prompt)}
                      >
                        {prompt}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-4 ${message.type === "q" ? "justify-end" : "justify-start"}`}
                  >
                    {message.type === "a" && (
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}

                    <div className={`max-w-[85%] group ${message.type === "q" ? "order-1" : ""}`}>
                      {message.type === "q" ? (
                        <Card className="bg-blue-500 text-white border-blue-500 shadow-sm">
                          <CardContent className="p-4">
                            <p className="text-sm leading-relaxed">{message.text}</p>
                          </CardContent>
                        </Card>
                      ) : (
                        <AnswerComponent answer={message.text} />
                      )}

                      <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyMessage(message.text, message.id)}
                          className="text-gray-400 hover:text-gray-600 h-6 px-2"
                        >
                          {copiedMessageId === message.id ? (
                            <Check className="w-3 h-3 text-green-500" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>

                    {message.type === "q" && (
                      <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                    )}
                  </div>
                ))
              )}

              {isLoading && (
                <div className="flex gap-4 justify-start">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <Card className="shadow-sm border border-gray-200 bg-white">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        </div>
                        <span className="text-sm text-gray-500">Thinking...</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="bg-white border-t border-gray-200 p-6 shadow-sm">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <Input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message here..."
                  className="flex-1 bg-transparent border-0 text-gray-900 placeholder:text-gray-500 focus-visible:ring-0 text-base px-4 py-3"
                  disabled={isLoading}
                />
                <Button
                  onClick={askQuestion}
                  disabled={!question.trim() || isLoading}
                  className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Send className="w-5 h-5 text-white" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center">
                Press <kbd className="px-2 py-1 bg-gray-200 rounded text-gray-600 font-mono">Enter</kbd> to send
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
