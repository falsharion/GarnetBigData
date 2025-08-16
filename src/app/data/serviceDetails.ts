export type ServiceKey = keyof typeof serviceDetails;

export const serviceDetails = {
  dataGovernance: {
    title: "DATA GOVERNANCE & QUALITY MANAGEMENT",
    description:
      "We guide businesses in setting up data standards, policies, and quality assurance frameworks. This includes defining roles, data ownership models, validation systems, and compliance-ready structures to ensure clean, accurate, and reliable data at all times.",
    lottieUrl: "https://lottie.host/09523819-6a08-40ad-ba98-0bbb5b9f162a/AareyNmiXj.json"
  },
  trainingCulture: {
    title: "TRAINING & CULTURE BUILDING",
    description:
      "We provide customized training programs, webinars, and internal bootcamps to shift your organization's culture toward data literacy and accountability. Our content covers everything from basic data awareness to dashboard literacy and KPI ownership, ensuring adoption at all levels.",
    lottieUrl: "https://lottie.host/2fe783a6-037b-4f0a-8e8e-6b07dfa774d4/IIXCETgw3k.json"
  },
  dataInfrastructure: {
    title: "DATA INFRASTRUCTURE & CENTRALIZATION",
    description:
      "We build and optimize scalable, secure data infrastructure -  whether on cloud (Azure, AWS) or on-premise -  with clearly defined data pipelines, centralized storage, and optimized access controls. Our focus is on enabling seamless integration across departments and use cases.",
    lottieUrl: "https://lottie.host/f0714268-031a-4b19-99c8-2fe46c25ee01/6kkg9x4LET.json"
  },
  dataConsulting: {
    title: "DATA CONSULTING & PROCESS OPTIMIZATION",
    description:
      " We dive deep into your workflows, data collection methods, and reporting processes to identify inefficiencies. We then deliver actionable recommendations, design improved pipelines, and support implementation - helping you move from siloed data chaos to cohesive, strategic insight.",
    lottieUrl: "https://lottie.host/6ebb82a4-147f-466e-b7c5-f0bed7e74d7d/ihAhCGurqn.json"
  },
  analyticsAutomation: {
    title: "ADVANCED ANALYTICS & AUTOMATION",
    description:
      "We support the adoption of advanced analytics tools like custom Power BI dashboards, predictive modeling, machine learning integration, and LLM-based automation. From forecasting to natural language summarization, we help you turn raw data into forward-looking decisions.",
    lottieUrl: "https://lottie.host/77feca33-e79f-4ae0-9507-905857237987/NlYIr6WMFl.json"
  },
} as const;