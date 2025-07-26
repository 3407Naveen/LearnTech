import React from 'react';
import { BookOpen, Target, Lightbulb, CheckCircle } from 'lucide-react';

interface CurriculumTopic {
  id: string;
  title: string;
  keyConcepts: string;
  theoreticalFoundations: string;
  learningObjectives: string[];
  relevance: string;
}

interface CurriculumContentProps {
  courseId: string;
}

const curriculumData: Record<string, CurriculumTopic[]> = {
  html: [
    {
      id: 'html-structure',
      title: 'HTML Document Structure',
      keyConcepts: 'HTML document structure forms the foundational architecture of web pages, encompassing the hierarchical organization of elements within a standardized markup framework. This topic introduces the essential components including the DOCTYPE declaration, HTML root element, head section for metadata, and body section for visible content. Students learn to understand the semantic relationship between parent and child elements, the importance of proper nesting, and the role of attributes in defining element behavior and characteristics.',
      theoreticalFoundations: 'The theoretical foundation rests upon the principles of structured document markup, derived from SGML (Standard Generalized Markup Language) and XML standards. The concept emphasizes separation of content from presentation, enabling semantic meaning through proper element selection. This approach facilitates accessibility, search engine optimization, and maintainable code architecture. The hierarchical tree structure, known as the Document Object Model (DOM), provides the conceptual framework for understanding how browsers parse and render HTML documents.',
      learningObjectives: [
        'Construct valid HTML documents with proper DOCTYPE and structural elements',
        'Implement semantic HTML5 elements to enhance document meaning and accessibility',
        'Demonstrate understanding of element hierarchy and nesting relationships',
        'Apply best practices for document organization and code readability'
      ],
      relevance: 'Document structure serves as the cornerstone of web development, establishing the foundation upon which all other web technologies build. Mastery of HTML structure is essential for creating accessible, maintainable, and semantically meaningful web content. This knowledge directly supports subsequent learning in CSS styling and JavaScript manipulation, as both technologies rely heavily on proper HTML structure for effective implementation.'
    },
    {
      id: 'basic-tags',
      title: 'Basic Tags and Elements',
      keyConcepts: 'Basic HTML tags and elements constitute the fundamental building blocks of web content, encompassing text formatting, structural organization, and content categorization. This comprehensive study covers essential elements including headings (h1-h6), paragraphs, lists (ordered and unordered), links, images, and basic formatting tags. Students explore the semantic meaning behind each element, understanding when and why to use specific tags to convey appropriate content structure and meaning.',
      theoreticalFoundations: 'The theoretical framework is grounded in semantic markup principles, where each HTML element carries inherent meaning beyond its visual presentation. This approach stems from the concept of content-first design and accessibility standards established by the World Wide Web Consortium (W3C). The principle of semantic correctness ensures that content remains meaningful across different devices, assistive technologies, and presentation contexts, supporting universal design principles and inclusive web development practices.',
      learningObjectives: [
        'Identify and implement appropriate HTML elements for different content types',
        'Create well-structured content hierarchies using heading elements',
        'Develop accessible navigation and content organization using lists and links',
        'Apply semantic markup principles to enhance content meaning and accessibility'
      ],
      relevance: 'Mastery of basic HTML elements is fundamental to all web development activities, providing the vocabulary necessary for creating meaningful web content. This knowledge forms the basis for advanced HTML concepts, CSS styling applications, and JavaScript DOM manipulation. Understanding semantic element usage is crucial for modern web development practices, including search engine optimization, accessibility compliance, and responsive design implementation.'
    },
    {
      id: 'forms-inputs',
      title: 'Forms and Input Elements',
      keyConcepts: 'HTML forms and input elements represent the primary mechanism for user interaction and data collection in web applications. This topic encompasses the comprehensive study of form structure, various input types, validation attributes, and user experience considerations. Students learn to create functional forms using elements such as text inputs, checkboxes, radio buttons, select dropdowns, textareas, and specialized HTML5 input types including email, date, and number inputs.',
      theoreticalFoundations: 'The theoretical foundation is built upon human-computer interaction principles and data validation theory. Forms serve as the interface between users and web applications, requiring careful consideration of usability, accessibility, and security principles. The concept incorporates client-side validation for immediate user feedback and server-side processing for data integrity. Understanding form design principles, including progressive enhancement and graceful degradation, ensures optimal user experience across diverse browsing environments.',
      learningObjectives: [
        'Design and implement comprehensive forms with appropriate input types',
        'Apply HTML5 validation attributes to enhance user experience and data quality',
        'Create accessible forms that support assistive technologies and keyboard navigation',
        'Understand form submission methods and data handling principles'
      ],
      relevance: 'Forms are essential components of interactive web applications, enabling user registration, feedback collection, e-commerce transactions, and data input functionality. This knowledge is crucial for full-stack web development, as forms bridge the gap between frontend user interfaces and backend data processing systems. Understanding form implementation is fundamental to creating engaging, interactive web experiences that meet modern user expectations.'
    },
    {
      id: 'semantic-html5',
      title: 'Semantic HTML5 Elements',
      keyConcepts: 'Semantic HTML5 elements introduce meaningful structural components that enhance document organization and accessibility through purpose-specific tags. This advanced topic covers elements such as header, nav, main, article, section, aside, and footer, which provide clear content categorization and improve document outline structure. Students learn to distinguish between semantic and non-semantic elements, understanding how semantic markup enhances content meaning for both human readers and automated systems.',
      theoreticalFoundations: 'The theoretical basis stems from information architecture principles and accessibility standards that emphasize content meaning over visual presentation. Semantic HTML5 elements embody the principle of progressive enhancement, where content remains accessible and meaningful regardless of styling or scripting capabilities. This approach supports universal design principles, ensuring content accessibility across diverse user agents, assistive technologies, and browsing contexts while improving search engine understanding and content indexing.',
      learningObjectives: [
        'Implement semantic HTML5 elements to create meaningful document structure',
        'Distinguish between semantic and presentational markup approaches',
        'Design accessible content layouts using appropriate semantic containers',
        'Optimize content structure for search engines and assistive technologies'
      ],
      relevance: 'Semantic HTML5 elements are fundamental to modern web development practices, supporting accessibility compliance, search engine optimization, and maintainable code architecture. This knowledge is essential for creating professional web applications that meet contemporary standards for inclusive design and technical excellence. Understanding semantic markup principles directly supports advanced topics in CSS layout design and JavaScript application development.'
    },
    {
      id: 'accessibility',
      title: 'Accessibility Best Practices',
      keyConcepts: 'Web accessibility encompasses the design and development practices that ensure web content is usable by individuals with diverse abilities and disabilities. This critical topic covers ARIA (Accessible Rich Internet Applications) attributes, proper heading hierarchy, alternative text for images, keyboard navigation support, and color contrast considerations. Students learn to implement accessibility features that support screen readers, keyboard-only navigation, and other assistive technologies while maintaining excellent user experience for all users.',
      theoreticalFoundations: 'The theoretical framework is grounded in universal design principles and the Web Content Accessibility Guidelines (WCAG) established by the W3C. These guidelines emphasize four fundamental principles: perceivable, operable, understandable, and robust (POUR). The approach recognizes that accessibility benefits all users, not just those with disabilities, supporting the concept of inclusive design that creates better experiences for everyone. Legal and ethical considerations also inform accessibility practices, as many jurisdictions require web accessibility compliance.',
      learningObjectives: [
        'Implement WCAG guidelines to create accessible web content',
        'Apply ARIA attributes to enhance assistive technology compatibility',
        'Design keyboard-accessible navigation and interactive elements',
        'Evaluate and test web content for accessibility compliance'
      ],
      relevance: 'Accessibility is a fundamental requirement for professional web development, ensuring legal compliance and ethical responsibility in creating inclusive digital experiences. This knowledge is essential for all web development roles and directly impacts user experience design, content strategy, and technical implementation decisions. Understanding accessibility principles enhances overall development skills and supports the creation of high-quality, professional web applications.'
    },
    {
      id: 'html5-apis',
      title: 'HTML5 APIs and Features',
      keyConcepts: 'HTML5 APIs and advanced features extend the capabilities of web applications through browser-native functionality including local storage, geolocation, canvas graphics, audio and video elements, and offline application support. This advanced topic introduces students to modern web application development techniques that leverage browser capabilities without requiring external plugins or frameworks. Students explore the integration of multimedia content, client-side data storage, and enhanced user interaction capabilities.',
      theoreticalFoundations: 'The theoretical foundation rests upon the evolution of web standards toward rich, interactive applications that compete with native desktop and mobile applications. HTML5 APIs embody the principle of progressive enhancement, providing advanced functionality while maintaining backward compatibility. The approach emphasizes standards-based development that reduces dependency on proprietary technologies and plugins, supporting the open web platform vision of universal access and interoperability.',
      learningObjectives: [
        'Implement HTML5 APIs for enhanced web application functionality',
        'Integrate multimedia content using native HTML5 audio and video elements',
        'Utilize local storage and offline capabilities for improved user experience',
        'Apply canvas and graphics APIs for dynamic visual content creation'
      ],
      relevance: 'HTML5 APIs represent the cutting edge of web platform capabilities, enabling the creation of sophisticated web applications that rival native applications in functionality and user experience. This knowledge is crucial for modern web development, supporting the creation of progressive web applications, mobile-responsive designs, and rich interactive experiences. Understanding HTML5 APIs prepares students for advanced web development challenges and emerging technologies in the web platform ecosystem.'
    }
  ],
  css: [
    {
      id: 'css-fundamentals',
      title: 'CSS Fundamentals and Selectors',
      keyConcepts: 'CSS fundamentals encompass the core principles of styling web documents through the separation of content and presentation. This foundational topic covers the CSS syntax structure, including selectors, properties, and values, along with the cascade, specificity, and inheritance mechanisms that govern style application. Students learn various selector types including element, class, ID, attribute, and pseudo-selectors, understanding how to target specific HTML elements for styling while maintaining code organization and efficiency.',
      theoreticalFoundations: 'The theoretical framework is built upon the principle of separation of concerns, where content structure (HTML) remains distinct from visual presentation (CSS). This approach stems from software engineering best practices and supports maintainable, scalable web development. The CSS cascade algorithm provides a systematic method for resolving style conflicts, while specificity calculations ensure predictable style application. Understanding these theoretical foundations enables developers to write efficient, maintainable stylesheets that scale effectively across large projects.',
      learningObjectives: [
        'Apply CSS syntax rules to create well-structured stylesheets',
        'Implement various selector types to target HTML elements effectively',
        'Understand and utilize cascade, specificity, and inheritance principles',
        'Organize CSS code using best practices for maintainability and scalability'
      ],
      relevance: 'CSS fundamentals form the cornerstone of web presentation, enabling the transformation of structured HTML content into visually appealing, user-friendly interfaces. This knowledge is essential for all aspects of frontend development and directly supports advanced topics including responsive design, animations, and modern layout techniques. Mastery of CSS fundamentals is crucial for creating professional web applications that meet contemporary design standards and user expectations.'
    },
    {
      id: 'flexbox-grid',
      title: 'Flexbox and Grid Layouts',
      keyConcepts: 'Modern CSS layout systems, including Flexbox and CSS Grid, provide powerful tools for creating sophisticated, responsive web layouts without relying on floats or positioning hacks. Flexbox excels at one-dimensional layouts, offering flexible distribution of space and alignment of items within containers. CSS Grid provides two-dimensional layout control, enabling complex grid-based designs with precise positioning and responsive behavior. Students learn to choose appropriate layout methods based on design requirements and content structure.',
      theoreticalFoundations: 'The theoretical foundation rests upon modern layout principles that prioritize flexibility, responsiveness, and maintainability over rigid, fixed-width designs. These layout systems embody the principle of content-first design, where layout adapts to content rather than forcing content into predetermined structures. The approach supports responsive web design principles, enabling layouts that work effectively across diverse screen sizes and device capabilities while maintaining visual hierarchy and user experience quality.',
      learningObjectives: [
        'Implement Flexbox for efficient one-dimensional layout design',
        'Create complex two-dimensional layouts using CSS Grid',
        'Choose appropriate layout methods based on design requirements',
        'Design responsive layouts that adapt to various screen sizes and devices'
      ],
      relevance: 'Modern layout techniques are fundamental to contemporary web development, replacing outdated methods with more efficient, maintainable approaches. This knowledge is essential for creating responsive, mobile-first designs that meet modern user expectations across diverse devices. Understanding Flexbox and Grid layouts is crucial for frontend development roles and supports the creation of sophisticated user interfaces that adapt seamlessly to different viewing contexts.'
    },
    {
      id: 'responsive-design',
      title: 'Responsive Design Principles',
      keyConcepts: 'Responsive web design encompasses the methodology and techniques for creating web interfaces that adapt seamlessly to various screen sizes, device capabilities, and user preferences. This comprehensive approach includes fluid grids, flexible images, media queries, and mobile-first design strategies. Students learn to implement breakpoints, optimize content for different viewports, and ensure consistent user experience across desktop, tablet, and mobile devices while considering performance implications and accessibility requirements.',
      theoreticalFoundations: 'The theoretical framework is grounded in the principle of device-agnostic design, recognizing the diversity of web-enabled devices and the impossibility of designing for specific screen sizes. Responsive design theory emphasizes progressive enhancement, where basic functionality works across all devices while enhanced features are layered for capable devices. This approach supports the mobile-first philosophy, acknowledging mobile devices as the primary web access method for many users worldwide.',
      learningObjectives: [
        'Implement responsive design patterns using media queries and flexible layouts',
        'Apply mobile-first design methodology for optimal user experience',
        'Optimize images and media content for various device capabilities',
        'Test and validate responsive designs across multiple devices and browsers'
      ],
      relevance: 'Responsive design is a fundamental requirement for modern web development, as users access web content through an increasingly diverse array of devices and screen sizes. This knowledge is essential for creating professional web applications that provide excellent user experience regardless of the access method. Understanding responsive design principles is crucial for frontend development careers and supports the creation of accessible, inclusive web experiences.'
    },
    {
      id: 'css-animations',
      title: 'CSS Animations and Transitions',
      keyConcepts: 'CSS animations and transitions provide native browser capabilities for creating smooth, engaging visual effects that enhance user experience without requiring JavaScript or external libraries. This topic covers transition properties for smooth state changes, keyframe animations for complex motion sequences, and performance considerations for smooth animation playback. Students learn to implement hover effects, loading animations, and interactive feedback systems that improve user engagement and interface responsiveness.',
      theoreticalFoundations: 'The theoretical foundation is based on principles of user interface design and human-computer interaction, where visual feedback and smooth transitions improve usability and user satisfaction. Animation theory emphasizes purposeful motion that guides user attention, provides feedback for interactions, and creates emotional connections with interfaces. Performance considerations are grounded in browser rendering optimization, ensuring animations enhance rather than degrade user experience across various device capabilities.',
      learningObjectives: [
        'Create smooth transitions for enhanced user interface interactions',
        'Implement complex animations using CSS keyframes and timing functions',
        'Optimize animation performance for smooth playback across devices',
        'Apply animation principles to improve user experience and interface feedback'
      ],
      relevance: 'CSS animations are essential for creating modern, engaging web interfaces that meet contemporary user expectations for interactive, responsive design. This knowledge supports the creation of professional web applications with polished user experiences and is fundamental to frontend development roles. Understanding animation principles enhances overall design skills and supports the creation of memorable, effective user interfaces.'
    },
    {
      id: 'modern-css',
      title: 'Modern CSS Features',
      keyConcepts: 'Modern CSS features encompass cutting-edge capabilities including custom properties (CSS variables), advanced selectors, container queries, and emerging layout techniques that enhance development efficiency and design flexibility. This advanced topic covers CSS preprocessing concepts, component-based styling approaches, and performance optimization techniques. Students explore how modern CSS features support maintainable, scalable stylesheet architecture while enabling sophisticated visual designs and responsive behaviors.',
      theoreticalFoundations: 'The theoretical framework emphasizes the evolution of CSS toward a more powerful, programming-language-like syntax that supports complex web application development. Modern CSS features embody principles of component-based architecture, reusability, and maintainability that align with contemporary software development practices. The approach recognizes CSS as a critical component of the web platform, deserving the same architectural consideration as JavaScript and HTML in complex web applications.',
      learningObjectives: [
        'Implement CSS custom properties for maintainable, themeable stylesheets',
        'Utilize advanced CSS features for enhanced design capabilities',
        'Apply modern CSS architecture patterns for scalable stylesheet organization',
        'Optimize CSS performance and loading strategies for production applications'
      ],
      relevance: 'Modern CSS features are increasingly important for professional web development, enabling more efficient development workflows and sophisticated design implementations. This knowledge is essential for senior frontend development roles and supports the creation of maintainable, scalable web applications. Understanding modern CSS capabilities prepares students for the evolving landscape of web development and emerging design challenges.'
    },
    {
      id: 'css-architecture',
      title: 'CSS Architecture and Best Practices',
      keyConcepts: 'CSS architecture encompasses methodologies and best practices for organizing, structuring, and maintaining large-scale stylesheets in complex web applications. This advanced topic covers naming conventions (BEM, OOCSS, SMACSS), component-based styling approaches, CSS preprocessing, and performance optimization strategies. Students learn to create maintainable, scalable stylesheet architectures that support team collaboration, code reusability, and long-term project sustainability.',
      theoreticalFoundations: 'The theoretical foundation draws from software engineering principles including modularity, separation of concerns, and maintainability applied to CSS development. CSS architecture theory emphasizes predictable, scalable approaches that reduce technical debt and support collaborative development. The approach recognizes CSS as a critical component of application architecture, requiring the same systematic consideration as other software components in complex web applications.',
      learningObjectives: [
        'Implement CSS architecture methodologies for maintainable stylesheet organization',
        'Apply naming conventions and component-based styling approaches',
        'Optimize CSS performance and loading strategies for production environments',
        'Establish development workflows that support team collaboration and code quality'
      ],
      relevance: 'CSS architecture is crucial for professional web development, particularly in team environments and large-scale applications where maintainability and scalability are paramount. This knowledge is essential for senior development roles and technical leadership positions. Understanding CSS architecture principles supports the creation of sustainable, professional web applications that can evolve and scale over time while maintaining code quality and development efficiency.'
    }
  ],
  javascript: [
    {
      id: 'js-basics',
      title: 'JavaScript Basics and Syntax',
      keyConcepts: 'JavaScript basics encompass the fundamental syntax, data types, variables, and operators that form the foundation of JavaScript programming. This comprehensive introduction covers primitive data types (string, number, boolean, null, undefined), variable declaration methods (var, let, const), and basic operators for arithmetic, comparison, and logical operations. Students learn JavaScript\'s dynamic typing system, scope concepts, and the distinction between primitive and reference types, establishing the groundwork for advanced programming concepts.',
      theoreticalFoundations: 'The theoretical framework is grounded in programming language theory and computer science fundamentals, emphasizing JavaScript\'s role as a high-level, interpreted language with dynamic typing capabilities. The approach covers execution context, memory management, and the JavaScript engine\'s role in code interpretation. Understanding these theoretical foundations provides insight into JavaScript\'s behavior, performance characteristics, and the reasoning behind language design decisions that influence programming best practices.',
      learningObjectives: [
        'Demonstrate proficiency in JavaScript syntax and basic programming constructs',
        'Implement appropriate data types and variable declarations for different use cases',
        'Apply operators and expressions to perform calculations and logical operations',
        'Understand scope, hoisting, and variable lifecycle in JavaScript execution'
      ],
      relevance: 'JavaScript basics form the essential foundation for all web development activities involving interactivity, dynamic content, and client-side functionality. This knowledge is fundamental to frontend development, full-stack programming, and modern web application creation. Mastery of JavaScript fundamentals is prerequisite for advanced topics including DOM manipulation, asynchronous programming, and framework utilization, making it crucial for any web development career path.'
    },
    {
      id: 'functions-scope',
      title: 'Functions and Scope',
      keyConcepts: 'JavaScript functions represent reusable code blocks that encapsulate functionality and support modular programming approaches. This topic covers function declaration methods, parameter handling, return values, and the critical concept of scope in JavaScript execution. Students learn about function expressions, arrow functions, higher-order functions, and closures, understanding how scope chains and lexical scoping affect variable accessibility and program behavior throughout the application lifecycle.',
      theoreticalFoundations: 'The theoretical foundation rests upon functional programming principles and scope management theory in programming languages. JavaScript\'s approach to functions as first-class objects enables powerful programming patterns including callbacks, closures, and functional composition. Understanding lexical scoping, execution contexts, and the call stack provides insight into JavaScript\'s execution model and memory management, supporting the development of efficient, maintainable code architectures.',
      learningObjectives: [
        'Create and utilize functions using various declaration methods and patterns',
        'Implement proper scope management and understand variable accessibility rules',
        'Apply closures and higher-order functions for advanced programming techniques',
        'Design modular code architectures using function-based organization principles'
      ],
      relevance: 'Functions and scope management are fundamental to JavaScript programming, supporting code organization, reusability, and maintainability in web applications. This knowledge is essential for creating structured, professional JavaScript code and forms the basis for advanced concepts including object-oriented programming, asynchronous operations, and framework development. Understanding function and scope concepts is crucial for all JavaScript development roles and technical interviews.'
    },
    {
      id: 'dom-manipulation',
      title: 'DOM Manipulation',
      keyConcepts: 'Document Object Model (DOM) manipulation encompasses the techniques and methods for dynamically modifying web page content, structure, and styling through JavaScript programming. This critical topic covers element selection methods, content modification, attribute manipulation, and dynamic element creation and removal. Students learn to traverse the DOM tree, handle element relationships, and implement interactive features that respond to user actions and application state changes.',
      theoreticalFoundations: 'The theoretical framework is based on the DOM specification and tree data structure principles that represent HTML documents as hierarchical object models. Understanding the DOM as a programming interface enables dynamic web application development where content and presentation can be modified in response to user interactions and application logic. The approach emphasizes performance considerations, browser compatibility, and best practices for efficient DOM operations that maintain application responsiveness.',
      learningObjectives: [
        'Select and manipulate DOM elements using various query methods',
        'Modify element content, attributes, and styling dynamically through JavaScript',
        'Create and remove DOM elements to build dynamic user interfaces',
        'Implement efficient DOM manipulation techniques for optimal performance'
      ],
      relevance: 'DOM manipulation is fundamental to interactive web development, enabling the creation of dynamic, responsive user interfaces that adapt to user input and application state. This knowledge is essential for frontend development roles and supports the creation of modern web applications with rich user experiences. Understanding DOM manipulation is prerequisite for working with JavaScript frameworks and libraries, making it crucial for contemporary web development careers.'
    },
    {
      id: 'event-handling',
      title: 'Event Handling',
      keyConcepts: 'JavaScript event handling encompasses the mechanisms for responding to user interactions, browser events, and application state changes through event-driven programming patterns. This comprehensive topic covers event types (click, submit, load, resize), event listeners, event objects, and event propagation (bubbling and capturing). Students learn to implement interactive features including form validation, user interface feedback, and dynamic content updates that create engaging, responsive web applications.',
      theoreticalFoundations: 'The theoretical foundation is grounded in event-driven programming paradigms and the observer pattern, where applications respond to events rather than following predetermined execution sequences. Understanding event propagation, the event loop, and asynchronous event handling provides insight into JavaScript\'s non-blocking execution model. This approach supports the creation of responsive user interfaces that maintain performance while handling multiple concurrent user interactions and system events.',
      learningObjectives: [
        'Implement event listeners for various user interactions and browser events',
        'Handle event objects and utilize event properties for dynamic responses',
        'Apply event propagation concepts to manage complex user interface interactions',
        'Create responsive, interactive web applications using event-driven programming'
      ],
      relevance: 'Event handling is essential for creating interactive web applications that respond to user input and provide engaging user experiences. This knowledge is fundamental to frontend development and supports the creation of modern web applications with sophisticated user interfaces. Understanding event handling principles is crucial for working with JavaScript frameworks, mobile web development, and creating accessible, user-friendly web applications.'
    },
    {
      id: 'async-javascript',
      title: 'Asynchronous JavaScript',
      keyConcepts: 'Asynchronous JavaScript encompasses the techniques and patterns for handling time-dependent operations including API requests, file operations, and timed events without blocking the main execution thread. This advanced topic covers callbacks, promises, async/await syntax, and error handling in asynchronous operations. Students learn to implement non-blocking code patterns that maintain application responsiveness while performing background operations such as data fetching, image loading, and user authentication processes.',
      theoreticalFoundations: 'The theoretical framework is based on concurrent programming principles and JavaScript\'s single-threaded, event-driven execution model. Understanding the event loop, call stack, and task queue provides insight into how JavaScript handles asynchronous operations without true multithreading. The approach emphasizes non-blocking programming patterns that support responsive user interfaces and efficient resource utilization, fundamental to modern web application architecture and user experience design.',
      learningObjectives: [
        'Implement asynchronous operations using callbacks, promises, and async/await',
        'Handle errors and edge cases in asynchronous JavaScript code',
        'Design non-blocking code architectures for responsive web applications',
        'Integrate asynchronous patterns with DOM manipulation and user interface updates'
      ],
      relevance: 'Asynchronous JavaScript is crucial for modern web development, enabling applications to perform background operations while maintaining responsive user interfaces. This knowledge is essential for API integration, real-time applications, and performance optimization in web development. Understanding asynchronous programming is fundamental to working with modern JavaScript frameworks, server-side JavaScript, and creating professional-grade web applications that meet contemporary performance standards.'
    },
    {
      id: 'es6-features',
      title: 'ES6+ Modern Features',
      keyConcepts: 'ES6+ modern JavaScript features encompass the enhanced syntax, new data structures, and improved programming patterns introduced in ECMAScript 2015 and subsequent versions. This comprehensive topic covers arrow functions, template literals, destructuring assignment, spread and rest operators, classes, modules, and new built-in objects like Map, Set, and Symbol. Students learn to leverage modern JavaScript capabilities for more efficient, readable, and maintainable code development.',
      theoreticalFoundations: 'The theoretical foundation rests upon language evolution principles and modern programming paradigm adoption in JavaScript development. ES6+ features embody functional programming concepts, object-oriented programming improvements, and module system enhancements that align JavaScript with contemporary software development practices. Understanding these features provides insight into JavaScript\'s evolution toward a more powerful, expressive language suitable for large-scale application development.',
      learningObjectives: [
        'Implement ES6+ syntax features for improved code readability and efficiency',
        'Utilize modern data structures and built-in objects for enhanced functionality',
        'Apply destructuring, spread operators, and template literals in practical scenarios',
        'Organize code using ES6 modules and class-based object-oriented programming'
      ],
      relevance: 'ES6+ features are standard in modern JavaScript development, expected knowledge for professional web development roles and essential for working with contemporary frameworks and tools. This knowledge supports writing more efficient, maintainable code and is crucial for technical interviews and collaborative development environments. Understanding modern JavaScript features is fundamental to staying current with web development best practices and industry standards.'
    }
  ]
};

export const CurriculumContent: React.FC<CurriculumContentProps> = ({ courseId }) => {
  const topics = curriculumData[courseId] || [];

  if (topics.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Curriculum content not available for this course.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Curriculum Overview</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Explore the detailed conceptual framework and learning objectives for each topic in this course. 
          Each section provides theoretical foundations, key concepts, and practical learning outcomes designed 
          to build comprehensive understanding and professional competency.
        </p>
      </div>

      {topics.map((topic, index) => (
        <div key={topic.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg font-bold">
                {index + 1}
              </div>
              <h3 className="text-2xl font-bold">{topic.title}</h3>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Key Concepts */}
            <div className="border-l-4 border-blue-500 pl-6">
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="h-6 w-6 text-blue-600" />
                <h4 className="text-xl font-bold text-gray-900">Key Concepts and Definitions</h4>
              </div>
              <p className="text-gray-700 leading-relaxed text-justify">
                {topic.keyConcepts}
              </p>
            </div>

            {/* Theoretical Foundations */}
            <div className="border-l-4 border-purple-500 pl-6">
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-6 w-6 text-purple-600" />
                <h4 className="text-xl font-bold text-gray-900">Theoretical Foundations and Principles</h4>
              </div>
              <p className="text-gray-700 leading-relaxed text-justify">
                {topic.theoreticalFoundations}
              </p>
            </div>

            {/* Learning Objectives */}
            <div className="border-l-4 border-green-500 pl-6">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="h-6 w-6 text-green-600" />
                <h4 className="text-xl font-bold text-gray-900">Learning Objectives and Outcomes</h4>
              </div>
              <div className="space-y-3">
                {topic.learningObjectives.map((objective, objIndex) => (
                  <div key={objIndex} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 leading-relaxed">{objective}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Relevance */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
              <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
                <span>Relevance to Overall Curriculum and Course Goals</span>
              </h4>
              <p className="text-gray-700 leading-relaxed text-justify">
                {topic.relevance}
              </p>
            </div>
          </div>
        </div>
      ))}

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Curriculum Integration</h3>
        <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">
          This comprehensive curriculum is designed with progressive complexity and interconnected learning objectives. 
          Each topic builds upon previous knowledge while preparing students for advanced concepts, ensuring a cohesive 
          learning experience that develops both theoretical understanding and practical skills essential for professional 
          web development competency.
        </p>
      </div>
    </div>
  );
};