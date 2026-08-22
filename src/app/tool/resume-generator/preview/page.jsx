import ResumeSharePreview from '@/components/ResumeSharePreview'

export const metadata = {
  title: 'Shared Resume Preview',
  description: 'Preview a resume created with the free CodeASystem resume builder.',
  robots: { index: false, follow: false },
}

export default function ResumePreviewPage() {
  return <ResumeSharePreview />
}
