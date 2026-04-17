/**
 * NOTICEBOARD DATA
 * 
 * Edit this file to add, remove, or modify notices on the website.
 * Follow the structure of the existing notices.
 */

const noticesData = [
    {
        // 1. Event Date Box (Left side)
        date: {
            day: "Day",
            month: "Month",
            bgColor: "var(--brand-green)", // Use standard css colors or var(--brand-green), var(--brand-blue)
            textColor: "white"
        },

        // 2. Small Category Badge (Above Title)
        category: {
            label: "This Week",
            bgColor: "var(--brand-green-glow)",
            textColor: "var(--brand-green-dark)"
        },

        // 3. Main Details
        title: "Jumu‘ah Khutbah Reminder",

        // 4. List of detail rows (Icon + Text)
        // You can find icons at https://fontawesome.com/icons (use the class names like "fa-regular fa-clock")
        details: [
            { icon: "fa-regular fa-calendar", text: "date" },
            { icon: "fa-regular fa-clock", text: "12:30 PM" },
            { icon: "fa-solid fa-location-dot", text: "Prayer Room" },
            { icon: "fa-solid fa-microphone", text: "<strong>Khateeb:</strong>" }
        ],

        // 5. Standard Description (Optional, leave as "" if not needed)
        description: "",

        // 6. Highlighted Quote (Optional, leave as null if not needed)
        quote: {
            text: "\"O you who have believed, when [the adhan] is called for the prayer on the day of Jumu'ah [Friday], then proceed to the remembrance of Allah and leave trade. That is better for you, if you only knew.\"",
            reference: "(Al-Jumu'a 62: Verse 9)"
        }
    }
    // To add another notice, add a comma after the curly brace above, and create another {} block.
];
