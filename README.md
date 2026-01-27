# Portfolio Website

A high-performance, senior-level personal portfolio website built with React and Vite, featuring smooth animations and a modern, aesthetic design.

## 🚀 Features

- **Modern React Architecture**: Built with React 18, functional components, and hooks
- **Smooth Animations**: Powered by Framer Motion for stunning transitions and micro-interactions
- **Responsive Design**: Fully responsive layout that works beautifully on all devices
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Performance Optimized**: Lazy loading, memoization, and optimized rendering
- **Beautiful UI**: Soft pastel color palette with modern glassmorphism effects
- **Intro Animation**: Engaging splash screen with animated typography
- **Smooth Navigation**: Sticky navigation with active section tracking
- **Interactive Components**: Hover effects, modals, and animated forms

## 🎨 Design System

### Color Palette
- **Dusty Rose**: `#d4a5a5`
- **Sage Green**: `#87a96b`
- **Soft Grey**: `#8b8c89`
- **Warm Beige**: `#f5e6d3`
- **Soft White**: `#faf8f6`

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero.jsx              # Hero section with animated intro
│   ├── About.jsx             # About section with services
│   ├── Skills.jsx            # Skills grid with progress bars
│   ├── Projects.jsx          # Projects showcase with modal view
│   ├── Experience.jsx        # Timeline experience section
│   ├── Contact.jsx           # Contact form and information
│   ├── Navigation.jsx        # Sticky navigation with active states
│   └── IntroAnimation.jsx    # Splash screen animation
├── services/
│   └── portfolioService.js  # Data service for portfolio content
├── App.jsx                   # Main application component
├── main.jsx                  # Application entry point
└── index.css                 # Global styles and design system
```

## 🛠️ Technologies Used

- **React 18**: Modern React with hooks and concurrent features
- **Vite**: Fast build tool and development server
- **Framer Motion**: Animation library for smooth transitions
- **React Icons**: Icon library for UI elements
- **CSS3**: Modern CSS with custom properties and animations

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd aastha-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📱 Sections

1. **Hero**: Introduction with name, title, and key information
2. **About**: Personal bio and services offered
3. **Skills**: Technical skills with animated progress indicators
4. **Projects**: Project showcase with modal details
5. **Experience**: Work experience timeline
6. **Contact**: Contact form and information

## 🎯 Key Features

### Animations
- Intro splash screen with letter animations
- Scroll-triggered section animations
- Hover micro-interactions
- Smooth page transitions
- Loading states

### Navigation
- Sticky header with scroll effects
- Active section highlighting
- Smooth scroll to sections
- Mobile-responsive hamburger menu

### Performance
- Component memoization where needed
- Optimized re-renders
- Lazy loading considerations
- Efficient animation handling

### Accessibility
- Semantic HTML5 structure
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- High contrast mode support
- Reduced motion support

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Android Chrome)

## 📝 Data Source

Portfolio content is structured and managed through the `portfolioService.js` file, which provides a centralized data source for all sections including:
- Personal information
- Skills and technologies
- Work experience
- Projects and descriptions
- Contact details

## 🎨 Customization

### Colors
Modify the CSS custom properties in `index.css`:

```css
:root {
  --dusty-rose: #d4a5a5;
  --sage-green: #87a96b;
  --soft-grey: #8b8c89;
  --warm-beige: #f5e6d3;
  --soft-white: #faf8f6;
}
```

### Content
Update the portfolio data in `src/services/portfolioService.js` to customize:
- Personal information
- Skills list
- Experience details
- Projects information
- Contact details

## 🚀 Deployment

### Netlify
1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

### Vercel
1. Import your repository
2. Vercel will auto-detect the settings
3. Deploy!

### GitHub Pages
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your GitHub Pages branch

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Contact

For any questions or inquiries, please reach out through the contact form in the portfolio or via email.

---

Built with ❤️ using React, Vite, and Framer Motion
