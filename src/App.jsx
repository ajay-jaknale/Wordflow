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
    name: 'Word & Character Counter',
    seoTitle: 'Free Online Word Counter & Manuscript Word Count Tool | Wordflow',
    metaDescription: 'Accurately count words, characters, and paragraphs for books, essays, novels, and articles. A free online word counter designed for students, authors, and writers.',
    description: 'Count words, characters, and paragraphs for books, essays, and articles.',
    icon: Hash,
    tag: 'Analyze',
    explanation: 'The Word & Character Counter is an essential browser-based utility designed for authors, academic researchers, copywriters, and students who need precise control over their text metrics. Whether you are drafting a university admissions essay subject to strict maximum word bounds, writing a 50,000-word NaNoWriMo novel, or optimizing a web article for search engine visibility, knowing your exact quantitative metrics prevents costly formatting errors.',
    howToSteps: [
      'Click or tap into the primary text input area.',
      'Type your draft directly or paste your text from your clipboard.',
      'Review real-time metrics updating instantly in the statistics panel.',
      'Use the document importer above if you need to upload a full PDF or text manuscript file.'
    ],
    examples: [
      'Academic Submissions: Ensuring a thesis abstract stays strictly under the 250-word journal limit.',
      'Copywriting: Verifying that a landing page hero section remains concise and punchy under 50 words.',
      'Publishing: Monitoring daily chapter word counts to meet steady milestone goals.'
    ],
    faqs: [
      { q: 'Can I upload an entire book manuscript or essay?', a: 'Yes! Use the alternative document importer above to upload PDF, TXT, or Markdown files for instant word counting.' },
      { q: 'Is this word counter suitable for academic essays?', a: 'Yes, it tracks words, characters, sentences, and paragraphs perfectly for academic papers, student assignments, and professional publishing.' },
      { q: 'Does counting include punctuation and special characters?', a: 'Characters include all letters, spaces, and punctuation marks, while the "without spaces" metric isolates pure alphanumeric data.' },
      { q: 'Is my data secure when pasting sensitive drafts?', a: 'All processing happens locally in your browser sandbox. Your text is never transmitted, logged, or stored on external servers.' }
    ],
    relatedBlogs: [
      { slug: 'mastering-manuscript-metrics-and-pacing', title: 'Mastering Manuscript Metrics: A Comprehensive Guide to Word Counts, Pacing, and Readability' },
      { slug: 'psychology-of-clean-writing-minimalism', title: 'The Psychology of Clean Writing: Why Minimalist Workflows Drive Deep Focus' }
    ]
  },
  {
    id: 'cleaner',
    path: '/text-cleaner',
    name: 'Bulk Text Cleaner',
    seoTitle: 'Free Online Bulk Text Cleaner & Space Remover for Writers | Wordflow',
    metaDescription: 'Clean messy text instantly. Remove extra spaces and format copied notes, drafts, or emails for blogs, essays, and newsletters with a single click.',
    description: 'Remove clutter, normalize spacing, and tidy up blog posts or drafts.',
    icon: Sparkles,
    tag: 'Clean',
    explanation: 'The Bulk Text Cleaner is engineered for developers, editors, and content creators who frequently deal with corrupted string data, messy clipboard clippings from web pages, or unevenly formatted notes. It automates the tedious chore of stripping erratic line breaks, normalizing spacing, and cleaning typography so you can publish clean copy instantly.',
    howToSteps: [
      'Paste your raw, unformatted text into the editor box.',
      'Select your desired cleanup parameters (e.g., trim lines, remove empty lines, collapse spaces).',
      'Click the "Clean text" button to execute immediate string transformations.',
      'Copy your polished result or download it directly to your device.'
    ],
    examples: [
      'Newsletter Drafting: Removing erratic double spacing copied from Google Docs before pasting into email marketing software.',
      'Web Scraping: Tidying up raw paragraphs extracted from legacy HTML tables or PDFs.',
      'Code Prep: Normalizing indentation whitespace across multi-line configuration blocks.'
    ],
    faqs: [
      { q: 'Can I remove multiple blank lines at once?', a: 'Yes, check the "Limit multiple blank lines" option to normalize paragraph spacing instantly for blogs and essays.' },
      { q: 'Does it fix weird quotation marks from word processors?', a: 'Yes, you can enable smart quote normalization to convert curly quotes to straight quotes cleanly.' },
      { q: 'Can I convert text case while cleaning?', a: 'Yes, toggle options for automatic lowercase or uppercase conversion during the bulk cleaning process.' },
      { q: 'Is there a file size limit when cleaning documents?', a: 'Because processing happens entirely via your local browser engine, it easily handles large text blocks instantly.' }
    ],
    relatedBlogs: [
      { slug: 'architecture-of-client-side-text-utilities', title: 'The Architecture of Text: Why Modern Web Applications Are Shifting Client-Side' }
    ]
  },
  {
    id: 'duplicates',
    path: '/remove-duplicate-lines',
    name: 'Duplicate Line Remover',
    seoTitle: 'Remove Duplicate Lines Online — Free Data & List Cleaner | Wordflow',
    metaDescription: 'Quickly find and delete duplicate lines from research lists, study notes, or data sets. Fast, free, and private browser-based text deduplication.',
    description: 'Find and remove repeated lines from lists and research notes.',
    icon: ListFilter,
    tag: 'Organize',
    explanation: 'The Duplicate Line Remover is a robust data organization utility built for researchers, developers, students, and catalogers. When compiling bibliographies, keyword lists, email rosters, or survey notes, accidental duplicates frequently creep in. This tool instantly purges redundant entries while preserving your original list sequence.',
    howToSteps: [
      'Paste your multi-line list into the text input area.',
      'Choose whether to enforce case-sensitive matching or keep unique lines.',
      'Click "Remove duplicates" to instantly filter the list.',
      'Copy the cleaned dataset or export it directly as a text or spreadsheet file.'
    ],
    examples: [
      'Research Bibliographies: Cleaning duplicated source URLs and reference titles from exported citation lists.',
      'SEO Keyword Research: Purging repeating search queries from raw keyword planner exports.',
      'Inventory Management: Filtering duplicate serial numbers or SKU lists.'
    ],
    faqs: [
      { q: 'Does deduplication preserve list order?', a: 'Yes, unique lines maintain their original sequence while duplicate items are stripped out.' },
      { q: 'Is this useful for academic research lists?', a: 'Yes, researchers and students use it constantly to clean bibliography lists, keywords, and survey datasets.' },
      { q: 'How does case-sensitive matching affect results?', a: 'When case-sensitivity is disabled, "Apple" and "apple" are treated as duplicates; when enabled, they remain separate.' },
      { q: 'Can I export my deduplicated list into Excel?', a: 'Yes, use the Download Result dropdown to save your clean dataset as a CSV or text file.' }
    ],
    relatedBlogs: [
      { slug: 'architecture-of-client-side-text-utilities', title: 'The Architecture of Text: Why Modern Web Applications Are Shifting Client-Side' }
    ]
  },
  {
    id: 'case',
    path: '/text-case-converter',
    name: 'Text Case Converter',
    seoTitle: 'Online Text Case Converter — Uppercase, Title Case & More | Wordflow',
    metaDescription: 'Easily convert text between Title Case, uppercase, lowercase, and sentence case instantly online. Perfect for bloggers, students, and copywriters.',
    description: 'Switch between sentence, title, upper, and lowercase styles.',
    icon: Type,
    tag: 'Format',
    explanation: 'The Text Case Converter is a versatile typographical tool designed for bloggers, editors, programmers, and social media managers. It allows you to switch instantly between standard grammatical cases and programmatic naming conventions without retyping manual capitalization.',
    howToSteps: [
      'Paste your text or heading into the editor.',
      'Select your target case format from the grid (e.g., Title Case, camelCase, UPPERCASE).',
      'Click "Convert text" to transform your string.',
      'Copy your converted result instantly.'
    ],
    examples: [
      'Blog Headings: Use **Title Case** for major article titles to give them an authoritative, polished look.',
      'Grammar Polish: Use **Sentence case** when rewriting casual notes into proper grammatical prose.',
      'Coding & APIs: Use **camelCase** or **kebab-case** when formatting variable names or URL slugs.'
    ],
    faqs: [
      { q: 'How do I convert headings to Title Case?', a: 'Simply paste your heading, select Title Case, and Wordflow formats it instantly for your blog post or essay title.' },
      { q: 'What programming case formats are supported?', a: 'We support camelCase, PascalCase, snake_case, and kebab-case for developers.' },
      { q: 'Can I convert ALL CAPS text to normal sentence case?', a: 'Yes! Selecting Sentence case normalizes aggressive uppercase blocks into standard readable capitalization.' },
      { q: 'Does case conversion happen locally?', a: 'Yes, all transformations execute instantly within your browser.' }
    ],
    relatedBlogs: [
      { slug: 'typography-and-copywriting-constraints', title: 'The Typography & Copywriting Playbook: Conquering Social Media Character Limits' }
    ]
  },
  {
    id: 'diff',
    path: '/text-diff-checker',
    name: 'Text Difference Checker',
    seoTitle: 'Online Text Comparison Tool — Compare Drafts & Essays | Wordflow',
    metaDescription: 'Compare two versions of an essay, article, or code block side by side. Instantly highlight changes for editors, students, and writers.',
    description: 'Compare two pieces of text and spot edits or changes instantly.',
    icon: ArrowLeftRight,
    tag: 'Compare',
    faqs: [
      { q: 'How does it help writers and editors?', a: 'It lets you compare two drafts side by side, highlighting additions in green and deletions in red to track revisions.' }
    ],
    explanation: 'The Text Difference Checker is an advanced comparison utility built for software developers, legal reviewers, and manuscript editors. By analyzing two text revisions side-by-side using line comparison algorithms, it instantly flags insertions, deletions, and modifications.',
    howToSteps: [
      'Paste your original text draft into the left input panel.',
      'Paste your revised version into the right input panel.',
      'Review the automated comparison grid where changes are highlighted.',
      'Export the comparison report or reset fields to start over.'
    ],
    examples: [
      'Editorial Revisions: Comparing an author’s final manuscript draft against an earlier submission.',
      'Code Review: Checking configuration file modifications before committing code.',
      'Contract Analysis: Spotting subtle clause alterations in updated legal agreements.'
    ],
    relatedBlogs: [
      { slug: 'text-diffing-algorithms-version-control', title: 'Text Diffing and Version Control: How Line-By-Line Comparison Algorithms Power Editors' }
    ]
  },
  {
    id: 'reading',
    path: '/reading-time-calculator',
    name: 'Reading Time Calculator',
    seoTitle: 'Reading Time Calculator — Estimate Blog & Book Duration | Wordflow',
    metaDescription: 'Calculate how long a blog post, essay, or book manuscript takes to read. Free online tool for bloggers, teachers, and authors.',
    description: 'Estimate reading and speech time for articles and books.',
    icon: Clock3,
    tag: 'Analyze',
    faqs: [
      { q: 'Can I calculate the reading time of a full novel or article?', a: 'Yes, upload your manuscript file or paste text to instantly estimate how long it will take readers or students to finish.' }
    ],
    explanation: 'The Reading Time Calculator helps content creators, educators, and publishers evaluate audience engagement pacing. Because human attention spans vary based on content length, adding accurate reading time estimates improves user retention.',
    howToSteps: [
      'Paste your article or upload your document file.',
      'View the automated breakdown calculated at standard reading speeds (200 WPM).',
      'Analyze slow, average, and fast reading duration benchmarks.'
    ],
    examples: [
      'Content Marketing: Displaying "5 min read" banners atop blog posts to set visitor expectations.',
      'Public Speaking: Estimating speech delivery durations for conference presentations.',
      'Syllabus Planning: Assessing student reading workloads for weekly assignments.'
    ],
    relatedBlogs: [
      { slug: 'mastering-manuscript-metrics-and-pacing', title: 'Mastering Manuscript Metrics: A Comprehensive Guide to Word Counts, Pacing, and Readability' }
    ]
  },
  {
    id: 'pdf',
    path: '/pdf-line-break-cleaner',
    name: 'PDF & Document Line-Break Cleaner',
    seoTitle: 'Remove Hard Line Breaks from Academic PDFs & Documents | Wordflow',
    metaDescription: 'Fix awkward line breaks copied from academic papers, e-books, or PDF documents. Clean paragraphs smoothly for students and researchers.',
    description: 'Import PDF papers and repair awkward line breaks.',
    icon: FileText,
    tag: 'PDF',
    faqs: [
      { q: 'Why do academic PDFs have broken line breaks?', a: 'PDFs store text with hard line returns at the end of every visual line. This tool joins wrapped paragraphs back into smooth sentences.' }
    ],
    explanation: 'The PDF & Document Line-Break Cleaner solves one of the most frustrating annoyances for researchers and students: copying text from PDF journals or e-books, only to find hard line returns breaking every sentence.',
    howToSteps: [
      'Upload your PDF document or paste the broken text directly.',
      'Review the extracted text preview in the editor.',
      'Click "Clean line breaks" to stitch wrapped paragraphs back into smooth prose.',
      'Copy or download your cleaned document.'
    ],
    examples: [
      'Academic Research: Extracting clean quotation paragraphs from locked PDF research papers.',
      'E-Book Reading: Formatting copied chapters into readable notes without awkward margin breaks.'
    ],
    relatedBlogs: [
      { slug: 'architecture-of-client-side-text-utilities', title: 'The Architecture of Text: Why Modern Web Applications Are Shifting Client-Side' }
    ]
  },
  {
    id: 'social',
    path: '/social-media-character-counter',
    name: 'Social Media Text Checker',
    seoTitle: 'Social Media Character Counter & Platform Limits Tool | Wordflow',
    metaDescription: 'Check post lengths against character limits for X, Instagram, LinkedIn, and Facebook. Perfect for social media managers and bloggers.',
    description: 'Check post length against common platform limits.',
    icon: AlignLeft,
    tag: 'Social',
    faqs: [
      { q: 'What platform limits are supported?', a: 'We support character limits for X (Twitter), Instagram, TikTok, LinkedIn, Facebook, YouTube descriptions, and more.' }
    ],
    explanation: 'The Social Media Character Counter is built for social media managers, marketers, and creators who need to verify that their posts fit strict platform character caps before publishing.',
    howToSteps: [
      'Draft your social media copy in the input box.',
      'Select your target platform from the dropdown menu (e.g., X post, Instagram caption).',
      'Monitor the live progress bar and remaining character count.'
    ],
    examples: [
      'X Threads: Ensuring individual posts do not exceed the 280-character ceiling.',
      'LinkedIn Formatting: Keeping your hook well above the "See More" truncation fold.'
    ],
    relatedBlogs: [
      { slug: 'typography-and-copywriting-constraints', title: 'The Typography & Copywriting Playbook: Conquering Social Media Character Limits' }
    ]
  }
]

const blogPosts = [
  {
    slug: 'architecture-of-client-side-text-utilities',
    title: 'The Architecture of Text: Why Modern Web Applications Are Shifting Client-Side',
    seoTitle: 'The Architecture of Text: Why Modern Web Applications Are Shifting Client-Side | Wordflow Blog',
    metaDescription: 'An engineering perspective on why processing sensitive text locally in the browser via JavaScript and Web APIs outperforms traditional server roundtrips.',
    date: 'November 16, 2026',
    readTime: '8 min read',
    excerpt: 'An engineering perspective on why processing sensitive text locally in the browser via JavaScript and Web APIs outperforms traditional server-side roundtrips.',
    content: `
      For decades, the standard paradigm of web architecture relied heavily on client-server request-response cycles. When a user wanted to transform text, check word counts, format markup, or parse raw data files, their browser transmitted that payload over HTTPS to a remote backend server. The server executed string manipulation routines, queried databases if necessary, and returned the payload back to the client. While functional for general web browsing, this pattern introduces unnecessary latency, server compute overhead, and most importantly, critical privacy vulnerabilities when handling proprietary manuscripts or confidential documents.

      ### The Privacy Imperative in Data Processing
      In recent years, data privacy regulations and user expectations have undergone a seismic shift. Professionals handling legal briefs, financial ledgers, academic research drafts, or proprietary source code are increasingly reluctant to upload raw text to third-party cloud servers. Every network hop represents a potential surface area for interception, telemetry logging, or accidental retention.

      By shifting text processing entirely to the client side using modern JavaScript engines, applications achieve absolute zero-trust data handling. The payload never leaves the user's random access memory. Once the browser loads the static script bundle, every single transformation—whether regex-based line cleaning, diff comparison, or character counting—executes locally within the browser sandbox.

      ### Performance and Latency Elimination
      Network latency is bounded by the speed of light and physical infrastructure. Even a lightweight HTTP roundtrip typically incurs anywhere from 20 to 200 milliseconds of overhead depending on geographic routing and server load. When scaling to real-time operations—such as calculating word counts as a user types or running live diff comparisons across thousands of lines—relying on server requests results in sluggish UI rendering and jittery user experiences.

      Client-side execution leverages the raw processing power of the user's local hardware. Modern V8 and SpiderMonkey JavaScript engines execute complex string parsing algorithms in mere microseconds. This enables instantaneous feedback loops that preserve user concentration and maintain seamless workflow continuity.

      ### Designing Resilient Browser Utilities
      Building robust client-side utilities requires careful attention to memory management and event handling. Large document inputs containing tens of thousands of words can trigger garbage collection pauses if string concatenations are handled inefficiently. Developers must utilize optimized array manipulation, efficient regular expression design, and debounced input listeners to maintain high frame rates.

      Ultimately, the renaissance of client-side web tools proves that not every utility requires complex backend infrastructure. By respecting user privacy and maximizing local device capabilities, developers can deliver lightning-fast, secure, and infinitely scalable applications that stand the test of time.
    `
  },
  {
    slug: 'mastering-manuscript-metrics-and-pacing',
    title: 'Mastering Manuscript Metrics: A Comprehensive Guide to Word Counts, Pacing, and Readability',
    seoTitle: 'Mastering Manuscript Metrics: Word Counts, Pacing & Readability | Wordflow Blog',
    metaDescription: 'An in-depth exploration of how quantitative prose metrics, syllable distribution, and reading time estimates influence literary pacing and reader engagement.',
    date: 'November 14, 2026',
    readTime: '9 min read',
    excerpt: 'An in-depth exploration of how quantitative prose metrics, syllable distribution, and reading time estimates influence literary pacing and reader engagement.',
    content: `
      Writing is often viewed purely as an artistic discipline driven by intuition, metaphor, and emotional resonance. However, behind every successful novel, technical whitepaper, or journalistic essay lies a rigid foundation of quantitative metrics. Publishers, editors, literary agents, and digital algorithms evaluate prose through objective numerical lenses long before a human reviewer evaluates its stylistic merit.

      ### The Psychology of Reading Speed and Pacing
      Human reading comprehension is governed by cognitive load. The average adult reads between 230 and 250 words per minute under standard conditions, but pacing is rarely uniform. Complex sentence structures, dense jargon, and multi-syllabic vocabulary slow down processing speed, whereas punchy, staccato clauses accelerate momentum.

      By monitoring sentence-level word distributions and paragraph lengths, writers can consciously manipulate narrative pacing. Alternating between long, flowing descriptive sentences and short, impactful declarative statements creates a natural rhythm that prevents reader fatigue. 

      ### Industry Benchmarks Across Publishing Verticals
      Understanding standardized word count brackets is essential for anyone preparing work for publication:
      * **Short Fiction:** Ranging from 1,000 to 7,000 words, designed for single-sitting impact in literary magazines and anthologies.
      * **Novellas:** Spanning 10,000 to 40,000 words, occupying a specialized middle ground that requires concentrated narrative tension.
      * **Full-Length Novels:** Typically anchored between 70,000 and 100,000 words, balancing commercial viability with depth of world-building and character arcs.
      * **Long-Form Articles & Essays:** Optimal search visibility and sustained reader engagement peak between 1,200 and 2,500 words.

      ### The Role of Automated Metrics in Editing
      Relying solely on subjective gut feeling during self-editing is a recipe for blind spots. Authors frequently become too close to their own material to recognize structural bloat or repetitive phrasing. 

      Utilizing precise, real-time counters for characters, syllables, sentences, and estimated reading times empowers creators to audit their work objectively. Whether trimming excess adverbs to meet strict pitch guidelines or verifying that chapter lengths remain balanced across an entire manuscript, quantitative tooling bridges the gap between raw creative expression and professional polish.
    `
  },
  {
    slug: 'typography-and-copywriting-constraints',
    title: 'The Typography & Copywriting Playbook: Conquering Social Media Character Limits',
    seoTitle: 'Typography & Copywriting Playbook: Conquering Character Limits | Wordflow Blog',
    metaDescription: 'Mastering platform-specific typography rules, character bounds, and hook engineering across X, LinkedIn, Instagram, and Facebook.',
    date: 'November 12, 2026',
    readTime: '8 min read',
    excerpt: 'Mastering platform-specific typography rules, character bounds, and hook engineering across X, LinkedIn, Instagram, and Facebook.',
    content: `
      Constraint breeds creativity. Nowhere is this axiom more evident than in digital copywriting, where platform-specific typographical boundaries dictate how messages are constructed, distributed, and consumed. Crafting high-converting micro-copy requires absolute precision, where every single character, punctuation mark, and whitespace must justify its inclusion.

      ### Navigating Platform-Specific Constraints
      Every major social network enforces strict formatting rules rooted in user interface design and consumption psychology:
      * **X (formerly Twitter):** Standard accounts are capped at 280 characters. This rigorous limitation forces copywriters to distill complex value propositions into razor-sharp hooks.
      * **LinkedIn:** While supporting up to 3,000 characters, the critical design threshold occurs at approximately 210 characters—the point where the "See More" fold truncates the post. Hook placement is paramount.
      * **Instagram:** Supports captions up to 2,200 characters, but algorithmic engagement drops sharply after the initial 125-character preview window.
      * **Facebook:** Offers effectively unlimited space, though data consistently shows that concise, scannable formatting outperforms sprawling blocks of text.

      ### Anatomy of an Effective Hook
      When readers scroll through busy feeds, their attention is exceptionally fleeting. The opening sentence must immediately establish relevance, provoke curiosity, or challenge conventional wisdom. 

      Professional copywriters utilize live character and word counters during the drafting phase to test multiple headline iterations. By verifying lengths in real-time, creators ensure that their primary value proposition sits safely above the fold without risking awkward truncation by platform renderers.

      ### The Science of Micro-Typography
      Beyond simple length checks, micro-copy requires careful attention to readability formatting. Utilizing clean line breaks, strategic bullet points, and minimalist punctuation prevents visual clutter. In a digital ecosystem saturated with noise, clarity and brevity remain the ultimate competitive advantages.
    `
  },
  {
    slug: 'text-diffing-algorithms-version-control',
    title: 'Text Diffing and Version Control: How Line-By-Line Comparison Algorithms Power Editors',
    seoTitle: 'Text Diffing & Version Control: Line-by-Line Comparison Algorithms | Wordflow Blog',
    metaDescription: 'An exploration of Longest Common Subsequence algorithms, side-by-side comparison logic, and how version control transforms editing.',
    date: 'November 10, 2026',
    readTime: '8 min read',
    excerpt: 'An exploration of Longest Common Subsequence algorithms, side-by-side comparison logic, and how version control transforms editing.',
    content: `
      In both software engineering and professional publishing, tracking changes across iterative revisions is paramount. Whether a developer is reviewing a pull request in a Git repository or an editor is comparing a revised manuscript draft against an original submission, identifying precise textual alterations is critical for maintaining integrity.

      ### The Computational Challenge of Diffing
      Comparing two distinct text documents may appear straightforward to a human reader, but for a computer, it represents a complex algorithmic problem. Simply checking if two strings are identical provides no insight into *what* changed.

      Modern diff tools solve this by implementing algorithms derived from the **Longest Common Subsequence (LCS)** problem and dynamic programming. These algorithms analyze files line by line or word by word, calculating the minimum number of insertions, deletions, and modifications required to transform text A into text B.

      ### Practical Applications Across Industries
      * **Software Development:** Developers rely on diff utilities to inspect code modifications, catch logic regressions, merge branch conflicts, and review configuration payloads before production deployment.
      * **Legal and Contractual Review:** Lawyers utilize rigorous text comparison to verify clause alterations, amendment additions, and indemnity modifications across multi-page legal agreements.
      * **Editorial Publishing:** Editors track tracked changes between author drafts to evaluate structural edits, stylistic refinements, and continuity adjustments.

      ### Eliminating Manual Inspection Errors
      Manual proofreading across multiple document versions is notoriously prone to human oversight. Subtle word swaps or misplaced punctuation marks easily slip past tired eyes. 

      Instant, browser-based diff checkers automate this verification process entirely, highlighting additions in green and deletions in red with absolute mathematical precision. By removing guesswork from version control, creators safeguard their work against costly oversights.
    `
  },
  {
    slug: 'psychology-of-clean-writing-minimalism',
    title: 'The Psychology of Clean Writing: Why Minimalist Workflows Drive Deep Focus',
    seoTitle: 'The Psychology of Clean Writing: Minimalist Workflows & Focus | Wordflow Blog',
    metaDescription: 'Examining cognitive load theory, environmental decluttering, and how distraction-free web utilities preserve creative momentum and flow state.',
    date: 'November 8, 2026',
    readTime: '7 min read',
    excerpt: 'Examining cognitive load theory, environmental decluttering, and how distraction-free web utilities preserve creative momentum and flow state.',
    content: `
      Cognitive load theory posits that human working memory possesses strict capacity limitations. When knowledge workers, writers, and software developers operate within cluttered digital environments—surrounded by bloated software suites, intrusive notifications, unnecessary menus, and heavy pop-ups—cognitive fatigue sets in rapidly, degrading output quality.

      ### The Cognitive Cost of Digital Friction
      Every unnecessary click, modal dialog, and loading spinner exacts a toll on executive functioning. When a writer needs to check a word count or strip erratic line breaks from a copied paragraph, launching a heavy desktop application or navigating away to an ad-laden website disrupts concentration.

      This interruption shatters the delicate neurological state known as *flow*—the optimal psychological zone where productivity, creativity, and deep problem-solving peak. Re-entering flow after an interruption can take upwards of fifteen minutes, compounding lost productivity throughout the workday.

      ### The Power of Radical Minimalism
      Minimalist web utilities are engineered around a single core philosophy: friction reduction. By providing instant, zero-setup, client-side tools accessible directly in the browser, creators can solve micro-problems instantly and return immediately to deep work.

      ### Cultivating a Sustainable Digital Workspace
      Designing a sustainable digital workspace requires auditing your tools for simplicity and speed. Prioritizing utilities that respect your attention span, protect your privacy, and execute tasks without unnecessary fanfare allows you to produce higher-caliber work with significantly less stress. True efficiency is not about doing more things simultaneously; it is about removing the barriers that stand between intent and execution.
    `
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
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div style={{
      marginTop: '40px',
      marginBottom: '20px',
      width: '100%',
      height: '95px',
      backgroundColor: 'var(--surface-2)',
      border: '1px solid var(--line)',
      borderRadius: '12px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      boxShadow: 'var(--shadow)',
      overflow: 'hidden',
      padding: '8px 16px',
      boxSizing: 'border-box'
    }}>
      <span style={{
        fontFamily: 'Manrope, sans-serif',
        fontSize: '9px',
        fontWeight: '700',
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        color: 'var(--muted)',
        opacity: 0.6,
        marginBottom: '4px',
        lineHeight: '1'
      }}>
        Advertisement
      </span>
      <div style={{ width: '100%', height: '60px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ins className="adsbygoogle"
             style={{ display: 'inline-block', width: '100%', height: '60px' }}
             data-ad-client="ca-pub-4514134309099083"
             data-ad-slot="YOUR_AD_SLOT_ID"
             data-ad-format="horizontal"
             data-full-width-responsive="true"></ins>
      </div>
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

function BlogIndexView({ onNavigate }) {
  return (
    <div className="tool-page" style={{ maxWidth: '900px', margin: '0 auto', padding: '20px 0' }}>
      <div style={{ marginBottom: '32px' }}>
        <div className="eyebrow" style={{ color: 'var(--accent)', fontWeight: '700', marginBottom: '8px' }}>WORD FLOW BLOG</div>
        <h1 style={{ fontSize: '28px', color: 'var(--text)', marginBottom: '10px' }}>Writing & Engineering Blog</h1>
        <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.6' }}>
          Deep-dive guides, architectural essays on client-side text tools, and typography workflows for modern creators, authors, and developers.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {blogPosts.map(post => (
          <article 
            key={post.slug} 
            onClick={() => onNavigate(`/blog/${post.slug}`)}
            style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--line)',
              borderRadius: '14px',
              padding: '24px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: 'var(--shadow)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', color: 'var(--muted)', marginBottom: '8px' }}>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            <h2 style={{ fontSize: '18px', color: 'var(--text)', marginBottom: '10px', lineHeight: '1.4' }}>{post.title}</h2>
            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: '1.7', marginBottom: '16px' }}>{post.excerpt}</p>
            <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              Read full article <ArrowUpRight size={14} />
            </span>
          </article>
        ))}
      </div>
      <AdContainer />
    </div>
  )
}

function BlogPostView({ slug, onNavigate }) {
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className="tool-page" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
        <h2>Article not found</h2>
        <p style={{ color: 'var(--muted)', margin: '16px 0' }}>The article you are looking for does not exist or has been moved.</p>
        <button className="button primary" onClick={() => onNavigate('/blog')}>Back to Blog</button>
      </div>
    )
  }

  return (
    <div className="tool-page" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px 0', lineHeight: '1.8' }}>
      <button className="back-link" onClick={() => onNavigate('/blog')} style={{ marginBottom: '24px' }}>
        <ArrowLeft size={16}/> Back to Blog
      </button>

      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: 'var(--muted)', marginBottom: '12px' }}>
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
        <h1 style={{ fontSize: '30px', color: 'var(--text)', lineHeight: '1.3', marginBottom: '16px' }}>{post.title}</h1>
        <p style={{ fontSize: '16px', color: 'var(--muted)', fontStyle: 'italic', borderLeft: '3px solid var(--accent)', paddingLeft: '16px' }}>
          {post.excerpt}
        </p>
      </div>

      <div className="blog-content" style={{ color: 'var(--text)', fontSize: '15px' }}>
        {post.content.split('\n\n').map((paragraph, index) => {
          const trimmed = paragraph.trim()
          if (!trimmed) return null
          if (trimmed.startsWith('###')) {
            return <h3 key={index} style={{ fontSize: '20px', marginTop: '32px', marginBottom: '14px', color: 'var(--text)' }}>{trimmed.replace('###', '').trim()}</h3>
          }
          if (trimmed.startsWith('* ')) {
            return (
              <ul key={index} style={{ paddingLeft: '20px', marginBottom: '16px', color: 'var(--muted)' }}>
                {trimmed.split('\n').map((li, i) => (
                  <li key={i} style={{ marginBottom: '6px' }}>{li.replace('* ', '').trim()}</li>
                ))}
              </ul>
            )
          }
          return <p key={index} style={{ marginBottom: '20px', color: 'var(--muted)', lineHeight: '1.8' }}>{trimmed}</p>
        })}
      </div>

      <div style={{ marginTop: '40px', padding: '24px', background: 'var(--surface-2)', borderRadius: '14px', border: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h4 style={{ fontSize: '14px', color: 'var(--text)', marginBottom: '4px' }}>Enjoyed this article?</h4>
          <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0 }}>Explore Wordflow's free suite of client-side text tools.</p>
        </div>
        <button className="button primary" onClick={() => onNavigate('/')}>Explore Tools</button>
      </div>

      <AdContainer />
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

    {/* RICH SEO EDITORIAL CONTENT SECTION (300-600 words per tool) */}
    <section style={{ marginTop: '50px', padding: '32px', background: 'var(--surface-2)', borderRadius: '16px', border: '1px solid var(--line)', lineHeight: '1.8' }}>
      <h2 style={{ fontSize: '20px', color: 'var(--text)', marginBottom: '12px' }}>About {tool.name}</h2>
      <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '24px' }}>{tool.explanation}</p>

      <h3 style={{ fontSize: '16px', color: 'var(--text)', marginBottom: '12px' }}>How to Use {tool.name}</h3>
      <ol style={{ paddingLeft: '20px', marginBottom: '24px', color: 'var(--muted)', fontSize: '13px' }}>
        {tool.howToSteps.map((step, idx) => (
          <li key={idx} style={{ marginBottom: '8px' }}>{step}</li>
        ))}
      </ol>

      <h3 style={{ fontSize: '16px', color: 'var(--text)', marginBottom: '12px' }}>Real-World Use Cases & Examples</h3>
      <ul style={{ paddingLeft: '20px', marginBottom: '24px', color: 'var(--muted)', fontSize: '13px' }}>
        {tool.examples.map((ex, idx) => (
          <li key={idx} style={{ marginBottom: '8px' }}>{ex}</li>
        ))}
      </ul>

      {tool.faqs && tool.faqs.length > 0 && (
        <>
          <h3 style={{ fontSize: '16px', color: 'var(--text)', marginBottom: '12px' }}>Frequently Asked Questions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
            {tool.faqs.map((faq, index) => (
              <div key={index} style={{ borderBottom: index < tool.faqs.length - 1 ? '1px solid var(--line)' : 'none', paddingBottom: index < tool.faqs.length - 1 ? '12px' : '0' }}>
                <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text)', marginBottom: '4px' }}>{faq.q}</strong>
                <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0, lineHeight: '1.6' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {tool.relatedBlogs && tool.relatedBlogs.length > 0 && (
        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--line)' }}>
          <h3 style={{ fontSize: '14px', color: 'var(--text)', marginBottom: '10px' }}>Related Articles & Guides</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {tool.relatedBlogs.map((blog) => (
              <button 
                key={blog.slug} 
                onClick={() => onNavigate(`/blog/${blog.slug}`)}
                className="button"
                style={{ fontSize: '11px', padding: '8px 12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <BookOpen size={13} /> {blog.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>

    <AdContainer />
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
  const isBlogIndex = currentPath === '/blog'
  const isBlogPost = currentPath.startsWith('/blog/')
  const activeBlogPostSlug = isBlogPost ? currentPath.replace('/blog/', '') : null
  const currentBlogPostData = isBlogPost ? blogPosts.find(p => p.slug === activeBlogPostSlug) : null

  useEffect(() => {
    let metaDesc = document.querySelector('meta[name="description"]')
    if (selectedTool) {
      document.title = selectedTool.seoTitle
      if (metaDesc) metaDesc.setAttribute('content', selectedTool.metaDescription)
    } else if (isBlogIndex) {
      document.title = 'Wordflow Blog — Writing, Typography & Client-Side Tools'
      if (metaDesc) metaDesc.setAttribute('content', 'Explore in-depth articles on manuscript metrics, typography rules, version control diffing, and client-side web tool architecture.')
    } else if (isBlogPost && currentBlogPostData) {
      document.title = currentBlogPostData.seoTitle
      if (metaDesc) metaDesc.setAttribute('content', currentBlogPostData.metaDescription)
    } else if (currentPath === '/about') {
      document.title = 'About Wordflow — Make Every Word Work Better'
      if (metaDesc) metaDesc.setAttribute('content', 'Learn more about Wordflow, a collection of simple, free online text tools designed to make everyday writing easier.')
    } else if (currentPath === '/privacy-policy') {
      document.title = 'Privacy Policy — Wordflow'
      if (metaDesc) metaDesc.setAttribute('content', 'Read the Wordflow Privacy Policy to understand how client-side text processing works.')
    } else if (currentPath === '/terms-of-use') {
      document.title = 'Terms of Use — Wordflow'
      if (metaDesc) metaDesc.setAttribute('content', 'Review the terms and conditions for using Wordflow text utilities.')
    } else {
      document.title = 'Wordflow — Free Private Online Text Utilities & Tools'
      if (metaDesc) metaDesc.setAttribute('content', 'Simple, private text tools to clean, compare, count and format text directly in your browser.')
    }
  }, [currentPath, selectedTool, isBlogIndex, isBlogPost, currentBlogPostData])

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
        <button className={`nav-item ${isBlogIndex || isBlogPost ? 'active' : ''}`} onClick={() => navigate('/blog')}>
          <BookOpen size={17}/>Blog
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
            <strong>{currentPath === '/about' ? 'About' : currentPath === '/privacy-policy' ? 'Privacy Policy' : currentPath === '/terms-of-use' ? 'Terms of Use' : isBlogIndex ? 'Blog' : isBlogPost ? 'Article' : selectedTool?.name || 'Overview'}</strong>
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
        ) : isBlogIndex ? (
          <BlogIndexView onNavigate={navigate} />
        ) : isBlogPost ? (
          <BlogPostView slug={activeBlogPostSlug} onNavigate={navigate} />
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
                <a href="/blog" onClick={(e) => { e.preventDefault(); navigate('/blog'); }} style={{ color: 'var(--text)', textDecoration: 'none' }}>Blog</a>
                <span>|</span>
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