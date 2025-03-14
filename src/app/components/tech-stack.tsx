import { Card } from "@/components/ui/card"

const technologies = [
  {
    category: "Languages",
    skills: ["Java", "Python", "C++", "JavaScript", "SQL", "TypeScript"],
  },
  {
    category: "Frameworks & Technologies",
    skills: ["Spring Boot", "Next.js", "React", "TailwindCSS", "FastAPI", "Docker", "Solana Blockchain", "Web3"],
  },
  {
    category: "Tools",
    skills: ["AWS (Secrets Manager)", "PostgreSQL", "MongoDB", "Figma", "GitHub", "JetBrains IDEs"],
  },
  {
    category: "Methodologies",
    skills: ["Agile", "Scrum", "API Design", "Systems Analysis"],
  },
]

export default function TechStack() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {technologies.map((tech) => (
        <Card key={tech.category} className="p-6">
          <h3 className="text-lg font-semibold mb-4">{tech.category}</h3>
          <div className="flex flex-wrap gap-2">
            {tech.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}

