import React, { useState, useEffect } from 'react';
import { BookOpen, User, Menu, X, Play, Clock, Users, Star, MessageCircle, Send, ChevronRight, CheckCircle, Award } from 'lucide-react';
import { CurriculumContent } from './components/CurriculumContent';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  students: number;
  rating: number;
  image: string;
  curriculum: string[];
  progress?: number;
}

interface UserProgress {
  courseId: string;
  progress: number;
  completedLessons: string[];
}

interface AIQuery {
  id: string;
  question: string;
  answer: string;
  timestamp: Date;
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [aiQueries, setAiQueries] = useState<AIQuery[]>([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const courses: Course[] = [
    {
      id: 'html',
      title: 'Complete HTML Mastery',
      description: 'Master the fundamentals of HTML from basic tags to advanced semantic elements and accessibility features.',
      duration: '4 weeks',
      students: 12500,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
      curriculum: [
        'HTML Document Structure',
        'Basic Tags and Elements',
        'Forms and Input Elements',
        'Semantic HTML5 Elements',
        'Accessibility Best Practices',
        'HTML5 APIs and Features'
      ]
    },
    {
      id: 'css',
      title: 'Advanced CSS & Styling',
      description: 'Learn modern CSS techniques including Flexbox, Grid, animations, and responsive design principles.',
      duration: '6 weeks',
      students: 10800,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=400',
      curriculum: [
        'CSS Fundamentals and Selectors',
        'Flexbox and Grid Layouts',
        'Responsive Design Principles',
        'CSS Animations and Transitions',
        'Modern CSS Features',
        'CSS Architecture and Best Practices'
      ]
    },
    {
      id: 'javascript',
      title: 'JavaScript Fundamentals',
      description: 'Build interactive web applications with JavaScript, from basic syntax to advanced concepts and DOM manipulation.',
      duration: '8 weeks',
      students: 15200,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400',
      curriculum: [
        'JavaScript Basics and Syntax',
        'Functions and Scope',
        'DOM Manipulation',
        'Event Handling',
        'Asynchronous JavaScript',
        'ES6+ Modern Features'
      ]
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Frontend Developer',
      content: 'This platform transformed my coding journey. The AI concept explorer helped me understand complex topics instantly.',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'Web Designer',
      content: 'The interactive courses and progress tracking kept me motivated throughout my learning journey.',
      rating: 5
    },
    {
      name: 'Emma Rodriguez',
      role: 'Full Stack Developer',
      content: 'Excellent curriculum structure and the AI assistance made learning so much more effective.',
      rating: 5
    }
  ];

  // Simulate AI response generation
  const generateAIResponse = async (question: string): Promise<string> => {
    const responses = {
      'html': 'HTML (HyperText Markup Language) is the standard markup language for creating web pages. It uses tags to structure content and define elements like headings, paragraphs, links, and images. HTML provides the skeleton of web pages that browsers can interpret and display.',
      'css': 'CSS (Cascading Style Sheets) is used to style and layout web pages. It controls the visual presentation including colors, fonts, spacing, and positioning. CSS works by selecting HTML elements and applying styling rules to them.',
      'javascript': 'JavaScript is a programming language that adds interactivity to web pages. It can manipulate the DOM, handle events, make HTTP requests, and create dynamic user experiences. JavaScript runs in the browser and can also run on servers with Node.js.',
      'flexbox': 'Flexbox is a CSS layout method that provides an efficient way to arrange and distribute space among items in a container. It makes it easy to create responsive layouts and align items both horizontally and vertically.',
      'dom': 'The DOM (Document Object Model) is a programming interface for HTML documents. It represents the page structure as a tree of objects that JavaScript can manipulate to change content, structure, and styling dynamically.'
    };

    // Simple keyword matching for demo purposes
    const keywords = Object.keys(responses);
    const matchedKeyword = keywords.find(keyword => 
      question.toLowerCase().includes(keyword)
    );

    if (matchedKeyword) {
      return responses[matchedKeyword as keyof typeof responses];
    }

    return `Based on your question about "${question}", I recommend exploring our course materials that cover this topic in detail. Our curriculum is designed to provide comprehensive understanding of web development concepts. You can also check our video lessons and practice exercises for hands-on learning.`;
  };

  const handleAIQuery = async () => {
    if (!currentQuery.trim()) return;

    setIsLoadingAI(true);
    const newQuery: AIQuery = {
      id: Date.now().toString(),
      question: currentQuery,
      answer: '',
      timestamp: new Date()
    };

    setAiQueries(prev => [...prev, newQuery]);

    try {
      const response = await generateAIResponse(currentQuery);
      
      setTimeout(() => {
        setAiQueries(prev => 
          prev.map(query => 
            query.id === newQuery.id 
              ? { ...query, answer: response }
              : query
          )
        );
        setIsLoadingAI(false);
      }, 1500);
    } catch (error) {
      setIsLoadingAI(false);
    }

    setCurrentQuery('');
  };

  const enrollInCourse = (courseId: string) => {
    const existingProgress = userProgress.find(p => p.courseId === courseId);
    if (!existingProgress) {
      setUserProgress(prev => [...prev, {
        courseId,
        progress: 0,
        completedLessons: []
      }]);
    }
    setCurrentPage('dashboard');
  };

  const updateProgress = (courseId: string, lessonIndex: number) => {
    setUserProgress(prev => 
      prev.map(p => {
        if (p.courseId === courseId) {
          const lessonId = `lesson-${lessonIndex}`;
          const completedLessons = p.completedLessons.includes(lessonId) 
            ? p.completedLessons 
            : [...p.completedLessons, lessonId];
          
          const course = courses.find(c => c.id === courseId);
          const progress = course ? (completedLessons.length / course.curriculum.length) * 100 : 0;
          
          return {
            ...p,
            completedLessons,
            progress: Math.round(progress)
          };
        }
        return p;
      })
    );
  };

  useEffect(() => {
    // Add updated progress to courses
    const updatedCourses = courses.map(course => {
      const progress = userProgress.find(p => p.courseId === course.id)?.progress || 0;
      return { ...course, progress };
    });
  }, [userProgress]);

  const Navigation = () => (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LearnTech
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setCurrentPage('home')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'home' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('courses')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'courses' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Courses
            </button>
            <button
              onClick={() => setCurrentPage('ai-explorer')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'ai-explorer' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              AI Explorer
            </button>
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'dashboard' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Dashboard
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
              Sign In
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/50">
          <div className="px-4 py-6 space-y-4">
            <button
              onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}
              className="block w-full text-left text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => { setCurrentPage('courses'); setMobileMenuOpen(false); }}
              className="block w-full text-left text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              Courses
            </button>
            <button
              onClick={() => { setCurrentPage('ai-explorer'); setMobileMenuOpen(false); }}
              className="block w-full text-left text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              AI Explorer
            </button>
            <button
              onClick={() => { setCurrentPage('dashboard'); setMobileMenuOpen(false); }}
              className="block w-full text-left text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              Dashboard
            </button>
          </div>
        </div>
      )}
    </nav>
  );

  const Footer = () => (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">LearnTech</span>
            </div>
            <p className="text-gray-400 text-sm">
              Empowering developers with cutting-edge web development education and AI-powered learning assistance.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Courses</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button onClick={() => { setSelectedCourse(courses[0]); setCurrentPage('course-detail'); }} className="hover:text-white transition-colors">
                  HTML Mastery
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCourse(courses[1]); setCurrentPage('course-detail'); }} className="hover:text-white transition-colors">
                  CSS Advanced
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCourse(courses[2]); setCurrentPage('course-detail'); }} className="hover:text-white transition-colors">
                  JavaScript Fundamentals
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button onClick={() => setCurrentPage('ai-explorer')} className="hover:text-white transition-colors">
                  Help Center
                </button>
              </li>
              <li>
                <button onClick={() => alert('Community page coming soon!')} className="hover:text-white transition-colors">
                  Community
                </button>
              </li>
              <li>
                <button onClick={() => alert('Contact page coming soon!')} className="hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>📧 support@learntech.com</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>📍 San Francisco, CA</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 LearnTech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  const HomePage = () => (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Master Web Development with
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent block">
              AI-Powered Learning
            </span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Learn HTML, CSS, and JavaScript with our interactive courses, get instant AI assistance for your doubts, and track your progress in real-time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('courses')}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Start Learning Now
            </button>
            <button
              onClick={() => setCurrentPage('ai-explorer')}
              className="bg-white/10 backdrop-blur-md text-white px-8 py-3 rounded-lg font-medium border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              Try AI Explorer
            </button>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Master the essential web technologies with our comprehensive, project-based courses
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2"
                onClick={() => {
                  setSelectedCourse(course);
                  setCurrentPage('course-detail');
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm">
                      {course.duration}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 group-hover:from-blue-700 group-hover:to-purple-700">
                    View Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of successful developers who transformed their careers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const CoursesPage = () => (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Courses</h1>
          <p className="text-xl text-gray-600">Choose your path to web development mastery</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => {
            const progress = userProgress.find(p => p.courseId === course.id)?.progress || 0;
            return (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-48">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  {progress > 0 && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {progress}% Complete
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setSelectedCourse(course);
                        setCurrentPage('course-detail');
                      }}
                      className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => enrollInCourse(course.id)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                    >
                      {progress > 0 ? 'Continue Learning' : 'Enroll Now'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const CourseDetailPage = () => {
    if (!selectedCourse) return null;
    
    const progress = userProgress.find(p => p.courseId === selectedCourse.id);
    const completedLessons = progress?.completedLessons || [];
    const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'progress'>('overview');
    
    return (
      <div className="pt-16 min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={() => setCurrentPage('courses')}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
          >
            <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
            Back to Courses
          </button>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative h-64">
              <img
                src={selectedCourse.image}
                alt={selectedCourse.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h1 className="text-3xl font-bold mb-2">{selectedCourse.title}</h1>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {selectedCourse.duration}
                  </span>
                  <span className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {selectedCourse.students.toLocaleString()} students
                  </span>
                  <span className="flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                    {selectedCourse.rating}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              {/* Tab Navigation */}
              <div className="flex space-x-1 mb-8 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                    activeTab === 'overview'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('curriculum')}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                    activeTab === 'curriculum'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Detailed Curriculum
                </button>
                <button
                  onClick={() => setActiveTab('progress')}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                    activeTab === 'progress'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Progress Tracker
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Description</h2>
                  <p className="text-gray-600 mb-8 leading-relaxed">{selectedCourse.description}</p>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Curriculum</h3>
                  <div className="space-y-3">
                    {selectedCourse.curriculum.map((lesson, index) => {
                      const lessonId = `lesson-${index}`;
                      const isCompleted = completedLessons.includes(lessonId);
                      
                      return (
                        <div
                          key={index}
                          className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-300 ${
                            isCompleted 
                              ? 'bg-green-50 border-green-200' 
                              : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                              isCompleted 
                                ? 'bg-green-500 text-white' 
                                : 'bg-gray-200 text-gray-600'
                            }`}>
                              {isCompleted ? <CheckCircle className="h-4 w-4" /> : index + 1}
                            </div>
                            <span className={`font-medium ${isCompleted ? 'text-green-700' : 'text-gray-700'}`}>
                              {lesson}
                            </span>
                          </div>
                          {progress && (
                            <button
                              onClick={() => updateProgress(selectedCourse.id, index)}
                              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                isCompleted
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                              }`}
                            >
                              {isCompleted ? 'Completed' : 'Mark Complete'}
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
                    {progress ? (
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Progress</span>
                          <span className="text-sm font-medium text-gray-700">{progress.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${progress.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          {completedLessons.length} of {selectedCourse.curriculum.length} lessons completed
                        </p>
                      </div>
                    ) : (
                      <div className="text-center mb-6">
                        <Award className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                        <h4 className="font-bold text-gray-900 mb-2">Ready to Start?</h4>
                        <p className="text-sm text-gray-600">
                          Enroll now and begin your learning journey
                        </p>
                      </div>
                    )}
                    
                    <button
                      onClick={() => enrollInCourse(selectedCourse.id)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                    >
                      {progress ? 'Continue Learning' : 'Enroll Now'}
                    </button>
                    
                    {progress && (
                      <button
                        onClick={() => setCurrentPage('dashboard')}
                        className="w-full mt-3 bg-white text-gray-700 py-3 rounded-lg font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        View Dashboard
                      </button>
                    )}
                  </div>
                </div>
              </div>
              )}

              {activeTab === 'curriculum' && (
                <CurriculumContent courseId={selectedCourse.id} />
              )}

              {activeTab === 'progress' && (
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Learning Progress Tracker</h2>
                    <p className="text-lg text-gray-600">
                      Monitor your advancement through the course curriculum and track completed objectives.
                    </p>
                  </div>

                  {progress ? (
                    <div className="space-y-6">
                      {/* Overall Progress */}
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Overall Course Progress</h3>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Completion Rate</span>
                          <span className="text-2xl font-bold text-blue-600">{progress.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-500"
                            style={{ width: `${progress.progress}%` }}
                          ></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div className="bg-white rounded-lg p-4">
                            <div className="text-2xl font-bold text-green-600">{completedLessons.length}</div>
                            <div className="text-sm text-gray-600">Lessons Completed</div>
                          </div>
                          <div className="bg-white rounded-lg p-4">
                            <div className="text-2xl font-bold text-blue-600">{selectedCourse.curriculum.length - completedLessons.length}</div>
                            <div className="text-sm text-gray-600">Lessons Remaining</div>
                          </div>
                        </div>
                      </div>

                      {/* Detailed Progress */}
                      <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Lesson-by-Lesson Progress</h3>
                        <div className="space-y-4">
                          {selectedCourse.curriculum.map((lesson, index) => {
                            const lessonId = `lesson-${index}`;
                            const isCompleted = completedLessons.includes(lessonId);
                            
                            return (
                              <div
                                key={index}
                                className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-300 ${
                                  isCompleted 
                                    ? 'bg-green-50 border-green-200' 
                                    : 'bg-gray-50 border-gray-200'
                                }`}
                              >
                                <div className="flex items-center space-x-4">
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                                    isCompleted 
                                      ? 'bg-green-500 text-white' 
                                      : 'bg-gray-200 text-gray-600'
                                  }`}>
                                    {isCompleted ? <CheckCircle className="h-5 w-5" /> : index + 1}
                                  </div>
                                  <div>
                                    <h4 className={`font-medium ${isCompleted ? 'text-green-700' : 'text-gray-700'}`}>
                                      {lesson}
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                      {isCompleted ? 'Completed' : 'Not started'}
                                    </p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => updateProgress(selectedCourse.id, index)}
                                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    isCompleted
                                      ? 'bg-green-100 text-green-700 cursor-default'
                                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                  }`}
                                  disabled={isCompleted}
                                >
                                  {isCompleted ? 'Completed' : 'Mark Complete'}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Award className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Enroll to Track Progress</h3>
                      <p className="text-gray-600 mb-6">
                        Enroll in this course to start tracking your learning progress and achievements.
                      </p>
                      <button
                        onClick={() => enrollInCourse(selectedCourse.id)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                      >
                        Enroll Now
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AIExplorerPage = () => (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Concept Explorer</h1>
          <p className="text-xl text-gray-600">
            Get instant, personalized explanations for your coding questions
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                value={currentQuery}
                onChange={(e) => setCurrentQuery(e.target.value)}
                placeholder="Ask anything about HTML, CSS, or JavaScript..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleAIQuery()}
              />
              <MessageCircle className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
            <button
              onClick={handleAIQuery}
              disabled={!currentQuery.trim() || isLoadingAI}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Send className="h-4 w-4" />
              <span>{isLoadingAI ? 'Thinking...' : 'Ask AI'}</span>
            </button>
          </div>
          
          <div className="text-sm text-gray-600 mb-6">
            <p className="mb-2"><strong>Try asking:</strong></p>
            <div className="flex flex-wrap gap-2">
              {['What is HTML?', 'How does CSS flexbox work?', 'Explain JavaScript DOM', 'What are CSS selectors?', 'How to use JavaScript events?'].map((example) => (
                <button
                  key={example}
                  onClick={() => setCurrentQuery(example)}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs hover:bg-gray-200 transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          {aiQueries.slice().reverse().map((query) => (
            <div key={query.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span className="font-medium">Your Question</span>
                </div>
                <p className="mt-2">{query.question}</p>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">AI</span>
                  </div>
                  <span className="font-medium text-gray-700">AI Assistant</span>
                </div>
                
                {query.answer ? (
                  <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                    {query.answer}
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-gray-500">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                    <span>Generating response...</span>
                  </div>
                )}
                
                <div className="mt-4 text-xs text-gray-500">
                  {query.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          
          {aiQueries.length === 0 && (
            <div className="text-center py-12">
              <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No questions yet. Ask your first question above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const DashboardPage = () => (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Learning Dashboard</h1>
          <p className="text-xl text-gray-600">Track your progress and continue your journey</p>
        </div>
        
        {userProgress.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No courses enrolled yet</h2>
            <p className="text-gray-600 mb-6">Start your learning journey by enrolling in a course</p>
            <button
              onClick={() => setCurrentPage('courses')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Your Courses</h2>
              
              {userProgress.map((progress) => {
                const course = courses.find(c => c.id === progress.courseId);
                if (!course) return null;
                
                return (
                  <div key={progress.courseId} className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {progress.progress}% Complete
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="text-sm text-gray-600">
                          {progress.completedLessons.length} / {course.curriculum.length} lessons
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${progress.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        onClick={() => {
                          setSelectedCourse(course);
                          setCurrentPage('course-detail');
                        }}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                      >
                        Continue Learning
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        View Certificate
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Learning Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Courses Enrolled</span>
                    <span className="font-bold text-blue-600">{userProgress.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Lessons</span>
                    <span className="font-bold text-blue-600">
                      {userProgress.reduce((acc, p) => {
                        const course = courses.find(c => c.id === p.courseId);
                        return acc + (course?.curriculum.length || 0);
                      }, 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Completed Lessons</span>
                    <span className="font-bold text-green-600">
                      {userProgress.reduce((acc, p) => acc + p.completedLessons.length, 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Average Progress</span>
                    <span className="font-bold text-purple-600">
                      {Math.round(
                        userProgress.reduce((acc, p) => acc + p.progress, 0) / userProgress.length
                      )}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setCurrentPage('ai-explorer')}
                    className="w-full bg-white text-gray-700 py-3 rounded-lg font-medium border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Ask AI Assistant</span>
                  </button>
                  <button
                    onClick={() => setCurrentPage('courses')}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Browse More Courses</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'courses':
        return <CoursesPage />;
      case 'course-detail':
        return <CourseDetailPage />;
      case 'ai-explorer':
        return <AIExplorerPage />;
      case 'dashboard':
        return <DashboardPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      {renderCurrentPage()}
      <Footer />
    </div>
  );
}

export default App;