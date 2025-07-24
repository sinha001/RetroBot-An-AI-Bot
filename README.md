# RetroBot - AI Assistant Web App

A modern, sleek, and responsive AI chatbot interface built with vite and React. RetroBot provides an elegant chat experience with advanced markdown rendering, syntax highlighting, and a clean, professional design.

![RetroBot Logo](./public/vite.svg)
[RetroBot - AI Assistant](https://retrobot-an-ai-bot.vercel.app/)

## ✨ Features

### 🤖 **AI-Powered Conversations**
- Real-time chat with AI assistant
- Markdown response rendering
- Message history and persistence
- Copy functionality for messages and code blocks

### 💻 **Advanced Code Support**
- Syntax highlighting for multiple programming languages
- Language detection from code blocks
- One-click code copying
- Professional code block styling

### 🎨 **Modern UI/UX**
- Clean, minimal design with light theme
- Responsive layout for all screen sizes
- Smooth animations and transitions
- Professional typography and spacing

### 📱 **Responsive Design**
- Mobile-first approach
- Collapsible sidebar for mobile
- Touch-friendly interface
- Optimized for all devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A Gemini API key (or your preferred AI API)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/sinha001/RetroBot-An-AI-Bot.git
   cd RETROBOT-AN-AI-BOT
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Set up environment variables**
   Create a \`.env.local\` file in the root directory:
   \`\`\`env
   GEMINI_API_KEY=your_gemini_api_key_here
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

## 🛠️ Tech Stack

- **Framework**: React JS
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Markdown**: react-markdown
- **Icons**: Lucide React
- **State Management**: React Hooks

## 📁 Project Structure

```
retrobot/
├── src/
│   ├── components/
│   │   └── Answer.tsx          # AI response component with syntax highlighting
│   │
│   ├── components/
│   │    ├── ui/                 # shadcn/ui components
│   │
│   ├── components/                  
│        ├── Logo.tsx                # App logo component
│   
├── public/
│   └── logo.svg                # App logo SVG
├── README.md
└── package.json
```

## 🎯 Key Components

### Main Chat Interface (\`app/App.tsx\`)
- Handles user input and AI responses
- Manages conversation history
- Implements responsive sidebar
- Provides message copying functionality

### Answer Component (\`app/components/Answer.tsx\`)
- Renders AI responses with markdown support
- Custom syntax highlighting for code blocks
- Copy functionality for code snippets
- Professional styling for all markdown elements

### Logo Components (\`assets/Logo*.tsx\`)
- Scalable SVG logo design
- Multiple variants for different use cases
- Gradient styling matching app theme

## 🔧 Configuration

### API Integration

Update the \`URL\` constant in \`./custom.ts\` to point to your AI API endpoint:

\`\`\`typescript
const URL = "https://your-api-endpoint.com/chat"
\`\`\`

### Styling Customization

The app uses Tailwind CSS for styling. Key customizations can be made in:
- \`src/index.css\` - Global styles and custom animations
- \`tailwind.config.js\` - Tailwind configuration
- Component-level styling in individual files

### Supported Programming Languages

The syntax highlighter supports:
- JavaScript/TypeScript
- Python
- HTML
- CSS
- And more (easily extensible)

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (collapsible sidebar)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6) to Purple (#8B5CF6) gradient
- **Secondary**: Gray scale for text and backgrounds
- **Accent**: Pink (#EC4899) for highlights

### Typography
- **Font**: Inter (system font fallback)
- **Headings**: Bold weights with proper hierarchy
- **Body**: Regular weight with optimized line height

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- - [Vite](https://vitejs.dev/) + [React](https://react.dev/) for the amazing frontend tooling and UI library
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Lucide](https://lucide.dev/) for clean, consistent icons
- [react-markdown](https://github.com/remarkjs/react-markdown) for markdown rendering

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Contact the maintainers

---

**Made with ❤️ by Nishant Sinha**

*RetroBot - Your intelligent AI companion for the modern web.*
