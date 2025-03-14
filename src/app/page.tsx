import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, MapPin, Twitter } from "lucide-react"
import Link from "next/link"
import ContactForm from "./components/contact-form"
import ImageCarousel from "./components/image-carousel"
import ProfileImage from "./components/profile-image"
import ProjectCard from "./components/project-card"
import TechStack from "./components/tech-stack"

// Placeholder images for the carousel with unique IDs
const carouselImages = [
  {
    src: "/placeholder.svg",
    alt: "Placeholder 1",
    id: "image-1",
  },
  {
    src: "/placeholder.svg",
    alt: "Placeholder 2",
    id: "image-2",
  },
  {
    src: "/placeholder.svg",
    alt: "Placeholder 3",
    id: "image-3",
  },
]

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <span className="font-bold">Luke Smith</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="#about" className="transition-colors hover:text-foreground/80">
                About
              </Link>
              <Link href="#projects" className="transition-colors hover:text-foreground/80">
                Projects
              </Link>
              <Link href="#experience" className="transition-colors hover:text-foreground/80">
                Experience
              </Link>
              <Link href="#contact" className="transition-colors hover:text-foreground/80">
                Contact
              </Link>
            </nav>
          </div>
          <Button variant="outline" className="ml-auto" asChild>
            <Link href="/resume.pdf" target="_blank">
              Resume
            </Link>
          </Button>
        </div>
      </header>

      <main className="container px-4 md:px-6">
        <section id="about" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <ProfileImage src="/placeholder.svg" alt="Luke Smith" className="mb-6" />
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Software Engineer & Blockchain Developer
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Full-stack developer specializing in blockchain technology and DeFi solutions. Currently a student at
                  Baylor University.
                </p>
                <div className="flex items-center justify-center gap-2 text-muted-foreground mt-2">
                  <MapPin className="h-4 w-4" />
                  <span>Waco, TX</span>
                </div>
              </div>
              <div className="flex space-x-4">
                <Link href="https://github.com/lukesmith25" target="_blank">
                  <Button variant="outline" size="icon">
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
                <Link href="https://linkedin.com/in/luke-smith" target="_blank">
                  <Button variant="outline" size="icon">
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
                <Link href="https://twitter.com/lukesmith" target="_blank">
                  <Button variant="outline" size="icon">
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Twitter</span>
                  </Button>
                </Link>
                <Link href="mailto:luke_smith10@baylor.edu">
                  <Button variant="outline" size="icon">
                    <Mail className="h-4 w-4" />
                    <span className="sr-only">Email</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <ImageCarousel images={carouselImages} />
        </section>

        <section id="projects" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">Projects</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ProjectCard
                title="Solana Tax Application"
                description="A first-of-its-kind tax app for the Solana blockchain, filling a significant gap in the ecosystem. Processes wallet transactions and generates tax reports."
                placeholderType="gradient"
                link="https://github.com/lukesmith25"
                tags={["FastAPI", "PostgreSQL", "Docker", "Solana"]}
              />
              <ProjectCard
                title="Data Reprocessing Tool"
                description="Support tool for John Deere that optimized data pipeline operations, cutting manual task time by 30%. Enhanced database traceability with AWS solutions."
                placeholderType="dots"
                link="https://github.com/lukesmith25"
                tags={["Java Spring", "Next.js", "PostgreSQL", "AWS"]}
              />
              <ProjectCard
                title="Anti-Fraud Blockchain Solution"
                description="Secure blockchain-based solution to mitigate fraud, showcasing full-stack capabilities. Delivered a user-friendly interface with agile development."
                placeholderType="lines"
                link="https://github.com/lukesmith25"
                tags={["React", "Node.js", "MongoDB", "Solana"]}
              />
            </div>
          </div>
        </section>

        <section id="experience" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
              Experience
            </h2>
            <div className="space-y-10">
              <div className="border rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">Developer Relations Intern</h3>
                    <p className="text-muted-foreground">Marginfi</p>
                  </div>
                  <p className="text-sm text-muted-foreground">September 2024 - Present</p>
                </div>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Created technical content and led developer integrations, resulting in a 15% increase in SDK
                    adoption.
                  </li>
                  <li>
                    Engaged with the developer community to drive adoption of Marginfi's DeFi solutions, contributing to
                    $50M in platform cashflows.
                  </li>
                  <li>
                    Launched a developer podcast series featuring Solana founders, increasing platform awareness by 20%.
                  </li>
                </ul>
              </div>

              <div className="border rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">Software Engineer Intern</h3>
                    <p className="text-muted-foreground">John Deere: Intelligent Solutions Group</p>
                  </div>
                  <p className="text-sm text-muted-foreground">May 2024 - August 2024</p>
                </div>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Developed a Java Spring/Next.js tool, reducing data reprocessing time by 30% and improving
                    operational visibility.
                  </li>
                  <li>
                    Implemented a PostgreSQL database to enhance traceability and secure deployment with AWS Secrets
                    Manager.
                  </li>
                  <li>Delivered production-ready solutions under tight deadlines, achieving key project milestones.</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">Co-Founder</h3>
                    <p className="text-muted-foreground">Vlyss</p>
                  </div>
                  <p className="text-sm text-muted-foreground">May 2023 - Present</p>
                </div>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Led development of a first-of-its-kind tax app for the Solana blockchain using FastAPI, PostgreSQL,
                    and Docker, filling a significant gap in the ecosystem.
                  </li>
                  <li>
                    Built a backend to process wallet transactions and generate tax reports, integrating APIs for
                    accurate on-chain data collection.
                  </li>
                  <li>
                    Managed agile development, driving timely project delivery to support Solana users' tax reporting
                    needs.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">Education</h2>
            <div className="border rounded-lg p-6 max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">Baylor University</h3>
                  <p className="text-muted-foreground">Bachelor of Science in Software Engineering</p>
                </div>
                <p className="text-sm text-muted-foreground">Expected May 2025</p>
              </div>
              <p className="text-sm">
                <span className="font-medium">Relevant Coursework:</span> Software Engineering I & II, Algorithms & Data
                Structures, Systems Programming, Database Design, Data Communications, Operating Systems
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
              Tech Stack
            </h2>
            <TechStack />
          </div>
        </section>

        <section id="contact" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
                Get in Touch
              </h2>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
          <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Luke Smith. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="https://lukesmith25.github.io/PortfolioWebsite/"
            >
              Portfolio
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href="mailto:luke_smith10@baylor.edu">
              luke_smith10@baylor.edu
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

