'use client';

import React, { useState } from 'react';
import { Search, MapPin, Building, Stethoscope } from 'lucide-react';

export default function JobBoard() {
  const [jobs] = useState([
    {
      id: 1,
      title: 'Registered Nurse - ICU',
      hospital: 'Memorial Healthcare System',
      location: 'Miami, FL',
      type: 'Full-time',
      specialty: 'Critical Care',
      salary: '$65,000 - $85,000',
      posted: '2024-12-10'
    },
    {
      id: 2,
      title: 'Emergency Room Physician',
      hospital: 'Mayo Clinic',
      location: 'Rochester, MN',
      type: 'Full-time',
      specialty: 'Emergency Medicine',
      salary: '$250,000 - $300,000',
      posted: '2024-12-11'
    }
  ]);

  const [filters, setFilters] = useState({
    specialty: '',
    location: '',
    type: '',
    hospital: ''
  });

  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.hospital.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilters = (!filters.specialty || job.specialty === filters.specialty) &&
                          (!filters.location || job.location.includes(filters.location)) &&
                          (!filters.type || job.type === filters.type) &&
                          (!filters.hospital || job.hospital === filters.hospital);
    
    return matchesSearch && matchesFilters;
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Healthcare Jobs</h1>
        
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for jobs..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <select
            className="p-2 border rounded-lg"
            value={filters.specialty}
            onChange={(e) => setFilters({...filters, specialty: e.target.value})}
          >
            <option value="">All Specialties</option>
            <option value="Critical Care">Critical Care</option>
            <option value="Emergency Medicine">Emergency Medicine</option>
            <option value="Pediatrics">Pediatrics</option>
          </select>
          
          <select
            className="p-2 border rounded-lg"
            value={filters.location}
            onChange={(e) => setFilters({...filters, location: e.target.value})}
          >
            <option value="">All Locations</option>
            <option value="FL">Florida</option>
            <option value="MN">Minnesota</option>
            <option value="NY">New York</option>
          </select>

          <select
            className="p-2 border rounded-lg"
            value={filters.type}
            onChange={(e) => setFilters({...filters, type: e.target.value})}
          >
            <option value="">All Job Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>

          <select
            className="p-2 border rounded-lg"
            value={filters.hospital}
            onChange={(e) => setFilters({...filters, hospital: e.target.value})}
          >
            <option value="">All Hospitals</option>
            <option value="Memorial Healthcare System">Memorial Healthcare</option>
            <option value="Mayo Clinic">Mayo Clinic</option>
            <option value="Cleveland Clinic">Cleveland Clinic</option>
          </select>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.map(job => (
          <div key={job.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {job.type}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Building size={18} className="text-gray-500" />
                  <span>{job.hospital}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-gray-500" />
                  <span>{job.location}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Stethoscope size={18} className="text-gray-500" />
                  <span>{job.specialty}</span>
                </div>
                <div className="text-gray-600">
                  Posted: {new Date(job.posted).toLocaleDateString()}
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <span className="font-semibold">{job.salary}</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}