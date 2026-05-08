import SiteClient from '@/components/SiteClient'
import {
  getAboutData,
  getHobbiesData,
  getCreationsData,
  getDiaryData,
  getNotesData,
  getResumeData,
} from '@/lib/content'

export default async function HomePage() {
  const [aboutData, hobbiesData, creationsData, diaryData, notesData, resumeData] = await Promise.all([
    getAboutData(),
    getHobbiesData(),
    getCreationsData(),
    getDiaryData(),
    getNotesData(),
    getResumeData(),
  ])

  return (
    <SiteClient
      aboutData={aboutData}
      hobbiesData={hobbiesData}
      creationsData={creationsData}
      diaryData={diaryData}
      notesData={notesData}
      resumeData={resumeData}
    />
  )
}
