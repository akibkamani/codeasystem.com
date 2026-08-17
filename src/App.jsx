import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import CaseStudiesPage from './pages/CaseStudiesPage'
import CaseStudyPage from './pages/CaseStudyPage'
import HomePage from './pages/HomePage'
import LegalPage from './pages/LegalPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() { return <Layout><Routes><Route path="/" element={<HomePage />} /><Route path="/case-study" element={<CaseStudiesPage />} /><Route path="/case-study/:slug" element={<CaseStudyPage />} /><Route path="/:page" element={<LegalPage />} /><Route path="/404" element={<NotFoundPage />} /><Route path="*" element={<Navigate to="/404" replace />} /></Routes></Layout> }
