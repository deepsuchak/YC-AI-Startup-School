from typing import Generator, List, Dict, Any
import json
from pathlib import Path

from langchain_community.document_loaders import WebBaseLoader, WikipediaLoader
from langchain_core.documents import Document
from tqdm import tqdm
from langchain.text_splitter import RecursiveCharacterTextSplitter

from philoagents.domain.philosopher import Philosopher, PhilosopherExtract
from philoagents.domain.philosopher_factory import PhilosopherFactory
from philoagents.config import settings


def get_extraction_generator(
    philosophers: list[PhilosopherExtract],
) -> Generator[tuple[Philosopher, list[Document]], None, None]:
    """Extract documents for a list of philosophers, yielding one at a time.

    Args:
        philosophers: A list of PhilosopherExtract objects containing philosopher information.

    Yields:
        tuple[Philosopher, list[Document]]: A tuple containing the philosopher object and a list of
            documents extracted for that philosopher.
    """

    progress_bar = tqdm(
        philosophers,
        desc="Extracting docs",
        unit="philosopher",
        bar_format="{desc}: {percentage:3.0f}%|{bar}| {n_fmt}/{total_fmt} [{elapsed}<{remaining}, {rate_fmt}] {postfix}",
        ncols=100,
        position=0,
        leave=True,
    )

    philosophers_factory = PhilosopherFactory()
    for philosopher_extract in progress_bar:
        philosopher = philosophers_factory.get_philosopher(philosopher_extract.id)
        progress_bar.set_postfix_str(f"Philosopher: {philosopher.name}")

        philosopher_docs = extract(philosopher, philosopher_extract.urls)

        yield (philosopher, philosopher_docs)


def extract(philosopher: Philosopher, extract_urls: list[str]) -> list[Document]:
    """Extract documents for a single philosopher from all sources and deduplicate them.

    Args:
        philosopher: Philosopher object containing philosopher information.
        extract_urls: List of URLs to extract content from.

    Returns:
        list[Document]: List of deduplicated documents extracted for the philosopher.
    """

    docs = []

    docs.extend(extract_wikipedia(philosopher))
    docs.extend(extract_web_content(philosopher, extract_urls))

    return docs


def extract_wikipedia(philosopher: Philosopher) -> list[Document]:
    """Extract documents for a single philosopher from Wikipedia.

    Args:
        philosopher: Philosopher object containing philosopher information.

    Returns:
        list[Document]: List of documents extracted from Wikipedia for the philosopher.
    """

    loader = WikipediaLoader(
        query=philosopher.name,
        lang="en",
        load_max_docs=1,
        doc_content_chars_max=1000000,
    )
    docs = loader.load()

    for doc in docs:
        doc.metadata["philosopher_id"] = philosopher.id
        doc.metadata["philosopher_name"] = philosopher.name
        doc.metadata["source"] = "wikipedia"

    return docs


def extract_web_content(philosopher: Philosopher, urls: list[str]) -> list[Document]:
    """Extract documents for a single philosopher from web sources.

    Args:
        philosopher: Philosopher object containing philosopher information.
        urls: List of URLs to extract content from.

    Returns:
        list[Document]: List of documents extracted from web sources for the philosopher.
    """

    def extract_content(soup) -> str:
        # Extract paragraphs and headers
        content = []
        for element in soup.find_all(["p", "h1", "h2", "h3", "h4", "h5", "h6"]):
            content.append(element.get_text())

        return "\n\n".join(content)

    if len(urls) == 0:
        return []

    loader = WebBaseLoader(show_progress=False)
    soups = loader.scrape_all(urls)

    documents = []
    for url, soup in zip(urls, soups):
        if "wikipedia.org" in url:
            continue  # Skip Wikipedia URLs as they're handled separately

        text = extract_content(soup)
        metadata = {
            "source": "web",
            "philosopher_id": philosopher.id,
            "philosopher_name": philosopher.name,
            "url": url
        }

        if title := soup.find("title"):
            metadata["title"] = title.get_text().strip(" \n")

        documents.append(Document(page_content=text, metadata=metadata))

    return documents


def load_extraction_metadata() -> List[Dict[str, Any]]:
    """Load extraction metadata from JSON file."""
    metadata_path = Path(settings.DATA_DIR) / "extraction_metadata.json"
    with open(metadata_path, "r") as f:
        return json.load(f)


def extract_wikipedia_documents(metadata: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Extract documents from Wikipedia."""
    documents = []
    for item in metadata:
        if not item["urls"]:
            continue
        for url in item["urls"]:
            if "wikipedia.org" in url:
                try:
                    # Extract page title from URL
                    page_title = url.split("/")[-1]
                    loader = WikipediaLoader(page_title)
                    docs = loader.load()
                    for doc in docs:
                        doc.metadata.update({
                            "source": "wikipedia",
                            "philosopher_id": item["id"],
                            "url": url
                        })
                    documents.extend(docs)
                except Exception as e:
                    print(f"Error extracting {url}: {e}")
    return documents


def extract_web_documents(metadata: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Extract documents from web sources."""
    documents = []
    for item in metadata:
        if not item["urls"]:
            continue
        for url in item["urls"]:
            if "wikipedia.org" not in url:
                try:
                    loader = WebBaseLoader(url)
                    docs = loader.load()
                    for doc in docs:
                        doc.metadata.update({
                            "source": "web",
                            "philosopher_id": item["id"],
                            "url": url
                        })
                    documents.extend(docs)
                except Exception as e:
                    print(f"Error extracting {url}: {e}")
    return documents


def extract_documents() -> List[Dict[str, Any]]:
    """Extract documents from all sources."""
    metadata = load_extraction_metadata()
    wikipedia_docs = extract_wikipedia_documents(metadata)
    web_docs = extract_web_documents(metadata)
    return wikipedia_docs + web_docs


def split_documents(documents: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Split documents into chunks."""
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=settings.CHUNK_SIZE,
        chunk_overlap=settings.CHUNK_OVERLAP,
        length_function=len,
    )
    return text_splitter.split_documents(documents)


if __name__ == "__main__":
    # Test extraction with a philosopher ID (mapped to tech leader)
    philosopher = PhilosopherFactory().get_philosopher("plato")  # Maps to Sam Altman
    docs = extract_web_content(
        philosopher,
        [
            "https://en.wikipedia.org/wiki/Sam_Altman",
            "https://www.ycombinator.com/people/sam-altman"
        ],
    )
    print(docs)