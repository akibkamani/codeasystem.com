import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'))
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'))
const LegalPage = lazy(() => import('./pages/LegalPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

export default function App() { return <Layout><Suspense fallback={null}><Routes><Route path="/" element={<HomePage />} /><Route path="/case-study" element={<CaseStudiesPage />} /><Route path="/case-study/:slug" element={<CaseStudyPage />} /><Route path="/:page" element={<LegalPage />} /><Route path="/404" element={<NotFoundPage />} /><Route path="*" element={<Navigate to="/404" replace />} /></Routes></Suspense></Layout> }
