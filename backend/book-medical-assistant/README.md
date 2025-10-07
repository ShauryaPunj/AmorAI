# 🧠 AI Healthcare Assistant

A multi-agent, modular AI assistant that integrates book discovery, medical imaging, lab diagnostics, and voice interaction into one cohesive system — built with Python.

---

## 🔍 Overview

This project combines multiple components of an AI-driven medical assistant:
- 📚 **Book Recommender** – Finds relevant books/articles based on intent and context.
- 🧪 **Lab Assistant** – Handles lab diagnostics logic.
- 🧠 **Imaging System** – Analyzes medical images.
- 🎙️ **Speech Integration** – Converts speech to text and vice versa.
- 🤖 **LLM Agents** – Decision-making via LLM-integrated agents.

---

## 🗂️ Project Structure

book-medical-assistant/
│
├── app/                       #
│   ├── __init__.py
│   ├── agents/
│   ├── tools/
│   └── ...
│
├── modules/                   
│   ├── lab.py
│   ├── tts.py
│   ├── stt.py
│   ├── healthcare_integration.py
│   ├── quesandans.py
│   └── imaging.py
│
├── main.py                    
├── requirements.txt           
├── .env                       
├── .gitignore                 
└── README.md                  

# 📚 Book & Medical Assistant AI

![Banner](./A_flat-style_digital_graphic_design_banner_for_the.png)

An intelligent, modular assistant for discovering medical books, research articles, and aiding diagnostics via speech, OCR, and agent-powered interactions.

---

## 🛠️ Features

- 🤖 **Multi-agent architecture**  
  Coordinator, IntentAgent, ResearchAgent handle specific roles collaboratively.

- 📖 **LLM-integrated Book/Article Recommendation**  
  Uses GPT API to recommend books/articles based on intent and query.

- 🧠 **OCR and Image Recognition**  
  Extracts text from lab reports and diagnoses images using computer vision.

- 🗣️ **Speech Recognition & TTS Integration**  
  Converts voice input using SpeechRecognition and responds with gTTS.

- 🧩 **Modular Architecture**  
  Clean separation of logic in modules for easy extension and maintenance.

---

## 🤖 Tech Stack

- **Programming Language**: Python 3.9+
- **Language Model**: OpenAI GPT (via API)
- **Speech**: gTTS, SpeechRecognition
- **OCR**: Pillow, PyTesseract
- **Architecture**: Modular multi-agent system

---

## 📚 Future Enhancements

- 🌐 **Web Interface**: Streamlit or Gradio integration for UI  
- 🩺 **Doctor Recommendation**: Semantic search-based doctor suggestion system  
- 🏥 **EHR System Integration**: Sync with electronic health records  
- 🧠 **Advanced Prompt Chaining**: Using LangChain or Autogen for dynamic reasoning

---

## 🧑‍💻 Author

**Mansi Gambhir**  
👩‍🎓 B.Tech @ Thapar Institute of Engineering and Technology  
   Intern - Samsung Research Institute - Bangalore

---

## 🚀 How to Run

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/book-medical-assistant.git
cd book-medical-assistant

# 2. Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate     # On Windows
# source venv/bin/activate  # On macOS/Linux

# 3. Install dependencies
pip install -r requirements.txt

# 4. Set up .env file with your OpenAI API key
touch .env
# Add: OPENAI_API_KEY=your_key_here

# 5. Run the app
python main.py
