import React, { useEffect, useState } from "react";
// Simple reusable card components (no external UI library)
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-md border ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-5 ${className}`}>{children}</div>
);
import { Users, Mail, Briefcase } from "lucide-react";

export default function HRDashboard() {
  const [applyData, setApplyData] = useState([]);
  const [contactData, setContactData] = useState([]);

  useEffect(() => {
    const savedApply = JSON.parse(localStorage.getItem("applyData")) || [];
    const savedContact = JSON.parse(localStorage.getItem("contactData")) || [];

    setApplyData(savedApply);
    setContactData(savedContact);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">HR Dashboard</h1>
        <p className="text-gray-500">Manage applications and messages</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        <Card className="shadow-lg">
          <CardContent className="flex items-center gap-4 p-5">
            <Users className="text-blue-500" />
            <div>
              <p className="text-gray-500">Total Applications</p>
              <h2 className="text-xl font-bold">{applyData.length}</h2>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="flex items-center gap-4 p-5">
            <Mail className="text-green-500" />
            <div>
              <p className="text-gray-500">Messages</p>
              <h2 className="text-xl font-bold">{contactData.length}</h2>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="flex items-center gap-4 p-5">
            <Briefcase className="text-purple-500" />
            <div>
              <p className="text-gray-500">Open Positions</p>
              <h2 className="text-xl font-bold">5</h2>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* APPLICATIONS TABLE */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Applications</h2>

        {applyData.length === 0 ? (
          <p className="text-gray-500">No applications found</p>
        ) : (
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Position</th>
                </tr>
              </thead>
              <tbody>
                {applyData.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="p-4 font-medium">{item.name}</td>
                    <td className="p-4">{item.email}</td>
                    <td className="p-4">{item.phone}</td>
                    <td className="p-4">{item.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
        )}
      </div>

      {/* CONTACT MESSAGES */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Contact Messages</h2>

        {contactData.length === 0 ? (
          <p className="text-gray-500">No messages found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contactData.map((item, index) => (
              <Card key={index} className="shadow-md">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg mb-2">
                    {item.firstName} {item.lastName}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{item.email}</p>
                  <p className="text-gray-700">{item.message}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
