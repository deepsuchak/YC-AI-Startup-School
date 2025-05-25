FROM python@sha256:df52c7d12cc5bd9b0437abbf295ef7eb78f68948e906d68cec8741a585bb6df3

# Install uv.
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Set the working directory.
WORKDIR /app

# Install the application dependencies.
COPY uv.lock pyproject.toml README.md ./
RUN uv sync --frozen --no-cache

# Copy the application into the container.
COPY src/philoagents philoagents/
COPY tools tools/

# CMD ["/app/.venv/bin/fastapi", "run", "philoagents/infrastructure/api.py", "--port", "8000", "--host", "0.0.0.0"]
CMD ["/app/.venv/bin/fastapi","run", "philoagents/infrastructure/api.py", "--port", "8000", "--host", "0.0.0.0"]