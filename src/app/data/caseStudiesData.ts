
export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  categoryColor: "red" | "blue";
  type: string;
  overview: string;
  approach: string;
  image: string;
  solution: string | string[];
  impact: string[];
  hasTopVector?: boolean;
}

export const caseStudiesData: CaseStudy[] = [
  {
    id: "Revenue-Tracker",
    title: "Enhancing Financial Visibility with a Revenue Tracker Dashboard",
    category: "E-commerce & Retail",
    categoryColor: "red",
    type: "Analytics & Automation, Data Infrastructure",
    overview:
      "Decisions around resource allocation and sales strategy, across products, services, customer segments, and time periods should be based solely on data.",
    approach:
      "We designed and implemented an interactive Revenue Tracker Dashboard to help organizations gain clarity on how money flows into the business. The goal was to break down revenue data in a way that allowed leadership to understand what's working, and what's not.",
    image: "/casestudy1.jpg",
    hasTopVector: true,
    solution: [
      "Revenue by Data Source: Integrated multiple revenue streams into a single view.",
      "Product & Service Analysis: Tracked revenue by category and offering.",
      "Customer Segmentation: Identified top-performing customer groups.",
      "Time-Based Trends: Monthly revenue comparisons to detect patterns and seasonality.",
      "Payment Channels: Broke down revenue by various payment methods.",
    ],
    impact: [
      "Improved decision-making by highlighting underperforming products.",
      "Helped the sales team focus on high-value customers.",
      "Finance team now creates more accurate forecasts.",
      "Leadership uses it in monthly performance reviews.",
    ],
  },
  {
    id: "DataQualityOverhaul",
    title: "Controlling Operational Costs with an Expense Report Dashboard",
    category: "Healthcare",
    categoryColor: "blue",
    type: "Data Governance & Quality, Consulting",
    overview:
      "Manually tracking expense categories and relying on non-detailed reports can obscure spending trends, weaken visibility into vendor relationships, and limit budget control and cost-saving opportunities",
    approach:
      "We developed a dynamic Expense Report Dashboard to help the organization monitor, analyze, and control spending. The dashboard enabled cross-departmental transparency, making it easier for teams to justify budgets and cut unnecessary expenses.",
    image: "/casestudy.png",
    solution: [
      "Expense by Category: Salaries, software, maintenance, training, utilities, and more.",
      "Month-to-Month Trends: Compared expenses over time to highlight spikes or reductions.",
      "Departmental Breakdown: Tracked how each department spent its allocated budget.",
      "Vendor Insights: Visualized top 10 paid vendors and total spending by vendor.",
      "Drill-Down Capability: Allowed users to click into each category for deeper analysis.",
    ],
    impact: [
      "Finance team discovered inefficiencies in software license spending.",
      "Enabled leadership to renegotiate vendor contracts based on spending data.",
      "Helped department heads identify cost overruns and optimize budgets.",
      "Created a more accountable and transparent spending culture.",
    ],
  },
  {
    id: "BuildingaData-drivenCulture",
    title: "Building a Data-Driven Culture Through Training & Enablement",
    category: "Financial Service",
    categoryColor: "blue",
    type: "Training & Culture, Data Strategy",
    overview:
      "Many companies collect data but lack the skills or confidence to use it effectively. We help bridge this gap.They had the tools but not the know-how to extract value from their data or apply it to business decisions.",
    approach:
      "We designed a hands-on Data Training Program aimed at non-technical teams, department leads, and managers. The goal was to empower them to ask better questions, interpret dashboards, and collaborate with analysts to make data-backed decisions.",
    image: "casestudy3.jpg",
    hasTopVector: true,
    solution: [
      "Intro to Data Literacy: Demystified data concepts and analytics terms.",
      "Tool-Based Training: Taught them how to use dashboards, filters, and visualizations.",
      "Applied Use Cases: Showed how data supports sales, operations, finance, and HR.",
      "Presentation Skills: Guided teams on using data effectively in stakeholder meetings.",
      "Customized Sessions: Tailored content to the company's unique data systems and business goals.",
    ],
    impact: [
      "Teams gained confidence in interpreting and discussing data.",
      "More departments began using dashboards regularly in decision-making.",
      "Reduced dependency on analysts for basic questions.",
      'Shifted mindset from "data is IT\'s job" to "data is everyone"\'s responsibility.',
    ],
  },
];