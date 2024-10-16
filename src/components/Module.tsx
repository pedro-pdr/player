import { ChevronDown } from "lucide-react";
import { Lesson } from "./Lesson";

import * as Collapsible from '@radix-ui/react-collapsible'
import { useStore } from "../zustand-store";

interface ModuleProps {
  title: string
  moduleIndex: number
  amountOfLessons: number
}

export function Module({ title, moduleIndex, amountOfLessons }: ModuleProps) {
  const { currentLessonIndex, currentModuleIndex, play, lessons } = useStore(store => {
    return {
      lessons: store.course?.modules[moduleIndex].lessons,
      currentLessonIndex: store.currentLessonIndex,
      currentModuleIndex: store.currentModuleIndex,
      play: store.play
    }
  })

  return(
    <Collapsible.Root className="group">
    <Collapsible.Trigger className="flex w-full items-center gap-3 bg-background/40 p-4">
      <div className="flex h-10 w-10 rounded-full items-center justify-center border-2 border-muted-foreground bg-background text-sm font-medium">{moduleIndex + 1}</div>
    
      <div className="flex flex-col gap-1 text-left">
        <strong className="text-sm text-foreground">{title}</strong>
        <span className="text-sm text-foreground">{amountOfLessons} aulas</span>
      </div>

      <ChevronDown className="w-5 h-5 ml-auto text-muted-foreground group-data-[state=open]:rotate-180 transition-transform duration-500"/>
    </Collapsible.Trigger>

    <Collapsible.Content>
      <nav className="relative flex flex-col gap-4 p-6 bg-muted/90">
        {lessons && lessons.map((lesson, lessonIndex) => {
          const isCurrent = currentModuleIndex === moduleIndex &&
            currentLessonIndex === lessonIndex

          return (
            <Lesson 
              key={lesson.id} 
              title={lesson.title} 
              duration={lesson.duration} 
              onPlay={() => play([moduleIndex, lessonIndex])}
              isCurrent={isCurrent}
            />
          )
        })}
      </nav>
    </Collapsible.Content>
    </Collapsible.Root>
  )
}
