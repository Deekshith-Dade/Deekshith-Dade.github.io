import fs from 'fs';
import path from 'path';
import Navbar from '@/components/Navbar'
import Experience from '@/components/Experience';
import Climax from "@/components/Climax";
import React from 'react'
import { User, Briefcase, GraduationCap, Code, Database, Cloud } from 'lucide-react';

export const metadata = {
  title: "About",
  description:
    "Deekshith Dade — ML engineer with 3+ years of experience in deep learning and software development.",
};

async function Page() {
  const experience = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "public", "experience.json"), "utf8")
  );
  const education = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "public", "education.json"), "utf8")
  );

  const skills = [
    {
      category: "Programming Languages",
      items: ["Python", "C++", "Java", "JavaScript", "TypeScript", "Go", "Node.js"]
    },
    {
      category: "Data Science & ML",
      items: ["Statistics", "Probability", "Scikit-Learn", "Pandas", "Numpy", "Matplotlib", "Pyspark", "OpenCV"]
    },
    {
      category: "Frameworks",
      items: ["PyTorch", "TensorFlow", "ReactJS", "Flask", "Django", "Spring", "Spring Boot"]
    },
    {
      category: "Cloud Technologies",
      items: ["Amazon Web Services (AWS)", "Microsoft Azure", "Google Cloud Platform (GCP)"]
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-8">
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-center gap-2 text-gray-700 mb-4">
                  <User size={24} />
                  <span className="text-lg font-medium">About Me</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">Deekshith Dade</h1>
                <p className="text-xl text-black/80 max-w-4xl mx-auto leading-relaxed">
                  Over 3 years of experience in software development and research with proficiency in Deep Learning and Web Development.
                  Ability to collaborate with talented teams and contribute to cutting-edge projects, leveraging technical expertise
                  and research acumen to deliver impactful solutions with the ability to master new technologies and adapt to evolving tech stacks quickly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-12">
              <div className="text-center space-y-4 animate-fade-in">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Skills & Expertise</h2>
                <p className="text-lg text-black/80 max-w-2xl mx-auto">
                  A comprehensive toolkit of technologies and frameworks I use to build innovative solutions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-up">
                {skills.map((skillGroup, index) => (
                  <div key={index} className="card space-y-4">
                    <div className="flex items-center gap-3">
                      {index === 0 && <Code size={20} className="text-gray-700" />}
                      {index === 1 && <Database size={20} className="text-gray-700" />}
                      {index === 2 && <Code size={20} className="text-gray-700" />}
                      {index === 3 && <Cloud size={20} className="text-gray-700" />}
                      <h3 className="text-xl font-semibold text-gray-900">{skillGroup.category}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-full border border-gray-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              <div className="text-center space-y-4 animate-fade-in">
                <div className="flex items-center justify-center gap-2 text-gray-700 mb-4">
                  <Briefcase size={24} />
                  <span className="text-lg font-medium">Professional Experience</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Work History</h2>
              </div>

              <div className="space-y-8 animate-slide-up">
                {experience && experience.map((exp, index) => (
                  <Experience
                    key={index}
                    open={false}
                    title={exp.title}
                    company={exp.company}
                    duration={exp.duration}
                    icon={exp.icon}
                  >
                    <ul className="space-y-2">
                      {exp.description.map((desc, idx) => (
                        <li className="text-black/80 leading-relaxed" key={idx}>
                          • {desc}
                        </li>
                      ))}
                    </ul>
                  </Experience>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              <div className="text-center space-y-4 animate-fade-in">
                <div className="flex items-center justify-center gap-2 text-gray-700 mb-4">
                  <GraduationCap size={24} />
                  <span className="text-lg font-medium">Education</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Academic Background</h2>
              </div>

              <div className="space-y-8 animate-slide-up">
                {education && education.map((edu, index) => (
                  <Experience
                    key={index}
                    open={false}
                    title={edu.title}
                    company={edu.company}
                    duration={edu.duration}
                    icon={edu.icon}
                  >
                    <ul className="space-y-2">
                      {edu.description.map((desc, idx) => (
                        <li className="text-black/80 leading-relaxed" key={idx}>
                          • {desc}
                        </li>
                      ))}
                    </ul>
                  </Experience>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Link */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-6 animate-slide-up">
              <h3 className="text-2xl font-bold text-gray-900">Want to see my work?</h3>
              <p className="text-black/80 max-w-2xl mx-auto">
                Explore my projects to see how I apply these skills to solve real-world problems.
              </p>
              <a
                href="/projects"
                className="btn-primary inline-flex items-center"
              >
                View Projects
              </a>
            </div>
          </div>
        </section>
      </main>

      <Climax />
    </div>
  )
}

export default Page