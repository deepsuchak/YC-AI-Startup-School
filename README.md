# YC AI Startup School Simulation 🚀

Waitlisted from YC AI Startup School, we decided to take matters into our own hands—building a virtual simulation where anyone can learn, network, and engage with leading minds in AI through an interactive and immersive experience.

## 🎯 Purpose

We got waitlisted for YC AI Startup School, so we decided to build our own simulation! This project lets you:
- Network with AI tech leaders in a virtual environment
- Learn from industry experts through interactive conversations
- Experience YC's environment in a gamified way
- Engage in meaningful discussions about AI, startups, and technology

## 🏗️ Architecture

### Frontend (Phaser.js Game)
- **Main Game Scene**: Interactive environment with AI tech leaders
- **Characters**: 
  - AI Leaders (Elon Musk, Sam Altman, François Chollet, Andrej Karpathy and the entire speaker lineup of the event)
  - Student Characters (Deep and Aaditya)
- **Dialogue System**: Real-time conversations with AI personalities
- **Movement System**: Pokemon-style navigation and character interactions

### Backend (AI Conversation Engine)
- Powered by LLM Agents
- Real-time dialogue processing
- Character-specific knowledge and personalities
- WebSocket integration for smooth conversations

## ⛏️Tech Stack
- **Agent Orchestration**: Langraph
- **Agent Evaluation**: Opik
- **Inference**: Groq
- **API Serving**: FastAPI
- **Production Readiness**: Docker
- **UI**: Phaser (a JS framework)

## 🎮 Key Features

- **Interactive Environment**: Explore a virtual YC campus
- **AI Tech Leaders**: Chat with 10+ prominent figures in AI
- **Real-time Conversations**: Engage in meaningful discussions
- **Custom Characters**: Add your own avatar to the simulation
- **Dynamic Movement**: Smooth character controls and interactions

## 🚀 Getting Started

1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/yc-simulation.git
cd yc-simulation
```

2. **Install Dependencies**
```bash
# Install UI dependencies
cd philoagents-ui
npm install

# Install API dependencies
cd ../philoagents-api
pip install -r requirements.txt
```

3. **Start the Application**
```bash
# Start the frontend (in philoagents-ui directory)
npm run dev

# Start the backend (in philoagents-api directory)
python -m src.main
```

4. **Access the Game**
- Open `http://localhost:8080` in your browser
- Use arrow keys to move
- Press SPACE to interact with characters
- Press ESC to pause/menu

## 🎛️ Controls

- **Arrow Keys**: Move your character
- **Space**: Interact with AI leaders
- **ESC**: Open pause menu/close dialogues

## ✨ Inspiration

This project draws inspiration from amazing AI education platforms:
- [Decoding ML](https://decodingml.substack.com) - For their innovative approach to AI education
- [The Neural Maze](https://theneuralmaze.substack.com) - For their creative way of teaching ML concepts

## 🤝 Contributing

Feel free to fork this project and create your own version of the AI Startup School simulation! Pull requests are welcome.

## 📝 License

MIT License - feel free to use this for your own simulations!

## 🙋‍♂️ Authors

- Deep @WPI
- Aaditya @Kelley,IU

---

*This project is not affiliated with Y Combinator. It's a fan-made simulation created for educational and entertainment purposes.*
