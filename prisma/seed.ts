import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, JobType } from "../src/generated/prisma/client";

const connectionString =
  process.env.DATABASE_URL ??
  "postgresql://tuppl:tupplpass@localhost:5432/tuppl?schema=public";

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const jobs = [
  {
    title: "QA Automation Engineer",
    jobId: "QAE-001",
    slug: "qa-automation-engineer",
    department: "Engineering",
    location: "Irving, TX",
    type: JobType.FULL_TIME,
    description:
      "Join our quality assurance team as a QA Automation Engineer and help ensure the highest quality of our software products through comprehensive testing strategies and automation frameworks.",
    responsibilities:
      "Design, develop, and maintain automated test scripts using industry-standard tools and frameworks (e.g., Selenium, TestNG, JUnit, or similar). Write SQL queries and use APIs for backend testing. Write various test scripts utilizing BDD Cucumber, Java, and Selenium WebDriver. Develop, document, and maintain test cases, test scripts, and test data for manual and automated testing. Conduct manual testing as needed to support feature releases and validate critical issues. Implement and maintain test automation frameworks and processes that drive efficient and reliable testing. Monitor and manage test environments to ensure availability and stability for automated test execution. Participate in code reviews and provide feedback to improve the quality of the codebase. Continuously improve testing methodologies and tools to enhance test coverage and efficiency. Stay up-to-date with industry trends and emerging technologies to ensure the adoption of best practices in test automation.",
    qualifications:
      "Bachelor's in Computer Science or related field and 6 months experience",
  },
  {
    title: "Software Engineer",
    jobId: "SE-002",
    slug: "software-engineer",
    department: "Engineering",
    location: "Remote",
    type: JobType.REMOTE,
    description:
      "We are seeking a talented Software Engineer to join our development team. You will be responsible for designing, developing, and maintaining high-quality software applications using modern technologies and best practices.",
    responsibilities:
      "Design, develop, and maintain software applications using one or more industry standard programming languages such as C#, C++, C, ASP.NET MVC, Java, Python, Angular, React and other similar languages. Build web services (REST, SOAP) using REST and/or SOAP APIs. Develop and integrate APIs to enable seamless communication between services and components. Implement responsive and dynamic front-end interfaces using React or Angular or other similar frameworks. Participate in code reviews, providing constructive feedback to peers and ensuring adherence to best practices. Troubleshoot and resolve software defects and production issues. Ensure software quality through unit, integration, and performance testing. Continuously learn and apply new technologies, frameworks, and tools to improve development efficiency and software quality.",
    qualifications:
      "Bachelor's in Computer Science or related field and 6 months experience",
  },
  {
    title: "Technical Business Analyst",
    jobId: "TBA-003",
    slug: "technical-business-analyst",
    department: "Business Analysis",
    location: "Irving, TX",
    type: JobType.CONTRACT,
    description:
      "We are looking for a Technical Business Analyst to bridge the gap between business stakeholders and technical teams. You will analyze business processes, gather requirements, and help translate business needs into technical solutions.",
    responsibilities:
      "Analyze and document business processes, workflows, and system interactions to identify areas for improvement. Develop detailed functional and technical specifications and system design documents to guide development teams. Write user stories, acceptance criteria, conduct JAD sessions and actively participate in all Agile ceremonies. Create process flow diagrams and workflows using various diagramming tools such as Visio, Whimsical or other similar tools. Ensure all the stories are executable, testable and complete. Provide detailed walkthrough of the feature to all the stakeholders. Facilitate and lead requirements-gathering sessions, workshops, and meetings with stakeholders across different business units. Conduct impact analysis and feasibility studies for proposed system changes and enhancements. Create and maintain comprehensive documentation of business processes, system configurations, and user guides.",
    qualifications:
      "Bachelor's in any Computer Science or Business Administration related field and 6 months experience",
  },
];

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@tuppl.com";
  const password = process.env.ADMIN_PASSWORD ?? "Admin123!";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash, role: "ADMIN", name: "Tuppl Admin" },
    create: {
      name: "Tuppl Admin",
      email,
      passwordHash,
      role: "ADMIN",
    },
  });

  for (const job of jobs) {
    await prisma.job.upsert({
      where: { slug: job.slug },
      update: { ...job, isActive: true },
      create: { ...job, isActive: true },
    });
  }

  console.log(`Seeded admin (${email}) and ${jobs.length} jobs.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
