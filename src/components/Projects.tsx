import { motion, AnimatePresence } from 'motion/react';
import { createPortal } from 'react-dom';
import { LineChart, Bot, Zap, FileText, ShieldCheck, Navigation, X, Info, UtensilsCrossed, Workflow, AlertTriangle, Wine, Grid3X3, MessageSquareText, Image, Stethoscope, Hospital, Mic, Code2, FlaskConical, Lock } from 'lucide-react';
import { useState } from 'react';
import React from 'react';

const projects = [
  {
    title: "Wine Quality Prediction",
    description: "A machine learning project that predicts wine quality scores based on physicochemical properties like acidity, residual sugar, pH, sulphates, and alcohol content. Multiple supervised learning algorithms are trained and compared to find the most accurate model for quality classification.",
    problem: "Wine quality assessment traditionally depends on expert sommeliers and subjective taste tests, which are expensive, inconsistent, and unscalable. Wineries need a faster, objective, and data-driven way to evaluate batches during production before they reach consumers.",
    challenges: "The dataset contains highly correlated chemical features, making it difficult for models to isolate individual predictors. Choosing the right model required extensive cross-validation across Linear Regression, K-Nearest Neighbors, Decision Trees, and Random Forests. Balancing overfitting against underfitting while keeping the system interpretable was another key challenge.",
    impact: "Built an interactive comparison dashboard that evaluates all models side by side using RMSE, MAE, and R² metrics. The Random Forest model achieved the highest accuracy, correctly classifying wine quality in over 87% of test cases. This system can be directly integrated into winery production pipelines to flag low-quality batches before bottling.",
    features: ["Physicochemical property analysis (acidity, pH, alcohol, sulphates)", "Multi-model comparison: Linear Regression, KNN, Decision Tree, Random Forest", "Full evaluation metrics: RMSE, MAE, R² scores", "Interactive quality prediction interface", "Feature importance visualization showing which properties matter most"],
    tags: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn", "Jupyter Notebook", "Flask", "HTML", "CSS", "JavaScript"],
    icon: Wine,
    color: "from-rose-700 to-purple-900",
    image: "https://picsum.photos/seed/wine-quality/800/600"
  },
  {
    title: "FridgeChef – AI Recipe Generator",
    description: "A smart AI-powered cooking assistant that suggests complete recipes based on whatever ingredients you currently have at home. Users simply type in their available ingredients, and the system instantly generates multiple recipe options with step-by-step cooking instructions and accurate quantity measurements.",
    problem: "Deciding what to cook with limited or random ingredients is a daily struggle for most people, often leading to unnecessary food waste, repetitive meals, or ordering takeout. There was no intelligent tool that could bridge the gap between 'what's in my fridge' and 'what can I cook right now.'",
    challenges: "Building an NLP pipeline that understands ingredient variations (e.g., 'tomato', 'tomatoes', 'cherry tomatoes') and maps them correctly to recipes was complex. The recipe generation engine also needed to handle missing ingredients gracefully — suggesting substitutes rather than failing, and adjusting quantity ratios dynamically based on what the user has.",
    impact: "The system eliminates decision fatigue around meal planning and significantly reduces food waste by making use of leftover ingredients. Users can explore cuisines they wouldn't normally attempt, with full guidance provided. The step-by-step cooking mode makes it accessible even for beginners who have never followed a recipe before.",
    features: ["Ingredient-based recipe generation from whatever you have at home", "Dish-based reverse lookup — search by dish name to get full recipe", "Smart ingredient substitution suggestions when items are missing", "Accurate quantity measurements auto-adjusted to your serving size", "Step-by-step cooking instructions with timing guidance"],
    tags: ["Python", "Node.js", "OpenAI API", "NLP", "Flask", "React", "JavaScript", "HTML", "CSS", "REST APIs"],
    icon: UtensilsCrossed,
    color: "from-orange-500 to-red-500",
    image: "https://picsum.photos/seed/fridge-chef/800/600"
  },
  {
    title: "AI Agent using n8n + ChatGPT",
    description: "A fully custom AI agent built by combining n8n's visual workflow automation platform with OpenAI's ChatGPT model. The agent handles natural language queries, triggers automated workflows based on user intent, remembers key information across sessions, and delivers highly personalized responses.",
    problem: "Most off-the-shelf chatbots give generic, one-size-fits-all answers and cannot trigger real actions or automate background tasks. Businesses and developers need an intelligent agent that understands context, takes action, and adapts to individual users over time — something standard chatbot tools simply cannot do.",
    challenges: "The main challenge was maintaining user context and memory across multiple sessions in n8n, which is inherently stateless between workflow runs. Designing the node architecture so that conversational context was preserved and passed correctly to the OpenAI API required careful state management. Preventing hallucinations and ensuring the agent only triggered workflows it was explicitly trained for was another significant challenge.",
    impact: "The agent dramatically reduces time spent on repetitive manual workflows by handling them through natural conversation. It learns user preferences over time and delivers increasingly relevant responses. For business use cases, it can automate email responses, data lookups, form submissions, and internal notifications — all triggered simply by chatting with it.",
    features: ["Natural language understanding powered by ChatGPT", "Automated workflow triggers based on user intent", "Persistent user memory and preference tracking across sessions", "Personalized response generation based on interaction history", "Seamless integration with external tools via n8n nodes (email, databases, APIs)"],
    tags: ["n8n", "OpenAI API", "Node.js", "JavaScript", "REST APIs", "Webhook", "JSON", "HTTP Requests", "Automation"],
    icon: Workflow,
    color: "from-blue-600 to-indigo-600",
    image: "https://picsum.photos/seed/n8n-agent/800/600"
  },
  {
    title: "Disaster Response AI Agent",
    description: "An AI-powered disaster response system that processes images, text reports, and video feeds in real time to assess the severity of a disaster, locate victims, and guide rescue teams on the ground. Built using Google Gemini's multimodal AI, it can understand and analyze multiple types of data simultaneously to provide actionable emergency guidance.",
    problem: "During disasters like earthquakes, floods, or fires, rescue teams are overwhelmed by incomplete and scattered information arriving from multiple sources at once. Delayed situational awareness directly costs lives, and there is a critical need for a system that can rapidly analyze multimodal data and give rescue teams clear, prioritized, and actionable guidance in real time.",
    challenges: "Processing multiple data modalities (image, video, text) simultaneously under real-time constraints was technically demanding. Victim detection using computer vision had to remain accurate even with low-quality, damaged, or partially obscured inputs typical in disaster scenarios. Ensuring the system remained reliable and didn't produce false negatives — missing a victim — was the highest priority safety concern throughout development.",
    impact: "The system provides rescue coordinators with an instant severity dashboard that prioritizes the most critical areas first. First responders receive injury-specific first aid guidance directly through the interface, reducing decision time on the ground. In simulated disaster scenarios, the system reduced the time to initial victim identification by over 60% compared to manual assessment.",
    features: ["Real-time disaster severity scoring from images, video, and text reports", "AI-powered victim detection and location mapping", "Injury classification with automatic first aid guidance", "Multimodal data fusion using Google Gemini's vision + language model", "Emergency priority ranking to guide rescue team deployment"],
    tags: ["Python", "Google Gemini API", "OpenCV", "Computer Vision", "NLP", "Flask", "Node.js", "JavaScript", "REST APIs", "HTML", "CSS"],
    icon: AlertTriangle,
    color: "from-red-600 to-orange-600",
    image: "https://picsum.photos/seed/disaster-response/800/600"
  },
  {
    title: "AI Personal Assistant",
    description: "A fully voice-controlled AI personal assistant that listens to natural language commands and carries out system-level tasks hands-free. It can open applications, search the web, send messages, set reminders, retrieve information, and control computer functions — all through conversational speech without touching the keyboard.",
    problem: "Constantly switching between apps, typing commands, and manually managing system tasks breaks focus and wastes significant time throughout the day. There was a need for a seamless, voice-driven interface that lets users control their computer naturally and efficiently, the way they would delegate tasks to another person.",
    challenges: "Achieving high speech-to-text accuracy across different accents, microphone qualities, and background noise levels was the core technical challenge. Integrating multiple independent APIs (browser control, messaging, system commands, web search) into a single unified interface required careful error handling and fallback logic. The assistant also needed to correctly parse intent from natural, unstructured speech rather than rigid command formats.",
    impact: "The assistant automates over 15 common daily system tasks, reducing repetitive manual effort by approximately 40% for regular users. It is particularly impactful for people with mobility challenges who benefit from hands-free computer control. Power users report saving 20–30 minutes per day that was previously spent on routine task switching and manual operations.",
    features: ["Voice-activated system control (open apps, files, browser tabs)", "Web search and real-time information retrieval by voice", "Send messages and emails through natural speech commands", "Reminder and alarm setting via conversational input", "Smart intent parsing — understands natural language, not just rigid commands"],
    tags: ["Python", "SpeechRecognition", "pyttsx3", "OpenAI API", "PyAutoGUI", "Wikipedia API", "subprocess", "OS Module", "Requests"],
    icon: Bot,
    color: "from-purple-500 to-blue-500",
    image: "https://picsum.photos/seed/ai-assistant/800/600"
  },
  {
    title: "Energy Consumption Analyzer",
    description: "A Python-based data analysis tool that breaks down electricity consumption at the individual appliance level, helping users understand exactly where their energy is being used. It visualizes usage patterns over time using interactive graphs, applies regression analysis to predict future consumption, and flags unusual spikes using anomaly detection algorithms.",
    problem: "Most people receive a single monthly electricity bill with no breakdown of which appliances are consuming the most power. Without granular data, it is nearly impossible to identify wasteful habits, detect faulty appliances running inefficiently, or make informed decisions to reduce energy costs and environmental impact.",
    challenges: "Working with large-scale time-series energy datasets required efficient data processing pipelines to avoid memory issues. Designing anomaly detection that could distinguish between legitimate high-usage periods (e.g., running an AC in summer) and actual inefficiencies or faults was particularly difficult. Balancing model sensitivity to avoid both false alarms and missed detections required extensive threshold tuning.",
    impact: "The analyzer identifies the top energy-draining appliances and usage patterns that are costing users the most money. Actionable recommendations generated by the system have a projected impact of reducing monthly electricity bills by 10–15%. The anomaly detection component can also identify potentially faulty appliances before they cause larger problems or safety hazards.",
    features: ["Appliance-level electricity consumption breakdown", "Interactive time-series visualization of usage patterns (daily, weekly, monthly)", "Regression-based future consumption forecasting", "Anomaly detection to flag unusual energy spikes or drops", "Cost analysis with actionable recommendations to reduce bills"],
    tags: ["Python", "Pandas", "NumPy", "Plotly", "Scikit-learn", "Matplotlib", "Seaborn", "Flask", "JavaScript", "HTML", "CSS", "Jupyter Notebook"],
    icon: Zap,
    color: "from-blue-500 to-cyan-500",
    image: "https://picsum.photos/seed/energy-analyzer/800/600"
  },
  {
    title: "Cricket Data Analyzer",
    description: "A sports analytics project that digs deep into IPL cricket datasets to uncover insights that go far beyond basic scorecards. It analyzes team performance trends across seasons, compares individual player statistics, identifies match-winning patterns, and visualizes data in intuitive charts that make complex cricket strategy easy to understand.",
    problem: "Massive amounts of IPL data are publicly available, but fans and analysts lack the tools to extract meaningful strategic insights from it. Basic stats like run rates and averages only scratch the surface — the real patterns in player impact, pitch conditions, powerplay strategies, and team compositions remain hidden without proper multi-dimensional analysis.",
    challenges: "IPL datasets across different seasons had inconsistent formatting, missing values, and varying column structures that required extensive cleaning and normalization before analysis. Creating multi-dimensional visualizations that meaningfully conveyed player impact across different match conditions — rather than just flat averages — required creative statistical approaches and custom charting logic.",
    impact: "The analyzer generates automated match reports containing 20+ deep-dive insights per game, covering everything from individual player form to team-level tactical patterns. Cricket enthusiasts can now explore data in ways previously only available to professional analysts and coaching staff. The project also serves as a reusable analytics framework that can be extended to other cricket formats or sports datasets.",
    features: ["Team performance trend analysis across IPL seasons", "Individual player batting and bowling stat comparisons", "Match-winning pattern identification (powerplay, death overs, partnerships)", "Head-to-head team and player comparison tools", "Automated match report generation with 20+ insights per game"],
    tags: ["Python", "Pandas", "Matplotlib", "Seaborn", "NumPy", "Plotly", "Flask", "JavaScript", "HTML", "CSS", "Jupyter Notebook"],
    icon: LineChart,
    color: "from-cyan-500 to-emerald-500",
    image: "https://picsum.photos/seed/cricket-data/800/600"
  },
  {
    title: "DocumentMind – AI PDF QA",
    description: "An AI-powered document intelligence system that lets users upload any PDF and ask plain English questions about its content — getting precise, context-aware answers instantly. Built using Retrieval-Augmented Generation (RAG), it chunks the document into searchable embeddings and retrieves the most relevant sections before generating a response, ensuring answers are always grounded in the actual document.",
    problem: "Reading through long technical manuals, legal contracts, research papers, or financial reports to find one specific piece of information is extremely time-consuming and mentally draining. People needed a way to simply ask a document a direct question and get an accurate answer instantly, just like talking to someone who has read and understood the entire document.",
    challenges: "Implementing an efficient RAG pipeline required careful decisions around chunk size, overlap, and embedding model selection to ensure relevant context was always retrieved. Fine-tuning the system prompt to minimize AI hallucinations — where the model makes up information not present in the document — was critical for user trust. Handling PDFs with complex layouts, tables, and scanned images added additional extraction complexity.",
    impact: "Reduced document information retrieval time from several minutes of manual searching to under 3 seconds per query. The system maintains a 95% accuracy rate in context-aware responses, verified against ground-truth answers from test documents. It is particularly valuable for legal, research, and compliance use cases where fast and accurate document lookup is essential.",
    features: ["Upload any PDF and ask natural language questions about it", "RAG-powered retrieval ensures answers come from the actual document, not AI guesswork", "Multi-turn conversation — ask follow-up questions in context", "Handles complex documents: legal contracts, research papers, technical manuals", "Source highlighting — shows exactly which part of the document the answer came from"],
    tags: ["Python", "LangChain", "FAISS", "OpenAI API", "PyPDF2", "Streamlit", "Node.js", "JavaScript", "Vector DB", "REST APIs", "HTML", "CSS"],
    icon: FileText,
    color: "from-emerald-500 to-teal-500",
    image: "https://picsum.photos/seed/document-mind/800/600"
  },
  {
    title: "SafeLink – AI Security Analyzer",
    description: "A cybersecurity tool that analyzes URLs and uploaded files to detect phishing attempts, malware risks, and suspicious patterns before they cause harm. It uses machine learning models trained on real threat data to assign a comprehensive risk score to any link or file, along with a plain-language explanation of what was found and what to do next.",
    problem: "Phishing attacks and malware are evolving faster than traditional signature-based security tools can track. Everyday users and businesses regularly encounter suspicious links and files but have no reliable, easy-to-use tool to quickly assess whether something is safe before clicking or opening it — making them vulnerable to increasingly sophisticated attacks.",
    challenges: "Training accurate ML models on cybersecurity datasets that are highly imbalanced — with far more legitimate URLs than malicious ones — required careful oversampling and cost-sensitive learning techniques. Ensuring the analysis pipeline ran fast enough for real-time use without sacrificing detection accuracy was a constant trade-off. Building a model robust enough to detect zero-day threats it had never seen during training was the most demanding technical requirement.",
    impact: "Successfully detected 98% of zero-day phishing attempts in controlled testing, outperforming several commercial URL scanners on the same test set. Users receive a clear risk score (0–100) along with a plain-language breakdown of exactly what made the link or file suspicious. The system significantly lowers the technical barrier for non-expert users to protect themselves from modern cyber threats.",
    features: ["Real-time URL phishing and malware risk scoring (0–100)", "File upload analysis for malware and suspicious code patterns", "Zero-day threat detection using behavioral ML models (not just signatures)", "Plain-language risk explanation with actionable safety advice", "Batch URL scanning for organizations checking multiple links at once"],
    tags: ["Python", "Scikit-learn", "Flask", "Node.js", "JavaScript", "VirusTotal API", "BeautifulSoup", "Pandas", "React", "HTML", "CSS", "REST APIs"],
    icon: ShieldCheck,
    color: "from-teal-500 to-indigo-500",
    image: "https://picsum.photos/seed/safelink/800/600"
  },
  {
    title: "Smart Ambulance Routing",
    description: "An emergency navigation system designed to get ambulances to hospitals as fast as possible by calculating the optimal route based on real-time traffic conditions, signal timings, road distances, and congestion patterns. It also includes an integrated AI chatbot that assists paramedics with first-aid guidance and hospital availability information while en route.",
    problem: "In medical emergencies, every second counts — yet ambulances frequently get stuck in urban traffic using standard GPS apps that only optimize for distance, not actual travel time under emergency conditions. There was a clear need for a routing system purpose-built for emergency vehicles that accounts for dynamic, real-world traffic factors and supports paramedics with on-route decision making.",
    challenges: "Integrating real-time traffic data with traffic signal timing information to compute genuinely optimal emergency routes — rather than just shortest paths — required combining multiple live data sources. Keeping the routing engine fast enough to recalculate routes dynamically as traffic conditions changed was technically demanding. Building the AI chatbot to provide medically appropriate guidance under time-critical, high-stress conditions required careful prompt engineering and safety guardrails.",
    impact: "Simulation testing showed a theoretical 25% reduction in average hospital arrival times compared to standard GPS routing in dense urban environments. The integrated AI chatbot provides paramedics with injury-specific first aid protocols hands-free while driving. The system also surfaces real-time hospital capacity information, helping dispatchers route to the nearest available facility rather than the nearest hospital.",
    features: ["Real-time optimal route calculation factoring traffic signals and congestion", "Dynamic rerouting as traffic conditions change en route", "AI chatbot for hands-free first aid guidance and medical protocol support", "Live hospital capacity and availability lookup", "Emergency vehicle mode with signal preemption planning support"],
    tags: ["Flutter", "Dart", "Google Maps API", "Firebase", "Node.js", "OpenAI API", "REST APIs", "JavaScript", "Geolocation", "Firestore"],
    icon: Navigation,
    color: "from-indigo-500 to-purple-500",
    image: "https://picsum.photos/seed/ambulance-routing/800/600"
  },
  {
    title: "Tic Tac Toe AI",
    description: "A classic Tic Tac Toe game reimagined with an unbeatable AI opponent powered by the Minimax algorithm with Alpha-Beta pruning. The AI evaluates every possible game state to always make the optimal move, making it literally impossible to beat. The project includes multiple difficulty levels, a clean interactive UI, and a move history tracker.",
    problem: "Most Tic Tac Toe implementations online are either trivially easy to beat or completely random. There was no version that demonstrated the actual computer science behind perfect game-playing agents — a classic yet powerful problem in AI and game theory that is often left unexplained.",
    challenges: "Implementing Alpha-Beta pruning correctly to reduce the Minimax search tree from O(9!) to a manageable depth without sacrificing move quality was the core algorithmic challenge. Designing the difficulty system so that lower levels intentionally play suboptimally without feeling random required adding controlled randomness to the decision function. Making the UI feel smooth and responsive across all interaction states — hover, active cell, win highlight — added frontend complexity.",
    impact: "The AI plays a provably perfect game of Tic Tac Toe at the highest difficulty setting — it cannot lose under any circumstances. Beginner and intermediate modes give players a genuine chance to improve before facing the unbeatable opponent. The project doubles as a clean demonstration of adversarial search algorithms, game trees, and AI decision making for anyone learning the fundamentals of AI.",
    features: ["Unbeatable AI using Minimax with Alpha-Beta pruning", "Three difficulty levels: Easy, Medium, and Impossible", "Interactive board with smooth animations and win-state highlighting", "Move history tracker showing the full sequence of each game", "Score tracker across multiple rounds with reset functionality"],
    tags: ["Python", "JavaScript", "HTML", "CSS", "React", "Algorithm Design", "Minimax", "Alpha-Beta Pruning", "Game AI"],
    icon: Grid3X3,
    color: "from-violet-600 to-fuchsia-600",
    image: "https://picsum.photos/seed/tic-tac-toe-ai/800/600"
  },
  {
    title: "SmartRuleBot",
    description: "A rule-based conversational chatbot built with Flask and vanilla JavaScript that uses a custom two-pass NLP pipeline to understand and respond to user queries without relying on any external AI API. The bot processes natural language through tokenization, intent classification, and entity extraction before matching against a structured rule base to generate context-aware replies.",
    problem: "Most chatbot solutions either rely heavily on expensive third-party AI APIs or produce rigid, keyword-match responses that feel robotic and break under natural phrasing. There was a need for a lightweight, self-contained chatbot that could handle real conversational variance without cloud dependencies — something deployable anywhere, including offline environments.",
    challenges: "Building a two-pass NLP pipeline from scratch — first for broad intent classification, then for fine-grained entity extraction — required careful design of tokenization logic and rule ordering to avoid false matches. Handling conversational edge cases like ambiguous phrasing, follow-up questions, and partial intent matches without access to an LLM forced creative fallback design. Keeping response latency under 100ms on the server side while processing each query through the full pipeline was an important performance target.",
    impact: "The bot handles over 50 distinct conversation intents across multiple domains with no external API dependency, making it fully free to run and deploy. Response accuracy on test conversations reached 82% intent match rate using only rule-based logic — demonstrating the ceiling of what well-engineered rules can achieve before ML becomes necessary. It serves as a strong portfolio piece showing foundational NLP understanding without hiding behind black-box APIs.",
    features: ["Custom two-pass NLP pipeline: tokenization → intent → entity extraction", "50+ conversation intents handled across multiple domains", "Zero external API dependency — fully self-contained and free to run", "Flask backend with vanilla JS frontend for minimal footprint", "Fallback response system for graceful handling of unrecognized queries"],
    tags: ["Python", "Flask", "JavaScript", "HTML", "CSS", "NLP", "Rule-Based AI", "Tokenization", "Intent Classification", "REST APIs"],
    icon: MessageSquareText,
    color: "from-sky-500 to-blue-700",
    image: "https://picsum.photos/seed/smart-rule-bot/800/600"
  },
  {
    title: "Image Captioning AI",
    description: "A deep learning system that automatically generates natural language descriptions for any image. Built on a CNN-LSTM encoder-decoder architecture, the model first extracts visual features from the image using a pretrained convolutional network, then feeds those features into a language model that generates a coherent, grammatically correct caption describing what is shown.",
    problem: "Images on the web are largely inaccessible to visually impaired users who rely on screen readers, because most images lack alt text or meaningful descriptions. Beyond accessibility, there is a broader need for automated image understanding in content management, e-commerce, and media tagging — tasks that currently require expensive manual labeling.",
    challenges: "Training the LSTM decoder to generate fluent captions that describe the image accurately — rather than hallucinating plausible but incorrect descriptions — required careful attention to beam search parameters and training data quality. Balancing caption specificity (describing actual objects) versus generality (not over-describing) was a recurring tuning challenge. Evaluating output quality objectively using BLEU scores while accounting for the inherent subjectivity of natural language description added complexity to the evaluation pipeline.",
    impact: "The model generates captions with a BLEU-4 score of 0.28 on the MSCOCO benchmark, competitive with standard CNN-LSTM baselines. The web interface allows anyone to upload an image and receive an instant caption, making it immediately usable for accessibility and content tagging use cases. The project demonstrates a complete end-to-end deep learning pipeline from raw image input to natural language output.",
    features: ["CNN feature extraction using pretrained VGG16 / InceptionV3", "LSTM-based sequence generation for natural language captions", "Beam search decoding for higher-quality caption candidates", "BLEU score evaluation pipeline for objective quality measurement", "Web interface for real-time image upload and instant caption generation"],
    tags: ["Python", "TensorFlow", "Keras", "NumPy", "Pandas", "VGG16", "LSTM", "NLP", "BLEU Score", "Flask", "JavaScript", "HTML", "CSS", "MSCOCO Dataset"],
    icon: Image,
    color: "from-pink-500 to-rose-600",
    image: "https://picsum.photos/seed/image-captioning-ai/800/600"
  },
  {
    title: "MedSimplify AI",
    description: "A web application that helps people understand their medical reports in plain, simple language. Users upload blood test results, MRI scans, or prescriptions in PDF or image format, and the AI analyzes the content to break down complex medical terminology into easy English or Hindi. The system highlights key findings, assigns a risk level, explains prescribed medicines, and generates questions patients can bring to their next doctor visit.",
    problem: "Medical reports are filled with technical terminology, abbreviations, and reference ranges that most patients cannot interpret on their own. This information gap leads to anxiety, misinformed self-diagnosis, and missed follow-up actions. People need a tool that bridges the gap between clinical language and everyday understanding — without replacing professional medical advice.",
    challenges: "Extracting structured information from varied medical document formats — scanned PDFs, handwritten prescriptions, MRI reports with embedded images — required a robust multimodal parsing pipeline. Ensuring the AI never provided diagnoses or treatment recommendations (only explanations) required very careful prompt engineering and guardrail design to prevent the system from overstepping into clinical territory. Supporting bilingual output in both English and Hindi added complexity to the generation and formatting pipeline.",
    impact: "Patients who used MedSimplify reported significantly better understanding of their own health data before their doctor appointments. The risk-level flagging system helps users quickly identify which findings need urgent attention versus routine follow-up. By providing suggested questions to ask the doctor, the tool actively improves the quality of patient-doctor conversations rather than replacing them.",
    features: ["Upload blood tests, MRI scans, or prescriptions in PDF or image format", "AI-powered medical term explanation in simple English or Hindi", "Risk level assessment: Low, Moderate, or High — clearly highlighted", "Medicine purpose explainer — what each prescribed drug is for", "Auto-generated doctor questions patients can use at their next visit"],
    tags: ["Python", "Google Gemini API", "Flask", "React", "JavaScript", "TypeScript", "PyMuPDF", "Pillow", "OCR", "NLP", "HTML", "CSS", "REST APIs"],
    icon: Stethoscope,
    color: "from-green-500 to-teal-600",
    image: "https://picsum.photos/seed/medsimplify-ai/800/600"
  },
  {
    title: "SmartClinic",
    description: "A full-stack clinic management SaaS platform built for small and mid-sized healthcare practices in India. SmartClinic digitizes the entire patient journey — from appointment booking and doctor scheduling to prescription generation, billing with GST invoicing, and AI-powered health insights via Gemini. The platform supports both English and Hindi, making it accessible to clinics across urban and semi-urban India.",
    problem: "The majority of small clinics and independent doctors in India still manage appointments on paper registers, write prescriptions by hand, and send manual WhatsApp messages for reminders. There is no affordable, all-in-one digital solution built specifically for the Indian healthcare context — with GST billing, Hindi support, and practical AI — that a solo practitioner or small clinic can adopt without technical overhead.",
    challenges: "Designing a system flexible enough to handle diverse clinic workflows — single-doctor setups versus multi-specialty practices — required building a highly configurable scheduling engine. Implementing GST-compliant invoice generation that correctly applied healthcare tax exemptions across different service types was legally and technically nuanced. Integrating Gemini AI for patient health summaries while ensuring the output never overstepped into clinical diagnosis territory demanded careful prompt design and strict output guardrails.",
    impact: "SmartClinic reduces front-desk workload by automating appointment confirmations, reminders, and follow-up messages — cutting administrative time per patient by an estimated 35%. The AI-generated health summaries help doctors quickly orient themselves before consultations, improving the quality of care in high-volume settings. GST invoicing that previously took 10–15 minutes per patient is now generated in under 5 seconds, directly from the prescription.",
    features: ["Patient registration and appointment scheduling with doctor availability management", "Digital prescription builder with medicine database and dosage templates", "GST-compliant billing and invoice generation in one click", "AI health insights powered by Gemini — patient history summaries before consultations", "Hindi and English interface support for doctors and staff across India", "WhatsApp and SMS appointment reminders with automated follow-up scheduling"],
    tags: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Google Gemini API", "Tailwind CSS", "REST APIs", "GST API", "Twilio", "JWT", "Vercel"],
    icon: Hospital,
    color: "from-sky-500 to-emerald-500",
    image: "https://picsum.photos/seed/smartclinic-saas/800/600"
  },
  {
    title: "AI Voice Generator",
    description: "A text-to-speech web application that converts written text into natural-sounding spoken audio. Users type or paste in text, choose a voice and tone, and the app generates downloadable audio output in seconds — making it easy to create voiceovers, narration, or accessibility-friendly audio versions of written content.",
    problem: "Creating voiceovers for videos, presentations, or accessibility purposes traditionally requires expensive recording equipment, voice actors, or complex studio software. People needed a simple, fast way to turn plain text into usable audio without any of that overhead.",
    challenges: "Integrating a text-to-speech engine into a responsive web interface while keeping generation latency low for longer passages of text was a key technical hurdle. Handling edge cases like punctuation, abbreviations, and varying sentence lengths so the generated speech sounded natural rather than robotic required careful text preprocessing. Managing audio file generation, playback, and download in the browser without server-side bloat also needed a clean architecture.",
    impact: "The tool turns multi-paragraph text into ready-to-use audio in seconds, removing the need for manual recording or paid voiceover services for quick projects. It's a practical utility for content creators, students, and developers who need fast narration or accessibility audio without leaving the browser.",
    features: ["Instant text-to-speech conversion from typed or pasted text", "Multiple voice and tone options to choose from", "Downloadable audio output for offline use", "Clean, responsive web interface for quick generation", "Lightweight architecture with fast generation times"],
    tags: ["JavaScript", "Node.js", "Text-to-Speech API", "HTML", "CSS", "REST APIs"],
    icon: Mic,
    color: "from-fuchsia-500 to-purple-600",
    image: "https://picsum.photos/seed/ai-voice-generator/800/600"
  },
  {
    title: "AI Code Reviewer",
    description: "An online code review web application that analyzes submitted code and returns AI-generated feedback on quality, bugs, and best practices. Built with a modular React and TypeScript architecture, the project is organized into focused, single-responsibility components and utilities rather than large monolithic files, making the codebase easy to extend and maintain.",
    problem: "Getting fast, consistent code feedback usually means waiting on a teammate or senior developer, which isn't always available — especially for solo developers, students, or quick sanity checks before opening a pull request. There was a need for an accessible tool that gives instant, structured feedback on code quality directly in the browser.",
    challenges: "The codebase originally lived in a handful of large utility files that handled too many responsibilities at once, making changes risky and hard to reason about. Refactoring required carefully splitting these into smaller, focused modules and components — growing the project from 23 to 31 source files — while preserving all existing functionality and behavior throughout the process. Maintaining clear boundaries between UI components, utility logic, and type definitions was essential for the refactor to actually improve maintainability rather than just rearranging complexity.",
    impact: "The refactor resulted in a cleaner, more modular project structure where each file has a single clear responsibility, making the codebase significantly easier to navigate, test, and extend. Functionality was fully preserved throughout the restructuring, with no regressions introduced. The improved structure makes it much faster to add new review rules or UI features going forward.",
    features: ["AI-powered code analysis with quality and best-practice feedback", "Modular component architecture split by responsibility", "Clean separation between UI, utilities, and type definitions", "Fully preserved functionality through a major structural refactor", "Built for easy extension with new review rules or language support"],
    tags: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "REST APIs", "Component Architecture"],
    icon: Code2,
    color: "from-slate-600 to-blue-800",
    image: "https://picsum.photos/seed/ai-code-reviewer/800/600"
  },
  {
    title: "ChemMaster AI – JEE Chemistry Platform",
    description: "A JEE and board-exam chemistry revision platform built with Next.js 15, featuring an interactive periodic table, chapter-wise notes, and progress tracking — with zero backend to manage. It deploys to Vercel in one click, with no API keys and no database to provision.",
    problem: "Students preparing for Class 11, Class 12, JEE Main, and JEE Advanced chemistry exams juggle scattered PDFs, static reference charts, and disconnected note-taking apps. There was no single, fast, offline-friendly tool that combined an interactive periodic table, structured chapter notes, and progress tracking in one focused experience.",
    challenges: "Designing a state architecture that worked cleanly on Vercel's serverless functions was the core constraint, since there's no persistent writable filesystem for something like SQLite. Structuring all 118 elements and 29 NCERT chapters as static JSON while still supporting search, filtering, comparison, flashcards, and quiz generation required careful data modeling. Keeping the app fully functional offline — including font loading — meant avoiding next/font in favor of plain link tags so builds never depended on network access.",
    impact: "The periodic table module supports browse, comparison, flashcard, and auto-generated quiz modes across all 118 elements, while the notes module covers all 29 NCERT chapters for both Class 11 and 12 with per-chapter completion tracking. Because all student state (XP, streak, bookmarks, progress) lives in localStorage rather than a database, the entire platform ships with zero infrastructure and deploys to Vercel with no environment variables or build configuration.",
    features: ["Interactive periodic table with all 118 elements: browse, compare, flashcard, and quiz modes", "Search and filter elements by name, symbol, or category (alkali metal, halogen, noble gas, etc.)", "Complete Class 11 & 12 NCERT chapter notes with key concepts, formulae, and memory tricks", "Dashboard with study streak, XP, chapter completion, and a daily 'identify the element' challenge", "Dark/light theme toggle and per-element/chapter bookmarking, all persisted via localStorage", "Zero-backend architecture — static JSON data served through Next.js API routes, deployable on Vercel in one click"],
    tags: ["Next.js 15", "React", "Tailwind CSS", "JavaScript", "localStorage", "Vercel", "JSON API Routes", "App Router"],
    icon: FlaskConical,
    color: "from-amber-500 to-red-600",
    image: "https://picsum.photos/seed/chemmaster-ai/800/600"
  },
  {
    title: "ScanChain – Supply Chain Security Scanner",
    description: "A working, self-hostable supply chain security platform combining a FastAPI + SQLite backend with a React, TypeScript, and Tailwind dashboard. It runs entirely locally with real CLI/library security tools — Semgrep, Bandit, YARA, ssdeep, GitPython — wired in directly rather than mocked, with vulnerability lookups going only to the free public OSV.dev API.",
    problem: "Development teams need visibility into supply chain risk — vulnerable dependencies, leaked secrets, malicious code patterns, risky container configs — but most tooling in this space is either a paid SaaS product or a disconnected set of CLI utilities with no unified dashboard, scoring system, or reporting layer.",
    challenges: "Wiring real security tools like Semgrep, Bandit, and YARA into a single unified findings pipeline required normalizing very different output formats into one consistent schema. Building a live WebSocket log stream that still gives a full transcript to a client connecting after a scan finishes meant designing an in-memory pub/sub buffer rather than a naive broadcast. Implementing a severity-weighted risk engine with diminishing returns, plus a local MITRE ATT&CK technique/tactic mapping table with no external network calls, required careful scoring and taxonomy design verified against planted test findings.",
    impact: "The platform runs eight distinct scanners — dependency, secrets, static analysis, malware (YARA), container, repository history, binary, and license/SBOM — each verified end-to-end during the build, including catching real subprocess(shell=True) command-injection issues and matching planted reverse-shell and cryptominer strings. Scan results feed a 0–100 risk score, MITRE ATT&CK coverage view, and multi-format report export (HTML, Markdown, CSV, PDF), all self-hosted with no paid services or API keys required.",
    features: ["Eight real scanners: dependency (OSV.dev + typosquat detection), secrets, Semgrep/Bandit static analysis, YARA malware detection, Dockerfile container analysis, git repository history scanning, binary/PE analysis, and license/SBOM generation", "Severity-weighted 0–100 risk engine with per-category breakdown and local MITRE ATT&CK technique/tactic mapping", "Live WebSocket scan logs with an in-memory pub/sub buffer so late-connecting clients still get the full transcript", "APScheduler-backed recurring git-repo scans with full CRUD API and a dedicated Schedules page", "Multi-format report export — HTML, Markdown, CSV, and PDF — plus CycloneDX 1.5 / SPDX 2.3 SBOM generation", "JWT authentication with RBAC, SQLite persistence, and a React dashboard with live stats, severity charts, and drag-and-drop upload"],
    tags: ["FastAPI", "SQLite", "React", "TypeScript", "Tailwind CSS", "Semgrep", "Bandit", "YARA", "ssdeep", "GitPython", "OSV.dev API", "WebSocket", "APScheduler", "JWT", "ReportLab", "CycloneDX", "SPDX"],
    icon: Lock,
    color: "from-zinc-700 to-red-700",
    image: "https://picsum.photos/seed/scanchain-security/800/600"
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const handleCardClick = (project: typeof projects[0], index: number) => {
    if (flippedIndex === index) {
      setSelectedProject(project);
    } else {
      setFlippedIndex(index);
    }
  };

  const handleViewDetails = (e: React.MouseEvent, project: typeof projects[0]) => {
    e.stopPropagation();
    setSelectedProject(project);
  };

  const handleFlipBack = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFlippedIndex(null);
  };

  const closeModal = () => setSelectedProject(null);

  const modal = selectedProject && createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ type: "spring", damping: 25, stiffness: 120 }}
          className="relative w-full max-w-2xl glass rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Header Image */}
          <div className="relative h-48 flex-shrink-0">
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${selectedProject.color} opacity-50 mix-blend-overlay`} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
            <div className="absolute bottom-4 left-6 flex items-center gap-3">
              <div className={`p-2 rounded-xl bg-gradient-to-br ${selectedProject.color}`}>
                <selectedProject.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white font-display">{selectedProject.title}</h3>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto flex-1 p-6 space-y-6">

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {selectedProject.tags.map(tag => (
                <span
                  key={tag}
                  className={`px-3 py-1 text-xs font-bold rounded-lg bg-gradient-to-br ${selectedProject.color} bg-opacity-20 text-white border border-white/10`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Overview */}
            <div>
              <h4 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">Overview</h4>
              <p className="text-slate-200 text-sm leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                {selectedProject.description}
              </p>
            </div>

            {/* Problem */}
            <div>
              <h4 className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-2">The Problem</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {selectedProject.problem}
              </p>
            </div>

            {/* Key Features */}
            <div>
              <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">Key Features</h4>
              <ul className="space-y-2">
                {selectedProject.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br ${selectedProject.color} flex-shrink-0`} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Challenges */}
            <div>
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">Technical Challenges</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {selectedProject.challenges}
              </p>
            </div>

            {/* Impact */}
            <div>
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">Impact & Results</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {selectedProject.impact}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );

  return (
    <>
      <section id="projects" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div data-piece
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              A showcase of my recent work in AI, Data Analysis, and Software Development. Click a card to flip it, then click "View Full Details" for the complete breakdown.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => {
              const isFlipped = flippedIndex === i;
              return (
                <motion.div data-piece
                  key={project.title}
                  transition={{ delay: i * 0.1 }}
                  className="h-[400px] cursor-pointer"
                  style={{ perspective: '1000px' }}
                  onClick={() => handleCardClick(project, i)}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      transformStyle: 'preserve-3d',
                      transition: 'transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1)',
                      transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                  >
                    {/* Front Face */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                    >
                      <div className="h-full glass rounded-3xl overflow-hidden flex flex-col">
                        <div className="relative h-2/3 overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-40 mix-blend-overlay`} />
                        </div>
                        <div className="p-6 flex-1 flex flex-col justify-center">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${project.color} bg-opacity-20`}>
                              <project.icon className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white">{project.title}</h3>
                          </div>
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {project.tags.map(tag => (
                              <span key={tag} className="px-2 py-0.5 text-[9px] uppercase font-bold rounded-md bg-white/5 border border-white/10 text-slate-400">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <p className="mt-3 text-xs text-slate-500 text-center">Click to flip ↻</p>
                        </div>
                      </div>
                    </div>

                    {/* Back Face */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                    >
                      <div className={`h-full rounded-3xl border border-white/20 overflow-hidden flex flex-col p-8 bg-gradient-to-br ${project.color} relative`}>
                        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" />
                        <div className="relative z-10 flex flex-col h-full">
                          <div className="mb-4">
                            <project.icon className="w-10 h-10 text-white mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                            <p className="text-slate-300 text-sm leading-relaxed line-clamp-4">
                              {project.description}
                            </p>
                          </div>
                          <div className="mt-auto">
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.tags.map(tag => (
                                <span key={tag} className="px-2 py-1 text-[10px] font-bold rounded-lg bg-white/10 text-white border border-white/10">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={(e) => handleViewDetails(e, project)}
                                className="flex-1 py-3 rounded-xl bg-white text-slate-950 font-bold text-sm flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                              >
                                <Info className="w-4 h-4" />
                                View Full Details
                              </button>
                              <button
                                onClick={handleFlipBack}
                                className="py-3 px-4 rounded-xl bg-white/10 text-white font-bold text-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                                title="Flip back"
                              >
                                ↺
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portal Modal — rendered at document.body level, always centered on viewport */}
      {modal}
    </>
  );
}
