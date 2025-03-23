"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { FiUpload, FiCalendar } from "react-icons/fi";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

// Simulated function to call Gemini AI model API for resume parsing.
// Replace this with your actual API integration.
const extractProfileUsingGemini = async (file: File): Promise<{
  name?: string;
  email?: string;
  location?: string;
  country?: string;
  stateName?: string;
  city?: string;
  workExperience?: string;
  skills?: string;
  achievements?: string;
}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "Jane Smith",
        email: "jane.smith@example.com",
        location: "San Francisco",
        country: "USA",
        stateName: "California",
        city: "San Francisco",
        workExperience: "7 years in Product Design",
        skills: "Figma, Sketch, Adobe XD",
        achievements: "Best Designer Award 2023",
      });
    }, 2500);
  });
};

export const SetupProfilePage: React.FC = () => {
  // State for file upload
  const [resume, setResume] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string>("");

  // Form field states
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [stateName, setStateName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [officeAddress, setOfficeAddress] = useState<string>("");
  const [age, setAge] = useState<string>(""); // Changed to string for plain text input
  const [workExperience, setWorkExperience] = useState<string>("");
  const [twitter, setTwitter] = useState<string>("");
  const [linkedIn, setLinkedIn] = useState<string>("");
  const [github, setGithub] = useState<string>("");
  const [skills, setSkills] = useState<string>("");
  const [achievements, setAchievements] = useState<string>("");

  // Handle file upload change with restrictions: only PDF and up to 10MB
  const handleResumeChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setUploadError("");
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (file.type !== "application/pdf") {
        setUploadError("Only PDF files are allowed.");
        return;
      }
      if (file.size > maxSize) {
        setUploadError("File size must be less than 10MB.");
        return;
      }
      setResume(file);
      try {
        const extractedData = await extractProfileUsingGemini(file);
        if (extractedData.name) setName(extractedData.name);
        if (extractedData.email) setEmail(extractedData.email);
        if (extractedData.location) setLocation(extractedData.location);
        if (extractedData.country) setCountry(extractedData.country);
        if (extractedData.stateName) setStateName(extractedData.stateName);
        if (extractedData.city) setCity(extractedData.city);
        if (extractedData.workExperience) setWorkExperience(extractedData.workExperience);
        if (extractedData.skills) setSkills(extractedData.skills);
        if (extractedData.achievements) setAchievements(extractedData.achievements);
      } catch (error) {
        setUploadError("Failed to extract resume data. Please try again.");
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const profileData = {
      name,
      email,
      dateOfBirth,
      location,
      country,
      state: stateName,
      city,
      address,
      officeAddress,
      age: parseInt(age), // Convert to number if needed
      workExperience,
      twitter,
      linkedIn,
      github,
      skills,
      achievements,
      resume,
    };
    console.log("Profile Data:", profileData);
    // Process further (e.g., API call) here.
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-100">
      <div className="max-w-4xl mx-auto bg-gray-800 shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-white">Setup Profile</h1>

        {/* Resume Upload */}
        <div className="mb-6 flex justify-end items-center gap-4">
          {uploadError && <p className="text-red-500 text-sm">{uploadError}</p>}
          <label
            htmlFor="resume-upload"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md cursor-pointer transition-colors"
          >
            <FiUpload className="w-5 h-5" />
            <span>Choose File</span>
          </label>
          <input
            id="resume-upload"
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleResumeChange}
          />
          {resume && <span className="text-sm">{resume.name}</span>}
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-700 placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Email */}
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-700 placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Date of Birth with Calendar Icon */}
           <div className="relative">
            <label className="block mb-1 font-medium">Date of Birth</label>
            <input
              type="text"
              placeholder="Select your birth date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
              className="w-full pl-3 pr-8 sm:pr-10 py-2 rounded-md bg-gray-700 border border-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FiCalendar className="absolute right-2 sm:right-3 top-12 transform -translate-y-1/2 text-sm md:text-base text-white pointer-events-none" />
          </div>

            {/* Location */}
            <div>
              <label className="block mb-1 font-medium">Location</label>
              <input
                type="text"
                placeholder="Current location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-700 placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Country */}
            <div>
              <label className="block mb-1 font-medium">Country</label>
              <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-700 placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* State */}
            <div>
              <label className="block mb-1 font-medium">State</label>
              <input
                type="text"
                placeholder="State"
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-700 placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* City */}
            <div>
              <label className="block mb-1 font-medium">City</label>
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-700 placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Address */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Address</label>
              <textarea
                placeholder="Street, area, etc."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-700 placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
              />
            </div>
            {/* Office Address (Optional) */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Office Address (Optional)</label>
              <textarea
                placeholder="Office address if applicable"
                value={officeAddress}
                onChange={(e) => setOfficeAddress(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-700 placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
              />
            </div>
            {/* Age (Simple Text Input) */}
            <div>
              <label className="block mb-1 font-medium">Age</label>
              <input
                type="text"
                placeholder="Your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-700 placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                inputMode="numeric"
              />
            </div>
            {/* Work Experience */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Work Experience</label>
              <textarea
                placeholder="Brief work experience summary"
                value={workExperience}
                onChange={(e) => setWorkExperience(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-700 placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
              />
            </div>
            {/* Twitter */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium flex items-center gap-1">
                <FaTwitter className="w-4 h-4 text-blue-400" /> Twitter
              </label>
              <input
                type="text"
                placeholder="Your Twitter profile URL"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-700 placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* LinkedIn */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium flex items-center gap-1">
                <FaLinkedin className="w-4 h-4 text-blue-500" /> LinkedIn
              </label>
              <input
                type="text"
                placeholder="Your LinkedIn profile URL"
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-700 placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* GitHub */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium flex items-center gap-1">
                <FaGithub className="w-4 h-4 text-gray-300" /> GitHub
              </label>
              <input
                type="text"
                placeholder="Your GitHub profile URL"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-700 placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Skills */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Skills</label>
              <input
                type="text"
                placeholder="e.g., JavaScript, React, Node.js"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-700 placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Achievements */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Achievements</label>
              <textarea
                placeholder="Your achievements and awards"
                value={achievements}
                onChange={(e) => setAchievements(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-700 placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
              />
            </div>
          </div>
          {/* Submit Button */}
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium w-fit"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetupProfilePage;
