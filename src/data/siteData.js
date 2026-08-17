import { Code2, Database, Layers3, Sparkles } from 'lucide-react'

export const services = [
  { icon: Sparkles, number: '01', title: 'AI & GenAI', text: 'Useful AI systems grounded in your data and built around real workflows.', tags: ['RAG applications', 'AI assistants', 'Document intelligence', 'AI automation'] },
  { icon: Database, number: '02', title: 'Backend systems', text: 'Reliable foundations for products that need to work as they grow.', tags: ['FastAPI / Python', 'PostgreSQL', 'Payments & auth', 'Realtime systems'] },
  { icon: Layers3, number: '03', title: 'SaaS & MVPs', text: 'Focused products that get the important use case into customers’ hands.', tags: ['Subscription products', 'Customer portals', 'Admin systems', 'Internal tools'] },
  { icon: Code2, number: '04', title: 'Web & growth', text: 'Clear, fast websites and the content systems that support them.', tags: ['Business websites', 'Landing pages', 'Technical SEO', 'Content systems'] },
]

export const solutions = [
  {
    slug: 'ai-knowledge-assistant', title: 'AI Knowledge Assistant', text: 'Give your team a secure way to chat with company documents and data.', tags: 'Knowledge, search, answers',
    challenge: 'Policies, project files and past decisions are spread across drives, wikis and inboxes. People waste time hunting for answers or asking the same questions again.',
    approach: 'We connect the approved knowledge sources, set access rules by team or role, and create an assistant that answers in plain language with links back to the original source.',
    impact: 'Your organisation gets faster onboarding, fewer interruptions for subject experts, and a reliable place for staff to find the current answer without exposing sensitive information.',
  },
  {
    slug: 'rag-platform', title: 'RAG Platform', text: 'Search, retrieve, and answer from your sources with clear citations.', tags: 'RAG, retrieval, citations',
    challenge: 'A standard chatbot can sound confident without showing where an answer came from. That makes it hard for teams to trust it when decisions depend on internal information.',
    approach: 'We build a retrieval layer that indexes your documents, selects the relevant material for each question, and returns answers with clear citations and source excerpts.',
    impact: 'Teams can use AI for research and decision support while checking the evidence themselves. It brings more consistency to answers across operations, sales and client-facing work.',
  },
  {
    slug: 'ai-customer-support', title: 'AI Customer Support', text: 'Resolve common questions faster using your own company knowledge.', tags: 'Support, automation, AI',
    challenge: 'Support teams spend a large part of the day answering repeat questions, while customers wait for simple help and complex cases compete for attention.',
    approach: 'We turn your help content, product documentation and support history into an assistant that can answer routine queries, collect the right details and hand off when a person is needed.',
    impact: 'Customers get useful answers sooner, agents have more time for difficult cases, and leaders can see which questions point to gaps in the product or documentation.',
  },
  {
    slug: 'saas-mvp', title: 'SaaS MVP', text: 'Take a product from idea through a usable, deployed first version.', tags: 'Product, payments, launch',
    challenge: 'A promising product idea can lose momentum when the first build tries to cover every possible feature before anyone has used it.',
    approach: 'We define the smallest useful workflow, design the product around real users, and build a secure first release with the essentials such as accounts, payments and feedback loops.',
    impact: 'Your organisation can test demand with real customers, learn what deserves investment, and create a solid base for the product instead of funding a speculative build.',
  },
  {
    slug: 'custom-backend', title: 'Custom Backend', text: 'APIs, data, jobs, integrations and infrastructure built to last.', tags: 'API, database, infrastructure',
    challenge: 'As a product grows, quick fixes and disconnected tools create unreliable data, manual work and a system that becomes risky to change.',
    approach: 'We design the APIs, data model, background jobs and integrations around the business rules that matter, with observability and sensible access controls built in.',
    impact: 'Your organisation gains a dependable foundation for new features and connected tools. Teams spend less time resolving operational issues and can change the product with more confidence.',
  },
  {
    slug: 'workflow-automation', title: 'Workflow Automation', text: 'Replace repetitive steps with dependable automated workflows.', tags: 'Operations, integrations, jobs',
    challenge: 'Important work is often held together by spreadsheets, copy-pasting and reminders. The process is slow, difficult to audit and easy to get wrong when volumes rise.',
    approach: 'We map the current process, connect the systems involved, and automate repeatable steps with clear approvals, exception handling and notifications for the people who need them.',
    impact: 'Your organisation reduces repetitive admin, avoids preventable errors and gives teams a clearer view of work in progress. People can focus on decisions and customer work instead of chasing tasks.',
  },
]

export const steps = [
  ['01', 'Describe your project', 'Share the problem, required features, timing and budget.'],
  ['02', 'Requirements review', 'We clarify the details asynchronously by email or chat.'],
  ['03', 'Scope & quote', 'You receive a clear scope, timeline, price and milestones.'],
  ['04', 'Build & deploy', 'We build against milestones, review together, then hand it over.'],
]

export const legalPages = {
  privacy: { eyebrow: 'Privacy Policy', title: 'Your data and this site', updated: 'Last updated: April 25, 2026', sections: [['No Accounts or Forms', 'This is a static site with no login and no direct contact form. We do not collect personal data through account creation or on-site submissions.'], ['Analytics and Ads', 'Optional analytics or advertising scripts may be enabled to understand traffic and support the project. If enabled, third-party providers may use cookies based on their own policies.'], ['External Platforms', 'Links to social channels and external platforms are governed by the privacy policies of those platforms, not this website.'], ['Data Requests', 'Because no user account system is maintained on this site, there may be limited data available to access, export, or delete.'], ['Official Channels', 'For questions about this policy, please contact CodeASystem through our official social channels.']] },
  terms: { eyebrow: 'Terms', title: 'Terms of use', updated: 'Last updated: April 25, 2026', sections: [['Informational Content', 'Content on this site is shared for informational purposes. You may share links with attribution. Republishing full content may require permission.'], ['Not Professional Advice', 'Posts reflect technical opinions and experience. They are not legal, financial, or professional advice, and you are responsible for evaluating fit for your own use case.'], ['Availability', 'We may update, edit, or remove content at any time. Continuous uptime and uninterrupted access are not guaranteed.'], ['Liability', 'To the maximum extent permitted by law, CodeASystem is not liable for losses arising from use of this website or reliance on its content.'], ['Official Channels', 'For questions about these terms, please contact CodeASystem through our official social channels.']] },
}
