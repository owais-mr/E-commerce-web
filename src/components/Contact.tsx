import React from 'react';

const Contact: React.FC = () => (
  <section className="py-20 px-4 max-w-2xl mx-auto" id="contact">
    <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
    <form className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" id="name" name="name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" name="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
        <textarea id="message" name="message" rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
      </div>
      <button type="submit" className="w-full bg-amber-500 text-white py-2 px-4 rounded hover:bg-amber-600 transition">Send</button>
    </form>
  </section>
);

export default Contact;
