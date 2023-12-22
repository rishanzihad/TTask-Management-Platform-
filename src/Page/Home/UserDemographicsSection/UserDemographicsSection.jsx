import React from 'react';
import { Disclosure } from '@headlessui/react';

const UserDemographicsSection = () => {
  return (
    <section className="user-demographics-section  p-8 bg-gray-100">
      <h2 className="text-3xl font-bold text-black mb-4">User Demographics</h2>

      <p className="mb-4 text-black">
        TaskBuddy caters to a diverse audience, providing benefits to various professionals and individuals. Here's a breakdown of the types of people who can benefit from using TaskBuddy:
      </p>

      <ul className="text-black list-disc pl-6 mb-4">
        <li>Developers and Programmers</li>
        <li>Corporate Professionals</li>
        <li>Bankers and Financial Professionals</li>
        <li>Entrepreneurs and Business Owners</li>
        <li>Students and Researchers</li>
        <li>Freelancers</li>
        <li>Project Managers</li>
      </ul>

      <p className="mb-4 text-black"><strong>How It Works:</strong></p>
      <ul className="text-black list-disc pl-6 mb-4">
        <li>Each user, regardless of their profession, can customize their task management dashboard to suit their specific needs.</li>
        <li>The intuitive drag-and-drop functionality simplifies the process of organizing tasks across different categories.</li>
        <li>User-friendly features and a responsive design make TaskBuddy accessible to individuals from various backgrounds.</li>
      </ul>

      <p className="mb-4 text-black"><strong>Benefits for All Users:</strong></p>
      <ul className="text-black list-disc pl-6 mb-4">
        <li>Improved task organization and prioritization.</li>
        <li>Seamless collaboration and communication within teams.</li>
        <li>Efficient tracking of project deadlines and milestones.</li>
        <li>Enhanced productivity and time management.</li>
      </ul>

      <p className="mb-4 text-black"><strong>TaskBuddy is Your All-in-One Task Management Solution!</strong></p>
    </section>
  );
};

export default UserDemographicsSection;
