'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const AI_MODELS = [
  { id: 'openai/gpt-4o', name: 'GPT-4o', icon: '◉' },
  { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', icon: '◈' },
  { id: 'mistralai/mistral-7b-instruct', name: 'Mistral 7B', icon: '◊' },
  { id: 'cohere/command-r-plus', name: 'Command R+', icon: '◎' },
];

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || !selectedModel) return;

    const userMessage: Message = { role: 'user', content: prompt };
    setMessages(prev => [...prev, userMessage]);
    setShowWelcome(false);
    setIsLoading(true);
    setPrompt('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt, model: selectedModel }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate response');
      }

      const assistantMessage: Message = { role: 'assistant', content: data.content };
      setMessages(prev => [...prev, assistantMessage]);
      setGeneratedCode(data.content);
    } catch (error) {
      const errorMessage: Message = { 
        role: 'assistant', 
        content: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}` 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const updatePreview = () => {
      if (iframeRef.current && generatedCode) {
        const iframe = iframeRef.current;
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (doc) {
          doc.open();
          doc.write(generatedCode);
          doc.close();
        }
      }
    };

    updatePreview();
  }, [generatedCode]);

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Left Panel - Code Editor */}
      <div className="w-1/3 border-r border-white/10 flex flex-col">
        <div className="glass-subtle border-b border-white/10 px-4 py-3 flex items-center justify-between">
          <h2 className="text-sm font-medium text-silver">Generated Code</h2>
          {generatedCode && (
            <Button onClick={copyCode} size="sm" variant="ghost" className="text-xs">
              Copy Code
            </Button>
          )}
        </div>
        <div className="flex-1 overflow-hidden">
          {generatedCode ? (
            <pre className="h-full overflow-auto p-4 text-xs font-mono text-silver bg-black/20">
              <code>{generatedCode}</code>
            </pre>
          ) : (
            <div className="h-full flex items-center justify-center text-silver-dark">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full glass-subtle flex items-center justify-center">
                  <span className="text-2xl">◊</span>
                </div>
                <p className="text-sm">Your code will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center Panel - Preview */}
      <div className="flex-1 flex flex-col">
        <div className="glass-subtle border-b border-white/10 px-4 py-3">
          <h2 className="text-sm font-medium text-silver">Preview</h2>
        </div>
        <div className="flex-1 bg-white">
          {generatedCode ? (
            <iframe
              ref={iframeRef}
              className="w-full h-full border-0"
              title="Game Preview"
              sandbox="allow-scripts allow-same-origin"
            />
          ) : (
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="text-center text-gray-400">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-3xl text-gray-300">⚡</span>
                </div>
                <p className="text-lg font-light">Your preview will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Chat */}
      <div className="w-1/3 border-l border-white/10 flex flex-col">
        <div className="glass-subtle border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <h2 className="text-sm font-medium text-silver">Vern AI</h2>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {showWelcome && (
            <div className="glass rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full glass-subtle flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">◈</span>
                </div>
                <div>
                  <p className="text-sm text-silver mb-2">
                    Hi! I&apos;m Vern, your AI game builder. I can help you create interactive games using HTML, CSS, and JavaScript.
                  </p>
                  <p className="text-xs text-silver-dark">
                    Try asking me to create a Snake game, Tetris, or any other game you have in mind!
                  </p>
                </div>
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'user' ? 'bg-blue-500/20' : 'glass-subtle'
              }`}>
                <span className="text-sm">{message.role === 'user' ? '◉' : '◈'}</span>
              </div>
              <div className={`glass rounded-2xl p-3 max-w-[80%] ${message.role === 'user' ? 'bg-blue-500/10' : ''}`}>
                <p className="text-sm text-silver whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full glass-subtle flex items-center justify-center flex-shrink-0">
                <span className="text-sm">◈</span>
              </div>
              <div className="glass rounded-2xl p-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-silver rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-silver rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-silver rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  <span className="text-xs text-silver-dark ml-2">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-white/10 p-4">
          <div className="space-y-3">
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose Model" />
              </SelectTrigger>
              <SelectContent>
                {AI_MODELS.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    <span className="flex items-center gap-2">
                      <span className="text-silver-dark">{model.icon}</span>
                      {model.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="glass rounded-xl p-3">
              <Textarea
                placeholder="Create a Snake game with neon graphics..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[80px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
              />
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-silver-dark">
                  Press Enter to send, Shift+Enter for new line
                </span>
                <Button
                  onClick={handleGenerate}
                  disabled={isLoading || !prompt.trim() || !selectedModel}
                  size="sm"
                  className="px-4"
                >
                  {isLoading ? 'Creating...' : 'Send'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}