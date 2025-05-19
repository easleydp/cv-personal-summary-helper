# Technical Specification: CV Personal Summary Helper Web Page

## Project Overview

The CV Personal Summary Helper is a single-page web application designed to assist job seekers in selecting positive personal qualities for their CV's "Personal Summary" or "Profile" section. The application will present a comprehensive list of professional qualities that users can select and deselect, with their selections dynamically displayed in a separate panel. A "Copy to Clipboard" function will allow users to easily transfer their selected qualities to their CV editing software.

### Target Users

- Job seekers with varying levels of IT literacy
- Will be used in a supervised **job club** environment with volunteer guidance
- Desktop/laptop users (no mobile optimization required)

### Key Goals

- Provide an intuitive, accessible interface for quality selection
- Minimize cognitive load for users with low IT literacy
- Create a responsive design that maximizes visibility of available qualities
- Enable seamless copying of selected qualities for CV integration
- Present a clean, professional appearance suitable for a job search context

## User Interface Specifications

### Layout Structure

The application will consist of three distinct areas:

1. **Header Section** (top of page)

   - Application title: "CV Personal Summary Helper" (h1)
   - Brief tagline: "Select qualities to enhance your CV profile" (optional)

2. **Instruction Area** (below header)

   - Prominent panel with clear instructions
   - Example CV sentence showing qualities in context
   - High-contrast styling to ensure visibility

3. **Main Content Area** (below instructions) - split into two panels:
   - **Qualities Panel** (left side, ~65-70% of horizontal space)
   - **Results Panel** (right side, ~30-35% of horizontal space)

### Detailed Panel Specifications

#### Qualities Panel

- **Layout**: Multi-column grid layout (3-4 columns depending on screen size)
- **Container**: Card-like appearance with subtle border and background
- **Height**: Fixed height (approx. 60-70% of viewport height) with vertical scrolling
- **Quality Items**:
  - Each quality displayed as a selectable button/pill
  - Consistent padding (12px horizontal, 8px vertical)
  - Border radius: 4px for rounded corners
  - Margin between items: 8px
  - Font size: 16px (readable but space-efficient)
  - Text alignment: Center
- **States**:
  - Unselected state: Light background (e.g., #f5f5f5), darker text (#333)
  - Selected state: Highlighted background (e.g., #4a90e2), white text, possibly bold
  - Hover state: Subtle background change and cursor: pointer
  - Focus state: Visible outline for keyboard navigation
- **Accessibility**:
  - Role: button
  - aria-pressed: "true" when selected, "false" when not selected
  - tabindex="0" for keyboard navigation
  - Appropriate color contrast ratios (minimum 4.5:1)

#### Results Panel

- **Layout**: Vertical stack of selected qualities
- **Container**: Card-like appearance with distinct styling from Qualities Panel
- **Title**: "Selected Qualities" (h2)
- **Height**: Same height as Qualities Panel with vertical scrolling if needed
- **Empty State**: Display message "No qualities selected yet" when empty
- **Selected Quality Items**:
  - Each quality displayed in its own container for visual separation
  - Padding: 10px
  - Margin between items: 8px
  - Background: Light (e.g., #f0f7ff)
  - Border: Subtle (1px solid #d0e0f5)
  - Border radius: 4px
  - Font size: 16px
- **Remove Button**:

  - Small "×" icon positioned at right side of each quality
  - Hover effect: Color change (to red) and cursor: pointer
  - Appropriate padding (minimum 8px) to ensure clickable area is sufficiently large
  - aria-label="Remove [quality]" for accessibility

- **Copy to Clipboard Button**:

  - Only visible when at least one quality is selected
  - Positioned at bottom of Results Panel
  - Clear button styling with descriptive text "Copy Qualities to Clipboard"
  - Icon: clipboard or copy icon (optional)
  - Tooltip: "Copy to clipboard" on hover
  - Full width of Results Panel
  - Padding: 10px
  - Margin-top: 16px to separate from list
  - States:
    - Normal: Distinct background color (e.g., #4a90e2)
    - Hover: Slightly darker shade
    - Active: Even darker shade for visual feedback
    - Focus: Visible outline for keyboard navigation

- **Accessibility**:
  - aria-live="polite" on the results container to announce changes
  - aria-label attributes for interactive elements
  - Appropriate heading hierarchy

### Notification System

- **Toast Message**:
  - Brief notification appears when qualities are copied to clipboard
  - Text: "Qualities copied to clipboard"
  - Position: Bottom center of viewport
  - Duration: 3 seconds before automatically disappearing
  - Styling: Semi-transparent background, clear text, subtle shadow
  - Animation: Fade in and out

## Functional Requirements

### Quality Selection Mechanism

1. **Data Loading**:

   - On page load, fetch the qualities.json file using the Fetch API
   - Parse JSON response and sort qualities alphabetically
   - Handle potential errors gracefully with user-friendly error message

2. **Selection Process**:

   - Single click on an unselected quality:
     - Visually highlight the quality in Qualities Panel
     - Add the quality to Results Panel
     - Set aria-pressed="true"
   - Single click on a selected quality:
     - Remove highlight from quality in Qualities Panel
     - Remove the quality from Results Panel
     - Set aria-pressed="false"

3. **Results Management**:

   - Each selected quality in Results Panel includes a remove button
   - Clicking the remove button:
     - Removes the quality from Results Panel
     - Updates the corresponding quality in Qualities Panel to unselected state
     - Updates aria-pressed attribute
   - Results Panel updates dynamically as qualities are selected/deselected

4. **Copy Functionality**:
   - When "Copy to Clipboard" button is clicked:
     - Create a comma-separated string of all selected qualities
     - Use navigator.clipboard.writeText() to copy to clipboard
     - Display toast notification confirming successful copy
     - No fallback required as per requirements

## Technical Implementation

### Directory Structure

```
cv-personal-summary-helper/
├── index.html              # Main HTML document
├── css/
│   └── style.css           # All styling rules
├── js/
│   └── app.js              # Application logic
└── data/
    └── qualities.json      # Data file containing the qualities list
```

### Technologies

- **HTML5**: Semantic markup for structure
- **CSS3**:
  - Custom styling without frameworks
  - CSS Grid for multi-column layout in Qualities Panel
  - Flexbox for general layout
  - CSS variables for consistent color scheme and spacing
  - Media queries for basic responsiveness
- **JavaScript (ES6+)**:
  - Vanilla JavaScript with no external dependencies
  - Fetch API for loading qualities
  - DOM manipulation for dynamic updates
  - Event delegation for efficient event handling

### Third-Party Libraries

- **None Required**: The application will be built using only native browser APIs and vanilla JavaScript

### Code Organization (app.js)

```javascript
// Structure outline for app.js
// 1. Global Variables
// 2. DOM References
// 3. Event Listeners
// 4. Data Loading Function
// 5. UI Rendering Functions
// 6. Quality Selection/Deselection Handlers
// 7. Copy to Clipboard Functionality
// 8. Toast Notification System
// 9. Utility Functions
// 10. Initialization Function
```

### Specific JavaScript Functions Required

1. **initApp()** - Entry point that sets up the application
2. **fetchQualities()** - Loads and processes the qualities data
3. **renderQualities(qualities)** - Creates and displays quality elements
4. **renderSelectedQualities(selectedQualities)** - Updates the Results Panel
5. **handleQualityClick(event)** - Manages selection/deselection logic
6. **handleRemoveClick(event)** - Removes quality from selection
7. **copyToClipboard()** - Copies selected qualities to clipboard
8. **showToastNotification(message)** - Displays temporary notifications
9. **sortQualities(qualities)** - Sorts qualities alphabetically

## Performance Considerations

1. **Efficient DOM Manipulation**:

   - Use document fragments for batch DOM updates
   - Implement event delegation on containers rather than individual items
   - Minimize reflows and repaints

2. **Memory Management**:

   - Store selected qualities in a Set or similar efficient data structure
   - Use weak references where appropriate

3. **Rendering Optimization**:
   - Only update DOM elements that have changed, not entire lists
   - Use CSS transitions for smooth state changes
   - Consider debouncing rapid user interactions

## Accessibility Requirements

1. **Keyboard Navigation**:

   - All interactive elements must be focusable
   - Logical tab order matching visual layout
   - Visible focus indicators

2. **Screen Reader Support**:

   - Proper ARIA attributes as specified:
     - aria-pressed for qualities
     - aria-live for results panel
   - Descriptive aria-label attributes for icons and buttons
   - Semantic HTML with appropriate heading hierarchy

3. **Additional Accessibility Features**:
   - Sufficient color contrast (WCAG AA compliance)
   - No reliance on color alone for conveying information
   - Focus management after dynamic content changes

## Browser Compatibility

- Target browsers: Latest versions of Chrome, Firefox, Safari, Edge
- Use modern JavaScript features available in all target browsers
- Avoid browser-specific APIs where possible
- Ensure consistent visual presentation across browsers

## Testing Checklist

1. **Functional Testing**:

   - Data loading and display
   - Quality selection and deselection
   - Results panel updates
   - Remove functionality
   - Copy to clipboard
   - Toast notification

2. **UI Testing**:

   - Layout alignment and spacing
   - Responsive behavior
   - Visual states (hover, focus, active)
   - Text readability

3. **Accessibility Testing**:

   - Keyboard navigation
   - Screen reader compatibility
   - Color contrast

4. **Performance Testing**:
   - Load time
   - Interaction responsiveness
   - Handling large number of selections

## Future Enhancement Considerations (Out of Current Scope)

- Local storage to persist selections across page reloads
- Predefined groups of qualities for quick selection
- Search/filter functionality for the qualities list
- Export functionality for different formats (beyond clipboard)
- Language localization options

---

## Appendix: Complete Qualities List

```json
{
  "qualities": [
    "Accomplished",
    "Accurate",
    "Active",
    "Adaptable",
    "Adventurous",
    "Ambitious",
    "Analytical",
    "Articulate",
    "Assertive",
    "Attentive",
    "Calm",
    "Capable",
    "Compassionate",
    "Competent",
    "Competitive",
    "Concise",
    "Confident",
    "Conscientious",
    "Considerate",
    "Consistent",
    "Constructive",
    "Creative",
    "Decisive",
    "Dependable",
    "Determined",
    "Diligent",
    "Disciplined",
    "Eager",
    "Economical",
    "Effective",
    "Efficient",
    "Empathetic",
    "Encouraging",
    "Energetic",
    "Enterprising",
    "Enthusiastic",
    "Ethical",
    "Flexible",
    "Focused",
    "Friendly",
    "Formal",
    "Goal orientated",
    "Hard working",
    "Innovative",
    "Insightful",
    "Intellectual",
    "Intelligent",
    "Logical",
    "Mature",
    "Methodical",
    "Meticulous",
    "Motivated",
    "Natural ability",
    "Observant",
    "Optimistic",
    "Organised",
    "Original",
    "Patient",
    "Perceptive",
    "Persistent",
    "Persuasive",
    "Positive",
    "Practical",
    "Precise",
    "Productive",
    "Prudent",
    "Qualified",
    "Quick",
    "Rational",
    "Realistic",
    "Reflective",
    "Reliable",
    "Resourceful",
    "Responsible",
    "Responsive",
    "Self-assured",
    "Self-confident",
    "Self-controlled",
    "Self-reliant",
    "Self-starting",
    "Sincere",
    "Strong",
    "Sympathetic",
    "Systematic",
    "Tactful",
    "Talented",
    "Tenacious",
    "Thorough",
    "Versatile",
    "Wise"
  ]
}
```
