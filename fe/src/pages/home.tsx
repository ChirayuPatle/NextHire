import React from "react";
import { Link } from "react-router-dom";

const NextHire: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold">NextHire</h1>
        <Link to={'/login'}>
        <button className="bg-purple-600 px-4 py-2 rounded-lg">Sign Up</button>
        </Link>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-16">
        <h2 className="text-3xl font-semibold">Asynchronous AI interview automation</h2>
        <p className="mt-4 text-gray-400">Platform to screen better, faster.</p>
        <div className="mt-6">
          <Link to={'/login'}>
          <button className="bg-purple-600 px-6 py-3 rounded-lg mr-4">Get Started</button>
          </Link>
          <Link to={'/about'}>
          <button className="border border-purple-600 px-6 py-3 rounded-lg">Learn More</button>
          </Link>
        </div>
      </header>

      {/* AI Process Section */}
      <section className="max-w-4xl mx-auto text-center py-12">
        <h3 className="text-xl font-semibold text-purple-400">NextHire #1 End-to-End AI Interview Process Automation Software.</h3>
        <p className="mt-4 text-gray-400">We provide AI-powered interview solutions that enhance your hiring process...</p>
      </section>

      {/* Explainable AI Section */}
      <section className="max-w-4xl mx-auto text-center py-12">
        <h3 className="text-xl font-semibold text-purple-400">Our Explainable AI Approach</h3>
        <p className="mt-4 text-gray-400">Understand the decisions made by our AI with full transparency...</p>
      </section>

      {/* FAQ Section */}
      <section className="max-w-2xl mx-auto py-12">
        <h3 className="text-center text-xl font-semibold">Get All of Your <span className="text-purple-400">Questions Answered</span></h3>
        <div className="mt-6 space-y-4">
          <details className="bg-gray-800 p-4 rounded-lg">
            <summary className="cursor-pointer text-lg">What is NextHire?</summary>
            <p className="mt-2 text-gray-400">NextHire is an AI-based interview automation platform...</p>
          </details>
          <details className="bg-gray-800 p-4 rounded-lg">
            <summary className="cursor-pointer text-lg">How does it work?</summary>
            <p className="mt-2 text-gray-400">The AI evaluates candidates asynchronously, saving time and effort...</p>
          </details>
          <details className="bg-gray-800 p-4 rounded-lg">
            <summary className="cursor-pointer text-lg">How does it work?</summary>
            <p className="mt-2 text-gray-400">The AI evaluates candidates asynchronously, saving time and effort...</p>
          </details>
          <details className="bg-gray-800 p-4 rounded-lg">
            <summary className="cursor-pointer text-lg">How does it work?</summary>
            <p className="mt-2 text-gray-400">The AI evaluates candidates asynchronously, saving time and effort...</p>
          </details>
        </div>
      </section>
    </div>
  );
};

export default NextHire;
