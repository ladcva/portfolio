import conferenceNlp from "../Assets/Projects/conference_nlp.png";
import dspReport from "../Assets/Projects/dsp_report.png";
import tfscale from "../Assets/Projects/tfscale.jpeg";

const projects = [
  {
    title: "Banking Data Lake and Lakehouse Work",
    eyebrow: "Senior Data Engineering",
    description:
      "Work on ETL/ELT pipelines, CDC, backfills, AWS data lake services, Databricks Lakehouse architecture, and Spark workflow optimization.",
    impact: "Production systems",
    image: tfscale,
    link: "https://ivid2.np.edu.sg/media/TF+SCALE+2019+Hybrid+Programme+%28March+2021%29+-+Ngee+Ann+Polytechnic+X+Vietnam+National+University/1_44ijbtf9",
    tags: ["AWS", "Data Lake", "Platform"],
  },
  {
    title: "Disaster Tweets Classification",
    eyebrow: "NLP Research",
    description:
      "BERT-based classification experiments for identifying urgent social posts during disaster events.",
    impact: "Published preprint",
    image: conferenceNlp,
    link: "https://arxiv.org/pdf/2202.00795.pdf",
    tags: ["BERT", "NLP", "Research"],
  },
  {
    title: "Raman Spectroscopy ML",
    eyebrow: "Healthcare AI",
    description:
      "Machine learning and signal processing workflows for non-invasive Type 2 Diabetes Mellitus diagnosis research.",
    impact: "Springer publication",
    image: dspReport,
    link: "https://drive.google.com/file/d/15Gj38KQNJWtBu77Gnj5U6JL69ADyW4XO/view?usp=sharing",
    tags: ["Machine Learning", "DSP", "Healthcare"],
  },
  {
    title: "Online Examination System",
    eyebrow: "Full-stack Product",
    description:
      "Created an ASP.NET and Azure SQL examination platform with remote test management workflows for teachers and students.",
    impact: "End-to-end app",
    image: "https://user-images.githubusercontent.com/55091357/122634666-acdce280-d109-11eb-87ab-7ae7f3a55fb9.png",
    link: "https://github.com/ladcva/TracNghiem",
    tags: ["ASP.NET", "Azure SQL", "C#"],
  },
  {
    title: "Hanoi Housing Dataset",
    eyebrow: "Open Data",
    description:
      "Scraped, cleaned, and published 82.5k housing records from Hanoi, then used the dataset for machine learning workshops and price prediction demos.",
    impact: "82.5k records",
    image: "https://cafefcdn.com/thumb_w/650/203337114487263232/2021/5/31/photo1622423360488-16224233605872120919132.jpg",
    link: "https://www.kaggle.com/ladcva/vietnam-housing-dataset-hanoi",
    tags: ["Python", "Kaggle", "Regression"],
  },
];

export default projects;
