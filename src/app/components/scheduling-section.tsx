import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CalendlyIntegration from "./calendly-integration"

interface SchedulingSectionProps {
  calendlyUrl: string
  title?: string
  description?: string
  inline?: boolean
}

export default function SchedulingSection({
  calendlyUrl,
  title = "Let's Connect",
  description = "Schedule a time to discuss your project, opportunities, or just to chat.",
  inline = false,
}: SchedulingSectionProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {inline ? (
          <CalendlyIntegration url={calendlyUrl} inline={true} className="w-full" />
        ) : (
          <div className="text-center">
            <p className="mb-6 text-muted-foreground">
              I&apos;m always open to discussing new projects, opportunities, or how I can help with your blockchain and
              software development needs.
            </p>
            <CalendlyIntegration 
              url={calendlyUrl} 
              buttonText="Schedule a Meeting" 
              className="w-full md:w-auto"
              size="lg"
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

