import json
import os
import logging
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings

logging.basicConfig(level=logging.INFO)

BASE_PATH = os.path.dirname(__file__)
VECTOR_PATH = os.path.join(BASE_PATH, "../vector_db")

# 🔹 Load JSON
def load_json(filename):
    path = os.path.join(BASE_PATH, f"../data/{filename}")
    with open(path, "r") as f:
        return json.load(f)

# 🔹 Embedding model
embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

# 🔹 Build or Load DB
def load_or_create_db(name, documents):
    db_path = os.path.join(VECTOR_PATH, name)

    if os.path.exists(db_path):
        logging.info(f"Loading {name} from disk...")
        return FAISS.load_local(db_path, embedding_model, allow_dangerous_deserialization=True)
    else:
        logging.info(f"Creating {name}...")
        db = FAISS.from_texts(documents, embedding_model)
        db.save_local(db_path)
        return db

# 🔹 Prepare data
faq_data = load_json("FAQ.json")
faculty_data = load_json("Faculty.json")
notices_data = load_json("Notices.json")

faq_docs = [f"Q: {x['question']} A: {x['answer']}" for x in faq_data]

faculty_docs = [
    f"Faculty: {x['name']}, Dept: {x['department']}, Email: {x['email']}"
    for x in faculty_data
]

notice_docs = [
    f"Notice: {x['title']} on {x['date']} - {x['details']}"
    for x in notices_data
]

# 🔹 Load or create DBs
faq_db = load_or_create_db("faq_db", faq_docs)
faculty_db = load_or_create_db("faculty_db", faculty_docs)
notice_db = load_or_create_db("notice_db", notice_docs)

# 🔹 Router
def detect_category(query: str) -> str:
    q = query.lower()

    # Expanded robust keywords
    faculty_kw = ["faculty", "teacher", "professor", "dr.", "prof", "teach", "department", "email", "head", "hod"]
    notice_kw = ["event", "notice", "exam", "hackathon", "date", "when is", "schedule", "talk", "seminar", "mid sem"]

    # Score-based routing to handle overlapping intents
    faculty_score = sum(1 for w in faculty_kw if w in q)
    notice_score = sum(1 for w in notice_kw if w in q)

    if faculty_score > notice_score and faculty_score > 0:
        return "faculty"
    elif notice_score > faculty_score and notice_score > 0:
        return "notice"
    elif "!" in q or "?" in q or q.startswith("what") or q.startswith("how"):
        # Explicit questions are usually FAQs
        return "faq"
    else:
        return "faq" # Default fallback

# 🔹 Retrieval with error handling
def retrieve_context(query: str, k: int = 3):
    try:
        category = detect_category(query)
        logging.info(f"==> [RAG Debug] Detected Category: {category} for query: '{query}'")

        # Prioritize the detected category, but also pull a little from others as fallback
        primary_results = []
        fallback_results = []

        if category == "faculty":
            primary_results = faculty_db.similarity_search(query, k=k)
            fallback_results = faq_db.similarity_search(query, k=1)
        elif category == "notice":
            primary_results = notice_db.similarity_search(query, k=k)
            fallback_results = faq_db.similarity_search(query, k=1)
        else:
            primary_results = faq_db.similarity_search(query, k=k)
            fallback_results = notice_db.similarity_search(query, k=1)

        # Log retrieved content for debugging
        logging.info(f"==> [RAG Debug] Retrieved {len(primary_results)} primary docs and {len(fallback_results)} fallback docs.")
        for i, r in enumerate(primary_results):
            logging.info(f"    Primary Doc {i+1}: {r.page_content}")

        context_pieces = [r.page_content for r in primary_results + fallback_results]
        return "\n".join(context_pieces)

    except Exception as e:
        logging.error(f"==> [RAG Debug] Error in retrieval: {str(e)}")
        return ""