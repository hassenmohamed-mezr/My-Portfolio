export type Project = {
  id: string;
  index: string;
  label: string;
  title: string;
  product?: string;
  description: string;
  github: string;
  cta: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    id: 'lex-ai',
    index: '01',
    label: '01 / GENERATIVE AI / RAG',
    title: 'Egyptian Labor Law AI',
    product: 'Lex AI',
    description: 'A production-oriented RAG system specialized in Egyptian Labor Law. It handles direct legal questions and real-world narratives, retrieves relevant legal content, reconstructs complete articles, and generates grounded explanations.',
    github: 'https://github.com/hassenmohamed-mezr/Egyptian_legal_ai_agent',
    cta: 'VIEW CASE STUDY',
    tags: ['Python', 'FastAPI', 'Streamlit', 'FAISS', 'BM25', 'BGE-M3', 'BGE Reranker', 'Ollama', 'Qwen 2.5 7B', 'RAG'],
  },
  {
    id: 'hospital',
    index: '02',
    label: '02 / SOFTWARE ENGINEERING / AI',
    title: 'Hospital Information System',
    description: 'Enterprise-style healthcare operations platform with role-based workflows, appointment orchestration, patient and visit management, and an integrated AI assistant.',
    github: 'https://github.com/hassenmohamed-mezr/HospitalInformationSystem',
    cta: 'VIEW CASE STUDY',
    tags: ['C#', 'ASP.NET Core 9', 'ASP.NET MVC', 'Entity Framework Core', 'SQLite', 'Python', 'FastAPI', 'SentenceTransformers', 'FAISS', 'Gemini', 'Bootstrap', 'JavaScript'],
  },
  {
    id: 'breast-cancer',
    index: '03',
    label: '03 / MACHINE LEARNING / COMPUTER VISION',
    title: 'Breast Cancer Image Classification',
    description: 'A machine learning project for binary classification of breast cancer medical images using classical ML models and an image preprocessing pipeline.',
    github: 'https://github.com/hassenmohamed-mezr/Breast-Cancer-Image-Classification',
    cta: 'VIEW PROJECT',
    tags: ['Python', 'NumPy', 'Scikit-learn', 'Matplotlib', 'KNN', 'Logistic Regression', 'Image Processing'],
  },
];