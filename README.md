# 🧠 Vern – AI Game Website Builder

Vern is a powerful Next.js 14 application that lets users generate complete browser games using different AI models from OpenRouter. Choose from GPT-4o, Claude 3.5 Sonnet, Mistral 7B, or Command R+ to create custom games with simple text prompts.

## ✨ Features

- **Multiple AI Models**: Choose from GPT-4o, Claude 3.5 Sonnet, Mistral 7B, and Command R+
- **Simple Interface**: Clean, responsive UI built with TailwindCSS and ShadCN/UI
- **Complete Game Generation**: AI generates full HTML/CSS/JavaScript games ready to play
- **Copy & Play**: One-click copy to clipboard, save as HTML file and play instantly
- **Secure API Integration**: Server-side OpenRouter API integration with environment variables
- **Vercel Ready**: Fully optimized for Vercel deployment

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- OpenRouter API key ([Get one here](https://openrouter.ai/))

### Installation

1. **Clone and install dependencies:**
```bash
git clone <your-repo-url>
cd vern
npm install
```

2. **Set up environment variables:**
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your OpenRouter API key:
```
OPENROUTER_API_KEY=your_actual_openrouter_api_key_here
```

3. **Run the development server:**
```bash
npm run dev
```

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 How to Use

1. **Select an AI Model** from the dropdown (GPT-4o, Claude 3.5 Sonnet, etc.)
2. **Describe your game** in the text area (e.g., "Create a Snake game with arrow controls")
3. **Click Generate Game** and wait for the AI to create your game
4. **Copy the generated code** and save it as an HTML file
5. **Open the HTML file** in your browser to play your custom game!

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: TailwindCSS + ShadCN/UI components
- **AI Integration**: OpenRouter API (GPT-4o, Claude, Mistral, Command R+)
- **Deployment**: Vercel-optimized

## 📁 Project Structure

```
vern/
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts    # OpenRouter API integration
│   │   ├── page.tsx             # Main UI interface
│   │   ├── layout.tsx           # App layout
│   │   └── globals.css          # Global styles
│   ├── components/ui/           # ShadCN UI components
│   └── lib/utils.ts             # Utility functions
├── .env.local                   # Environment variables
└── README.md
```

## 🔧 API Configuration

The `/api/chat` endpoint handles:
- Model selection and prompt processing
- Secure OpenRouter API communication
- Error handling and response formatting
- Rate limiting and security headers

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub** (or your preferred Git provider)

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Add your `OPENROUTER_API_KEY` in Environment Variables
   - Deploy!

3. **Environment Variables in Vercel:**
   ```
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```

## 🎯 Example Prompts

Try these prompts to get started:

- "Create a simple Snake game with arrow key controls and score display"
- "Make a Pong game with paddle controls using W/S and Up/Down arrows"
- "Build a memory card matching game with colorful cards"
- "Create a simple platformer game with jumping and obstacles"
- "Make a Tetris-style block falling game"

## 🔒 Security

- API keys are stored securely in environment variables
- Server-side API calls prevent key exposure
- Input validation and error handling
- Rate limiting ready for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project for your own AI game building adventures!

## 🆘 Support

Having issues? Check that:
- Your OpenRouter API key is valid and has credits
- Environment variables are properly set
- You're using Node.js 18+

---

**Built with ❤️ using Next.js 14, TailwindCSS, and OpenRouter AI**