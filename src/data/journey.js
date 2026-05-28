// ─── Academic Journey Data ────────────────────────────────────────
// status: "completed" | "active" | "upcoming"
// module type: "discipline" | "project" | "event" | "certification"
// attachment type: "pdf" | "github" | "link" | "figma"

export const journeyMeta = {
  course: "Systems Analysis & Development",
  institution: "Faculdade SENAC",
  location: "Caruaru, PE — Brazil",
  started: "02/03/2026",
  ends: "22/09/2026",
  workload: "2160h",
  startDate: new Date("2026-03-02"),
  endDate: new Date("2026-09-22"),
};

export const semesters = [
  {
    id: "s1",
    number: "01",
    period: "2026",
    label: "Foundations",
    status: "completed",
    overview:
      "First contact with the pillars of computing. Logic, the web, and the first lines of code. This semester planted the roots of how I think about problems.",
    modules: [
      {
        id: "m1-1",
        name: "Algorithms & Programming Logic",
        type: "discipline",
        description:
          "Flowcharts, pseudocode, and the fundamentals of computational thinking. Variables, conditionals, loops — the grammar of all software.",
        note:
          "This changed everything. I started seeing every real-world problem as a sequence of steps that could be mapped and solved.",
        attachments: [],
      }
    ],
  },
  {
    id: "s2",
    number: "02",
    period: "2026",
    label: "Design",
    status: "completed",
    overview:
      "Design is the face of a system. Just like any book, what most captivates and attracts a client's attention is the cover; design is seen as much as architecture.",
    modules: [
      {
        id: "m2-1",
        name: "Interaction Design",
        type: "discipline",
        description:
          "In essence, interaction design means understanding users' behaviors, needs, and motivations, and then transforming that understanding into practical design solutions. The goal? To make every interaction intuitive, efficient, and satisfying so that users can complete tasks with ease.",
        note: "Learning about heuristics and other technical knowledge surrounding the human psyche has given me new perspectives on what to choose and how to analyze not only the appearance of a system, but also the complete user experience.",
        attachments: [],
      }
    ],
  },
  {
    id: "s3",
    number: "03",
    period: "2026",
    label: "English Tech",
    status: "completed",
    overview:
      "Learning and developing soft skills is essential, so English is the foundation of everything.",
    modules: [
      {
        id: "m3-3",
        name: "The word cloud",
        type: "discipline",
        description:
          "A word cloud is a visual representation of textual data. In it, the words that appear most frequently in a text are shown in larger, more prominent fonts. It is an excellent tool for quickly identifying the main themes and keywords of a subject.",
        note: "What I enjoyed most was correlating a word with the sequence of orders in communication, bringing a more computational and careful approach to thinking. This is essential for applying to a solution!",
        attachments: [],
        images: [],    
      }
    ],
  },
  {
    id: "s4",
    number: "04",
    period: "2026",
    label: "Project Management",
    status: "active",
    overview:
      "Managing projects ranges from planning and brainstorming to, most importantly, prototyping and continuous testing.",
    modules: [
      {
        id: "m3-3",
        name: "Munify — Product Development",
        type: "project",
        description:
          "Co-creating Munify, a platform for maximizing student content retention. Applying everything learned so far in a real product context.",
        note: "This is the most ambitious thing I've worked on. Designing systems that actually help people learn.",
        attachments: [],
        images: [
                { src: "./sketch_munify.jpeg", caption: "Sketch of the munify layout page" },
                { src: "./Prototype_munify.png", caption: "Prototype of the munify website" },
                  ],    
      }
    ],
  },
  {
    id: "s4",
    number: "04",
    period: "2027",
    label: "Next Year",
    status: "upcoming",
    overview:
      "Planned focus on cloud infrastructure, microservices architecture, and advanced front-end engineering.",
    modules: [
      {
        id: "m4-1",
        name: "Cloud & DevOps",
        type: "discipline",
        description: "CI/CD pipelines, containerization with Docker, and cloud deployment strategies.",
        note: null,
        attachments: [],
      },
      {
        id: "m4-2",
        name: "Mobile Development",
        type: "discipline",
        description: "Cross-platform mobile with React Native. Bridging web skills to native experiences.",
        note: null,
        attachments: [],
      },
    ],
  },
];
