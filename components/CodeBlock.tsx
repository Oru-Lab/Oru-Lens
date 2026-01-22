import React, { useState, useEffect } from 'react';
import { Framework } from '../types';

interface CodeBlockProps {
  code: string;
  framework: Framework;
  itemName?: string;
}

// Simple highlighting function
const highlightCode = (code: string): { lines: string[]; htmlLines: string[] } => {
  const lines = code.split('\n');
  const htmlLines: string[] = [];
  
  const highlightLine = (line: string): string => {
    // Process line character by character (simpler than regex)
    let result = '';
    let inString = false;
    let stringChar = '';
    let inComment = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1] || '';
      
      // Check for comments
      if (!inString && char === '/' && nextChar === '/') {
        result += `<span class="code-comment">${line.substring(i)}</span>`;
        break;
      }
      
      // Check for string start/end
      if (char === '"' || char === "'" || char === '`') {
        if (!inString) {
          inString = true;
          stringChar = char;
          result += `<span class="code-string">${char}`;
        } else if (inString && char === stringChar) {
          // Check if escaped
          if (line[i - 1] !== '\\') {
            inString = false;
            result += `${char}</span>`;
          } else {
            result += char;
          }
        } else {
          result += char;
        }
        continue;
      }
      
      // If we're in a string, just add the character
      if (inString) {
        result += char;
        continue;
      }
      
      // Check for keywords (simplified)
      const remaining = line.substring(i);
      const keywordMatches = [
        { word: 'import', cls: 'code-keyword' },
        { word: 'from', cls: 'code-keyword' },
        { word: 'const', cls: 'code-keyword' },
        { word: 'let', cls: 'code-keyword' },
        { word: 'var', cls: 'code-keyword' },
        { word: 'return', cls: 'code-keyword' },
        { word: 'export', cls: 'code-keyword' },
        { word: 'default', cls: 'code-keyword' },
        { word: 'await', cls: 'code-keyword' },
        { word: 'async', cls: 'code-keyword' },
        { word: 'function', cls: 'code-keyword' },
        { word: 'new', cls: 'code-keyword' },
        { word: 'if', cls: 'code-keyword' },
        { word: 'else', cls: 'code-keyword' },
        { word: 'try', cls: 'code-keyword' },
        { word: 'catch', cls: 'code-keyword' },
        { word: 'ethers', cls: 'code-sdk' },
        { word: 'useReadContract', cls: 'code-sdk' },
        { word: 'useWriteContract', cls: 'code-sdk' },
        { word: 'useWatchContractEvent', cls: 'code-sdk' },
        { word: 'createPublicClient', cls: 'code-sdk' },
        { word: 'createWalletClient', cls: 'code-sdk' },
      ];
      
      let matched = false;
      for (const { word, cls } of keywordMatches) {
        if (remaining.startsWith(word) && 
            (remaining.length === word.length || !/\w/.test(remaining[word.length]))) {
          result += `<span class="${cls}">${word}</span>`;
          i += word.length - 1;
          matched = true;
          break;
        }
      }
      
      if (matched) continue;
      
      // Check for contract addresses
      const addressMatch = remaining.match(/^(0x[a-fA-F0-9]{40})/);
      if (addressMatch) {
        result += `<span class="code-address">${addressMatch[1]}</span>`;
        i += addressMatch[1].length - 1;
        continue;
      }
      
      // Default: escape and add character
      result += char
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }
    
    return result || '&nbsp;';
  };
  
  lines.forEach(line => {
    htmlLines.push(highlightLine(line));
  });
  
  return { lines, htmlLines };
};

const CodeBlock: React.FC<CodeBlockProps> = ({ code, framework, itemName }) => {
  const [copied, setCopied] = useState(false);
  const [highlightedData, setHighlightedData] = useState<{ lines: string[]; htmlLines: string[] }>({ lines: [], htmlLines: [] });

  useEffect(() => {
    setHighlightedData(highlightCode(code));
  }, [code]);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group mt-6">
      <div className="bg-[#1e1e1e] rounded-[2rem] p-6 md:p-8 border border-white/5 overflow-x-auto min-h-[160px] shadow-2xl scrollbar-hide overflow-hidden">
        <div className="flex overflow-x-auto scrollbar-hide max-w-[200px] md:max-w-full">
          {/* Line numbers */}
          <div className="select-none text-right pr-4 border-r border-white/10">
            <div className="mono text-[11px] md:text-[13px] text-white/30">
              {highlightedData.lines.map((_, index) => (
                <div key={index} className="h-[1.6em] leading-[1.6em]">{index + 1}</div>
              ))}
            </div>
          </div>
          
          {/* Code */}
          <div className="flex-1 overflow-x-auto pl-4">
            <div 
              className="mono text-[11px] md:text-[13px] leading-relaxed whitespace-pre"
              style={{ 
                fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                lineHeight: '1.6'
              }}
            >
              {highlightedData.htmlLines.map((html, index) => (
                <div 
                  key={index}
                  className="h-[1.6em] leading-[1.6em] text-gray-300 scrollbar-hide"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* CSS for syntax highlighting */}
        <style jsx global>{`
          .code-comment {
            color: #6a9955 !important;
            font-style: italic !important;
          }
          .code-string {
            color: #ce9178 !important;
          }
          .code-keyword {
            color: #569cd6 !important;
          }
          .code-sdk {
            color: #dcdcaa !important;
            font-weight: 500 !important;
          }
          .code-address {
            color: #b267e6 !important;
            font-weight: 500 !important;
          }
          /* Default text color */
          [class*="code-"] {
            color: #d4d4d4;
          }
        `}</style>
      </div>
      { framework && <div className="absolute top-4 right-4 flex gap-2 pointer-events-none">
        {/* <div className="glass px-3 py-1.5 rounded-xl text-[8px] font-bold uppercase tracking-widest opacity-60 pointer-events-auto text-white/80 hover:text-white">
          {framework}
        </div> */}
        <button
          onClick={copy}
          className="glass px-5 py-2.5 rounded-2xl text-[9px] font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 text-white/80 hover:text-white pointer-events-auto"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>}
    </div>
  );
};

export default CodeBlock;