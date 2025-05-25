# 🚀 YC AI Startup School Simulation

**Waitlisted by YC AI Startup School?** So were we.  
Instead of waiting, we built our own interactive simulation—a virtual YC experience where *anyone* can explore, learn from AI leaders, and build community in a gamified environment.

---

## 🌟 Why We Built It

> We applied to YC AI Startup School and got waitlisted.  
> So we thought: why not simulate the experience ourselves?

This project is our way of recreating the magic of YC in a community-led, open-source way—where anyone can plug in, play, and grow.

---
## 🎯 What This Is

A virtual world where you can:
- 🧠 Learn AI from top thinkers
- 🤝 Network in real time
- 🎮 Explore YC’s startup ecosystem—game-style
- 🗣️ Interact with 10+ iconic AI leaders via simulated conversations

---

## 🧠 Inspiration

We owe creative thanks to:
- [**Decoding ML**](https://decodingml.substack.com): for their hands-on AI learning approach  
- [**The Neural Maze**](https://theneuralmaze.substack.com): for reimagining how ML can be taught

---

## 🎮 Gameplay Overview

| Feature | Description |
|--------|-------------|
| **Interactive Campus** | Navigate a YC-like map built in Phaser |
| **Meet AI Legends** | Chat with avatars of Sam Altman, Fei-Fei Li, Karpathy & more |
| **Custom Characters** | Bring your own avatar into the simulation |
| **Smooth Controls** | Arrow keys to move, spacebar to chat, ESC to pause |

---

## 🛠️ Tech Stack

| Category | Tool |
|---------|------|
| **UI Framework** | Phaser.js |
| **Agent Logic** | Langraph |
| **Memory Storage** | MongoDB |
| **Evaluation Engine** | Opik |
| **Inference** | Groq |
| **API Framework** | FastAPI |
| **Deployment** | Docker |

---

## 📐 Architecture

![Architecture Diagram](https://github.com/user-attachments/assets/014822aa-4cd2-4d87-8b36-b651039d9ec0)

---

## ⚙️ Setup Instructions

> **Fastest Way to Get Started**

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/yc-simulation.git
cd yc-simulation
```

---

### 2. Install Frontend (Game UI)

```bash
cd philoagents-ui
npm install
```

---

### 3. Install Backend (Agent API)

```bash
cd ../philoagents-course/philoagents-api
uv venv .venv
. ./.venv/bin/activate   # or source ./.venv/bin/activate
uv pip install -e .
uv run python --version  # should be 3.11.9
```

---

### 4. Set Up Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your credentials. Refer to [Cloud Services](#-prerequisites) for help.

---

### 5. Launch Docker Infrastructure

Make sure ports `27017`, `8000`, and `8080` are free.

```bash
cd ../../
make infrastructure-up      # Start
make infrastructure-stop    # Stop
make infrastructure-build   # Build (if needed)
```

---

### 6. Play the Game

Open [http://localhost:8080](http://localhost:8080)  
Use the arrow keys to move, spacebar to chat, ESC to pause.

---

## 🎮 Controls

| Action | Key |
|--------|-----|
| Move   | ← ↑ ↓ → |
| Interact | SPACE |
| Pause/Menu | ESC |

---

## 🧰 Tool Versions

| Tool | Version | Use | Link |
|------|---------|-----|------|
| Python | 3.11 | Runtime | [Download](https://www.python.org/downloads/) |
| `uv` | ≥ 0.4.30 | Virtual env + installer | [uv GitHub](https://github.com/astral-sh/uv) |
| GNU Make | ≥ 3.81 | Automation | [GNU Make](https://www.gnu.org/software/make/) |
| Git | ≥ 2.44.0 | Version control | [Git](https://git-scm.com/downloads) |
| Docker | ≥ 27.4.0 | Containerization | [Docker](https://www.docker.com/get-started/) |

---

## 🤝 Contribute

We’d love to see your remix of this idea!  
Feel free to fork the repo, submit pull requests, or share feedback.

---

## 👥 Authors

- **Deep** @Worcester Polytechnic Institute, email: dssuchak@wpi.edu  
- **Aaditya** @Kelley School of Business, Indiana University, email: agadiyar@iu.edu

---

## 📄 License

[MIT License](LICENSE)

---

> 🚫 **Disclaimer**  
> This is a fan-made project and is not affiliated with Y Combinator.
