import React, { useMemo, useRef, useState, useEffect } from 'react'
import {
  AlignLeft, ArrowLeft, ArrowLeftRight, ArrowUpRight, BookOpen, Check,
  ChevronDown, Clipboard, Clock3, Code2, Coffee, Copy, Download, FileText, Hash, Home,
  Layers3, ListFilter, Moon, RotateCcw, Search, Settings2, ShieldCheck,
  Sparkles, Sun, Trash2, Type, Upload, X
} from 'lucide-react'
import * as pdfjsLib from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker

const tools = [
  {
    id: 'counter',
    path: '/word-counter',
    name: 'Book, Essay & Manuscript Word Counter',
    seoTitle: 'Free Online Word Counter & Manuscript Word Count Tool | Wordflow',
    metaDescription: 'Accurately count words, characters, and paragraphs for books, essays, novels, and articles. A free online word counter designed for students, authors, and writers.',
    description: 'Count words, characters, and paragraphs for books, essays, and articles.',
    icon: Hash,
    tag: 'Analyze',
    faqs: [
      { q: 'Can I upload an entire book manuscript or essay?', a: 'Yes! Use the alternative document importer above to upload PDF, TXT, or Markdown files for instant word counting.' },
      { q: 'Is this word counter suitable for academic essays?', a: 'Yes, it tracks words, characters, sentences, and paragraphs perfectly for academic papers, student assignments, and professional publishing.' }
    ]
  },
  {
    id: 'cleaner',
    path: '/text-cleaner',
    name: 'Blogger & Writer Bulk Text Cleaner',
    seoTitle: 'Free Online Bulk Text Cleaner & Space Remover for Writers | Wordflow',
    metaDescription: 'Clean messy text instantly. Remove extra spaces and format copied notes, drafts, or emails for blogs, essays, and newsletters with a single click.',
    description: 'Remove clutter, normalize spacing, and tidy up blog posts or drafts.',
    icon: Sparkles,
    tag: 'Clean',
    faqs: [
      { q: 'Can I remove multiple blank lines at once?', a: 'Yes, check the "Limit multiple blank lines" option to normalize paragraph spacing instantly for blogs and essays.' },
      { q: 'Does it fix weird quotation marks from word processors?', a: 'Yes, you can enable smart quote normalization to convert curly quotes to straight quotes cleanly.' }
    ]
  },
  {
    id: 'duplicates',
    path: '/remove-duplicate-lines',
    name: 'Student & Researcher Duplicate Line Remover',
    seoTitle: 'Remove Duplicate Lines Online — Free Data & List Cleaner | Wordflow',
    metaDescription: 'Quickly find and delete duplicate lines from research lists, study notes, or data sets. Fast, free, and private browser-based text deduplication.',
    description: 'Find and remove repeated lines from lists and research notes.',
    icon: ListFilter,
    tag: 'Organize',
    faqs: [
      { q: 'Does deduplication preserve list order?', a: 'Yes, unique lines maintain their original sequence while duplicate items are stripped out.' },
      { q: 'Is this useful for academic research lists?', a: 'Yes, researchers and students use it constantly to clean bibliography lists, keywords, and survey datasets.' }
    ]
  },
  {
    id: 'case',
    path: '/text-case-converter',
    name: 'Content Writer Text Case Converter',
    seoTitle: 'Online Text Case Converter — Uppercase, Title Case & More | Wordflow',
    metaDescription: 'Easily convert text between Title Case, uppercase, lowercase, and sentence case instantly online. Perfect for bloggers, students, and copywriters.',
    description: 'Switch between sentence, title, upper, and lowercase styles.',
    icon: Type,
    tag: 'Format',
    faqs: [
      { q: 'How do I convert headings to Title Case?', a: 'Simply paste your heading, select Title Case, and Wordflow formats it instantly for your blog post or essay title.' }
    ]
  },
  {
    id: 'diff',
    path: '/text-diff-checker',
    name: 'Editor & Student Text Diff Checker',
    seoTitle: 'Online Text Comparison Tool — Compare Drafts & Essays | Wordflow',
    metaDescription: 'Compare two versions of an essay, article, or code block side by side. Instantly highlight changes for editors, students, and writers.',
    description: 'Compare two pieces of text and spot edits or changes instantly.',
    icon: ArrowLeftRight,
    tag: 'Compare',
    faqs: [
      { q: 'How does it help writers and editors?', a: 'It lets you compare two drafts side by side, highlighting additions in green and deletions in red to track revisions.' }
    ]
  },
  {
    id: 'reading',
    path: '/reading-time-calculator',
    name: 'Blog & Manuscript Reading Time Calculator',
    seoTitle: 'Reading Time Calculator — Estimate Blog & Book Duration | Wordflow',
    metaDescription: 'Calculate how long a blog post, essay, or book manuscript takes to read. Free online tool for bloggers, teachers, and authors.',
    description: 'Estimate reading and speech time for articles and books.',
    icon: Clock3,
    tag: 'Analyze',
    faqs: [
      { q: 'Can I calculate the reading time of a full novel or article?', a: 'Yes, upload your manuscript file or paste text to instantly estimate how long it will take readers or students to finish.' }
    ]
  },
  {
    id: 'pdf',
    path: '/pdf-line-break-cleaner',
    name: 'Academic Paper & PDF Line-Break Cleaner',
    seoTitle: 'Remove Hard Line Breaks from Academic PDFs & Documents | Wordflow',
    metaDescription: 'Fix awkward line breaks copied from academic papers, e-books, or PDF documents. Clean paragraphs smoothly for students and researchers.',
    description: 'Import PDF papers and repair awkward line breaks.',
    icon: FileText,
    tag: 'PDF',
    faqs: [
      { q: 'Why do academic PDFs have broken line breaks?', a: 'PDFs store text with hard line returns at the end of every visual line. This tool joins wrapped paragraphs back into smooth sentences.' }
    ]
  },
  {
    id: 'social',
    path: '/social-media-character-counter',
    name: 'Blogger & Social Media Text Checker',
    seoTitle: 'Social Media Character Counter & Platform Limits Tool | Wordflow',
    metaDescription: 'Check post lengths against character limits for X, Instagram, LinkedIn, and Facebook. Perfect for social media managers and bloggers.',
    description: 'Check post length against common platform limits.',
    icon: AlignLeft,
    tag: 'Social',
    faqs: [
      { q: 'What platform limits are supported?', a: 'We support character limits for X (Twitter), Instagram, TikTok, LinkedIn, Facebook, YouTube descriptions, and more.' }
    ]
  }
]

const limits = {
  'X post': 280,
  'Instagram caption': 2200,
  'TikTok caption': 4000,
  'Threads post': 500,
  'Bluesky post': 300,
  'LinkedIn post': 3000,
  'Facebook post': 63206,
  'YouTube description': 5000,
  'Pinterest description': 800,
}

function countStats(value) {
  const words = value.trim() ? value.trim().split(/\s+/u).length : 0
  const sentences = (value.match(/[.!?]+(?=\s|$)/g) || []).length
  const paragraphs = value.trim() ? value.split(/\n\s*\n/).filter(p => p.trim()).length : 0
  return { words, chars: value.length, noSpaces: value.replace(/\s/g, '').length, sentences, paragraphs }
}

function cleanText(text, opts) {
  let result = text
  if (opts.trimLines) result = result.split('\n').map(line => line.trim()).join('\n')
  if (opts.removeEmpty) result = result.split('\n').filter(line => line.trim()).join('\n')
  if (opts.collapseSpaces) result = result.replace(/[ \t]{2,}/g, ' ')
  if (opts.collapseBlank) result = result.replace(/\n{3,}/g, '\n\n')
  if (opts.smartQuotes) result = result.replace(/[“”]/g, '"').replace(/[‘’]/g, "'")
  if (opts.removeTrailing) result = result.split('\n').map(line => line.replace(/[ \t]+$/, '')).join('\n')
  if (opts.lowercase) result = result.toLowerCase()
  if (opts.uppercase) result = result.toUpperCase()
  return result
}

function toCase(text, mode) {
  const words = text.toLowerCase()
  if (mode === 'lower') return text.toLowerCase()
  if (mode === 'upper') return text.toUpperCase()
  if (mode === 'title') return words.replace(/\b([a-z])/g, s => s.toUpperCase())
  if (mode === 'sentence') return words.replace(/(^\s*[a-z]|[.!?]\s+[a-z])/g, s => s.toUpperCase())
  if (mode === 'camel') return words.replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()).replace(/^[A-Z]/, c => c.toLowerCase())
  if (mode === 'pascal') return words.replace(/(^|[^a-zA-Z0-9]+)([a-zA-Z0-9])/g, (_, __, c) => c.toUpperCase())
  if (mode === 'snake') return words.trim().replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '')
  if (mode === 'kebab') return words.trim().replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '')
  return text
}

function useClipboard() {
  const [copied, setCopied] = useState(false)
  const copy = async (value) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
      window.alert('Clipboard access is unavailable. Please select and copy the text manually.')
    }
  }
  return { copied, copy }
}

function ActionButton({ children, onClick, variant = 'secondary', disabled = false }) {
  return <button className={`button ${variant}`} onClick={onClick} disabled={disabled}>{children}</button>
}

function CopyButton({ value }) {
  const { copied, copy } = useClipboard()
  return <ActionButton onClick={() => copy(value)}><Copy size={15} />{copied ? 'Copied' : 'Copy result'}</ActionButton>
}

function DownloadDropdown({ content, toolId }) {
  const [open, setOpen] = useState(false)
  const isTabularData = toolId === 'duplicates' || toolId === 'diff' || (content && content.includes('\n') && content.split('\n').length > 1)

  const downloadFile = (type) => {
    setOpen(false)
    if (!content) return

    if (type === 'pdf') {
      const printWindow = window.open('', '_blank')
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Wordflow Result</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 40px; color: #111; line-height: 1.6; }
                pre { white-space: pre-wrap; font-family: inherit; font-size: 14px; }
              </style>
            </head>
            <body>
              <h2>Wordflow Export Result</h2>
              <hr style="border:0; border-top:1px solid #ccc; margin-bottom:20px;"/>
              <pre>${content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
            </body>
          </html>
        `)
        printWindow.document.close()
        printWindow.focus()
        setTimeout(() => { printWindow.print() }, 500)
      }
      return
    }

    let mime = 'text/plain;charset=utf-8'
    let ext = 'txt'
    let data = content

    if (type === 'doc') {
      mime = 'application/msword'
      ext = 'doc'
    } else if (type === 'excel' && isTabularData) {
      mime = 'text/csv;charset=utf-8'
      ext = 'csv'
      data = content.split('\n').map(line => `"${line.replace(/"/g, '""')}"`).join('\n')
    }

    const blob = new Blob([data], { type: mime })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `wordflow-result.${ext}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <ActionButton onClick={() => setOpen(!open)}>
        <Download size={15} /> Download Result <ChevronDown size={13} />
      </ActionButton>
      {open && (
        <div className="dropdown-menu" style={{
          position: 'absolute', right: 0, top: 'calc(100% + 6px)', background: 'var(--surface-solid)',
          border: '1px solid var(--line)', borderRadius: '10px', boxShadow: 'var(--shadow)', zIndex: 20, minWidth: '170px', padding: '6px'
        }}>
          <button onClick={() => downloadFile('txt')} style={menuItemStyle}>Text Document (.txt)</button>
          <button onClick={() => downloadFile('pdf')} style={menuItemStyle}>PDF Document (.pdf)</button>
          <button onClick={() => downloadFile('doc')} style={menuItemStyle}>Word Document (.doc)</button>
          <button 
            onClick={() => isTabularData && downloadFile('excel')} 
            disabled={!isTabularData} 
            style={{
              ...menuItemStyle,
              color: isTabularData ? 'var(--text)' : 'var(--muted)',
              opacity: isTabularData ? 1 : 0.4,
              cursor: isTabularData ? 'pointer' : 'not-allowed',
            }}
            title={isTabularData ? "Download as Spreadsheet" : "Excel export available only for list/tabular data"}
          >
            Excel / Spreadsheet (.csv)
          </button>
        </div>
      )}
    </div>
  )
}

const menuItemStyle = {
  display: 'block', width: '100%', textAlign: 'left', background: 'none', border: '0',
  padding: '8px 12px', fontSize: '11px', color: 'var(--text)', borderRadius: '6px', cursor: 'pointer'
}

function TextArea({ value, onChange, placeholder, label, rows = 9 }) {
  return <label className="field-wrap"><span className="field-label">{label}</span><textarea rows={rows} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} spellCheck="false" /></label>
}

function Stat({ label, value }) {
  return <div className="stat"><span>{label}</span><strong>{value}</strong></div>
}

function EmptyState({ text = 'Your result will appear here.' }) {
  return <div className="empty-state"><div className="empty-icon"><Sparkles size={19}/></div><p>{text}</p></div>
}

function AdContainer() {
  return (
    <div style={{
      marginTop: '40px',
      marginBottom: '20px',
      minHeight: '100px',
      width: '100%',
      backgroundColor: 'var(--surface-2)',
      border: '1px solid var(--line)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      boxShadow: 'var(--shadow)',
      overflow: 'hidden'
    }}>
      <span style={{
        fontFamily: 'Manrope, sans-serif',
        fontSize: '14px',
        fontWeight: '700',
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        color: 'var(--muted)',
        opacity: 0.6,
        background: 'var(--surface-solid)',
        padding: '6px 16px',
        borderRadius: '8px',
        border: '1px solid var(--line)'
      }}>
        Ad
      </span>
    </div>
  )
}

function DocumentImportBox({ onTextLoaded }) {
  const [format, setFormat] = useState('pdf')
  const [busy, setBusy] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setBusy(true)
    try {
      if (format === 'pdf') {
        const data = new Uint8Array(await file.arrayBuffer())
        const pdf = await pdfjsLib.getDocument({ data }).promise
        const pages = []
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i)
          const content = await page.getTextContent()
          const items = content.items.filter(item => 'str' in item)
          let line = ''
          let previousY = null
          const lines = []
          for (const item of items) {
            const y = item.transform?.[5]
            if (previousY !== null && Math.abs(y - previousY) > 3) { lines.push(line); line = '' }
            line += item.str
            previousY = y
          }
          if (line) lines.push(line)
          pages.push(lines.join('\n'))
        }
        onTextLoaded(pages.join('\n\n'), file.name)
      } else {
        const text = await file.text()
        onTextLoaded(text, file.name)
      }
    } catch (err) {
      console.error(err)
      window.alert('Could not read this file. It may be corrupted.')
    } finally {
      setBusy(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  return (
    <div style={{
      background: 'var(--surface-2)',
      border: '1px solid var(--line)',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Alternative: Import Document File
        </span>
        <span style={{ fontSize: '10px', color: 'var(--muted)' }}>Upload book, manuscript, or notes</span>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        <select 
          value={format} 
          onChange={e => setFormat(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid var(--line)',
            background: 'var(--surface-solid)',
            color: 'var(--text)',
            fontSize: '12px',
            flex: '1',
            minWidth: '150px'
          }}
        >
          <option value="pdf">PDF Document (.pdf)</option>
          <option value="txt">Plain Text File (.txt)</option>
          <option value="md">Markdown File (.md)</option>
        </select>
        <button 
          className="button primary" 
          onClick={() => fileInputRef.current?.click()}
          disabled={busy}
          style={{ fontSize: '12px', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Upload size={14}/>
          {busy ? 'Extracting text...' : 'Upload File'}
        </button>
      </div>
      <input 
        ref={fileInputRef} 
        type="file" 
        accept={format === 'pdf' ? 'application/pdf,.pdf' : format === 'txt' ? 'text/plain,.txt' : '.md,text/markdown'} 
        hidden 
        onChange={handleFileChange} 
      />
    </div>
  )
}

function AboutView({ onNavigate }) {
  return (
    <div className="tool-page" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', lineHeight: '1.7', color: 'var(--muted)' }}>
      <h1 style={{ color: 'var(--text)', marginBottom: '8px' }}>About Wordflow</h1>
      <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--accent)', marginBottom: '24px' }}>Make every word work better.</p>
      <p style={{ fontSize: '13px', marginBottom: '20px' }}>
        Wordflow is a collection of simple, free online text tools designed to make everyday writing and text editing easier. Whether you're preparing a document, cleaning copied text, comparing two versions, or checking your word count, Wordflow helps you get things done without complicated software.
      </p>
      <div><button className="button primary" onClick={() => onNavigate('/')}>Back to Tools</button></div>
    </div>
  )
}

function PrivacyPolicyView({ onNavigate }) {
  return (
    <div className="tool-page" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', lineHeight: '1.7', color: 'var(--muted)' }}>
      <h1 style={{ color: 'var(--text)', marginBottom: '8px' }}>Privacy Policy</h1>
      <p style={{ fontSize: '11px', marginBottom: '24px' }}>Last updated: January 1, 2026</p>
      <p style={{ fontSize: '12px', marginBottom: '16px' }}>
        All text tools provided on Wordflow run entirely inside your browser using client-side JavaScript. We do not read, copy, save, analyze, or store your text or documents on any external server.
      </p>
      <div><button className="button primary" onClick={() => onNavigate('/')}>Back to Home</button></div>
    </div>
  )
}

function TermsOfUseView({ onNavigate }) {
  return (
    <div className="tool-page" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', lineHeight: '1.7', color: 'var(--muted)' }}>
      <h1 style={{ color: 'var(--text)', marginBottom: '8px' }}>Terms of Use</h1>
      <p style={{ fontSize: '11px', marginBottom: '24px' }}>Last updated: January 1, 2026</p>
      <p style={{ fontSize: '12px', marginBottom: '16px' }}>
        By visiting Wordflow or using any of our free online text tools, you agree to comply with and be bound by these Terms of Use.
      </p>
      <div><button className="button primary" onClick={() => onNavigate('/')}>Back to Home</button></div>
    </div>
  )
}

function ToolPanel({ tool, onBack, onNavigate }) {
  const [input, setInput] = useState('')
  const [second, setSecond] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('title')
  const [platform, setPlatform] = useState('X post')
  const [options, setOptions] = useState({ trimLines: true, removeEmpty: false, collapseSpaces: true, collapseBlank: true, smartQuotes: false, removeTrailing: true, lowercase: false, uppercase: false })
  const [uniqueOnly, setUniqueOnly] = useState(true)
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [fileName, setFileName] = useState('')

  const stats = useMemo(() => countStats(input), [input])
  const Icon = tool.icon

  const runCleaner = () => setOutput(cleanText(input, options))
  const runDuplicates = () => {
    const lines = input.split(/\r?\n/)
    const seen = new Set()
    const result = []
    let removed = 0
    for (const line of lines) {
      const key = caseSensitive ? line : line.toLocaleLowerCase()
      if (uniqueOnly && seen.has(key)) { removed++; continue }
      seen.add(key); result.push(line)
    }
    setOutput(result.join('\n'))
    return removed
  }

  const handleDocumentImport = (text, name) => {
    setInput(text)
    setFileName(name)
  }

  const diffLines = useMemo(() => {
    const a = input.split('\n'), b = second.split('\n')
    const max = Math.max(a.length, b.length)
    const rows = []
    for (let i = 0; i < max; i++) {
      const left = a[i], right = b[i]
      let status = 'same'
      if (left === undefined) status = 'added'
      else if (right === undefined) status = 'removed'
      else if (left !== right) status = 'changed'
      rows.push({ left, right, status, index: i + 1 })
    }
    return rows
  }, [input, second])

  return <div className="tool-page">
    <button className="back-link" onClick={onBack}><ArrowLeft size={16}/> All tools</button>
    <div className="tool-heading">
      <div className="tool-icon large"><Icon size={22}/></div>
      <div><div className="eyebrow">{tool.tag} TOOL</div><h1>{tool.name}</h1><p>{tool.description}</p></div>
    </div>

    {tool.id === 'diff' && <div className="workspace-grid two-col">
      <section className="panel">
        <TextArea label="Original text" value={input} onChange={setInput} placeholder="Paste the original text here..." />
        <div className="inline-actions"><ActionButton onClick={() => setInput('')}><Trash2 size={15}/>Clear text</ActionButton></div>
      </section>
      <section className="panel">
        <TextArea label="Revised text" value={second} onChange={setSecond} placeholder="Paste the revised text here..." />
        <div className="inline-actions"><ActionButton onClick={() => setSecond('')}><Trash2 size={15}/>Clear text</ActionButton></div>
      </section>
      <section className="panel full-width">
        <div className="panel-top">
          <div><h3>Comparison</h3><p>Line-by-line comparison. Added, removed and changed lines are highlighted.</p></div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <DownloadDropdown content={diffLines.map(r => `${r.status.toUpperCase()}: ${r.left || ''} | ${r.right || ''}`).join('\n')} toolId={tool.id} />
            <ActionButton onClick={() => {setInput('');setSecond('')}}><RotateCcw size={15}/>Reset</ActionButton>
          </div>
        </div>
        {(input || second) ? <div className="diff-list">{diffLines.map(row => <div key={row.index} className={`diff-row ${row.status}`}><span className="line-no">{row.index}</span><span className="diff-mark">{row.status === 'added' ? '+' : row.status === 'removed' ? '−' : row.status === 'changed' ? '~' : ' '}</span><span>{row.left ?? ''}</span><span className="diff-divider"/><span>{row.right ?? ''}</span></div>)}</div> : <EmptyState text="Add text to both sides to compare changes."/>}
      </section>
    </div>}

    {tool.id === 'cleaner' && <div className="workspace-grid two-col">
      <section className="panel">
        <DocumentImportBox onTextLoaded={handleDocumentImport} />
        <TextArea label="Your text" value={input} onChange={setInput} placeholder="Paste text you want to clean..." />
        {fileName && <div className="file-chip" style={{ marginTop: '8px' }}><FileText size={14}/> {fileName}</div>}
        <div className="inline-actions"><ActionButton onClick={() => { setInput(''); setFileName(''); }}><Trash2 size={15}/>Clear text</ActionButton></div>
      </section>
      <section className="panel"><div className="panel-top"><div><h3>Cleaning options</h3><p>Choose the formatting changes to apply.</p></div></div><div className="option-list">
        {Object.entries({trimLines:'Trim spaces at line starts',removeEmpty:'Remove empty lines',collapseSpaces:'Collapse repeated spaces',collapseBlank:'Limit multiple blank lines',smartQuotes:'Replace curly quotes',removeTrailing:'Remove trailing spaces',lowercase:'Convert to lowercase',uppercase:'Convert to uppercase'}).map(([key,label]) => <label className="check-row" key={key}><input type="checkbox" checked={options[key]} onChange={e => setOptions(o => ({...o,[key]:e.target.checked, ...(key === 'lowercase' && e.target.checked ? {uppercase:false}:{}), ...(key === 'uppercase' && e.target.checked ? {lowercase:false}:{})}))}/><span>{label}</span></label>)}
      </div><ActionButton variant="primary" onClick={runCleaner}><Sparkles size={15}/>Clean text</ActionButton></section>
      <section className="panel full-width">
        <div className="panel-top">
          <div><h3>Cleaned result</h3><p>{output ? `${countStats(output).words} words · ${output.length} characters` : 'Your cleaned text will appear here.'}</p></div>
          {output && <div style={{ display: 'flex', gap: '8px' }}><DownloadDropdown content={output} toolId={tool.id} /><CopyButton value={output}/></div>}
        </div>
        {output ? <pre className="result-text">{output}</pre> : <EmptyState/>}
      </section>
    </div>}

    {tool.id === 'counter' && <div className="workspace-grid">
      <section className="panel">
        <DocumentImportBox onTextLoaded={handleDocumentImport} />
        <TextArea label="Enter or paste your text" value={input} onChange={setInput} placeholder="Start typing or paste your text here..." rows={13}/>
        {fileName && <div className="file-chip" style={{ marginTop: '8px' }}><FileText size={14}/> {fileName}</div>}
        <div className="inline-actions"><ActionButton onClick={() => { setInput(''); setFileName(''); }}><Trash2 size={15}/>Clear text</ActionButton><CopyButton value={input}/></div>
      </section>
      <section className="panel"><div className="panel-top"><div><h3>Text statistics</h3><p>Updates automatically as you type.</p></div><span className="live-pill"><span/>Live</span></div><div className="stats-grid"><Stat label="Words" value={stats.words.toLocaleString()}/><Stat label="Characters" value={stats.chars.toLocaleString()}/><Stat label="Without spaces" value={stats.noSpaces.toLocaleString()}/><Stat label="Sentences" value={stats.sentences.toLocaleString()}/><Stat label="Paragraphs" value={stats.paragraphs.toLocaleString()}/><Stat label="Reading time" value={stats.words === 0 ? '0 min' : `${Math.ceil(stats.words/200)} min`}/></div><div className="tip-box"><BookOpen size={17}/><span>Reading time is estimated at 200 words per minute.</span></div></section>
    </div>}

    {tool.id === 'duplicates' && <div className="workspace-grid two-col">
      <section className="panel">
        <DocumentImportBox onTextLoaded={handleDocumentImport} />
        <TextArea label="Your lines" value={input} onChange={setInput} placeholder={'Paste your list here...\nOne item per line'} rows={13}/>
        {fileName && <div className="file-chip" style={{ marginTop: '8px' }}><FileText size={14}/> {fileName}</div>}
        <div className="inline-actions"><ActionButton onClick={() => { setInput(''); setFileName(''); }}><Trash2 size={15}/>Clear text</ActionButton></div>
        <div className="option-list compact" style={{ marginTop: '12px' }}><label className="check-row"><input type="checkbox" checked={uniqueOnly} onChange={e => setUniqueOnly(e.target.checked)}/><span>Keep only unique lines</span></label><label className="check-row"><input type="checkbox" checked={caseSensitive} onChange={e => setCaseSensitive(e.target.checked)}/><span>Case-sensitive matching</span></label></div>
        <ActionButton variant="primary" onClick={runDuplicates}><ListFilter size={15}/>Remove duplicates</ActionButton>
      </section>
      <section className="panel">
        <div className="panel-top">
          <div><h3>Unique lines</h3><p>Repeated lines are removed while preserving order.</p></div>
          {output && <div style={{ display: 'flex', gap: '8px' }}><DownloadDropdown content={output} toolId={tool.id} /><CopyButton value={output}/></div>}
        </div>
        {output ? <pre className="result-text">{output}</pre> : <EmptyState text="Your cleaned list will appear here."/>}
      </section>
    </div>}

    {tool.id === 'case' && <div className="workspace-grid">
      <section className="panel">
        <DocumentImportBox onTextLoaded={handleDocumentImport} />
        <TextArea label="Enter your text" value={input} onChange={setInput} placeholder="Type or paste something..." rows={12}/>
        {fileName && <div className="file-chip" style={{ marginTop: '8px' }}><FileText size={14}/> {fileName}</div>}
        <div className="inline-actions"><ActionButton onClick={() => { setInput(''); setFileName(''); }}><Trash2 size={15}/>Clear text</ActionButton></div>
        <div className="case-grid" style={{ marginTop: '12px' }}>{[['sentence','Sentence case'],['title','Title Case'],['upper','UPPERCASE'],['lower','lowercase'],['camel','camelCase'],['pascal','PascalCase'],['snake','snake_case'],['kebab','kebab-case']].map(([id,label]) => <button key={id} className={`case-button ${mode===id?'selected':''}`} onClick={() => {setMode(id);setOutput(toCase(input,id))}}>{label}</button>)}</div>
        <ActionButton variant="primary" onClick={() => setOutput(toCase(input,mode))}><Type size={15}/>Convert text</ActionButton>
      </section>
      <section className="panel">
        <div className="panel-top">
          <div><h3>Converted text</h3><p>Choose a format, then copy your result.</p></div>
          {output && <div style={{ display: 'flex', gap: '8px' }}><DownloadDropdown content={output} toolId={tool.id} /><CopyButton value={output}/></div>}
        </div>
        {output ? <pre className="result-text">{output}</pre> : <EmptyState text="Your converted text will appear here."/>}
      </section>
    </div>}

    {tool.id === 'pdf' && <div className="workspace-grid">
      <section className="panel">
        <DocumentImportBox onTextLoaded={handleDocumentImport} />
        <div className="panel-top" style={{ marginTop: '10px' }}><div><h3>PDF & Document Tools</h3><p>Extracted document text appears below.</p></div><FileText size={19}/></div>
        {fileName && <div className="file-chip" style={{ marginTop: '8px' }}><FileText size={14}/> {fileName}</div>}
        <div className="tip-box" style={{ marginTop: '12px' }}><ShieldCheck size={17}/><span>Your document is processed on this device and is not uploaded to a server.</span></div>
      </section>
      <section className="panel">
        <div className="panel-top"><div><h3>Extracted text</h3><p>Review or edit the extracted text before cleaning.</p></div>{input && <CopyButton value={input}/>}</div>
        <textarea className="pdf-textarea" value={input} onChange={e => setInput(e.target.value)} placeholder="Extracted document text will appear here..." rows={12}/>
        <div className="inline-actions"><ActionButton onClick={() => { setInput(''); setFileName(''); }}><Trash2 size={15}/>Clear text</ActionButton></div>
      </section>
      <section className="panel full-width">
        <div className="panel-top">
          <div><h3>Cleaned text</h3><p>Removes common line-break artifacts and joins wrapped paragraphs.</p></div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {output && <DownloadDropdown content={output} toolId={tool.id} />}
            <ActionButton variant="primary" onClick={() => setOutput(input.replace(/-\s*\n\s*/g, '').replace(/([^\n])\n([^\n])/g, '$1 $2').replace(/[ \t]{2,}/g, ' ').replace(/\n{3,}/g, '\n\n'))} disabled={!input}><Sparkles size={15}/>Clean line breaks</ActionButton>
          </div>
        </div>
        {output ? <><pre className="result-text">{output}</pre><div className="inline-actions"><CopyButton value={output}/></div></> : <EmptyState text="Import a document, then clean the extracted text."/>}
      </section>
    </div>}

    {tool.id === 'reading' && <div className="workspace-grid">
      <section className="panel">
        <DocumentImportBox onTextLoaded={handleDocumentImport} />
        <TextArea label="Paste your text or upload a book" value={input} onChange={setInput} placeholder="Paste an article, essay or upload your book..." rows={14}/>
        {fileName && <div className="file-chip" style={{ marginTop: '8px' }}><FileText size={14}/> {fileName}</div>}
        <div className="inline-actions"><ActionButton onClick={() => { setInput(''); setFileName(''); }}><Trash2 size={15}/>Clear text</ActionButton></div>
      </section>
      <section className="panel"><div className="panel-top"><div><h3>Time estimate</h3><p>Based on your text length.</p></div><Clock3 size={20}/></div><div className="reading-feature"><span>Estimated reading time</span><strong>{Math.floor(stats.words/200)}<small> min</small> {Math.round((stats.words%200)/200*60)}<small> sec</small></strong><p>At an average pace of 200 words per minute.</p></div><div className="stats-grid"><Stat label="Word count" value={stats.words.toLocaleString()}/><Stat label="Slow · 150 wpm" value={`${Math.ceil(stats.words/150)} min`}/><Stat label="Average · 200 wpm" value={`${Math.ceil(stats.words/200)} min`}/><Stat label="Fast · 250 wpm" value={`${Math.ceil(stats.words/250)} min`}/></div></section>
    </div>}

    {tool.id === 'social' && <div className="workspace-grid">
      <section className="panel">
        <TextArea label="Write your post" value={input} onChange={setInput} placeholder="Draft your social media post here..." rows={14}/>
        <div className="inline-actions"><ActionButton onClick={() => setInput('')}><Trash2 size={15}/>Clear text</ActionButton><CopyButton value={input}/></div>
      </section>
      <section className="panel"><div className="panel-top"><div><h3>Platform check</h3><p>Select a platform to check your character count.</p></div><Settings2 size={19}/></div><label className="field-wrap"><span className="field-label">Platform</span><select value={platform} onChange={e => setPlatform(e.target.value)}>{Object.keys(limits).map(p => <option key={p}>{p}</option>)}</select></label><div className="limit-card"><div className="limit-head"><span>Characters used</span><strong>{stats.chars.toLocaleString()} / {limits[platform].toLocaleString()}</strong></div><div className="progress-track"><div className={`progress-fill ${stats.chars>limits[platform]?'over':''}`} style={{width:`${Math.min(100,stats.chars/limits[platform]*100)}%`}}/></div><p className={stats.chars>limits[platform]?'over-text':''}>{stats.chars>limits[platform] ? `${(stats.chars-limits[platform]).toLocaleString()} characters over the selected limit.` : `${(limits[platform]-stats.chars).toLocaleString()} characters remaining.`}</p></div><div className="tip-box"><ShieldCheck size={17}/><span>These are general text-length limits. Platform rules and counting methods can change.</span></div></section>
    </div>}

    {/* US/UK Long-Tail SEO FAQ Section */}
    {tool.faqs && tool.faqs.length > 0 && (
      <section style={{ marginTop: '40px', padding: '24px', background: 'var(--surface-2)', borderRadius: '14px', border: '1px solid var(--line)' }}>
        <h3 style={{ fontSize: '15px', marginBottom: '14px', color: 'var(--text)' }}>Frequently Asked Questions</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {tool.faqs.map((faq, index) => (
            <div key={index} style={{ borderBottom: index < tool.faqs.length - 1 ? '1px solid var(--line)' : 'none', paddingBottom: index < tool.faqs.length - 1 ? '12px' : '0' }}>
              <strong style={{ display: 'block', fontSize: '12px', color: 'var(--text)', marginBottom: '4px' }}>{faq.q}</strong>
              <p style={{ fontSize: '11px', color: 'var(--muted)', margin: 0, lineHeight: '1.6' }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    )}

    <AdContainer />

    <section style={{ marginTop: '30px', padding: '24px', background: 'var(--surface-2)', borderRadius: '14px', border: '1px solid var(--line)' }}>
      <h2 style={{ fontSize: '16px', marginBottom: '10px' }}>About {tool.name}</h2>
      <p style={{ fontSize: '11px', lineHeight: '1.7', color: 'var(--muted)', marginBottom: '16px' }}>{tool.metaDescription}</p>
      
      <h3 style={{ fontSize: '13px', marginBottom: '8px' }}>Related Wordflow Utilities</h3>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {tools.filter(t => t.id !== tool.id).slice(0, 4).map(rel => (
          <button 
            key={rel.id} 
            onClick={() => onNavigate(rel.path)}
            className="button"
            style={{ fontSize: '10px', padding: '6px 10px' }}
          >
            {rel.name}
          </button>
        ))}
      </div>
    </section>
  </div>
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [theme, setTheme] = useState(() => localStorage.getItem('wordflow-theme') || 'light')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All tools')

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (path) => {
    window.history.pushState({}, '', path)
    setCurrentPath(path)
    window.scrollTo(0, 0)
  }

  const changeTheme = () => {
    setTheme(current => {
      const next = current === 'light' ? 'dark' : 'light'
      localStorage.setItem('wordflow-theme', next)
      return next
    })
  }

  const selectedTool = tools.find(t => t.path === currentPath)

  useEffect(() => {
    if (selectedTool) {
      document.title = selectedTool.seoTitle
      let metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) metaDesc.setAttribute('content', selectedTool.metaDescription)
    } else if (currentPath === '/about') {
      document.title = 'About Wordflow — Make Every Word Work Better'
      let metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) metaDesc.setAttribute('content', 'Learn more about Wordflow, a collection of simple, free online text tools designed to make everyday writing easier.')
    } else if (currentPath === '/privacy-policy') {
      document.title = 'Privacy Policy — Wordflow'
      let metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) metaDesc.setAttribute('content', 'Read the Wordflow Privacy Policy to understand how client-side text processing works.')
    } else if (currentPath === '/terms-of-use') {
      document.title = 'Terms of Use — Wordflow'
      let metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) metaDesc.setAttribute('content', 'Review the terms and conditions for using Wordflow text utilities.')
    } else {
      document.title = 'Wordflow — Free Private Online Text Utilities & Tools'
      let metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) metaDesc.setAttribute('content', 'Simple, private text tools to clean, compare, count and format text directly in your browser.')
    }
  }, [currentPath, selectedTool])

  const filteredTools = tools.filter(tool => 
    (category === 'All tools' || tool.tag === category) && 
    `${tool.name} ${tool.description}`.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="app-shell" data-theme={theme}>
      <aside className="sidebar">
        <button className="brand" onClick={() => navigate('/')} aria-label="Wordflow home">
          <img src={theme === 'dark' ? '/wordflow-logo-dark.svg' : '/wordflow-logo.svg'} alt="Wordflow" />
        </button>
        <div className="side-label">WORKSPACE</div>
        <button className={`nav-item ${currentPath === '/' ? 'active' : ''}`} onClick={() => navigate('/')}>
          <Home size={17}/>Overview
        </button>
        <div className="side-label tools-label">YOUR TOOLS <span>08</span></div>
        <nav className="tool-nav">
          {tools.map(tool => {
            const Icon = tool.icon
            return (
              <button 
                key={tool.id} 
                className={`nav-item ${currentPath === tool.path ? 'active' : ''}`} 
                onClick={() => navigate(tool.path)}
              >
                <Icon size={17}/><span>{tool.name}</span>
              </button>
            )
          })}
        </nav>
        <div className="sidebar-bottom">
          <div className="privacy-card">
            <ShieldCheck size={18}/>
            <strong>Your text stays yours.</strong>
            <p>Everything runs locally in your browser. No uploads, no accounts.</p>
          </div>
          <div className="sidebar-foot">MADE FOR EVERYDAY WORK <span>·</span> 2026</div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Workspace</span><span>/</span>
            <strong>{currentPath === '/about' ? 'About' : currentPath === '/privacy-policy' ? 'Privacy Policy' : currentPath === '/terms-of-use' ? 'Terms of Use' : selectedTool?.name || 'Overview'}</strong>
          </div>
          <div className="top-actions">
            <a 
              href="https://ko-fi.com/studiolineco" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="coffee-button"
            >
              <Coffee size={14}/>
              <span>Buy me a coffee</span>
            </a>
            <button className="theme-toggle" onClick={changeTheme} aria-label="Toggle colour theme">
              {theme === 'light' ? <Moon size={17}/> : <Sun size={17}/>}
            </button>
          </div>
        </header>

        {currentPath === '/about' ? (
          <AboutView onNavigate={navigate} />
        ) : currentPath === '/privacy-policy' ? (
          <PrivacyPolicyView onNavigate={navigate} />
        ) : currentPath === '/terms-of-use' ? (
          <TermsOfUseView onNavigate={navigate} />
        ) : selectedTool ? (
          <ToolPanel key={selectedTool.id} tool={selectedTool} onBack={() => navigate('/')} onNavigate={navigate} />
        ) : (
          <div className="dashboard">
            <section className="welcome-row">
              <div>
                <div className="eyebrow">YOUR PERSONAL TEXT WORKSPACE</div>
                <h1>Make text work <span>better.</span></h1>
                <p>Eight simple tools to clean, compare, count and shape your words.<br/>No clutter. No sign-up. Just get things done.</p>
              </div>
              <div className="welcome-art">
                <div className="art-card art-one"><AlignLeft size={20}/><span>Clean text</span><i>•••</i></div>
                <div className="art-card art-two"><ArrowLeftRight size={20}/><span>Compare</span><i>↔</i></div>
                <div className="art-card art-three"><Hash size={20}/><span>Count words</span><i>124</i></div>
                <div className="art-orbit"/>
              </div>
            </section>
            
            <div className="section-heading">
              <div>
                <div className="eyebrow">THE TOOLKIT</div>
                <h2>Find your tool</h2>
                <p>Pick a tool and get straight to work.</p>
              </div>
              <div className="tool-count">
                <strong>08</strong>
                <span>TOOLS AVAILABLE</span>
              </div>
            </div>

            <div className="toolbar">
              <div className="search-box">
                <Search size={17}/>
                <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search tools..."/>
                {query && <button onClick={() => setQuery('')}><X size={15}/></button>}
              </div>
              <div className="category-scroll">
                {['All tools', 'Compare', 'Clean', 'Analyze', 'Organize', 'Format', 'PDF', 'Social'].map(c => (
                  <button key={c} className={`filter-chip ${category === c ? 'selected' : ''}`} onClick={() => setCategory(c)}>{c}</button>
                ))}
              </div>
            </div>

            <div className="tool-grid">
              {filteredTools.map(tool => {
                const Icon = tool.icon
                return (
                  <button className="tool-card" key={tool.id} onClick={() => navigate(tool.path)}>
                    <div className="card-top">
                      <span className="tool-icon"><Icon size={19}/></span>
                      <span className="card-arrow"><ArrowUpRight size={17}/></span>
                    </div>
                    <span className="card-tag">{tool.tag}</span>
                    <h3>{tool.name}</h3>
                    <p>{tool.description}</p>
                    <span className="card-link">Open tool <ArrowUpRight size={14}/></span>
                  </button>
                )
              })}
            </div>

            {filteredTools.length === 0 && (
              <div className="no-results">
                <Search size={22}/>
                <strong>No tools found</strong>
                <span>Try a different search or category.</span>
                <button onClick={() => { setQuery(''); setCategory('All tools') }}>Clear filters</button>
              </div>
            )}

            <AdContainer />

            <footer style={{ marginTop: '60px', padding: '24px 0', borderTop: '1px solid var(--line)', textAlign: 'center', fontSize: '11px', color: 'var(--muted)' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '10px' }}>
                <a href="/about" onClick={(e) => { e.preventDefault(); navigate('/about'); }} style={{ color: 'var(--text)', textDecoration: 'none' }}>About Wordflow</a>
                <span>|</span>
                <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); navigate('/privacy-policy'); }} style={{ color: 'var(--text)', textDecoration: 'none' }}>Privacy Policy</a>
                <span>|</span>
                <a href="/terms-of-use" onClick={(e) => { e.preventDefault(); navigate('/terms-of-use'); }} style={{ color: 'var(--text)', textDecoration: 'none' }}>Terms of Use</a>
              </div>
              <p style={{ margin: '0 0 6px 0', fontSize: '10px' }}>Make every word work better. Wordflow is a collection of simple, free online text tools designed to make everyday writing easier.</p>
              <p style={{ margin: 0, fontSize: '9px', opacity: 0.8 }}>© 2026 Wordflow. All rights reserved.</p>
            </footer>
          </div>
        )}
      </main>
    </div>
  )
}