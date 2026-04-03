import json
import os
import logging
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings

# Set up logging for debugging
logging.basicConfig(level=logging.INFO)

# path to the current file and vector DB directory
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
def load_or_create_db(name, documents, force_rebuild=True):
    db_path = os.path.join(VECTOR_PATH, name)

    # In development, rebuilding is fast and ensures JSON changes are immediately reflected.
    if os.path.exists(db_path) and not force_rebuild:
        logging.info(f"Loading {name} from disk...")
        return FAISS.load_local(db_path, embedding_model, allow_dangerous_deserialization=True)
    else:
        logging.info(f"Creating or updating {name}...")
        db = FAISS.from_texts(documents, embedding_model)
        db.save_local(db_path)
        return db

# 🔹 Prepare data
faq_data = load_json("FAQ.json")
faculty_data = load_json("Faculty.json")
notices_data = load_json("Notices.json")

# faq_docs is formatted as "Q: question A: answer" to provide clear structure for the model, while faculty_docs and notice_docs are formatted to highlight key details in a consistent manner. This structured formatting helps the embedding model capture the relevant information more effectively during similarity search.
faq_docs = [f"Q: {x['question']} A: {x['answer']}" for x in faq_data]

# For faculty and notices, we create concise summaries that include the most relevant details. This helps the model quickly identify important information during retrieval, especially when the user's query is about faculty members or notices. The consistent formatting also aids in better embedding generation and similarity matching.
faculty_docs = [
    f"Faculty: {x['name']}, Dept: {x['department']}, Email: {x['email']}"
    for x in faculty_data
]

# For notices, we include the title, date, and a brief detail to ensure that the model can easily match queries related to events, schedules, or important announcements. This structured format allows for more effective retrieval of relevant notices when users ask about upcoming events or deadlines.
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

    """
    This function detects the category of the user's query to route it to the appropriate vector database for retrieval. It uses a score-based approach to determine whether the query is more likely related to faculty information, notices, or general FAQs. The function checks for the presence of specific keywords associated with each category and assigns scores accordingly. If the query contains explicit question indicators (like "what", "how", "?" or "!"), it defaults to categorizing it as an FAQ. This method allows for more accurate routing, especially in cases where queries may contain overlapping keywords or ambiguous language.

    arguments:
    query (str): The user's input query that needs to be categorized.

    returns:
    str: The detected category of the query, which can be "faculty", "notice", or "faq".
    """

    # Convert to lowercase for case-insensitive matching
    q = query.lower()

    # Expanded robust keywords
    faculty_kw = ["faculty", "teacher", "professor", "dr.", "prof", "teach", "department", "email", "head", "hod"]
    notice_kw = ["event", "notice", "exam", "hackathon", "date", "when is", "schedule", "talk", "seminar", "mid sem"]
    faq_kw = ["what", "how", "why", "where", "when"]

    # Score-based routing to handle overlapping intents
    faculty_score = sum(1 for w in faculty_kw if w in q)
    notice_score = sum(1 for w in notice_kw if w in q)
    faq_score = sum(1 for w in faq_kw if w in q)

    if faculty_score > notice_score and faculty_score > 0:
        return "faculty"
    elif notice_score > faculty_score and notice_score > 0:
        return "notice"
    elif faq_score > 0:
        # Explicit questions are usually FAQs
        return "faq"
    else:
        return "faq" # Default fallback

# 🔹 Retrieval with error handling
def retrieve_context(query: str, k: int = 3):

    """
    This function retrieves relevant context for a given user query by first detecting the category of the query and then performing a similarity search on the appropriate vector database. It prioritizes results from the detected category but also includes fallback results from other categories to ensure that some relevant information is always provided. The function includes error handling to catch and log any exceptions that may occur during the retrieval process, returning an empty string in case of errors. This approach ensures that the system remains robust and can provide useful context even when unexpected issues arise during retrieval.

    arguments:
    query (str): The user's input query for which context needs to be retrieved.
    k (int): The number of top relevant documents to retrieve from the primary category.

    returns:
    str: A concatenated string of relevant context pieces retrieved from the vector databases, or an empty string if an error occurs during retrieval.
    """

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