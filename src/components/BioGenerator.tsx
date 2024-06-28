import React, { useState } from 'react';

const BioGenerator: React.FC = () => {
  const [job, setJob] = useState('');
  const [tone, setTone] = useState('Professional');
  const [bioType, setBioType] = useState('Twitter');
  const [result, setResult] = useState('');

  const handleGenerateBio = async () => {
    const response = await fetch('https://api.aimlapi.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer d6e40f4d864b459aa20436dbf7510c2b`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Generate a ${bioType} bio for a ${job} with a ${tone} tone.`,
          },
        ],
        max_tokens: 512,
        stream: false,
      }),
    });

    const data = await response.json();
    setResult(data.choices[0].message.content);
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6">Generate your next bio using AI</h1>
      <div className="mb-4">
        <label className="block mb-2">Drop in your job (or your favorite hobby).</label>
        <input
          type="text"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          placeholder="Example: I am a Full-Stack Web Developer (for hobbies: I love Cooking)"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Select your tone.</label>
        <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full p-2 border border-gray-300 rounded">
          <option>Professional</option>
          <option>Casual</option>
          <option>Humorous</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Select bio type.</label>
        <select value={bioType} onChange={(e) => setBioType(e.target.value)} className="w-full p-2 border border-gray-300 rounded">
          <option>Twitter</option>
          <option>Instagram</option>
          <option>LinkedIn</option>
        </select>
      </div>
      <button onClick={handleGenerateBio} className="w-full p-2 bg-blue-600 text-white rounded">Generate your bio</button>
      {result && (
        <div className="mt-4 p-4 border border-gray-300 rounded">
          <h2 className="text-xl font-bold mb-2">Generated Bio:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default BioGenerator;
