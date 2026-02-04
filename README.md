# Work Dashboard

A comprehensive personal productivity dashboard built with Next.js, featuring GitHub statistics, weather updates, todo management, and quick links.

## Features

### 🕐 **Time & Date Widget**
- Real-time clock with live updates
- Current date with day of the week
- Clean, minimalist design

### 📊 **GitHub Statistics** (User: TLSenZ)
- Repository overview with stars and forks
- Recent commits activity
- Pull requests summary (open/closed)
- Profile information
- Auto-refresh every 5 minutes

### 🌤️ **Weather Widget** (City: Neuenegg)
- Current temperature and weather conditions
- Weather icons and descriptions
- Humidity, wind speed, and visibility
- Sunrise and sunset times
- Auto-refresh every 10 minutes

### ✅ **Todo Queue**
- Add tasks with priority levels (High/Medium/Low)
- Mark tasks as complete/incomplete
- Filter by status (all/active/completed)
- Persistent storage using localStorage
- Clear completed tasks

### 🔗 **Quick Links**
- YouTube
- Reddit  
- Microsoft Teams
- GitHub (TLSenZ profile)
- OneNote
- Clean icon-based layout

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd work-dashboard
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Edit \`.env.local\` and add your API keys:
   \`\`\`
   NEXT_PUBLIC_GITHUB_TOKEN=your_github_personal_access_token
   OPENWEATHER_API_KEY=your_openweather_api_key
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## 🔧 Configuration

### GitHub API Token
To get the best GitHub experience, create a Personal Access Token:
1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Generate a new token with \`public_repo\` and \`read:user\` scopes
3. Add it to your \`.env.local\` file

### OpenWeatherMap API Key
1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your free API key
3. Add it to your \`.env.local\` file

## 🎨 Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Data Fetching**: SWR (with caching)
- **Storage**: localStorage for todos

## 📱 Responsive Design

The dashboard is fully responsive with:
- **Mobile**: Single column layout
- **Tablet**: Two column layout  
- **Desktop**: Three column layout

## 🔒 Privacy & Security

- All data is stored locally in your browser
- GitHub and Weather API keys are stored in environment variables
- No data is sent to external servers (except API calls)

## 🛠️ Development

### Available Scripts

\`\`\`bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
\`\`\`

### Project Structure

\`\`\`
src/
├── app/                 # Next.js app directory
├── components/
│   ├── ui/             # Reusable UI components
│   ├── widgets/        # Dashboard widgets
│   └── layout/         # Layout components
├── lib/                # Utilities and API integrations
└── hooks/              # Custom React hooks
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide React](https://lucide.dev/) - Beautiful icons
- [GitHub API](https://docs.github.com/en/rest) - GitHub data
- [OpenWeatherMap](https://openweathermap.org/api) - Weather data

---

Made with ❤️ for productivity# Dash
